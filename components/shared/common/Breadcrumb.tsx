import { Fragment } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type BreadcrumbItemType = {
  title: string;
  url?: string;
  noTranslate?: boolean;
};

type Props = {
  items: BreadcrumbItemType[];
  className?: string;
};

const Breadcrumb = ({ items = [], className }: Props) => {
  return (
    <div
      className={twMerge(
        'py-6 flex items-center gap-1 font-semibold text-xs tracking-[0.24px]',
        className
      )}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <span
            className={clsx({
              'text-gray600': index + 1 !== items.length,
              'text-gray300': index + 1 === items.length,
            })}
          >
            {item.title}
          </span>
          {index + 1 !== items.length ? (
            <span className="text-gray300">/</span>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;