import { useEffect, useState } from 'react';

import { type AppType } from 'next/app';
import router from 'next/router';

import { api } from '~/utils/api';

import SettingsProvider from '~/components/settings-context';

import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (!firstRender && !localStorage.getItem('name'))
      void router.replace('/login');
  }, [firstRender]);

  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
};

export default api.withTRPC(MyApp);
