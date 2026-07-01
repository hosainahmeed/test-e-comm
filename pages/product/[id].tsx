import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  ChevronRight,
  Heart,
  Share2,
  Link as LinkIcon,
  Check,
  Truck,
  RotateCcw,
  Wallet,
  MapPin,
  Shield,
  Minus,
  Plus,
  Zap,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { productData, type Variant } from "@/data/product";
import { ProductGallery } from "@/components/pdp/product-gallery";
import { Countdown } from "@/components/pdp/countdown";
import { StarRow } from "@/components/pdp/star-row";
import { ProductRail } from "@/components/pdp/product-rail";

export default function ProductDetailsPage() {
  const data = productData;
  const {
    product,
    media,
    attributes,
    variants,
    reviewSummary,
    marketing,
    analytics,
    shipping,
    returnPolicy,
  } = data;

  // ---- Variant selection ----
  const initialSelection = useMemo(() => {
    const sel: Record<string, string> = {};
    for (const attr of attributes) {
      // pick first attribute value that has an available variant
      const first =
        attr.values.find((v) =>
          variants.some(
            (vr) =>
              vr.inventory.available &&
              vr.attributes[attr.slug] === (v.slug ?? v.label.toLowerCase()),
          ),
        ) ?? attr.values[0];
      sel[attr.slug] = first.slug ?? first.label.toLowerCase();
    }
    return sel;
  }, [attributes, variants]);

  const [selection, setSelection] =
    useState<Record<string, string>>(initialSelection);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const selectedVariant: Variant | undefined = useMemo(
    () =>
      variants.find((v) =>
        Object.entries(selection).every(([k, val]) => v.attributes[k] === val),
      ),
    [variants, selection],
  );

  // Active image group derives from selected color (or selectedVariant.imageGroup)
  const activeGroupId =
    selectedVariant?.imageGroup ?? selection.color ?? media.imageGroups[0]?.id;
  const activeGroup =
    media.imageGroups.find((g) => g.id === activeGroupId) ??
    media.imageGroups[0];

  const price = selectedVariant?.price ?? variants[0].price;
  const discount =
    price.mrp > price.selling
      ? Math.round(((price.mrp - price.selling) / price.mrp) * 100)
      : 0;
  const stock = selectedVariant?.inventory.stock ?? 0;
  const available = !!selectedVariant?.inventory.available;
  const lowStock = available && stock > 0 && stock <= 5;

  // For determining disabled values per attribute, compute combinatorial availability
  const isValueAvailable = (attrSlug: string, valueSlug: string) => {
    return variants.some(
      (v) =>
        v.attributes[attrSlug] === valueSlug &&
        v.inventory.available &&
        // honor other selected attrs (excluding this one)
        Object.entries(selection).every(
          ([k, val]) => k === attrSlug || v.attributes[k] === val,
        ),
    );
  };

  const updateAttr = (slug: string, value: string) => {
    setSelection((prev) => ({ ...prev, [slug]: value }));
    setQty(1);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  const addToCart = () => {
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1400);
  };

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-0">
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 py-5 text-xs text-muted-foreground"
        >
          <a href="#" className="hover:text-foreground">
            Home
          </a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-foreground">
            {product.category.name}
          </a>
          <ChevronRight className="h-3 w-3" />
          <a href="#" className="hover:text-foreground">
            {product.subCategory.name}
          </a>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{product.title}</span>
        </nav>

        {/* Hero: gallery + info */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={activeGroup.images} title={product.title} />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Badges */}
            {marketing.badges?.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {marketing.badges.map((b) => {
                  const flash = b.toLowerCase().includes("flash");
                  return (
                    <span
                      key={b}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
                        flash
                          ? "border-sale/30 bg-sale/10 text-sale"
                          : "border-border bg-surface-muted text-muted-foreground",
                      )}
                    >
                      {flash && <Zap className="h-3 w-3" />}
                      {b}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Title block */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {product.brand.name} · {product.subCategory.name}
                </p>
                <h1 className="mt-2 font-display text-3xl leading-[1.05] text-foreground sm:text-4xl lg:text-[44px]">
                  {product.title}
                </h1>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => setWish((v) => !v)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition hover:bg-muted active:scale-95"
                  aria-label={
                    wish ? "Remove from wishlist" : "Save to wishlist"
                  }
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
                  onClick={copyLink}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition hover:bg-muted active:scale-95"
                  aria-label="Copy product link"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <LinkIcon className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition hover:bg-muted active:scale-95"
                  aria-label="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            {/* Social proof */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <StarRow value={reviewSummary.average} />
                <span className="font-medium text-foreground">
                  {reviewSummary.average.toFixed(1)}
                </span>
                <a
                  href="#reviews"
                  className="text-muted-foreground underline-offset-4 hover:underline"
                >
                  ({reviewSummary.totalReviews} reviews)
                </a>
              </div>
              <span className="h-3 w-px bg-border" />
              <span className="text-muted-foreground">
                {analytics.sold.toLocaleString()}+ sold
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="text-muted-foreground">
                {analytics.wishlist.toLocaleString()} saved
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <div className="flex flex-wrap items-end gap-3">
                <span className="font-display text-4xl text-foreground">
                  ৳{price.selling.toLocaleString()}
                </span>
                {price.mrp > price.selling && (
                  <>
                    <span className="text-base text-muted-foreground line-through">
                      ৳{price.mrp.toLocaleString()}
                    </span>
                    <span className="rounded-full bg-sale/10 px-2 py-1 text-xs font-semibold text-sale">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Inclusive of all taxes. {price.currency}.
              </p>

              {/* Flash sale */}
              {marketing.flashSale?.enabled && (
                <div
                  className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-sale/8 px-3 py-3"
                  style={{
                    backgroundColor:
                      "color-mix(in oklab, var(--sale) 8%, transparent)",
                  }}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-sale">
                    <Zap className="h-4 w-4" />
                    Flash sale ends in
                  </div>
                  <Countdown endsAt={marketing.flashSale.endsAt} />
                </div>
              )}

              {/* Stock */}
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "inline-flex h-2 w-2 rounded-full",
                    !available
                      ? "bg-destructive"
                      : lowStock
                        ? "bg-warning"
                        : "bg-success",
                  )}
                />
                <span
                  className={cn(
                    "font-medium",
                    !available ? "text-destructive" : "text-foreground",
                  )}
                >
                  {!available
                    ? "Currently unavailable"
                    : lowStock
                      ? `Only ${stock} left — order soon`
                      : "In stock & ready to ship"}
                </span>
                {selectedVariant && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    SKU {selectedVariant.sku}
                  </span>
                )}
              </div>
            </div>

            {/* Variant selectors */}
            <div className="mt-6 flex flex-col gap-5">
              {attributes.map((attr) => {
                const selected = selection[attr.slug];
                return (
                  <div key={attr.slug}>
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          {attr.name}:
                        </span>{" "}
                        <span className="font-medium text-foreground">
                          {
                            attr.values.find(
                              (v) =>
                                (v.slug ?? v.label.toLowerCase()) === selected,
                            )?.label
                          }
                        </span>
                      </div>
                      {attr.slug === "size" && (
                        <button className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                          Size guide
                        </button>
                      )}
                    </div>

                    {attr.type === "color" ? (
                      <div className="flex flex-wrap gap-2.5">
                        {attr.values.map((v) => {
                          const slug = v.slug ?? v.label.toLowerCase();
                          const isSel = selected === slug;
                          const avail = isValueAvailable(attr.slug, slug);
                          return (
                            <button
                              key={slug}
                              type="button"
                              onClick={() => updateAttr(attr.slug, slug)}
                              disabled={!avail}
                              className={cn(
                                "group relative grid h-11 w-11 place-items-center rounded-full ring-1 transition",
                                isSel
                                  ? "ring-2 ring-foreground"
                                  : "ring-border hover:ring-border-strong",
                                !avail && "opacity-40",
                              )}
                              aria-label={`${attr.name} ${v.label}${!avail ? " — unavailable" : ""}`}
                              aria-pressed={isSel}
                            >
                              <span
                                className="h-7 w-7 rounded-full border border-black/10"
                                style={{ backgroundColor: v.hex ?? "#ddd" }}
                              />
                              {!avail && (
                                <span className="absolute inset-0 grid place-items-center">
                                  <span className="block h-px w-9 rotate-45 bg-foreground/70" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {attr.values.map((v) => {
                          const slug = v.slug ?? v.label.toLowerCase();
                          const isSel = selected === slug;
                          const avail = isValueAvailable(attr.slug, slug);
                          return (
                            <button
                              key={slug}
                              type="button"
                              onClick={() => updateAttr(attr.slug, slug)}
                              disabled={!avail}
                              className={cn(
                                "relative min-w-[3rem] rounded-xl border px-4 py-2.5 text-sm font-medium transition",
                                isSel
                                  ? "border-foreground bg-foreground text-primary-foreground"
                                  : "border-border bg-surface text-foreground hover:border-border-strong",
                                !avail &&
                                  "cursor-not-allowed border-dashed text-muted-foreground hover:border-border",
                              )}
                              aria-pressed={isSel}
                            >
                              {v.label}
                              {!avail && (
                                <span className="pointer-events-none absolute inset-0 grid place-items-center">
                                  <span className="block h-px w-[120%] rotate-12 bg-border-strong" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quantity */}
              <div>
                <div className="mb-2.5 text-sm text-muted-foreground">
                  Quantity
                </div>
                <div className="inline-flex items-center rounded-xl border border-border bg-surface">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-11 w-11 place-items-center text-foreground transition hover:bg-muted disabled:opacity-40"
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-base font-medium tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQty((q) => Math.min(Math.max(1, stock || 99), q + 1))
                    }
                    className="grid h-11 w-11 place-items-center text-foreground transition hover:bg-muted disabled:opacity-40"
                    disabled={available && qty >= stock}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Purchase actions */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={addToCart}
                disabled={!available}
                className={cn(
                  "relative col-span-2 rounded-2xl bg-foreground py-4 text-base font-medium text-primary-foreground shadow-elevated transition hover:bg-foreground/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-1",
                )}
              >
                {addedFlash ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Check className="h-4 w-4" /> Added to bag
                  </span>
                ) : (
                  "Add to bag"
                )}
              </button>
              <button
                type="button"
                disabled={!available}
                className="col-span-2 rounded-2xl border border-foreground bg-surface py-4 text-base font-medium text-foreground transition hover:bg-foreground hover:text-primary-foreground active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-1"
              >
                Buy it now
              </button>
            </div>

            {/* Delivery / return / trust */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoTile
                icon={<Truck className="h-4 w-4" />}
                title={
                  shipping.freeShipping
                    ? "Free shipping"
                    : "Shipping calculated at checkout"
                }
                desc={`Estimated delivery in ${shipping.estimatedDelivery}`}
              />
              <InfoTile
                icon={<RotateCcw className="h-4 w-4" />}
                title={`${returnPolicy.days}-day returns`}
                desc={
                  returnPolicy.exchange
                    ? "Free size exchange included"
                    : "Returns accepted"
                }
              />
              {shipping.cashOnDelivery && (
                <InfoTile
                  icon={<Wallet className="h-4 w-4" />}
                  title="Cash on delivery"
                  desc="No extra charge"
                />
              )}
              {shipping.location && (
                <InfoTile
                  icon={<MapPin className="h-4 w-4" />}
                  title="Ships from"
                  desc={shipping.location}
                />
              )}
            </div>
          </div>
        </div>

        {/* Highlights */}
        {product.highlights && product.highlights.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl tracking-tight text-foreground sm:text-3xl">
              Product highlights
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {product.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-soft"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-foreground text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Description + Specifications */}
        <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl tracking-tight text-foreground sm:text-3xl">
              Description
            </h2>
            <div className="prose-sm mt-5 max-w-prose text-base leading-relaxed text-muted-foreground">
              <p>{product.description}</p>
              <p className="mt-4">
                Pair it with relaxed bottoms for an effortless everyday look, or
                layer under an unstructured jacket for cooler evenings. Built to
                be worn — and washed — relentlessly.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {product.specifications && (
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h3 className="font-display text-xl tracking-tight text-foreground">
                Specifications
              </h3>
              <dl className="mt-4 divide-y divide-border">
                {product.specifications.map((s) => (
                  <div
                    key={s.label}
                    className="grid grid-cols-[120px_1fr] gap-4 py-2.5 text-sm"
                  >
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                Authentic product, sourced directly from {product.brand.name}.
              </div>
            </div>
          )}
        </section>

        {/* Reviews */}
        <section id="reviews" className="mt-20 scroll-mt-24">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl tracking-tight text-foreground sm:text-3xl">
              Customer reviews
            </h2>
            <button className="rounded-xl border border-foreground bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-foreground hover:text-primary-foreground">
              Write a review
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl text-foreground">
                  {reviewSummary.average.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <StarRow
                value={reviewSummary.average}
                size={16}
                className="mt-2"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Based on {reviewSummary.totalReviews.toLocaleString()} verified
                reviews
              </p>
              <div className="mt-5 space-y-2">
                {[5, 4, 3, 2, 1].map((r) => {
                  const count = reviewSummary.distribution[String(r)] ?? 0;
                  const pct = (count / reviewSummary.totalReviews) * 100;
                  return (
                    <div key={r} className="flex items-center gap-3 text-xs">
                      <span className="w-3 text-muted-foreground">{r}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-foreground"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-10 text-right tabular-nums text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {reviewSummary.latest?.map((r) => (
                <article
                  key={r.id}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-soft"
                >
                  <header className="flex flex-wrap items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-muted text-sm font-medium text-foreground">
                      {r.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {r.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(r.date).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      {r.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                          <Check className="h-3 w-3" /> Verified
                        </span>
                      )}
                      <StarRow value={r.rating} size={12} />
                    </div>
                  </header>
                  <h4 className="mt-3 text-base font-medium text-foreground">
                    {r.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </article>
              ))}
              <button className="self-start text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                View all {reviewSummary.totalReviews} reviews
              </button>
            </div>
          </div>
        </section>

        {/* Rails */}
        <ProductRail title="You may also like" items={data.relatedProducts} />
        <ProductRail title="Recommended for you" items={data.recommendations} />
        <ProductRail title="Recently viewed" items={data.recentlyViewed} />

        {/* FAQ */}
        {product.faq && product.faq.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl tracking-tight text-foreground sm:text-3xl">
              Frequently asked
            </h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
              {product.faq.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function InfoTile({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({
  q,
  a,
  defaultOpen,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="group px-5 py-4"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-sm font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
        {q}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
    </details>
  );
}
