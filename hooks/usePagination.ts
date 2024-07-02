import { useMemo } from "react";
import { PaginationComponentProps } from "@/components/shared/common/Pagination";

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalPagesCount,
  currentPage,
}: PaginationComponentProps) => {
  const siblingCount = 1;

  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPagesCount]
    */
    if (totalPageNumbers >= totalPagesCount) {
      return range(1, totalPagesCount);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPagesCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPagesCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPagesCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPagesCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPagesCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPagesCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPagesCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPagesCount - rightItemCount + 1,
        totalPagesCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPagesCount, siblingCount, currentPage]);

  return paginationRange ?? [];
};
