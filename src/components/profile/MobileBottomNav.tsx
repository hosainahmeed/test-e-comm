"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Wallet,
  User,
  MoreHorizontal,
  MapPin,
  Star,
  Bell,
  Shield,
  FileText,
  X,
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

const retailNavItems = [
  { id: "overview", label: "Home", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "overview", label: "Profile", icon: User },
];

const moreRetailItems = [
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const wholesaleNavItems = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "bulk-orders", label: "Orders", icon: Package },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "overview", label: "Profile", icon: User },
];

const moreWholesaleItems = [
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function MobileBottomNav() {
  const { accountType, activeSection, setActiveSection } = useProfile();
  const [showMore, setShowMore] = useState(false);

  const mainItems =
    accountType === "retail" ? retailNavItems : wholesaleNavItems;
  const moreItems =
    accountType === "retail" ? moreRetailItems : moreWholesaleItems;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around">
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 ${
                  activeSection === item.id ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 truncate">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setShowMore(true)}
            className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 text-gray-400"
          >
            <MoreHorizontal size={20} />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* More Menu Overlay */}
      {showMore && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setShowMore(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                More Options
              </h3>
              <button
                onClick={() => setShowMore(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setShowMore(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Icon size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div className="h-16 md:hidden" />
    </>
  );
}
