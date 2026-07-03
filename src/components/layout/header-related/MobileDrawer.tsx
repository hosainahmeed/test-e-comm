"use client";

import { getHeaderCategories } from "@/lib/productCatalog";
import { X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "./Badge";

const CATEGORIES = getHeaderCategories();

export function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1500,
        backgroundColor: "rgba(17,17,17,0.4)",
        backdropFilter: "blur(3px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "min(320px, 88vw)",
          backgroundColor: "#fff",
          boxShadow: "4px 0 30px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          animation: "slideRight 0.22s ease-out",
          overflowY: "auto",
        }}
        className="h-screen overflow-hidden"
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid #F0EDE8",
          }}
        >
          <Link
            href="/"
            onClick={onClose}
            style={{
              fontSize: "17px",
              fontWeight: 800,
              color: "#111",
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            🪈 SmokeHaven
          </Link>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#666",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth quick links */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #F0EDE8",
            display: "flex",
            gap: "10px",
          }}
        >
          <Link
            href="/login"
            onClick={onClose}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 0",
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: "7px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={onClose}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 0",
              border: "1.5px solid #E8E4DF",
              color: "#333",
              borderRadius: "7px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Register
          </Link>
        </div>

        {/* Categories */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              padding: "12px 20px 6px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#BBB",
              textTransform: "uppercase",
            }}
          >
            Shop
          </div>
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <button
                onClick={() =>
                  setOpenCategory(openCategory === cat.label ? null : cat.label)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "12px 20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#111",
                  }}
                >
                  {cat.icon} {cat.label}
                </span>
                <ChevronDown
                  size={16}
                  color="#AAA"
                  style={{
                    transform:
                      openCategory === cat.label ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s",
                  }}
                />
              </button>

              {openCategory === cat.label && (
                <div
                  style={{
                    backgroundColor: "#FAF8F5",
                    borderTop: "1px solid #F0EDE8",
                    borderBottom: "1px solid #F0EDE8",
                  }}
                >
                  <Link
                    href={cat.href}
                    onClick={onClose}
                    style={{
                      display: "block",
                      padding: "10px 20px 10px 44px",
                      textDecoration: "none",
                      color: "#C8A96E",
                      fontSize: "13px",
                      fontWeight: 700,
                      borderBottom: "1px solid #F0EDE8",
                    }}
                  >
                    Shop all {cat.label} →
                  </Link>
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onClose}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 20px 10px 44px",
                        textDecoration: "none",
                        color: "#444",
                        fontSize: "14px",
                        borderBottom: "1px solid #F0EDE8",
                      }}
                    >
                      {sub.label}
                      {sub.badge && <Badge count={sub.badge} />}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Static links */}
          <div
            style={{
              padding: "12px 20px 6px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#BBB",
              textTransform: "uppercase",
              marginTop: "8px",
            }}
          >
            Company
          </div>
          {[
            { label: "Contact", href: "/contact" },
            { label: "Track Order", href: "/track" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: "block",
                padding: "12px 20px",
                textDecoration: "none",
                color: "#333",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Wholesale CTA */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #F0EDE8" }}>
          <Link
            href="/wholesale"
            onClick={onClose}
            style={{
              display: "block",
              textAlign: "center",
              padding: "11px 0",
              backgroundColor: "#C8A96E",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            🏭 Buy as Wholesaler
          </Link>
        </div>
      </div>
    </div>
  );
}
