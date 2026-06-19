import type { allProducts } from "@/api/api";
import { Link } from "react-router-dom";

const ProductCard = ({ item }: { item: allProducts }) => {
  return (
    <div
      className="
        group
        bg-zinc-900
        rounded-xl
        overflow-hidden
        border border-white/5
        flex flex-col
        relative
        transition-all duration-500
        hover:-translate-y-2
        hover:border-orange-500/30
        hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_0_0_1px_rgba(249,115,22,0.3)]
      "
    >
      {/* Image */}
      <div className="h-[240px] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          flex-1
          flex
          flex-col
          justify-between
          p-5
          text-left
          bg-gradient-to-t
          from-zinc-900
          to-transparent
        "
      >
        <div>
          <h3
            className="
              text-lg
              font-semibold
              text-white
              truncate
            "
          >
            {item.name}
          </h3>

          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="mt-5">
          <p className="text-2xl font-bold text-orange-500">${item.price}</p>

          <Link
            to={`/product/${item.id}`}
            className="
          btn
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
