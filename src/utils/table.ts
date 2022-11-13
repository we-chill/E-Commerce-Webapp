import { TABLE_PAGINATION_DOT_INDEX } from '@/constants';
import * as _ from 'lodash';

export interface GetPaginationArrayProps {
  totalPages: number;
  currentPageIndex: number;
  maxMiddlePagesToShow?: number;
}

export const getPaginationArray = ({
  totalPages,
  currentPageIndex,
  maxMiddlePagesToShow = 3,
}: GetPaginationArrayProps) => {
  if (maxMiddlePagesToShow + 2 >= totalPages) {
    return _.range(0, totalPages);
  }

  const firstPageIndex = 0;

  const isCurrentNearSecondPageIndex = currentPageIndex - 1 < maxMiddlePagesToShow;
  const secondPageIndex = isCurrentNearSecondPageIndex ? 1 : TABLE_PAGINATION_DOT_INDEX;

  let middlePagesStartIndex = isCurrentNearSecondPageIndex
    ? 2
    : currentPageIndex - Math.floor(maxMiddlePagesToShow / 2);

  const isCurrentNearPageBeforeLastPage = currentPageIndex + 1 >= totalPages - maxMiddlePagesToShow;
  if (isCurrentNearPageBeforeLastPage) {
    middlePagesStartIndex = totalPages - 2 - maxMiddlePagesToShow;
  }

  const middlePages = _.range(middlePagesStartIndex, middlePagesStartIndex + maxMiddlePagesToShow);
  const pageBeforeLastPage = isCurrentNearPageBeforeLastPage ? totalPages - 2 : TABLE_PAGINATION_DOT_INDEX;
  const lastPageIndex = totalPages - 1;

  return [firstPageIndex, secondPageIndex, ...middlePages, pageBeforeLastPage, lastPageIndex];
};
