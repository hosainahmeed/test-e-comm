"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { IMAGE } from "@/constant/image.index";
import Link from "next/link";
import DownloadAds from "@/components/ads/download-ads";
import CategoriesSection from "@/components/sections/CategoriesSection";
import SmallDeviceCategory from "./small-device-category";

function HeroSection() {
  const bannerData = [
    {
      _id: "6a2f30b5071ea4fa74e29857",
      img: "https://api.divandione.com/uploads/img/1781477557362-JuoLtZjeRP68P4B3E5De-w.webp",
      title: "Premium Hookah Collection",
      subtitle: "Discover our handcrafted pieces",
      cta: "Shop Now",
      link: "/products",
    },
    {
      _id: "6a2f30c7071ea4fa74e2985c",
      img: "https://api.divandione.com/uploads/img/1781477575682-pztONLoyRQOVJvL0LCCfoQ.webp",
      title: "New Arrivals",
      subtitle: "Latest flavors and accessories",
      cta: "Explore",
      link: "/products",
    },
    {
      _id: "6a2f30d0071ea4fa74e29861",
      img: "https://api.divandione.com/uploads/img/1781477584844-Category-Banner-for-Raw-Rolling-Papers.jpg",
      title: "Rolling Papers",
      subtitle: "Premium quality for the perfect roll",
      cta: "View Collection",
      link: "/products",
    },
    {
      _id: "6a2f30d8071ea4fa74e29866",
      img: "https://api.divandione.com/uploads/img/1781477592374-1000_F_308254886_W2vbnZhMtuWoZ0eQrvYMlPO5K257RYTo.jpg",
      title: "Accessories Sale",
      subtitle: "Up to 30% off on select items",
      cta: "Shop Deals",
      link: "/products",
    },
    {
      _id: "6a2f351d071ea4fa74e298a0",
      img: "https://api.divandione.com/uploads/img/1781478685264-hf_20260613_025124_3b64e909-704c-49bf-b1f3-703f236ed265.jpeg",
      title: "Summer Essentials",
      subtitle: "Everything you need for outdoor sessions",
      cta: "Learn More",
      link: "/products",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  }, [bannerData.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerData.length) % bannerData.length,
    );
  }, [bannerData.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, nextSlide]);

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-1">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2">
          {/* Main Banner Slider */}
          <div className="w-full lg:w-3/4 rounded-md overflow-hidden">
            <div
              className="relative w-full h-48 md:h-72 lg:h-96 xl:h-112.5 overflow-hidden shadow-lg group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slides */}
              <div className="relative w-full h-full">
                {bannerData.map((banner, index) => (
                  <div
                    key={banner._id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 translate-x-0"
                        : index < currentSlide
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <Image
                      src={banner.img}
                      alt={banner.title}
                      width={1920}
                      height={1080}
                      className="w-full h-full object-fill object-bottom"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 70vw"
                    />

                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Banner Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
                      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 drop-shadow-lg">
                        {banner.title}
                      </h2>
                      <p className="text-xs md:text-sm lg:text-base text-gray-200 mb-3 md:mb-4 max-w-md drop-shadow">
                        {banner.subtitle}
                      </p>
                      <a
                        href={banner.link}
                        className="inline-block bg-white text-gray-900! px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        {banner.cta}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
              </button>

              {/* Controls Bar */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 md:w-8 md:h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                  aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-800" />
                  ) : (
                    <Play className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-800" />
                  )}
                </button>
              </div>

              {/* Dots Navigation */}
              <div className="absolute bottom-16 hidden md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 md:flex items-center gap-1.5 md:gap-2">
                {bannerData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-5 md:w-6 h-1.5 md:h-2 bg-white"
                        : "w-1.5 md:w-2 h-1.5 md:h-2 bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* App Download Section - Desktop */}
          <div className="rounded-md overflow-hidden hidden lg:flex lg:w-1/4 flex-col items-start justify-center bg-[#172030] p-4 shadow-lg">
            <Image
              src={IMAGE.banner}
              alt="banner"
              width={200}
              height={200}
              className="w-[150px] h-[150px] object-cover"
            />
            <div className="text-start mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Get the App</h3>
              <p className="text-gray-300 text-sm">
                Download our mobile app for exclusive deals and faster checkout
              </p>
            </div>

            <div className="flex gap-2 w-full max-w-[180px]">
              <Link
                href="#"
                className="block transition-transform duration-200 hover:scale-105"
                aria-label="Download on Google Play"
              >
                <Image
                  src="https://divandione.com/_next/static/media/google-play-badge.3rwvmtbsjdzz9.svg"
                  alt="Get it on Google Play"
                  width={180}
                  height={54}
                  className="w-full h-auto"
                />
              </Link>
              <Link
                href="#"
                className="block transition-transform duration-200 hover:scale-105"
                aria-label="Download on App Store"
              >
                <Image
                  src="https://divandione.com/_next/static/media/apple-play-badge.07m12grt9zes-.svg"
                  alt="Download on the App Store"
                  width={180}
                  height={54}
                  className="w-full h-auto"
                />
              </Link>
            </div>

            {/* Features List */}
            <div className="mt-6 space-y-2 text-gray-300 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>Exclusive app-only deals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>Faster checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span>Order tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
