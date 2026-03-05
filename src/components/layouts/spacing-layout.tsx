import React from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const SpacingLayout = ({ children, className, ...props }: Props) => {
  const classes = `${className} md:space-y-32 md:mb-32 space-y-20 mb-20`;
  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default SpacingLayout;
