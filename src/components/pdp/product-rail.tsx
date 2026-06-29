import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { RelatedProduct } from "@/data/product";
import { StarRow } from "./star-row";

export function ProductCard({ p }: { p: RelatedProduct }) {
  const [wish, setWish] = useState(false);
  const discount =
    p.mrp && p.mrp > p.price
      ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
      : 0;
  return (
    <div className="group flex w-[220px] shrink-0 flex-col sm:w-[240px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-muted">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
            {p.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setWish((v) => !v)}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-surface/90 text-foreground shadow-soft backdrop-blur transition hover:scale-105"
          aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition",
              wish && "fill-destructive text-destructive",
            )}
          />
        </button>
        <button
          type="button"
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-foreground text-primary-foreground opacity-0 shadow-soft transition group-hover:opacity-100"
          aria-label="Quick add to cart"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {p.brand}
        </span>
        <h3 className="line-clamp-1 text-sm font-medium text-foreground">
          {p.title}
        </h3>
        <div className="flex items-center gap-2">
          <StarRow value={p.rating} size={12} />
          <span className="text-xs text-muted-foreground">
            {p.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">
            ৳{p.price.toLocaleString()}
          </span>
          {p.mrp && p.mrp > p.price && (
            <>
              <span className="text-xs text-muted-foreground line-through">
                ৳{p.mrp.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-sale">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductRail({
  title,
  items,
}: {
  title: string;
  items: RelatedProduct[];
}) {
  if (!items?.length) return null;
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <button className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          View all
        </button>
      </div>
      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:gap-5">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
