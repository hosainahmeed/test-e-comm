"use client";

import React from "react";
import {
  CreditCard,
  FileText,
  Package,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Calendar,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

export default function WholesaleDashboard() {
  const { profile } = useProfile();

  if (profile.type !== "wholesale") return null;

  const creditPercentage = (profile.creditUsed / profile.creditLimit) * 100;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <CreditCard size={20} className="text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Credit Available</p>
          <p className="text-2xl font-bold text-gray-900">
            ${(profile.creditLimit - profile.creditUsed).toLocaleString()}
          </p>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Used: ${profile.creditUsed.toLocaleString()}</span>
              <span>Limit: ${profile.creditLimit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  creditPercentage > 80
                    ? "bg-red-500"
                    : creditPercentage > 60
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${creditPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <FileText size={20} className="text-orange-600" />
            </div>
            {profile.pendingInvoices.count > 0 && (
              <AlertCircle size={16} className="text-orange-500" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-1">Pending Invoices</p>
          <p className="text-2xl font-bold text-gray-900">
            {profile.pendingInvoices.count}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Total due: ${profile.pendingInvoices.totalDue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Bulk Orders</p>
          <p className="text-2xl font-bold text-gray-900">
            {profile.bulkOrders.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Active:{" "}
            {profile.bulkOrders.filter((o) => o.status === "processing").length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Wallet size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
          <p className="text-2xl font-bold text-gray-900">
            ${profile.wallet.balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Business Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              Business Name
            </label>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {profile.businessName}
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              Trade License
            </label>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {profile.tradeLicenseNumber}
            </p>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider">
              Tax ID
            </label>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {profile.taxId}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bulk Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Bulk Orders
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {profile.bulkOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "delivered"
                      ? "bg-green-50 text-green-700"
                      : order.status === "processing"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <p className="text-sm font-semibold text-gray-900">
                  ${order.total.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
