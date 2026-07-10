import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "من نحن | راحة الكويت",
  description: "تعرف على راحة الكويت — علامتنا التجارية وقصتنا وهدفنا في توفير العلاج المنزلي الاحترافي.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-l from-brand-blue to-brand-blue-light py-16 text-white text-center px-4">
        <h1 className="text-3xl font-extrabold mb-3">من نحن</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          نحن راحة الكويت — علامة تجارية كويتية مخصصة لعلاج الألم المزمن في البيت
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-14">
        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-blue mb-4">قصتنا</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              بدأنا لأننا رأينا كم يعاني الكويتيون من الألم المزمن — ظهورهم، أقدامهم، مفاصلهم — بينما الحلول المتاحة إما غالية جداً أو غير فعّالة.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              العيادات مكلفة والوقت محدود. المسكنات مجرد حل مؤقت. والأجهزة الرخيصة لا تقدم نتيجة حقيقية.
            </p>
            <p className="text-gray-600 leading-relaxed">
              لهذا أسسنا <strong className="text-brand-blue">راحة الكويت</strong> — لنجلب التقنيات المستخدمة في عيادات الفيزيوثيرابي مباشرة إلى بيوتكم، بسعر معقول، وبضمان دفع عند الاستلام.
            </p>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="https://placehold.co/500x500/1E3A8A/FFFFFF?text=راحة+الكويت"
              alt="قصة راحة الكويت"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-extrabold text-brand-blue mb-4">مهمتنا</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
            نؤمن أن كل كويتي يستحق أن يعيش حياة بدون ألم مزمن — وأن العلاج الاحترافي لا يجب أن يكون حكراً على أصحاب الوقت أو المال.
          </p>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-extrabold text-brand-blue mb-6 text-center">قيمنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🔬", title: "العلم أولاً", desc: "كل منتج يعتمد على أبحاث علمية مثبتة وليس مجرد ادعاءات تسويقية." },
              { icon: "🤝", title: "الثقة فوق كل شيء", desc: "الدفع عند الاستلام ليس مجرد خيار — هو التزامنا الدائم بثقة عملائنا." },
              { icon: "💪", title: "نتيجة حقيقية", desc: "لا نبيع أملاً — نبيع منتجات اختبرها آلاف الكويتيين وأثنوا عليها." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl border border-gray-100 p-5">
                <span className="text-4xl mb-3 block">{v.icon}</span>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Numbers */}
        <div className="bg-brand-blue text-white rounded-2xl p-8">
          <h2 className="text-2xl font-extrabold text-center mb-8">راحة الكويت بالأرقام</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { num: "2,400+", label: "عميل راضٍ" },
              { num: "4.9/5", label: "متوسط التقييم" },
              { num: "7 أيام", label: "ضمان استرجاع" },
              { num: "1-2 يوم", label: "سرعة التوصيل" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-extrabold text-brand-gold">{s.num}</p>
                <p className="text-xs text-blue-100 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
