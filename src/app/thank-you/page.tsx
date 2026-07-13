"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatKWD } from "@/lib/utils";
import { addonProducts } from "@/lib/products";
import { getStoredPurchaseEventId, trackPurchase } from "@/lib/pixels";

interface OrderItem {
  sku: string;
  product_name: string;
  quantity: number;
  line_total: number;
  is_oto_upsell: boolean;
}

interface OrderSummary {
  orderNumber: string;
  name: string;
  phone?: string;
  total: number;
  items: OrderItem[];
  currency: string;
}

const REVIEWS = [
  {
    name: "أبو فهد",
    location: "السالمية",
    text: "المنتج وصل بكرة وكل شي تمام، الموظف اتصل بي بسرعة وكان محترم جداً.",
    rating: 5,
  },
  {
    name: "منيرة العنزي",
    location: "حولي",
    text: "أسرع توصيل شفته. التأكيد جاء خلال دقائق والتوصيل باليوم الثاني.",
    rating: 5,
  },
  {
    name: "خالد المطيري",
    location: "الجهراء",
    text: "ما توقعت الجودة تكون بهالمستوى. يستاهل كل فلس.",
    rating: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="text-brand-gold text-sm">{"★".repeat(n)}</span>
  );
}

function maskPhone(phone: string) {
  if (!phone || phone.length < 6) return phone;
  // show first 3 and last 2, mask middle
  return phone.slice(0, 3) + "●●●●" + phone.slice(-2);
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("rk_order");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as OrderSummary;
        setOrder(parsed);
        sessionStorage.removeItem("rk_order");

        const eventId = getStoredPurchaseEventId();
        if (eventId) {
          trackPurchase(eventId, parsed.total, parsed.items.map((i) => i.sku));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Elapsed timer — shows how long since order (urgency for the call)
  useEffect(() => {
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const minutesAgo = Math.floor(elapsed / 60);
  const secondsDisplay = elapsed % 60;

  // Addons not already purchased
  const orderedSkus = order?.items.map((i) => i.sku) ?? [];
  const suggestedAddons = addonProducts.filter((p) => !orderedSkus.includes(p.sku)).slice(0, 3);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white">
      {/* ── Urgent top banner ── */}
      <div className="bg-gradient-to-l from-orange-500 to-red-500 text-white px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 text-center">
          <span className="text-xl animate-bounce">📞</span>
          <p className="font-extrabold text-sm sm:text-base">
            موظفنا سيتصل بك الآن لتأكيد طلبك — رجاءً اقبل المكالمة من الرقم الكويتي
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-5">

        {/* ── Hero confirmation block ── */}
        <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-7 text-center">
          {/* Animated check */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 ring-4 ring-green-50">
            <span className="text-4xl">✅</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            {order?.name ? `${order.name}، طلبك وصلنا!` : "طلبك وصلنا!"}
          </h1>
          <p className="text-gray-500 text-sm mb-4">
            رقم طلبك:{" "}
            <span className="font-extrabold text-brand-blue">{order?.orderNumber ?? "—"}</span>
          </p>

          {/* Call urgency card */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4 text-center mb-4">
            <p className="text-orange-700 font-extrabold text-base mb-1">
              ⏱ موظفنا سيتصل بك خلال أقل من 10 دقائق
            </p>
            {order?.phone && (
              <p className="text-gray-600 text-sm">
                على رقمك:{" "}
                <span className="font-extrabold text-gray-800 tracking-widest">
                  {maskPhone(order.phone)}
                </span>
              </p>
            )}
            <div className="mt-2 text-xs text-orange-500 font-bold tabular-nums">
              {minutesAgo > 0
                ? `مضى ${minutesAgo} دقيقة و${secondsDisplay} ثانية على طلبك`
                : `مضى ${secondsDisplay} ثانية على طلبك`}
            </div>
          </div>

          {/* What the call means */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 text-right space-y-2">
            <p className="text-brand-blue font-extrabold text-sm mb-2">ماذا يحدث في المكالمة؟</p>
            {[
              "نأكد اسمك وعنوان التوصيل",
              "تقدر تضيف أي منتج آخر لنفس الشحنة مجاناً",
              "نحدد موعد التوصيل المناسب لك",
            ].map((point) => (
              <div key={point} className="flex items-start gap-2">
                <span className="text-brand-green font-extrabold flex-shrink-0">✓</span>
                <p className="text-gray-700 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Order summary ── */}
        {order && (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
            <h2 className="font-extrabold text-gray-800 text-lg mb-4">ملخص طلبك</h2>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex-shrink-0 bg-brand-blue text-white text-xs font-extrabold w-7 h-7 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <p className="text-sm font-bold text-gray-800 leading-snug">{item.product_name}</p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
                    <span className="font-extrabold text-brand-blue text-sm whitespace-nowrap">
                      {formatKWD(item.line_total)}
                    </span>
                    {item.is_oto_upsell && (
                      <span className="text-[10px] bg-brand-gold/20 text-brand-gold font-bold px-2 py-0.5 rounded-full">
                        عرض خاص
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
              <span className="font-extrabold text-gray-800 text-base">الإجمالي</span>
              <span className="font-extrabold text-brand-blue text-xl">{formatKWD(order.total)}</span>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">
              💵 تدفع هذا المبلغ فقط عند استلام الطلب — لا دفع مسبق
            </p>
          </div>
        )}

        {/* ── Delivery excitement ── */}
        <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-3xl p-6 shadow-card">
          <h2 className="font-extrabold text-lg mb-4">🚀 طلبك في طريقه إليك</h2>
          <div className="space-y-4">
            {[
              {
                emoji: "📞",
                step: "الآن",
                title: "مكالمة التأكيد",
                desc: "موظفنا سيتصل بك من رقم كويتي — اقبل المكالمة لنؤكد عنوانك",
              },
              {
                emoji: "📦",
                step: "اليوم",
                title: "تجهيز وتغليف طلبك",
                desc: "نجهز طلبك بعناية وندرجه في قائمة التوصيل",
              },
              {
                emoji: "🚚",
                step: "غداً أو بعده",
                title: "التوصيل لبابك",
                desc: "المندوب يوصل طلبك ويستلم المبلغ — راحة تامة",
              },
            ].map(({ emoji, step, title, desc }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                    {emoji}
                  </div>
                  <span className="text-[10px] font-bold text-blue-200 whitespace-nowrap">{step}</span>
                </div>
                <div>
                  <p className="font-extrabold text-white text-sm">{title}</p>
                  <p className="text-blue-200 text-xs leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Add-ons — mention during the call ── */}
        {suggestedAddons.length > 0 && (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
            <h2 className="font-extrabold text-gray-800 text-lg mb-1">
              أضف لطلبك الآن — بدون توصيل إضافي
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              اذكر هذه المنتجات في مكالمة التأكيد وتُضاف لنفس الشحنة
            </p>
            <div className="space-y-3">
              {suggestedAddons.map((p) => (
                <div
                  key={p.sku}
                  className="flex items-center gap-3 bg-gradient-to-l from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-3"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-black/5">
                    <Image src={p.image} alt={p.nameAr} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2">{p.nameAr}</p>
                    <p className="text-brand-blue font-extrabold text-sm mt-0.5">{formatKWD(p.basePrice)}</p>
                  </div>
                  <span className="flex-shrink-0 text-[10px] bg-green-600 text-white font-bold px-2.5 py-1.5 rounded-xl text-center leading-tight">
                    اذكره<br />بالمكالمة
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Social proof ── */}
        <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
          <h2 className="font-extrabold text-gray-800 text-lg mb-1">
            أنت في أيدٍ أمينة
          </h2>
          <p className="text-gray-500 text-sm mb-4">+2,400 عميل كويتي وثق بنا</p>
          <div className="space-y-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-blue text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 leading-none">{r.name}</p>
                      <p className="text-[11px] text-gray-400">{r.location}</p>
                    </div>
                  </div>
                  <Stars n={r.rating} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Guarantee reassurance ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-start gap-4">
          <span className="text-3xl flex-shrink-0">🛡️</span>
          <div>
            <p className="font-extrabold text-gray-800 text-base">ضمان استرجاع 30 يوم — بدون أسئلة</p>
            <p className="text-gray-600 text-sm mt-1 leading-relaxed">
              إذا ما أعجبك المنتج لأي سبب خلال 30 يوم من الاستلام، نرجع لك فلوسك كاملة. طلبك في أمان تام.
            </p>
          </div>
        </div>

        {/* ── Browse more ── */}
        <div className="text-center pb-6">
          <p className="text-gray-500 text-sm mb-3">تبي تطلب هدية لأحد قريب؟</p>
          <Link
            href="/collection"
            className="inline-block bg-brand-blue hover:bg-brand-blue-dark text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            تصفح المنتجات ←
          </Link>
        </div>
      </div>
    </div>
  );
}
