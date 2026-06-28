"use client";

import { useMemo, useState } from "react";
import { Review } from "@/lib/productServerApi";

interface ProductReviewsProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

const PROFILE_IMAGE =
  "https://img.magnific.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80";

const PRODUCT_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/012/064/147/small/set-of-natural-cosmetics-in-black-frosted-glass-packages-on-on-beige-background-with-bark-of-the-tree-stones-and-wood-branch-spa-natural-organic-beauty-product-packaging-design-photo.jpg";

export default function ProductReviews({ reviews, onAddReview }: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const filteredReviews = useMemo(() => {
    if (selectedRating === null) return reviews;

    return reviews.filter(
      (review) => Math.round(review.rating) === selectedRating,
    );
  }, [reviews, selectedRating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating before submitting.");
      return;
    }
    setError("");
    onAddReview({
      reviewerName: name,
      reviewerEmail: email,
      rating,
      comment,
      date: new Date().toISOString(),
    });
    setName("");
    setEmail("");
    setRating(0);
    setHoverRating(0);
    setComment("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section className="mt-16 border-t border-border pt-12">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customer Reviews ({reviews.length})
        </h2>

        {/* Rating Filter (Only show if reviews exist) */}
        {reviews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRating(null)}
              className={`px-4 py-2 rounded-full border text-sm transition ${
                selectedRating === null
                  ? "bg-black text-white border-black"
                  : "hover:bg-gray-100 border-gray-200"
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
                    : "hover:bg-yellow-50 border-gray-200"
                }`}
              >
                {star} ★
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
              <span className="text-4xl mb-3 block">💬</span>
              <p className="text-lg font-medium text-gray-700">No reviews yet</p>
              <p className="text-sm text-gray-400 mt-1">Be the first to share your thoughts about this product!</p>
            </div>
          ) : filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow transition-shadow duration-200"
              >
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    {/* Reviewer Info */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-base">
                            {review.reviewerName}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {review.reviewerEmail}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < Math.round(review.rating)
                                ? "text-yellow-500"
                                : "text-gray-200"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-gray-600">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Review Comment */}
                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
              No reviews found for {selectedRating} star rating.
            </div>
          )}
        </div>

        {/* Right Column: Write a Review Form */}
        <div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm lg:sticky lg:top-24">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Share Your Experience</h3>
            
            {success && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-emerald-800 text-sm mb-4 animate-fade-in">
                <p className="font-semibold mb-0.5">Thank you for your review!</p>
                <p className="text-xs text-emerald-600">Your feedback has been successfully published.</p>
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-red-800 text-sm mb-4">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reviewerName" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Your Name
                </label>
                <input
                  id="reviewerName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50/80"
                />
              </div>

              <div>
                <label htmlFor="reviewerEmail" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Email Address
                </label>
                <input
                  id="reviewerEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all bg-gray-50/50 hover:bg-gray-50/80"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starVal = i + 1;
                    const isActive = starVal <= (hoverRating || rating);
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        className="p-1 text-2xl focus:outline-none transition-transform hover:scale-125 duration-150 cursor-pointer"
                        aria-label={`Rate ${starVal} out of 5 stars`}
                      >
                        <span className={isActive ? "text-yellow-500" : "text-gray-200"}>
                          ★
                        </span>
                      </button>
                    );
                  })}
                  {rating > 0 && (
                    <span className="text-xs text-gray-400 ml-2 font-medium">
                      ({rating} / 5)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="reviewComment" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Review Content
                </label>
                <textarea
                  id="reviewComment"
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike? How was the quality?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm transition-all resize-none bg-gray-50/50 hover:bg-gray-50/80"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-black text-white hover:bg-zinc-900 font-medium uppercase text-xs tracking-[0.18em] transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg cursor-pointer mt-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
