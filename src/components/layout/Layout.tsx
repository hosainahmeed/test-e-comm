"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

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
        <Header />
        <main style={{ flex: 1, paddingTop: "75px" }}>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
