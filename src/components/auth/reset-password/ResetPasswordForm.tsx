"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import { resetPasswordSchema, ResetPasswordInput } from "@/lib/";
import Link from "next/link";

export function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Password updated",
        text: "You can now login",
        confirmButtonColor: "#024a70",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Invalid or expired token",
        confirmButtonColor: "#024a70",
      });
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-sky-800"></div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Reset password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-600">
              Enter new password
            </label>
            <input
              id="newPassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="New password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="newPasswordConfirm" className="block text-gray-600">
              Confirm new password
            </label>
            <input
              id="newPasswordConfirm"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="New password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            className="bg-sky-900 hover:bg-sky-800 text-white font-semibold rounded-md py-2 px-4 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save password"}
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/auth/register" className="hover:underline">
            Sign up instead
          </Link>
        </div>
      </div>
    </div>
  );
}
