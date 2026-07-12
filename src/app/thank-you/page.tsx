"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Truck, Package } from "lucide-react";
import { formatKWD } from "@/lib/utils";
import { addonProducts } from "@/lib/products";
import { getStoredPurchaseEventId, trackPurchase } from "@/lib/pixels";

interface OrderSummary {
  orderNumber: string;
  name: string;
  total: number;
  items: Array<{ sku: string; product_name: string; quantity: number; line_total: number; is_oto_upsell: boolean }>;
  currency: string;
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("rk_order");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as OrderSummary;
        setOrder(parsed);
        sessionStorage.removeItem("rk_order");

        // Fire purchase pixel on page load (once)
        const eventId = getStoredPurchaseEventId();
        if (eventId) {
          trackPurchase(eventId, parsed.total, parsed.items.map((i) => i.sku));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-5 shadow-cta ring-4 ring-green-50 animate-pop-in">
            <CheckCircle2 className="w-14 h-14 text-brand-green" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            تم استلام طلبك! 🎉
          </h1>
          <p className="text-gray-500 text-base">
            {order?.name ? `شكراً ${order.name}` : "شكراً لثقتك بنا"} — سنتواصل معك قريباً
          </p>
          {order?.orderNumber && (
            <div className="mt-3 inline-block bg-gray-100 px-4 py-2 rounded-xl">
              <span className="text-sm font-bold text-gray-600">رقم الطلب: </span>
              <span className="text-brand-blue font-extrabold">{order.orderNumber}</span>
            </div>
          )}
        </div>

        {/* Delivery timeline */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
          <h2 className="font-extrabold text-gray-800 mb-5 text-lg">ماذا سيحدث بعد ذلك؟</h2>
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                color: "bg-blue-50 text-brand-blue",
                title: "مكالمة التأكيد",
                desc: "سنتصل بك خلال 24 ساعة لتأكيد طلبك وتحديد موعد التوصيل.",
                step: "١",
              },
              {
                icon: Package,
                color: "bg-amber-50 text-brand-gold",
                title: "تجهيز الطلب",
                desc: "نجهز طلبك بعناية ونوثقه للتأكد من وصوله بأفضل حالة.",
                step: "٢",
              },
              {
                icon: Truck,
                color: "bg-green-50 text-brand-green",
                title: "التوصيل خلال 1-2 يوم",
                desc: "يصلك الطلب لباب بيتك. الدفع عند الاستلام — لا دفع مسبق.",
                step: "٣",
              },
            ].map(({ icon: Icon, color, title, desc, step }) => (
              <div key={step} className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        {order && (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
            <h2 className="font-extrabold text-gray-800 mb-4">ملخص طلبك</h2>
            <div className="space-y-2 divide-y divide-gray-50">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.product_name}</p>
                    <p className="text-xs text-gray-400">{item.quantity} قطعة</p>
                    {item.is_oto_upsell && (
                      <span className="text-[10px] bg-brand-gold/20 text-brand-gold font-bold px-2 py-0.5 rounded-full">
                        عرض خاص
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-brand-blue">{formatKWD(item.line_total)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-extrabold text-base">
              <span>الإجمالي</span>
              <span className="text-brand-blue">{formatKWD(order.total)}</span>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">💵 الدفع عند استلام الطلب</p>
          </div>
        )}

        {/* CRO confirmation message */}
        <div className="bg-gradient-to-l from-brand-blue-dark to-brand-blue text-white rounded-2xl p-6 mb-6 text-center shadow-card">
          <p className="text-xl font-extrabold mb-2">طلبك في أمان تام ✅</p>
          <p className="text-blue-100 text-sm leading-relaxed">
            لا تقلق — لا دفع إلا عند الاستلام. وإذا ما عجبك المنتج خلال 30 يوم، نرجع لك فلوسك كاملة بدون أسئلة.
          </p>
        </div>

        {/* Post-purchase cross-sell — add during confirmation call (zero extra fulfillment) */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
          <h2 className="font-extrabold text-gray-800 text-lg mb-1">أكمل راحتك — بدون رسوم توصيل إضافية</h2>
          <p className="text-gray-500 text-sm mb-5">
            تبي تضيف منتج لطلبك؟ <strong className="text-brand-blue">اذكره في مكالمة التأكيد</strong> ويُضاف لنفس الشحنة قبل التغليف.
          </p>
          <div className="space-y-3">
            {addonProducts.slice(0, 3).map((p) => (
              <div key={p.sku} className="flex items-center gap-3 bg-blue-50/60 rounded-xl p-3 ring-1 ring-brand-blue/5">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={p.image} alt={p.nameAr} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 leading-tight truncate">{p.nameAr}</p>
                  <p className="text-brand-blue font-extrabold text-sm mt-0.5">{formatKWD(p.basePrice)}</p>
                </div>
                <span className="flex-shrink-0 text-[10px] bg-brand-gold/15 text-brand-gold font-bold px-2 py-1 rounded-full">
                  اذكره بالمكالمة
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">تريد إضافة منتج آخر؟ طلب جديد بنفس السهولة</p>
          <Link
            href="/collection"
            className="inline-block bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-3 rounded-xl shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            تصفح منتجات أخرى ←
          </Link>
        </div>
      </div>
    </div>
  );
}
