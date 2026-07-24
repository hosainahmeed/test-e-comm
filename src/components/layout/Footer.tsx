"use client";

import Link from "next/link";
import React from "react";
import {
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { HeaderLogo } from "./header-related/HeaderLogo";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-gray-150 dark:border-zinc-850 pt-16 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors">
      <div className="w-full max-w-7xl mx-auto">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <HeaderLogo />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 mt-4 max-w-sm leading-relaxed">
              We are premium manufacturers and distributors of hookah, shisha tobacco, natural coconut charcoal, and luxury smoke accessories. Serving both wholesale supply networks and retail customers with guaranteed authentic quality.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] hover:border-[#a937e2] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] hover:border-[#a937e2] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] hover:border-[#a937e2] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] hover:border-[#a937e2] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 mt-4">
              <li>
                <Link
                  href="/"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Popular Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/wholesale"
                  className="text-xs sm:text-sm font-semibold text-[#a937e2] hover:underline"
                >
                  B2B Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Legal */}
          <div className="flex flex-col items-start text-left">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Customer Support
            </h3>
            <ul className="flex flex-col gap-2.5 mt-4">
              <li>
                <Link
                  href="/track"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/promotions"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Promotions & Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/age-verification"
                  className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 hover:text-[#a937e2] dark:hover:text-[#a937e2] transition-colors"
                >
                  Age Compliance (21+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Offer Card & Contact */}
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-zinc-900 border border-purple-100 dark:border-zinc-800 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#a937e2] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Special Offer
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                Free Express Shipping on Orders over $50
              </p>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Available for both retail & wholesale clients nationwide.
              </p>
              <Link
                href="/promotions"
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#a937e2] hover:underline"
              >
                View Promotions
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex flex-col gap-2 text-xs text-gray-600 dark:text-zinc-400 px-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#a937e2] shrink-0" />
                <span>support@divandione.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#a937e2] shrink-0" />
                <span>+1 (800) 555-DIVAN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gray-200 dark:bg-zinc-800 my-8" />

        {/* Copyright & Bottom Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} DivanDione. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700" />
            <Link
              href="/privacy"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Giant Watermark Typography */}
        <div className="w-full flex justify-center mt-10 sm:mt-16 overflow-hidden">
          <h1 className="text-center font-extrabold tracking-tighter leading-none text-gray-200 dark:text-zinc-900/60 text-[clamp(3.5rem,10vw,20rem)] pointer-events-none select-none transition-colors">
            DIVAN DIONE
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
