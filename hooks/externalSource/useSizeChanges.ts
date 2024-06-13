import { useEffect, useState } from 'react';

function useSizeChanges(element: any) {
  const [elementInfo, setElementInfo] = useState<any>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setElementInfo({
        clientHeight: entries[0].target.clientHeight,
        clientWidth: entries[0].target.clientWidth,
      });
    });
    if (element) {
      // start observing a DOM node
      resizeObserver.observe(element);
    }
    return () => resizeObserver.unobserve(element);
  }, [element]);

  return elementInfo;
}
export default useSizeChanges;
