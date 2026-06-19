import { getAdminStats } from "@/api/adminApi";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: getAdminStats,
  });

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
  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>

            <p className="mt-2 text-zinc-400">Welcome back, Admin</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div
            className="
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-6
                transition-all
                duration-300
                hover:border-orange-500/20
              "
          >
            <p className="text-sm text-zinc-500">Total Orders</p>

            <h2 className="mt-3 text-4xl font-bold text-orange-500">
              {data.totalOrders.count}
            </h2>
          </div>

          <div
            className="
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-6
                transition-all
                duration-300
                hover:border-orange-500/20
              "
          >
            <p className="text-sm text-zinc-500">Total Products</p>

            <h2 className="mt-3 text-4xl font-bold text-orange-500">
              {data.totalProducts.count}
            </h2>
          </div>

          <div
            className="
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-6
                transition-all
                duration-300
                hover:border-orange-500/20
              "
          >
            <p className="text-sm text-zinc-500">Total Users</p>

            <h2 className="mt-3 text-4xl font-bold text-orange-500">
              {data.totalUsers.count}
            </h2>
          </div>

          <div
            className="
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-6
                transition-all
                duration-300
                hover:border-orange-500/20
              "
          >
            <p className="text-sm text-zinc-500">Total Revenue</p>

            <h2 className="mt-3 break-all text-3xl md:text-4xl font-bold text-orange-500">
              $
              {Number(data.totalRevenue).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        {/* Controls */}
        <div
          className="
              mt-10
              rounded-2xl
              border border-zinc-800
              bg-zinc-900
              p-6
              md:p-8
            "
        >
          <h2 className="text-2xl font-bold text-white">
            Administrative Controls
          </h2>

          <p className="mt-2 text-zinc-400">
            Manage products, orders and users.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/admin/add-product"
              className="
                  rounded-lg
                  bg-orange-500
                  px-5
                  py-3
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:bg-orange-400
                "
            >
              + Add Product
            </Link>

            <Link
              to="/admin/products"
              className="
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-orange-500
                "
            >
              📦 Manage Products
            </Link>

            <Link
              to="/admin/orders   "
              className="
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-orange-500
                "
            >
              🚚 Manage Orders
            </Link>

            <Link
              to="/admin/users"
              className="
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:border-orange-500
                "
            >
              👥 Users Directory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
