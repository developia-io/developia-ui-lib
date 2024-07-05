import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={twMerge('container transition-all px-6 lg:px-12', className)}>
      {children}
    </div>
  );
};
