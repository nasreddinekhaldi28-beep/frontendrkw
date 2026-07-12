"use client";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { productsBySku } from "@/lib/products";
import { formatKWD } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { removeItem, updateQuantity } = useCartStore();
  const product = productsBySku[item.sku];

  // Get the correct unit price for a given quantity from the product's offer tiers.
  // Falls back to item's current unitPrice if product not found (e.g. OTO items).
  function getUnitPrice(qty: number): number {
    if (!product) return item.unitPrice;
    const tier = product.offers.find((o) => o.qty === qty);
    return tier ? tier.unitPrice : product.basePrice;
  }

  function decrement() {
    if (item.quantity <= 1) {
      removeItem(item.sku);
    } else {
      const newQty = item.quantity - 1;
      updateQuantity(item.sku, newQty, getUnitPrice(newQty));
    }
  }

  function increment() {
    const maxQty = product ? Math.max(...product.offers.map((o) => o.qty)) : 3;
    if (item.quantity >= maxQty) return;
    const newQty = item.quantity + 1;
    updateQuantity(item.sku, newQty, getUnitPrice(newQty));
  }

  const product_max = product ? Math.max(...product.offers.map((o) => o.qty)) : 3;
  const isOTO = item.isOTO;

  return (
    <div className="flex gap-3 bg-white rounded-xl p-3 shadow-soft border border-gray-100 hover:border-gray-200 transition-colors">
      {/* Image */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={item.image} alt={item.nameAr} fill className="object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 leading-tight truncate">{item.nameAr}</p>

        {isOTO ? (
          /* OTO items have fixed qty=1, no stepper */
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[10px] bg-brand-gold/20 text-brand-gold font-bold px-2 py-0.5 rounded-full">
              عرض خاص
            </span>
            <span className="text-xs text-gray-400">× 1</span>
          </div>
        ) : (
          /* Quantity stepper */
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={decrement}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors active:scale-90"
              aria-label="تقليل"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="w-6 text-center text-sm font-extrabold text-gray-800 tabular-nums">
              {item.quantity}
            </span>

            <button
              onClick={increment}
              disabled={item.quantity >= product_max}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-brand-blue/10 hover:text-brand-blue flex items-center justify-center transition-colors active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="زيادة"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Discount badge when qty > 1 */}
            {item.quantity > 1 && product && (
              <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">
                {product.offers.find((o) => o.qty === item.quantity)?.savePercent ?? 0}% خصم
              </span>
            )}
          </div>
        )}

        <p className="text-brand-blue font-extrabold text-sm mt-1.5">{formatKWD(item.lineTotal)}</p>

        {/* One-tap upgrade to the 2-piece tier — main AOV lever */}
        {!isOTO && item.quantity === 1 && product && (() => {
          const tier2 = product.offers.find((o) => o.qty === 2);
          if (!tier2 || tier2.savePercent <= 0) return null;
          return (
            <button
              onClick={() => updateQuantity(item.sku, 2, tier2.unitPrice)}
              className="mt-2 w-full text-start bg-gradient-to-l from-green-50 to-emerald-50 border border-green-200 hover:border-green-400 rounded-lg px-2.5 py-1.5 transition-colors"
            >
              <span className="text-[11px] font-bold text-green-700 leading-tight block">
                ⚡ أضف قطعة ثانية بخصم {tier2.savePercent}% — وفر {formatKWD(product.basePrice * 2 - tier2.lineTotal)}
              </span>
            </button>
          );
        })()}
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.sku)}
        className="self-start p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="حذف"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
