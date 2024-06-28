import { StaticImageData } from 'next/image';

interface IImage {
    width: number;
    height: number;
    src: string | StaticImageData;
    alt: string;
    url?: string;
}

export type { IImage };
