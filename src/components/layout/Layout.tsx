"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { ProfileProvider } from "@/contexts/ProfileContext";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = "Your Store",
  description = "Your e-commerce store description",
}: LayoutProps) {
  return (
    <>
      <Meta title={title} description={description} />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProfileProvider>
          <Header />
          <main className="py-[70px] md:pt-[20px]">{children}</main>
          <Footer />
        </ProfileProvider>
      </div>
    </>
  );
}
