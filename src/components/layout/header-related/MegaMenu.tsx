import Link from "next/link";
import { Badge } from "./Badge";
import { Category } from "../Header";
export function MegaMenu({
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
            {category?.icon}
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#111",
              marginBottom: "4px",
            }}
          >
            {category?.label}
          </div>
          <Link
            href={category?.href}
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
              {sub.badge && <Badge count={sub.badge} />}
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
