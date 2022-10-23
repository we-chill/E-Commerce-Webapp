import React, { FC, ReactNode } from 'react';

export type HomeLayoutProps = {
  children?: ReactNode;
  Slider?: ReactNode;
  Sidebar?: ReactNode;
};

const HomeLayout: FC<HomeLayoutProps> = ({ children, Slider, Sidebar }) => {
  return (
    <>
      <div className="mt-8 mb-52 w-screen flex flex-col items-center">
        {Slider}
        <div className="w-full max-w-320 grid grid-cols-12">
          <div className="col-span-3">
            <div className="sticky-avoid-navbar z-10">{Sidebar}</div>
          </div>
          <div className="col-span-9">{children}</div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
