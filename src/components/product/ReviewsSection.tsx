import StarRating from "@/components/ui/StarRating";
import type { Product } from "@/types";

const AVATAR_COLORS = [
  "bg-blue-500", "bg-emerald-500", "bg-violet-500",
  "bg-amber-500", "bg-rose-500", "bg-teal-500",
];

function avatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

export default function ReviewsSection({ product }: { product: Product }) {
  const totalReviews = product.reviews.length * 31;

  return (
    <section className="py-14 section-alt">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
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

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Reviewer row */}
              <div className="flex items-start gap-3 mb-3">
                {/* Avatar initial */}
                <div
                  className={`w-10 h-10 rounded-full ${avatarColor(review.nameAr)} text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0`}
                >
                  {review.nameAr.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">{review.nameAr}</p>
                      <p className="text-xs text-gray-400">{review.locationAr}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="text-[10px] text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">&quot;{review.textAr}&quot;</p>

              {/* Verified badge */}
              <div className="mt-3 inline-flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                <span>✓</span>
                <span>عملية شراء موثّقة</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom social proof */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            انضم لـ{" "}
            <strong className="text-brand-blue">
              {totalReviews.toLocaleString("ar-KW")}
            </strong>{" "}
            عميل كويتي راضٍ
          </p>
        </div>
      </div>
    </section>
  );
}
