import { StaticImageData } from "next/image";

export interface IImage {
  width: number;
  height: number;
  src: string | StaticImageData;
  alt: string;
}
