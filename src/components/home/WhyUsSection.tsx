const reasons = [
  {
    icon: "🏥",
    title: "تقنية العيادات في بيتك",
    desc: "نفس تقنيات الفيزيوثيرابي (حجامة، ضوء أحمر، ضغط هوائي) مجمعة في أجهزة سهلة الاستخدام.",
  },
  {
    icon: "💵",
    title: "الدفع عند الاستلام فقط",
    desc: "لا بطاقة، لا دفع مسبق. ادفع بعد ما تشوف المنتج بيدك.",
  },
  {
    icon: "🇰🇼",
    title: "مصمم للسوق الكويتي",
    desc: "أسعارنا وعروضنا مناسبة للكويت. خدمة عملاء تفهم احتياجاتك.",
  },
  {
    icon: "⭐",
    title: "2,400+ عميل راضٍ",
    desc: "آلاف الكويتيين استخدموا منتجاتنا وشاركوا تجربتهم. 94% يوصون بها.",
  },
  {
    icon: "✅",
    title: "ضمان 7 أيام بدون قيود",
    desc: "مش عاجبك؟ ارجعه خلال 7 أيام بدون أسئلة ونرد لك فلوسك كاملة.",
  },
  {
    icon: "🔬",
    title: "منتجات معتمدة وآمنة",
    desc: "جميع أجهزتنا مشهود لها بمعايير السلامة الدولية (CE). مكونات الجل طبيعية 100%.",
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-16 section-alt">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            لماذا راحة الكويت؟
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            ليش تختارنا؟
          </h2>
          <p className="text-gray-500 mt-2">ليس مجرد جهاز — راحة حقيقية مضمونة</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all"
            >
              <span className="text-4xl mb-4 block">{r.icon}</span>
              <h3 className="font-extrabold text-gray-800 text-base mb-2">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
