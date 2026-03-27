"use client";
import React from "react";
import toast from "react-hot-toast";

const CopyToClipboard = ({
  children,
  text,
  ...props
}: {
  text: string;
  children: React.ReactNode;
}) => {
  const copy = () => {
    try {
      navigator.clipboard.writeText(text);
      toast.success("Copied successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to copy text!");
    }
  };

  return (
    <div
      role="button"
      aria-label="Copy to clipboard"
      className="flex cursor-pointer"
      onClick={copy}
      {...props}
    >
      {children}
    </div>
  );
};

export default CopyToClipboard;
