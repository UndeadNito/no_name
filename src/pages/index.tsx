import useSettings from '~/utils/hooks/useSettings';
import { api } from '~/utils/api';

import { DoubleMenuLayout } from '~/components/layout';
import InfiniteScrollFeed from '~/components/infinite-scroll-feed';
import WritePost from '~/components/write-post';

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
    <DoubleMenuLayout>
      <WritePost
        userName={settings.name ?? 'no-name'}
        className="w-full"
        placeholder="Something in mind?"
        onNewPost={OnNewPost} //eslint-disable-line
      />
      <InfiniteScrollFeed
        names={settings.feedState === 'subs' ? settings.subscribes : undefined}
        updateKey={newPostMutation.data?.id}
        className="w-full flex-grow"
      />
    </DoubleMenuLayout>
  );
}
