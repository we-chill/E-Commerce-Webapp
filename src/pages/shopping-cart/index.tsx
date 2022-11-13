import React, { FC, ReactElement, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { BoxIcon, Button } from '@/components';
import { Layout, TwoColumnLayout } from '@/layouts';
import { NextPageWithLayout, ProductInCart } from '@/types';
import useStore from '@/store';
import clsx from 'clsx';
import { getPaginationArray } from '@/utils/table';

const ShoppingCartPage: NextPageWithLayout = () => {
  const { itemListAndQuantity, increaseProductQuantity, decreaseProductQuantity } = useStore((state) => state.cart);
  const data = useMemo(() => Object.values(itemListAndQuantity), [itemListAndQuantity]);
  const columns = useMemo<ColumnDef<ProductInCart>[]>(
    () => [
      {
        header: 'Product',
      },
      {
        header: 'Price',
      },
      {
        header: 'Quantity',
      },
      {
        header: 'Total price',
      },
      {
        header: '',
        id: 'actions',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    //
    debugTable: true,
  });

  const title = <div className="text-[52px] font-bold">Shopping Cart</div>;

  const buttonBack = (
    <Button type="submit" className="bg-[#FFCF86] rounded-[40px]">
      <BoxIcon name="chevron-left" size="sm" />
      <span className="ml-2 text-sm font-medium">Back</span>
    </Button>
  );

  const currentNumOfShownItems = table.getRowModel().rows.length;
  const totalItems = Object.keys(itemListAndQuantity).length;
  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  const isCurrentPage = (pageIndex: number) => pageIndex === currentPage;
  const buttonPageClassName = (pageIndex: number) => {
    const disableHoverEffect = pageIndex === -1;
    return clsx([
      'w-8 h-8 rounded-full flex items-center justify-center font-semibold',
      isCurrentPage(pageIndex) ? 'bg-[#0B808F] text-white' : 'text-[#0B808F]',
      disableHoverEffect ? '' : 'cursor-pointer hover:shadow-lg',
    ]);
  };

  const ButtonPage: FC<{ pageIndex: number }> = ({ pageIndex }) => {
    const isRenderingDots = pageIndex === -1;
    return (
      <div
        className={buttonPageClassName(pageIndex)}
        onClick={() => {
          if (!isRenderingDots) {
            table.setPageIndex(pageIndex);
          }
        }}
      >
        {isRenderingDots ? '...' : pageIndex + 1}
      </div>
    );
  };

  const pagination = (
    <div className="flex justify-between">
      <div className="flex items-center text-sm text-[#747474]">
        {currentNumOfShownItems} of {totalItems} items
      </div>
      <div className="flex gap-2">
        {getPaginationArray({ totalPages, currentPageIndex: currentPage }).map((pageIndex, id) => (
          <ButtonPage key={`pagination-001-${pageIndex}-${id}`} pageIndex={pageIndex} />
        ))}
      </div>
      <div className="pr-4 flex items-center">
        Show
        <select
          className="ml-3 text-[#0B808F] font-semibold"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} rows
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const basePadding = 'px-3 py-5';

  return (
    <div>
      {title}
      <div className="my-7">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#F5F5F5]">
                {headerGroup.headers.map((header) => {
                  const headerInfo = header.column.columnDef;
                  return (
                    <th key={header.id} className={clsx(['text-left text-xs text-[#747474]', basePadding])}>
                      {header.isPlaceholder ? null : flexRender(headerInfo.header, header.getContext())}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const product = row.original;
              const buttonCountClassName =
                'w-3 h-3 flex justify-center items-center rounded-full cursor-pointer hover:shadow-lg hover:bg-neutral-100';
              const buttonDecreaseCount = (
                <button
                  type="button"
                  className={buttonCountClassName}
                  onClick={() => decreaseProductQuantity(product.id, 1)}
                >
                  <BoxIcon name="minus" />
                </button>
              );
              const buttonIncreaseCount = (
                <button
                  type="button"
                  className={buttonCountClassName}
                  onClick={() => increaseProductQuantity(product.id, 1)}
                >
                  <BoxIcon name="plus" />
                </button>
              );
              const productCountController = (
                <div className="flex items-center gap-3">
                  {buttonDecreaseCount}
                  <span>{product.count}</span>
                  {buttonIncreaseCount}
                </div>
              );

              return (
                <tr key={row.id} className="h-16 border-b-2">
                  <td>
                    <div className="px-3 py-5 flex flex-row items-center">
                      <img src="/sports-soccer.svg" alt="google-icon" className="w-8 h-8 mr-2" />
                      <div>
                        <div>{product.name}</div>
                        <div className="text-sm text-[#747474]">{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className={basePadding}>${product.price}</td>
                  <td className={basePadding}>{productCountController}</td>
                  <td className={basePadding}>${product.count * product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="h-6" />
        {pagination}
      </div>
      {buttonBack}
    </div>
  );
};

export default ShoppingCartPage;

ShoppingCartPage.getLayout = function getLayout(page: ReactElement) {
  const RightSidebar = <div className="w-full h-full bg-[#FFCF86] rounded-[20px]" />;
  return (
    <Layout>
      <TwoColumnLayout RightSidebar={RightSidebar}>{page}</TwoColumnLayout>
    </Layout>
  );
};
