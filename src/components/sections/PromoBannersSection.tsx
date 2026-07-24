"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, PackageCheck } from "lucide-react";

export default function PromoBannersSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Banner 1: Wholesale */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-850 to-zinc-950 p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between min-h-[220px] group border border-zinc-800">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#a937e2]/20 rounded-full blur-3xl group-hover:bg-[#a937e2]/30 transition-all duration-500 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3 backdrop-blur-sm border border-white/10">
              <PackageCheck className="w-3.5 h-3.5 text-amber-300" />
              B2B Wholesale
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
              Wholesale & Bulk Supplies
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm">
              Save up to 40% when ordering in bulk for your lounge, shop, or venue with verified tax exemption.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#a937e2] hover:bg-[#9328cd] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Explore Wholesale Deals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Banner 2: Premium Flavors & Bowls */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950 via-zinc-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between min-h-[220px] group border border-purple-900/50">
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-500 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold mb-3 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              Featured Selection
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
              Premium Clay Bowls & Charcoal
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm">
              Upgrade your setup with heat management systems, natural coconut coals, and hand-glazed bowls.
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-gray-900! hover:bg-gray-100 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              Shop Accessories
              <ArrowRight className="w-4 h-4 text-gray-900" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
