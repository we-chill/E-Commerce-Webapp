import { Button } from '@/components';
import { REGEX_VALIDATE_EMAIL, Routes, UserInfoCookieKeys, UserInfoValidation } from '@/constants';
import { getAuthExpiredDate, notifyUpcoming, saveCookie } from '@/utils';
import { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, ReactElement } from 'react';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Layout, TwoColumnLayout } from '@/layouts';

type CreateAccountInputs = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  rememberLogin: boolean;
};

const sharedInputClassName = 'mt-2 p-3 w-full border-[#D7D7D7] border-2 rounded-lg shadow-sm';

const CreateAccountPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountInputs>();

  const title = <div className="text-5xl font-medium">Welcome to our shop</div>;
  const subTitle = (
    <div className="mt-1 text-lg font-medium text-[#2B2B2B80]">Please enter your contact details to connect.</div>
  );

  const navigateToLandingPage = () => {
    router.replace(Routes.landingPage);
  };

  const Error: FC<{ children: ReactNode }> = ({ children }) => <span className="mt-1 text-red-500">{children}</span>;

  const onSubmit: SubmitHandler<CreateAccountInputs> = (data) => {
    const shouldRememberLogin = data.rememberLogin;
    const expectedExpiredDate = getAuthExpiredDate();
    const expires = !shouldRememberLogin ? expectedExpiredDate.toUTCString() : '';
    saveCookie(UserInfoCookieKeys.email, data.email, expires);
    saveCookie(UserInfoCookieKeys.password, data.password, expires);
    navigateToLandingPage();
  };

  const emailInput = (
    <>
      <div className="font-semibold">Email address</div>
      <input
        className={clsx([sharedInputClassName, errors.email && 'border-red-500'])}
        type="text"
        placeholder="name@compagny.com"
        {...register('email', {
          required: {
            value: true,
            message: 'Email is required',
          },
          pattern: {
            value: REGEX_VALIDATE_EMAIL,
            message: 'Invalid email format',
          },
        })}
      />
      {errors.email ? <Error>{errors.email.message}</Error> : null}
    </>
  );

  const passwordInput = (
    <>
      <div className="font-semibold">Password</div>
      <input
        className={clsx([sharedInputClassName, errors.password && 'border-red-500'])}
        type="password"
        placeholder="******"
        {...register('password', {
          required: {
            value: true,
            message: 'Password is required',
          },
          minLength: {
            value: UserInfoValidation.password.minLength,
            message: 'Password length must greater that 3',
          },
        })}
      />
      {errors.password ? <Error>{errors.password.message}</Error> : null}
    </>
  );

  const phoneInput = (
    <>
      <div className="font-semibold">Phone number</div>
      <input
        className={clsx([sharedInputClassName, errors.phone && 'border-red-500'])}
        type="text"
        placeholder="Phone number"
        {...register('phone', {
          required: {
            value: true,
            message: 'Phone is required',
          },
          minLength: {
            value: UserInfoValidation.password.minLength,
            message: 'Phone length must greater that 3',
          },
        })}
      />
      {errors.phone ? <Error>{errors.phone.message}</Error> : null}
    </>
  );

  const addressInput = (
    <>
      <div className="font-semibold">Address</div>
      <input
        className={clsx([sharedInputClassName, errors.address && 'border-red-500'])}
        type="text"
        placeholder="Address"
        {...register('address', {
          required: {
            value: true,
            message: 'Address is required',
          },
        })}
      />
      {errors.address ? <Error>{errors.address.message}</Error> : null}
    </>
  );

  const signUpForm = (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      {emailInput}
      <div className="mt-6">{passwordInput}</div>
      <div className="mt-6">{phoneInput}</div>
      <div className="mt-6">{addressInput}</div>
      <div className="mt-6 flex justify-between">
        <div>
          <input type="checkbox" id="remember-login" {...register('rememberLogin')} />
          <label htmlFor="remember-login" className="ml-2">
            Remember me
          </label>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <Button type="submit" className="w-full bg-[#FFCF86]">
          Sign Up
        </Button>
        <Button className="w-full border-[#D7D7D7] flex justify-center gap-2" onClick={notifyUpcoming}>
          <img src="/icon-google.svg" alt="google-icon" />
          Sign up with Google
        </Button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="absolute top-[77px] left-8">
        <span className="text-[32px] font-bold">Wechill</span>
      </div>
      <div className="h-full flex-grow flex justify-center items-center">
        <div className="w-full max-w-[23.75rem]">
          {title}
          {subTitle}
          {signUpForm}
        </div>
      </div>
    </div>
  );
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
