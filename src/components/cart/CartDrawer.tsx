"use client";
import { X, ShoppingBag, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useCheckoutStore } from "@/lib/checkout-store";
import { getCrossSells } from "@/lib/products";
import { formatKWD, cn } from "@/lib/utils";
import { trackInitiateCheckout } from "@/lib/pixels";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, subtotal, addItem, openDrawer } = useCartStore();
  const { openCheckout } = useCheckoutStore();

  const sub = subtotal();
  const cartSkus = items.map((i) => i.sku);

  // Cross-sells: cheap different-problem add-ons first, capped for a clean drawer
  const crossSells = getCrossSells(cartSkus, 3);

  function handleCheckout() {
    trackInitiateCheckout(sub, cartSkus);
    closeDrawer();
    openCheckout();
  }

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 drawer-overlay"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Panel — slides from right (end side in RTL) */}
      <div
        className="fixed top-0 end-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl drawer-panel"
        role="dialog"
        aria-label="سلة التسوق"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-l from-brand-blue-dark to-brand-blue text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="font-bold text-base">سلة التسوق</h2>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
            <p className="text-gray-500 font-medium mb-4">سلتك فارغة</p>
            <Link
              href="/collection"
              onClick={closeDrawer}
              className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue-light shadow-soft hover:shadow-card active:scale-95 transition-all"
            >
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <>
            {/* Line items */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-5 py-4 space-y-3">
                {items.map((item) => (
                  <CartItem key={item.sku} item={item} />
                ))}
              </div>

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div className="px-5 pb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    🎁 أكمل راحتك — نفس التوصيل
                  </p>
                  <div className="space-y-2">
                    {crossSells.map((p) => (
                      <div
                        key={p.sku}
                        className="flex items-center gap-3 bg-blue-50 rounded-xl p-3 ring-1 ring-brand-blue/5 hover:ring-brand-blue/20 transition-all"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={p.image} alt={p.nameAr} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{p.nameAr}</p>
                          <p className="text-brand-blue font-extrabold text-sm mt-0.5">
                            {formatKWD(p.basePrice)}
                          </p>
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
                          }}
                          className="flex-shrink-0 bg-brand-blue text-white rounded-lg p-2 hover:bg-brand-blue-light shadow-soft active:scale-90 transition-all"
                          aria-label={`أضف ${p.nameAr}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 px-5 py-5 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span className="text-gray-700">الإجمالي</span>
                <span className="text-brand-blue">{formatKWD(sub)}</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-500 justify-center">
                <span>💵 الدفع عند الاستلام</span>
                <span>·</span>
                <span>🇰🇼 توصيل 1-2 يوم</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-xl text-base shadow-cta hover:shadow-cta-hover active:scale-[0.99] transition-all"
              >
                إتمام الطلب ←
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
