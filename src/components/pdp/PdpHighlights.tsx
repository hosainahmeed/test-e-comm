import React from "react";
import { Check } from "lucide-react";

interface PdpHighlightsProps {
  highlights?: string[];
}

export const PdpHighlights: React.FC<PdpHighlightsProps> = ({
  highlights,
}) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="mt-14 sm:mt-16">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Product highlights
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h) => (
          <li
            key={h}
            className="flex items-start gap-2.5 rounded-xl border border-[#F0EDE8] bg-white p-3.5 shadow-2xs"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#A937E2] text-white">
              <Check className="h-3 w-3" />
            </span>
            <span className="text-xs leading-relaxed font-medium text-gray-800">
              {h}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};
