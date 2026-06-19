import { getAllProducts } from "@/api/product.Api";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const { data, error, isPending } = useQuery({
    queryKey: ["featuredProducts", page, debouncedSearch],
    queryFn: () => getAllProducts(page, debouncedSearch),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      {/* Hero Banner */}
      <div
        className="
          relative overflow-hidden
          rounded-2xl
          border border-white/5
          text-center
          text-white
          px-8 py-24
          mb-14
          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
          bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.2),transparent_60%),linear-gradient(135deg,#18181b_0%,#09090b_100%)]
        "
      >
        <h1
          className="
            text-5xl md:text-7xl
            font-extrabold
            mb-5
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
          "
        >
          Welcome to ShopNest
        </h1>

        <p
          className="
            text-zinc-300
            text-lg md:text-xl
            max-w-2xl
            mx-auto
          "
        >
          Discover the best products at unbeatable prices.
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="
      w-full
      max-w-md
      rounded-xl
      border
      border-zinc-700
      bg-zinc-900
      px-4
      py-3
      text-white
      outline-none
      focus:border-orange-500
    "
        />
      </div>

      {/* Featured Products */}
      <section>
        <div className="mx-auto max-w-7xl">
          <h2
            className="
              text-center
              text-4xl
              font-bold
              text-white
              mb-12
            "
          >
            Featured Products
          </h2>

          {data?.products.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-2xl font-semibold text-white">
                No products found
              </h3>

              <p className="mt-2 text-zinc-400">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data?.products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
      rounded-xl
      border border-zinc-700
      bg-zinc-900
      px-5
      py-3
      font-medium
      text-white
      transition-all
      duration-300
      hover:border-orange-500
      hover:bg-orange-500/10
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
            >
              ← Previous
            </button>

            <div
              className="
      rounded-xl
      border border-orange-500/20
      bg-orange-500/10
      px-6
      py-3
      font-semibold
      text-orange-500
    "
            >
              Page {page}
            </div>

            <button
              disabled={!data?.hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              className="
      rounded-xl
      bg-orange-500
      px-5
      py-3
      font-medium
      text-white
      transition-all
      duration-300
      hover:bg-orange-600
      disabled:cursor-not-allowed
      disabled:bg-zinc-700
      disabled:text-zinc-400
    "
            >
              Next →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
