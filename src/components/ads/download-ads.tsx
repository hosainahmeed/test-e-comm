import Image from "next/image";
import Link from "next/link";
import React from "react";

function DownloadAds() {
  return (
    <div className="lg:hidden bg-linear-to-r from-gray-900 to-gray-800 p-4">
      <div className="flex flex-col items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-sm mb-1">
            Get the App for Exclusive Deals
          </h3>
          <p className="text-gray-400 text-xs">
            Download now and save on your first order
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="transition-transform duration-200 hover:scale-105"
            aria-label="Download on Google Play"
          >
            <Image
              src="https://divandione.com/_next/static/media/google-play-badge.3rwvmtbsjdzz9.svg"
              alt="Get it on Google Play"
              width={120}
              height={26}
              className="w-auto h-6"
            />
          </Link>
          <Link
            href="#"
            className="transition-transform duration-200 hover:scale-105"
            aria-label="Download on App Store"
          >
            <Image
              src="https://divandione.com/_next/static/media/apple-play-badge.07m12grt9zes-.svg"
              alt="Download on the App Store"
              width={120}
              height={26}
              className="w-auto h-6"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DownloadAds;
