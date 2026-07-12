import type { Product } from "@/types";

const STEPS = [
  {
    period: "اليوم الأول",
    icon: "⚡",
    title: "تشعر بالفرق فوراً",
    desc: "من أول جلسة تحس بالدفء وتخف حدة الألم — حتى بعد 15 دقيقة استخدام.",
    bg: "bg-brand-blue",
  },
  {
    period: "الأسبوع الأول",
    icon: "📈",
    title: "تحسن ملحوظ",
    desc: "بعد 5-7 جلسات تلاحظ تقليل واضح في التورم والتيبّس وقدرة أكبر على الحركة.",
    bg: "bg-brand-green",
  },
  {
    period: "الشهر الأول",
    icon: "🏆",
    title: "عودة حرية الحركة",
    desc: "نتائج مستدامة — 94% من مستخدمينا يشعرون بتحسن كبير في نشاطهم اليومي خلال 30 يوم.",
    bg: "bg-brand-gold",
  },
] as const;

export default function ResultsTimeline({ product }: { product: Product }) {
  const totalReviews = product.reviews.length * 31;

  return (
    <section className="py-14 section-alt">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ماذا تتوقع
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            رحلة التعافي — خطوة بخطوة
          </h2>
          <p className="text-gray-500 mt-2">
            معدل النتائج الحقيقية من{" "}
            <strong className="text-brand-blue">{totalReviews.toLocaleString("ar-KW")}+</strong> عميل كويتي
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute start-[2.25rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-blue via-brand-green to-brand-gold hidden sm:block opacity-30" />

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-5">
                {/* Icon circle */}
                <div
                  className={`relative z-10 flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl ${step.bg} text-white flex flex-col items-center justify-center shadow-card text-center`}
                >
                  <span className="text-2xl leading-none">{step.icon}</span>
                  <span className="text-[9px] font-bold mt-0.5 opacity-90 leading-tight px-1">
                    {step.period}
                  </span>
                </div>

                {/* Content card */}
                <div className="flex-1 bg-white rounded-2xl p-5 shadow-soft border border-gray-100 hover:shadow-card transition-all">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {step.period}
                  </p>
                  <h3 className="font-extrabold text-gray-800 text-base">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom social proof pull-quote */}
        <div className="mt-10 bg-gradient-to-l from-brand-blue-dark to-brand-blue text-white rounded-2xl p-6 text-center shadow-card">
          <p className="text-base font-bold">
            94% من عملائنا يوصون بالمنتج لعائلتهم وأصدقائهم
          </p>
          <p className="text-brand-gold font-bold mt-1.5 text-sm">
            ← اطلب الآن وحس بالفرق من أول استخدام
          </p>
        </div>
      </div>
    </section>
  );
}
