/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { Expand, Heart, Share2, X } from "lucide-react";
import Image from "next/image";
import DotIndicator from "./DotIndicator";
const MobileImageCarousel = ({
  images,
  title,
  discountPercentage,
}: {
  images: string[];
  title: string;
  discountPercentage: number;
}) => {
  const [current, setCurrent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const count = images?.length || 0;

  // Snap to a given index with GSAP
  const snapTo = useCallback(
    (index: number, instant = false) => {
      if (typeof window === "undefined") return;
      const clampedIndex = Math.max(0, Math.min(count - 1, index));
      setCurrent(clampedIndex);
      if (!trackRef.current) return;
      const width = containerRef.current?.offsetWidth ?? window.innerWidth;
      gsap.to(trackRef.current, {
        x: -clampedIndex * width,
        duration: instant ? 0 : 0.42,
        ease: "power3.out",
      });
    },
    [count],
  );

  useGSAP(() => {
    if (typeof window === "undefined" || !containerRef.current || count <= 1)
      return;
    const width = () => containerRef.current?.offsetWidth ?? window.innerWidth;
    const obs = Observer.create({
      target: containerRef.current,
      type: "touch,pointer",
      onPress: (self: any) => {
        isDragging.current = false;
        startX.current = self.x;
        currentX.current = gsap.getProperty(trackRef.current, "x") as number;
        gsap.killTweensOf(trackRef.current);
      },
      onDrag: (self: any) => {
        isDragging.current = true;
        const delta = self.x - startX.current;
        const resistance = 0.25;
        const raw = currentX.current + delta;
        const min = -(count - 1) * width();
        const clamped =
          raw > 0
            ? raw * resistance
            : raw < min
              ? min + (raw - min) * resistance
              : raw;
        gsap.set(trackRef.current, { x: clamped });
      },
      onDragEnd: (self: any) => {
        if (!isDragging.current) return;
        const delta = self.x - startX.current;
        const threshold = width() * 0.2;
        const velocityThreshold = 300;

        let next = current;
        if (delta < -threshold || self.velocityX < -velocityThreshold) {
          next = Math.min(current + 1, count - 1);
        } else if (delta > threshold || self.velocityX > velocityThreshold) {
          next = Math.max(current - 1, 0);
        }
        snapTo(next);
        isDragging.current = false;
      },
    });

    return () => obs.kill();
  }, [current, count, snapTo]);

  const handleAction = (label: string) => {
    if (label === "Save to wishlist") {
      console.log("Save to wishlist");
    } else if (label === "Share product") {
      console.log("Share product");
    } else if (label === "expand_image") {
      setIsExpanded(true);
    } else if (label === "Close") {
      setIsExpanded(false);
    }
  };

  const handleNextImage = () => {
    if (count <= 1) return;
    setCurrent((prev) => (prev + 1) % count);
  };

  const handlePrevImage = () => {
    if (count <= 1) return;
    setCurrent((prev) => (prev - 1 + count) % count);
  };

  return (
    <div className="relative select-none overflow-hidden" ref={containerRef}>
      {/* Full-bleed image strip */}
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ touchAction: "pan-y" }}
      >
        {images?.map((src, i) => (
          <div
            key={src + i}
            className="relative min-w-full"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              width={400}
              height={500}
              src={src}
              alt={`${title} ${i + 1}`}
              draggable={false}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Discount badge */}
      {discountPercentage > 0 && (
        <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-background">
          −{Math.round(discountPercentage)}%
        </span>
      )}

      {/* Action buttons */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        {[
          { icon: Heart, label: "Save to wishlist" },
          { icon: Share2, label: "Share product" },
          { icon: Expand, label: "expand_image" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            className="grid h-10 w-10 place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={() => handleAction(label)}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>

      {/* Dot pagination */}
      {count > 1 && (
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
          aria-hidden
        >
          {images?.map((_, i) => (
            <DotIndicator
              key={i}
              active={i === current}
              onClick={() => snapTo(i)}
            />
          ))}
        </div>
      )}

      {/* Full-screen image viewer */}
      {isExpanded && (
        <div className="fixed inset-0 z-9999999999 bg-white flex items-center justify-center h-screen">
          {/* Close button */}
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-black backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Navigation buttons */}
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
                onClick={handlePrevImage}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-transform duration-200 hover:scale-105 active:scale-95"
                onClick={handleNextImage}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Full-screen image */}
          <div className="relative w-full h-full flex items-center justify-center p-4 pointer-events-none">
            <Image
              src={images?.[current] || ""}
              alt={`${title} ${current + 1}`}
              fill
              className="object-contain pointer-events-none"
              priority
            />
          </div>

          {/* Image counter */}
          {count > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {current + 1} / {count}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileImageCarousel;
