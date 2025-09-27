"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "./utils/db";
import { cookies } from "next/headers";

const registerSchema = z.object({
  email: z.string().email("Enter a valid e-mail address."),
  password: z.string()
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
  userConcent: z
    .boolean()
    .refine(v => v === true, { message: "You must agree to the regulation." }),
}).refine(d => d.password === d.confirm, {
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

  try {
    await prisma.user.create({
      data: {
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
    return { ok: false, errors: { form: ["Unexpected error. Please try again."] } };
  }

  redirect("/login");
}





const SESSION_TTL_SECONDS = 60 * 10;
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
  jar.set("bilvio_session", "", { path: "/", maxAge: 0 });
  redirect("/login");
}



