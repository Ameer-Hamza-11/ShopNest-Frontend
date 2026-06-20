import { getUserOrders } from "@/api/orderApi";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()
 

  const { data, isPending, error } = useQuery({
    queryKey: ["my-order"],
    queryFn: getUserOrders,
  });

  console.log(data);
  const orders = data?.data || [];

  const handleLogoutButton = ()=>{
    logout();
    navigate("/login")
  }

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
      <div className="mx-auto max-w-6xl">
        {/* Profile Header */}
        <div
          className="
              mb-8
              rounded-2xl
              border border-zinc-800
              bg-zinc-900
              p-6
              md:p-8
            "
        >
          <div
            className="
                flex flex-col gap-6
                md:flex-row
                md:items-center
                md:justify-between
              "
          >
            <div>
              <h1 className="text-3xl font-bold text-white">My Profile</h1>

              <p className="mt-2 text-zinc-400">
                Manage your account information.
              </p>
            </div>

            <button
            onClick={handleLogoutButton}
              className="
                  rounded-lg
                  bg-red-500
                  px-5
                  py-3
                  font-semibold
                  text-white
  
                  transition-all
                  duration-300
  
                  hover:bg-red-600
                "
            >
              Logout
            </button>
          </div>

          <div
            className="
                mt-8
                grid gap-5
                md:grid-cols-3
              "
          >
            <div
              className="
                  rounded-xl
                  border border-zinc-800
                  bg-zinc-950
                  p-5
                "
            >
              <p className="text-sm text-zinc-500">Full Name</p>

              <p className="mt-2 break-words text-lg font-semibold text-white">
                {user?.name}
              </p>
            </div>

            <div
              className="
                  rounded-xl
                  border border-zinc-800
                  bg-zinc-950
                  p-5
                "
            >
              <p className="text-sm text-zinc-500">Email Address</p>

              <p className="mt-2 break-all text-lg font-semibold text-white">
                {user?.email}
              </p>
            </div>

            <div
              className="
                  rounded-xl
                  border border-zinc-800
                  bg-zinc-950
                  p-5
                "
            >
              <p className="text-sm text-zinc-500">Account Type</p>

              <span
                className="
                    mt-2
                    inline-flex
                    rounded-full
                    bg-orange-500/10
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-orange-500
                  "
              >
                {user?.role.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div
          className="
              rounded-2xl
              border border-zinc-800
              bg-zinc-900
              p-6
              md:p-8
            "
        >
          <h2 className="text-2xl font-bold text-white">Order History</h2>

          <p className="mt-2 text-zinc-400">View your recent purchases.</p>

          <div className="mt-8 space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center">
                <p className="text-zinc-400">No orders found.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="
        rounded-xl
        border border-zinc-800
        bg-zinc-950
        p-5
        transition-all
        duration-300
        hover:border-orange-500/20
      "
                >
                  <div className="grid gap-4 md:grid-cols-5">
                    <div>
                      <p className="text-sm text-zinc-500">Order ID</p>
                      <p
                        className="max-w-full break-all text-sm font-medium text-white"
                        title={order.id}
                      >
                        {order.id}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Date</p>
                      <p className="font-medium text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Items</p>
                      <p className="font-medium text-white">
                        {order.items.length}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Total</p>
                      <p className="font-bold text-green-500">
                        ${Number(order.totalAmount).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                          order.paymentStatus === "Delivered"
                            ? "bg-green-500/10 text-green-500"
                            : order.paymentStatus === "Shipped"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-zinc-800 pt-4">
                    <h4 className="mb-3 font-semibold text-white">
                      Order Items
                    </h4>

                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="
                        flex flex-col gap-2
                        text-sm
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                        >
                          <span
                            className="break-all text-zinc-400"
                            title={item.productId}
                          >
                            Product: {item.productId}
                          </span>

                          <span className="text-white">Qty: {item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
