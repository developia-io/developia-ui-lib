import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import ListItem from "./ListItem";
import { IconAngleDown } from "@/components/icons";

interface NavListProps {
  items: NavListItem[];
  underlineIndex?: number;
  underlineSubIndex?: number;
  orientation?: Orientation;
  className?: string;
}

export interface NavListItem {
  title: ListItem;
  list: ListItem[];
}

export interface ListItem {
  name: string;
  link: string;
  disabled?: boolean;
}

export enum Orientation {
  Horizantal = 0,
  Vertical = 1,
}

export default function NavList({
  items,
  underlineIndex,
  underlineSubIndex,
  orientation = 1,
  className,
}: NavListProps) {
  const [showList, setShowList] = useState(-1);

  return orientation ? (
    <div className={"flex w-full h-min justify-center select-none "}>
      {items.map((item, index) => (
        <div
          className="relative group "
          key={index}
          onMouseEnter={() => setShowList(index)}
          onMouseLeave={() => {
            setShowList(-1);
          }}
        >
          <Link
            href={item.title.disabled !== true ? item.title.link : "#"}
            className={clsx(
              "flex items-center relative p-2",
              underlineIndex === index && "border-b-2 border-helper_White",
              className
            )}
          >
            <span>{item.title.name}</span>
            {item.list?.length > 0 && (
              <IconAngleDown className="ml-2 transition-all duration-300 ease-out group-hover:rotate-180" />
            )}
          </Link>

          {item.list?.length > 0 && (
            <ul
              className={clsx(
                "absolute z-20 flex flex-col min-w-full  ease-out  justify-start transition-opacity duration-300 w-[376px] pt-[23px] bg-transparent shadow-xl  ",
                showList === index ? "visible opacity-100" : "hidden opacity-0"
              )}
            >
              {item.list?.map((listItem, subIndex) => (
                <ListItem
                  key={subIndex}
                  href={listItem.link ? listItem.link : "/"}
                  index={subIndex}
                  isUnderlined={
                    underlineIndex === index && underlineSubIndex === subIndex
                  }
                  text={listItem.name}
                  onClick={() => {
                    setShowList(-1);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setShowList(-1);
                    }
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      {items.map((subItem, index) => {
        return (
          <div key={index} className="flex flex-col justify-between  gap-6">
            <Link
              href={subItem.title.link}
              className={clsx(
                "text-white text-lg font-bold uppercase leading-snug hover:underline hover:decoration-current  underline-offset-4 ",
                subItem.title.disabled && "pointer-events-none"
              )}
              aria-disabled={subItem.title.disabled === false}
            >
              {subItem.title.name}
            </Link>
            {subItem.list?.length > 0 && (
              <div className="flex flex-col gap-2  ">
                {subItem.list.map((subSubItem) => {
                  return (
                    <div key={subSubItem.name}>
                      <Link href={subSubItem.link}>
                        <span className=" text-center text-natural_50 text-lg font-normal hover:transition-all hover:duration-300 hover:text-helper_White  ease-in-out">
                          {subSubItem.name}
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
