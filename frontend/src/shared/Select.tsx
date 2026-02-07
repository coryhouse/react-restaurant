import { useState } from "react";
import type { Status } from "../types/status.types";
import { ErrorMessage } from "./ErrorMessage";

type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "value"
> & {
  /** select value */
  value: string;

  /** select label */
  label: string;

  /** select id */
  id: string;

  /** Error to display below the select */
  error?: string;

  /** Status of the form */
  formStatus: Status;

  /** Select options */
  children: React.ReactNode;
};

export function Select({
  className,
  label,
  id,
  onBlur,
  error,
  formStatus,
  children,
  ...otherSelectProps
}: SelectProps) {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const hasError = (hasBeenTouched || formStatus === "submitted") && error;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id={id}
        onBlur={(event) => {
          setHasBeenTouched(true);
          onBlur?.(event);
        }}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
          hasError
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        }`}
        {...otherSelectProps}
      >
        {children}
      </select>
      <ErrorMessage message={hasError ? error : undefined} />
    </div>
  );
}
