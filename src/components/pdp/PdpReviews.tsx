import React from "react";
import { Check } from "lucide-react";
import { StarRow } from "./star-row";
import type { productData } from "@/data/product";

type ReviewSummary = (typeof productData)["reviewSummary"];

interface PdpReviewsProps {
  reviewSummary: ReviewSummary;
}

export const PdpReviews: React.FC<PdpReviewsProps> = ({ reviewSummary }) => {
  return (
    <section id="reviews" className="mt-14 scroll-mt-24 sm:mt-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Customer reviews
        </h2>
        <button className="rounded-lg border border-gray-900 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white cursor-pointer">
          Write a review
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* Rating Breakdown Card */}
        <div className="rounded-xl border border-[#F0EDE8] bg-white p-5 shadow-2xs">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-gray-900">
              {reviewSummary.average.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">/ 5</span>
          </div>
          <StarRow value={reviewSummary.average} size={15} className="mt-1.5" />
          <p className="mt-2 text-xs text-gray-500">
            Based on {reviewSummary.totalReviews.toLocaleString("en-US")} verified
            reviews
          </p>
          <div className="mt-4 space-y-1.5">
            {[5, 4, 3, 2, 1].map((r) => {
              const count = reviewSummary.distribution[String(r)] ?? 0;
              const pct = (count / reviewSummary.totalReviews) * 100;
              return (
                <div key={r} className="flex items-center gap-2.5 text-[11px]">
                  <span className="w-2.5 font-medium text-gray-500">{r}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#A937E2]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right tabular-nums text-gray-400">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-3.5">
          {reviewSummary.latest?.map((r) => (
            <article
              key={r.id}
              className="rounded-xl border border-[#F0EDE8] bg-white p-4 shadow-2xs"
            >
              <header className="flex flex-wrap items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[#F5F2EE] text-xs font-bold text-gray-800">
                  {r.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900">
                    {r.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(r.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/50">
                      <Check className="h-2.5 w-2.5" /> Verified
                    </span>
                  )}
                  <StarRow value={r.rating} size={11} />
                </div>
              </header>
              <h4 className="mt-2.5 text-xs font-bold text-gray-900">
                {r.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                {r.body}
              </p>
            </article>
          ))}
          <button className="self-start text-xs text-gray-500 underline-offset-4 hover:text-gray-900 hover:underline">
            View all {reviewSummary.totalReviews} reviews
          </button>
        </div>
      </div>
    </section>
  );
};
