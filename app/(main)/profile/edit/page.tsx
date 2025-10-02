// app/profile/edit/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateProfileBasicsAction } from "@/app/actions";
import { prisma } from "@/app/utils/db";
import SubmitButton from "@/components/general/SubmitButton";
export const dynamic = "force-dynamic";

export default async function EditProfile({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const ok = sp?.ok === "1";
  const error = sp?.error ?? "";

  const jar = await cookies();
  const email = jar.get("bilvio_session")?.value ?? "";
  if (!email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      companyWebsiteUrl: true, // ← fetch for prefill
    },
  });

  if (!user) redirect("/login?error=notfound");

  return (
    <div className="max-w-7xl p-2 m-2 sm:mx-6 md:mx-8 lg:mx-auto">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Edit Profile</h1>
        <p className="text-sm text-muted-foreground mt-2">Update your basic profile details.</p>
      </header>

      <section className="bg-white border shadow-sm p-4 mt-4 sm:mx-6 md:mx-8 lg:mx-auto">
        {ok && <p className="mt-2 text-green-700">Profile updated successfully.</p>}
        {!!error && <p className="mt-2 text-red-600">{decodeURIComponent(error)}</p>}

        <form
          action={updateProfileBasicsAction}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full md:max-w-2xl"
        >
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">First Name</span>
            <input
              type="text"
              name="firstName"
              defaultValue={user.firstName ?? ""}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Last Name</span>
            <input
              type="text"
              name="lastName"
              defaultValue={user.lastName ?? ""}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Phone Number</span>
            <input
              type="tel"
              name="phone"
              defaultValue={user.phone ?? ""}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Email: read-only, not submitted */}
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Email (read-only)</span>
            <input
              type="email"
              placeholder={user.email ?? ""}
              disabled
              className="w-full border h-9 border-gray-200 bg-gray-50 px-3 py-2 rounded-none"
              title="Email cannot be changed"
            />
          </label>

          {/* Company Website URL (optional) */}
          <label className="grid gap-1 md:col-span-2 min-w-0">
            <span className="text-sm font-medium">Company Website URL (optional)</span>
            <input
              type="string"
              name="companyWebsiteUrl"
              placeholder="https://example.com"
              defaultValue={user.companyWebsiteUrl ?? ""}
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-xs">Include http:// or https://</span>
          </label>

          <div className="pt-2 md:col-span-2">
            <SubmitButton text="Update" />
          </div>
        </form>
      </section>
    </div>
  );
}
