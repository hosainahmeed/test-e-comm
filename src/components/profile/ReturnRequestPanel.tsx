"use client";

import React, { useState } from "react";
import { X, Package, Upload, CheckCircle } from "lucide-react";

interface ReturnRequestPanelProps {
  order: {
    id: string;
    orderNumber: string;
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
      image: string;
    }>;
  };
  onClose: () => void;
}

export default function ReturnRequestPanel({
  order,
  onClose,
}: ReturnRequestPanelProps) {
  const [step, setStep] = useState<"select" | "reason" | "submitted">("select");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [returnReason, setReturnReason] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const reasons = [
    "Item defective or damaged",
    "Wrong item received",
    "Item not as described",
    "Changed my mind",
    "Found better price elsewhere",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("submitted");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {step === "submitted" ? "Return Submitted" : "Return Request"}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Order {order.orderNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {step === "submitted" ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Return Request Submitted!
            </h4>
            <p className="text-sm text-gray-600 mb-6">
              Your return request has been submitted successfully. You'll
              receive an email with return instructions within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 w-full"
            >
              Done
            </button>
          </div>
        ) : step === "select" ? (
          <>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Select items you want to return:
              </p>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedItems.includes(item.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, item.id]);
                        } else {
                          setSelectedItems(
                            selectedItems.filter((id) => id !== item.id),
                          );
                        }
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setStep("reason")}
                disabled={selectedItems.length === 0}
                className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Return
                </label>
                <div className="space-y-2">
                  {reasons.map((reason) => (
                    <label
                      key={reason}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        returnReason === reason
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={reason}
                        checked={returnReason === reason}
                        onChange={(e) => setReturnReason(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-900">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                  placeholder="Please provide any additional details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag & drop photos here, or click to select
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Max file size: 5MB
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={() => setStep("select")}
                className="flex-1 py-2.5 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!returnReason}
                className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
