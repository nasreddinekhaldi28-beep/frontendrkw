const badges = [
  { icon: "💵", title: "الدفع عند الاستلام", sub: "لا حاجة لبطاقة بنكية" },
  { icon: "🇰🇼", title: "توصيل 1-2 يوم", sub: "لجميع مناطق الكويت" },
  { icon: "🛡️", title: "ضمان 30 يوم", sub: "راجع بدون أسئلة" },
  { icon: "🏆", title: "الأكثر مبيعاً", sub: "+2,400 عميل كويتي" },
  { icon: "🔒", title: "معلوماتك آمنة", sub: "خصوصية تامة مضمونة" },
];

export default function TrustStrip() {
  return (
    <section className="bg-white border-y border-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center md:justify-between gap-2 md:gap-0">
          {badges.map((b) => (
            <div key={b.title} className="flex items-center gap-3 px-4 py-2 md:py-1 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="text-3xl transition-transform duration-300 hover:scale-110">{b.icon}</span>
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
