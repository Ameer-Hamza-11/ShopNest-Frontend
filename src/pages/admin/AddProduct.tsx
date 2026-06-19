import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/api/adminApi";
import { useState } from "react";
import { toast } from "sonner";

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};

const AddProduct = () => {
  const { handleSubmit, register, reset, watch } = useForm<ProductFormData>();
  const [image, setImage] = useState<File | null>(null);

  const mutation = useMutation({
    mutationKey: ["product"],
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      reset();
      setImage(null);
    },

    onError: (error) => {
      toast.error("Failed to create product");
      console.log(error);
    },
  });

  const imagePreview = image ? URL.createObjectURL(image) : "";
  const watchedName = watch("name");
  const watchedCategory = watch("category");
  const watchedPrice = watch("price");
  const watchedStock = watch("stock");
  const watchedDescription = watch("description");

  const handleFormSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    if (image) {
      formData.append("imageUrl", image);
    }

    mutation.mutate(formData);
  };
  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Add New Product</h1>

            <p className="mt-2 text-zinc-400">
              Create and publish a new product to your store.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Product Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                className="
                  w-full
                  rounded-xl
                  border border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  transition-all
                  focus:border-orange-500
                "
                {...register("name")}
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Write product description..."
                className="
                  w-full
                  rounded-xl
                  border border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  transition-all
                  focus:border-orange-500
                "
                {...register("description")}
              />
            </div>

            {/* Price + Category */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Price ($)
                </label>

                <input
                  type="number"
                  placeholder="0.00"
                  className="
                    w-full
                    rounded-xl
                    border border-zinc-700
                    bg-zinc-950
                    px-4
                    py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    transition-all
                    focus:border-orange-500
                  "
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Category
                </label>

                <input
                  type="text"
                  placeholder="Electronics"
                  className="
                    w-full
                    rounded-xl
                    border border-zinc-700
                    bg-zinc-950
                    px-4
                    py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    transition-all
                    focus:border-orange-500
                  "
                  {...register("category")}
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Stock Quantity
              </label>

              <input
                type="number"
                placeholder="Available stock"
                className="
                  w-full
                  rounded-xl
                  border border-zinc-700
                  bg-zinc-950
                  px-4
                  py-3
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  transition-all
                  focus:border-orange-500
                "
                {...register("stock", {
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-3 block text-sm font-medium text-zinc-300">
                Product Image
              </label>

              <div
                className="
                  rounded-2xl
                  border-2
                  border-dashed
                  border-orange-500/30
                  bg-zinc-950
                  p-8
                  text-center
                  transition-all
                  hover:border-orange-500
                "
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl text-orange-500">
                  📷
                </div>

                <p className="font-medium text-white">Upload Product Image</p>

                <p className="mt-1 text-sm text-zinc-500">
                  PNG, JPG, WEBP up to 10MB
                </p>

                <input
                  type="file"
                  className="
                    mt-5
                    block
                    w-full
                    text-sm
                    text-zinc-400
                    file:mr-4
                    file:rounded-lg
                    file:border-0
                    file:bg-orange-500
                    file:px-4
                    file:py-2
                    file:font-medium
                    file:text-white
                    hover:file:bg-orange-600
                  "
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            <div
              className="
    rounded-2xl
    border border-zinc-800
    bg-zinc-950
    p-5
  "
            >
              <h3 className="mb-4 font-semibold text-white">Product Preview</h3>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div
                  className="
        h-28
        w-28
        overflow-hidden
        rounded-xl
        border border-zinc-700
        bg-zinc-800
      "
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-500">
                      IMG
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">
                    {watchedName || "Product Name"}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-500">
                    {watchedCategory || "Category"}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-green-500">
                    ${watchedPrice ? Number(watchedPrice).toFixed(2) : "0.00"}
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">
                    Stock: {watchedStock || 0}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-zinc-800 pt-4">
                <p className="text-sm leading-relaxed text-zinc-400">
                  {watchedDescription ||
                    "Product description will appear here..."}
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-orange-500
                px-6
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-orange-600
              "
            >
              {mutation.isPending ? "Publishing..." : "Publish Product"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
