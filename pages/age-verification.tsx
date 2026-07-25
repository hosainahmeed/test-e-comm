import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ShieldCheck, Calendar, CheckCircle2, AlertCircle, Loader2, ChevronDown, Check } from "lucide-react";
import Cookies from "js-cookie";
import Image from "next/image";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  className?: string;
}

function CustomSelect({ options, value, onChange, placeholder, className = "" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between rounded-xl border py-3 px-3 text-sm transition-all duration-200 outline-none ${
          isOpen
            ? "border-[#c2a772] bg-zinc-800 ring-2 ring-[#c2a772]/30 shadow-lg shadow-black/50"
            : value
            ? "border-zinc-700 bg-zinc-800/90 text-white hover:border-zinc-500"
            : "border-zinc-700/80 bg-zinc-800/60 text-zinc-400 hover:border-zinc-600"
        }`}
      >
        <span className="truncate font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#c2a772]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-56 overflow-y-auto rounded-2xl border border-zinc-700/90 bg-zinc-900/95 p-1.5 shadow-2xl shadow-black backdrop-blur-xl scrollbar-thin scrollbar-thumb-zinc-700">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs sm:text-sm transition-all ${
                  isSelected
                    ? "bg-[#c2a772] text-zinc-950 font-bold shadow-xs"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="h-4 w-4 shrink-0 text-zinc-950 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const MONTHS: SelectOption[] = [
  { value: "01", label: "Jan (01)" },
  { value: "02", label: "Feb (02)" },
  { value: "03", label: "Mar (03)" },
  { value: "04", label: "Apr (04)" },
  { value: "05", label: "May (05)" },
  { value: "06", label: "Jun (06)" },
  { value: "07", label: "Jul (07)" },
  { value: "08", label: "Aug (08)" },
  { value: "09", label: "Sep (09)" },
  { value: "10", label: "Oct (10)" },
  { value: "11", label: "Nov (11)" },
  { value: "12", label: "Dec (12)" },
];

const currentYear = new Date().getFullYear();
const YEARS: SelectOption[] = Array.from({ length: 100 }, (_, i) => {
  const y = String(currentYear - i);
  return { value: y, label: y };
});

const DAYS: SelectOption[] = Array.from({ length: 31 }, (_, i) => {
  const d = String(i + 1).padStart(2, "0");
  return { value: d, label: d };
});

export default function AgeVerification() {
  const router = useRouter();

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Derived DOB string format: YYYY-MM-DD
  const dob = useMemo(() => {
    if (month && day && year) {
      return `${year}-${month}-${day}`;
    }
    return "";
  }, [month, day, year]);

  // Live age calculation
  const calculatedAge = useMemo(() => {
    if (!month || !day || !year) return null;
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, [month, day, year]);

  async function verify() {
    if (!dob) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/verify-age", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dob }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "You must be at least 21 years old.");
        setLoading(false);
        return;
      }

      Cookies.set("age_verified", "true", {
        expires: 30,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      router.push((router.query.redirect as string) || "/");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const isFormValid = dob && agree && (calculatedAge === null || calculatedAge >= 21);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c2a772]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-800/80 bg-zinc-900/85 backdrop-blur-2xl shadow-2xl shadow-black/80 p-6 sm:p-8">
        
        {/* Header Icon & Brand */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-800/80 border border-zinc-700/60 p-3 shadow-inner">
            <Image
              src="https://divandione.com/_next/static/media/brand.0etw48jrlgwbv.svg"
              alt="Brand Logo"
              width={70}
              height={70}
              className="w-full h-full object-contain"
              priority
            />
            <div className="absolute -bottom-2 -right-2 bg-[#c2a772] text-zinc-950 p-1 rounded-full border-2 border-zinc-900 shadow-md">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c2a772]/10 border border-[#c2a772]/30 text-[#c2a772] text-xs font-semibold uppercase tracking-wider mb-2">
            Age Requirement 21+
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Age Verification
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-zinc-400 max-w-xs">
            Welcome! Please select your date of birth to confirm you are{" "}
            <span className="font-semibold text-zinc-200">21 years or older</span>.
          </p>
        </div>

        {/* Date Selection Section */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c2a772]" />
              Date of Birth
            </label>
            {calculatedAge !== null && (
              <span className={`text-xs font-medium flex items-center gap-1 ${
                calculatedAge >= 21 ? "text-emerald-400" : "text-amber-400"
              }`}>
                {calculatedAge >= 21 ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> {calculatedAge} y/o
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3" /> Under 21 ({calculatedAge} y/o)
                  </>
                )}
              </span>
            )}
          </div>

          {/* 3 Custom Dropdown Selectors */}
          <div className="grid grid-cols-12 gap-2.5">
            {/* Month Select */}
            <CustomSelect
              options={MONTHS}
              value={month}
              onChange={setMonth}
              placeholder="Month"
              className="col-span-5"
            />

            {/* Day Select */}
            <CustomSelect
              options={DAYS}
              value={day}
              onChange={setDay}
              placeholder="Day"
              className="col-span-3"
            />

            {/* Year Select */}
            <CustomSelect
              options={YEARS}
              value={year}
              onChange={setYear}
              placeholder="Year"
              className="col-span-4"
            />
          </div>
        </div>

        {/* Checkbox Agreement */}
        <label className="mt-6 flex items-start gap-3 text-xs sm:text-sm text-zinc-300 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-[#c2a772] focus:ring-[#c2a772] accent-[#c2a772] cursor-pointer"
          />

          <span className="leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
            I confirm that I am at least 21 years old and agree to the{" "}
            <Link href="/privacy" className="text-[#c2a772] hover:underline font-medium">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-[#c2a772] hover:underline font-medium">
              Terms of Service
            </Link>
            .
          </span>
        </label>

        {/* Error message */}
        {error && (
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs sm:text-sm text-red-300 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={loading || !isFormValid}
          onClick={verify}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c2a772] py-3.5 px-4 font-semibold text-zinc-950 shadow-lg shadow-[#c2a772]/20 transition-all hover:bg-[#b09461] hover:shadow-[#c2a772]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#c2a772] disabled:hover:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <span>Enter Website</span>
          )}
        </button>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-zinc-500">
          By entering this website, you confirm that you meet the legal age requirement in your jurisdiction.
        </p>
      </div>
    </div>
  );
}


