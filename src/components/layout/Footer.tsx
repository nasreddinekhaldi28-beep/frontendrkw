import Link from "next/link";

const productLinks = [
  { href: "/products/cupping-therapy-massager", label: "جهاز الحجامة الكهربائي" },
  { href: "/products/foot-massager", label: "جهاز مساج الأقدام" },
  { href: "/products/joint-relief-gel", label: "جل علاج المفاصل" },
  { href: "/collection", label: "جميع المنتجات" },
];

const infoLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
  { href: "/policies/refund", label: "سياسة الاسترجاع" },
  { href: "/policies/shipping", label: "سياسة الشحن" },
  { href: "/policies/privacy", label: "سياسة الخصوصية" },
  { href: "/policies/terms", label: "الشروط والأحكام" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brand-blue to-brand-blue-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <span className="text-2xl font-extrabold">راحة الكويت</span>
              <p className="text-xs text-blue-200 tracking-widest mt-0.5">Rahat Kuwait</p>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              أجهزة العلاج المنزلي #1 في الكويت. علاج احترافي للظهر والأقدام والمفاصل — بدون عيادات وبدون دفع مسبق.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {["💵 الدفع عند الاستلام", "🇰🇼 توصيل 1-2 يوم", "✅ ضمان 7 أيام"].map((b) => (
                <span key={b} className="bg-white/10 ring-1 ring-white/10 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/15 transition-colors">{b}</span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-base mb-4 text-white">منتجاتنا</h3>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block text-blue-100 hover:text-white text-sm hover:translate-x-[-3px] transition-all">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-base mb-4 text-white">معلومات</h3>
            <ul className="space-y-2">
              {infoLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block text-blue-100 hover:text-white text-sm hover:translate-x-[-3px] transition-all">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-200">
          <p>© {new Date().getFullYear()} راحة الكويت. جميع الحقوق محفوظة.</p>
          <p>rahatkwt.store</p>
        </div>
      </div>
    </footer>
  );
}
