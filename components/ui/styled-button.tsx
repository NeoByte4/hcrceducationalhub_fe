import React from "react";
import { ArrowUpRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StyledButtonProps extends React.ComponentProps<"button"> {
  icon?: LucideIcon;
  iconStyle?: string;
  variant?: "primary" | "secondary";
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  iconStyle = "",
  icon: Icon = ArrowUpRight,
  variant = "primary",
  ...props
}) => {
  const isPrimary = variant === "primary";
  const hasChildren = !!children;

  return (
    <button
      className={`flex items-center font-semibold rounded-full gap-2 w-fit shadow-lg transition-all duration-300 ease-in-out font-secondary cursor-pointer ${
        isPrimary
          ? "bg-[#2D2E2C] text-white hover:bg-[#1a1b19] active:bg-[#0f0f0e]"
          : "bg-white text-black border border-black hover:bg-gray-50 active:bg-gray-100"
      } ${hasChildren ? "pl-4 pr-2 py-2" : "p-2"} focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isPrimary ? "focus:ring-[#2D2E2C]" : "focus:ring-black"
      } hover:shadow-xl active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg`}
      {...props}
    >
      {hasChildren && <span className="text-sm">{children}</span>}
      <span
        className={`flex items-center justify-center rounded-full w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-45 ${
          hasChildren ? "ml-2" : ""
        } ${isPrimary ? "bg-white" : "bg-black"}`}
      >
        <Icon
          className={`${isPrimary ? "text-black" : "text-white"} ${iconStyle}`}
          size={16}
        />
      </span>
    </button>
  );
};

export default StyledButton;
