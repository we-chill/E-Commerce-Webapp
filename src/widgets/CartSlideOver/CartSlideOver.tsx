import React from 'react';

import { SlideOver } from '@/components';
import useStore from '@/store';
import ProductItem from './ProductItem';
import clsx from 'clsx';

const CartSlideOver = () => {
  const { isOpen, setIsOpen } = useStore((state) => state.cartSlideOver);
  const { itemListAndQuantity, totalPrice } = useStore((state) => state.cart);
  const hasAnyItemInCart = Object.keys(itemListAndQuantity).length > 0;

  const title = <div className="text-[32px] font-semibold">Order</div>;

  const productList = (
    <div className="py-3 overflow-y-scroll flex flex-col gap-5 sidebar__product-list">
      {Object.values(itemListAndQuantity).map((item) => (
        <ProductItem key={item.name + item.id} product={item} />
      ))}
    </div>
  );

  const cartTotalPrice = <div className="text-[28px] font-bold text-black">TOTAL: ${totalPrice}</div>;

  const buttonPay = (
    <button
      className={clsx([
        'px-[4.875rem] py-4 rounded-[20px] bg-[#FFCF86] text-xl font-bold color-[#121212]',
        !hasAnyItemInCart ? 'opacity-50' : '',
      ])}
      disabled={!hasAnyItemInCart}
    >
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
