"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatKWD, cn } from "@/lib/utils";
import { trackAddToCart } from "@/lib/pixels";
import type { Product } from "@/types";

export default function StickyAddToCart({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const { addItem, openDrawer } = useCartStore();

  // Default to best-value offer (index 1) — same default as ProductHero
  const offer = product.offers[1] ?? product.offers[0];

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
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Product thumbnail */}
        <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-black/5">
          <Image src={product.image} alt={product.nameAr} fill className="object-cover" />
        </div>

        {/* Product info */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 text-xs leading-tight truncate">{product.nameAr}</p>
          <p className="text-brand-blue font-extrabold text-base leading-tight">
            {formatKWD(offer.lineTotal)}
            {offer.savePercent > 0 && (
              <span className="ms-1.5 text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">
                {offer.savePercent}% خصم
              </span>
            )}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          className="flex-shrink-0 bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-5 py-3 rounded-xl text-sm shadow-cta active:scale-95 transition-all whitespace-nowrap"
        >
          🛒 اطلب الآن
        </button>
      </div>
    </div>
  );
}
