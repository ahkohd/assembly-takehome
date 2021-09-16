import { useState, useEffect } from "react";

interface ScrollArrowProps {
  offset: number;
}

const ScrollArrow = ({ offset }: ScrollArrowProps) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    console.log(
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    );
    setShowScroll(
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - offset
    );
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

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
