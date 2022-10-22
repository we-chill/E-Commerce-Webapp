import React, { FC } from 'react';
import clsx from 'clsx';

import { BoxIcon } from '@/components';

export interface SidebarItemProps {
  label: string;
  boxiconName?: string;

  isActive?: boolean;

  onClick?: () => void;
}

const SidebarItem: FC<SidebarItemProps> = ({ label, boxiconName, onClick, isActive }) => {
  let icon;
  if (boxiconName && boxiconName.trim() !== '') {
    icon = <BoxIcon name={boxiconName} />;
  }
  return (
    <div
      className={clsx([
        'px-7 w-full h-[3.75rem]',
        'rounded-[20px]',
        isActive ? 'bg-[#FFCF86]' : 'bg-[#F5F5F5] ',
        'flex justify-between items-center',
        'cursor-pointer hover:shadow-xl',
      ])}
      onClick={onClick}
    >
      {label}
      {icon}
    </div>
  );
};

export default SidebarItem;
