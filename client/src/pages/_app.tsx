import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../contexts/Auth';
import { CommentsContextProvider } from '../contexts/Comments';

import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CommentsContextProvider>
        <Component {...pageProps} />
      </CommentsContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
