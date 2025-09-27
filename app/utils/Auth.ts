"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/app/utils/db";

const loginSchema = z.object({
  email: z.string().email("Enter a valid e-mail address."),
  password: z.string().min(1, "Password is required."),
});

export async function loginUserAction(input: z.infer<typeof loginSchema>) {
  const { email, password } = loginSchema.parse(input);

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });

  if (!user || user.password !== password) {
    redirect("/login?error=invalid");
  }
  redirect("/");
}
