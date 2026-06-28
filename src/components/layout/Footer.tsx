import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-6">
          {/* Brand Section */}
          <div className="space-y-4">
            {/* Replace src with your logo */}
            <Image
              src="https://divandione.com/_next/static/media/brand.0etw48jrlgwbv.svg"
              alt="Brand Logo"
              width={150}
              height={40}
              className="object-contain"
            />
            <p className="text-sm text-gray-400">
              Discover luxury and timeless elegance with our curated collection.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <h1 className="hover:text-white transition">Home</h1>
                </Link>
              </li>
              <li>
                <Link href="/about-us">
                  <h1 className="hover:text-white transition">About Us</h1>
                </Link>
              </li>
              <li>
                <Link href="/contact-us">
                  <h1 className="hover:text-white transition">Contact Us</h1>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <h1 className="hover:text-white transition">
                    Privacy Policy
                  </h1>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <h1 className="hover:text-white transition">
                    Terms of Service
                  </h1>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Get in touch
            </h3>
            <p className="text-sm">+1-234-567-890</p>
            <p className="text-sm">contact@example.com</p>
            <div className="flex space-x-4 mt-4">
              {/* Twitter */}
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M22.46 6c-.77.35-1.5.58-2.28.69a4.08 4.08 0 001.77-2.27 8.18 8.18 0 01-2.6.98 4.07 4.07 0 00-6.94 3.71 11.55 11.55 0 01-8.4-4.25 4.07 4.07 0 001.26 5.44c-.66-.02-1.28-.2-1.82-.5v.05a4.07 4.07 0 003.26 3.98c-.3.08-.62.12-.95.12-.23 0-.45-.02-.66-.07a4.07 4.07 0 003.8 2.83A8.16 8.16 0 012 19.54a11.5 11.5 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.68 0-.18-.01-.35-.02-.53A8.34 8.34 0 0024 5.56a8.19 8.19 0 01-2.34.64 4.07 4.07 0 001.78-2.24z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 2.2c3.2 0 3.6.01 4.9.07 1.2.06 1.9.26 2.3.43a4.6 4.6 0 011.7 1.1 4.6 4.6 0 011.1 1.7c.17.4.37 1.1.43 2.3.06 1.3.07 1.7.07 4.9s-.01 3.6-.07 4.9c-.06 1.2-.26 1.9-.43 2.3a4.6 4.6 0 01-1.1 1.7 4.6 4.6 0 01-1.7 1.1c-.4.17-1.1.37-2.3.43-1.3.06-1.7.07-4.9.07s-3.6-.01-4.9-.07c-1.2-.06-1.9-.26-2.3-.43a4.6 4.6 0 01-1.7-1.1 4.6 4.6 0 01-1.1-1.7c-.17-.4-.37-1.1-.43-2.3C2.21 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.9c.06-1.2.26-1.9.43-2.3a4.6 4.6 0 011.1-1.7 4.6 4.6 0 011.7-1.1c.4-.17 1.1-.37 2.3-.43C8.4 2.21 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3.01 7 .07 5.7.13 4.7.34 3.9.66a6.9 6.9 0 00-2.5 1.6A6.9 6.9 0 00.66 4.8c-.32.8-.53 1.8-.59 3.1C0 8.3 0 8.7 0 12s.01 3.7.07 5c.06 1.3.27 2.3.59 3.1a6.9 6.9 0 001.6 2.5 6.9 6.9 0 002.5 1.6c.8.32 1.8.53 3.1.59 1.3.06 1.7.07 5 .07s3.7-.01 5-.07c1.3-.06 2.3-.27 3.1-.59a6.9 6.9 0 002.5-1.6 6.9 6.9 0 001.6-2.5c.32-.8.53-1.8.59-3.1.06-1.3.07-1.7.07-5s-.01-3.7-.07-5c-.06-1.3-.27-2.3-.59-3.1a6.9 6.9 0 00-1.6-2.5 6.9 6.9 0 00-2.5-1.6c-.8-.32-1.8-.53-3.1-.59C15.7.01 15.3 0 12 0z" />
                  <path d="M12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zM18.4 4.6a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Your Brand. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
