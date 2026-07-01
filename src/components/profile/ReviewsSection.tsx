"use client";

import React, { useState } from "react";
import { Star, Edit2, Trash2, MessageSquare } from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

export default function ReviewsSection() {
  const { profile } = useProfile();

  if (profile.type !== "retail") return null;

  const reviews = profile.reviews || [];
  const [filter, setFilter] = useState<"all" | "published" | "pending">("all");

  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((review) => review.status === filter);

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">My Reviews</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {reviews.length} total review{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          {(["all", "published", "pending"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize ${
                filter === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {tab !== "all" && (
                <span className="ml-1 text-xs">
                  ({reviews.filter((r) => r.status === tab).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No reviews to show</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Browse Products to Review
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.productImage}
                  alt={review.productName}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.productName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.status === "published"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {review.status.charAt(0).toUpperCase() +
                          review.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{review.comment}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
