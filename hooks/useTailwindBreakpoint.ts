import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const findKeyByValue = (object: { [x: string]: any }, value: string) =>
  Object.keys(object).find((key) => object[key] === value);

const getDeviceConfig = (width: number) => {
  const fullConfig = resolveConfig(tailwindConfig);
  const { screens }: any = fullConfig.theme;
  const bpSizes = Object.keys(screens).map((screenSize) =>
    parseInt(screens[screenSize])
  );

  const bpShapes = bpSizes.map((size, index) => ({
    min: !index ? 0 : bpSizes[index - 1],
    max: size,
    key: findKeyByValue(screens, `${size}px`),
  }));

  let breakpoint = null;

  bpShapes.forEach((shape) => {
    if (!shape.min && width < shape.max) {
      breakpoint = shape.key;
    } else if (width >= shape.min && width < shape.max) {
      breakpoint = shape.key;
    } else if (!shape.max && width >= shape.max) {
      breakpoint = shape.key;
    }
  });

  return breakpoint;
};

function useTailwindBreakpoint() {
  const [brkPnt, setBrkPnt] = useState<string | null>(null);

  useEffect(() => {
    const calcInnerWidth = throttle(function () {
      setBrkPnt(getDeviceConfig(window.innerWidth));
    }, 500);

    calcInnerWidth();

    window.addEventListener('resize', calcInnerWidth, false);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
}

export default useTailwindBreakpoint;
