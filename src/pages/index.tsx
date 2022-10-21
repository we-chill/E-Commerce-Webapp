import React, { ReactElement } from 'react';
import { Layout } from '@/layouts';
import { NextPageWithLayout } from '@/types';

const HomePage: NextPageWithLayout = () => {
  return (
    <div>
      {' '}
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod possimus
      delectus rem aliquam unde voluptates aliquid ab fugiat, ex voluptatem
      quibusdam ipsam minima eius similique incidunt soluta totam sunt. Ut?
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
