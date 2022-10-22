import React, { FC, ReactNode } from 'react';

export type HomeLayoutProps = {
  children?: ReactNode;
  Slider?: ReactNode;
  Sidebar?: ReactNode;
};

const HomeLayout: FC<HomeLayoutProps> = ({ children, Slider, Sidebar }) => {
  return (
    <div className="mt-8 w-screen flex flex-col items-center">
      {Slider}
      <div className="w-full max-w-320 grid grid-cols-12">
        <div className="col-span-3">
          <div className="sticky z-30 top-4 sm:top-6 heightAvoidNavBarResponsive sm:heightAvoidNavBar">{Sidebar}</div>
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
};

export default HomeLayout;
