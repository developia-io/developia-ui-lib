import React, { useState } from "react";
import { IconAngleDown } from "@/components/icons";
import clsx from "clsx";
import Link from "next/link";

type DropdownItem = {
  name: string;
  link: string;
};

type DropdownProps = {
  title: string;
  items: DropdownItem[];
  radius?: "rounded" | "square";
};

const Dropdown = ({ title, items, radius = "rounded" }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className={clsx(
          "flex justify-between items-center w-full px-4 py-2 bg-primary_80 text-helper_White",
          {
            "rounded-lg": radius === "rounded",
            "rounded-none": radius === "square",
          }
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-bold">{title}</span>
        <IconAngleDown
          className={clsx("text-helper_White transform transition-transform", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      <div
        className={clsx(
          "absolute left-0 right-0 mt-2 py-2 bg-primary_80",
          {
            hidden: !isOpen,
            "rounded-lg": radius === "rounded",
            "rounded-none": radius === "square",
          }
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

