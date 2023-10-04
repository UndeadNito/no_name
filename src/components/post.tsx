import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { ReactComponent as Bookmark } from '../icons/bookmark.svg';
import Link from 'next/link';

export type PostProps = {
  post: PostType;
  subscribed?: boolean;

  onSubscribeClick?: (name: string) => void;
  onUnSubscribeClick?: (name: string) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Post({
  post,
  subscribed,
  className,
  onSubscribeClick,
  onUnSubscribeClick,
  ...props
}: PostProps) {
  const OnSubscribeClick = () => {
    if (subscribed) {
      if (onUnSubscribeClick) onUnSubscribeClick(post.author.name);
    } else {
      if (onSubscribeClick) onSubscribeClick(post.author.name);
    }
  };

  return (
    <div
      {...props}
      className={`flex flex-col gap-2 text-fontMain ${className ?? ''}`}
    >
      <div className="group flex w-max flex-row items-center gap-2">
        <Link href={`/name/${post.author.name}`} className="pl-4">
          {post.author.name}
        </Link>
        <Bookmark
          className="h-4 w-4 cursor-pointer opacity-0 duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          fill={subscribed ? 'currentColor' : undefined}
          onClick={OnSubscribeClick}
        />
      </div>
      <pre>{post.text}</pre>
    </div>
  );
}
