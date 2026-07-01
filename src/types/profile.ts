export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export interface Review {
  id: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  status: "published" | "pending";
}

export interface NotificationPreference {
  email: boolean;
  push: boolean;
  sms: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
}

export interface RetailProfile {
  type: "retail";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  joinDate: string;
  totalOrders: number;
  addresses: Address[];
  orders: Order[];
  wallet: {
    balance: number;
    transactions: WalletTransaction[];
  };
  reviews: Review[];
  notifications: NotificationPreference;
}

export interface WholesaleProfile {
  type: "wholesale";
  businessName: string;
  tradeLicenseNumber: string;
  taxId: string;
  contactName: string;
  email: string;
  phone: string;
  avatar?: string;
  joinDate: string;
  creditLimit: number;
  creditUsed: number;
  pendingInvoices: {
    count: number;
    totalDue: number;
  };
  bulkOrders: Order[];
  addresses: Address[];
  wallet: {
    balance: number;
    transactions: WalletTransaction[];
  };
  notifications: NotificationPreference;
}

export type UserProfile = RetailProfile | WholesaleProfile;
