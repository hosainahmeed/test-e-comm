"use client";

import React, { useState } from "react";
import { Download, FileText, Loader } from "lucide-react";

interface InvoiceButtonProps {
  order: {
    id: string;
    orderNumber: string;
    date: string;
    total: number;
  };
}

export default function InvoiceButton({ order }: InvoiceButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadInvoice = async () => {
    setIsDownloading(true);

    // Simulate PDF generation/download
    setTimeout(() => {
      // In a real app, this would generate and download a PDF
      console.log(`Downloading invoice for ${order.orderNumber}`);
      alert(
        `Invoice ${order.orderNumber} downloaded successfully!\n\nOrder Date: ${order.date}\nTotal: $${order.total.toFixed(2)}`,
      );
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleDownloadInvoice}
      disabled={isDownloading}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
    >
      {isDownloading ? (
        <>
          <Loader size={16} className="animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download size={16} />
          Invoice PDF
        </>
      )}
    </button>
  );
}
