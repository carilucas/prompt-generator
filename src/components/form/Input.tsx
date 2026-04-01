type InputProps = {
  value: string | number;
  onChange: (value: string) => void;
  example?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function Input({ value, onChange, example, placeholder, disabled }: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 border-gray-300 rounded text-sm"
      placeholder={placeholder || example}
      disabled={disabled}
    />
  );
}
