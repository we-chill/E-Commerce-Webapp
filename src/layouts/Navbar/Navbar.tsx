import React, { FC } from 'react';
import NextLink from 'next/link';

import { IconButton, SearchBar } from '@/components';
import { BoxIconType } from '@/components/BoxIcon/BoxIcon';
import { getCookie, notify, notifyUpcoming, saveCookie } from '@/utils';
import useStore from '@/store';
import { useRouter } from 'next/router';
import { Routes, UserInfoCookieKeys } from '@/constants';

const Navbar: FC = () => {
  const router = useRouter();
  const setIsMenuOpen = useStore((state) => state.navbarSlideOver.setIsOpen);
  const setIsCartSlideOverOpen = useStore((state) => state.cartSlideOver.setIsOpen);
  const domainTitle = (
    <NextLink href="/" className="text-2xl font-bold">
      WECHILL
    </NextLink>
  );

  const menuButton = <IconButton boxiconName="menu" onClick={() => setIsMenuOpen(true)} />;

  const navigateToLoginPage = () => {
    router.push(Routes.login);
  };
  const onUserProfileClick = () => {
    const userEmail = getCookie(UserInfoCookieKeys.email);
    const hasUserLoggedIn = typeof userEmail !== 'undefined' && userEmail.trim() !== '';
    if (hasUserLoggedIn) {
      if (confirm('Do you want to logout') == true) {
        saveCookie(UserInfoCookieKeys.email, '', '');
      } else {
        notify("You've already logged in.", { type: 'info' });
      }
      return;
    }
    navigateToLoginPage();
  };
  const userProfile = (
    <IconButton
      boxiconName="user-circle"
      boxiconProps={{
        type: BoxIconType.SOLID,
      }}
      onClick={onUserProfileClick}
    />
  );
  const cartButton = <IconButton boxiconName="cart" onClick={() => setIsCartSlideOverOpen(true)} />;

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
    <div className="sticky top-0 bg-white w-full flex justify-center z-10">
      <div className="w-full max-w-320 py-4 px-4 md:px-1 flex flex-row justify-between items-center">
        {domainTitle}
        <SearchBar
          containerClassName="w-[46%] px-6 py-3 bg-[#F5F5F5]"
          height="h-13"
          inputClassName="text-xl"
          onEnter={notifyUpcoming}
        />
        {navbarRight}
      </div>
    </div>
  );
};

export default Navbar;
