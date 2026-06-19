import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  loginSchema,
  type LoginInput,
} from "../../../../shared/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { loginApi, type LoginResponse } from "@/api/authApi";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate()


  type ApiErrorResponse = {
    success: boolean;
    message: string;
  };
  const mutation = useMutation<
    LoginResponse,
    AxiosError<ApiErrorResponse>,
    LoginInput
  >({
    mutationFn: loginApi,
    onSuccess: (res) => {
      toast.success("Login Successfull");
      login({
        email: res.data.email,
        name: res.data.name,
        role: res.data.role,
        userId: res.data.id,
        token: res.data.token,
      });
      console.log(res);
      console.log(localStorage.getItem("user"));
      navigate("/")
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    },
  });

  const handleFormSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="
          relative
          w-full
          max-w-lg

          overflow-hidden
          rounded-2xl

          border border-white/5
          bg-zinc-900

          p-8 md:p-10

          shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        "
      >
        {/* Top Orange Line */}
        <div
          className="
            absolute
            left-[-50%]
            top-0

            h-1
            w-[200%]

          bg-linear-to-r
            from-transparent
            via-orange-500
            to-transparent
          "
        />

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to your ShopNest account.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
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

                border border-zinc-800
                bg-black

                px-4 py-3

                text-white
                placeholder:text-zinc-500

                outline-none

                transition-all
                duration-300

                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-500/20
              "
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-300">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="
                  text-xs
                  text-orange-500

                  transition-colors
                  duration-300

                  hover:text-orange-400
                "
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="
                w-full
                rounded-lg

                border border-zinc-800
                bg-black

                px-4 py-3

                text-white
                placeholder:text-zinc-500

                outline-none

                transition-all
                duration-300

                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-500/20
              "
            />
          </div>

          {/* Demo Note */}
          <div
            className="
              rounded-lg
              border border-orange-500/20
              bg-orange-500/5

              p-3
            "
          >
            <p className="text-xs leading-6 text-zinc-400">
              Enter your registered email and password to access your account.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
              w-full

              rounded-lg

              bg-orange-500

              px-4 py-3

              font-semibold
              text-black

              transition-all
              duration-300

              hover:bg-orange-400
              hover:shadow-[0_0_20px_rgba(249,115,22,0.35)]
            "
          >
           {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
              font-semibold
              text-orange-500

              transition-colors
              duration-300

              hover:text-orange-400
              hover:underline
            "
          >
            Create Account
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
