import { useEffect, useRef } from "react";

export const useOutsideClick = (fn: () => void) => {
  const parent = useRef(null);

  useEffect(() => {
    function click(e: any) {
      let cur = e.target;
      let isOutside = true;

      while (cur !== document.body && cur !== null) {
        if (cur === parent.current) {
          isOutside = false;
          break;
        }

        cur = cur.parentNode;
      }

      if (isOutside) {
        fn();
      }
    }

    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  return parent;
};
