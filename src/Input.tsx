type InputProps = {
  value: string | number;
  className?: string;
  label: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function Input({ id, className, label, value, onChange }: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="border-2 border-gray-400"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
