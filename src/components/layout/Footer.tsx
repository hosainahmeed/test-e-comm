import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col justify-end bg-white pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden w-full">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
          <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-start text-left">
            <div className="w-full max-w-52 h-0.5 mt-8 bg-linear-to-r from-[#24212D] to-[#24212D]/0"></div>
            <p className="text-sm text-black/60 mt-6 max-w-[350px] leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              perferendis suscipit veritatis, dolores aspernatur voluptatibus
              asperiores, accusantium facilis vero sed laborum eum ratione
              libero adipisci quisquam, quidem natus excepturi. Error, provident
              unde!
            </p>
          </div>

          <div className="w-[45%] md:w-[45%] lg:w-[15%] flex flex-col items-start text-left">
            <h3 className="text-sm text-black font-medium">Important Links</h3>
            <div className="flex flex-col gap-2 mt-6">
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Term & Conditions
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="w-[45%] md:w-[45%] lg:w-[15%] flex flex-col items-start text-left">
            <h3 className="text-sm text-black font-medium">Social Links</h3>
            <div className="flex flex-col gap-2 mt-6">
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Youtube
              </a>
              <a
                href="#"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Linkedin
              </a>
            </div>
          </div>

          <div
            style={{
              minWidth: "180px",
              maxWidth: "200px",
              backgroundColor: "#FAF8F5",
              borderRadius: "10px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#C8A96E",
                textTransform: "uppercase",
              }}
            >
              Featured
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#111",
                lineHeight: 1.3,
              }}
            >
              Free shipping on orders over $100
            </div>
            <div style={{ fontSize: "12px", color: "#777", marginTop: "4px" }}>
              For retail & wholesale orders alike.
            </div>
            <Link
              href="/promotions"
              style={{
                marginTop: "8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#C8A96E",
                textDecoration: "none",
              }}
            >
              See all offers →
            </Link>
          </div>
        </div>

        <div className="w-full h-0.5 mt-16 mb-4 bg-linear-to-r from-[#24212D]/0 via-[#24212D] to-[#24212D]/0"></div>

        <div className="flex flex-wrap sm:flex-row items-center justify-between gap-y-4 gap-x-2 relative z-10">
          <p className="text-xs text-black/60">© 2026 DivanDione</p>
          <div className="flex items-center gap-6 text-right">
            <a
              href="#"
              className="text-xs text-black/60 hover:text-black transition-colors"
            >
              Terms & Conditions
            </a>
            <div className="w-px h-4 bg-white/20"></div>
            <a
              href="#"
              className="text-xs text-black/60 hover:text-black transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="w-full flex justify-center mt-6 md:mt-12 md:mb-[-0.5%]">
          <h1 className="text-center font-extrabold tracking-tighter leading-[0.90] text-zinc-900 text-[clamp(4.5rem,8.5vw,25rem)] pointer-events-none select-none">
            DIVAN DIONE
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
