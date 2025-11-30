// Types pour les produits
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  old_price?: number;
  category: "hommes" | "femmes" | "accessoires";
  sizes: string[];
  colors: string[];
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  created_at: Date;
  updated_at: Date;
}

// Types pour les commandes
export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}

export interface DeliveryAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  user_id: string;
  user_email: string;
  products: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  payment_status?: "pending" | "completed" | "failed";
  delivery_address: DeliveryAddress;
  created_at: Date;
  updated_at: Date;
}

// Types pour les utilisateurs
export type UserRole = "customer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  created_at: Date;
}

// Types pour le panier
export interface CartItem {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}

export interface Cart {
  user_id: string;
  items: CartItem[];
  updated_at: Date;
}

// Types pour les coupons
export interface Coupon {
  code: string;
  discount_percent: number;
  discount_amount?: number;
  min_purchase?: number;
  expiration: Date;
  active: boolean;
  usage_limit?: number;
  used_count: number;
}
