import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import useSettings from '~/utils/hooks/useSettings';

import SwitchButton from './switch-button';
import { SettingsFields } from './settings-context';

export default function FeedMenu({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const [settings, setSettings] = useSettings();

  return (
    <div
      className={`flex min-w-max flex-col gap-4 overflow-hidden rounded-tl-lg border-l border-t border-borderMain px-4 py-2 text-fontMain backdrop-blur ${
        className ?? ''
      }`}
      {...props}
    >
      <span className="text-xl">Show me:</span>
      <SwitchButton
        chosen={settings.feedState === 'subs' ? 1 : 0}
        onChose={(idx, _) =>
          setSettings((curr) => {
            curr.feedState = idx === 0 ? 'all' : 'subs';
            return { ...curr };
          }, SettingsFields.FEED_STATE)
        }
      >
        <span>all</span>
        <span>subscriptions</span>
      </SwitchButton>
    </div>
  );
}
