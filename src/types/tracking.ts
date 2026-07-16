// types/tracking.ts
export type OrderStatus =
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned";

export type ShippingCarrier = "usps" | "ups" | "fedex" | "dhl" | "lasership";

export interface TrackingEvent {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
  icon: string;
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  status: OrderStatus;
  carrier: ShippingCarrier;
  trackingNumber: string;
  trackingUrl: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  timeline: TrackingEvent[];
  packageDetails: PackageDetails;
}

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  price: number;
  variant: string;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export interface PackageDetails {
  weight: string;
  dimensions: string;
  packageType: string;
  signatureRequired: boolean;
  insurance: boolean;
  estimatedDeliveryDate: string;
  estimatedDeliveryTime: string;
}

export interface CarrierInfo {
  id: ShippingCarrier;
  name: string;
  logo: string;
  color: string;
  trackingUrlTemplate: string;
}
