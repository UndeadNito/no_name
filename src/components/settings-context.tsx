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
  feedState?: 'all' | 'subs';
};

export enum SettingsFields {
  NAME = 'name',
  SUBSCRIBES = 'subscribes',
  FEED_STATE = 'feedState',
}

export type SettingsState = [
  Settings,
  (setter: (current: Settings) => Settings, reason?: SettingsFields) => void,
];

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
    setSettings((current) => {
      const newValue = setter(current);

      if (reason) {
        updateField(reason, JSON.stringify(newValue[reason]));
      } else {
        updateAll(newValue);
      }

      return newValue;
    });
  };

  return (
    <SettingsContext.Provider value={[settings, Dispatch]}>
      {children}
    </SettingsContext.Provider>
  );
}

const SettingsInit = (): Settings => {
  const result: Settings = {};
  Object.values(SettingsFields).forEach((keyV) => {
    // eslint-disable-next-line
    result[keyV as keyof Settings] = JSON.parse(
      localStorage.getItem(keyV) ?? '{}',
    );
  });

  return result;
};

const updateAll = (value: Settings) => {
  Object.keys(SettingsFields).forEach((key) => {
    const keyValue = value[key as keyof Settings];

    if (keyValue === undefined) return;

    updateField(key as SettingsFields, JSON.stringify(keyValue));
  });
};

const updateField = (field: SettingsFields, value: string) => {
  localStorage.setItem(field, value);
};

export const SettingsContext = createContext<SettingsState>([
  {},
  () => {
    return;
  },
]);
