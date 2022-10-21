import clsx from 'clsx';
import React, { FC, HTMLProps } from 'react';
import BoxIcon, { BoxIconProps } from '../BoxIcon/BoxIcon';

export interface IconButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'children'> {
  type?: 'submit' | 'reset' | 'button';
  boxiconName: string;
  boxiconProps?: Omit<BoxIconProps, 'name' | 'color'>;
}

const IconButton: FC<IconButtonProps> = ({
  boxiconName,
  boxiconProps,
  className,
  disabled,
  type = 'button',
  ...props
}) => {
  if (!boxiconName) throw new Error('boxiconName is empty string');

  const iconColor = disabled ? '#A0A0A0' : undefined;

  return (
    <button
      className={clsx([
        'p-2',
        'flex items-center justify-center whitespace-nowrap',
        'hover:bg-[#2632380D]',
        'rounded-full',
        className,
      ])}
      type={type}
      disabled={disabled}
      {...props}
    >
      <BoxIcon name={boxiconName} {...boxiconProps} color={iconColor} />
    </button>
  );
};

export default IconButton;
