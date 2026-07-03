"use client";

import {
  Heart,
  Search,
  ShoppingCart,
  User,
  X,
  ChevronDown,
  Package,
  LogOut,
  Settings,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect, useCallback } from "react";
import { getHeaderCategories } from "@/lib/productCatalog";

export function AccountDropdown({
  isLoggedIn,
  onClose,
}: {
  isLoggedIn: boolean;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        backgroundColor: "#fff",
        border: "1px solid #F0EDE8",
        borderRadius: "10px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        minWidth: "200px",
        overflow: "hidden",
        zIndex: 800,
        animation: "slideDown 0.15s ease-out",
      }}
    >
      {isLoggedIn ? (
        <>
          <div
            style={{ padding: "14px 16px", borderBottom: "1px solid #F0EDE8" }}
          >
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#111" }}>
              Hello, Ahmed
            </div>
            <div style={{ fontSize: "12px", color: "#999", marginTop: "2px" }}>
              ahmed@email.com
            </div>
          </div>
          {[
            {
              icon: <Package size={14} />,
              label: "My Orders",
              href: "/account/orders",
            },
            // { icon: <Heart size={14} />, label: "Wishlist", href: "/wishlist" },
            {
              icon: <Settings size={14} />,
              label: "Settings",
              href: "/account/settings",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                textDecoration: "none",
                color: "#333",
                fontSize: "14px",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#FAF8F5")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "transparent")
              }
            >
              <span style={{ color: "#C8A96E" }}>{item.icon}</span> {item.label}
            </Link>
          ))}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "10px 16px",
              border: "none",
              background: "none",
              color: "#E55",
              fontSize: "14px",
              cursor: "pointer",
              borderTop: "1px solid #F0EDE8",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#FFF5F5")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "transparent")
            }
          >
            <LogOut size={14} /> Sign Out
          </button>
        </>
      ) : (
        <>
          <div style={{ padding: "16px" }}>
            <Link
              href="/login"
              onClick={onClose}
              style={{
                display: "block",
                textAlign: "center",
                padding: "9px 0",
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "7px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={onClose}
              style={{
                display: "block",
                textAlign: "center",
                padding: "9px 0",
                border: "1.5px solid #E8E4DF",
                color: "#333",
                borderRadius: "7px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Create Account
            </Link>
          </div>
          <div style={{ borderTop: "1px solid #F0EDE8", padding: "10px 16px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#AAA",
                marginBottom: "6px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Business?
            </div>
            <Link
              href="/wholesale/login"
              onClick={onClose}
              style={{
                fontSize: "13px",
                color: "#C8A96E",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Wholesale Portal →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}