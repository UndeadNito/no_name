import type { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from 'react';
import { useRef, useEffect, useState } from 'react';

import Button from './button';

export type WritePostProps = {
  userName: string;

  onNewPost?: (text: string) => void;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export default function WritePost({
  userName,
  onNewPost,
  className,
  placeholder,
  ...props
}: WritePostProps) {
  const [areaText, setAreaText] = useState('');
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (areaRef.current) {
      areaRef.current.style.height = 'auto';
      areaRef.current.style.height = areaRef.current?.scrollHeight + 2 + 'px';
    }
  }, [areaText]);

  const OnSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (onNewPost) onNewPost(areaText);

    setAreaText('');
  };

  return (
    <form
      onSubmit={OnSubmit}
      {...props}
      className={`flex flex-col gap-2 rounded-t-lg border border-borderMain p-4 ${
        className ?? ''
      }`}
    >
      <div className="flex flex-row items-end justify-between pl-4">
        <span className="text-fontMain">{userName}</span>
        <Button type="submit">Share</Button>
      </div>
      <textarea
        ref={areaRef}
        rows={1}
        value={areaText}
        onChange={(e) => setAreaText(e.currentTarget.value)}
        className="h-auto resize-none rounded-md border border-borderMain bg-backgroundMain bg-opacity-20 px-2 py-2 text-gray-200 duration-500 hover:border-gray-400 focus-visible:border-gray-400 focus-visible:outline-none"
        placeholder={placeholder}
        spellCheck
      ></textarea>
    </form>
  );
}
