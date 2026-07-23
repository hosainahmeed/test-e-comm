import React from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./ProductDetails.module.css";

interface PdpActionButtonsProps {
  available: boolean;
  addedFlash: boolean;
  sellingPrice: number;
  onAddToCart: () => void;
}

export const PdpActionButtons: React.FC<PdpActionButtonsProps> = ({
  available,
  addedFlash,
  sellingPrice,
  onAddToCart,
}) => {
  return (
    <>
      {/* Desktop Main Purchase Actions */}
      <div className="mt-6 grid md:grid-cols-2 gap-2.5 grid-cols-1">
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!available}
          className={styles.primaryBtn}
        >
          {addedFlash ? (
            <span className="inline-flex items-center justify-center gap-2 text-sm">
              <Check className="h-4 w-4" /> Added to bag
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 text-sm">
              <ShoppingBag className="h-4 w-4" /> Add to bag
            </span>
          )}
        </button>
        <button
          type="button"
          disabled={!available}
          className={styles.secondaryBtn}
        >
          Buy it now
        </button>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className={styles.mobileStickyBar}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase font-semibold text-gray-500">
              Total Price
            </span>
            <span className="text-base font-bold text-gray-900">
              ৳{sellingPrice.toLocaleString("en-US")}
            </span>
          </div>
          <button
            type="button"
            onClick={onAddToCart}
            disabled={!available}
            className={cn(styles.primaryBtn, "py-2.5! px-4! text-xs! w-auto! flex-1")}
          >
            {addedFlash ? (
              <span className="inline-flex items-center justify-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Added
              </span>
            ) : (
              <span className="inline-flex items-center justify-center gap-1.5">
                <ShoppingBag className="h-3.5 w-3.5" /> Add to Bag
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
