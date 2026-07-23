import React from "react";
import { Shield } from "lucide-react";
import type { productData } from "@/data/product";

type Product = (typeof productData)["product"];

interface PdpDescriptionProps {
  product: Product;
}

export const PdpDescription: React.FC<PdpDescriptionProps> = ({ product }) => {
  return (
    <section className="mt-14 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-[1.4fr_1fr]">
      {/* Main Text */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Description
        </h2>
        <div className="mt-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
          <p>{product.description}</p>
          <p className="mt-3">
            Pair it with relaxed bottoms for an effortless everyday look, or
            layer under an unstructured jacket for cooler evenings. Built to
            be worn — and washed — relentlessly.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#F0EDE8] bg-[#F8F6F2] px-2.5 py-0.5 text-[11px] font-medium text-gray-600"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Specifications Card */}
      {product.specifications && (
        <div className="rounded-xl border border-[#F0EDE8] bg-white p-5 shadow-2xs">
          <h3 className="font-display text-lg font-bold text-gray-900">
            Specifications
          </h3>
          <dl className="mt-3 divide-y divide-[#F0EDE8]">
            {product.specifications.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-[110px_1fr] gap-3 py-2 text-xs"
              >
                <dt className="text-gray-500 font-medium">{s.label}</dt>
                <dd className="text-gray-900 font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#F5F2EE] px-3 py-2 text-[11px] text-gray-600 font-medium">
            <Shield className="h-3.5 w-3.5 text-[#A937E2]" />
            Authentic product, sourced directly from {product.brand.name}.
          </div>
        </div>
      )}
    </section>
  );
};
