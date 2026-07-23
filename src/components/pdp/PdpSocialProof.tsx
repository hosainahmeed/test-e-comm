import React from "react";
import Link from "next/link";
import { StarRow } from "./star-row";

interface PdpSocialProofProps {
  averageRating: number;
  totalReviews: number;
  soldCount: number;
  wishlistCount: number;
}

export const PdpSocialProof: React.FC<PdpSocialProofProps> = ({
  averageRating,
  totalReviews,
  soldCount,
  wishlistCount,
}) => {
  return (
    <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
      <div className="flex items-center gap-1.5">
        <StarRow value={averageRating} size={14} />
        <span className="font-semibold text-gray-900">
          {averageRating.toFixed(1)}
        </span>
        <Link
          href="#reviews"
          className="text-gray-500 underline-offset-4 hover:underline hover:text-gray-900"
        >
          ({totalReviews} reviews)
        </Link>
      </div>
      <span className="h-3 w-px bg-gray-200" />
      <span className="text-gray-500">
        {soldCount.toLocaleString()}+ sold
      </span>
      <span className="h-3 w-px bg-gray-200" />
      <span className="text-gray-500">
        {wishlistCount.toLocaleString()} saved
      </span>
    </div>
  );
};
