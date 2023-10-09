'use client';

import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';

import Link from 'next/link';

export type HeaderProps = {
  name: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Header({ name, className, ...props }: HeaderProps) {
  return (
    <div
      className={`relative flex h-16 w-full items-center border-b border-b-borderMain bg-transparent px-4 ${
        className ?? ''
      }`}
      {...props}
    >
      <pre className="text-2xl text-gray-200">
        NO-NAME stream your mind to the world where nobody know your name
      </pre>

      <div
        style={
          {
            WebkitMaskImage:
              'linear-gradient(90deg, #00000000 0, #00000000 120px, #000000CC 121px, #000000FF 1000px)',
          } as CSSProperties
        }
        className="absolute left-0 top-0 h-full w-full bg-transparent backdrop-blur-[2.5px]"
      ></div>
      <div
        style={
          {
            WebkitMaskImage:
              'linear-gradient(90deg, #00000000 0, #00000000 120px, #000000FF 1200px)',
          } as CSSProperties
        }
        className="absolute left-0 top-0 h-full w-full bg-black backdrop-blur-[2.5px]"
      ></div>
      <Link
        href="/login"
        className="text-fontHighlight absolute right-0 flex h-full cursor-pointer items-center border-l-2 border-l-borderMain px-8 text-2xl backdrop-blur-sm"
      >
        <span>{name}</span>
      </Link>
    </div>
  );
}
