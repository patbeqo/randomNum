import React, { useLayoutEffect, useRef } from "react";

interface IAnimate {
  children: React.ReactNode;
  order: number;
}

export const Animate = ({ children, order }: IAnimate) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const oldDimensions = useRef<{ top: number; horizontal: number } | null>(
    null
  );

  useLayoutEffect(() => {
    if (ref.current) {
      const newTop = ref.current.getBoundingClientRect().y;
      const newHorizontal = ref.current.getBoundingClientRect().x;

      if (oldDimensions.current) {
        const deltaY = oldDimensions.current.top - newTop;
        const deltaX = oldDimensions.current.horizontal - newHorizontal;

        requestAnimationFrame(() => {
          ref.current!.style.transform = `translateY(${deltaY}px) translateX(${deltaX}px)`;
          ref.current!.style.transition = "transform 0s";

          requestAnimationFrame(() => {
            ref.current!.style.transform = "";
            ref.current!.style.transition = "transform 500ms";
          });
        });
      }

      oldDimensions.current = {
        top: newTop,
        horizontal: newHorizontal,
      };
    }
  }, [order]);

  return <div ref={ref}>{children}</div>;
};
