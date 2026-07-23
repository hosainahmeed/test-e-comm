import React from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Countdown } from "./countdown";

interface PdpPriceBlockProps {
  sellingPrice: number;
  mrp: number;
  currency: string;
  discount: number;
  available: boolean;
  lowStock: boolean;
  stock: number;
  sku?: string;
  flashSale?: {
    enabled: boolean;
    endsAt: string;
  };
}

export const PdpPriceBlock: React.FC<PdpPriceBlockProps> = ({
  sellingPrice,
  mrp,
  currency,
  discount,
  available,
  lowStock,
  stock,
  sku,
  flashSale,
}) => {
  return (
    <div className="mt-5 rounded-xl border border-[#F0EDE8] bg-white p-4 shadow-xs sm:p-5">
      <div className="flex flex-wrap items-baseline gap-2.5">
        <span className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
          ৳{sellingPrice.toLocaleString()}
        </span>
        {mrp > sellingPrice && (
          <>
            <span className="text-sm text-gray-400 line-through">
              ৳{mrp.toLocaleString()}
            </span>
            <span className="rounded-full bg-[#A937E2]/10 px-2.5 py-0.5 text-xs font-bold text-[#A937E2]">
              Save {discount}%
            </span>
          </>
        )}
      </div>
      <p className="mt-1 text-[11px] text-gray-500">
        Inclusive of all taxes. {currency}.
      </p>

      {/* Flash sale banner */}
      {flashSale?.enabled && (
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#A937E2]/8 px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A937E2]">
            <Zap className="h-3.5 w-3.5" />
            Flash sale ends in
          </div>
          <Countdown endsAt={flashSale.endsAt} />
        </div>
      )}

      {/* Stock Status Indicator */}
      <div className="mt-3.5 flex items-center gap-2 text-xs">
        <span
          className={cn(
            "inline-block h-2 w-2 rounded-full",
            !available
              ? "bg-red-500"
              : lowStock
                ? "bg-amber-500"
                : "bg-emerald-500",
          )}
        />
        <span
          className={cn(
            "font-medium",
            !available ? "text-red-600" : "text-gray-900",
          )}
        >
          {!available
            ? "Currently unavailable"
            : lowStock
              ? `Only ${stock} left — order soon`
              : "In stock & ready to ship"}
        </span>
        {sku && (
          <span className="ml-auto text-[11px] text-gray-400">
            SKU: {sku}
          </span>
        )}
      </div>
    </div>
  );
};
