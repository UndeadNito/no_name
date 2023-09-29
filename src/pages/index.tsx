import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import useSettings from '~/utils/hooks/useSettings';

import { api } from '~/utils/api';

export default function Home() {
  const [settings, setSettings] = useSettings();
  const router = useRouter();

  useEffect(() => {
    if (!settings.name || settings.name === '') router.replace('/login');
  }, []);

  return <></>;
}
