import React from "react";

function Promotions() {
  return (
    <div className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg mx-auto text-center">
        {/* Animated Icon Container */}

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-6 sm:p-8 lg:p-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-amber-50 border border-amber-200 rounded-full mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-amber-700">
              Coming Soon
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Promotions Not Available
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Thank you for staying with us! We're currently working on exciting
            new promotions.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
            Our team is preparing special offers just for you. Stay tuned!
          </p>
        </div>

        {/* Footer Note */}
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-400">
          Have questions?{" "}
          <a href="#" className="text-[#A937E2] hover:underline font-medium">
            Contact Support
          </a>
        </p>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}

export default Promotions;
