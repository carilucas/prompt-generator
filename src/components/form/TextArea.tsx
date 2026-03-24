"use client";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  example?: string;
  minHeight?: string;
};

export function TextArea({
  value,
  onChange,
  example,
  minHeight = "h-10",
}: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={
        "w-full border p-2 border-gray-300 rounded text-sm" + " " + minHeight
      }
      placeholder={example}
    />
  );
}
