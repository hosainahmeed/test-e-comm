import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ShieldCheck, CalendarDays } from "lucide-react";
import Cookies from "js-cookie";

export default function AgeVerification() {
  const router = useRouter();

  const [dob, setDob] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function verify() {
    setError("");

    const res = await fetch("/api/verify-age", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dob }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    Cookies.set("age_verified", "true", {
      expires: 30,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    router.push((router.query.redirect as string) || "/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-xl shadow-2xl p-8">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <ShieldCheck className="h-9 w-9 text-emerald-400" />
        </div>

        <h1 className="text-center text-3xl font-bold text-white">
          Age Verification
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-zinc-400">
          You must be{" "}
          <span className="font-semibold text-white">21 years or older</span> to
          access this website.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Date of Birth
          </label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-11 pr-4 text-white outline-none transition focus:border-emerald-500"
            />
          </div>
        </div>

        <label className="mt-6 flex items-start gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 accent-emerald-500"
          />

          <span>
            I confirm that I am at least 21 years old and agree to the{" "}
            <Link href="/privacy" className="text-emerald-400 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-emerald-400 hover:underline">
              Terms of Service
            </Link>
            .
          </span>
        </label>

        {error && (
          <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          disabled={loading || !dob || !agree}
          onClick={verify}
          className="mt-7 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Verifying..." : "Enter Website"}
        </button>

        <p className="mt-6 text-center text-xs leading-5 text-zinc-500">
          By entering this website, you confirm that you meet the legal age
          requirement in your jurisdiction.
        </p>
      </div>
    </div>
  );
}
