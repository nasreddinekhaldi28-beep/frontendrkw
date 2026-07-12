// Inspired by assilalsiha.shop — explaining the confirmation call BEFORE it happens
// is the single most effective way to increase COD confirmation rate.
// Customers who know to expect a call from an unknown Kuwait number will pick up.

const STEPS = [
  {
    num: "١",
    emoji: "📞",
    title: "مكالمة التأكيد",
    desc: "خلال 24 ساعة — قد لا يظهر رقمنا باسمنا",
    bg: "bg-brand-blue",
  },
  {
    num: "٢",
    emoji: "📦",
    title: "تغليف وشحن",
    desc: "بعد تأكيدك مباشرة",
    bg: "bg-brand-gold",
  },
  {
    num: "٣",
    emoji: "💵",
    title: "دفع عند الباب",
    desc: "نقداً فقط — بدون بطاقة",
    bg: "bg-brand-green",
  },
];

export default function AfterOrderSection() {
  return (
    <section className="py-14 section-alt">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            بعد الطلب
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-3">
            إيش يصير بعد ما تطلب؟
          </h2>
        </div>

        {/* Call warning — this is the key to confirmation rate */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 text-center shadow-soft">
          <p className="font-extrabold text-brand-blue mb-1">
            📞 سيتصل بك فريقنا من رقم كويتي (+965)
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            قد لا يظهر الرقم باسمنا — المكالمة لتأكيد عنوانك فقط.{" "}
            <strong className="text-brand-blue">بدون تأكيد لا يُشحن الطلب.</strong>
          </p>
        </div>

        {/* 3-step timeline */}
        <div className="grid grid-cols-3 gap-4">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="bg-white rounded-2xl p-4 text-center shadow-soft border border-gray-100 hover:shadow-card transition-all"
            >
              <div
                className={`w-10 h-10 ${s.bg} text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-3`}
              >
                {s.num}
              </div>
              <span className="text-2xl leading-none block mb-2">{s.emoji}</span>
              <p className="font-bold text-gray-800 text-sm leading-tight">{s.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
