import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyUsSection from "@/components/home/WhyUsSection";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />

      {/* Pain selector */}
      <section id="pain-selector" className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              اختر مشكلتك — نعطيك الحل
            </h2>
            <p className="text-gray-500 mt-2">كل منتج مصمم لحل مشكلة محددة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🦾",
                title: "ألم الظهر والرقبة",
                sub: "من السواقة الطويلة أو الجلوس في المكتب",
                cta: "الحل: جهاز الحجامة",
                href: "/products/cupping-therapy-massager",
                color: "bg-blue-50 border-blue-200 hover:border-brand-blue",
              },
              {
                icon: "🦶",
                title: "تعب الأقدام والساقين",
                sub: "بعد يوم طويل من الوقوف أو المشي",
                cta: "الحل: مساج الأقدام",
                href: "/products/foot-massager",
                color: "bg-green-50 border-green-200 hover:border-brand-green",
              },
              {
                icon: "🦵",
                title: "ألم الركبة والمفاصل",
                sub: "الخشونة والتيبّس وصعوبة الحركة",
                cta: "الحل: جهاز الركبة",
                href: "/products/knee-joint-massager",
                color: "bg-amber-50 border-amber-200 hover:border-brand-gold",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group block rounded-2xl border-2 p-6 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 ${card.color}`}
              >
                <span className="text-5xl mb-4 block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">{card.icon}</span>
                <h3 className="font-extrabold text-gray-800 text-lg mb-1">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{card.sub}</p>
                <span className="inline-block bg-brand-blue text-white text-sm font-bold px-4 py-2 rounded-xl shadow-soft group-hover:bg-brand-blue-light group-hover:shadow-card transition-all">
                  {card.cta} ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <WhyUsSection />
      <ReviewsCarousel />

      {/* Comparison vs clinic */}
      <section className="py-14 bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            وفّر المال والوقت — الحل في بيتك
          </h2>
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            {[
              { label: "جلسة عيادة", price: "15-30 KWD", sub: "مرة واحدة", icon: "🏥", color: "bg-white/10" },
              { label: "جهاز راحة الكويت", price: "19.9 KWD", sub: "مدى الحياة", icon: "⭐", color: "bg-brand-gold/20 border border-brand-gold" },
              { label: "المسكنات اليومية", price: "+5 KWD/شهر", sub: "بدون علاج حقيقي", icon: "💊", color: "bg-white/10" },
            ].map((item) => (
              <div key={item.label} className={`${item.color} rounded-2xl p-5`}>
                <span className="text-4xl mb-3 block">{item.icon}</span>
                <p className="font-extrabold text-xl">{item.price}</p>
                <p className="text-xs text-blue-200 mt-1">{item.sub}</p>
                <p className="text-xs text-blue-100 mt-2 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
          <Link
            href="/collection"
            className="mt-10 inline-block bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-10 py-4 rounded-xl text-base shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            اطلب الآن بالدفع عند الاستلام 💵
          </Link>
        </div>
      </section>
    </>
  );
}
