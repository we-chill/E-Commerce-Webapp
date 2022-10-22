import React, { FC, ReactElement, ReactNode } from 'react';
import { HomeLayout, Layout, Sidebar } from '@/layouts';
import { NextPageWithLayout } from '@/types';
import { BoxIcon } from '@/components';
import clsx from 'clsx';
import useStore from '@/store';
import { HomePageSectionType } from '@/constants';

const TitleDictionary: Record<HomePageSectionType, string> = {
  [HomePageSectionType.HOME]: 'Home',
  [HomePageSectionType.NEW_IN]: 'New in',
  [HomePageSectionType.COMBO]: 'Combo',
};

const HomePage: NextPageWithLayout = () => {
  const homePageSection = useStore((state) => state.homePage.activeSection);
  const title = <div className="text-[52px] font-bold">{TitleDictionary[homePageSection]}</div>;

  const viewMore = <div className="mt-3 text-xl text-[#00000099]">view more</div>;

  interface FilterButtonProps {
    children?: ReactNode;
    iconName?: string;
  }
  const FilterButton: FC<FilterButtonProps> = ({ children, iconName }) => {
    let icon;
    if (iconName && iconName.trim() !== '') {
      icon = <BoxIcon name={iconName} />;
    }
    const hasChildren = !!children;

    return (
      <button
        className={clsx([
          'py-3',
          hasChildren ? 'px-5' : 'px-3',
          'border-2 border-[#333333] rounded-xl',
          'flex justify-center items-center space-x-5',
          'hover:bg-neutral-200',
        ])}
      >
        {icon}
        {hasChildren && <div>{children}</div>}
      </button>
    );
  };

  const renderSortButton = (hasIcon = false) => (
    <FilterButton iconName={hasIcon ? 'sort' : undefined}>Sort</FilterButton>
  );

  const renderProductButton = (id?: number) => {
    let label = 'Product';
    if (id) {
      label += id;
    }
    return <FilterButton>{label}</FilterButton>;
  };

  const arrowDownButton = <FilterButton iconName="chevron-down" />;

  const sortAndFilters = (
    <div className="flex flex-wrap justify-start items-center gap-x-5 gap-y-3">
      {renderSortButton(true)}
      {renderProductButton()}
      {renderProductButton(1)}
      {renderSortButton()}
      {renderSortButton()}
      {renderSortButton()}
      {renderSortButton()}
      {arrowDownButton}
    </div>
  );

  interface CardProps {
    id: number;
    name: string;
    price: number;
    image?: string;
  }
  const Card: FC<CardProps> = ({ name, price, image }) => {
    const cardImage = <div className="w-full h-[13.75rem] bg-[#FEEFEF] rounded-xl">{image}</div>;
    const productPrice = <div className="mt-2 text-[#333333] text-xl font-bold">${price}</div>;
    const productName = <div className="text-[#4C4C4C]">{name}</div>;
    return (
      <div className="hover:shadow-lg cursor-pointer rounded-xl">
        {cardImage}
        {productPrice}
        {productName}
      </div>
    );
  };

  const listItems = Array.apply(0, Array(15)).map((_, index) => ({
    id: index,
    name: 'Product name #' + index,
    price: 100,
    image: '',
  }));

  const renderProducts = () => {
    const renderedList = listItems.map(({ id, name, price, image }) => (
      <Card key={name + id} id={id} name={name} price={price} image={image} />
    ));

    return <div className="mt-6 grid grid-cols-5 gap-x-5 gap-y-8">{renderedList}</div>;
  };

  return (
    <div className="">
      {title}
      {viewMore}
      <div className="mt-3">{sortAndFilters}</div>
      {renderProducts()}
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  const Slider = () => <div className="mb-11 w-full max-w-320 h-[21.25rem] bg-[#FFEAEA] rounded-3xl" />;

  return (
    <Layout>
      <HomeLayout Slider={<Slider />} Sidebar={<Sidebar />}>
        {page}
      </HomeLayout>
    </Layout>
  );
};
