import { getAllProducts } from "@/api/product.Api";
import ProductCard from "@/components/ProductCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const {
    data,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["featuredProducts", debouncedSearch],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getAllProducts(pageParam, debouncedSearch),

    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
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
      <div className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-400">
              Product Catalog
            </p>

            <h1 className="text-4xl font-bold text-white">
              Browse All Products
            </h1>

            <p className="mt-2 max-w-xl text-zinc-400">
              Discover products, compare prices and find exactly what you're
              looking for.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-4">
            <p className="text-sm text-zinc-400">Available Products</p>

            <p className="text-2xl font-bold text-cyan-400">
              {data?.pages.reduce(
                (acc, page) => acc + page.products.length,
                0
              ) ?? 0}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="relative mx-auto max-w-2xl">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products, categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="
        w-full
        rounded-2xl
        border
        border-zinc-700
        bg-zinc-900/80
        py-4
        pl-14
        pr-4
        text-white
        backdrop-blur-sm
        outline-none
        transition-all
        duration-300
        placeholder:text-zinc-500
        focus:border-cyan-500
        focus:ring-4
        focus:ring-cyan-500/10
      "
          />
        </div>
      </div>

      {/* Featured Products */}
      <section>
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-bold text-white">
            Store Inventory
          </h2>

          {data?.pages[0]?.products.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 py-20 text-center">
              <div className="mb-4 text-6xl">📦</div>

              <h3 className="text-2xl font-semibold text-white">
                No Products Found
              </h3>

              <p className="mt-3 text-zinc-400">
                Try searching with a different keyword.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data?.pages.map((page) =>
                page.products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))
              )}
            </div>
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
            className="
      rounded-full
      bg-cyan-500
      px-6
      py-3
      font-semibold
      text-black
      transition-all
      hover:scale-105
      hover:bg-cyan-400
      disabled:bg-zinc-700
      disabled:text-zinc-500
    "
          >
            {isFetchingNextPage
              ? "Loading..."
              : hasNextPage
              ? "Load More"
              : "No More Products"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Shop;
