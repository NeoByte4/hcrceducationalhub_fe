import React, { ReactNode, HTMLAttributes } from "react";

interface RibbonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Ribbon = ({ children, className, ...restProps }: RibbonProps) => {
  const mergedClassName = `absolute right-4 ${className || ""}`;

  return (
    <div {...restProps} className={mergedClassName}>
      <div className=" bg-secondary-dark w-11 aspect-[1/1.1] py-1 group-hover/card:aspect-[1/1.5] grid place-content-center transition-all shadow-lg">
        {children}
      </div>
      <div className="triangle-left"></div>
      <div className="triangle-right"></div>
    </div>
  );
};

export default Ribbon;
