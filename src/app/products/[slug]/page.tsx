import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { productsBySlug, products } from "@/lib/products";
import ProductHero from "@/components/product/ProductHero";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import PainMirror from "@/components/product/PainMirror";
import BenefitsSection from "@/components/product/BenefitsSection";
import ViewContentTracker from "./ViewContentTracker";

// Below-fold sections — lazy loaded to keep above-fold paint fast
const MechanismSection = dynamic(() => import("@/components/product/MechanismSection"));
const ResultsTimeline = dynamic(() => import("@/components/product/ResultsTimeline"));
const GuaranteeSection = dynamic(() => import("@/components/product/GuaranteeSection"));
const ReviewsSection = dynamic(() => import("@/components/product/ReviewsSection"));
const FAQSection = dynamic(() => import("@/components/product/FAQSection"));
const AfterOrderSection = dynamic(() => import("@/components/product/AfterOrderSection"));
const CrossSells = dynamic(() => import("@/components/product/CrossSells"));

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productsBySlug[params.slug];
  if (!product) return {};
  return {
    title: `${product.nameAr} | راحة الكويت`,
    description: product.descriptionAr,
  };
}

// ─── Optimised product page section order ────────────────────────────────────
//
//  1. ProductHero     — Image + buy-box + offer selector (above fold, first action)
//  2. StickyAddToCart — Fixed bottom bar, appears once hero CTA scrolls off
//  3. PainMirror      — Agitate pain — "هل تعاني من…"
//  4. BenefitsSection — Transform pain into desire — what they'll gain
//  5. MechanismSection — Science & credibility — why it works
//  6. ResultsTimeline — Day 1 / Week 1 / Month 1 — manage expectations positively
//  7. GuaranteeSection — Risk reversal — 30-day gold guarantee
//  8. ReviewsSection  — Social proof — real customers
//  9. FAQSection      — Objection handling (COD/delivery/returns first)
// 10. CrossSells      — Revenue maximiser — "complete your recovery"
//
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductPage({ params }: Props) {
  const product = productsBySlug[params.slug];
  if (!product) notFound();

  return (
    <>
      <ViewContentTracker sku={product.sku} value={product.basePrice} />
      <ProductHero product={product} />
      <StickyAddToCart product={product} />
      <PainMirror product={product} />
      <BenefitsSection product={product} />
      <MechanismSection product={product} />
      <ResultsTimeline product={product} />
      <GuaranteeSection />
      <ReviewsSection product={product} />
      <FAQSection product={product} />
      <AfterOrderSection />
      <CrossSells currentProduct={product} />
    </>
  );
}
