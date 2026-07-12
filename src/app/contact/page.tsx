import type { Metadata } from "next";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصل معنا | راحة الكويت",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light py-14 text-white text-center px-4">
        <h1 className="text-3xl font-extrabold mb-2">تواصل معنا</h1>
        <p className="text-blue-100">نحن هنا لمساعدتك — تواصل معنا بأي طريقة تناسبك</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-brand-blue">معلومات التواصل</h2>
            {[
              {
                icon: Clock,
                title: "ساعات العمل",
                lines: ["السبت - الخميس: 8 صباحاً - 10 مساءً", "الجمعة: 2 ظهراً - 10 مساءً"],
              },
              {
                icon: MapPin,
                title: "الكويت",
                lines: ["نخدم جميع مناطق الكويت", "التوصيل لباب البيت"],
              },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                  <Icon className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{title}</p>
                  {lines.map((l) => (
                    <p key={l} className="text-gray-500 text-sm">{l}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-green-50 rounded-xl p-5">
              <p className="font-bold text-green-700 mb-2">💬 للاستفسار عن طلبك</p>
              <p className="text-gray-600 text-sm">
                بعد تأكيد طلبك، ستتلقى اتصالاً من فريقنا خلال 24 ساعة لتأكيد موعد التوصيل.
              </p>
            </div>
          </div>

          {/* FAQ shortcuts */}
          <div>
            <h2 className="text-xl font-extrabold text-brand-blue mb-6">الأسئلة الشائعة</h2>
            <div className="space-y-4">
              {[
                { q: "كم يستغرق التوصيل؟", a: "التوصيل خلال 1-2 يوم عمل لجميع مناطق الكويت." },
                { q: "هل يمكنني الإرجاع؟", a: "نعم، ضمان ذهبي 30 يوم كاملة بدون أسئلة." },
                { q: "هل الدفع مسبق؟", a: "لا — الدفع فقط عند الاستلام." },
                { q: "هل المنتجات آمنة؟", a: "نعم، جميع أجهزتنا معتمدة بمعايير السلامة الدولية." },
              ].map(({ q, a }) => (
                <div key={q} className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-soft transition-all">
                  <p className="font-bold text-gray-800 text-sm mb-1">{q}</p>
                  <p className="text-gray-500 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
