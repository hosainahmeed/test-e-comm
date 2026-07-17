"use client";

import { Search, ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect, useCallback } from "react";
import { getHeaderCategories } from "@/lib/productCatalog";
import { Badge } from "./header-related/Badge";
import { CountBadge } from "./header-related/CountBadge";
import { AccountDropdown } from "./header-related/AccountDropdown";
import { MegaMenu } from "./header-related/MegaMenu";
import { MobileDrawer } from "./header-related/MobileDrawer";
import { SearchOverlay } from "./header-related/SearchOverlay";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Subcategory {
  label: string;
  href: string;
  badge?: string;
}

export interface Category {
  label: string;
  href: string;
  icon: string;
  subcategories: Subcategory[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = getHeaderCategories();

const CART_COUNT = 4;
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
    if (typeof window === "undefined") return;
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
          className="max-w-7xl h-fit py-4 px-2 md:h-[64px]"
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
              href="/track"
              className="header-nav-link"
              style={{ padding: "6px 10px" }}
            >
              Track Item
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
            {/* <Link href="/wishlist" className="icon-btn" aria-label="Wishlist">
              <Heart size={19} />
              <CountBadge count={WISHLIST_COUNT} />
            </Link> */}

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
