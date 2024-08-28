import React, { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type AccordionItemProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  customClass?: string;
  titleClass?: string;
  contentClass?: string;
  openIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
};

const AccordionItem = ({
  title,
  content,
  isOpen = false,
  onToggle,
  customClass,
  titleClass,
  contentClass,
  openIcon,
  closedIcon
}: AccordionItemProps) => {
  const itemClasses = twMerge(
    clsx(
      "border border-gray-300 rounded-md overflow-hidden",
      customClass
    )
  );

  const titleClasses = twMerge(
    clsx(
      "cursor-pointer p-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-between",
      titleClass
    )
  );

  const contentClasses = twMerge(
    clsx(
      "p-4 text-neutral-700 bg-white",
      {
        "hidden": !isOpen,
        "block": isOpen,
      },
      contentClass
    )
  );

  return (
    <div className={itemClasses}>
      <div className={titleClasses} onClick={onToggle}>
        {title}
        <span className="transition-transform duration-300 ease-in-out">
          {isOpen ? openIcon : closedIcon}
        </span>
      </div>
      <div className={contentClasses}>
        {content}
      </div>
    </div>
  );
};

export type AccordionProps = {
  items: Array<Omit<AccordionItemProps, "onToggle">>;
  allowMultipleOpen?: boolean;
  customClass?: string;
};

const Accordion = ({
  items,
  allowMultipleOpen = false,
  customClass,
}: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultipleOpen) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={twMerge("space-y-2", customClass)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          {...item}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
