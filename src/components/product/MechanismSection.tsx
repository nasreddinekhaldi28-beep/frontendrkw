import Image from "next/image";
import type { Product } from "@/types";

export default function MechanismSection({ product }: { product: Product }) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
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
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <Image
                      src={`https://placehold.co/600x450/1E3A8A/FFFFFF?text=${encodeURIComponent(step.titleAr)}`}
                      alt={step.titleAr}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={!isEven ? "md:[direction:ltr]" : ""}>
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-extrabold text-brand-blue mb-3">{step.titleAr}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{step.descAr}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits list */}
        <div className="mt-14 bg-gradient-to-l from-brand-blue to-brand-blue-light text-white rounded-2xl p-8">
          <h3 className="text-xl font-extrabold mb-6 text-center">الفوائد بالأرقام</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { num: "20", unit: "دقيقة", desc: "جلسة واحدة تكفي" },
              { num: "94%", unit: "", desc: "من المستخدمين يشعرون بفرق" },
              { num: "7", unit: "أيام", desc: "ضمان استرجاع كامل" },
              { num: "2000+", unit: "عميل", desc: "في الكويت يثقون فينا" },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white/10 rounded-xl p-4">
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
