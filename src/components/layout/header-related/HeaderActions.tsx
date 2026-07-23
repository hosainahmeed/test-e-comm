import React, { RefObject } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { CountBadge } from "./CountBadge";
import { AccountDropdown } from "./AccountDropdown";
import styles from "./Header.module.css";

interface HeaderActionsProps {
  isAccountOpen: boolean;
  isLoggedIn: boolean;
  cartCount: number;
  accountRef: RefObject<HTMLDivElement | null>;
  onOpenSearch: () => void;
  onToggleAccount: () => void;
  onCloseAccount: () => void;
  onOpenMobile: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  isAccountOpen,
  isLoggedIn,
  cartCount,
  accountRef,
  onOpenSearch,
  onToggleAccount,
  onCloseAccount,
  onOpenMobile,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        marginLeft: "auto",
      }}
    >
      {/* Mobile Search button */}
      <button
        className={`icon-btn ${styles.iconBtn}`}
        onClick={onOpenSearch}
        style={{ display: "none" }}
        aria-label="Search"
      >
        <Search size={19} />
      </button>

      {/* Account */}
      <div ref={accountRef} style={{ position: "relative" }}>
        <button
          className={`icon-btn ${styles.iconBtn}`}
          onClick={onToggleAccount}
          aria-label="Account"
        >
          <User size={19} />
        </button>
        {isAccountOpen && (
          <AccountDropdown
            isLoggedIn={isLoggedIn}
            onClose={onCloseAccount}
          />
        )}
      </div>

      {/* Cart */}
      <Link href="/cart" className={`icon-btn ${styles.iconBtn}`} aria-label="Cart">
        <ShoppingCart size={19} />
        <CountBadge count={cartCount} />
      </Link>

      {/* Wholesale CTA */}
      <Link
        href="/wholesale"
        className={`wholesale-btn wholesale-desktop ${styles.wholesaleBtn} ${styles.wholesaleDesktop}`}
      >
        🏭 Wholesale
      </Link>

      {/* Mobile hamburger */}
      <button
        className={`icon-btn mobile-menu-btn ${styles.iconBtn} ${styles.mobileMenuBtn}`}
        onClick={onOpenMobile}
        aria-label="Open menu"
        style={{ marginLeft: "4px" }}
      >
        <Menu size={21} />
      </button>
    </div>
  );
};
