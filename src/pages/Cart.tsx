import { addToCart, removeCartItem, type CartItem } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: string) => {
    dispatch(removeCartItem(id));
  };

  const handleUpdateQty = (item: CartItem, qty: number) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, quantity: qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>

          <p className="mt-2 text-zinc-400">Manage your selected products.</p>
        </div>

        {cartItems.length === 0 ? (
          <div
            className="
              flex flex-col items-center justify-center
              rounded-2xl
              border border-zinc-800
              bg-zinc-900
              py-20
              text-center
            "
          >
            <ShoppingCart size={60} className="mb-4 text-zinc-600" />

            <h2 className="text-2xl font-semibold text-white">
              Your cart is empty
            </h2>

            <p className="mt-2 text-zinc-400">
              Looks like you haven't added anything yet.
            </p>

            <Link
              to="/"
              className="
                mt-6
                rounded-lg
                bg-orange-500
                px-6
                py-3
                font-semibold
                text-black
                transition-all
                duration-300
                hover:bg-orange-400
              "
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Cart Items */}
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="
                    flex flex-col gap-5
                    rounded-2xl
                    border border-zinc-800
                    bg-zinc-900
                    p-5

                    transition-all
                    duration-300

                    hover:border-orange-500/20
                    hover:translate-x-1

                    sm:flex-row
                  "
                >
                  {/* Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="
                      h-36
                      w-full
                      rounded-xl
                      object-cover

                      sm:h-32
                      sm:w-32
                    "
                  />

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-lg font-bold text-orange-500">
                        ${item.price}
                      </p>
                    </div>

                    <div
                      className="
                        mt-5
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQty(item, item.quantity - 1)}
                          className="
                            flex h-9 w-9 items-center justify-center
                            rounded-md
                            border border-zinc-700
                            bg-zinc-800

                            transition-all
                            duration-200

                            hover:border-orange-500
                            hover:bg-orange-500
                            hover:text-black
                          "
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-[20px] text-center font-semibold text-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleUpdateQty(item, item.quantity + 1)}
                          className="
                            flex h-9 w-9 items-center justify-center
                            rounded-md
                            border border-zinc-700
                            bg-zinc-800

                            transition-all
                            duration-200

                            hover:border-orange-500
                            hover:bg-orange-500
                            hover:text-black
                          "
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove */}
                      <Button
                        variant="outline"
                        onClick={() => handleRemove(item.productId)}
                        className="
                          border-red-500/30
                          bg-transparent
                          text-red-500

                          hover:bg-red-500
                          hover:text-white
                        "
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div
              className="
                h-fit
                rounded-2xl
                border border-zinc-800
                bg-zinc-900
                p-6

                lg:sticky
                lg:top-24
              "
            >
              <h2
                className="
                  mb-6
                  border-b
                  border-zinc-800
                  pb-4

                  text-2xl
                  font-bold
                  text-white
                "
              >
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Products</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t border-zinc-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-orange-500">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  className="
                    mt-5
                    h-12
                    w-full

                    bg-orange-500
                    text-black
                    font-semibold

                    hover:bg-orange-400
                  "
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
