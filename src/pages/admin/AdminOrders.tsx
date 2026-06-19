import { getOrders, updateOrderStatus } from "@/api/adminApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

      queryClient.invalidateQueries({
        queryKey: ["admin", "orders"],
      });
    },

    onError: (error) => {
      toast.error("Failed to update status");
      console.log(error);
    },
  });

  const orders = data ?? [];

  console.log(orders);

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

  const handleUpdateOrderStatus = (
    id: string,
    status: "Pending" | "Shipped" | "Delivered"
  ) => {
    updateStatusMutation.mutate({
      id,
      status,
    });
  };

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Manage Orders</h1>

              <p className="mt-2 text-zinc-400">
                Track and manage customer orders.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-5 py-4">
              <p className="text-sm text-zinc-400">Total Orders</p>

              <p className="mt-1 text-3xl font-bold text-orange-500">
                {orders.length}
              </p>
            </div>
          </div>

          {/* Empty State */}
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
              <p className="text-zinc-400">No orders found.</p>
            </div>
          ) : (
            <>
              {/* MOBILE VIEW */}
              <div className="grid gap-4 md:hidden">
                {orders.map((order) => (
                  <div
                    key={order.id}
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
                        <p className="text-sm text-zinc-500">Order ID</p>

                        <h3 className="break-all text-sm font-semibold text-white">
                          {order.id}
                        </h3>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                    <div className="mt-4 space-y-3 border-t border-zinc-800 pt-4">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Customer</span>

                        <span className="font-medium text-white">
                          {order.fullName}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Total</span>

                        <span className="text-lg font-bold text-green-500">
                          ${Number(order.totalAmount).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Payment</span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.paymentStatus === "Paid"
                              ? "bg-green-500/10 text-green-500"
                              : order.paymentStatus === "Failed"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Method</span>

                        <span className="text-white">
                          {order.paymentMethod}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">Date</span>

                        <span className="text-white">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-zinc-800 pt-4">
                      <p className="mb-2 text-sm text-zinc-500">
                        Shipping Address
                      </p>

                      <p className="text-sm text-zinc-300">{order.street}</p>

                      <p className="text-sm text-zinc-300">
                        {order.city}, {order.postalCode}
                      </p>

                      <p className="text-sm text-zinc-300">{order.country}</p>
                    </div>

                    <div className="mt-4">
                      <select
                        defaultValue={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(
                            order.id,
                            e.target.value as
                              | "Pending"
                              | "Shipped"
                              | "Delivered"
                          )
                        }
                        className="
    rounded-xl
    border border-zinc-700
    bg-zinc-950
    px-3
    py-2
    text-sm
    text-white
    outline-none
    focus:border-orange-500
  "
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
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
                        ORDER ID
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        CUSTOMER
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        TOTAL
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        PAYMENT
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        STATUS
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        DATE
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-500">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="
                          border-b border-zinc-800
                          transition-all
                          duration-300
                          hover:bg-zinc-800/30
                        "
                      >
                        <td className="max-w-[180px] truncate px-4 py-5 text-white">
                          {order.id}
                        </td>

                        <td className="px-4 py-5">
                          <div>
                            <p className="font-medium text-white">
                              {order.fullName}
                            </p>

                            <p className="text-xs text-zinc-500">
                              {order.city}, {order.country}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-5">
                          <span className="text-lg font-bold text-green-500">
                            ${Number(order.totalAmount).toFixed(2)}
                          </span>
                        </td>

                        <td className="px-4 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              order.paymentStatus === "Paid"
                                ? "bg-green-500/10 text-green-500"
                                : order.paymentStatus === "Failed"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>

                        <td className="px-4 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                        <td className="px-4 py-5 text-zinc-300">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-4 py-5">
                          <select
                            defaultValue={order.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(
                                order.id,
                                e.target.value as "Pending" | "Shipped" | "Delivered"
                              )
                            }
                            className="
                              rounded-xl
                              border border-zinc-700
                              bg-zinc-950
                              px-3
                              py-2
                              text-sm
                              text-white
                              outline-none
                              focus:border-orange-500
                            "

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
