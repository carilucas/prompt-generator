type InputProps = {
  value: string | number;
  onChange: (value: string) => void;
  example?: string;
  disabled?: boolean;
};

export function Input({ value, onChange, example }: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 border-gray-300 rounded text-sm"
      placeholder={example}
    />
  );
}
