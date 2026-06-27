"use client";
import { ChevronRight } from "lucide-react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useCallback, useEffect } from "react";

interface SubcategoryType {
  subcategories: string;
  subcategoryImage: string;
}

interface CategoryType {
  categoryName: string;
  categoryImage: string;
  slug: string;
  subcategories: SubcategoryType[];
}

function CategoryCard({
  category,
  onNavigate,
}: {
  category: CategoryType;
  onNavigate: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      className="shrink-0 w-[calc(100vw-10rem)] sm:w-72 md:w-50 text-left"
    >
      <div className="flex items-center gap-2 mb-3">
        <h3
          onClick={() => onNavigate(category.slug)}
          className="text-sm sm:text-sm md:text-base font-semibold cursor-pointer"
        >
          {category.categoryName}
        </h3>
        <span className="text-xl">›</span>
      </div>

      <div className="w-full aspect-4/3 overflow-hidden rounded-2xl md:rounded-[28px] grid grid-cols-2 grid-rows-2 relative bg-amber-300">
        <div className="absolute inset-0 z-10 bg-black/35 pointer-events-none" />
        {category.subcategories.slice(0, 4).map((sub, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden border border-white"
          >
            <Image
              src={sub.subcategoryImage}
              alt={sub.subcategories || category.categoryName}
              fill
              sizes="(max-width: 768px) 50vw, 200px"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10" />
            {/* {sub.subcategories && (
              <div className="absolute bottom-2 left-2 z-10">
                <span className="text-white font-semibold text-sm md:text-base drop-shadow">
                  {sub.subcategories}
                </span>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </button>
  );
}

function CategoriesSection() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const data: CategoryType[] = [
    {
      categoryName: "Hookah",
      categoryImage: "",
      slug: "hookah",
      subcategories: [
        {
          subcategories: "Classic",
          subcategoryImage:
            "https://rukmini1.flixcart.com/image/1500/1500/xif0q/hookah/j/k/h/hookah-2-serenity-living-original-imahjfz3zjepyq32.jpeg?q=70",
        },
        {
          subcategories: "Modern",
          subcategoryImage:
            "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66aa1e1315c1b3003ed26c19/photoroom-20240716_163154.png",
        },
        {
          subcategories: "Lifestyle",
          subcategoryImage:
            "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/322/322685/hookah-smoking.jpg?w=1155&h=1541",
        },
        {
          subcategories: "Accessories",
          subcategoryImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDjuUOGEpa4KK2X5ntzoRM4bouGuaixoGhhUEj67s8ND1Zng9IbQlIBUrQ&s=10",
        },
      ],
    },
    {
      categoryName: "Shisha",
      categoryImage: "",
      slug: "shisha",
      subcategories: [
        {
          subcategories: "",
          subcategoryImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxjm3KjdE2A81y0iIgnTCSfq6sLCz3Yym8BFqTxAk6LA&s=10",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://iconhookah.com/cdn/shop/products/AdalyaLove66250ghookahshishatobacco_600x.jpg?v=1680582383",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://thehookahlab.com/cdn/shop/files/best-adalya-flavors-blog_800x.png?v=1777594283",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://utopiaclouds.com/cdn/shop/articles/Adalya_Tobacco_3_flavors_e9cefa0d-450e-4f4b-9412-9383dbb0c6c1.jpg?v=1702651683&width=1100",
        },
      ],
    },
    {
      categoryName: "Charcoals",
      categoryImage: "",
      slug: "charcoals",
      subcategories: [
        {
          subcategories: "",
          subcategoryImage:
            "https://iconhookah.com/cdn/shop/files/BLACKCOCO_sCubes26mmHookahCharcoal_800x.webp?v=1684204674",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://hookain.de/media/15/bb/58/1756254577/blackcoco-s-cubes-27-1-kg-premium-naturkohle-bestellen-1.jpg?ts=1756254577",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://image.made-in-china.com/202f0j00jeBVURMGIEYT/Silver-Charcoal-33mm-Shisha-Charcoal-with-High-Quality-Fast-Burn.webp",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://s.alicdn.com/@sc04/kf/Hafb1e52d8de640849715c0bb9f6a23e6T/YKS-Fast-Burning-Smokeless-33mm-Round-Fruit-Wood-Black-Charcoal-Shisha-Hookah.jpg_300x300.jpg",
        },
      ],
    },
    {
      categoryName: "Hookah Bowls",
      categoryImage: "",
      slug: "hookah-bowls",
      subcategories: [
        {
          subcategories: "",
          subcategoryImage:
            "https://thehookahlab.com/cdn/shop/files/Cyril-Bowl-Nogrod-Aurora_600x.jpg?v=1728555882",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://www.shishabox.club/cdn/shop/files/detail8a244279ef219e31ef36d8c.webp?v=1771285257&width=626",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb7EQ66lMCB-P-B_HJ-oE9p580ZPrrSCTxbM8cnv3YpA&s=10",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://iconhookah.com/cdn/shop/products/Japona-Hookah-Killer-Hookah-bowl-Black.jpg?v=1645073770",
        },
      ],
    },
    {
      categoryName: "Foil",
      categoryImage: "",
      slug: "foil",
      subcategories: [
        {
          subcategories: "",
          subcategoryImage:
            "https://media.hookah.com/media/catalog/product/a/p/api-v1.1-file-public_files-pim-assets-2b-7a-53-64-64537a2b6525f6000198dc5f-images-99-bd-3b-66-663bbd998635cfcfbc6f7f87-Foil-AlFakher-PrePunched-100pc.webp",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQnFx3B7FWAq2DQVLmIc2vMeKVBHW8M9ae-PDjDaYun_pMai0TrLY4x8bT&s=10",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://res.cloudinary.com/binkhumery-online-store/image/upload/v1728563806/xxl2nuz90q0sscp0z6ks.png",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://www.reallwinfoilpackaging.com/wp-content/uploads/elementor/thumbs/Hookah-Aluminum-Foil-roll-wholesale-manufacturer-qi6v31k3kte5g2dclro1873qx9xd1tgwrazruxsvz2.jpg",
        },
      ],
    },
    {
      categoryName: "Accessories",
      categoryImage: "",
      slug: "accessories",
      subcategories: [
        {
          subcategories: "",
          subcategoryImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLVdSk1ac4bZpabdPcroBY5RaUaG2zh8j5ZrRn3GFSsj_l9zu6nXER5KQ&s=10",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://image.made-in-china.com/43f34j00shFCynMdKqoR/Hot-Sale-Cross-Border-Shisha-Accessories-with-Lanyard-Silicone-Cartoon-Unique-Hookah.webp",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSm1OS87SF7DxoTpoWo21iXZLqJ1C7bL9AcUPEPHLaUWBej41tgZDpQA&s=10",
        },
        {
          subcategories: "",
          subcategoryImage:
            "https://veekaywholesale.com/wp-content/uploads/2021/06/HKTRAVEL_4.jpg",
        },
      ],
    },
  ];

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const handleNavigate = useCallback(
    (slug: string) => {
      if (hasDragged) return; // ignore click that ends a drag
      router.push(`/categories/${slug}`);
    },
    [hasDragged, router],
  );

  const stopDrag = useCallback(() => setIsDragging(false), []);

  /* ── Touch drag-to-scroll (native scroll handles it; just track for click-suppression) ── */
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setHasDragged(false);
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const walk = touchStartX.current - e.touches[0].pageX;
    if (Math.abs(walk) > 5) setHasDragged(true);
    scrollRef.current.scrollLeft = touchScrollLeft.current + walk;
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white select-none overflow-hidden py-6 md:py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-md md:text-lg">Shop by Categories</h1>
        <div className="md:flex items-center gap-2 hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
          >
            →
          </button>
          <Link
            href="/categories"
            className="text-primary hover:underline text-sm flex items-center font-medium"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`flex gap-4 sm:gap-5 md:gap-6 px-4  p-2 sm:px-6 md:px-8 overflow-x-auto pb-2 snap-x snap-mandatory ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {data.map((category, i) => (
          <div key={i} className="snap-start">
            <CategoryCard category={category} onNavigate={handleNavigate} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;
