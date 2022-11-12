import clsx from 'clsx';
import React, { FC, HTMLProps } from 'react';

export interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  type?: 'submit' | 'reset' | 'button';
  disableBaseClassName?: boolean;
}

const BASE_BUTTON_CLASS_NAME = 'border-2 rounded-lg hover:shadow-lg flex justify-center items-center';

const Button: FC<ButtonProps> = ({ children, className, disableBaseClassName, type = 'button', ...rest }) => {
  const buttonClassName = clsx(['px-4 py-3', className, !disableBaseClassName && BASE_BUTTON_CLASS_NAME]);
  return (
    <button className={buttonClassName} suppressHydrationWarning type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
