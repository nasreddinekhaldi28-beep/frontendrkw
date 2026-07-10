import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الشحن | راحة الكويت" };

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-extrabold text-brand-blue mb-2">سياسة الشحن والتوصيل</h1>
      <p className="text-gray-400 text-sm mb-8">آخر تحديث: يوليو 2026</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "🚀", title: "التوصيل السريع", desc: "1-2 يوم عمل" },
          { icon: "🇰🇼", title: "جميع مناطق الكويت", desc: "نغطي الكويت كاملاً" },
          { icon: "💵", title: "الدفع عند الاستلام", desc: "لا دفع مسبق" },
        ].map((b) => (
          <div key={b.title} className="bg-blue-50 rounded-xl p-4 text-center shadow-soft ring-1 ring-brand-blue/5">
            <span className="text-3xl mb-2 block">{b.icon}</span>
            <p className="font-bold text-gray-800 text-sm">{b.title}</p>
            <p className="text-gray-500 text-xs mt-1">{b.desc}</p>
          </div>
        ))}
      </div>
      <div className="space-y-5 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">١. وقت التوصيل</h2>
          <p>يتم التوصيل خلال 1-2 يوم عمل من تأكيد الطلب. ستتلقى اتصالاً من فريقنا قبل التوصيل.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٢. تغطية التوصيل</h2>
          <p>نوصل لجميع مناطق الكويت: العاصمة، حولي، الفروانية، الجهراء، السالمية، مبارك الكبير، الأحمدي.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-2">٣. رسوم التوصيل</h2>
          <p>التوصيل مجاني لجميع الطلبات داخل الكويت.</p>
        </section>
      </div>
    </div>
  );
}
