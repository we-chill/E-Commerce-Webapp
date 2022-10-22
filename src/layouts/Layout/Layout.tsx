import React, { FC } from 'react';

import Navbar from '@/layouts/Navbar';
import Script from 'next/script';

export interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-white w-screen">
        <div className="w-full h-full">{children}</div>
      </main>
      <Script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js" strategy="lazyOnload" />
    </>
  );
};

export default Layout;
