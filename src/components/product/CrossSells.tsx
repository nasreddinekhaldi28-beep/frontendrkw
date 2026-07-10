"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { products } from "@/lib/products";
import { formatKWD } from "@/lib/utils";
import { trackAddToCart } from "@/lib/pixels";
import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";

export default function CrossSells({ currentProduct }: { currentProduct: Product }) {
  const { addItem, openDrawer } = useCartStore();
  const others = products.filter((p) => p.sku !== currentProduct.sku);

  function handleAdd(p: Product) {
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
  }

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            أكمل راحتك
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-3">
            عملاؤنا يشترون هذا معه أيضاً
          </h2>
          <p className="text-gray-500 mt-2">نفس التوصيل — وفر وقتك</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {others.map((p) => (
            <div
              key={p.sku}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all"
            >
              <Link href={`/products/${p.slug}`} className="block">
                <div className="relative aspect-[3/2]">
                  <Image src={p.image} alt={p.nameAr} fill className="object-cover" />
                  {p.badge && (
                    <span className="absolute top-3 start-3 bg-brand-gold text-white text-xs font-bold px-2 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-5">
                <Link href={`/products/${p.slug}`}>
                  <h3 className="font-bold text-gray-800 hover:text-brand-blue transition-colors leading-tight">
                    {p.nameAr}
                  </h3>
                </Link>
                <div className="mt-1.5">
                  <StarRating rating={4.9} size="sm" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-brand-blue">{formatKWD(p.basePrice)}</span>
                  <button
                    onClick={() => handleAdd(p)}
                    className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
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
