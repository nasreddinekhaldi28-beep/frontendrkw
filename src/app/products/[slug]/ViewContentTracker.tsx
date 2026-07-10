"use client";
import { useEffect } from "react";
import { trackViewContent } from "@/lib/pixels";

export default function ViewContentTracker({ sku, value }: { sku: string; value: number }) {
  useEffect(() => {
    trackViewContent(sku, value);
  }, [sku, value]);
  return null;
}
