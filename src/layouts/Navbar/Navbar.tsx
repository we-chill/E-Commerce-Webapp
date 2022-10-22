import { IconButton, SearchBar } from '@/components';
import { BoxIconType } from '@/components/BoxIcon/BoxIcon';
import React, { FC } from 'react';

const Navbar: FC = () => {
  const domainTitle = (
    <a href="/" className="text-2xl font-bold">
      WECHILL
    </a>
  );

  const menuButton = <IconButton boxiconName="menu" />;
  const userProfile = (
    <IconButton
      boxiconName="user-circle"
      boxiconProps={{
        type: BoxIconType.SOLID,
      }}
    />
  );
  const cartButton = <IconButton boxiconName="cart" />;

  const languageIndicator = <div className="font-medium">US</div>;

  const navbarRight = (
    <div className="flex flex-row items-center space-x-6">
      {menuButton}
      {userProfile}
      {cartButton}
      {languageIndicator}
    </div>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-320 py-4 px-4 md:px-1 flex flex-row justify-between items-center">
        {domainTitle}
        <SearchBar containerClassName="w-[46%] px-6 py-3 bg-[#F5F5F5]" height="h-13" inputClassName="text-xl" />
        {navbarRight}
      </div>
    </div>
  );
};

export default Navbar;
