import React from "react";
import { Truck, RotateCcw, Wallet, MapPin } from "lucide-react";
import type { productData } from "@/data/product";

type Shipping = (typeof productData)["shipping"];
type ReturnPolicy = (typeof productData)["returnPolicy"];

interface PdpInfoTilesProps {
  shipping: Shipping;
  returnPolicy: ReturnPolicy;
}

export const PdpInfoTiles: React.FC<PdpInfoTilesProps> = ({
  shipping,
  returnPolicy,
}) => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      <InfoTile
        icon={<Truck className="h-4 w-4" />}
        title={
          shipping.freeShipping
            ? "Free shipping"
            : "Shipping calculated at checkout"
        }
        desc={`Estimated delivery in ${shipping.estimatedDelivery}`}
      />
      <InfoTile
        icon={<RotateCcw className="h-4 w-4" />}
        title={`${returnPolicy.days}-day returns`}
        desc={
          returnPolicy.exchange
            ? "Free size exchange included"
            : "Returns accepted"
        }
      />
      {shipping.cashOnDelivery && (
        <InfoTile
          icon={<Wallet className="h-4 w-4" />}
          title="Cash on delivery"
          desc="No extra charge"
        />
      )}
      {shipping.location && (
        <InfoTile
          icon={<MapPin className="h-4 w-4" />}
          title="Ships from"
          desc={shipping.location}
        />
      )}
    </div>
  );
};

function InfoTile({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-[#F0EDE8] bg-white p-3.5 shadow-2xs">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F5F2EE] text-gray-800">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-900">{title}</p>
        <p className="text-[11px] text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
