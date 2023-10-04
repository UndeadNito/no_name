import { useRouter } from 'next/router';

import { MenuLayout } from '~/components/layout';
import InfiniteScrollFeed from '~/components/infinite-scroll-feed';

import { ReactComponent as Arrow } from '~/icons/arrow.svg';

export default function UserPage() {
  const router = useRouter();

  return (
    <MenuLayout className="relative">
      <InfiniteScrollFeed
        name={router.query.name as string}
        className="w-full flex-grow rounded-t-lg"
      />
      <Arrow
        className="absolute left-0 top-2 h-8 w-8 -translate-x-8 cursor-pointer rounded-l border border-r-0 border-borderMain p-2 text-fontMain"
        onClick={() => void router.push('/')}
      />
    </MenuLayout>
  );
}
