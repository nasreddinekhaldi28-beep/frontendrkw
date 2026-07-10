import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الاسترجاع | راحة الكويت" };

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-extrabold text-brand-blue mb-2">سياسة الاسترجاع والاستبدال</h1>
      <p className="text-gray-400 text-sm mb-8">آخر تحديث: يوليو 2026</p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
        <p className="font-bold text-green-700 text-lg">✅ ضمان 7 أيام بدون أسئلة</p>
        <p className="text-green-600 text-sm mt-1">إذا لم تكن راضياً عن المنتج لأي سبب خلال 7 أيام من الاستلام، نعيد لك المبلغ كاملاً.</p>
      </div>

      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">١. شروط الاسترجاع</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>المنتج في حالته الأصلية وبتغليفه.</li>
            <li>خلال 7 أيام من تاريخ الاستلام.</li>
            <li>مع إبلاغنا برقم الطلب وسبب الإرجاع.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٢. المنتجات المستثناة</h2>
          <p>المنتجات التي استُخدمت بشكل كامل أو تالفة بسبب الإساءة في الاستخدام.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٣. إجراء الاسترجاع</h2>
          <p>تواصل معنا خلال 7 أيام من استلام الطلب. سنرتب معك موعد الاسترداد مجاناً.</p>
        </section>
      </div>
    </div>
  );
}
