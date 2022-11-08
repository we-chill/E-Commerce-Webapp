import React, { FC, ReactNode } from 'react';

export type TwoColumnsLayoutProps = {
  children?: ReactNode;
  RightSidebar?: ReactNode;
};

const HomeLayout: FC<TwoColumnsLayoutProps> = ({ children, RightSidebar }) => {
  return (
    <>
      <div className="mt-8 mb-52 w-screen heightAvoidNavBar max-h-[50rem] flex flex-col items-center">
        <div className="w-full max-w-320 h-full grid grid-cols-10">
          <div className="col-span-6">{children}</div>
          <div className="col-span-4">{RightSidebar}</div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
