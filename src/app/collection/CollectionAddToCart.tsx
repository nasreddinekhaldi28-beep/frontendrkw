"use client";
import { useCartStore } from "@/lib/cart-store";
import { trackAddToCart } from "@/lib/pixels";
import type { Product } from "@/types";

export default function CollectionAddToCart({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCartStore();

  return (
    <button
      onClick={() => {
        addItem({
          sku: product.sku,
          nameAr: product.nameAr,
          image: product.image,
          quantity: 1,
          unitPrice: product.basePrice,
          lineTotal: product.basePrice,
        });
        trackAddToCart(product.sku, product.basePrice);
        openDrawer();
      }}
      className="bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 rounded-xl text-sm transition-colors"
    >
      أضف للسلة
    </button>
  );
}
