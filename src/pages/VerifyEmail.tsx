import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailSchema, type verifyEmailInput } from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";



import { verifyEmailApi, type VerifyEmailResponse } from "@/api/authApi";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<verifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
  });
  const navigate = useNavigate()
  type ApiErrorResponse = {
    success: boolean;
    message: string;
  };
  const mutation = useMutation<
  VerifyEmailResponse,
  AxiosError<ApiErrorResponse>,
  verifyEmailInput
  >({
    mutationFn: verifyEmailApi,

    onSuccess: () => {
      toast.success("Email verified successfully 🎉");
      navigate("/")
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to verify email"
      );
    },
  });

  const handleFormSubmit = (data: verifyEmailInput) => {
    mutation.mutate(data);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="
          w-full
          max-w-md

          rounded-xl
          border border-zinc-800
          bg-zinc-900

          p-8

          shadow-lg
        "
      >
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">
            Verify Email
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Enter your email and 6-digit OTP to verify your account.
          </p>
        </div>

        <div className="space-y-5">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
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

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              OTP Code
            </label>

            <input
              type="text"
              maxLength={6}
              placeholder="123456"
              {...register("otp")}
              className="
                w-full
                rounded-lg

                border border-zinc-700
                bg-zinc-800

                px-4 py-3

                text-center
                text-lg
                tracking-[0.5rem]

                text-white
                placeholder:text-zinc-500

                outline-none

                focus:border-orange-500
                focus:ring-1
                focus:ring-orange-500
              "
            />

            {errors.otp && (
              <p className="mt-1 text-sm text-red-500">
                {errors.otp.message}
              </p>
            )}
          </div>

          {/* Info Box */}
          <div
            className="
              rounded-lg
              border border-orange-500/20
              bg-orange-500/5

              p-3
            "
          >
            <p className="text-xs text-zinc-400">
              Check your inbox for the verification code sent to
              your email address.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="
              w-full

              rounded-lg

              bg-orange-500

              px-4 py-3

              font-semibold
              text-black

              transition-all
              duration-200

              hover:bg-orange-400

              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {mutation.isPending
              ? "Verifying..."
              : "Verify Email"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default VerifyEmail;