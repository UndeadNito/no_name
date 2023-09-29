import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import SettingsProvider from '~/components/settings-context';

import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
};

export default api.withTRPC(MyApp);
