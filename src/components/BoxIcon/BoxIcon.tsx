import React, { FC } from 'react';

export const enum BoxIconType {
  REGULAR = 'regular',
  SOLID = 'solid',
}

/**
 * These props base on https://boxicons.com/usage#styling
 */
interface BoxIconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rotate?: '90' | '180' | '270';
  flip?: 'horizontal' | 'vertical';
  pull?: 'left' | 'right';
  type?: BoxIconType;
}

const BoxIcon: FC<BoxIconProps> = ({ type = BoxIconType.REGULAR, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <box-icon type={type === 'solid' ? BoxIconType.SOLID : undefined} {...props} />;
};

export default BoxIcon;
