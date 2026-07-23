import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { productData } from "@/data/product";

type Attribute = (typeof productData)["attributes"][number];

interface PdpVariantSelectorProps {
  attributes: Attribute[];
  selection: Record<string, string>;
  qty: number;
  stock: number;
  available: boolean;
  onUpdateAttr: (slug: string, value: string) => void;
  onIncreaseQty: () => void;
  onDecreaseQty: () => void;
  isValueAvailable: (attrSlug: string, valueSlug: string) => boolean;
}

export const PdpVariantSelector: React.FC<PdpVariantSelectorProps> = ({
  attributes,
  selection,
  qty,
  stock,
  available,
  onUpdateAttr,
  onIncreaseQty,
  onDecreaseQty,
  isValueAvailable,
}) => {
  return (
    <div className="mt-5 flex flex-col gap-4">
      {attributes.map((attr) => {
        const selected = selection[attr.slug];
        return (
          <div key={attr.slug}>
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs sm:text-sm">
                <span className="text-gray-500">{attr.name}:</span>{" "}
                <span className="font-semibold text-gray-900">
                  {
                    attr.values.find(
                      (v) => (v.slug ?? v.label.toLowerCase()) === selected,
                    )?.label
                  }
                </span>
              </div>
              {attr.slug === "size" && (
                <button className="text-[11px] text-gray-500 underline-offset-4 hover:text-black hover:underline">
                  Size guide
                </button>
              )}
            </div>

            {attr.type === "color" ? (
              <div className="flex flex-wrap gap-2">
                {attr.values.map((v) => {
                  const slug = v.slug ?? v.label.toLowerCase();
                  const isSel = selected === slug;
                  const avail = isValueAvailable(attr.slug, slug);
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => onUpdateAttr(attr.slug, slug)}
                      disabled={!avail}
                      className={cn(
                        "group relative grid h-10 w-10 place-items-center rounded-full ring-1 transition cursor-pointer",
                        isSel
                          ? "ring-2 ring-black"
                          : "ring-gray-300 hover:ring-gray-400",
                        !avail && "opacity-40 cursor-not-allowed",
                      )}
                      aria-label={`${attr.name} ${v.label}${!avail ? " — unavailable" : ""}`}
                      aria-pressed={isSel}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={{ backgroundColor: v.hex ?? "#ddd" }}
                      />
                      {!avail && (
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="block h-px w-8 rotate-45 bg-gray-700" />
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
                      onClick={() => onUpdateAttr(attr.slug, slug)}
                      disabled={!avail}
                      className={cn(
                        "relative min-w-11 rounded-lg border px-3.5 py-2 text-xs font-semibold transition cursor-pointer",
                        isSel
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-900 hover:border-gray-400",
                        !avail &&
                          "cursor-not-allowed border-dashed text-gray-400 hover:border-gray-200",
                      )}
                      aria-pressed={isSel}
                    >
                      {v.label}
                      {!avail && (
                        <span className="pointer-events-none absolute inset-0 grid place-items-center">
                          <span className="block h-px w-[120%] rotate-12 bg-gray-400" />
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

      {/* Quantity Stepper */}
      <div>
        <div className="mb-2 text-xs text-gray-500 font-medium">Quantity</div>
        <div className="inline-flex items-center rounded-lg border border-[#EAE7E2] bg-white overflow-hidden">
          <button
            type="button"
            onClick={onDecreaseQty}
            className="grid h-9 w-9 place-items-center text-gray-700 transition hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center text-xs font-semibold tabular-nums text-gray-900">
            {qty}
          </span>
          <button
            type="button"
            onClick={onIncreaseQty}
            className="grid h-9 w-9 place-items-center text-gray-700 transition hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
            disabled={available && qty >= stock}
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
