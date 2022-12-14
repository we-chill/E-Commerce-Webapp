import React, { FC, ReactNode, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Routes } from '@/constants';

import { BoxIcon, Button } from '@/components';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { notifyUpcoming, saveCookie } from '@/utils';
import { useRouter } from 'next/router';
import useStore from '@/store';

const sharedInputClassName = 'mt-2 p-3 w-full border-[#D7D7D7] border-2 rounded-lg shadow-sm bg-transparent';

type CardInputs = {
  name: string;
  number: string;
  exp: Date;
  cvv2: string;
  password: string;
};

const RightSidebar = () => {
  const router = useRouter();
  const { totalPrice, itemListAndQuantity } = useStore((state) => state.cart);
  const shouldDisablePayment = totalPrice <= 0 || Object.keys(itemListAndQuantity).length < 1;

  const [isPayment, setIsPayment] = useState(false);

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
        disabled={shouldDisablePayment}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '1.99',
                },
              },
            ],
          });
        }}
        onApprove={(_, actions) => {
          if (!actions.order) {
            return Promise.reject();
          }

          return actions.order.capture().then((details) => {
            if (!details.purchase_units) {
              return Promise.reject('Purcahse unit is empty');
            }

            const firstPurchaseUnits = details.purchase_units[0];
            if (!firstPurchaseUnits.payments || !firstPurchaseUnits.payments.captures) {
              return Promise.reject('Payment is undefined');
            }

            //Ph???n n??y sau khi thanh to??n xong em ngh?? n??n set m???t ????n h??ng v?? localstorage
            const transaction = firstPurchaseUnits.payments.captures[0];
            if (transaction.status === 'COMPLETED') {
              alert(`Giao d???ch th??nh c??ng. Tr??? v??? trang ch??? sau 3 gi??y`);
              setTimeout(() => {
                router.replace(Routes.landingPage);
              }, 3000);
            } else {
              alert('Giao d???ch th???t b???i vui l??ng th??? l???i');
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
          disabled={shouldDisablePayment}
          disableBaseClassName={true}
          type="submit"
          className={clsx([
            'w-full bg-white xl flex justify-center gap-2 font-semibold',
            shouldDisablePayment ? 'opacity-50' : '',
          ])}
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
          <div className="flex gap-2 mt-2">
            <Button disableBaseClassName={true} className="rounded-3xl bg-[#ffffff] px-3 py-2 flex justify-around">
              <BoxIcon name="check" />
              Paypal / Credit
            </Button>
            <Button
              disabled
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

  return isPayment ? Payment : RightSidebar;
};

export default RightSidebar;
