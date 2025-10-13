"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "./utils/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const registerSchema = z
  .object({
    email: z.string().email("Enter a valid e-mail address."),
    password: z
      .string()
      .min(8, "Min. 8 characters, with upper, lower, and a number.")
      .regex(/[a-z]/, "Password must include a lowercase letter.")
      .regex(/[A-Z]/, "Password must include an uppercase letter.")
      .regex(/\d/, "Password must include a number."),
    confirm: z.string().min(1, "Please confirm your password."),
    intent: z.enum(["sales", "purchases"]),
    taxNumber: z.string().min(1, "Tax number is required."),
    companyName: z.string().min(1, "Company name is required."),
    phone: z.string().min(1, "Phone number is required."),
    street: z.string().min(1, "Street is required."),
    country: z.string().min(1, "Country is required."),
    city: z.string().min(1, "City is required."),
    zip: z.string().min(1, "Zip code is required."),
    userConcent: z.boolean().refine((v) => v === true, {
      message: "You must agree to the regulation.",
    }),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export type RegisterPayload = z.infer<typeof registerSchema>;

export async function registerUserAction(raw: RegisterPayload) {
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = (issue.path[0] ?? "form").toString();
      (fieldErrors[key] ||= []).push(issue.message);
    }
    return { ok: false, errors: fieldErrors };
  }

  const data = parsed.data;
  function generateMixedId() {
    const chars = "BILVIO0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  let userID: string;
  while (true) {
    const newId = generateMixedId();
    const exists = await prisma.user.findUnique({ where: { UserID: newId } });
    if (!exists) {
      userID = newId;
      break;
    }
  }

  try {
    await prisma.user.create({
      data: {
        UserID: userID,
        email: data.email,
        password: data.password, // saving as plain string per your request
        taxNumber: data.taxNumber,
        companyName: data.companyName,
        phone: data.phone,
        street: data.street,
        country: data.country,
        city: data.city,
        zipCode: data.zip, // map zip -> zipCode
        intent: data.intent === "sales" ? "SALES" : "PURCHASES",
        userType: "USER",
        approvalStatus: "PENDING",
        userConcent: true, // <-- persist consent
      },
    });
  } catch (e: any) {
    // Handle unique constraint errors nicely
    if (e?.code === "P2002" && Array.isArray(e?.meta?.target)) {
      const errors: Record<string, string[]> = {};
      for (const field of e.meta.target as string[]) {
        const k = field === "zipCode" ? "zip" : field;
        (errors[k] ||= []).push(`${k} already in use`);
      }
      return { ok: false, errors };
    }
    console.error(e);
    return {
      ok: false,
      errors: { form: ["Unexpected error. Please try again."] },
    };
  }

  revalidatePath("/register");
  revalidatePath("/");

  redirect(
    `/login?ok=1&msg=${encodeURIComponent(
      "Registered successfully. You can sign in now."
    )}`
  );
}

const SESSION_TTL_SECONDS = 60 * 60 * 24;

const loginSchema = z.object({
  email: z.string().email("Enter a valid e-mail address."),
  password: z.string().min(1, "Password is required."),
});

export async function loginUserAction(input: z.infer<typeof loginSchema>) {
  const { email, password } = loginSchema.parse(input);

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true },
  });

  // email not found
  if (!user) {
    redirect("/login?error=notfound");
  }

  // wrong password
  if (user.password !== password) {
    redirect("/login?error=invalid");
  }

  // success -> set 20-minute session cookie and go home
  const jar = await cookies();
  jar.set("bilvio_session", user.email, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_SECONDS,
  });

  redirect("/");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete("bilvio_session");
  redirect("/login");
}

const changePasswordSchema = z
  .object({
    current: z.string().min(1, "Current password is required."),
    password: z
      .string()
      .min(8, "Min. 8 characters, with upper, lower, and a number.")
      .regex(/[a-z]/, "Password must include a lowercase letter.")
      .regex(/[A-Z]/, "Password must include an uppercase letter.")
      .regex(/\d/, "Password must include a number."),
    confirm: z.string().min(1, "Please confirm your password."),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords do not match.",
  });

export async function changePasswordAction(formData: FormData) {
  const jar = await cookies();
  const email = jar.get("bilvio_session")?.value ?? "";
  if (!email) redirect("/login");

  const data = {
    current: String(formData.get("current") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirm: String(formData.get("confirm") ?? ""),
  };

  const parsed = changePasswordSchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input.";
    redirect(`/profile/change-password?error=${encodeURIComponent(first)}`);
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true },
  });

  if (!user || user.password !== data.current) {
    redirect(
      `/profile/change-password?error=${encodeURIComponent(
        "Current password is incorrect."
      )}`
    );
  }

  await prisma.user.update({
    where: { email },
    data: { password: data.password }, // plain text per your current schema
  });

  redirect(
    `/profile?ok=1&msg=${encodeURIComponent("Password changed successfully.")}`
  );
}

const updateProfileBasicsSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  phone: z.string().min(1, "Phone number is required."),
  companyWebsiteUrl: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => {
        if (!v) return true; // Allow empty
        return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Basic domain pattern
      },
      {
        message: "Enter a valid website (e.g., example.com)",
      }
    ),
});

export async function updateProfileBasicsAction(formData: FormData) {
  const jar = await cookies();
  const email = jar.get("bilvio_session")?.value ?? "";
  if (!email) redirect("/login");

  const input = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    companyWebsiteUrl: String(formData.get("companyWebsiteUrl") ?? "").trim(),
  };

  const parsed = updateProfileBasicsSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input.";
    redirect(`/profile/edit?error=${encodeURIComponent(first)}`);
  }

  try {
    await prisma.user.update({
      where: { email },
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        companyWebsiteUrl: parsed.data.companyWebsiteUrl || null,
      },
    });
  } catch (e: any) {
    if (
      e?.code === "P2002" &&
      Array.isArray(e?.meta?.target) &&
      e.meta.target.includes("phone")
    ) {
      redirect(
        `/profile/edit?error=${encodeURIComponent(
          "Phone number already in use."
        )}`
      );
    }
    throw e;
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  revalidatePath("/");

  redirect(
    `/profile?ok=1&msg=${encodeURIComponent("Profile updated successfully.")}`
  );
}


const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  offerNumber: z.string().min(1, "Offer number is required"),
  gearbox: z.enum(["AUTOMATIC", "MANUAL"]),
  fuel: z.enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC"]),
  price: z.number().min(0, "Price must be positive"),
  discount: z.number().min(0).max(100, "Discount must be 0-100"),
  type: z.enum(["SUPER", "INTERESTING", "NOT_INTERESTING", "LATER"]),
  stock: z.enum(["IN_STOCK", "OUT_OF_STOCK"]),
  colour: z.string().min(1, "Colour is required"),
  quantity: z.number().min(0, "Quantity must be positive"),
  mileage: z.number().min(0, "Mileage must be positive"),
  firstRegistration: z.string(), // ISO date string
  availability: z.enum(["IMMEDIATELY", "LATER"]),
  trim: z.string().min(1, "Trim is required"),
  engineSpec: z.string().min(1, "Engine spec is required"),
  vat: z.number().min(0, "VAT must be positive"),
  transportCost: z.number().min(0, "Transport cost must be positive"),
  productionYear: z.number().min(1900).max(new Date().getFullYear()),
  userId: z.string().optional(),
});

export type ProductPayload = z.infer<typeof productSchema>;

export async function createProductAction(
  raw: ProductPayload
): Promise<{ ok: boolean; errors?: Record<string, string[]> }> {
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = (issue.path[0] ?? "form").toString();
      (fieldErrors[key] ||= []).push(issue.message);
    }
    return { ok: false, errors: fieldErrors };
  }

  try {
    await prisma.product.create({
      data: {
        ...parsed.data,
        firstRegistration: new Date(parsed.data.firstRegistration),
      },
    });

    revalidatePath("/admin/createProduct");
    revalidatePath("/");

    return { ok: true }; // always returns an object
  } catch (e: any) {
    if (e?.code === "P2002" && Array.isArray(e?.meta?.target)) {
      const errors: Record<string, string[]> = {};
      for (const field of e.meta.target as string[]) {
        (errors[field] ||= []).push(`${field} already exists`);
      }
      return { ok: false, errors };
    }
    console.error(e);
    return { ok: false, errors: { form: ["Unexpected error."] } };
  }
}

