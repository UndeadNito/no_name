import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

import useSettings from '~/utils/hooks/useSettings';
import { SettingsFields } from './settings-context';

import Header from './header';
import SubscribesMenu from './subscribes-menu';

export default function HeaderLayout({
  children,
  className,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
  const [settings, _] = useSettings();

  return (
    <div className="flex h-full w-full flex-col gap-16 overflow-hidden">
      <Header name={settings.name ?? 'no-name'} className="flex-shrink-0" />
      <div
        className={`page_content flex flex-grow flex-row gap-16 overflow-hidden ${
          className ?? ''
        }`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export function MenuLayout({
  children,
  className,
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) {
  const [settings, setSettings] = useSettings();

  const OnUnSubscribe = (name: string) => {
    setSettings((current) => {
      return {
        ...current,
        subscribes: current.subscribes?.filter((item) => item !== name),
      };
    }, SettingsFields.SUBSCRIBES);
  };

  return (
    <HeaderLayout>
      <SubscribesMenu
        subscribes={settings.subscribes ?? []}
        className="h-full w-1/6"
        onSubscribeDelete={OnUnSubscribe}
        suppressHydrationWarning
      />
      <div
        className={`flex h-full flex-grow flex-col gap-1 ${className ?? ''}`}
        {...props}
      >
        {children}
      </div>
      <div className="w-1/6"></div>
    </HeaderLayout>
  );
}
