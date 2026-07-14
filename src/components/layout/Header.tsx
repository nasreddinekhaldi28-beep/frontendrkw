"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCartStore();
  const count = totalItems();

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/collection", label: "المتجر" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-soft border-b border-gray-100/80 supports-[backdrop-filter]:bg-white/80">
      {/* Trust bar */}
      <div className="bg-gradient-to-l from-brand-blue-dark via-brand-blue to-brand-blue-light text-white text-xs py-2 text-center tracking-wide">
        <span className="hidden sm:inline">⭐ 4.9/5 من 2,400+ عميل كويتي &nbsp;·&nbsp; </span>
        🇰🇼 توصيل 1-2 يوم &nbsp;·&nbsp; 💵 الدفع عند الاستلام &nbsp;·&nbsp; 🛡️ ضمان 30 يوم
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-blue/20 group-hover:ring-brand-blue/40 transition-all shadow-soft">
            <Image
              src="/logo.png"
              alt="راحة الكويت"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-extrabold text-brand-blue tracking-tight group-hover:text-brand-blue-light transition-colors">
              راحة الكويت
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">
              Rahat Kuwait
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-gray-700 hover:text-brand-blue font-medium text-sm py-1 after:absolute after:bottom-0 after:start-0 after:h-0.5 after:w-0 after:rounded-full after:bg-brand-blue after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Cart + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openDrawer()}
            aria-label="السلة"
            className="relative p-2.5 rounded-full hover:bg-brand-blue/10 active:scale-95 transition-all"
          >
            <ShoppingCart className="w-6 h-6 text-brand-blue" />
            {count > 0 && (
              <span className="absolute -top-0.5 -start-0.5 bg-brand-green text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-cta ring-2 ring-white animate-pop-in">
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2.5 rounded-full hover:bg-brand-blue/10 active:scale-95 transition-all"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="القائمة"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 animate-fade-in">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-gray-700 hover:text-brand-blue font-medium border-b last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
