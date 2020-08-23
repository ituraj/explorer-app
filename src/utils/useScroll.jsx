import { useState, useEffect } from "react";

const EmptyRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
};

const useScroll = () => {
  const [bodyOffset, setBodyOffset] = useState(
    typeof window === "undefined" || !window.document
      ? EmptyRect
      : document.body.getBoundingClientRect() //  returns the size of an element
  );
  const [scrollY, setScrollY] = useState(bodyOffset.top);

  const listener = () => {
    setBodyOffset(
      typeof window === "undefined" || !window.document
        ? EmptyRect
        : document.body.getBoundingClientRect()
    );
    setScrollY(bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });
  return {
    scrollY,
  };
};

export { useScroll };
