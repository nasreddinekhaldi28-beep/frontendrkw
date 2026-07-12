import type { Product } from "@/types";

export default function BenefitsSection({ product }: { product: Product }) {
  if (!product.benefits.length) return null;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ماذا ستحصل
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            النتائج اللي تنتظرها
          </h2>
          <p className="text-gray-500 mt-2">فوائد حقيقية — مثبتة من الاستخدام اليومي لآلاف العملاء</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-gradient-to-l from-green-50/80 to-emerald-50/20 border border-green-100 rounded-2xl p-5 hover:shadow-soft hover:-translate-y-0.5 transition-all"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-green text-white flex items-center justify-center font-extrabold text-sm shadow-soft">
                ✓
              </div>
              <p className="text-gray-700 font-medium leading-relaxed text-sm pt-0.5">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
