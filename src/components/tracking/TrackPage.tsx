import React, { useState } from "react";

// Types for our tracking data
interface TrackingEvent {
  date: string;
  status: string;
  location: string;
  description: string;
}

interface OrderTracking {
  orderNumber: string;
  email: string;
  status: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  events: TrackingEvent[];
}

// Mock database - in production, this would come from your API
const MOCK_ORDERS: Record<string, OrderTracking> = {
  "ORD-12345": {
    orderNumber: "ORD-12345",
    email: "john@example.com",
    status: "In Transit",
    estimatedDelivery: "2026-07-20",
    carrier: "FedEx",
    trackingNumber: "FX1234567890",
    events: [
      {
        date: "2026-07-17T14:30:00",
        status: "Out for Delivery",
        location: "Local Distribution Center",
        description: "Package is out for delivery",
      },
      {
        date: "2026-07-16T09:15:00",
        status: "In Transit",
        location: "Regional Hub",
        description: "Package arrived at regional sorting facility",
      },
      {
        date: "2026-07-15T16:45:00",
        status: "Shipped",
        location: "Origin Facility",
        description: "Package has been shipped",
      },
      {
        date: "2026-07-14T11:00:00",
        status: "Processing",
        location: "Warehouse",
        description: "Order confirmed and processing",
      },
    ],
  },
  "ORD-67890": {
    orderNumber: "ORD-67890",
    email: "jane@example.com",
    status: "Delivered",
    estimatedDelivery: "2026-07-15",
    carrier: "UPS",
    trackingNumber: "UPS9876543210",
    events: [
      {
        date: "2026-07-15T10:30:00",
        status: "Delivered",
        location: "Customer Address",
        description: "Package delivered to recipient",
      },
      {
        date: "2026-07-14T08:00:00",
        status: "Out for Delivery",
        location: "Local Distribution Center",
        description: "Package out for delivery",
      },
    ],
  },
};

// Console-based data layer - in production, replace with actual API calls
const trackingService = {
  async getOrderTracking(
    orderNumber: string,
    email: string,
  ): Promise<OrderTracking> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log the request to console (like a real API would)
    console.log("[Tracking API] Request:", {
      orderNumber,
      email,
      timestamp: new Date().toISOString(),
    });

    // Simulate API validation and lookup
    const order = MOCK_ORDERS[orderNumber];

    if (!order) {
      console.log("[Tracking API] Error: Order not found");
      throw new Error(
        "Order not found. Please check your order number and try again.",
      );
    }

    if (order.email !== email) {
      console.log("[Tracking API] Error: Email mismatch");
      throw new Error("Email does not match our records for this order.");
    }

    console.log("[Tracking API] Success:", order);
    return order;
  },
};

const TrackPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTrackingData(null);

    // Form validation
    if (!orderNumber.trim()) {
      setError("Please enter your order number");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // In production, replace with your actual API endpoint
      const data = await trackingService.getOrderTracking(orderNumber, email);
      setTrackingData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrderNumber("");
    setEmail("");
    setError(null);
    setTrackingData(null);
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "in transit":
      case "out for delivery":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "processing":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusDotColor = (status: string, isLatest: boolean): string => {
    if (isLatest) return "bg-[#A937E2] border-[#A937E2]";

    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500 border-green-500";
      case "out for delivery":
        return "bg-amber-500 border-amber-500";
      case "in transit":
        return "bg-blue-500 border-blue-500";
      default:
        return "bg-gray-300 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Track Your Order
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Enter your order number and email to get real-time updates on your
            delivery
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Tracking Form Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Order Number Input */}
              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Order Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., ORD-12345"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#A937E2] focus:border-[#A937E2] outline-none transition text-sm sm:text-base"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 ml-1">
                  Demo orders: ORD-12345, ORD-67890
                </p>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#A937E2] focus:border-[#A937E2] outline-none transition text-sm sm:text-base"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1.5 ml-1">
                  Demo: john@example.com or jane@example.com
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                  <svg
                    className="w-5 h-5 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 bg-[#A937E2] text-white py-2.5 sm:py-3 px-6 rounded-lg sm:rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A937E2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm sm:text-base shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Tracking...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Track Order
                    </span>
                  )}
                </button>

                {trackingData && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 border-2 border-[#A937E2] text-[#A937E2] rounded-lg sm:rounded-xl hover:bg-[#A937E2] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#A937E2] focus:ring-offset-2 transition-all duration-200 font-medium text-sm sm:text-base"
                  >
                    Track Another Order
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-4 sm:space-y-6 animate-fadeIn">
              {/* Order Summary Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#A937E2]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Order Summary
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Order Number
                    </p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {trackingData.orderNumber}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(trackingData.status)}`}
                    >
                      {trackingData.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">Carrier</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {trackingData.carrier}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Tracking Number
                    </p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base font-mono">
                      {trackingData.trackingNumber}
                    </p>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Estimated Delivery
                    </p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {new Date(
                        trackingData.estimatedDelivery,
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline Card */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#A937E2]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Tracking History
                  </h2>
                </div>

                <div className="relative ml-1 sm:ml-2">
                  {trackingData.events.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start mb-6 sm:mb-8 last:mb-0 group"
                    >
                      {/* Timeline line and dot */}
                      <div className="flex flex-col items-center mr-3 sm:mr-4">
                        <div
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-all duration-200 ${
                            index === 0
                              ? "bg-[#A937E2] border-[#A937E2] ring-4 ring-[#A937E2]/20"
                              : "bg-white border-gray-300 group-hover:border-[#A937E2]"
                          }`}
                        ></div>
                        {index < trackingData.events.length - 1 && (
                          <div
                            className={`w-0.5 h-full min-h-[2rem] mt-1.5 ${
                              index === 0 ? "bg-[#A937E2]" : "bg-gray-200"
                            }`}
                          ></div>
                        )}
                      </div>

                      {/* Event content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1">
                          <span
                            className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium border w-fit ${getStatusColor(event.status)}`}
                          >
                            {event.status}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                            <span className="mx-1">•</span>
                            {new Date(event.date).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base font-medium text-gray-900">
                          {event.location}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12 text-xs sm:text-sm text-gray-500">
          <p>Need help? Contact our support team at support@example.com</p>
        </div>
      </div>

      {/* Add custom animation styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TrackPage;
