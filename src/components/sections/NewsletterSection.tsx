"use client";

import { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-[#a937e2] to-indigo-900 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-black/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Join VIP Club
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Get 15% Off Your First Order
          </h2>

          <p className="text-xs sm:text-sm text-purple-100 mb-6 max-w-md mx-auto">
            Subscribe to get exclusive member-only discount codes, early access to new shisha flavors, and secret sales.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm animate-in fade-in">
              <Check className="w-5 h-5 text-emerald-300" />
              Thank you for subscribing! Check your inbox for your 15% discount code.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto"
            >
              <div className="relative w-full flex-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-xs sm:text-sm rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-md font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-6 mt-6 text-[11px] text-purple-200">
            <span>✓ No spam ever</span>
            <span>✓ Unsubscribe anytime</span>
            <span>✓ Instant 15% discount</span>
          </div>
        </div>
      </div>
    </section>
  );
}
