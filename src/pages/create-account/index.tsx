import { Layout, TwoColumnLayout } from '@/layouts';
import { NextPageWithLayout } from '@/types';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type CreateAccountInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
};

const CreateAccountPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountInputs>();

  return <div>Create account</div>;
};

export default CreateAccountPage;

CreateAccountPage.getLayout = function getLayout(page: ReactElement) {
  const RightSidebar = <div className="w-full h-full bg-[#FFCF86] rounded-[20px]" />;
  return (
    <Layout>
      <TwoColumnLayout RightSidebar={RightSidebar}>{page}</TwoColumnLayout>
    </Layout>
  );
};
