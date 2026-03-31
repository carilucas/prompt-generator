"use client";

import { useState } from "react";
import { PasswordStrength } from "@/components";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  register: any;
  error?: string;
  showStrength?: boolean;
}

export function PasswordInput({
  id,
  label,
  placeholder,
  register,
  error,
  showStrength = false,
}: Props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <div className="mb-4 relative">
        <label htmlFor={id} className="block text-gray-600">
          {label}
        </label>
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          onChange={(e) => {
            register.onChange(e);
            setValue(e.target.value);
          }}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-2 text-sm"
        >
          {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>

      {showStrength && <PasswordStrength password={value} />}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
}
