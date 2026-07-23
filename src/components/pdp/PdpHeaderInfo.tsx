import React from "react";
import { Zap, Heart, Check, Link as LinkIcon, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./ProductDetails.module.css";

interface PdpHeaderInfoProps {
  badges?: string[];
  brandName: string;
  subCategoryName: string;
  title: string;
  shortDescription: string;
  wish: boolean;
  copied: boolean;
  onToggleWishlist: () => void;
  onCopyLink: () => void;
}

export const PdpHeaderInfo: React.FC<PdpHeaderInfoProps> = ({
  badges,
  brandName,
  subCategoryName,
  title,
  shortDescription,
  wish,
  copied,
  onToggleWishlist,
  onCopyLink,
}) => {
  return (
    <div className="flex flex-col">
      {/* Badges */}
      {badges && badges.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {badges.map((b) => {
            const flash = b.toLowerCase().includes("flash");
            return (
              <span
                key={b}
                className={cn(
                  styles.badgePill,
                  flash ? styles.badgeSale : styles.badgeMuted,
                )}
              >
                {flash && <Zap className="h-3 w-3" />}
                {b}
              </span>
            );
          })}
        </div>
      )}

      {/* Title block */}
      <div className="flex items-start justify-between gap-3 flex-col md:flex-row">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            {brandName} · {subCategoryName}
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            {title}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleWishlist}
            className={styles.iconCircleBtn}
            aria-label={wish ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                wish && "fill-red-500 text-red-500",
              )}
            />
          </button>
          <button
            type="button"
            onClick={onCopyLink}
            className={styles.iconCircleBtn}
            aria-label="Copy product link"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <LinkIcon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            className={styles.iconCircleBtn}
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
        {shortDescription}
      </p>
    </div>
  );
};
