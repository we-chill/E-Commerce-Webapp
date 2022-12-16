import { Button, Link } from '@/components';
import { REGEX_VALIDATE_EMAIL, Routes, UserInfoCookieKeys, UserInfoValidation } from '@/constants';
import { getAuthExpiredDate, notify, notifyUpcoming, saveCookie } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Layout } from '@/layouts';

type LoginInputs = {
  email: string;
  password: string;
  rememberLogin: boolean;
};

const ReturnPage: FC = () => {
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

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const shouldRememberLogin = data.rememberLogin;
    const expectedExpiredDate = getAuthExpiredDate();
    const expires = !shouldRememberLogin ? expectedExpiredDate.toUTCString() : '';
    // saveCookie(UserInfoCookieKeys.email, data.email, expires);
    // saveCookie(UserInfoCookieKeys.password, data.password, expires);
    // localStorage.setItem('refresh', 'test');
    // localStorage.setItem('access', 'test');
    // navigateToLandingPage();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/',
        {
          username: data.email,
          password: data.password,
        },
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data) {
        notify('Sign up successfully', { type: 'success' });
        localStorage.setItem('refresh', response.data.refresh);
        localStorage.setItem('access', response.data.access);
        const expectedExpiredDate = getAuthExpiredDate();
        const expires = !shouldRememberLogin ? expectedExpiredDate.toUTCString() : '';
        saveCookie(UserInfoCookieKeys.email, data.email, expires);
        saveCookie(UserInfoCookieKeys.password, data.password, expires);
        navigateToLandingPage();
      }
    } catch (error) {
      notify('Email or password was wrong!', { type: 'error' });
    }
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
      <Link href={Routes.createAccount} className="hover:text-blue-700">
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
    <div className=" w-screen px-40 text-[#2B2B2B]">
      <div className="">
        <h2 className="font-bold text-2xl mt-4">CHÍNH SÁCH THƯƠNG MẠI ĐIỆN TỬ</h2>
        <h4 className=" font-bold text-lg mt-4">Chính sách vận chuyển</h4>
        <ul className="list-disc list-inside">
          <li>Sau khi nhận được đơn hàng từ Người Mua, Công ty sẽ tiến hành chốt đơn và giao cho bên vận chuyển.</li>
          <li>
            Tùy thuộc vào đơn hàng được gửi tới đâu bên vận chuyển sẽ được Công ty thuê một cách hợp lý nhất để giao
            hàng tới Người mua
          </li>
          <li>Thời gian giao hàng được bắt đầu tính từ lúc đơn hàng được giao cho đơn vị vận chuyển thành công.</li>
        </ul>
        <h4 className=" font-bold text-lg mt-4">Thời gian vận chuyển</h4>
        Thời gian vận chuyển cụ thể phụ thuộc vào khoảng cách địa lý giữa Người Mua và Người Bán. Tuy nhiên, thời gian
        chuyển hàng ước tính như sau:
        <ul className="list-disc list-inside">
          <li>Trong phạm vi Nội thành Hồ Chí Minh: 1 - 2 ngày</li>
          <li>TP. Hồ Chí Minh đến các thành phố/thị xã : Tối đa 4 ngày</li>
          <li>TP Hồ Chí Minh đến tuyến huyện/xã của các tỉnh khác: Tối đa 6 ngày</li>
        </ul>
        Lưu ý: Một số đơn hàng có thể sẽ vận chuyển lâu hơn do Người Bán hẹn lại lịch lấy hàng lâu hơn dự kiến hoặc
        Người Mua hẹn giao hàng muộn vì lý do cá nhân. Tuy nhiên với đơn hàng gửi từ công ty trong vòng 1 tháng chưa tới
        khách hàng, khách hàng có thể liên hệ hủy bỏ đơn hàng mà không phải chịu bất cứ chi phí nào.
        <h4 className=" font-bold text-lg mt-4">Chính sách bảo hành</h4>
        Sau khi nhận hàng, khách có thể kiểm tra sản phẩm được giao về số lượng, thời hạn, giá cả,..của sản phẩm. Nếu có
        bất cứ thắc mắc nào có thể liên hệ với Công ty để được giải đáp. <br />* Khách hàng chỉ được đổi trả hàng khi
        đáp ứng các điều kiện:
        <ul className="list-disc list-inside">
          <li>Sản phẩm bị sai hoặc thiếu so với giao dịch lúc đầu</li>
          <li>Sản phẩm hết thời hạn</li>
          <li>
            Sản phẩm chỉ được đổi trả trong vòng 1 ngày kể từ ngày nhận được sản phẩm ( đối với các giao dịch trong nội
            thành), trong vòng 7-10 ngày đối với các giao dịch tại các tỉnh, thành phố khác ( tuy nhiên việc đổi trả
            hàng với giao dịch tại các tỉnh, thành phố khác người mua sau khi nhận được hàng phải liên hệ ngay với Công
            ty và có các chứng cứ xác thực của việc đủ điều kiện đổi trả hàng). Chi phí đổi trả do Công ty chi trả.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReturnPage;

ReturnPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
