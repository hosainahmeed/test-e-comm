"use client";

import React, { useRef } from "react";
import { Camera, Building2, Calendar, Mail, Phone } from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

export default function ProfileHeader() {
  const { profile, accountType, updateProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result as string } as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const getDisplayName = () => {
    if (accountType === "retail" && "firstName" in profile) {
      return `${profile.firstName} ${profile.lastName}`;
    }
    if (accountType === "wholesale" && "businessName" in profile) {
      return profile.businessName;
    }
    return "";
  };

  const getSubtitle = () => {
    if (accountType === "wholesale" && "contactName" in profile) {
      return `Contact: ${profile.contactName}`;
    }
    return "";
  };

  return (
    <div className="bg-white rounded-xl  border border-gray-200 p-6 mb-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              getDisplayName().charAt(0).toUpperCase()
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-gray-200  hover:bg-gray-50 transition-colors"
          >
            <Camera size={14} className="text-gray-600" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getDisplayName()}
              </h1>
              {getSubtitle() && (
                <p className="text-sm text-gray-500 mt-0.5">{getSubtitle()}</p>
              )}
            </div>
            {accountType === "wholesale" && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                Wholesale Account
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Mail size={14} />
              {profile.email}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Phone size={14} />
              {profile.phone}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Calendar size={14} />
              Member since{" "}
              {new Date(profile.joinDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
