"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { updateCompanySettingsAction } from "@/app/actions";

export default function CompanySettingsClient({ initial }: any) {
  const [inputs, setInputs] = useState(initial);
  const [isSaving, startSaving] = useTransition();

  const handleChange = (field: string, value: string) => {
    setInputs((prev: any) => ({ ...prev, [field]: value }));

    startSaving(async () => {
      await updateCompanySettingsAction(field, value);
    });
  };

  const clearField = (field: string) => handleChange(field, "");

  const inputClass = (value: string) =>
    `rounded px-2 py-1 text-sm w-full pr-7 ${
      value ? "border border-green-500" : "border border-gray-300"
    }`;

  return (
    <section className="max-w-7xl p-4 sm:mx-6 md:mx-8 lg:mx-auto">
      <h1 className="text-xl font-bold mb-4 text-start">
        Edit Company Setting
      </h1>

      <div className="bg-white border shadow-sm p-4 space-y-4">
        {/* Card Preparation */}
        <div className="space-y-1">
          <h2
            className="text-sm font-semibold h-8 p-1 text-center"
            style={{ backgroundColor: "#619aab" }}
          >
            Card Preparation (New Cars)
          </h2>

          <label className="flex items-center space-x-1 text-sm">
            <span className="text-red-500">*</span>
            <span>Only cars with PDI</span>
          </label>

          <div className="relative w-52">
            <select
              className={inputClass(inputs.onlyCarsWithPDI)}
              value={inputs.onlyCarsWithPDI}
              onChange={(e) =>
                handleChange("onlyCarsWithPDI", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {inputs.onlyCarsWithPDI && (
              <X
                onClick={() => clearField("onlyCarsWithPDI")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-gray-800 mr-2"
              />
            )}
          </div>
        </div>

        {/* Registration */}
        <div className="space-y-1">
          <h2
            className="text-sm font-semibold h-8 p-1 text-center"
            style={{ backgroundColor: "#619aab" }}
          >
            Registration (New Cars)
          </h2>

          <label className="flex items-center space-x-1 text-sm">
            <span className="text-red-500">*</span>
            <span>I accept registration</span>
          </label>

          <div className="relative w-52">
            <select
              className={inputClass(inputs.iAcceptRegistration)}
              value={inputs.iAcceptRegistration}
              onChange={(e) =>
                handleChange("iAcceptRegistration", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {inputs.iAcceptRegistration && (
              <X
                onClick={() => clearField("iAcceptRegistration")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-gray-800 mr-2"
              />
            )}
          </div>
        </div>

        {/* Warranty */}
        <div className="space-y-1">
          <h2
            className="text-sm font-semibold h-8 p-1 text-center"
            style={{ backgroundColor: "#619aab" }}
          >
            Warranty (New Cars)
          </h2>

          <label className="flex items-center space-x-1 text-sm">
            <span className="text-red-500">*</span>
            <span>I accept already started warranty</span>
          </label>

          <div className="relative w-52">
            <select
              className={inputClass(inputs.iAcceptWarranty)}
              value={inputs.iAcceptWarranty}
              onChange={(e) =>
                handleChange("iAcceptWarranty", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {inputs.iAcceptWarranty && (
              <X
                onClick={() => clearField("iAcceptWarranty")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-gray-800 mr-2"
              />
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-1">
          <h2
            className="text-sm font-semibold h-8 p-1 text-center"
            style={{ backgroundColor: "#619aab" }}
          >
            Documents
          </h2>

          {/* COC New */}
          <label className="flex items-center space-x-1 text-sm">
            <span className="text-red-500">*</span>
            <span>I need COC (New Car)</span>
          </label>

          <div className="relative w-52">
            <select
              className={inputClass(inputs.cocNewCars)}
              value={inputs.cocNewCars}
              onChange={(e) =>
                handleChange("cocNewCars", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {inputs.cocNewCars && (
              <X
                onClick={() => clearField("cocNewCars")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-gray-800 mr-2"
              />
            )}
          </div>

          {/* COC Used */}
          <label className="flex items-center space-x-1 text-sm">
            <span className="text-red-500">*</span>
            <span>I need COC (Used Cars)</span>
          </label>

          <div className="relative w-52">
            <select
              className={inputClass(inputs.cocUsedCars)}
              value={inputs.cocUsedCars}
              onChange={(e) =>
                handleChange("cocUsedCars", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {inputs.cocUsedCars && (
              <X
                onClick={() => clearField("cocUsedCars")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-gray-800 mr-2"
              />
            )}
          </div>

          {/* Document Address */}
          <label className="flex items-center space-x-1 text-sm">
            <span className="text-red-500">*</span>
            <span>Address for sending documents</span>
          </label>

          <div className="relative w-80">
            <textarea
              className={inputClass(inputs.documentAddress)}
              value={inputs.documentAddress}
              onChange={(e) =>
                handleChange("documentAddress", e.target.value)
              }
              placeholder="Enter address"
            />

            {inputs.documentAddress && (
              <X
                onClick={() => clearField("documentAddress")}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer text-gray-600 mr-2"
              />
            )}
          </div>
        </div>

        {/* Save button - NOT needed but kept for UI */}
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-3 py-1 text-sm">
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </section>
  );
}
