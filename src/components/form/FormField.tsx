type Props = {
  label: string;
  children: React.ReactNode;
};

export function FormField({ label, children }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-md font-bold text-gray-900">{label}</label>
      {children}
    </div>
  );
}
