import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../contexts/Auth';

import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
