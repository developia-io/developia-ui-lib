import { useCallback } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { DOTS, usePagination } from "@/hooks/usePagination";
import Button from "@/components/shared/common/buttons/Button";
import IconButton from "@/components/shared/common/buttons/IconButton";
import { IconAngleLeft, IconAngleRight } from "@/components/icons";

type PaginationChangePage = (page: number, totalPagesCount: number) => void;

type Props = {
  className?: string;
  currentPage: number;
  onChangePage: PaginationChangePage;
  totalPagesCount: number;
};

export type PaginationComponentProps = Props;

const Pagination = (props: Props) => {
  const { onChangePage, className, currentPage, totalPagesCount } = props;

  const paginationRange = usePagination(props);

  const handlePrevious = useCallback(
    () => onChangePage(Number(currentPage) - 1, totalPagesCount),
    [currentPage, onChangePage]
  );

  const handleNext = useCallback(
    () => onChangePage(Number(currentPage) + 1, totalPagesCount),
    [currentPage, onChangePage]
  );

  return (
    <div
      className={twMerge(
        "flex items-center gap-4 justify-center pb-6 lg:mb-0",
        className
      )}
    >
      <IconButton
        variant="outline"
        disabled={currentPage === 1}
        className="text-blue800 p-0"
        onClick={handlePrevious}
      >
        <IconAngleLeft width={18} height={18} />
      </IconButton>

      {paginationRange.map((item, index) =>
        item === DOTS ? (
          <span key={index} className="font-semibold text-blue800">
            {DOTS}
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onChangePage(Number(item), totalPagesCount)}
            className={clsx(
              "rounded-2xl w-8 h-8 font-semibold text-blue800 hover:bg-blue800 hover:text-white",
              {
                "bg-blue-800 text-white": currentPage === item,
              }
            )}
          >
            {item}
          </button>
        )
      )}

      <IconButton
        variant="outline"
        disabled={currentPage === totalPagesCount}
        className="text-blue800 p-0"
        onClick={handleNext}
      >
        <IconAngleRight width={18} height={18} />
      </IconButton>
    </div>
  );
};
export default Pagination;
