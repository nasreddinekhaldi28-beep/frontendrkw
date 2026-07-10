"use client";
import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatKWD, cn } from "@/lib/utils";
import { trackAddToCart } from "@/lib/pixels";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductHero({ product }: Props) {
  const [selectedOfferIdx, setSelectedOfferIdx] = useState(1); // default to 2 pieces (best value)
  const [mainImg, setMainImg] = useState(0);
  const { addItem, openDrawer } = useCartStore();

  const offer = product.offers[selectedOfferIdx];
  const totalReviews = product.reviews.length * 31; // simulated count

  function handleAddToCart() {
    addItem({
      sku: product.sku,
      nameAr: product.nameAr,
      image: product.image,
      quantity: offer.qty,
      unitPrice: offer.lineTotal / offer.qty,
      lineTotal: offer.lineTotal,
    });
    trackAddToCart(product.sku, offer.lineTotal);
    openDrawer();
  }

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src={product.images[mainImg] || product.image}
                alt={product.nameAr}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 start-4 bg-brand-gold text-white text-xs font-extrabold px-3 py-1.5 rounded-full">
                  {product.badge}
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImg(i)}
                    className={cn(
                      "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
                      mainImg === i ? "border-brand-blue" : "border-gray-200 hover:border-gray-400"
                    )}
                  >
                    <Image src={img} alt={`صورة ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy box */}
          <div className="space-y-5">
            {/* Title + rating */}
            <div>
              <p className="text-brand-gold font-bold text-sm mb-1">{product.taglineAr}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-brand-blue leading-tight">
                {product.nameAr}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <StarRating rating={4.9} count={totalReviews} size="sm" />
                <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
                  ✓ متوفر
                </span>
              </div>
            </div>

            {/* Volume offer selector */}
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
                        ? "border-brand-blue bg-blue-50 shadow-sm"
                        : "border-gray-200 hover:border-gray-400 bg-white"
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
                            وفر {o.savePercent}% — خصم {formatKWD((product.basePrice * o.qty) - o.lineTotal)}
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

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-5 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
            >
              🛒 أضف إلى السلة — الدفع عند الاستلام
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, text: "توصيل 1-2 يوم" },
                { icon: ShieldCheck, text: "ضمان 7 أيام" },
                { icon: RefreshCw, text: "استرجاع مجاني" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-3 text-center">
                  <Icon className="w-5 h-5 text-brand-blue" />
                  <p className="text-[11px] text-gray-600 font-medium leading-tight">{text}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed border-t pt-4">
              {product.descriptionAr}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
