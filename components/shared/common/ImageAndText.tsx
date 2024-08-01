import React from 'react';
import clsx from 'clsx';
import { IconImage } from "@/components/icons";
import Button from "@/components/shared/common/buttons/Button";

export interface ImageandTextProps {
  imageSrc?: string;
  altText?: string;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  className?: string;
  useIconImage?: boolean; 
  primaryActionText: string;
  secondaryActionText: string;
}

const ImageandText: React.FC<ImageandTextProps> = ({
  imageSrc,
  altText,
  title,
  description,
  imagePosition = 'left',
  className,
  useIconImage = false,
  primaryActionText,
  secondaryActionText,
}) => {
  return (
    <div className={clsx(
      'flex flex-col md:flex-row items-center',
      imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
      className
    )}>
      <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
        {useIconImage ? (
          <IconImage className="w-full h-auto object-contain" />
        ) : (
          <img src={imageSrc} alt={altText} className="w-full h-auto object-contain" />
        )}
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-base mt-2">{description}</p>
        <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <Button colorvariant="primary">{primaryActionText}</Button>
          <Button colorvariant="secondary">{secondaryActionText}</Button>
        </div>
      </div>
    </div>
  );
};

export default ImageandText;


