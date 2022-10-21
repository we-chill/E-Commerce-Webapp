import { BoxIcon, SearchBar } from '@/components';
import { BoxIconType } from '@/components/BoxIcon/BoxIcon';
import React, { FC } from 'react';

const Navbar: FC = () => {
  const domainTitle = (
    <a href="/" className="text-2xl font-bold">
      WECHILL
    </a>
  );

  const navbarRight = (
    <div className="flex flex-row space-x-8">
      <BoxIcon name="menu" />
      <BoxIcon type={BoxIconType.SOLID} name="user-circle" />
      <BoxIcon name="cart" />
      <div>US</div>
    </div>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="mb-8 w-full max-w-320 py-4 px-4 md:px-1 flex flex-row justify-between items-center">
        {domainTitle}
        <SearchBar containerClassName="w-[46%] px-6 py-3 bg-[#F5F5F5]" height="h-13" inputClassName="text-xl" />
        {navbarRight}
      </div>
    </div>
  );
};

export default Navbar;
