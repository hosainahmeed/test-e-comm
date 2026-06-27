import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        <div className="md:max-w-96">
          <p className="mt-6 text-black text-sm">
            Discover the epitome of luxury with our curated collection. From haute couture to high-end accessories, we bring you timeless elegance and modern sophistication.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Image width={200} height={200} src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="google play" className="h-10 w-auto border border-white rounded" />
            <Image width={200} height={200} src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="app store" className="h-10 w-auto border border-white rounded" />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold text-black mb-5">Company</h2>
            <ul className="text-sm text-black space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-us">About us</Link></li>
              <li><Link href="/contact-us">Contact us</Link></li>
              <li><Link href="/privacy-policy">Privacy policy</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-black mb-5">Get in touch</h2>
            <div className="text-sm text-black space-y-2">
              <p>+1-234-567-890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} © <a href="https://prebuiltui.com">PrebuiltUI</a>. All Right Reserved.
      </p>
    </footer>
  )
}