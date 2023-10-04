import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Fragment } from 'react';

import useSettings from '~/utils/hooks/useSettings';
import useOnScreen from '~/utils/hooks/use-on-screen';
import { SettingsFields } from './settings-context';
import { api } from '~/utils/api';

import Spiner from './spiner';
import Post from './post';

const LOAD_THEN_X_POSTS_LEFT = 2;

export type FeedProps = {
  name?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function InfiniteScrollFeed({
  name,
  className,
  ...props
}: FeedProps) {
  const [settings, setSettings] = useSettings();

  const [loaderOnScreen, setLoader] = useOnScreen();

  const posts = api.posts.getPosts.useInfiniteQuery(
    { name: name },
    {
      getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
      initialCursor: null,
    },
  );

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

  if (loaderOnScreen && !posts.isLoading && posts.hasNextPage) {
    console.log('loader on screen');
    void posts.fetchNextPage();
  }

  if (loaderOnScreen) {
    console.log('loader on screen');
  }

  return (
    <div
      className={`flex flex-col gap-2 overflow-y-auto border border-b-0 border-borderMain p-4 backdrop-blur-lg ${
        className ?? ''
      }`}
      {...props}
    >
      {posts.data?.pages.flat().map((post, idx, array) => {
        return (
          <Fragment key={post.id}>
            <Post
              post={post}
              subscribed={settings.subscribes?.includes(post.author.name)}
              onSubscribeClick={OnSubscribeClick}
              onUnSubscribeClick={OnUnSubscribeClick}
              className="pl-4"
            />
            <div
              className="w-full border-b border-b-borderMain"
              ref={
                idx === array.length - 1 - LOAD_THEN_X_POSTS_LEFT
                  ? setLoader
                  : undefined
              }
            ></div>
          </Fragment>
        );
      })}
      {loaderOnScreen && posts.hasNextPage ? (
        <div>
          <Spiner />
        </div>
      ) : null}
    </div>
  );
}
