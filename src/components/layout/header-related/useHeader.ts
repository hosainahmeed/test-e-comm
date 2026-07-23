import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { getHeaderCategories } from "@/lib/productCatalog";
import type { Category } from "../Header";

export const CATEGORIES: Category[] = getHeaderCategories();
export const CART_COUNT = 4;
export const IS_LOGGED_IN = false;

export function useHeader() {
  const router = useRouter();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return {
    state: {
      activeMegaMenu,
      isSearchOpen,
      isAccountOpen,
      isMobileOpen,
      isScrolled,
      isLoggedIn: IS_LOGGED_IN,
      cartCount: CART_COUNT,
      categories: CATEGORIES,
      activeCategory,
    },
    refs: {
      megaMenuRef,
      accountRef,
    },
    handlers: {
      handleCategoryEnter,
      handleCategoryLeave,
      handleMegaMenuEnter,
      openSearch: () => setIsSearchOpen(true),
      closeSearch: () => setIsSearchOpen(false),
      toggleAccount: () => setIsAccountOpen((v) => !v),
      closeAccount: () => setIsAccountOpen(false),
      openMobile: () => setIsMobileOpen(true),
      closeMobile: () => setIsMobileOpen(false),
      closeMegaMenu: () => setActiveMegaMenu(null),
    },
  };
}
