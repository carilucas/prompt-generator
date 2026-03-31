"use client";

import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/registerSchema";
import { z } from "zod";
import Link from "next/link";
import { PasswordInput } from "@/components";

type FormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      }),
    });

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Account created, please login to your account",
        confirmButtonColor: "#024a70",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/auth/login";
        }
      });
      return;
    }
    const error = await res.json();

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.error || "Something went wrong",
    });
  }
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-sky-800"></div>

      <div className="lg:p-20 md:p-25 sm:20 p-8 w-full lg:w-1/2 h-screen">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <PasswordInput
            label="Password"
            id="password"
            register={register("password")}
            error={errors.password?.message}
            showStrength
          />

          <PasswordInput
            label="Confirm password"
            id="confirmPassword"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

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

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-sky-900 hover:bg-sky-800 text-white font-semibold rounded-md py-2 px-4 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 "
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-blue-500 text-center">
          <Link href="/auth/login" className="hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};
