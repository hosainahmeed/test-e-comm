import React, { RefObject } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { Category } from "../Header";
import styles from "./Header.module.css";

interface DesktopNavProps {
  categories: Category[];
  activeMegaMenu: string | null;
  megaMenuRef: RefObject<HTMLDivElement | null>;
  onCategoryEnter: (label: string) => void;
  onCategoryLeave: () => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  categories,
  activeMegaMenu,
  megaMenuRef,
  onCategoryEnter,
  onCategoryLeave,
}) => {
  return (
    <div
      ref={megaMenuRef}
      className={`desktop-nav ${styles.desktopNav}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        flex: 1,
      }}
      onMouseLeave={onCategoryLeave}
    >
      {categories.map((cat) => {
        const isActive = activeMegaMenu === cat.label;
        return (
          <button
            key={cat.label}
            className={`${styles.headerNavLink} ${isActive ? styles.headerNavLinkActive : ""}`}
            onMouseEnter={() => onCategoryEnter(cat.label)}
          >
            {cat.label}
            <ChevronDown
              size={13}
              style={{
                transform: isActive ? "rotate(180deg)" : "none",
                transition: "transform 0.15s",
                color: "#AAA",
              }}
            />
          </button>
        );
      })}
      <Link href="/track" className={styles.headerNavLink}>
        Track Item
      </Link>
    </div>
  );
};
