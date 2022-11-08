import { Layout, TwoColumnLayout } from '@/layouts';
import { NextPageWithLayout } from '@/types';
import React, { ReactElement } from 'react';

const ShoppingCartPage: NextPageWithLayout = () => {
  return <div>Shopping Cart</div>;
};

export default ShoppingCartPage;

ShoppingCartPage.getLayout = function getLayout(page: ReactElement) {
  const RightSidebar = <div className="w-full h-full bg-[#FFCF86] rounded-[20px]" />;
  return (
    <Layout>
      <TwoColumnLayout RightSidebar={RightSidebar}>{page}</TwoColumnLayout>
    </Layout>
  );
};
