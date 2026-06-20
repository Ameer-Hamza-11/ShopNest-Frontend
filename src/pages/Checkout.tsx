import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  // createOrderSchema,
  type CreateOrderInput,
} from "../schemas/order.schema";
import { useMutation } from "@tanstack/react-query";
import { createOrder, type OrderResponse } from "@/api/orderApi";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/cartSlice";
import { useAuth } from "@/hooks/useAuth";
import z from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(3),
  street: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
});

// Create a specific TypeScript type derived from your local checkout validation schema
type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  // Use the local schema type here so React Hook Form expects exactly the input values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.cartItems);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
  type ApiErrorResponse = {
    success: boolean;
    message: string;
  };

  const mutation = useMutation<
    OrderResponse,
    AxiosError<ApiErrorResponse>,
    CreateOrderInput
  >({
    mutationFn: createOrder,
    onSuccess: (data) => {
      toast.success(data.message);
      console.log(data);
      dispatch(clearCart());
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        "Failed to place order. Please try again.";
      toast.error(message);
    },
  });

  // FIXED: Changed parameter type from CreateOrderInput to CheckoutFormData
  const handleFormSubmit = (formData: CheckoutFormData) => {
    // Construct the complete shape expected by CreateOrderInput manually 
    const orderData: CreateOrderInput = {
      ...formData,
      items: items.map((item) => ({
        productId: item.productId,
        qty: item.quantity,
      })),
    };

    console.log(orderData);
    mutation.mutate(orderData);
  };

  console.log(errors);

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
          <p className="mt-2 text-zinc-400">
            Enter your shipping information to complete your order.
          </p>
        </div>

        {/* Card */}
        <div
          className="
            rounded-2xl
            border border-zinc-800
            bg-zinc-900
            p-6
            md:p-8
          "
        >
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            <h2 className="text-2xl font-semibold text-white">
              Shipping Address
            </h2>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Full Name
              </label>

              <input
                defaultValue={user?.name || ""}
                type="text"
                placeholder="Enter your full name"
                required
                {...register("fullName")}
                className="
                  w-full
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-4 py-3
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  focus:border-orange-500
                  focus:ring-1
                  focus:ring-orange-500
                "
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Street */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Street Address
              </label>

              <input
                type="text"
                placeholder="Enter street address"
                required
                {...register("street")}
                className="
                  w-full
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-4 py-3
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  focus:border-orange-500
                  focus:ring-1
                  focus:ring-orange-500
                "
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.street.message}
                </p>
              )}
            </div>

            {/* City + Postal */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Enter city"
                  required
                  {...register("city")}
                  className="
                    w-full
                    rounded-lg
                    border border-zinc-700
                    bg-zinc-800
                    px-4 py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-orange-500
                    focus:ring-1
                    focus:ring-orange-500
                  "
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Postal Code
                </label>

                <input
                  type="text"
                  placeholder="Enter postal code"
                  required
                  {...register("postalCode")}
                  className="
                    w-full
                    rounded-lg
                    border border-zinc-700
                    bg-zinc-800
                    px-4 py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-orange-500
                    focus:ring-1
                    focus:ring-orange-500
                  "
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Country
              </label>

              <input
                type="text"
                placeholder="Enter country"
                required
                {...register("country")}
                className="
                  w-full
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-4 py-3
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  focus:border-orange-500
                  focus:ring-1
                  focus:ring-orange-500
                "
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div
              className="
                mt-8
                rounded-xl
                border border-zinc-800
                bg-zinc-950
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Total Amount</span>
                <span className="text-xl font-bold text-orange-500">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={mutation.isPending || items.length === 0}
              className="
                w-full
                rounded-lg
                bg-orange-600
                py-3
                font-semibold
                text-white
                transition
                hover:bg-orange-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {mutation.isPending ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
