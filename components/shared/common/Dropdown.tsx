import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import clsx from "clsx";
import Link from "next/link";

type DropdownItem = {
  name: string;
  link: string;
};

type DropdownProps = {
  title: string;
  items: DropdownItem[];
};

const Dropdown = ({ title, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 bg-primary_80 text-helper_White"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-bold">{title}</span>
        {isOpen ? (
          <FaChevronUp className="text-helper_White" />
        ) : (
          <FaChevronDown className="text-helper_White" />
        )}
      </button>
      <div
        className={clsx(
          "absolute left-0 right-0 mt-2 py-2 bg-primary_80",
          { hidden: !isOpen }
        )}
      >
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="block px-4 py-2 text-helper_White hover:bg-primary_90"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;