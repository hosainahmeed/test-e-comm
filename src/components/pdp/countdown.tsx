"use client";
import { useEffect, useState } from "react";

export function Countdown({ endsAt }: { endsAt: string }) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted || !now) {
    return (
      <div className="flex items-center gap-1 opacity-70 font-mono text-xs">
        <span className="rounded bg-black/80 px-1.5 py-0.5 text-white">00</span>
        <span>:</span>
        <span className="rounded bg-black/80 px-1.5 py-0.5 text-white">00</span>
        <span>:</span>
        <span className="rounded bg-black/80 px-1.5 py-0.5 text-white">00</span>
      </div>
    );
  }

  const end = new Date(endsAt).getTime();
  const diff = Math.max(0, end - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const Cell = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center">
      <span className="rounded-md bg-foreground px-2 py-1 font-mono text-xs tabular-nums text-primary-foreground sm:text-sm">
        {String(v).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {l}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-1.5">
      <Cell v={d} l="Days" />
      <span className="mt-[-12px] text-muted-foreground">:</span>
      <Cell v={h} l="Hrs" />
      <span className="mt-[-12px] text-muted-foreground">:</span>
      <Cell v={m} l="Min" />
      <span className="mt-[-12px] text-muted-foreground">:</span>
      <Cell v={s} l="Sec" />
    </div>
  );
}
