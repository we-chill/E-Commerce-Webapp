import React, { FC, ReactElement, ReactNode, useState } from 'react';
import { HomeLayout, Layout, Sidebar } from '@/layouts';
import { NextPageWithLayout, Product } from '@/types';
import { BoxIcon, ProductModal } from '@/components';
import clsx from 'clsx';
import useStore from '@/store';
import { HomePageSectionType } from '@/constants';
import { EMPTY_PRODUCT } from '@/constants/product';
import ProductCard from '@/components/ProductCard';
import { notifyUpcoming } from '@/utils';

const listItems = Array.apply(0, Array(15)).map(
  (_, index) =>
    ({
      id: index,
      name: 'Product name #' + index,
      price: 100,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ",
      technicalInformation:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
      rating: 4,
    } as Product)
);

const TitleDictionary: Record<HomePageSectionType, string> = {
  [HomePageSectionType.HOME]: 'Home',
  [HomePageSectionType.NEW_IN]: 'New in',
  [HomePageSectionType.COMBO]: 'Combo',
};

const HomePage: NextPageWithLayout = () => {
  const homePageSection = useStore((state) => state.homePage.activeSection);

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [productShownInModal, setProductShownInModal] = useState<Product>(EMPTY_PRODUCT);

  const title = (
    <div
      className="text-[52px] font-bold"
      style={{
        lineHeight: '60.94px',
      }}
    >
      {TitleDictionary[homePageSection]}
    </div>
  );

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
        onClick={notifyUpcoming}
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

  const onProductCardClick = (product: Product) => {
    setProductShownInModal(product);
    setIsProductModalVisible(true);
  };

  const productList = (
    <div className="mt-6 grid grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
      {listItems.map((product) => (
        <ProductCard key={product.name + product.id} product={product} onClick={onProductCardClick} />
      ))}
    </div>
  );

  return (
    <div className="">
      {title}
      {viewMore}
      <div className="mt-3">{sortAndFilters}</div>
      {productList}
      <ProductModal
        visible={isProductModalVisible}
        product={productShownInModal}
        onClose={() => setIsProductModalVisible(false)}
      />
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
