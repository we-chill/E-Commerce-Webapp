import { BoxIcon } from '@/components';
import useStore from '@/store';
import { ProductInCart } from '@/types';
import clsx from 'clsx';
import React, { FC } from 'react';

export interface ProductItemProps {
  product: ProductInCart;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const {
    increaseProductQuantity: increaseItemQuantity,
    decreaseProductQuantity: decreaseItemQuantity,
    removeProductFromCart: removeItemFromCart,
  } = useStore((state) => state.cart);
  const image = <div className="w-[6.25rem] h-[7.5rem] bg-[#FFC3C3] rounded-[20px]" />;

  const productInfo = (
    <>
      <div className="font-semibold">{product.name}</div>
      <div className="mt-2 text-xs">{product.title ?? 'Product title'}</div>
      <div className="justify-self-end text-2xl font-extrabold">${product.price}</div>
    </>
  );

  const buttonRemove = (
    <button
      type="button"
      className="w-6 h-6 self-end flex justify-center items-center rounded-full cursor-pointer hover:shadow-md"
      onClick={() => removeItemFromCart(product.id)}
    >
      <BoxIcon name="x" />
    </button>
  );

  const buttonCountClassName =
    'w-3 h-3 flex justify-center items-center rounded-full cursor-pointer hover:shadow-lg hover:bg-neutral-100';

  const buttonDecreaseCount = (
    <button type="button" className={buttonCountClassName} onClick={() => decreaseItemQuantity(product.id, 1)}>
      <BoxIcon name="minus" />
    </button>
  );
  const buttonIncreaseCount = (
    <button type="button" className={buttonCountClassName} onClick={() => increaseItemQuantity(product.id, 1)}>
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
  const actionSection = (
    <div className="flex flex-col justify-between">
      {buttonRemove}
      {productCountController}
    </div>
  );

  return (
    <div className={clsx(['px-4 py-3 w-full bg-white rounded-[20px] shadow-lg', 'flex'])}>
      {image}
      <div className="ml-5 h-full flex flex-col flex-grow">{productInfo}</div>
      {actionSection}
    </div>
  );
};

export default ProductItem;
