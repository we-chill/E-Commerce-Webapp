import { Product } from '@/types';
import clsx from 'clsx';
import React, { FC } from 'react';
import BoxIcon from '../BoxIcon';
import { BoxIconType } from '../BoxIcon/BoxIcon';

const enum StarState {
  EMPTY = 'empty',
  HALF = 'half',
  FULL = 'full',
}
interface StarIconProps {
  state?: StarState;
}
const StarIcon: FC<StarIconProps> = ({ state = StarState.EMPTY }) => {
  const isEmpty = state === StarState.EMPTY;
  const isHalf = state === StarState.HALF;
  const iconName = isHalf ? 'star-half' : 'star';

  return (
    <div className="w-4 h-4">
      <div className="relative">
        {!isEmpty && <BoxIcon type={BoxIconType.SOLID} name={iconName} color="#FFE870" />}
        <div className="block absolute inset-0">
          <BoxIcon name="star" />
        </div>
      </div>
    </div>
  );
};

export interface ProductModalProps {
  product: Product;
  onClose?: () => void;
}

const ProductModal: FC<ProductModalProps> = ({ product, onClose }) => {
  const renderLeftSection = () => {
    const title = <div className="text-sm font-medium">{product.title ?? 'Product Title'}</div>;
    const name = <div className="text-2xl font-bold uppercase">{product.name}</div>;
    const description = product.description ? <div className="text-xs">{product.description}</div> : null;

    const info = (
      <div className="flex flex-col gap-3">
        {title}
        {name}
        {description}
      </div>
    );

    const price = (
      <div>
        <div className="text-xl font-medium uppercase">PRICE</div>
        <div className="text-[32px] font-bold">${product.price}</div>
      </div>
    );

    const smallImage = <div className="w-15 h-15 bg-[#C1C1C1] rounded-2xl" />;
    const smallImagesSection = (
      <div className="flex gap-2">
        {smallImage}
        {smallImage}
        {smallImage}
        {smallImage}
      </div>
    );

    return (
      <div className="flex flex-col gap-[59px] text-justify">
        {info}
        {price}
        {smallImagesSection}
      </div>
    );
  };

  const centerSection = <div className="w-[26.25rem] h-[26.25rem] bg-[#E0E0E0] rounded-full" />;
  const renderRightSection = () => {
    const techInfo = product.technicalInformation ? (
      <div className="text-xs">{product.technicalInformation}</div>
    ) : null;

    const rating = (
      <div className="flex gap-4">
        <StarIcon state={StarState.FULL} />
        <StarIcon state={StarState.FULL} />
        <StarIcon state={StarState.FULL} />
        <StarIcon state={StarState.HALF} />
        <StarIcon state={StarState.EMPTY} />
      </div>
    );
    const reviewSection = (
      <div className="mt-5 flex justify-between">
        <div className="text-black uppercase">Reviews</div>
        {rating}
      </div>
    );

    const buttonAddToCart = (
      <button className="py-4 px-14 max-w-[15.25rem] self-center uppercase text-xl font-semibold text-[#121212] bg-[#FFCF86] rounded-[20px] hover:shadow-md">
        Add to cart
      </button>
    );

    return (
      <div className="flex-grow max-w-[20rem] text-justify flex flex-col justify-between">
        <div>
          <div className="text-xl font-medium">Technical information</div>
          {techInfo}
          {reviewSection}
        </div>
        {buttonAddToCart}
      </div>
    );
  };

  const buttonClose = (
    <button
      onClick={onClose}
      className={clsx(
        'absolute top-11 right-12',
        'inline-flex items-center justify-center w-7 h-7 hover:shadow-md rounded-full outline-none z-50'
      )}
    >
      <BoxIcon name="x" />
    </button>
  );

  return (
    <div
      className={clsx([
        'relative',
        'flex justify-between gap-12',
        'w-full max-w-320',
        'px-[3.75rem] py-[8.125rem]',
        'bg-white rounded-[40px]',
      ])}
    >
      <div className="max-w-[20rem] flex-grow">{renderLeftSection()}</div>
      <div>{centerSection}</div>
      {renderRightSection()}
      {buttonClose}
    </div>
  );
};

export default ProductModal;
