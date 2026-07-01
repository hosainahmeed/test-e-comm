"use client";

import React from "react";
import {
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import InvoiceButton from "./InvoiceButton";
import { useProfile } from "@/contexts/ProfileContext";

export default function InvoiceSection() {
  const { profile } = useProfile();

  if (profile.type !== "wholesale") return null;

  // Mock pending invoices
  const pendingInvoices = [
    {
      id: "inv-001",
      orderNumber: "BLK-2024-0102",
      date: "2024-03-25",
      amount: 8500.0,
      dueDate: "2024-04-25",
      status: "pending",
    },
    {
      id: "inv-002",
      orderNumber: "BLK-2024-0103",
      date: "2024-04-01",
      amount: 15000.0,
      dueDate: "2024-05-01",
      status: "pending",
    },
    {
      id: "inv-003",
      orderNumber: "BLK-2024-0101",
      date: "2024-03-10",
      amount: 12500.0,
      dueDate: "2024-04-10",
      status: "overdue",
    },
  ];

  const paidInvoices = [
    {
      id: "inv-004",
      orderNumber: "BLK-2024-0098",
      date: "2024-02-15",
      amount: 9800.0,
      paidDate: "2024-02-20",
      status: "paid",
    },
    {
      id: "inv-005",
      orderNumber: "BLK-2024-0099",
      date: "2024-02-28",
      amount: 11200.0,
      paidDate: "2024-03-05",
      status: "paid",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Pending Invoices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Pending Invoices
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {pendingInvoices.length} invoice
              {pendingInvoices.length !== 1 ? "s" : ""} pending
            </p>
          </div>
          {profile.pendingInvoices.totalDue > 0 && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Due</p>
              <p className="text-xl font-bold text-red-600">
                ${profile.pendingInvoices.totalDue.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {pendingInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className={`p-4 border rounded-lg ${
                invoice.status === "overdue"
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {invoice.status === "overdue" ? (
                    <AlertCircle size={20} className="text-red-500" />
                  ) : (
                    <Clock size={20} className="text-yellow-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {invoice.orderNumber}
                    </p>
                    <p className="text-xs text-gray-500">
                      Invoice date:{" "}
                      {new Date(invoice.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      {invoice.status === "overdue" && (
                        <span className="text-red-600 font-medium ml-1">
                          (Overdue)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </span>
                  <InvoiceButton
                    order={{
                      id: invoice.orderNumber,
                      orderNumber: invoice.orderNumber,
                      date: invoice.date,
                      total: invoice.amount,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paid Invoices */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Paid Invoices
        </h3>

        <div className="space-y-3">
          {paidInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {invoice.orderNumber}
                    </p>
                    <p className="text-xs text-gray-500">
                      Paid on {new Date(invoice.paidDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </span>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
