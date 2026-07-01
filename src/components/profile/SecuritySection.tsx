"use client";

import React, { useState } from "react";
import {
  Shield,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Mail,
  CheckCircle,
} from "lucide-react";

export default function SecuritySection() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password change
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setSuccess(true);
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Key size={20} className="text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            Change Password
          </h3>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">
              Password changed successfully!
            </span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Security Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={20} className="text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            Security Status
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Email Verified
                </p>
                <p className="text-xs text-gray-500">
                  Your email address is verified
                </p>
              </div>
            </div>
            <CheckCircle size={18} className="text-green-600" />
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone size={18} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500">
                  Enabled for extra security
                </p>
              </div>
            </div>
            <CheckCircle size={18} className="text-green-600" />
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Key size={18} className="text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Password Strength
                </p>
                <p className="text-xs text-gray-500">
                  Last changed 3 months ago
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-yellow-700">Good</span>
          </div>
        </div>
      </div>
    </div>
  );
}
