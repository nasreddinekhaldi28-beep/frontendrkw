import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CreateOrderPayload, CartItem, OTOProduct } from "@/types";
import { productsBySku } from "./products";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKWD(amount: number): string {
  return `${amount.toFixed(3)} د.ك`;
}

export function buildOrderPayload(
  cartItems: CartItem[],
  otoProduct: OTOProduct | null,
  otoAccepted: boolean,
  formData: { name: string; phone: string },
  purchaseEventId: string
): CreateOrderPayload {
  const orderItems = cartItems.map((item) => ({
    sku: item.sku,
    product_name: item.nameAr,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    line_total: item.lineTotal,
    is_oto_upsell: false,
  }));

  if (otoAccepted && otoProduct) {
    const p = productsBySku[otoProduct.sku];
    orderItems.push({
      sku: otoProduct.sku,
      product_name: otoProduct.nameAr,
      quantity: 1,
      unit_price: otoProduct.otoPrice,
      line_total: otoProduct.otoPrice,
      is_oto_upsell: true,
    });
  }

  const subtotal = orderItems.reduce((s, i) => s + i.line_total, 0);
  const originalTotal = cartItems.reduce((s, i) => s + i.lineTotal, 0);
  const discountTotal = otoAccepted && otoProduct
    ? otoProduct.originalPrice - otoProduct.otoPrice
    : 0;

  return {
    customer_name: formData.name,
    customer_phone: formData.phone,
    items: orderItems,
    subtotal: parseFloat(subtotal.toFixed(3)),
    discount_total: parseFloat(discountTotal.toFixed(3)),
    total: parseFloat(subtotal.toFixed(3)),
    currency: "KWD",
    purchase_event_id: purchaseEventId,
    client_user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };
}
