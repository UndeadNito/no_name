'use client';

import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
} from 'react';

export type Settings = {
  name?: string;
  subscribes?: string[];
};

export type SettingsState = [
  Settings,
  (setter: (current: Settings) => Settings, reason?: SettingsFields) => void,
];

export enum SettingsFields {
  NAME = 'name',
  SUBSCRIBES = 'subscribes',
}

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    setSettings(() => {
      return SettingsInit();
    });
  }, []);

  const Dispatch = (
    setter: (current: Settings) => Settings,
    reason?: SettingsFields,
  ) => {
    const updateResult = setter(settings);
    switch (reason) {
      default:
      case SettingsFields.NAME: {
        updateName(updateResult.name ?? '');
        if (reason) break;
      }
      case SettingsFields.SUBSCRIBES: {
        updateSubscribes(updateResult.subscribes ?? []);
        if (reason) break;
      }
    }

    setSettings(updateResult);
  };

  return (
    <SettingsContext.Provider value={[settings, Dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
}

const SettingsInit = (): Settings => {
  const nameString = localStorage.getItem(SettingsFields.NAME);
  const subscribesString = localStorage.getItem(SettingsFields.SUBSCRIBES);

  return {
    name: nameString ?? undefined,
    subscribes: subscribesString
      ? (JSON.parse(subscribesString) as string[])
      : undefined,
  };
};

const updateName = (name: string) => {
  localStorage.setItem(SettingsFields.NAME, name);
};

const updateSubscribes = (subscribes: string[]) => {
  localStorage.setItem(SettingsFields.SUBSCRIBES, JSON.stringify(subscribes));
};

export const SettingsContext = createContext<SettingsState>([{}, () => {}]); // eslint-disable-line
