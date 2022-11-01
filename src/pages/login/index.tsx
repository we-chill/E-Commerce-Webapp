import { Button, Link } from '@/components';
import { REGEX_VALIDATE_EMAIL, Routes, UserInfoCookieKeys, UserInfoValidation } from '@/constants';
import { getAuthExpiredDate, notifyUpcoming, saveCookie } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginInputs = {
  email: string;
  password: string;
  rememberLogin: boolean;
};

const LoginPage: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const title = <div className="text-5xl font-medium">Welcome back</div>;
  const subTitle = (
    <div className="mt-1 text-lg font-medium text-[#2B2B2B80]">Please enter your contact details to connect.</div>
  );

  const navigateToLandingPage = () => {
    router.replace(Routes.landingPage);
  };

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    const shouldRememberLogin = data.rememberLogin;
    const expectedExpiredDate = getAuthExpiredDate();
    const expires = !shouldRememberLogin ? expectedExpiredDate.toUTCString() : '';
    saveCookie(UserInfoCookieKeys.email, data.email, expires);
    saveCookie(UserInfoCookieKeys.password, data.password, expires);
    navigateToLandingPage();
  };

  const sharedInputClassName = 'mt-2 p-3 w-full border-[#D7D7D7] border-2 rounded-lg shadow-sm';

  const Error: FC<{ children: ReactNode }> = ({ children }) => <span className="mt-1 text-red-500">{children}</span>;

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

  const loginForm = (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      {emailInput}
      <div className="mt-6">{passwordInput}</div>
      <div className="mt-6 flex justify-between">
        <div>
          <input type="checkbox" id="remember-login" {...register('rememberLogin')} />
          <label htmlFor="remember-login" className="ml-2">
            Remember me
          </label>
        </div>
        <Link disabled className="cursor-pointer" href={''} onClick={notifyUpcoming}>
          Forgot password
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <Button type="submit" className="w-full bg-[#FFCF86]">
          Log in
        </Button>
        <Button className="w-full border-[#D7D7D7] flex justify-center gap-2" onClick={notifyUpcoming}>
          <img src="/icon-google.svg" alt="google-icon" />
          Log in with Google
        </Button>
      </div>
    </form>
  );

  const signUpSection = (
    <div className="mt-6 text-center">
      Don’t have an account?{' '}
      <Link href={Routes.home} className="hover:text-blue-700">
        Sign up here
      </Link>
    </div>
  );

  const rightHandSideCover = (
    <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-purple-600">
      <Image src={'/cover.png'} layout="fill" quality={65} />;
    </div>
  );

  return (
    <div className="grid grid-cols-2 w-screen h-screen text-[#2B2B2B]">
      <div className="px-4 py-8 flex flex-col">
        <div className="absolute top-[77px] left-8">
          <span className="text-[32px] font-bold">Wechill</span>
        </div>
        <div className="h-full flex-grow flex justify-center items-center">
          <div className="w-full max-w-[23.75rem]">
            {title}
            {subTitle}
            {loginForm}
            {signUpSection}
          </div>
        </div>
      </div>
      <div className="px-4 py-8">{rightHandSideCover}</div>
    </div>
  );
};

export default LoginPage;
