import type { Metadata } from "next";

export const metadata: Metadata = { title: "سياسة الخصوصية | راحة الكويت" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-extrabold text-brand-blue mb-2">سياسة الخصوصية</h1>
      <p className="text-gray-400 text-sm mb-8">آخر تحديث: يوليو 2026</p>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-5">
        <section>
          <h2 className="text-lg font-bold text-gray-800">١. المعلومات التي نجمعها</h2>
          <p>عند إتمام طلبك، نجمع: الاسم الكامل ورقم الهاتف لأغراض التوصيل والتواصل فقط.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800">٢. كيف نستخدم معلوماتك</h2>
          <p>نستخدم معلوماتك حصراً لـ: تأكيد طلبك، التواصل لتحديد موعد التوصيل، وتحسين خدمتنا.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800">٣. لا نشارك معلوماتك</h2>
          <p>لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة خارج نطاق تنفيذ طلبك.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800">٤. الكوكيز وتتبع الإعلانات</h2>
          <p>نستخدم كوكيز لتحسين تجربتك وتقديم إعلانات ذات صلة عبر Facebook وTikTok وSnapchat. يمكنك إيقاف الكوكيز من إعدادات متصفحك.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-800">٥. التواصل</h2>
          <p>لأي استفسار عن خصوصيتك، تواصل معنا عبر صفحة التواصل.</p>
        </section>
      </div>
    </div>
  );
}
