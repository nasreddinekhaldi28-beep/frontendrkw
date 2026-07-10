const badges = [
  { icon: "💵", title: "الدفع عند الاستلام", sub: "لا حاجة لبطاقة بنكية" },
  { icon: "🇰🇼", title: "توصيل 1-2 يوم", sub: "لجميع مناطق الكويت" },
  { icon: "✅", title: "ضمان 7 أيام", sub: "راجع بدون أسئلة" },
  { icon: "🏆", title: "الأكثر مبيعاً", sub: "+2,400 عميل كويتي" },
  { icon: "🔒", title: "معلوماتك آمنة", sub: "خصوصية تامة مضمونة" },
];

export default function TrustStrip() {
  return (
    <section className="bg-white border-y border-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-0">
          {badges.map((b) => (
            <div key={b.title} className="flex items-center gap-3 px-4">
              <span className="text-3xl">{b.icon}</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">{b.title}</p>
                <p className="text-xs text-gray-400">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
