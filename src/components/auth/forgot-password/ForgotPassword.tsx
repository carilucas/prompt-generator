"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { forgotSchema, ForgotPasswordInput } from "@/lib";
import Link from "next/link";

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error();
      }

      Swal.fire({
        icon: "success",
        title: "Email sent",
        text: "Check your inbox to reset your password",
        confirmButtonColor: "#024a70",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
        confirmButtonColor: "#024a70",
      });
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-sky-800"></div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              We will send a link to reset your password
            </label>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="bg-sky-900 hover:bg-sky-800 text-white font-semibold rounded-md py-2 px-4 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Sending..." : "Reset password"}
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
