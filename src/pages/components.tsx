import React, { ReactElement } from 'react';

import { BoxIcon } from '@/components';
import { Layout } from '@/layouts';
import { NextPageWithLayout } from '@/types';

const ComponentsPage: NextPageWithLayout = () => {
  return <BoxIcon name="rocket" />;
};

export default ComponentsPage;

ComponentsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
