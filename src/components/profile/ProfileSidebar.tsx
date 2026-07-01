"use client";

import React from "react";
import {
  User,
  Package,
  MapPin,
  Wallet,
  Star,
  Bell,
  Shield,
  FileText,
  RotateCcw,
  Building2,
  LayoutDashboard,
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

const retailNavItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Order History", icon: Package },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "wallet", label: "Wallet & Credits", icon: Wallet },
  { id: "reviews", label: "My Reviews", icon: Star },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const wholesaleNavItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "bulk-orders", label: "Bulk Orders", icon: Package },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "wallet", label: "Wallet & Credits", icon: Wallet },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function ProfileSidebar() {
  const {
    profile,
    accountType,
    setAccountType,
    activeSection,
    setActiveSection,
  } = useProfile();

  const navItems =
    accountType === "retail" ? retailNavItems : wholesaleNavItems;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Account Type Toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setAccountType("retail")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              accountType === "retail"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <User size={16} />
            Retail
          </button>
          <button
            onClick={() => setAccountType("wholesale")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              accountType === "wholesale"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Building2 size={16} />
            Wholesale
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
