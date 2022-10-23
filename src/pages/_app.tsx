import React from 'react';
import '@/styles/globals.css';
import { NextPageWithLayout } from '@/types';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <ToastContainer />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
