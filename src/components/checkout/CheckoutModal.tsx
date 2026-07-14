"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, ShieldCheck, Truck, Clock } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useCheckoutStore } from "@/lib/checkout-store";
import { getOTOProduct, productsBySku } from "@/lib/products";
import { formatKWD } from "@/lib/utils";
import { generatePurchaseEventId, trackLead } from "@/lib/pixels";
import type { OTOProduct } from "@/types";

const schema = z.object({
  name: z.string().min(2, "الاسم قصير جداً").max(100),
  phone: z.string().regex(/^0\d{8}$/, "يجب أن يبدأ بـ 0 ويتكون من 9 أرقام"),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutModal() {
  const { items, subtotal } = useCartStore();
  const { step, openCheckout, closeCheckout, submitForm } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (step !== "checkout") return null;

  const sub = subtotal();
  const cartSkus = items.map((i) => i.sku);

  const totalSavings = items.reduce((sum, i) => {
    const p = productsBySku[i.sku];
    if (!p) return sum;
    return sum + Math.max(0, p.basePrice * i.quantity - i.lineTotal);
  }, 0);

  // Determine OTO product
  const otp = getOTOProduct(cartSkus);
  const otoProduct: OTOProduct | null = otp
    ? { sku: otp.sku, nameAr: otp.nameAr, image: otp.image, originalPrice: otp.basePrice, otoPrice: otp.otoPrice }
    : null;

  function onSubmit(data: FormValues) {
    const eventId = generatePurchaseEventId();
    trackLead({ name: data.name, phone: data.phone });
    submitForm(data, otoProduct, eventId);
    reset();
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 drawer-overlay">
        <div
          className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl max-h-[95dvh] overflow-y-auto shadow-2xl"
          role="dialog"
          aria-label="إتمام الطلب"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between rounded-t-3xl sm:rounded-t-2xl">
            <h2 className="text-lg font-extrabold text-brand-blue">تأكيد طلبك 🛍️</h2>
            <button
              onClick={closeCheckout}
              className="p-1.5 rounded-full hover:bg-gray-100"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-5 space-y-5">
            {/* Scarcity banner */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 text-center">
              <p className="text-sm font-bold text-orange-700">
                🔥 14 شخص يكمل طلبه الآن — الكميات محدودة اليوم
              </p>
            </div>

            {/* Order summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                ملخص الطلب
              </p>
              {items.map((item) => (
                <div key={item.sku} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 truncate ms-2">
                    {item.quantity}× {item.nameAr}
                  </span>
                  <span className="font-bold text-brand-blue flex-shrink-0">
                    {formatKWD(item.lineTotal)}
                  </span>
                </div>
              ))}
              {totalSavings > 0.009 && (
                <div className="flex justify-between items-center text-xs font-bold text-green-700">
                  <span>🎉 توفيرك من العروض</span>
                  <span>−{formatKWD(totalSavings)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-extrabold text-base">
                <span>الإجمالي</span>
                <span className="text-brand-blue">{formatKWD(sub)}</span>
              </div>
              <p className="text-center text-[11px] text-gray-400 pt-0.5">
                🚚 التوصيل مجاني — تدفع هذا المبلغ فقط عند الاستلام
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, label: "توصيل 1-2 يوم" },
                { icon: ShieldCheck, label: "ضمان 30 يوم" },
                { icon: Clock, label: "الدفع عند الاستلام" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 bg-blue-50 rounded-xl p-2 ring-1 ring-brand-blue/5">
                  <Icon className="w-5 h-5 text-brand-blue" />
                  <p className="text-[11px] text-gray-600 text-center leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="محمد أحمد العازمي"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent hover:border-gray-400 transition-all"
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  dir="ltr"
                  placeholder="065432198"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent hover:border-gray-400 transition-all"
                  autoComplete="tel"
                  maxLength={9}
                />
                <p className="text-gray-400 text-xs mt-1">
                  مثال: 065432198 — يجب أن يبدأ بـ 0 ويتكون من 9 أرقام
                </p>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Social proof */}
              <div className="bg-green-50 rounded-xl px-4 py-3 text-center">
                <p className="text-xs text-green-700 font-medium">
                  ⭐ انضم لـ 2,400+ عميل كويتي يثقون في راحة الكويت
                </p>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white font-extrabold py-4 rounded-xl text-lg shadow-cta hover:shadow-cta-hover active:scale-[0.99] transition-all"
              >
                {isSubmitting ? "جاري التحقق..." : "تأكيد الطلب — الدفع عند الاستلام 💵"}
              </button>

              <p className="text-center text-xs text-gray-400">
                بالضغط على الزر، أنت توافق على شروط الخدمة وسياسة الخصوصية.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
