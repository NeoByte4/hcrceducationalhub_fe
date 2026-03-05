"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <div className="relative">
      <main key="layout-children">{children}</main>
    </div>
  );
}
