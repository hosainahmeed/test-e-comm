"use client";

import { Truck, ShieldCheck, Lock, Headset } from "lucide-react";

export default function ValueFeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Free & Fast Shipping",
      description: "On all orders over $50 nationwide",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic Products",
      description: "Guaranteed direct from certified brands",
    },
    {
      icon: Lock,
      title: "100% Secure Checkout",
      description: "Encrypted SSL & safe payment protection",
    },
    {
      icon: Headset,
      title: "24/7 Dedicated Support",
      description: "Expert assistance anytime you need",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-[#a937e2]/10 flex items-center justify-center text-[#a937e2] shrink-0 group-hover:scale-110 transition-transform duration-200">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
