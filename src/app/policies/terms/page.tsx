import type { Metadata } from "next";

export const metadata: Metadata = { title: "الشروط والأحكام | راحة الكويت" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-extrabold text-brand-blue mb-2">الشروط والأحكام</h1>
      <p className="text-gray-400 text-sm mb-8">آخر تحديث: يوليو 2026</p>
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">١. قبول الشروط</h2>
          <p>باستخدام موقع rahatkwt.store أو إتمام طلب، فأنت توافق على هذه الشروط والأحكام.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٢. المنتجات والأسعار</h2>
          <p>نحتفظ بحق تعديل الأسعار والعروض في أي وقت. الأسعار المعروضة وقت الطلب هي الأسعار المعتمدة.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٣. الطلبات والتأكيد</h2>
          <p>يُعتبر الطلب مؤكداً بعد التواصل الهاتفي من فريقنا. لنا حق رفض أي طلب لأسباب مشروعة.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٤. الدفع</h2>
          <p>الدفع حصراً عند الاستلام نقداً. لا نقبل المدفوعات المسبقة عبر أي وسيلة.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٥. المسؤولية</h2>
          <p>منتجاتنا للاستخدام الشخصي فقط. للحالات الطبية الجدية يُنصح باستشارة طبيب متخصص.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٦. القانون المطبق</h2>
          <p>تخضع هذه الشروط لقوانين دولة الكويت.</p>
        </section>
      </div>
    </div>
  );
}
