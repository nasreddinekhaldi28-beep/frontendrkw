"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { useCheckoutStore } from "@/lib/checkout-store";
import { formatKWD, buildOrderPayload } from "@/lib/utils";
import { trackPurchase } from "@/lib/pixels";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const OTO_SECONDS = 15;

export default function OTOModal() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { step, formData, otoProduct, otoAccepted, acceptOTO, declineOTO, setSubmitting, purchaseEventId, reset } =
    useCheckoutStore();

  const [timeLeft, setTimeLeft] = useState(OTO_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (step !== "oto") return;
    setTimeLeft(OTO_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitOrder(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  async function handleSubmitOrder(accepted: boolean) {
    if (submittedRef.current) return;
    submittedRef.current = true;
    clearInterval(timerRef.current!);
    setSubmitting();

    if (!formData || !purchaseEventId) return;

    const payload = buildOrderPayload(items, otoProduct, accepted, formData, purchaseEventId);
    const total = payload.total;
    const skus = payload.items.map((i) => i.sku);

    // Fire web purchase pixel immediately (server-side CAPI is triggered by backend)
    trackPurchase(purchaseEventId, total, skus);

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // Store summary in sessionStorage for thank-you page
      sessionStorage.setItem(
        "rk_order",
        JSON.stringify({
          orderNumber: data.order_number,
          name: formData.name,
          total,
          items: payload.items,
          currency: "KWD",
        })
      );
    } catch {
      // Proceed to thank-you even if API fails (order may still be queued)
    }

    clearCart();
    reset();
    submittedRef.current = false;
    router.push("/thank-you");
  }

  function onAccept() {
    acceptOTO();
    handleSubmitOrder(true);
  }

  function onDecline() {
    declineOTO();
    handleSubmitOrder(false);
  }

  if (step !== "oto" || !otoProduct) return null;

  const progressPct = (timeLeft / OTO_SECONDS) * 100;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 drawer-overlay">
      <div
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl max-h-[95dvh] overflow-y-auto shadow-2xl"
        role="dialog"
        aria-label="عرض خاص"
      >
        {/* Urgency header */}
        <div className="bg-gradient-to-l from-orange-500 to-red-500 px-5 py-4 text-white rounded-t-3xl sm:rounded-t-2xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-extrabold">⚠️ انتظر! طلبك قيد التجهيز...</h2>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold tabular-nums">
                {String(timeLeft).padStart(2, "0")}
              </span>
              <span className="text-[10px] opacity-80">ثانية</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-1000"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs mt-2 opacity-90">
            هذا العرض ينتهي بعد {timeLeft} ثانية — لن يتكرر مرة أخرى
          </p>
        </div>

        <div className="px-5 py-5 space-y-5">
          {/* Offer card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 shadow-soft">
            <p className="text-xs font-bold text-brand-blue mb-3 text-center uppercase tracking-wider">
              🎁 عرض لمرة واحدة فقط لتكمل راحتك
            </p>
            <div className="flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-card ring-1 ring-black/5">
                <Image
                  src={otoProduct.image}
                  alt={otoProduct.nameAr}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm leading-tight">{otoProduct.nameAr}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-brand-green">
                    {formatKWD(otoProduct.otoPrice)}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    {formatKWD(otoProduct.originalPrice)}
                  </span>
                </div>
                <span className="inline-block mt-1.5 bg-red-100 text-red-600 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                  خصم 15% — توفر {formatKWD(otoProduct.originalPrice - otoProduct.otoPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Proof */}
          <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-2.5">
            <span className="text-green-500 text-lg">✓</span>
            <p className="text-xs text-green-700 font-medium">
              نفس التوصيل — يُضاف لطلبك الحالي مجاناً
            </p>
          </div>

          {/* CTA buttons */}
          <button
            onClick={onAccept}
            className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold py-4 rounded-xl text-base shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            نعم، أضف العرض لطلبي ← ({formatKWD(otoProduct.otoPrice)})
          </button>

          <button
            onClick={onDecline}
            className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
          >
            لا شكراً، أكمل طلبي الأصلي بدون العرض
          </button>
        </div>
      </div>
    </div>
  );
}
