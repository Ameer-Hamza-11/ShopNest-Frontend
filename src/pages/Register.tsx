import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerApi, type RegisterResponse } from "@/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  registerSchema,
  type RegisterInput,
} from "../schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import type { AxiosError } from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate()

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  type ApiErrorResponse = {
    success: boolean;
    message: string;
  };

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<ApiErrorResponse>,
    RegisterInput
  >({
    mutationFn: registerApi,
    onSuccess: (data) => {
      toast.success("Account created successfully 🎉");
      console.log(data);
      login({
        email: data.data.email,
        name: data.data.name,
        role: data.data.role,
        userId: data.data.id,
        token: data.data.token,
      });
      navigate("/verify-email")
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    },
  });

  const handleFormSubmit = (data: RegisterInput) => {
    mutation.mutate(data);
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10 bg-zinc-950">
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
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Join ShopNest and start exploring.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
              className="
                w-full
                rounded-lg
                border border-zinc-700
                bg-zinc-800
                px-4 py-2.5
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-orange-500
                focus:ring-1
                focus:ring-orange-500
              "
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              {...register("username")}
              className="
                w-full
                rounded-lg
                border border-zinc-700
                bg-zinc-800
                px-4 py-2.5
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-orange-500
                focus:ring-1
                focus:ring-orange-500
              "
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
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
                px-4 py-2.5
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

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Phone Number
              <span className="ml-1 text-zinc-500">(Optional)</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneNumber")}
              className="
                w-full
                rounded-lg
                border border-zinc-700
                bg-zinc-800
                px-4 py-2.5
                text-white
                placeholder:text-zinc-500
                outline-none
                focus:border-orange-500
                focus:ring-1
                focus:ring-orange-500
              "
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...register("password")}
                className="
                  w-full
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-4 py-2.5
                  pr-11
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  focus:border-orange-500
                  focus:ring-1
                  focus:ring-orange-500
                "
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                  hover:text-zinc-200
                  transition-colors
                  duration-200
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="
                  w-full
                  rounded-lg
                  border border-zinc-700
                  bg-zinc-800
                  px-4 py-2.5
                  pr-11
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  focus:border-orange-500
                  focus:ring-1
                  focus:ring-orange-500
                "
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-400
                  hover:text-zinc-200
                  transition-colors
                  duration-200
                "
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="
    w-full
    rounded-lg
    bg-orange-500
    px-4
    py-2.5
    font-semibold
    text-black

    transition-all
    duration-200

    hover:bg-orange-400

    disabled:cursor-not-allowed
    disabled:opacity-60
  "
          >
            {mutation.isPending ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="
              font-semibold
              text-orange-500
              hover:text-orange-400
              hover:underline
              transition-colors
              duration-200
            "
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
