import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { formatKWD } from "@/lib/utils";
import StarRating from "@/components/ui/StarRating";
import CollectionAddToCart from "./CollectionAddToCart";

export const metadata: Metadata = {
  title: "جميع المنتجات | راحة الكويت",
  description: "تصفح جميع منتجات راحة الكويت — أجهزة علاج منزلية احترافية للظهر والأقدام والمفاصل.",
};

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light py-12 text-white text-center">
        <h1 className="text-3xl font-extrabold mb-2">متجرنا الكامل</h1>
        <p className="text-blue-100">علاج احترافي في بيتك — الدفع عند الاستلام</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {["🇰🇼 توصيل 1-2 يوم", "💵 الدفع عند الاستلام", "🛡️ ضمان 30 يوم"].map((b) => (
            <span key={b} className="bg-white/10 ring-1 ring-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full">{b}</span>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p.sku}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <Link href={`/products/${p.slug}`} className="block">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.nameAr}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-[1.07] transition-transform duration-[600ms] ease-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {p.badge && (
                    <span className="absolute top-3 start-3 bg-brand-gold text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                      {p.badge}
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-6">
                <p className="text-xs text-brand-gold font-bold mb-1">{p.taglineAr}</p>
                <Link href={`/products/${p.slug}`}>
                  <h2 className="font-extrabold text-gray-800 hover:text-brand-blue transition-colors text-lg leading-tight mb-2">
                    {p.nameAr}
                  </h2>
                </Link>
                <StarRating rating={4.9} count={124} size="sm" />
                <p className="text-gray-500 text-sm mt-3 leading-relaxed line-clamp-2">
                  {p.descriptionAr}
                </p>

                {/* Offers */}
                <div className="mt-4 space-y-1.5 border-t pt-4">
                  {p.offers.map((o) => (
                    <div key={o.qty} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{o.label}</span>
                      <div className="text-end">
                        <span className="font-bold text-brand-blue">{formatKWD(o.lineTotal)}</span>
                        {o.savePercent > 0 && (
                          <span className="ms-1.5 text-xs text-green-600 font-medium">
                            وفر {o.savePercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-center bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-3 rounded-xl text-sm shadow-soft hover:shadow-card active:scale-95 transition-all"
                  >
                    التفاصيل
                  </Link>
                  <CollectionAddToCart product={p} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
