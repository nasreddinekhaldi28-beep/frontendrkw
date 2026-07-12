import type { Product } from "@/types";

export default function PainMirror({ product }: { product: Product }) {
  return (
    <section className="py-12 section-alt">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            نعرف مشكلتك
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            هل تعاني من هذه المشاكل؟
          </h2>
          <p className="text-gray-500 mt-2">
            إذا قلت &quot;نعم&quot; على واحدة منها — هذا المنتج صُمّم لك
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 divide-y divide-gray-100 overflow-hidden">
          {product.painPoints.map((point, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-6 py-4 hover:bg-red-50/40 transition-colors"
            >
              {/* Red ✗ — pain points should feel like suffering, not achievement */}
              <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-red-100 text-red-500 text-sm font-extrabold flex items-center justify-center">
                ✗
              </span>
              <p className="text-gray-700 font-medium leading-relaxed">{point}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-l from-brand-blue-dark to-brand-blue text-white rounded-2xl p-6 text-center shadow-card">
          <p className="text-lg font-bold leading-relaxed">
            لا تقبل الألم المزمن كجزء من حياتك.
            <br />
            <span className="text-brand-gold">العلاج الاحترافي صار ببيتك.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
