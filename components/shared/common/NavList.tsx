import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import ListItem from "./ListItem";
import { IconAngleDown } from "@/components/icons";

interface NavListProps {
  items: NavListItem[];
  underlineIndex?: number;
  underlineSubIndex?: number;
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

export default function NavList({
  items,
  underlineIndex,
  underlineSubIndex,
  className,
}: NavListProps) {
  const [showList, setShowList] = useState(-1);

  return (
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
  );
}
