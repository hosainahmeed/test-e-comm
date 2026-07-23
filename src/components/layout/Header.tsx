"use client";

import React from "react";
import { useHeader } from "./header-related/useHeader";
import { TopBar } from "./header-related/TopBar";
import { HeaderLogo } from "./header-related/HeaderLogo";
import { DesktopNav } from "./header-related/DesktopNav";
import {
  DesktopSearchShortcut,
  MobileSearchBar,
} from "./header-related/SearchShortcut";
import { HeaderActions } from "./header-related/HeaderActions";
import { MegaMenu } from "./header-related/MegaMenu";
import { MobileDrawer } from "./header-related/MobileDrawer";
import { SearchOverlay } from "./header-related/SearchOverlay";
import styles from "./header-related/Header.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Subcategory {
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

// ─── Header Component ─────────────────────────────────────────────────────────

export default function Header() {
  const { state, refs, handlers } = useHeader();
  const {
    isScrolled,
    categories,
    activeMegaMenu,
    activeCategory,
    isSearchOpen,
    isAccountOpen,
    isMobileOpen,
    isLoggedIn,
    cartCount,
  } = state;

  return (
    <>
      <header
        className={`h-[170px] md:h-[110px] ${styles.headerContainer} ${
          isScrolled
            ? styles.headerContainerScrolled
            : styles.headerContainerUnscrolled
        }`}
      >
        {/* ── Top Bar ── */}
        <TopBar />

        {/* ── Main Navigation Row ── */}
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
          <HeaderLogo />

          {/* Desktop Category Navigation */}
          <DesktopNav
            categories={categories}
            activeMegaMenu={activeMegaMenu}
            megaMenuRef={refs.megaMenuRef}
            onCategoryEnter={handlers.handleCategoryEnter}
            onCategoryLeave={handlers.handleCategoryLeave}
          />

          {/* Spacer on mobile */}
          <div
            style={{ flex: 1 }}
            className={`desktop-nav ${styles.desktopNav}`}
          />

          {/* Desktop Search Shortcut */}
          <DesktopSearchShortcut onOpenSearch={handlers.openSearch} />

          {/* Right Action Area */}
          <HeaderActions
            isAccountOpen={isAccountOpen}
            isLoggedIn={isLoggedIn}
            cartCount={cartCount}
            accountRef={refs.accountRef}
            onOpenSearch={handlers.openSearch}
            onToggleAccount={handlers.toggleAccount}
            onCloseAccount={handlers.closeAccount}
            onOpenMobile={handlers.openMobile}
          />
        </nav>

        {/* Mobile Search Bar */}
        <MobileSearchBar onOpenSearch={handlers.openSearch} />

        {/* ── Mega Menu Panel ── */}
        {activeCategory && (
          <div
            onMouseEnter={handlers.handleMegaMenuEnter}
            onMouseLeave={handlers.handleCategoryLeave}
          >
            <MegaMenu
              category={activeCategory}
              onClose={handlers.closeMegaMenu}
            />
          </div>
        )}
      </header>

      {/* ── Search Overlay ── */}
      {isSearchOpen && <SearchOverlay onClose={handlers.closeSearch} />}

      {/* ── Mobile Drawer ── */}
      {isMobileOpen && <MobileDrawer onClose={handlers.closeMobile} />}

      {/* ── Fixed Header Spacer ── */}
      <div className={styles.headerSpacer} />
    </>
  );
}
