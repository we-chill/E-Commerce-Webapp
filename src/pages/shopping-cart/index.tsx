import React, { FC, ReactElement, ReactNode, useMemo, useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Routes, UserInfoCookieKeys } from '@/constants';
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { BoxIcon, Button } from '@/components';
import { Layout, TwoColumnLayout } from '@/layouts';
import { NextPageWithLayout, ProductInCart } from '@/types';
import useStore from '@/store';
import clsx from 'clsx';
import { getPaginationArray } from '@/utils/table';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getCookie, notifyUpcoming, saveCookie } from '@/utils';
import { useRouter } from 'next/router';

const sharedInputClassName = 'mt-2 p-3 w-full border-[#D7D7D7] border-2 rounded-lg shadow-sm bg-transparent';

const ShoppingCartPage: NextPageWithLayout = () => {
  const { itemListAndQuantity, increaseProductQuantity, decreaseProductQuantity, totalPrice } = useStore(
    (state) => state.cart
  );

  const navigateToLoginPage = () => {
    router.push(Routes.login);
  };

  useEffect(() => {
    const checkLogin = () => {
      const userEmail = getCookie(UserInfoCookieKeys.email);
      const hasUserLoggedIn = typeof userEmail !== 'undefined' && userEmail.trim() !== '';
      if (hasUserLoggedIn) {
        return;
      } else {
        navigateToLoginPage();
      }
    };
    checkLogin();
  }, []);
  const data = useMemo(() => Object.values(itemListAndQuantity), [itemListAndQuantity]);
  const columns = useMemo<ColumnDef<ProductInCart>[]>(
    () => [
      {
        header: 'Product',
      },
      {
        header: 'Price',
      },
      {
        header: 'Quantity',
      },
      {
        header: 'Total price',
      },
      {
        header: '',
        id: 'actions',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    //
    debugTable: true,
  });

  const router = useRouter();

  const navigateToLandingPage = () => {
    router.replace(Routes.landingPage);
  };

  const title = <div className="text-[52px] font-bold">Shopping Cart</div>;

  const buttonBack = (
    <Button type="submit" className="bg-[#FFCF86] rounded-[40px]" onClick={navigateToLandingPage}>
      <BoxIcon name="chevron-left" size="sm" />
      <span className="ml-2 text-sm font-medium">Back</span>
    </Button>
  );

  const currentNumOfShownItems = table.getRowModel().rows.length;
  const totalItems = Object.keys(itemListAndQuantity).length;
  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  const isCurrentPage = (pageIndex: number) => pageIndex === currentPage;
  const buttonPageClassName = (pageIndex: number) => {
    const disableHoverEffect = pageIndex === -1;
    return clsx([
      'w-8 h-8 rounded-full flex items-center justify-center font-semibold',
      isCurrentPage(pageIndex) ? 'bg-[#0B808F] text-white' : 'text-[#0B808F]',
      disableHoverEffect ? '' : 'cursor-pointer hover:shadow-lg',
    ]);
  };

  const ButtonPage: FC<{ pageIndex: number }> = ({ pageIndex }) => {
    const isRenderingDots = pageIndex === -1;
    return (
      <div
        className={buttonPageClassName(pageIndex)}
        onClick={() => {
          if (!isRenderingDots) {
            table.setPageIndex(pageIndex);
          }
        }}
      >
        {isRenderingDots ? '...' : pageIndex + 1}
      </div>
    );
  };

  const pagination = (
    <div className="flex justify-between">
      <div className="flex items-center text-sm text-[#747474]">
        {currentNumOfShownItems} of {totalItems} items
      </div>
      <div className="flex gap-2">
        {getPaginationArray({ totalPages, currentPageIndex: currentPage }).map((pageIndex, id) => (
          <ButtonPage key={`pagination-001-${pageIndex}-${id}`} pageIndex={pageIndex} />
        ))}
      </div>
      <div className="pr-4 flex items-center">
        Show
        <select
          className="ml-3 text-[#0B808F] font-semibold"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} rows
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const basePadding = 'px-3 py-5';

  return (
    <div>
      {title}
      <div className="my-7">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#F5F5F5]">
                {headerGroup.headers.map((header) => {
                  const headerInfo = header.column.columnDef;
                  return (
                    <th key={header.id} className={clsx(['text-left text-xs text-[#747474]', basePadding])}>
                      {header.isPlaceholder ? null : flexRender(headerInfo.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const product = row.original;
              const buttonCountClassName =
                'w-3 h-3 flex justify-center items-center rounded-full cursor-pointer hover:shadow-lg hover:bg-neutral-100';
              const buttonDecreaseCount = (
                <button
                  type="button"
                  className={buttonCountClassName}
                  onClick={() => decreaseProductQuantity(product.id, 1)}
                >
                  <BoxIcon name="minus" />
                </button>
              );
              const buttonIncreaseCount = (
                <button
                  type="button"
                  className={buttonCountClassName}
                  onClick={() => increaseProductQuantity(product.id, 1)}
                >
                  <BoxIcon name="plus" />
                </button>
              );
              const productCountController = (
                <div className="flex items-center gap-3">
                  {buttonDecreaseCount}
                  <span>{product.count}</span>
                  {buttonIncreaseCount}
                </div>
              );

              return (
                <tr key={row.id} className="h-16 border-b-2">
                  <td>
                    <div className="px-3 py-5 flex flex-row items-center">
                      <img src="/sports-soccer.svg" alt="google-icon" className="w-8 h-8 mr-2" />
                      <div>
                        <div>{product.name}</div>
                        <div className="text-sm text-[#747474]">{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className={basePadding}>${product.price}</td>
                  <td className={basePadding}>{productCountController}</td>
                  <td className={basePadding}>${product.count * product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="h-6" />
        {pagination}
      </div>
      {buttonBack}
    </div>
  );
};

export default ShoppingCartPage;

type CardInputs = {
  name: string;
  number: string;
  exp: Date;
  cvv2: string;
  password: string;
};

ShoppingCartPage.getLayout = function getLayout(page: ReactElement) {
  const [isPayment, setIsPayment] = useState(false);
  const router = useRouter();
  const { totalPrice } = useStore((state) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardInputs>();

  const Error: FC<{ children: ReactNode }> = ({ children }) => <span className="mt-1 text-red-500">{children}</span>;

  const nameInput = (
    <>
      <div className="font-semibold">Name</div>
      <input
        className={clsx([sharedInputClassName, errors.password && 'border-red-500'])}
        type="text"
        placeholder="My card name"
        {...register('name', {
          required: {
            value: true,
            message: 'Card name require',
          },
        })}
      />
      {errors.name ? <Error>{errors.name.message}</Error> : null}
    </>
  );

  const expInput = (
    <div className="flex justify-between w-full gap-2">
      <div className="w-full">
        <div className="font-semibold">Expire date</div>
        <input
          className={clsx([sharedInputClassName, errors.exp && 'border-red-500'])}
          type="date"
          placeholder="Expire date"
          {...register('exp', {})}
        />
        {errors.exp ? <Error>{errors.exp?.message}</Error> : null}
      </div>
      <div className="w-full">
        <div className="font-semibold">CVV2</div>
        <input
          className={clsx([sharedInputClassName, errors.cvv2 && 'border-red-500'])}
          type="text"
          placeholder="cvv2"
          {...register('cvv2', {})}
        />
        {errors.cvv2 ? <Error>{errors.cvv2?.message}</Error> : null}
      </div>
    </div>
  );

  const numberInput = (
    <>
      <div className="font-semibold">Card number</div>
      <input
        className={clsx([sharedInputClassName, errors.password && 'border-red-500'])}
        type="text"
        placeholder="Card number"
        {...register('number', {
          required: {
            value: true,
            message: 'Card number require',
          },
        })}
      />
      {errors.number ? <Error>{errors.number.message}</Error> : null}
    </>
  );

  const passwordInput = (
    <>
      <div className="font-semibold">
        Password<span>{' (Optional)'}</span>
      </div>
      <input
        className={clsx([sharedInputClassName, errors.password && 'border-red-500'])}
        type="password"
        placeholder="Password"
        {...register('password', {})}
      />
      {errors.number ? <Error>{errors.password?.message}</Error> : null}
    </>
  );

  const onSubmit: SubmitHandler<CardInputs> = (data) => {
    saveCookie('card-number', data.number);
    setIsPayment(true);
  };

  const payPalButton = (
    <PayPalScriptProvider
      options={{
        'client-id': 'Ae0hsMHQSEQ4MnjdNVjWUZ_j_GXRGX7EOe1ILeS5qP6f6nw1zBfJwW1vGS22w-HKAkFLi3gJ85Yu1m2y',
        currency: 'USD',
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            //Phần này sau khi thanh toán xong em nghĩ nên set một đơn hàng vô localstorage
            const transaction = details.purchase_units[0].payments.captures[0];
            if (transaction.status === 'COMPLETED') {
              alert(`Giao dịch thành công. Trở về trang chủ sau 3 giây`);
              setTimeout(() => {
                router.replace(Routes.landingPage);
              }, 3000);
            } else {
              alert('Giao dịch thất bại vui lòng thử lại');
            }
          });
        }}
      />
    </PayPalScriptProvider>
  );

  const paymentForm = (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full">
      <div className="mt-4">{nameInput}</div>
      <div className="mt-4">{numberInput}</div>
      <div className="mt-4">{expInput}</div>
      <div className="mt-4">{passwordInput}</div>
      <div className="mt-4 flex justify-between flex-col gap-4">
        <Button
          disableBaseClassName={true}
          type="submit"
          className="w-full bg-white block rounded-xl border-2 flex justify-center gap-2 font-semibold"
        >
          Proceed to confirm
        </Button>
        {payPalButton}
      </div>
    </form>
  );

  const RightSidebar = (
    <div className="w-full h-full bg-[#FFCF86] rounded-[20px] p-16 flex justify-center flex-col">
      <div className="font-bold text-xl text-center w-full">Payment info</div>
      <div className="mt-4">
        <h6 className="font-semibold text-lg">Total price</h6>
        <span className=" font-semibold text-3xl">${totalPrice}</span>
        <div className="mt-3">
          <h6 className="font-bold">Payment method</h6>
          <div className="flex gap-2">
            <Button
              disableBaseClassName={true}
              className="rounded-3xl bg-[#9c9c9c] px-3 py-2 opacity-60"
              onClick={notifyUpcoming}
            >
              Paypal
            </Button>
            <Button disableBaseClassName={true} className="rounded-3xl bg-[#ffffff] px-3 py-2 flex justify-around">
              <BoxIcon name="check" /> Credit
            </Button>
            <Button
              disableBaseClassName={true}
              className="rounded-3xl bg-[#9c9c9c] px-3 py-2 opacity-60"
              onClick={notifyUpcoming}
            >
              Momo
            </Button>
          </div>
        </div>
        {paymentForm}
      </div>
    </div>
  );

  const Payment = (
    <div className="w-full h-full bg-[#FFCF86] rounded-[20px] px-16 py-12 flex items-center flex-col">
      <div className="flex justify-around gap-20">
        <Button disableBaseClassName={true} className="text-lg font-semibold">
          Card
        </Button>
        <Button disableBaseClassName={true} className="text-lg font-semibold opacity-40" onClick={notifyUpcoming}>
          Wallet
        </Button>
      </div>
      <div>
        <img src="/master-card.png" className="w-full h-auto" />
        <Button
          disableBaseClassName={true}
          className=" flex justify-center font-semibold mt-4 rounded-3xl w-full border-dashed border-2 border-[#006187] bg-[#ededed]"
        >
          <BoxIcon name="plus" />
          Add new cart
        </Button>
      </div>
      <div className="mt-4">
        <div className="flex gap-3 items-center">
          <div className="w-[50px] h-[50px] bg-[#ededed] flex justify-center items-center rounded-lg">
            <BoxIcon name="map-alt" />
          </div>
          <div>Ho Chi Minh City of Technology</div>
        </div>
        <div className="flex gap-3 items-center mt-3">
          <div className="w-[50px] h-[50px] bg-[#ededed] flex justify-center items-center rounded-lg">
            <BoxIcon name="car" />
          </div>
          <div>wednesday 04:00 pm</div>
        </div>
        <div className="mt-3">
          <table>
            <thead>
              <tr>
                <th className="w-80"></th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td className="text-right">200 $</td>
              </tr>
              <tr>
                <td>Postage</td>
                <td className="text-right">20 $</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td className="text-right">10 $</td>
              </tr>
              <tr className="mt-4 font-semibold text-2xl">
                <td>Total price</td>
                <td className="text-right">230 $</td>
              </tr>
            </tbody>
          </table>
          <Button disableBaseClassName={true} className="font-semibold mt-4 rounded-3xl w-full bg-[#ededed]">
            Pay
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <TwoColumnLayout RightSidebar={isPayment ? Payment : RightSidebar}>{page}</TwoColumnLayout>
    </Layout>
  );
};
