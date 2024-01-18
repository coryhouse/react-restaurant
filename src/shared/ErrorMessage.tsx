type ErrorMessageProps = {
  message: string | undefined;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return message ? (
    <p role="alert" className="text-red-500">
      {message}
    </p>
  ) : null;
}
