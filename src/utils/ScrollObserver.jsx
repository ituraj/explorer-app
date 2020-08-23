import { useEffect, useRef } from "react";

const ScrollObserver = (element, handleInitialData) => {
  const page = useRef(1);
  const prevY = useRef(0);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;
        if (prevY.current > y) {
          loadMore();
        }

        prevY.current = y;
      },
      { threshold: 1 }
    )
  );

  const loadMore = () => {
    page.current++;
    handleInitialData(page.current);
  };

  useEffect(() => {
    handleInitialData(page.current);
  }, [handleInitialData]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);
};
export default ScrollObserver;
