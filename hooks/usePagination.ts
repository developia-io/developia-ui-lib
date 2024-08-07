import { useMemo, useEffect, useState } from "react";
import { PaginationComponentProps } from "@/components/shared/common/Pagination";

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 1280,
    height: 800,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
};

export const usePagination = ({
  totalPagesCount,
  currentPage,
}: PaginationComponentProps) => {
  const windowSize = useWindowSize();
  const [siblingCount, setSiblingCount] = useState(1);

  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 640) {
        setSiblingCount(0); // Mobile devices
      } else if (windowSize.width < 1024) {
        setSiblingCount(1); // Tablets
      } else {
        setSiblingCount(2); // Desktops
      }
    }
  }, [windowSize]);

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPagesCount) {
      return range(1, totalPagesCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPagesCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPagesCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPagesCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPagesCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPagesCount - rightItemCount + 1,
        totalPagesCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPagesCount, siblingCount, currentPage]);

  return paginationRange ?? [];
};
