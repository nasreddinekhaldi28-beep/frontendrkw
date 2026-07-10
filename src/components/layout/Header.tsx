"use client";
import Link from "next/link";
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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Trust bar */}
      <div className="bg-brand-blue text-white text-xs py-1.5 text-center">
        <span className="hidden sm:inline">⭐ 4.9/5 من 2,400+ عميل كويتي &nbsp;·&nbsp; </span>
        🇰🇼 توصيل 1-2 يوم &nbsp;·&nbsp; 💵 الدفع عند الاستلام &nbsp;·&nbsp; ✅ ضمان 7 أيام
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="text-xl font-extrabold text-brand-blue tracking-tight group-hover:text-brand-blue-light transition-colors">
            راحة الكويت
          </span>
          <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">
            Rahat Kuwait
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-700 hover:text-brand-blue font-medium transition-colors text-sm"
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
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-brand-blue" />
            {count > 0 && (
              <span className="absolute -top-1 -start-1 bg-brand-green text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
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
