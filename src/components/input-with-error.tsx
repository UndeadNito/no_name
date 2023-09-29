import Input, { type InputProps } from "./input";

type InputWithErrorProps = {
  error?: string;
} & InputProps;

export default function InputWithError({
  error,
  className,
  ...props
}: InputWithErrorProps) {
  return (
    <div
      className={`input_with_error_wrapper relative flex flex-col gap-1 pb-6 ${className}`}
    >
      <Input {...props} />
      <span className="absolute bottom-0 left-1 text-red-500">{error}</span>
    </div>
  );
}
