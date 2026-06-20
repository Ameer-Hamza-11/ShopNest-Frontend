import { getOrders, updateOrderStatus } from "@/api/adminApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type OrderStatus = "Pending" | "Shipped" | "Delivered";

const AdminOrders = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: getOrders,
  });

  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: (error) => {
      toast.error("Failed to update status");
      console.log(error);
    },
  });

  const orders = data ?? [];

  const formatPrice = (value: string | number) => {
    const num = Number(value);
    if (isNaN(num)) return "0.00";
    return num.toFixed(2);
  };

  const handleUpdateOrderStatus = (id: string, status: OrderStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

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
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">

          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Manage Orders</h1>
              <p className="mt-2 text-zinc-400">
                Track and manage customer orders
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-5 py-4">
              <p className="text-sm text-zinc-400">Total Orders</p>
              <p className="mt-1 text-3xl font-bold text-orange-500">
                {orders.length}
              </p>
            </div>
          </div>

          {/* EMPTY */}
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
              <p className="text-zinc-400">No orders found</p>
            </div>
          ) : (
            <>
              {/* MOBILE */}
              <div className="grid gap-4 md:hidden">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
                  >
                    <div className="flex justify-between">
                      <p className="text-zinc-500 text-sm">Order ID</p>
                      <span className="text-white text-xs break-all">
                        {order.id}
                      </span>
                    </div>

                    {/* ✅ USER ID ADDED */}
                    <div className="flex justify-between mt-3">
                      <p className="text-zinc-500 text-sm">User ID</p>
                      <span className="text-white text-xs break-all">
                        {order.userId}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between">
                      <span className="text-zinc-500">Customer</span>
                      <span className="text-white">{order.fullName}</span>
                    </div>

                    <div className="mt-3 flex justify-between">
                      <span className="text-zinc-500">Total</span>
                      <span className="text-green-500 font-bold">
                        ${formatPrice(order.totalAmount)}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between">
                      <span className="text-zinc-500">Status</span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-500/10 text-green-500"
                            : order.status === "Shipped"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left text-zinc-500">
                      <th className="p-4">ORDER ID</th>

                      {/* ✅ USER ID COLUMN */}
                      <th className="p-4">USER ID</th>

                      <th className="p-4">CUSTOMER</th>
                      <th className="p-4">TOTAL</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4">DATE</th>
                      <th className="p-4">ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-zinc-800 hover:bg-zinc-800/20"
                      >
                        <td className="p-4 text-white max-w-[180px] truncate">
                          {order.id}
                        </td>

                        {/* ✅ USER ID */}
                        <td className="p-4 text-white max-w-[180px] truncate">
                          {order.userId}
                        </td>

                        <td className="p-4 text-white">
                          {order.fullName}
                        </td>

                        <td className="p-4 text-green-500 font-bold">
                          ${formatPrice(order.totalAmount)}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-500/10 text-green-500"
                                : order.status === "Shipped"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td className="p-4 text-zinc-300">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(
                                order.id,
                                e.target.value as OrderStatus
                              )
                            }
                            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;