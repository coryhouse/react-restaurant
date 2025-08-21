import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { Status } from "../routes/admin";

type InputProps = {
  /** input __value__ [more info](http://google.com)
   * Reasons:
   * - big
   * - free
   * - cheap
   */
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

  /** Status of the form */
  formStatus: Status;
};

export function Input({
  className,
  label,
  id,
  onBlur,
  type = "text",
  error,
  formStatus,
  ...otherInputProps
}: InputProps) {
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        onBlur={(event) => {
          setHasBeenTouched(true);
          onBlur?.(event);
        }}
        className="border-2 border-gray-400"
        {...otherInputProps}
      />
      {/** Only show the error message if the field has been touched or the form has been submitted */}
      <ErrorMessage
        message={
          hasBeenTouched || formStatus === "submitted" ? error : undefined
        }
      />
    </div>
  );
}
