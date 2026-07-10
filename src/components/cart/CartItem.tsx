"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatKWD } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/types";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const { removeItem } = useCartStore();

  return (
    <div className="flex gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={item.image} alt={item.nameAr} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 leading-tight truncate">{item.nameAr}</p>
        <p className="text-xs text-gray-500 mt-0.5">{item.quantity} قطعة</p>
        {item.isOTO && (
          <span className="inline-block text-[10px] bg-brand-gold/20 text-brand-gold font-bold px-2 py-0.5 rounded-full mt-1">
            عرض خاص
          </span>
        )}
        <p className="text-brand-blue font-extrabold text-sm mt-1">{formatKWD(item.lineTotal)}</p>
      </div>
      <button
        onClick={() => removeItem(item.sku)}
        className="self-start p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="حذف"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
