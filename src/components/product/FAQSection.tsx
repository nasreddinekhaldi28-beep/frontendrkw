"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product, FAQ } from "@/types";

// These questions appear on every product page — they remove the main COD objections
// and are the #1 driver of confirmation + delivery rate.
const COD_FAQS: FAQ[] = [
  {
    questionAr: "كيف يتم الدفع؟",
    answerAr:
      "الدفع عند الاستلام فقط. ما تدفع أي شيء مسبقاً — المندوب يستلم منك القيمة كاملة لما يوصلك الطلب على باب بيتك.",
  },
  {
    questionAr: "كم يستغرق التوصيل داخل الكويت؟",
    answerAr:
      "خلال 1-2 يوم عمل من وقت تأكيد الطلب. معظم الطلبات توصل في اليوم التالي مباشرة.",
  },
  {
    questionAr: "ما هي سياسة الإرجاع والضمان؟",
    answerAr:
      "ضمان ذهبي 30 يوم كامل. إذا ما حسيت بأي فرق أو ما عجبك المنتج — تواصل معنا ونسترجع قيمة طلبك بالكامل. بدون أسئلة وبدون أي شروط.",
  },
];

export default function FAQSection({ product }: { product: Product }) {
  const allFaqs: FAQ[] = [...COD_FAQS, ...product.faqs];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-14 section-alt">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">الأسئلة الشائعة</h2>
          <p className="text-gray-500 mt-2 text-sm">كل اللي تبي تعرفه قبل ما تطلب</p>
        </div>

        <div className="space-y-3">
          {allFaqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-soft hover:border-brand-blue/30 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-start gap-3"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-bold text-gray-800 text-sm leading-relaxed">
                  {faq.questionAr}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-brand-blue flex-shrink-0 transition-transform",
                    open === i ? "rotate-180" : ""
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 pt-3 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
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
