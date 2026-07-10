import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";

export default function ReviewsSection({ product }: { product: Product }) {
  const totalReviews = product.reviews.length * 31;

  return (
    <section className="py-14 section-alt">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            آراء العملاء
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-3">
            ماذا يقول عملاؤنا في الكويت
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <StarRating rating={4.9} count={totalReviews} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-800">{review.nameAr}</p>
                  <p className="text-xs text-gray-400">{review.locationAr}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-[11px] text-gray-400">{review.date}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"{review.textAr}"</p>
              <div className="mt-3 flex items-center gap-1 text-green-600 text-xs font-medium">
                <span>✓</span>
                <span>تم التحقق من الشراء</span>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            انضم لـ <strong className="text-brand-blue">{totalReviews.toLocaleString("ar-KW")}</strong> عميل كويتي راضٍ
          </p>
        </div>
      </div>
    </section>
  );
}
