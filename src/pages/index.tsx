import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import useSettings from '~/utils/hooks/useSettings';

import Header from '~/components/header';

import { api } from '~/utils/api';

export default function Home() {
  const [settings, setSettings] = useSettings();
  const router = useRouter();

  useEffect(() => {
    if (!settings.name || settings.name === '') void router.replace('/login');
  }, []);

  return (
    <>
      <Header name={settings.name ?? 'no-name'} />
    </>
  );
}
