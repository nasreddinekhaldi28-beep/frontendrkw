import Image from "next/image";
import type { Product } from "@/types";

export default function MechanismSection({ product }: { product: Product }) {
  const totalReviews = product.reviews.length * 31;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            العلم وراء النتيجة
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            لماذا يعمل؟ — الآلية العلمية
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            نفس التقنيات المستخدمة في عيادات الفيزيوثيرابي — مجمّعة في جهاز واحد لبيتك
          </p>
        </div>

        {/* Alternating mechanism steps */}
        <div className="space-y-16">
          {product.mechanism.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  !isEven ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className={!isEven ? "md:[direction:ltr]" : ""}>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-card ring-1 ring-black/5 group p-2">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-50">
                      <Image
                        src={step.image ?? `https://placehold.co/600x450/1E3A8A/FFFFFF?text=${encodeURIComponent(step.titleAr)}`}
                        alt={step.titleAr}
                        fill
                        className="object-cover transition-transform duration-[600ms] ease-smooth group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Content — numbered circle replaces emoji icon box */}
                <div className={!isEven ? "md:[direction:ltr]" : ""}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-light text-white flex items-center justify-center font-extrabold text-xl shadow-soft mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-brand-blue mb-3">{step.titleAr}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{step.descAr}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats block */}
        <div className="mt-14 bg-gradient-to-l from-brand-blue-dark via-brand-blue to-brand-blue-light text-white rounded-2xl p-8 shadow-card">
          <h3 className="text-xl font-extrabold mb-6 text-center">الفوائد بالأرقام</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { num: "15", unit: " دقيقة", desc: "جلسة واحدة تكفي" },
              { num: "94%", unit: "", desc: "من المستخدمين يشعرون بفرق" },
              { num: "30", unit: " يوم", desc: "ضمان استرجاع ذهبي" },
              { num: `${(totalReviews).toLocaleString("ar-KW")}`, unit: "+", desc: "عميل كويتي يثق فينا" },
            ].map((stat) => (
              <div
                key={stat.desc}
                className="bg-white/10 ring-1 ring-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors"
              >
                <p className="text-3xl font-extrabold text-brand-gold">
                  {stat.num}
                  <span className="text-lg">{stat.unit}</span>
                </p>
                <p className="text-xs text-blue-100 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
