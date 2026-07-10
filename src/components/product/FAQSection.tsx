"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export default function FAQSection({ product }: { product: Product }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-14 section-alt">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">الأسئلة الشائعة</h2>
        </div>
        <div className="space-y-3">
          {product.faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-soft hover:border-brand-blue/30 transition-colors">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-start"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-bold text-gray-800 text-sm leading-relaxed">{faq.questionAr}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-brand-blue flex-shrink-0 transition-transform ms-3",
                    open === i ? "rotate-180" : ""
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t pt-3">
                  {faq.answerAr}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
