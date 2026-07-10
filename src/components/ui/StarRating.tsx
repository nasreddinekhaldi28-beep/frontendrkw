interface Props {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, count, size = "md" }: Props) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const half = !filled && i < rating;
    return (
      <span key={i} className={filled ? "text-yellow-400" : half ? "text-yellow-300" : "text-gray-300"}>
        ★
      </span>
    );
  });

  return (
    <span className={`inline-flex items-center gap-1 ${sizes[size]}`}>
      <span className="inline-flex">{stars}</span>
      <span className="font-bold text-gray-700">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-gray-400 text-sm">({count.toLocaleString("ar-KW")} تقييم)</span>
      )}
    </span>
  );
}
