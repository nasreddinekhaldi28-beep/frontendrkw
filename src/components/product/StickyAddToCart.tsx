"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatKWD, cn } from "@/lib/utils";
import { trackAddToCart } from "@/lib/pixels";
import type { Product } from "@/types";

export default function StickyAddToCart({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1); // default to one piece
  const { addItem, openDrawer } = useCartStore();

  const maxQty = Math.max(...product.offers.map((o) => o.qty));

  // Pick the offer tier matching the chosen quantity (for tier discount pricing)
  const offer =
    product.offers.find((o) => o.qty === qty) ?? product.offers[0];

  useEffect(() => {
    const cta = document.getElementById("main-cta");
    if (!cta) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(cta);
    return () => obs.disconnect();
  }, []);

  function handleAdd() {
    addItem({
      sku: product.sku,
      nameAr: product.nameAr,
      image: product.image,
      quantity: offer.qty,
      unitPrice: offer.unitPrice,
      lineTotal: offer.lineTotal,
    });
    trackAddToCart(product.sku, offer.lineTotal);
    openDrawer();
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 inset-x-0 z-40 bg-white/96 backdrop-blur-md border-t border-gray-200",
        "shadow-[0_-8px_32px_-8px_rgba(30,58,138,0.22)] transition-transform duration-300 ease-smooth",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 sm:gap-3">
        {/* Product thumbnail — hidden on very small screens to make room */}
        <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-black/5 hidden sm:block">
          <Image src={product.image} alt={product.nameAr} fill className="object-cover" />
        </div>

        {/* Price */}
        <div className="min-w-0">
          <p className="text-brand-blue font-extrabold text-base leading-tight whitespace-nowrap">
            {formatKWD(offer.lineTotal)}
          </p>
          {offer.savePercent > 0 && (
            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">
              {offer.savePercent}% خصم
            </span>
          )}
        </div>

        {/* Quantity chooser */}
        <div className="flex items-center gap-1.5 flex-shrink-0 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="w-7 h-7 rounded-lg bg-white shadow-soft flex items-center justify-center active:scale-90 transition-all disabled:opacity-30"
            aria-label="تقليل"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-5 text-center text-sm font-extrabold text-gray-800 tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
            disabled={qty >= maxQty}
            className="w-7 h-7 rounded-lg bg-white shadow-soft flex items-center justify-center active:scale-90 transition-all disabled:opacity-30"
            aria-label="زيادة"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          className="flex-1 sm:flex-initial bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-4 sm:px-5 py-3 rounded-xl text-sm shadow-cta active:scale-95 transition-all whitespace-nowrap"
        >
          🛒 اطلب الآن
        </button>
      </div>
    </div>
  );
}
