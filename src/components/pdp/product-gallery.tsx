import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ProductGallery({
  images,
  title,
  fullscreen,
  setFullscreen,
}: {
  images: string[];
  title: string;
  fullscreen: boolean;
  setFullscreen: (value: boolean) => void;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Reset on image set change (e.g. color switch)
  useEffect(() => {
    setActive(0);
    trackRef.current?.scrollTo({
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [images]);

  // Sync scroll snap on mobile -> active dot
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive((prev) => (prev !== i ? i : prev));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (i: number) => {
    const next = (i + images.length) % images.length;
    setActive(next);
    const el = trackRef.current;
    if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main stage */}
      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto rounded-2xl bg-surface-muted md:overflow-hidden"
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setFullscreen(true)}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                });
              }}
              onMouseLeave={() => setZoom(null)}
              className="group relative aspect-square w-full shrink-0 snap-center overflow-hidden"
              aria-label={`${title} image ${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={`${title} — view ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03] md:duration-300"
                style={
                  zoom && i === active
                    ? {
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                        transform: "scale(1.8)",
                        transition: "transform 80ms linear",
                      }
                    : undefined
                }
              />
            </button>
          ))}
        </div>

        {/* Desktop arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goto(active - 1)}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 p-2.5 text-foreground shadow-soft backdrop-blur transition hover:bg-surface md:flex"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goto(active + 1)}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 p-2.5 text-foreground shadow-soft backdrop-blur transition hover:bg-surface md:flex"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => setFullscreen(true)}
          className="absolute right-3 top-3 rounded-full bg-surface/90 p-2 text-foreground shadow-soft backdrop-blur transition hover:bg-surface"
          aria-label="Open fullscreen"
        >
          <Expand className="h-4 w-4" />
        </button>

        {/* Mobile dots */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 md:hidden">
          {images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30",
              )}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="hidden gap-2 md:flex">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => goto(i)}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl ring-1 transition",
                i === active
                  ? "ring-2 ring-foreground"
                  : "ring-border hover:ring-border-strong",
              )}
              aria-label={`Show image ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen */}
      {fullscreen && (
        <div className="fixed inset-0 z-99999999 flex items-center justify-center bg-black! p-4 animate-in fade-in">
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close fullscreen"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goto(active - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 z-50"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <img
            src={images[active]}
            alt={`${title} — fullscreen ${active + 1}`}
            className="max-h-full max-w-full object-contain pointer-events-none"
          />
          <button
            type="button"
            onClick={() => goto(active + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 z-50"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
