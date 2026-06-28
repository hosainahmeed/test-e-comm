import DownloadAds from "@/components/ads/download-ads";
import CategoriesSection from "@/components/sections/CategoriesSection";
import FlashSale from "@/components/sections/FlashSale";
import HeroSection from "@/components/sections/HeroSection";
import PopularBrands from "@/components/sections/popularBrands";
import RecentlyViewed from "@/components/sections/RecentlyViewed";
import SmallDeviceCategory from "@/components/sections/small-device-category";
import { IMAGE } from "@/constant/image.index";
import Image from "next/image";

function index() {
  return (
    <div className="flex flex-col gap-12">
      <HeroSection />
      <FlashSale />
      <div className="sm:block hidden container mx-auto px-2">
        <CategoriesSection />
      </div>
      <div className="sm:hidden">
        <SmallDeviceCategory />
      </div>
      <PopularBrands />
      <div className="flex gap-2 ">
        <div className="w-40 h-40 md:hidden aspect-square flex items-center justify-center">
          <Image
            src={IMAGE.banner}
            alt="banner"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <DownloadAds />
      </div>
      <RecentlyViewed />
    </div>
  );
}

export default index;
