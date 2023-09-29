import { PropsWithChildren } from 'react';

import Button, { type ButtonProps } from './button';
import Spiner from './spiner';

export type ButtonWithLoadingProps = {
  loading?: boolean;
} & ButtonProps;

export default function ButtonWithLoading({
  children,
  loading,
  className,
  ...props
}: PropsWithChildren<ButtonWithLoadingProps>) {
  return (
    <div className={`relative ${className}`}>
      <Button disabled={loading} {...props}>
        {children}
      </Button>
      {loading && (
        <Spiner className="absolute left-[calc(100%+8px)] top-[50%] -translate-y-1/2 text-gray-200" />
      )}
    </div>
  );
}
