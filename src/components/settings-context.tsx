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

/* eslint-disable */
const SettingsInit = (): Settings => {
  const result: Settings = {};
  Object.values(SettingsFields).forEach((settingsValueName) => {
    const settingsValue = localStorage.getItem(settingsValueName);
    let settingsObject: any;

    if (settingsValue !== null) {
      try {
        settingsObject = JSON.parse(settingsValue);
      } catch {}

      result[settingsValueName as keyof Settings] =
        settingsObject ?? settingsValue;
    }
  });

  return result;
};
/* eslint-enable */

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
