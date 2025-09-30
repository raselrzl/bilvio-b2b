// app/profile/change-password/page.tsx
import { changePasswordAction } from "@/app/actions";
import SubmitButton from "./SubmitButton";
import ClientPasswordRequired from "./ClientPasswordRequired";

export const metadata = { title: "Change Password • Bilvio" };

export default function ChangePassword({
  searchParams,
}: {
  searchParams?: { ok?: string; error?: string };
}) {
  const ok = searchParams?.ok === "1";
  const error = searchParams?.error ?? "";

  return (
    <div className="max-w-7xl p-2 m-2 sm:mx-6 md:mx-8 lg:mx-auto">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Change Password
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Update your account password.
        </p>
      </header>

      <section className=" bg-white border shadow-sm p-4 mt-4 sm:mx-6 md:mx-8 lg:mx-auto">
        {ok && (
          <p className="mt-4 text-green-700">Password changed successfully.</p>
        )}
        {!!error && (
          <p className="mt-4 text-red-600">{decodeURIComponent(error)}</p>
        )}

        {/* Responsive Form */}
        <form
          id="cpwd-form" /* ← only addition to your markup */
          action={changePasswordAction}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full md:max-w-2xl"
        >
          {/* Current password spans both columns on md+ */}
          <label className="grid gap-1 md:col-span-2 min-w-0">
            <span className="text-sm font-medium">Current Password</span>
            <input
              type="password"
              name="current"
              required
              autoComplete="current-password"
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="grid gap-1 md:col-span-2 min-w-0">
            <span className="text-sm font-medium">New Password</span>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder=" " 
              className="peer w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-xs peer-[&:not(:placeholder-shown):invalid]:text-red-600">
              Min. 8 characters, with upper, lower, and a number.
            </span>
          </label>

          <label className="grid gap-1 md:col-span-2 min-w-0">
            <span className="text-sm font-medium">Repeat New Password</span>
            <input
              type="password"
              name="confirm"
              minLength={8}
              placeholder=" "
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <div className="pt-2 md:col-span-2">
            <SubmitButton />
          </div>

          {/* mounts required-message logic without changing layout */}
          <ClientPasswordRequired formId="cpwd-form" />
        </form>
      </section>
    </div>
  );
}
