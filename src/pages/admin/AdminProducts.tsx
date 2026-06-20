import { deleteProduct, getProducts } from "@/api/adminApi";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

const AdminProducts = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const { data, isPending, error } = useQuery({
    queryKey: ["adminProducts", page, debouncedSearch],
    queryFn: () => getProducts(page, search),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast.success("Product deleted successfully");
      console.log("Product deleted successfully", data);
      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });
    },
    onError: (err) => {
      toast.error("Error deleting product");
      console.log("Error deleting product", err);
    },
  });

  const products = data?.products ?? [];

  console.log(products);
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  const handleDeleteButton = (id: string) => {
    if (window.confirm("Are you strictly sure you want to delete this?")) {
      mutation.mutate(id);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Manage Products</h1>

              <p className="mt-2 text-zinc-400">
                View, edit and manage all store products.
              </p>
            </div>

            <Link
              to="/admin/add-product"
              className="
                rounded-xl
                bg-orange-500
                px-5
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-orange-600
              "
            >
              + Add Product
            </Link>
          </div>
          <div className="mb-6">
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
      rounded-xl
      border
      border-zinc-700
      bg-zinc-950
      px-4
      py-3
      text-white
      outline-none
      focus:border-orange-500
    "
            />
          </div>

          {/* Empty State */}
          {products.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
              <p className="text-zinc-400">No products found.</p>
            </div>
          ) : (
            <>
              {/* MOBILE CARDS */}
              <div className="grid gap-4 md:hidden">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="
                      rounded-2xl
                      border border-zinc-800
                      bg-zinc-950
                      p-5
                      transition-all
                      duration-300
                      hover:border-orange-500/30
                    "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-zinc-500">Product Name</p>

                        <h3 className="font-semibold text-white">
                          {product.name}
                        </h3>
                      </div>

                      <span
                        className="
                          rounded-full
                          bg-orange-500/10
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-orange-500
                        "
                      >
                        {product.category}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3 border-t border-zinc-800 pt-4">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Price</span>

                        <span className="font-semibold text-green-500">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Stock</span>

                        <span
                          className={`font-medium ${
                            product.stock > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Product ID</span>

                        <span className="max-w-[180px] truncate text-white">
                          {product.id}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        to={`/admin/edit-product/${product.id}`}
                        className="
                          flex-1
                          rounded-xl
                          bg-blue-500/10
                          px-4
                          py-3
                          font-medium
                          text-blue-500
                          transition-all
                          hover:bg-blue-500/20
                        "
                      >
                        Edit
                      </Link>

                      <button
                        disabled={mutation.isPending}
                        onClick={() => handleDeleteButton(product.id)}
                        className="
    flex-1
    rounded-xl
    bg-red-500/10
    px-4
    py-3
    font-medium
    text-red-500
  "
                      >
                        {mutation.isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        PRODUCT
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        CATEGORY
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        PRICE
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        STOCK
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        ID
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="
                          border-b border-zinc-800
                          transition-all
                          duration-300
                          hover:bg-zinc-800/30
                        "
                      >
                        <td className="px-4 py-5 font-medium text-white">
                          {product.name}
                        </td>

                        <td className="px-4 py-5">
                          <span
                            className="
                              rounded-full
                              bg-orange-500/10
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-orange-500
                            "
                          >
                            {product.category}
                          </span>
                        </td>

                        <td className="px-4 py-5 font-semibold text-green-500">
                          ${Number(product.price).toFixed(2)}
                        </td>

                        <td className="px-4 py-5">
                          <span
                            className={`font-medium ${
                              product.stock > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>

                        <td className="max-w-[200px] truncate px-4 py-5 text-zinc-300">
                          {product.id}
                        </td>

                        <td className="px-4 py-5">
                          <div className="flex gap-2">
                            <Link
                              to={`/admin/edit-product/${product.id}`}
                              className="
                                rounded-lg
                                bg-blue-500/10
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-blue-500
                                transition-all
                                hover:bg-blue-500/20
                              "
                            >
                              Edit
                            </Link>

                            <button
                              disabled={mutation.isPending}
                              onClick={() => handleDeleteButton(product.id)}
                              className="
                                rounded-lg
                                bg-red-500/10
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-red-500
                                transition-all
                                hover:bg-red-500/20
                              "
                            >
                              {mutation.isPending ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
      rounded-lg
      border
      border-zinc-700
      px-5
      py-2
      text-white
      disabled:opacity-50
    "
            >
              Previous
            </button>

            <span className="text-white">
              Page {data?.currentPage} of {data?.totalPages}
            </span>

            <button
              disabled={!data?.hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              className="
      rounded-lg
      bg-orange-500
      px-5
      py-2
      text-white
      disabled:bg-zinc-700
    "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProducts;
