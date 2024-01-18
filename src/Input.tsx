type InputProps = {
  value: string;
  label: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function Input({ id, label, value, onChange }: InputProps) {
  return (
    <>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="border-2 border-gray-400"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
