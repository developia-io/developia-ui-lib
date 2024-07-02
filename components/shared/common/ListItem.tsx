"use client";
import { IconAngleRight } from "@/components/icons";
import clsx from "clsx";
import Link from "next/link";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MutableRefObject,
  type RefObject,
} from "react";

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);

  const nodeRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;

  const callbackRef = useCallback(
    (node: HTMLElement) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener("mouseover", handleMouseOver);
        nodeRef.current.removeEventListener("mouseout", handleMouseOut);
      }

      if (typeof node !== "undefined") {
        nodeRef.current = node;
      }

      if (nodeRef.current) {
        nodeRef.current.addEventListener("mouseover", handleMouseOver);
        nodeRef.current.addEventListener("mouseout", handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut, nodeRef]
  );

  return [callbackRef, isHovering];
};

type ListItemType = {
  index: number;
  href: string;
  text: string;
  isUnderlined: boolean;
  hasBullet?: boolean;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
};

export default function ListItem({
  index,
  href,
  text,
  isUnderlined,
  hasBullet = false,
  onClick,
  onKeyDown,
}: ListItemType) {
  const [arrowMargin, setArrowMargin] = useState(-10); // Initial margin
  const textRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;
  const arrowRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;
  const liRef = useRef(null) as unknown as MutableRefObject<HTMLElement>;
  const [hoverRef, isHovering] = useHover();

  function pad(d: number) {
    return d < 10 ? `0${d.toString()}` : d.toString();
  }

  useEffect(() => {
    if (hasBullet) {
      const calculateArrowPosition = () => {
        const liWidth = liRef.current?.offsetWidth ?? 0;
        const textWidth = textRef.current?.offsetWidth ?? 0;
        const arrowWidth = arrowRef.current?.offsetWidth ?? 0;

        const newMargin = isHovering ? liWidth - textWidth - arrowWidth - 9 : 0; // Adjust 9

        setArrowMargin(newMargin);
      };

      calculateArrowPosition();
      window.addEventListener("resize", calculateArrowPosition);

      return () => {
        window.removeEventListener("resize", calculateArrowPosition);
      };
    }
  }, [
    hasBullet,
    isHovering,
    liRef.current?.offsetWidth,
    textRef.current?.offsetWidth,
    arrowRef.current?.offsetWidth,
  ]);

  return (
    <Link
      key={index}
      href={href}
      className={clsx(
        isUnderlined
          ? "bg-helper_Sky_30 text-primary_90 font-bold"
          : "bg-helper_White",
        " hover:bg-helper_Sky_30 group/link text-natural_50 hover:text-primary_90 hover:font-bold group/link"
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={hoverRef as unknown as RefObject<HTMLAnchorElement>}
    >
      <li
        className="mx-6 my-3 gap-2 text-left text-base  leading-7 capitalize w-[320px] flex flex-row  items-center "
        ref={liRef as RefObject<HTMLLIElement>}
      >
        <div ref={textRef as RefObject<HTMLDivElement>} className="flex gap-2">
          <span> {`${pad(index + 1)}`}</span>
          <span>{text}</span>
        </div>
        {hasBullet && (
          <div
            ref={arrowRef as RefObject<HTMLDivElement>}
            style={{ marginLeft: `${arrowMargin}px` }}
            className="invisible group-hover/link:visible transition-all duration-700 ease-out"
          >
            <IconAngleRight />
          </div>
        )}
      </li>
    </Link>
  );
}
