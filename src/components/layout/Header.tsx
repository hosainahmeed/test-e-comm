"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => router.pathname === path;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1a1a2e",
        color: "white",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
        }}
      >
        {/* Logo */}
        <Link href="/" className="text-sm flex items-center gap-2">
          🛍️ YourStore
        </Link>

        {/* Desktop Navigation */}
        <div className="gap-4 ">
          <Link
            href="/"
            style={{
              color: isActive("/") ? "#3b82f6" : "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: isActive("/") ? "600" : "400",
            }}
          >
            Home
          </Link>

          <Link
            href="/products"
            style={{
              color: router.pathname.startsWith("/products")
                ? "#3b82f6"
                : "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: router.pathname.startsWith("/products")
                ? "600"
                : "400",
            }}
          >
            Products
          </Link>

          <Link
            href="/about"
            style={{
              color: isActive("/about") ? "#3b82f6" : "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: isActive("/about") ? "600" : "400",
            }}
          >
            About
          </Link>

          <Link
            href="/contact"
            style={{
              color: isActive("/contact") ? "#3b82f6" : "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: isActive("/contact") ? "600" : "400",
            }}
          >
            Contact
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "20px",
              position: "relative",
            }}
          >
            🛒
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              0
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: "none", // Show on mobile with media query
            background: "none",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
