import React, { FC } from 'react';
import { Product } from '@/types';
import clsx from 'clsx';

export interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ className, product, onClick }) => {
  // const { name, price } = product;
  const { title, price } = product;

  const _onClick = () => {
    onClick?.(product);
  };

  const cardImage = <div className="w-full h-[13.75rem] bg-[#FEEFEF] rounded-xl"></div>;
  const productPrice = <div className="mt-2 text-xl font-bold">${price}</div>;
  // const productName = <div className="text-[#4C4C4C]">{name}</div>;
  const productName = <div className="text-[#4C4C4C]">{title}</div>;

  return (
    <div className={clsx(['hover:shadow-lg cursor-pointer rounded-xl', className])} onClick={_onClick}>
      {cardImage}
      {productPrice}
      {productName}
    </div>
  );
};

export default ProductCard;
