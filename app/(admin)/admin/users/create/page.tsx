// app/admin/users/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/general/SubmitButton";

export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation example
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data:", form);
    // Here you can call your server action later
  };

  const handleCancel = () => {
    router.back(); // Go back to previous page
  };

  return (
    <div className="max-w-7xl p-2 m-2 sm:mx-6 md:mx-8 lg:mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Users / Edit User</h1>
      <div className="bg-white border shadow-sm p-4 mt-4 sm:mx-6 md:mx-8 lg:mx-auto">
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={handleSave}
        >
          {/* Email */}
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Password */}
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Confirm Password */}
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* First Name */}
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">First Name</span>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Last Name */}
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Last Name</span>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Phone */}
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Phone Number</span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border h-9 border-gray-300 bg-white px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-2 mt-2 ">
            <SubmitButton text="Save" />
            <button
              type="button"
              onClick={handleCancel}
              className="bg-amber-600 cursor-pointer text-white px-4 py-1 rounded-xs hover:bg-amber-500 "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
