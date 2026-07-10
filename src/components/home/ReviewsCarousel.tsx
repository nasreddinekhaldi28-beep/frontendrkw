import StarRating from "@/components/ui/StarRating";

const reviews = [
  {
    name: "أحمد العازمي",
    location: "السالمية",
    rating: 5,
    text: "جهاز الحجامة غيّر حياتي. ظهري كان يؤلمني كل يوم. بعد أسبوع استخدام الفرق واضح جداً.",
    product: "جهاز الحجامة الكهربائي",
  },
  {
    name: "سارة المطيري",
    location: "حولي",
    rating: 5,
    text: "أخذت مساج الأقدام لأمي وهي مبسوطة جداً. تستخدمه كل ليلة وتقول نومها تحسن.",
    product: "جهاز مساج الأقدام",
  },
  {
    name: "خالد البراك",
    location: "الفروانية",
    rating: 5,
    text: "الجل مع جهاز الحجامة الاثنين سوياً — النتيجة رائعة. ركبتي ما تؤلمني بعد الشغل.",
    product: "جل علاج المفاصل",
  },
  {
    name: "نورة الشمري",
    location: "الكويت",
    rating: 5,
    text: "شريت 3 قطع للعيلة. الدفع بعد الاستلام ريحتني. التوصيل جاء بكرة واحدة.",
    product: "جهاز الحجامة الكهربائي",
  },
  {
    name: "فهد العنزي",
    location: "الجهراء",
    rating: 5,
    text: "منتج جودته عالية. واضح الفرق عن البضائع الرخيصة. يستاهل سعره بالكامل.",
    product: "جهاز مساج الأقدام",
  },
  {
    name: "أم عبدالله",
    location: "العدان",
    rating: 5,
    text: "زوجي عنده آلام ظهر مزمنة. الجهاز ساعده كثير. الخدمة كانت ممتازة والتوصيل سريع.",
    product: "جهاز الحجامة الكهربائي",
  },
];

export default function ReviewsCarousel() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            تقييمات حقيقية
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            2,400+ عميل كويتي يثقون فينا
          </h2>
          <div className="flex justify-center mt-4">
            <StarRating rating={4.9} count={2417} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:bg-white hover:shadow-card transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.location}</p>
                </div>
                <StarRating rating={r.rating} size="sm" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"{r.text}"</p>
              <p className="mt-3 text-xs text-brand-blue font-medium">{r.product}</p>
              <p className="mt-1 text-xs text-green-600 font-medium">✓ تم التحقق من الشراء</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
