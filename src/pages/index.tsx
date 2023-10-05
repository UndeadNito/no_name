import { Suspense, useState } from 'react';

import useSettings from '~/utils/hooks/useSettings';
import { api } from '~/utils/api';

import { MenuLayout } from '~/components/layout';
import InfiniteScrollFeed from '~/components/infinite-scroll-feed';
import WritePost from '~/components/write-post';
import Spiner from '~/components/spiner';

export default function Home() {
  const [settings, _] = useSettings();
  const newPostMutation = api.posts.makePost.useMutation();

  const OnNewPost = async (text: string) => {
    await newPostMutation.mutateAsync({
      name: settings.name ?? 'no-name',
      text: text,
    });
  };

  return (
    <MenuLayout>
      <WritePost
        userName={settings.name ?? 'no-name'}
        className="w-full"
        placeholder="Something in mind?"
        onNewPost={OnNewPost} //eslint-disable-line
      />
      <Suspense
        fallback={
          <div className='flex-grow" w-full'>
            <Spiner />
          </div>
        }
      >
        <InfiniteScrollFeed
          updateKey={newPostMutation.data?.id}
          className="w-full flex-grow"
        />
      </Suspense>
    </MenuLayout>
  );
}
