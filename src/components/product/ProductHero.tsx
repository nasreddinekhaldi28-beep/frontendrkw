"use client";
import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatKWD, cn } from "@/lib/utils";
import { trackAddToCart } from "@/lib/pixels";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

const TRUST_GRID = [
  { emoji: "💳", label: "دفع عند الاستلام" },
  { emoji: "🚚", label: "توصيل 1-2 يوم" },
  { emoji: "🛡️", label: "ضمان 30 يوم" },
  { emoji: "🔄", label: "استرجاع مجاني" },
];

export default function ProductHero({ product }: Props) {
  const [selectedOfferIdx, setSelectedOfferIdx] = useState(1);
  const [mainImg, setMainImg] = useState(0);
  const { addItem, openDrawer } = useCartStore();

  const offer = product.offers[selectedOfferIdx];
  const totalReviews = product.reviews.length * 31;

  function handleAddToCart() {
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
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* ── Product Images ── */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-card ring-1 ring-black/5">
              <Image
                src={product.images[mainImg] || product.image}
                alt={product.nameAr}
                fill
                className="object-cover transition-transform duration-[600ms] ease-smooth hover:scale-105"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 start-4 bg-brand-gold text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
              {/* COD badge overlaid on image bottom */}
              <span className="absolute bottom-4 start-4 bg-white/95 backdrop-blur-sm text-brand-blue text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md">
                💳 الدفع عند الاستلام
              </span>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImg(i)}
                    className={cn(
                      "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
                      mainImg === i
                        ? "border-brand-blue ring-2 ring-brand-blue/20 scale-105"
                        : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`صورة ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Buy Box ── */}
          <div className="space-y-5" id="offer-selector">
            {/* Top trust pill row */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
                💳 دفع عند الاستلام
              </span>
              <span className="bg-blue-50 border border-blue-200 text-brand-blue text-[11px] font-bold px-3 py-1.5 rounded-full">
                🚚 توصيل 1-2 يوم
              </span>
              <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
                🛡️ ضمان ذهبي 30 يوم
              </span>
            </div>

            {/* Title + rating */}
            <div>
              <p className="text-brand-gold font-bold text-sm mb-1">{product.taglineAr}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-brand-blue leading-tight">
                {product.nameAr}
              </h1>
              <div className="mt-2.5 flex items-center gap-3 flex-wrap">
                <StarRating rating={4.9} count={totalReviews} size="sm" />
                <span className="text-green-600 text-xs font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  ✓ متوفر الآن
                </span>
              </div>
            </div>

            {/* Offer selector */}
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">اختر العرض المناسب:</p>
              <div className="space-y-2.5">
                {product.offers.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOfferIdx(i)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-start",
                      selectedOfferIdx === i
                        ? "border-brand-blue bg-blue-50 shadow-soft ring-1 ring-brand-blue/10"
                        : "border-gray-200 hover:border-brand-blue/40 hover:bg-blue-50/40 bg-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                          selectedOfferIdx === i
                            ? "border-brand-blue bg-brand-blue"
                            : "border-gray-400"
                        )}
                      >
                        {selectedOfferIdx === i && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 text-sm">{o.label}</span>
                        {o.badge && (
                          <span className="ms-2 text-[11px] bg-brand-gold text-white font-bold px-2 py-0.5 rounded-full">
                            {o.badge}
                          </span>
                        )}
                        {o.savePercent > 0 && (
                          <span className="block text-xs text-green-600 font-medium mt-0.5">
                            وفر {o.savePercent}% — خصم {formatKWD(product.basePrice * o.qty - o.lineTotal)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-extrabold text-brand-blue text-lg">{formatKWD(o.lineTotal)}</p>
                      {o.savePercent > 0 && (
                        <p className="text-xs line-through text-gray-400">
                          {formatKWD(product.basePrice * o.qty)}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scarcity */}
            <p className="text-xs font-bold text-red-500 flex items-center gap-1.5 -mt-1">
              🔥 طلب مرتفع اليوم — اطلب الآن لضمان الحصول عليه
            </p>

            {/* Main CTA — id used by StickyAddToCart IntersectionObserver */}
            <button
              id="main-cta"
              onClick={handleAddToCart}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-5 rounded-xl text-lg shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all"
            >
              🛒 أضف إلى السلة — الدفع عند الاستلام
            </button>

            {/* Trust grid — emoji-only, zero SVG icons */}
            <div className="grid grid-cols-4 gap-2">
              {TRUST_GRID.map(({ emoji, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 bg-gray-50 hover:bg-blue-50/60 rounded-xl p-2.5 text-center transition-colors"
                >
                  <span className="text-xl leading-none">{emoji}</span>
                  <p className="text-[10px] text-gray-600 font-semibold leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
