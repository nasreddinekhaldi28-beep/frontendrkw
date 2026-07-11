// ─── Products ─────────────────────────────────────────────────────────────────

export interface OfferTier {
  qty: number;
  label: string;
  unitPrice: number;
  lineTotal: number;
  savePercent: number;
  badge?: string;
}

export interface Product {
  sku: string;
  slug: string;
  nameAr: string;
  taglineAr: string;
  descriptionAr: string;
  image: string;
  images: string[];
  basePrice: number;
  otoPrice: number; // 15% off base
  offers: OfferTier[];
  category: string;
  painPoints: string[];    // checkmark list for Pain Mirror
  benefits: string[];      // feature -> benefit list
  mechanism: MechanismStep[];
  reviews: Review[];
  faqs: FAQ[];
  badge?: string;
  role?: "hero" | "addon"; // hero = ad destination / featured; addon = cross-sell & upsell
}

export interface MechanismStep {
  icon: string;
  titleAr: string;
  descAr: string;
}

export interface Review {
  nameAr: string;
  locationAr: string;
  rating: number;
  textAr: string;
  date: string;
}

export interface FAQ {
  questionAr: string;
  answerAr: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  sku: string;
  nameAr: string;
  image: string;
  quantity: number;     // number of units (1, 2, or 3)
  unitPrice: number;    // per-unit price AFTER tier discount
  lineTotal: number;    // unitPrice × quantity
  isOTO?: boolean;
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export type CheckoutStep = "idle" | "checkout" | "oto" | "submitting";

export interface CheckoutFormData {
  name: string;
  phone: string;
}

export interface OTOProduct {
  sku: string;
  nameAr: string;
  image: string;
  originalPrice: number;
  otoPrice: number;
}

// ─── Order API ────────────────────────────────────────────────────────────────

export interface OrderItemPayload {
  sku: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  is_oto_upsell: boolean;
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_phone: string;
  items: OrderItemPayload[];
  subtotal: number;
  discount_total: number;
  total: number;
  currency: string;
  purchase_event_id: string;
  client_user_agent: string;
}

export interface OrderResponse {
  order_number: string;
  customer_name: string;
  total: number;
  currency: string;
  status: string;
  items: OrderItemPayload[];
}

// ─── Pixels ───────────────────────────────────────────────────────────────────

export interface CAPIEventPayload {
  event_name: string;
  event_id: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
  page_url?: string;
  client_user_agent?: string;
}
