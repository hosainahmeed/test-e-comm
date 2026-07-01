"use client";

import InvoiceSection from "@/components/profile/InvoiceSection";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import BulkOrderHistory from "@/components/profile/OrderHistory";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ReviewsSection from "@/components/profile/ReviewsSection";
import SavedAddresses from "@/components/profile/SavedAddresses";
import SecuritySection from "@/components/profile/SecuritySection";
import WalletSection from "@/components/profile/WalletSection";
import WholesaleDashboard from "@/components/profile/WholesaleDashboard";
import { useProfile } from "@/contexts/ProfileContext";
import React from "react";
export default function ProfilePage() {
  const { accountType, activeSection } = useProfile();

  const renderContent = () => {
    // Retail Sections
    if (accountType === "retail") {
      switch (activeSection) {
        case "overview":
          return <RetailOverview />;
        case "orders":
          return <BulkOrderHistory />;
        case "addresses":
          return <SavedAddresses />;
        case "wallet":
          return <WalletSection />;
        case "reviews":
          return <ReviewsSection />;
        case "notifications":
          return <NotificationPreferences />;
        case "security":
          return <SecuritySection />;
        default:
          return <RetailOverview />;
      }
    }

    // Wholesale Sections
    switch (activeSection) {
      case "overview":
        return <WholesaleDashboard />;
      case "bulk-orders":
        return <BulkOrderHistory />;
      case "invoices":
        return <InvoiceSection />;
      case "addresses":
        return <SavedAddresses />;
      case "wallet":
        return <WalletSection />;
      case "notifications":
        return <NotificationPreferences />;
      case "security":
        return <SecuritySection />;
      default:
        return <WholesaleDashboard />;
    }
  };

  return (
    <div>
      <ProfileHeader />
      {renderContent()}
    </div>
  );
}

// Retail Overview Component
function RetailOverview() {
  const { profile } = useProfile();
  if (profile.type !== "retail") return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl  border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">
            {profile.totalOrders}
          </p>
        </div>
        <div className="bg-white rounded-xl  border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
          <p className="text-3xl font-bold text-gray-900">
            ${profile.wallet.balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl  border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Reviews Written</p>
          <p className="text-3xl font-bold text-gray-900">
            {profile.reviews.length}
          </p>
        </div>
      </div>

      <BulkOrderHistory />
      {/* Recent Orders */}
      <div className="bg-white rounded-xl  border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
      </div>
    </div>
  );
}
