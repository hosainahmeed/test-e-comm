"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import {
  Star,
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Expand,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { Product } from "@/lib/productServerApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import DetailRow from "./DetailRow";
import MobileImageCarousel from "./MobileImageCarousel";

gsap.registerPlugin(Observer);

interface ProductDetailProps {
  product: Product;
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = () => {
    if (!product?.images?.length) return;
    setLightboxIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );
  };

  const handleNext = () => {
    if (!product?.images?.length) return;
    setLightboxIndex((prev) => (prev + 1) % product.images.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, product?.images?.length, lightboxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // swipe threshold in px
    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const originalPrice =
    product?.discountPercentage > 0
      ? (product?.price / (1 - product?.discountPercentage / 100)).toFixed(2)
      : null;

  const inStock = product?.stock > 0;
  const mainImage = product?.images[selectedImage] ?? product?.thumbnail;

  const incQty = () =>
    setQuantity((q) => Math.min(q + 1, Math.max(product?.stock, 1)));
  const decQty = () =>
    setQuantity((q) => Math.max(q - 1, product?.minimumOrderQuantity || 1));

  return (
    <section className="mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 lg:px-10 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[80px_minmax(0,1fr)_minmax(0,420px)] lg:gap-10 xl:grid-cols-[96px_minmax(0,1fr)_minmax(0,460px)] xl:gap-14">
        {/* ── Desktop: vertical thumbnails ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-3">
            {product?.images?.map((image, index) => (
              <button
                key={image + index}
                type="button"
                onClick={() => setSelectedImage(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={selectedImage === index}
                className={cn(
                  "aspect-square w-full overflow-hidden rounded-md border bg-muted transition-all duration-300 cursor-pointer",
                  selectedImage === index
                    ? "border-red-400/40"
                    : "border-transparent hover:border-border",
                )}
              >
                <Image
                  width={100}
                  height={100}
                  src={image}
                  alt={`${product?.title} ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </aside>

        {/* ── Image area ── */}
        <div className="flex flex-col gap-4">
          {/* Mobile: GSAP swipe carousel — hidden on lg+ */}
          <div className="overflow-hidden rounded-xl lg:hidden">
            <MobileImageCarousel
              images={product?.images || []}
              title={product?.title || ""}
              discountPercentage={product?.discountPercentage || 0}
            />
          </div>

          {/* Desktop: static main image — hidden below lg */}
          <div className="group relative hidden overflow-hidden rounded-lg bg-muted lg:block">
            <div className="aspect-4/5 w-full">
              <Image
                src={mainImage}
                alt={product?.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                width={100}
                height={100}
              />
            </div>

            {originalPrice && (
              <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-background">
                −{Math.round(product?.discountPercentage)}%
              </span>
            )}

            <div className="absolute right-4 top-4 flex flex-col gap-2">
              {[
                { icon: Heart, label: "Save to wishlist" },
                { icon: Share2, label: "Share product" },
                { icon: Expand, label: "Expand product" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => {
                    if (label === "Expand product") {
                      setLightboxIndex(selectedImage);
                      setIsLightboxOpen(true);
                    }
                  }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:scale-[1.05] cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: product info ── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {product?.brand}
              </p>
              <h1 className="text-3xl font-light leading-tight tracking-tight text-foreground sm:text-4xl">
                {product?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 text-foreground">
                  <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                  <span className="font-medium">
                    {product?.rating.toFixed(1)}
                  </span>
                </span>
                <span aria-hidden>·</span>
                <span>{product?.reviews?.length || 0} reviews</span>
                <span aria-hidden>·</span>
                <span>SKU {product?.sku}</span>
              </div>
            </header>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3 border-y border-border py-5">
              <span className="text-2xl font-medium text-foreground sm:text-3xl">
                ${product?.price.toFixed(2)}
              </span>
              {originalPrice && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    ${originalPrice}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-destructive">
                    Save {Math.round(product?.discountPercentage)}%
                  </span>
                </>
              )}
              <span className="ml-auto text-xs text-muted-foreground">
                Tax included
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product?.description}
            </p>

            {/* Tags */}
            {product?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wider text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-xs">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  inStock ? "bg-emerald-500" : "bg-destructive",
                )}
                aria-hidden
              />
              <span className="font-medium text-foreground">
                {product?.availabilityStatus}
              </span>
              {inStock && (
                <span className="text-muted-foreground">
                  · {product?.stock} in stock
                </span>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex  gap-3 sm:flex-row">
              <div className="inline-flex h-12 items-center rounded-full border border-border w-fit!">
                <button
                  type="button"
                  onClick={decQty}
                  disabled={
                    !inStock || quantity <= (product?.minimumOrderQuantity || 1)
                  }
                  aria-label="Decrease quantity"
                  className="grid h-full w-12 place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="grid h-full w-10 place-items-center text-sm font-medium tabular-nums"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incQty}
                  disabled={!inStock || quantity >= product?.stock}
                  aria-label="Increase quantity"
                  className="grid h-full w-12 place-items-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                type="button"
                disabled={!inStock}
                className="flex-1 rounded-full h-12 bg-black text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 text-white"
              >
                {inStock ? "Add to cart" : "Out of stock"}
              </Button>
            </div>

            {product?.minimumOrderQuantity > 1 && (
              <p className="text-xs text-muted-foreground">
                Minimum order: {product?.minimumOrderQuantity} units
              </p>
            )}

            {/* Shipping perks */}
            <ul className="grid gap-3 rounded-md bg-muted/50 p-4 text-xs text-muted-foreground sm:grid-cols-3">
              <li className="flex items-start gap-2">
                <Truck className="mt-0.5 h-4 w-4 text-foreground" aria-hidden />
                <span>{product?.shippingInformation}</span>
              </li>
              <li className="flex items-start gap-2">
                <RotateCcw
                  className="mt-0.5 h-4 w-4 text-foreground"
                  aria-hidden
                />
                <span>{product?.returnPolicy}</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 text-foreground"
                  aria-hidden
                />
                <span>{product?.warrantyInformation}</span>
              </li>
            </ul>

            {/* Accordion details */}
            <Accordion
              type="single"
              collapsible
              defaultValue="details"
              className="w-full"
            >
              <AccordionItem value="details">
                <AccordionTrigger className="text-xs uppercase tracking-[0.18em]">
                  Product details
                </AccordionTrigger>
                <AccordionContent>
                  <dl className="grid grid-cols-1 gap-y-2 text-sm sm:grid-cols-2">
                    <DetailRow label="Brand" value={product?.brand} />
                    <DetailRow label="Category" value={product?.category} />
                    <DetailRow label="Weight" value={`${product?.weight} g`} />
                    <DetailRow label="SKU" value={product?.sku} />
                  </dl>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-xs uppercase tracking-[0.18em]">
                  Shipping & returns
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                  <p>{product?.shippingInformation}</p>
                  <p>{product?.returnPolicy}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reviews">
                <AccordionTrigger className="text-xs uppercase tracking-[0.18em]">
                  Reviews ({product?.reviews?.length || 0})
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {product?.reviews?.slice(0, 3).map((r, i) => (
                    <article
                      key={i}
                      className="border-b border-border pb-3 last:border-b-0"
                    >
                      <header className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {r.reviewerName}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star
                            className="h-3 w-3 fill-current text-foreground"
                            aria-hidden
                          />
                          {r.rating}
                        </span>
                      </header>
                      <p className="text-sm text-muted-foreground">
                        {r.comment}
                      </p>
                    </article>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {isLightboxOpen && product?.images && (
        <div
          className="fixed inset-0 z-99999999 flex flex-col justify-between bg-black/95 backdrop-blur-md transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Top panel: Title & Close */}
          <div className="flex items-center justify-between p-4 md:p-6 text-white bg-linear-to-b from-black/50 to-transparent">
            <div>
              <h3 className="font-light tracking-wide text-sm md:text-base">
                {product.title}
              </h3>
              <p className="text-xs text-zinc-400">
                Image {lightboxIndex + 1} of {product.images.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main content: Prev, Image, Next */}
          <div
            className="relative flex-1 flex items-center justify-center px-4 bg-white z-999!"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Prev button */}
            {product.images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-[60vh] md:h-[75vh] max-w-5xl flex items-center justify-center">
              <Image
                src={product.images[lightboxIndex]}
                alt={`${product.title} expanded view`}
                fill
                priority
                className="object-contain select-none pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </div>

            {/* Next button */}
            {product.images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-black/40 hover:bg-black/60 text-black hover:text-white backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom panel: Thumbnail Strip */}
          <div className="p-4 md:p-6 bg-linear-to-t from-black/50 to-transparent flex flex-col items-center gap-3">
            {product.images.length > 1 && (
              <div className="flex gap-2 max-w-full overflow-x-auto py-2 px-4 no-scrollbar justify-center">
                {product.images.map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className={cn(
                      "relative aspect-square w-12 md:w-16 rounded overflow-hidden border-2 transition-all cursor-pointer",
                      lightboxIndex === i
                        ? "border-white scale-105"
                        : "border-transparent opacity-50 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
            <span className="text-xs text-zinc-500 hidden md:block">
              Use arrow keys or swipe on mobile to navigate
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
