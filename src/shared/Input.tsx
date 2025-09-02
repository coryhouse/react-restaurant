import { ErrorMessage } from "./ErrorMessage";

type InputProps = {
  /** input value */
  value: string | number;

  /** CSS class applied to the root wrapping div */
  className?: string;
  /** input label */
  label: string;
  /** input id */
  id: string;
  /** input onFocus */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** input onChange */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /** input type */
  type?: "text" | "number" | "phone" | "email" | "password";
  /** Error to display below the input */
  error?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Step for number inputs */
  step?: string;

  /** Minimum value for number inputs */
  min?: string;
};

export function Input({
  className,
  label,
  id,
  type = "text",
  error,
  placeholder,
  step,
  min,
  ...otherInputProps
}: InputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        step={step}
        min={min}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        }`}
        {...otherInputProps}
      />
      <ErrorMessage message={error} />
    </div>
  );
}
