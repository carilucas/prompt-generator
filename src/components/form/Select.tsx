"use client";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
};

export function Select({
  value,
  onChange,
  options,
  placeholder = "Select a skill category",
  disabled = false,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full border p-2 border-gray-300 rounded text-sm"
    >
      <option value="">{placeholder}</option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label.charAt(0).toUpperCase() + opt.label.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
}
