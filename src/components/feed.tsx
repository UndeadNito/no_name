import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import Post from './post';
import useSettings from '~/utils/hooks/useSettings';
import { SettingsFields } from './settings-context';

export type FeedProps = {
  posts: PostType[];
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Feed({ posts, className, ...props }: FeedProps) {
  const [settings, setSettings] = useSettings();

  const OnSubscribeClick = (name: string) => {
    setSettings((current) => {
      return { ...current, subscribes: [name, ...(current.subscribes ?? [])] };
    }, SettingsFields.SUBSCRIBES);
  };

  const OnUnSubscribeClick = (name: string) => {
    setSettings((current) => {
      return {
        ...current,
        subscribes: current.subscribes?.filter((item) => item !== name),
      };
    }, SettingsFields.SUBSCRIBES);
  };

  return (
    <div
      className={`flex flex-col gap-2 overflow-y-auto border border-b-0 border-borderMain p-4 backdrop-blur-lg ${
        className ?? ''
      }`}
      {...props}
    >
      {posts.map((post) => {
        return (
          <>
            <Post
              key={post.id}
              post={post}
              subscribed={settings.subscribes?.includes(post.author.name)}
              onSubscribeClick={OnSubscribeClick}
              onUnSubscribeClick={OnUnSubscribeClick}
              className="pl-4"
            />
            <div className="w-full border-b border-b-borderMain"></div>
          </>
        );
      })}
    </div>
  );
}
