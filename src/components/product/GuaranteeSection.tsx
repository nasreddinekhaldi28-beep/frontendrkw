const GUARANTEE_POINTS = [
  { emoji: "💳", text: "ما تدفع إلا عند الاستلام" },
  { emoji: "📦", text: "استرجاع مجاني" },
  { emoji: "☎️", text: "دعم 7 أيام في الأسبوع" },
];

export default function GuaranteeSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-amber-700 via-amber-600 to-yellow-500 p-8 md:p-12 text-white text-center shadow-[0_20px_60px_-20px_rgba(217,119,6,0.45)]">
          {/* Decorative rings */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[80px] border-white/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-[50px] border-white/10" />
          </div>

          <div className="relative z-10">
            <div className="text-6xl mb-4 leading-none">🛡️</div>

            <div className="inline-block bg-white/20 text-white/90 text-xs font-extrabold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
              ضمان ذهبي
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              30 يوم — أو كامل فلوسك ترجع
            </h2>

            <p className="text-white/90 text-base leading-relaxed max-w-lg mx-auto mb-8">
              جرّب المنتج 30 يوماً كاملة. إذا ما حسيت بأي فرق أو ما عجبك لأي سبب — تواصل معنا ونسترجع قيمة طلبك بالكامل.
              <strong className="block mt-1 text-white">بدون أسئلة. بدون شروط.</strong>
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {GUARANTEE_POINTS.map(({ emoji, text }) => (
                <div key={text} className="bg-white/15 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2 leading-none">{emoji}</div>
                  <p className="text-[11px] font-bold text-white/90 leading-tight">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
