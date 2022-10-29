import React from 'react';

import { SlideOver } from '@/components';
import useStore from '@/store';
import ProductItem from './ProductItem';
import { MOCK_100_PRODUCTS } from '@/constants';

const ITEM_LIST_AND_QUANTITY = {
  0: {
    ...MOCK_100_PRODUCTS[0],
    count: 1,
  },
  1: {
    ...MOCK_100_PRODUCTS[1],
    count: 1,
  },
  2: {
    ...MOCK_100_PRODUCTS[2],
    count: 1,
  },
};

const totalPrice = Object.values(ITEM_LIST_AND_QUANTITY).reduce(
  (prevTotal, item) => prevTotal + item.count * item.price,
  0
);

const CartSlideOver = () => {
  const { isOpen, setIsOpen } = useStore((state) => state.cartSlideOver);
  // const { itemListAndQuantity } = useStore((state) => state.cart);

  const title = <div className="text-[32px] font-semibold">Order</div>;

  const productList = (
    <div className="py-3 overflow-y-scroll flex flex-col gap-5">
      {Object.values(ITEM_LIST_AND_QUANTITY).map((item) => (
        <ProductItem key={item.name + item.id} product={item} />
      ))}
    </div>
  );

  const cartTotalPrice = <div className="text-[28px] font-bold text-black">TOTAL: ${totalPrice}</div>;

  const buttonPay = (
    <button className="px-[4.875rem] py-4 rounded-[20px] bg-[#FFCF86] text-xl font-bold color-[#121212]">
      Pay Now
    </button>
  );

  return (
    <SlideOver isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col">
        {title}
        {productList}
        <div className="mt-2 flex flex-col items-center gap-[89px]">
          {cartTotalPrice}
          {buttonPay}
        </div>
      </div>
    </SlideOver>
  );
};

export default CartSlideOver;
