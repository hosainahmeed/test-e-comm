"use client";

import { useMemo, useState } from "react";
import { Review } from "@/lib/productServerApi";

interface ProductReviewsProps {
  reviews: Review[];
}

const PROFILE_IMAGE =
  "https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80";

const PRODUCT_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/012/064/147/small/set-of-natural-cosmetics-in-black-frosted-glass-packages-on-on-beige-background-with-bark-of-the-tree-stones-and-wood-branch-spa-natural-organic-beauty-product-packaging-design-photo.jpg";

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredReviews = useMemo(() => {
    if (selectedRating === null) return reviews;

    return reviews.filter(
      (review) => Math.round(review.rating) === selectedRating,
    );
  }, [reviews, selectedRating]);

  if (reviews.length === 0) {
    return <p className="mt-10 text-gray-500">No reviews yet.</p>;
  }

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-2xl font-bold">
          Customer Reviews ({reviews.length})
        </h2>

        {/* Rating Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedRating(null)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              selectedRating === null
                ? "bg-black text-white border-black"
                : "hover:bg-gray-100"
            }`}
          >
            All
          </button>

          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedRating(star)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                selectedRating === star
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "hover:bg-yellow-50"
              }`}
            >
              {star} ★
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-3"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  {/* Reviewer Info */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {review.reviewerName}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {review.reviewerEmail}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 text-sm text-gray-400">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Review Comment */}
                  <p className="mt-5 text-gray-700 leading-7">
                    {review.comment}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < Math.round(review.rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <span className="font-semibold text-gray-700">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed py-12 text-center text-gray-500">
            No reviews found for this rating.
          </div>
        )}
      </div>
    </section>
  );
}
