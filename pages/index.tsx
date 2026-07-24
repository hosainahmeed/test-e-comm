import DownloadAds from "@/components/ads/download-ads";
import FlashSale from "@/components/sections/FlashSale";
import HeroSection from "@/components/sections/HeroSection";
import PopularBrands from "@/components/sections/popularBrands";
import PromotionSale from "@/components/sections/promotion-sales";
import RecentlyViewed from "@/components/sections/RecentlyViewed";
import SmallDeviceCategory from "@/components/sections/small-device-category";
import ValueFeaturesSection from "@/components/sections/ValueFeaturesSection";
import PromoBannersSection from "@/components/sections/PromoBannersSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import { IMAGE } from "@/constant/image.index";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14 pb-8">
      <HeroSection />
      {/* <ValueFeaturesSection /> */}
      <FlashSale />
      <SmallDeviceCategory />
      <PromoBannersSection />
      <PopularBrands />
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex gap-2 items-center">
          <div className="w-40 h-40 md:hidden aspect-square flex items-center justify-center shrink-0">
            <Image
              src={IMAGE.banner}
              alt="App promo banner"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <DownloadAds />
        </div>
      </div>
      <PromotionSale />
      <RecentlyViewed />
      <NewsletterSection />
    </div>
  );
}
