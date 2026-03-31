"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Link from "next/link";

import { resetPasswordSchema, ResetPasswordInput } from "@/lib/";
import { PasswordInput } from "@/components/form/PasswordInput";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [valid, setValid] = useState<boolean | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = params.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!mounted) return;

    const validate = async () => {
      if (!token) {
        setRedirecting(true);
        router.replace("/auth/register");
        return;
      }
      console.log("push");

      const res = await fetch("/api/auth/validate-reset-token", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      setValid(data.valid);
    };

    validate();
  }, [token, router, mounted]);

  if (!mounted || redirecting) {
    return null;
  }

  if (valid === null) {
    return (
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        Validating token...
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <h1>Invalid or expired link</h1>
        <Link
          href="/auth/forgot-password"
          className="text-blue-500 hover:underline ml-2"
        >
          Request new one
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: ResetPasswordInput) => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({
        token,
        password: data.password,
      }),
    });

    if (!res.ok) {
      Swal.fire("Error", "Invalid token", "error");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Password updated",
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-sky-800"></div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Reset password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <PasswordInput
            label="Enter new password"
            id="newPassword"
            placeholder="New Password"
            register={register("password")}
            error={errors.password?.message}
            showStrength
          />

          <PasswordInput
            label="Confirm new password"
            id="confirmPassword"
            placeholder="Confirm New Password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            className="bg-sky-900 hover:bg-sky-800 text-white font-semibold rounded-md py-2 px-4 w-full"
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
