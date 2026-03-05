"use client";
import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={handleScrollToTop}
      className="fixed left-12 bottom-8 md:left-7 md:bottom-7 fade-in"
    >
      <Button variant={"secondary"} className="cursor-pointer">
        <ChevronUp />
      </Button>
    </div>
  );
};

export default ScrollToTop;
