import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  disabled,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const additionalStyles = disabled ? DisabledStyles : EnabledStyle;

  return (
    <button
      className={`rounded-md border border-[--bor-m] bg-[--bg-s] px-8 py-1 text-gray-200 ${additionalStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

const EnabledStyle =
  'duration-300 hover:border-gray-400 active:border-transparent';
const DisabledStyles = 'text-opacity-25';
