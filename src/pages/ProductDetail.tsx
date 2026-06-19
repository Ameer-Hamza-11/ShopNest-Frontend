import { getDetailedProducts } from "@/api/product.Api";
import { addToCart } from "@/redux/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch()

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getDetailedProducts(id),
  });



  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-orange-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-lg text-red-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  const product = data;

  const handleAddToCart = ()=>{
    if (product) {
        dispatch(addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            imageUrl: product.imageUrl,
            quantity: 1
        }))
        toast.success("Successfully added to your cart!")
    }
  }

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div
        className="
          mx-auto
          max-w-7xl

          overflow-hidden
          rounded-2xl

          border border-zinc-800
          bg-zinc-900

          shadow-xl
        "
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="p-6">
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="
                  h-[500px]
                  w-full
                  object-cover

                  transition-transform
                  duration-500

                  hover:scale-105
                "
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col p-6 lg:p-8">
            <span
              className="
                mb-4
                w-fit
                rounded-full

                border border-orange-500/20
                bg-orange-500/10

                px-4 py-1

                text-sm
                font-medium

                text-orange-400
              "
            >
              {product.category}
            </span>

            <h1 className="text-4xl font-bold text-white">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <Star
                size={18}
                className="fill-orange-500 text-orange-500"
              />

              <span className="font-medium text-white">
                {product.ratings}
              </span>

              <span className="text-zinc-400">
                ({product.numReviews} reviews)
              </span>
            </div>

            <p className="mt-6 leading-8 text-zinc-400">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
              {product.stock > 0 ? (
                <span
                  className="
                    rounded-full
                    bg-green-500/10
                    px-3
                    py-1

                    text-sm
                    font-medium
                    text-green-400
                  "
                >
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span
                  className="
                    rounded-full
                    bg-red-500/10
                    px-3
                    py-1

                    text-sm
                    font-medium
                    text-red-400
                  "
                >
                  Out of Stock
                </span>
              )}
            </div>

            {/* Price Card */}
            <div
              className="
                mt-8

                rounded-xl
                border border-zinc-800
                bg-black

                p-6
              "
            >
              <p className="text-sm text-zinc-500">
                Price
              </p>

              <h2 className="mt-1 text-4xl font-bold text-orange-500">
                ${product.price}
              </h2>

              <button
                disabled={product.stock === 0}
                onClick={handleAddToCart}
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-lg

                  bg-orange-500

                  px-5
                  py-3

                  font-semibold
                  text-black

                  transition-all
                  duration-300

                  hover:bg-orange-400

                  disabled:cursor-not-allowed
                  disabled:bg-zinc-700
                  disabled:text-zinc-400
                "
              >
                <ShoppingCart size={18} />
                Add To Cart
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-6 space-y-2 text-sm text-zinc-500">
              <p>
                Product ID:
                <span className="ml-2 text-zinc-300">
                  {product.id}
                </span>
              </p>

              <p>
                Added:
                <span className="ml-2 text-zinc-300">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;