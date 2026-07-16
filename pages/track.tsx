import TrackPage from "@/components/tracking/TrackPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | Divan Dione Smoke Shop",
  description:
    "Track your Divan Dione Smoke Shop order in real-time. Enter your order number or tracking ID to check delivery status.",
  openGraph: {
    title: "Track Your Order | Divan Dione Smoke Shop",
    description:
      "Real-time order tracking for your premium hookah and smoking accessories.",
  },
};

export default function Page() {
  return <TrackPage />;
}
