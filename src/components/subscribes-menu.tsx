'use client';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import Link from 'next/link';

import { ReactComponent as Close } from '../icons/close.svg';

export type SubscribesMenuProps = {
  subscribes: string[];

  onSubscribeDelete?: (subscribeName: string, subscribeIdx: number) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function SubscribesMenu({
  subscribes,
  onSubscribeDelete,
  className,
  ...props
}: SubscribesMenuProps) {
  const OnDeleteClick = (
    event: React.MouseEvent<SVGSVGElement>,
    name: string,
    idx: number,
  ) => {
    event.preventDefault();

    if (onSubscribeDelete) onSubscribeDelete(name, idx);
  };

  return (
    <div
      className={`subscribes_wrapper flex min-w-min flex-col gap-4 overflow-hidden rounded-tr-lg border-r border-t border-r-borderMain border-t-borderMain px-4 py-2 backdrop-blur ${
        className ?? ''
      }`}
      {...props}
    >
      <span className="text-center text-xl text-fontMain">
        Names I shall remember
      </span>
      <span className="border-b-2 border-b-borderMain"></span>
      <div className="flex w-full flex-col gap-1 overflow-y-auto">
        {subscribes.map((subscribe, idx) => {
          return (
            <Link
              href={`/name/${subscribe}`}
              key={subscribe}
              className="text-fontHighlight group flex w-full cursor-pointer flex-row items-center justify-between rounded-sm px-2 py-1 pt-1 duration-200 hover:bg-slate-800 focus-visible:bg-slate-800"
            >
              <Close
                className="h-4 text-fontMain opacity-0 duration-200 group-hover:opacity-80 group-focus-visible:opacity-80"
                onClick={(e) => OnDeleteClick(e, subscribe, idx)}
              />
              {subscribe}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
