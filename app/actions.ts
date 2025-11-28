"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "./utils/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@/lib/generated/prisma";

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

export type ProductOptionInput = {
  type: "EXTERIOR" | "INTERIOR" | "SAFETY" | "PERFORMANCE" | "PACKAGE";
  name: string;
};

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  offerNumber: z.string().min(1, "Offer number is required"),
  gearbox: z.enum(["AUTOMATIC", "MANUAL"]),
  fuel: z.enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC"]),
  price: z.number().min(0, "Price must be positive"),
  discount: z.number().min(0).max(100, "Discount must be 0-100"),
  type: z.enum(["SUPER", "INTERESTING", "NOT_INTERESTING", "LATER"]),
  productCondition:z.enum(["NEW", "USED"]),
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
  options: z
    .array(
      z.object({
        type: z.enum(["EXTERIOR", "INTERIOR", "SAFETY", "PERFORMANCE", "PACKAGE"]),
        name: z.string(),
      })
    )
    .optional(),
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
    // Create product and optional options
    await prisma.product.create({
      data: {
        ...parsed.data,
        firstRegistration: new Date(parsed.data.firstRegistration),
        options: parsed.data.options?.length
          ? {
              create: parsed.data.options.map((opt) => ({
                type: opt.type,
                name: opt.name,
              })),
            }
          : undefined,
      },
    });

    revalidatePath("/admin/createProduct");
    revalidatePath("/");

    return { ok: true };
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




// DEMAND ACTIONS

const demandSchema = z.object({
  make: z.string().optional(),
  gearbox: z.string().optional(),
  fuel: z.string().optional(),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  demand: z.string().optional(),
  modelYear: z.string().optional(),
  country: z.string().optional(),
  quantity: z.string().optional(),
  warehouse: z.string().optional(),
  wltpCo2: z.string().optional(),
  note: z.string().optional(),
  intent: z.enum(["create", "draft"]),
});

export async function createDemandAction(formData: FormData) {
  const parsed = demandSchema.safeParse({
    make: formData.get("make"),
    gearbox: formData.get("gearbox"),
    fuel: formData.get("fuel"),
    priceFrom: formData.get("priceFrom"),
    priceTo: formData.get("priceTo"),
    demand: formData.get("demand"),
    modelYear: formData.get("modelYear"),
    country: formData.get("country"),
    quantity: formData.get("quantity"),
    warehouse: formData.get("warehouse"),
    wltpCo2: formData.get("wltpCo2"),
    note: formData.get("note"),
    intent: formData.get("intent"),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid form input.";
    throw new Error(first);
  }

  // Check cookie session
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value ?? "";
  if (!userEmail) throw new Error("Unauthorized — please log in.");

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) throw new Error("User not found.");

  const data = parsed.data;
  const intent = data.intent;

  await prisma.demand.create({
    data: {
      make: data.make || null,
      gearbox: data.gearbox || null,
      fuel: data.fuel || null,
      priceFrom: data.priceFrom ? Number(data.priceFrom) : null,
      priceTo: data.priceTo ? Number(data.priceTo) : null,
      demand: data.demand ? Number(data.demand) : null,
      modelYear: data.modelYear ? Number(data.modelYear) : null,
      country: data.country || null,
      quantity: data.quantity ? Number(data.quantity) : null,
      warehouse: data.warehouse || null,
      wltpCo2: data.wltpCo2 ? Number(data.wltpCo2) : null,
      status: intent === "draft" ? "DRAFT" : "SAVED",
      userId: user.id,
    },
  });

  revalidatePath("/demand");
  redirect("/demand");
}


const orderSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().min(1),
});

export async function createOrderAction(formData: FormData) {
  const productId = formData.get("productId") as string;
  const quantity = Number(formData.get("quantity"));

  const parsed = orderSchema.safeParse({ productId, quantity });
  if (!parsed.success) {
    return { ok: false, message: "Invalid input data" };
  }

  // Get user from cookie
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value ?? "";

  if (!userEmail) return { ok: false, message: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) return { ok: false, message: "User not found" };

  // Get product details
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, price: true, discount: true },
  });

  if (!product) return { ok: false, message: "Product not found" };

  // Price calculation
  const unitPrice = product.price - (product.price * product.discount) / 100;
  const totalPrice = unitPrice * quantity;

  try {
    await prisma.$transaction(async (tx) => {
      // Generate unique order number
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

      // Create order
      const order = await tx.order.create({
        data: {
          userId: user.id,
          orderNumber,
          status: "NEW",
        },
      });

      // Create order item
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId,
          quantity,
          unitPrice,
          totalPrice,
        },
      });
    });

    revalidatePath("/buyer/orders");
    return { ok: true, message: "Order placed successfully!" };
  } catch (e) {
    console.error("❌ Order creation error:", e);
    return { ok: false, message: "Something went wrong while creating the order" };
  }
}

const taskSchema = z.object({
  status: z.enum(["TODO","REJECTED","WAITING","DONE","SCHEDULED","CANCELLED"]).optional().default("TODO"),
  taskType: z.string().min(1),
  type: z.enum(["NEW", "USED"]),
  makeModel: z.string().min(1),
  orderNumber: z.string().min(1),
  orderPackageNumber: z.string().optional().nullable(),
  transportNumber: z.string().optional().nullable(),
  deadline: z.string().min(1),
  expired: z.boolean().optional().default(false),
  userId: z.string().optional().nullable(),
});

export type TaskPayload = z.infer<typeof taskSchema>;

export async function createTaskAction(formData: FormData) {
  const parsed = taskSchema.safeParse({
    status: formData.get("status")?.toString() || undefined,
    taskType: formData.get("taskType")?.toString() || "",
    type: formData.get("type")?.toString() || "",
    makeModel: formData.get("makeModel")?.toString() || "",
    orderNumber: formData.get("orderNumber")?.toString() || "",
    orderPackageNumber: formData.get("orderPackageNumber")?.toString() || null,
    transportNumber: formData.get("transportNumber")?.toString() || null,
    deadline: formData.get("deadline")?.toString() || "",
    expired: formData.get("expired") === "true" || false,
    userId: null,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid form input.";
    throw new Error(first);
  }

  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;
  if (!userEmail) throw new Error("Unauthorized — please log in.");

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });
  if (!user) throw new Error("User not found.");

  const data = parsed.data;

  await prisma.task.create({
    data: {
      ...data,
      userId: user.id,
      deadline: new Date(data.deadline),
    },
  });

  revalidatePath("/admin/createTask");
  redirect("/tasks");
}




export async function uploadDocumentsAction(fileUrl: string) {
  if (!fileUrl) throw new Error("Please upload a valid PDF document");

  // Get logged-in user from cookie
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;
  if (!userEmail) throw new Error("Unauthorized — please log in");

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });
  if (!user) throw new Error("User not found");

  // Update the PDF for this specific user
  await prisma.user.update({
    where: { id: user.id },
    data: { uploadedDocuments: fileUrl },
  });

  revalidatePath("/documents");

  return { ok: true, message: "PDF uploaded successfully!" };
}



export async function reactToProduct(
  productId: string,
  reaction: "LIKE" | "UP" | "DOWN" | "SAVE"
) {
  const jar = await cookies(); // ✅ await here
  const userEmail = jar.get("bilvio_session")?.value;

  if (!userEmail) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) throw new Error("User not found");

  const updatedReaction = await prisma.productReaction.upsert({
    where: { productId_userId: { productId, userId: user.id } },
    update: { reaction },
    create: { productId, userId: user.id, reaction },
  });

  return updatedReaction;
}

export async function saveDemandNote({
  userId,
  demandId,
  note,
}: {
  userId: string;
  demandId: string;
  note: string;
}) {
  // Check if a note already exists for this user and demand
  const existingNote = await prisma.demandNote.findUnique({
    where: {
      demandId_userId: {
        demandId,
        userId,
      },
    },
  });

  if (existingNote) {
    // Update existing note
    return prisma.demandNote.update({
      where: {
        id: existingNote.id,
      },
      data: {
        note,
      },
    });
  } else {
    // Create a new note
    return prisma.demandNote.create({
      data: {
        demandId,
        userId,
        note,
      },
    });
  }
}

export async function getDemandNotes(demandId: string) {
  const notes = await prisma.demandNote.findMany({
    where: { demandId },
    orderBy: { createdAt: "desc" }, // latest first
    select: {
      id: true,
      note: true,
      createdAt: true,
      userId: true,
    },
  });

  return notes;
}

/* 
export async function addProductNote({
  userId,
  productId,
  note,
}: {
  userId: string;
  productId: string;
  note: string;
}) {
  if (!note || note.trim() === "") throw new Error("Note cannot be empty");

  const newNote = await prisma.productNote.create({
    data: {
      userId,
      productId,
      note,
    },
  });

  return newNote;
} */

export async function saveProductNote({
  productId,
  userId,
  note,
}: {
  productId: string;
  userId: string;
  note: string;
}) {
  return await prisma.productNote.upsert({
    where: { productId_userId_id: { productId, userId, id: "" } }, // Prisma requires unique combination, use workaround
    create: { productId, userId, note },
    update: { note, updatedAt: new Date() },
  });
}

export async function getProductNotes(productId: string, userId: string) {
  return prisma.productNote.findMany({
    where: { productId, userId }, // ✅ filter by current user only
    select: { id: true, note: true },
    orderBy: { createdAt: "desc" },
  });
}


export async function createMessageAction(formData: FormData | { productId: string; message: string }) {
  const data =
    formData instanceof FormData
      ? {
          productId: formData.get("productId") as string,
          message: (formData.get("message") as string) ?? "",
        }
      : formData;

  if (!data.productId || !data.message.trim()) {
    return { ok: false, message: "Missing product or message." };
  }

  try {
    const cookieStore =await cookies();
    const session = cookieStore.get("bilvio_session")?.value ?? cookieStore.get("userEmail")?.value;

    if (!session) return { ok: false, message: "Not authenticated." };

    const user = await prisma.user.findUnique({
      where: { email: session },
      select: { id: true },
    });
    if (!user) return { ok: false, message: "User not found." };

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
      select: { id: true },
    });
    if (!product) return { ok: false, message: "Product not found." };

    const created = await prisma.message.create({
      data: {
        userId: user.id,
        productId: product.id,
        message: data.message,
      },
    });

    return { ok: true, message: "Message sent successfully", id: created.id };
  } catch (error) {
    console.error("createMessageAction error:", error);
    return { ok: false, message: "Failed to send message" };
  }
}


export async function getUserMessages() {
  const cookieStore = await cookies();
  const session =
    cookieStore.get("bilvio_session")?.value ??
    cookieStore.get("userEmail")?.value;

  if (!session) return [];

  const user = await prisma.user.findUnique({
    where: { email: session },
    select: { id: true },
  });
  if (!user) return [];

  // Use `orderBy: { createdAt: "desc" }` with correct type
  const messages = await prisma.message.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      message: true,
      productId: true,
      product: { select: { id: true, name: true } }, // explicitly select product fields
    },
    orderBy: { createdAt: "desc" }, // ✅ should now work
  });

  return messages.map((msg) => ({
    id: msg.id,
    message: msg.message,
    productName: msg.product?.name ?? "Unknown Product",
    productId: msg.productId,
  }));
}


const bankAccountSchema = z.object({
  bankName: z.string().min(1, "Bank name is required."),
  iban: z.string().min(15, "Enter a valid IBAN."),
  swift: z.string().min(8, "Enter a valid SWIFT code."),
  isMain: z.boolean().optional(),
});

export type BankAccountPayload = z.infer<typeof bankAccountSchema>;

export async function createBankAccountAction(data: BankAccountPayload) {
  // Validate input
  const parsed = bankAccountSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
    throw new Error(firstError);
  }

  // Get logged-in user
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;
  if (!userEmail) throw new Error("Unauthorized — please log in.");

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) throw new Error("User not found");

  // If isMain is true, unset previous main accounts
  if (parsed.data.isMain) {
    await prisma.bankAccount.updateMany({
      where: { userId: user.id, isMain: true },
      data: { isMain: false },
    });
  }

  // Create bank account
  try {
    await prisma.bankAccount.create({
      data: {
        userId: user.id,
        bankName: parsed.data.bankName,
        iban: parsed.data.iban,
        swift: parsed.data.swift,
        isMain: parsed.data.isMain ?? false,
      },
    });

    revalidatePath("/settings/bankaccount");
    return { ok: true, message: "Bank account created successfully" };
  } catch (e: any) {
    if (e?.code === "P2002" && Array.isArray(e?.meta?.target)) {
      return { ok: false, message: `${e.meta.target[0]} already exists` };
    }
    console.error(e);
    return { ok: false, message: "Unexpected error occurred" };
  }
}



export async function editBankAccountAction(formData: {
  id: string;
  bankName: string;
  iban: string;
  swift: string;
  isMain?: boolean;
}) {
  const { id, bankName, iban, swift, isMain } = formData;

  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;
  if (!userEmail) throw new Error("Unauthorized");

  // Fetch the account we want to update
  const currentAccount = await prisma.bankAccount.findUnique({ where: { id } });
  if (!currentAccount) throw new Error("Bank account not found");

  // Check if IBAN exists in another account
  const existing = await prisma.bankAccount.findFirst({
    where: {
      iban,
      NOT: { id }, // exclude current account
    },
  });

  if (existing) {
    throw new Error("This IBAN is already used by another account.");
  }

  // If isMain is true, unset previous main accounts for the same user
  if (isMain) {
    await prisma.bankAccount.updateMany({
      where: { userId: currentAccount.userId, isMain: true },
      data: { isMain: false },
    });
  }

  // Update the account
  await prisma.bankAccount.update({
    where: { id },
    data: {
      bankName,
      iban,
      swift,
      isMain: !!isMain,
    },
  });

  redirect("/settings/bankaccount");
}
 



async function getLoggedInUser() {
  const jar = await cookies();
  const email =
    jar.get("bilvio_session")?.value ??
    jar.get("userEmail")?.value ??
    "";

  if (!email) return null;

  return prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
}

// ==================================================
//  GET COMPANY SETTINGS
// ==================================================

export async function getCompanySettingsAction() {
  const user = await getLoggedInUser();
  if (!user) return null;

  const settings = await prisma.companySettings.findUnique({
    where: { userId: user.id },
  });

  return settings; // can be null (no settings yet)
}

// ==================================================
//  UPDATE A FIELD IMMEDIATELY
// ==================================================

export async function updateCompanySettingsAction(
  field: string,
  value: string
) {
  const user = await getLoggedInUser();
  if (!user) throw new Error("Unauthorized");

  // Convert empty string → null
  const val = value === "" ? null : value;

  // If record does NOT exist, create it first
  const exists = await prisma.companySettings.findUnique({
    where: { userId: user.id },
  });

  if (!exists) {
    await prisma.companySettings.create({
      data: {
        userId: user.id,
        [field]: val,
      },
    });
  } else {
    await prisma.companySettings.update({
      where: { userId: user.id },
      data: { [field]: val },
    });
  }

  // Revalidate the page showing settings
  revalidatePath("/settings/company");

  return { ok: true };
}


interface WarehouseFormData {
  name: string;
  address: string;
  responsible: string;
  comment?: string;
  openingHours: Record<string, { open: boolean; from: string; to: string }>;
}

export async function createWarehouse(data: WarehouseFormData) {
  // Get logged-in user email from cookie
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;

  if (!userEmail) {
    throw new Error("You must be logged in to create a warehouse.");
  }

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // Create warehouse
  const warehouse = await prisma.warehouse.create({
    data: {
      userId: user.id,
      name: data.name,
      address: data.address,
      responsible: data.responsible,
      comment: data.comment,
      openingHours: {
        create: Object.entries(data.openingHours).map(([day, hours]) => ({
          day,
          open: hours.open,
          from: hours.from,
          to: hours.to,
        })),
      },
    },
    include: { openingHours: true },
  });

  return warehouse;
}



export async function updateWarehouse(warehouseId: string, data: WarehouseFormData) {
  const { name, address, responsible, comment, openingHours } = data;

  const warehouse = await prisma.warehouse.update({
    where: { id: warehouseId },
    data: {
      name,
      address,
      responsible,
      comment,
      openingHours: {
        deleteMany: {}, // remove old hours
        create: Object.entries(openingHours).map(([day, hours]) => ({
          day,
          open: hours.open,
          from: hours.from,
          to: hours.to,
        })),
      },
    },
    include: { openingHours: true },
  });

  return warehouse;
}


/* export async function deleteProductAction(productId: string) {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });
    return { ok: true };
  } catch (err) {
    console.error("Failed to delete product:", err);
    return { ok: false, error: "Failed to delete product" };
  }
} */


export async function deleteOrderAction(orderId: string) {
  try {
    await prisma.order.delete({
      where: { id: orderId },
    });

    // Refresh the orders page after deletion
    revalidatePath("/dashboard/orders");

    return { success: true };
  } catch (err) {
    console.error("❌ Failed to delete order:", err);
    return { success: false, error: "Failed to delete order" };
  }
}

/* export async function acceptOrderAction(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "ACCEPTED" },
    });

    // Refresh orders page
    revalidatePath("/dashboard/orders");

    return { success: true };
  } catch (error) {
    console.error("❌ Accept order error:", error);
    return { success: false };
  }
} */


  export async function orderAction(
  orderId: string,
  action: "DELETE" | OrderStatus
) {
  try {
    if (action === "DELETE") {
      await prisma.order.delete({ where: { id: orderId } });
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: action },
      });
    }

    revalidatePath("/dashboard/orders");

    return { success: true };
  } catch (error) {
    console.error("❌ Order Action Error:", error);
    return { success: false };
  }
}



export async function deleteDemandAction(id: string) {
  try {
    await prisma.demand.delete({
      where: { id },
    });

    revalidatePath("/dashboard/demands");
    return { success: true };
  } catch (error) {
    console.error("❌ Delete Demand Error:", error);
    return { success: false };
  }
}

// UPDATE status (DRAFT / SAVED)
export async function updateDemandStatusAction(id: string, status: "DRAFT" | "SAVED") {
  try {
    await prisma.demand.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/dashboard/demands");
    return { success: true };
  } catch (error) {
    console.error("❌ Update Demand Status Error:", error);
    return { success: false };
  }
}



export async function deleteUserAction(userId: string) {
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/dashboard/users");
  return { success: true, message: "User deleted successfully" };
}

// UPDATE APPROVAL STATUS
export async function updateApprovalStatusAction(userId: string, status: any) {
  await prisma.user.update({
    where: { id: userId },
    data: { approvalStatus: status },
  });

  revalidatePath("/dashboard/users");
  return { success: true, message: "Status updated" };
}

// UPDATE USER TYPE (ADMIN / USER / SUPERADMIN)
export async function updateUserTypeAction(userId: string, userType: any) {
  await prisma.user.update({
    where: { id: userId },
    data: { userType },
  });

  revalidatePath("/dashboard/users");
  return { success: true, message: "User role updated" };
}



export async function deleteProductAction(productId: string) {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    return { ok: true };
  } catch (err: any) {
    console.error("Error deleting product:", err);
    return { ok: false, error: err.message };
  }
}

// Check product availability
export async function checkProductAvailabilityAction(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        stock: true,
        availability: true,
      },
    });

    if (!product) throw new Error("Product not found");

    return {
      stock: product.stock,
      availability: product.availability,
    };
  } catch (err: any) {
    console.error("Error checking product availability:", err);
    throw new Error(err.message);
  }
}


export async function toggleProductStockAction(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { stock: true, name: true },
  });

  if (!product) throw new Error("Product not found");

  // Toggle stock
  const newStock = product.stock === "IN_STOCK" ? "OUT_OF_STOCK" : "IN_STOCK";

  const updated = await prisma.product.update({
    where: { id: productId },
    data: { stock: newStock },
  });

  return updated;
}


export async function setDemandStatusAction(demandId: string, status: "DRAFT" | "SAVED") {
  try {
    const updated = await prisma.demand.update({
      where: { id: demandId },
      data: { status },
    });

    return { ok: true, demand: updated };
  } catch (err: any) {
    return { ok: false, error: err.message };
  }
}