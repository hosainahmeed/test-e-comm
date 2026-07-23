import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItemData {
  q: string;
  a: string;
}

interface PdpFaqProps {
  faq?: FaqItemData[];
}

export const PdpFaq: React.FC<PdpFaqProps> = ({ faq }) => {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-14 sm:mt-16">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Frequently asked
      </h2>
      <div className="mt-4 divide-y divide-[#F0EDE8] rounded-xl border border-[#F0EDE8] bg-white overflow-hidden shadow-2xs">
        {faq.map((item, i) => (
          <FaqAccordionItem
            key={i}
            q={item.q}
            a={item.a}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </section>
  );
};

function FaqAccordionItem({
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
      className="group px-4 py-3.5"
    >
      <summary className="flex cursor-pointer items-center justify-between gap-3 text-left text-xs font-semibold text-gray-900 marker:hidden [&::-webkit-details-marker]:hidden sm:text-sm">
        {q}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
            open && "rotate-180 text-black",
          )}
        />
      </summary>
      <p className="mt-2.5 text-xs leading-relaxed text-gray-600 sm:text-sm">{a}</p>
    </details>
  );
}
