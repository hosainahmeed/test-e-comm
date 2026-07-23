import { getHeaderCategories } from "@/lib/productCatalog";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SearchSuggestion {
  label: string;
  category: string;
  href: string;
}
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

export function SearchOverlay({ onClose }: { onClose: () => void }) {
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
                    color: "#A937E2",
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
