import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRow({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rated ${value} of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span
            key={i}
            className="relative inline-block"
            style={{ width: size, height: size }}
          >
            <Star
              className="absolute inset-0 text-border-strong"
              style={{ width: size, height: size }}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className="text-accent"
                fill="currentColor"
                style={{ width: size, height: size }}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}
