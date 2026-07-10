import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsBySlug, products } from "@/lib/products";
import ProductHero from "@/components/product/ProductHero";
import PainMirror from "@/components/product/PainMirror";
import MechanismSection from "@/components/product/MechanismSection";
import ReviewsSection from "@/components/product/ReviewsSection";
import CrossSells from "@/components/product/CrossSells";
import FAQSection from "@/components/product/FAQSection";
import ViewContentTracker from "./ViewContentTracker";

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

export default function ProductPage({ params }: Props) {
  const product = productsBySlug[params.slug];
  if (!product) notFound();

  return (
    <>
      <ViewContentTracker sku={product.sku} value={product.basePrice} />
      <ProductHero product={product} />
      <PainMirror product={product} />
      <MechanismSection product={product} />
      <ReviewsSection product={product} />
      <FAQSection product={product} />
      <CrossSells currentProduct={product} />
    </>
  );
}
