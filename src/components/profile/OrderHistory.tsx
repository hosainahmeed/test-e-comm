"use client";

import React, { useState } from "react";
import {
  Package,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";
import InvoiceButton from "./InvoiceButton";
import { useProfile } from "@/contexts/ProfileContext";

const statusConfig = {
  processing: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    label: "Processing",
  },
  shipped: {
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50",
    label: "Shipped",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    label: "Delivered",
  },
};

export default function BulkOrderHistory() {
  const { profile } = useProfile();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (profile.type !== "wholesale") return null;

  return (
    <div className="bg-white rounded-xl  border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Bulk Order History
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {profile.bulkOrders.length} total order
            {profile.bulkOrders.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
          <FileText size={16} />
          Export Orders
        </button>
      </div>

      <div className="space-y-4">
        {profile.bulkOrders.map((order) => {
          const StatusIcon =
            statusConfig[order.status as keyof typeof statusConfig]?.icon ||
            Clock;
          const isExpanded = expandedOrder === order.id;

          return (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[order.status as keyof typeof statusConfig]?.bg} ${statusConfig[order.status as keyof typeof statusConfig]?.color}`}
                  >
                    <StatusIcon size={14} />
                    {
                      statusConfig[order.status as keyof typeof statusConfig]
                        ?.label
                    }
                  </span>
                  <span className="font-semibold text-gray-900">
                    ${order.total.toLocaleString()}
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {order.trackingNumber && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Tracking:</span>{" "}
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {order.status === "delivered" && (
                      <InvoiceButton order={order} />
                    )}
                    {order.status === "shipped" && (
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100">
                        Track Shipment
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                      <Package size={16} />
                      Reorder
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
