"use client";
import React, { useState } from "react";
import Link from "next/link";

const WholesaleApplication: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "+1",
    catalogInterest: [] as string[],
    tobaccoLicense: null as File | null,
    additionalDocs: null as File | null,
  });

  const [fileName, setFileName] = useState({
    tobaccoLicense: "",
    additionalDocs: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          catalogInterest: [...prev.catalogInterest, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          catalogInterest: prev.catalogInterest.filter(
            (item) => item !== value,
          ),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "tobaccoLicense" | "additionalDocs",
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
      setFileName((prev) => ({
        ...prev,
        [field]: file.name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Application submitted!");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Wholesale Application
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Complete the form to sign up.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  "
                required
              />
            </div>

            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  "
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  "
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none  "
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +1
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, "");
                    setFormData((prev) => ({
                      ...prev,
                      phone: rawValue,
                    }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none  "
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>

            {/* Catalog Interest */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What catalog are you interested in?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="catalogInterest"
                    value="Tobacco"
                    checked={formData.catalogInterest.includes("Tobacco")}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600  border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Tobacco</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="catalogInterest"
                    value="Hookahs & Accessories"
                    checked={formData.catalogInterest.includes(
                      "Hookahs & Accessories",
                    )}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600  border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Hookahs & Accessories
                  </span>
                </label>
              </div>
            </div>

            {/* Documentation - Tobacco License */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documentation (Tobacco License)
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="tobaccoLicense"
                  name="tobaccoLicense"
                  onChange={(e) => handleFileChange(e, "tobaccoLicense")}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="tobaccoLicense"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-offset-2  cursor-pointer"
                >
                  Add file
                </label>
                {fileName.tobaccoLicense && (
                  <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">
                    {fileName.tobaccoLicense}
                  </span>
                )}
              </div>
            </div>

            {/* Additional Documentation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Documentation
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="additionalDocs"
                  name="additionalDocs"
                  onChange={(e) => handleFileChange(e, "additionalDocs")}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="additionalDocs"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-offset-2  cursor-pointer"
                >
                  Add file
                </label>
                {fileName.additionalDocs && (
                  <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">
                    {fileName.additionalDocs}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-offset-2  transition-colors"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>
              Please note that submitting an application for wholesale access
              does not guarantee approval, as each application is individually
              reviewed.
            </p>
            <p className="mt-1">
              Our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>{" "}
              apply when submitting this form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleApplication;
