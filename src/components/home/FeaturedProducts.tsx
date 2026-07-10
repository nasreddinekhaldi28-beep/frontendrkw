"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { products } from "@/lib/products";
import { formatKWD } from "@/lib/utils";
import { trackAddToCart } from "@/lib/pixels";
import StarRating from "@/components/ui/StarRating";

export default function FeaturedProducts() {
  const { addItem, openDrawer } = useCartStore();

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            منتجاتنا
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            ابدأ بالمنتج المناسب لألمك
          </h2>
          <p className="text-gray-500 mt-2">كل منتج يحل مشكلة محددة — اختر ما يناسبك</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.sku}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <Link href={`/products/${p.slug}`} className="block">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.nameAr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.badge && (
                    <span className="absolute top-3 start-3 bg-brand-gold text-white text-xs font-extrabold px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs text-brand-gold font-bold mb-1">{p.taglineAr}</p>
                <Link href={`/products/${p.slug}`}>
                  <h3 className="font-extrabold text-gray-800 hover:text-brand-blue transition-colors leading-tight text-base mb-2">
                    {p.nameAr}
                  </h3>
                </Link>
                <StarRating rating={4.9} count={124} size="sm" />

                {/* Offer highlights */}
                <div className="mt-3 space-y-1.5">
                  {p.offers.slice(0, 2).map((o) => (
                    <div key={o.qty} className="flex justify-between text-xs text-gray-500">
                      <span>{o.label}</span>
                      <span className="font-bold text-gray-700">{formatKWD(o.lineTotal)}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-extrabold text-brand-blue">
                      {formatKWD(p.basePrice)}
                    </p>
                    <p className="text-xs text-gray-400">للقطعة الواحدة</p>
                  </div>
                  <button
                    onClick={() => {
                      addItem({
                        sku: p.sku,
                        nameAr: p.nameAr,
                        image: p.image,
                        quantity: 1,
                        unitPrice: p.basePrice,
                        lineTotal: p.basePrice,
                      });
                      trackAddToCart(p.sku, p.basePrice);
                      openDrawer();
                    }}
                    className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
