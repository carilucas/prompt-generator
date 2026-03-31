"use client";

import { getPasswordStrength, getStrengthLabel } from "@/lib/password-strength";

interface Props {
  password: string;
}

export const PasswordStrength = ({ password }: Props) => {
  const score = getPasswordStrength(password);
  const label = getStrengthLabel(score);

  const width = (score / 5) * 100;
  return (
    <div className="mt-2">
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-sky-500 rounded transition-all"
          style={{ width: `${width}%` }}
        />
      </div>

      {password && (
        <p className="text-sm mt-1 text-gray-600">Strength: {label}</p>
      )}
    </div>
  );
};
