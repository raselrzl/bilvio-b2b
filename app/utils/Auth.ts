// app/utils/auth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectIfAuthed() {
  const jar = await cookies();
  if (jar.get("bilvio_session")?.value) redirect("/");
}
