"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib";
import { z } from "zod";
import Swal from "sweetalert2";
import Link from "next/link";

type FormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = "/dashboard/prompt";
      return;
    }
    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: "Invalid email or password, please try again.",
      confirmButtonColor: "#024a70",
    });
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-sky-800"></div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>

          <div className="mb-6 text-blue-500">
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-sky-900 hover:bg-sky-800 text-white font-semibold rounded-md py-2 px-4 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 "
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-blue-500 text-center">
          <Link href="/auth/register" className="hover:underline">
            Sign up Here
          </Link>
        </div>
      </div>
    </div>
  );
}
