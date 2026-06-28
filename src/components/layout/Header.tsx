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

// ─── Types ────────────────────────────────────────────────────────────────────

interface Subcategory {
  label: string;
  href: string;
  badge?: string;
}

interface Category {
  label: string;
  href: string;
  icon: string;
  subcategories: Subcategory[];
}

interface SearchSuggestion {
  label: string;
  category: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = getHeaderCategories();

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  {
    label: "Al Fakher Double Apple",
    category: "Shisha",
    href: "/products/shisha/double-apple",
  },
  {
    label: "Khalil Mamoon Hookah",
    category: "Hookahs",
    href: "/products/hookahs/premium",
  },
  {
    label: "Kaloud Lotus Heat Management",
    category: "Accessories",
    href: "/products/accessories/heat-management",
  },
  {
    label: "Starbuzz Blue Mist",
    category: "Shisha",
    href: "/products/shisha/starbuzz",
  },
  {
    label: "Mini Travel Hookah",
    category: "Hookahs",
    href: "/products/hookahs/mini-travel",
  },
  {
    label: "Silicone Hose",
    category: "Accessories",
    href: "/products/accessories/hoses",
  },
  {
    label: "Coconut Charcoal",
    category: "Accessories",
    href: "/products/accessories/charcoal",
  },
  {
    label: "Fumari Ambrosia",
    category: "Shisha",
    href: "/products/shisha/fruity",
  },
];

const CART_COUNT = 4;
const WISHLIST_COUNT = 5;

// ─── Sub-components ────────────────────────────────────────────────────────────

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#fff",
        backgroundColor: "#C8A96E",
        borderRadius: "3px",
        padding: "1px 5px",
        marginLeft: "6px",
        verticalAlign: "middle",
      }}
    >
      {text}
    </span>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span
      style={{
        position: "absolute",
        top: "-5px",
        right: "-5px",
        backgroundColor: "#C8A96E",
        color: "#fff",
        borderRadius: "50%",
        width: "17px",
        height: "17px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

// ─── Mega Menu ─────────────────────────────────────────────────────────────────

function MegaMenu({
  category,
  onClose,
}: {
  category: Category;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTop: "2px solid #C8A96E",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        padding: "28px 0",
        zIndex: 900,
        animation: "slideDown 0.18s ease-out",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          gap: "48px",
        }}
      >
        {/* Category Header */}
        <div style={{ minWidth: "160px" }}>
          <div style={{ fontSize: "28px", marginBottom: "8px" }}>
            {category.icon}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111",
              marginBottom: "4px",
            }}
          >
            {category.label}
          </div>
          <Link
            href={category.href}
            onClick={onClose}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "13px",
              color: "#C8A96E",
              textDecoration: "none",
              fontWeight: 600,
              marginTop: "8px",
              borderBottom: "1px solid #C8A96E",
              paddingBottom: "1px",
            }}
          >
            Shop all →
          </Link>
        </div>

        {/* Divider */}
        <div
          style={{ width: "1px", backgroundColor: "#F0EDE8", flexShrink: 0 }}
        />

        {/* Subcategories Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "4px 32px",
            flex: 1,
          }}
        >
          {category.subcategories.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: "6px",
                textDecoration: "none",
                color: "#333",
                fontSize: "14px",
                fontWeight: 500,
                transition: "background 0.12s, color 0.12s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FAF8F5";
                (e.currentTarget as HTMLElement).style.color = "#111";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color = "#333";
              }}
            >
              {sub.label}
              {sub.badge && <Badge text={sub.badge} />}
            </Link>
          ))}
        </div>

        {/* Promo side card */}
        <div
          style={{
            minWidth: "180px",
            maxWidth: "200px",
            backgroundColor: "#FAF8F5",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#C8A96E",
              textTransform: "uppercase",
            }}
          >
            Featured
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#111",
              lineHeight: 1.3,
            }}
          >
            Free shipping on orders over $100
          </div>
          <div style={{ fontSize: "12px", color: "#777", marginTop: "4px" }}>
            For retail & wholesale orders alike.
          </div>
          <Link
            href="/promotions"
            onClick={onClose}
            style={{
              marginTop: "8px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#C8A96E",
              textDecoration: "none",
            }}
          >
            See all offers →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Search Overlay ────────────────────────────────────────────────────────────

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered =
    query.length > 0
      ? SEARCH_SUGGESTIONS.filter(
          (s) =>
            s.label.toLowerCase().includes(query.toLowerCase()) &&
            (selectedCategory === "All" || s.category === selectedCategory),
        )
      : SEARCH_SUGGESTIONS.slice(0, 5);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        backgroundColor: "rgba(17,17,17,0.4)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.15s ease",
        padding: 12,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          margin: "80px auto 0",
          maxWidth: "640px",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
          animation: "slideDown 0.18s ease-out",
        }}
      >
        {/* Search Input Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "18px 20px",
            borderBottom: "1px solid #F0EDE8",
          }}
        >
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              border: "none",
              background: "#FAF8F5",
              color: "#555",
              fontSize: "13px",
              fontWeight: 600,
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
              outline: "none",
              flexShrink: 0,
              appearance: "none",
              paddingRight: "20px",
            }}
          >
            <option>All</option>
            {CATEGORIES.map((c) => (
              <option key={c.label}>{c.label}</option>
            ))}
          </select>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "20px",
              background: "#E8E4DF",
              flexShrink: 0,
            }}
          />

          <Search size={18} color="#AAA" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "16px",
              color: "#111",
              background: "transparent",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#999",
              padding: "4px",
              display: "flex",
              borderRadius: "50%",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Suggestions */}
        <div style={{ padding: "18px 20px 12px 20px" }}>
          <div
            style={{
              padding: "8px 20px 6px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#BBB",
              textTransform: "uppercase",
            }}
          >
            {query ? "Results" : "Popular searches"}
          </div>
          {filtered.length > 0 ? (
            filtered.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                  textDecoration: "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#FAF8F5")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "transparent")
                }
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Search size={14} color="#CCC" />
                  <span
                    style={{ fontSize: "14px", color: "#222", fontWeight: 500 }}
                  >
                    {s.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#C8A96E",
                    fontWeight: 600,
                  }}
                >
                  {s.category}
                </span>
              </Link>
            ))
          ) : (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "#AAA",
                fontSize: "14px",
              }}
            >
              No results for "{query}"
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div
          style={{
            borderTop: "1px solid #F0EDE8",
            padding: "10px 20px",
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "11px", color: "#BBB" }}>
            Press{" "}
            <kbd
              style={{
                background: "#F5F5F5",
                border: "1px solid #E0E0E0",
                borderRadius: "3px",
                padding: "1px 5px",
                fontSize: "11px",
                fontFamily: "monospace",
              }}
            >
              Esc
            </kbd>{" "}
            to close
          </span>
          <span style={{ fontSize: "11px", color: "#BBB" }}>
            Press{" "}
            <kbd
              style={{
                background: "#F5F5F5",
                border: "1px solid #E0E0E0",
                borderRadius: "3px",
                padding: "1px 5px",
                fontSize: "11px",
                fontFamily: "monospace",
              }}
            >
              Enter
            </kbd>{" "}
            to search all
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Account Dropdown ──────────────────────────────────────────────────────────

function AccountDropdown({
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
            { icon: <Heart size={14} />, label: "Wishlist", href: "/wishlist" },
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

// ─── Mobile Drawer ─────────────────────────────────────────────────────────────

function MobileDrawer({ onClose }: { onClose: () => void }) {
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
                      {sub.badge && <Badge text={sub.badge} />}
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

// ─── Main Header ───────────────────────────────────────────────────────────────

export default function Header() {
  const router = useRouter();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const IS_LOGGED_IN = false; // wire to your auth state
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setActiveMegaMenu(null);
      setIsSearchOpen(false);
      setIsAccountOpen(false);
      setIsMobileOpen(false);
    };
    router.events?.on("routeChangeStart", handleRouteChange);
    return () => router.events?.off("routeChangeStart", handleRouteChange);
  }, [router]);

  // Close account dropdown on outside click
  useEffect(() => {
    if (!isAccountOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isAccountOpen]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleCategoryEnter = useCallback((label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMegaMenu(label);
  }, []);

  const handleCategoryLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMegaMenu(null), 150);
  }, []);

  const handleMegaMenuEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.label === activeMegaMenu);

  return (
    <>
      <style>{`
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideRight { from { transform:translateX(-100%); } to { transform:translateX(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        * { box-sizing: border-box; }

        .header-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 2px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.15s;
          border: none;
          background: none;
          cursor: pointer;
          font-family: inherit;
        }
        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #C8A96E;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s ease;
          border-radius: 1px;
        }
        .header-nav-link:hover { color: #111; }
        .header-nav-link:hover::after,
        .header-nav-link.active::after { transform: scaleX(1); }
        .header-nav-link.active { color: #111; font-weight: 600; }

        .icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 8px;
          color: #444;
          transition: background 0.12s, color 0.12s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .icon-btn:hover { background: #F5F2EE; color: #111; }

        .wholesale-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #C8A96E;
          color: #fff;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.1s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .wholesale-btn:hover { background: #B8965C; transform: translateY(-1px); }

        .search-shortcut {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          background: #F5F2EE;
          border: 1px solid #EAE7E2;
          border-radius: 8px;
          font-size: 13px;
          color: #888;
          cursor: pointer;
          transition: background 0.12s;
          min-width: 180px;
          font-family: inherit;
        }
        .search-shortcut:hover { background: #EDE9E3; }

        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .search-shortcut { min-width: 0 !important; }
          .search-shortcut span.shortcut-text { display: none !important; }
          .search-shortcut span.shortcut-kbd { display: none !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 600px) {
          .wholesale-desktop { display: none !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "#fff",
          borderBottom: isScrolled
            ? "1px solid #F0EDE8"
            : "1px solid transparent",
          boxShadow: isScrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.2s, border-color 0.2s",
        }}
        className="h-[170px] md:h-[110px]"
      >
        {/* ── Top bar (Wholesale & promo notice) ── */}
        <div
          style={{
            backgroundColor: "#111",
            color: "#fff",
            textAlign: "center",
            padding: "7px 20px",
            fontSize: "12px",
            letterSpacing: "0.03em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <span>
            🚚 Free shipping on orders over $100 · Use code{" "}
            <strong>FIRST10</strong> for 10% off your first order
          </span>
          <Link
            href="/wholesale"
            style={{
              color: "#C8A96E",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "12px",
              flexShrink: 0,
            }}
          >
            Wholesale ↗
          </Link>
        </div>

        {/* ── Main nav row ── */}
        <nav
          style={{
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
          className="container h-fit py-4 px-2 md:h-[64px]"
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginRight: "8px",
              flexShrink: 0,
            }}
          >
            {/* Replace the span below with your <img> logo */}
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#111",
                letterSpacing: "-0.03em",
                fontFamily: "Georgia, serif",
              }}
            >
              <span style={{ color: "#C8A96E" }}>Divan </span>Dion
            </span>
          </Link>

          {/* ── Desktop Category Nav ── */}
          <div
            ref={megaMenuRef}
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flex: 1,
            }}
            onMouseLeave={handleCategoryLeave}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className={`header-nav-link ${activeMegaMenu === cat.label ? "active" : ""}`}
                onMouseEnter={() => handleCategoryEnter(cat.label)}
                style={{ padding: "6px 10px" }}
              >
                {cat.label}
                <ChevronDown
                  size={13}
                  style={{
                    transform:
                      activeMegaMenu === cat.label ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s",
                    color: "#AAA",
                  }}
                />
              </button>
            ))}
            <Link
              href="/contact"
              className="header-nav-link"
              style={{ padding: "6px 10px" }}
            >
              Contact
            </Link>
          </div>

          {/* Spacer on mobile */}
          <div style={{ flex: 1 }} className="desktop-nav" />
          <button
            className="search-shortcut hidden! md:flex!"
            onClick={() => setIsSearchOpen(true)}
            style={{ marginRight: "4px" }}
          >
            <Search size={14} />
            <span
              className="shortcut-text"
              style={{ flex: 1, textAlign: "left" }}
            >
              Search…
            </span>
            <kbd
              className="shortcut-kbd"
              style={{
                fontSize: "10px",
                background: "#E8E4DF",
                border: "1px solid #D8D3CC",
                borderRadius: "3px",
                padding: "1px 5px",
                fontFamily: "monospace",
              }}
            >
              ⌘K
            </kbd>
          </button>
          {/* ── Right Action Area ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "auto",
            }}
          >
            {/* Search */}

            {/* Search icon only on mobile */}
            <button
              className="icon-btn"
              onClick={() => setIsSearchOpen(true)}
              style={{ display: "none" }}
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="icon-btn" aria-label="Wishlist">
              <Heart size={19} />
              <CountBadge count={WISHLIST_COUNT} />
            </Link>

            {/* Account */}
            <div ref={accountRef} style={{ position: "relative" }}>
              <button
                className="icon-btn"
                onClick={() => setIsAccountOpen((v) => !v)}
                aria-label="Account"
              >
                <User size={19} />
              </button>
              {isAccountOpen && (
                <AccountDropdown
                  isLoggedIn={IS_LOGGED_IN}
                  onClose={() => setIsAccountOpen(false)}
                />
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingCart size={19} />
              <CountBadge count={CART_COUNT} />
            </Link>

            {/* Wholesale CTA */}
            <Link
              href="/wholesale"
              className="wholesale-btn wholesale-desktop"
              style={{ marginLeft: "6px" }}
            >
              🏭 Wholesale
            </Link>

            {/* Mobile hamburger */}
            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
              style={{ marginLeft: "4px" }}
            >
              <Menu size={21} />
            </button>
          </div>
        </nav>
        {/* mobile search bar */}
        <div className="max-w-4xl mx-auto mb-3 px-4 md:hidden">
          <button
            className="search-shortcut w-full"
            onClick={() => setIsSearchOpen(true)}
            style={{ marginRight: "4px" }}
          >
            <Search size={14} />
            <span
              className="text-gray-400"
              style={{ flex: 1, textAlign: "left" }}
            >
              Search ...
            </span>
          </button>
        </div>
        {/* ── Mega Menu Panel ── */}
        {activeCategory && (
          <div
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleCategoryLeave}
          >
            <MegaMenu
              category={activeCategory}
              onClose={() => setActiveMegaMenu(null)}
            />
          </div>
        )}
      </header>

      {/* ── Search Overlay ── */}
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}

      {/* ── Mobile Drawer ── */}
      {isMobileOpen && <MobileDrawer onClose={() => setIsMobileOpen(false)} />}

      {/* ── Spacer so page content doesn't hide under fixed header ── */}
      <div
        style={{
          height: "64px + 33px" /* main nav + top bar */,
          paddingTop: "97px",
        }}
      />
    </>
  );
}
