import { useState, useEffect, MutableRefObject } from "react";

interface ScrollArrowProps {
  elementRef: MutableRefObject<HTMLDivElement | null>;
  offset: number;
}

const ScrollArrow = ({ elementRef, offset }: ScrollArrowProps) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (elementRef.current) {
      const elem = elementRef.current;
      setShowScroll(
        elem.offsetHeight + elem.scrollTop >= elem.scrollHeight - offset
      );
    }
  };

  const scrollTop = () => {
    if (elementRef.current)
      elementRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const elem = elementRef.current;
    elem?.addEventListener("scroll", checkScrollTop);

    return () => {
      elem?.removeEventListener("scroll", checkScrollTop);
    };
  }, [elementRef]);

  return (
    <button
      type="button"
      role="navigation"
      className="fixed text-3xl bottom-5 right-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-md px-1"
      onClick={scrollTop}
      style={{ height: 40, display: showScroll ? "flex" : "none" }}
    >
      <span role="img" aria-label="back to top" className="m-auto">
        ⬆️
      </span>
    </button>
  );
};

export default ScrollArrow;

ScrollArrow.defaultProps = {
  offset: 500,
};
