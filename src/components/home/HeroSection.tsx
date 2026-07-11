import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light text-white py-16 md:py-24 overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 start-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 end-20 w-96 h-96 rounded-full bg-brand-gold/40 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/20 backdrop-blur rounded-full px-4 py-2 text-sm mb-6 shadow-lg">
              <span>🏆</span>
              <span className="font-medium">أجهزة العلاج المنزلي #1 في الكويت</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              راحة حقيقية
              <br />
              <span className="text-brand-gold">تبدأ من بيتك</span>
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-md">
              علاج احترافي للركبة والظهر والأقدام والمفاصل — بدون عيادات، بدون انتظار، وبدون دفع مسبق.
              نفس تقنيات الفيزيوثيرابي في جهاز واحد لبيتك.
            </p>

            {/* Social proof mini */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {["AE", "KW", "SA"].map((c) => (
                  <div
                    key={c}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                <p className="text-blue-200 text-xs">+2,400 عميل كويتي راضٍ</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/collection"
                className="bg-brand-green hover:bg-brand-green-dark text-white font-extrabold px-8 py-4 rounded-xl text-base text-center shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                اطلب الآن — الدفع عند الاستلام 💵
              </Link>
              <Link
                href="#pain-selector"
                className="bg-white/10 ring-1 ring-white/20 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl text-base text-center backdrop-blur-sm transition-all"
              >
                اعرف المناسب لك ←
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="absolute inset-0 -m-4 rounded-[2rem] bg-gradient-to-tr from-brand-gold/30 to-white/10 blur-2xl" />
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <Image
                src="https://placehold.co/600x600/2D4ED8/FFFFFF?text=راحة+الكويت"
                alt="راحة الكويت - أجهزة العلاج"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -bottom-4 -start-4 bg-white text-gray-800 rounded-2xl shadow-card p-4 text-center min-w-[100px] ring-1 ring-black/5 animate-float-soft">
              <p className="text-2xl font-extrabold text-brand-green">٩٤٪</p>
              <p className="text-xs text-gray-500 mt-0.5">يوصون بنا</p>
            </div>
            <div className="absolute -top-4 -end-4 bg-gradient-to-br from-brand-gold-light to-brand-gold text-white rounded-2xl shadow-card p-4 text-center min-w-[100px] animate-float-soft [animation-delay:1.2s]">
              <p className="text-2xl font-extrabold">1-2</p>
              <p className="text-xs mt-0.5">يوم توصيل</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
