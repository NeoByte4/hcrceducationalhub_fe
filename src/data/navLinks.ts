import { routes } from "@/lib/routes";

export type NavLink = {
  name: string;
  href: string;
  mode: "DEFAULT" | "QUERY";
  subPages?: ISubPage[];
};

export interface ISubPage {
  name: string;
  slug: string;
  value?: string;
}

export const navLinks: NavLink[] = [
  { name: "Home", href: routes.home, mode: "DEFAULT" },
  { name: "About US", href: routes.about, mode: "DEFAULT" },
  { name: "Country", href: routes.country, mode: "DEFAULT" },
  { name: "University", href: routes.university, mode: "DEFAULT" },
  { name: "Program", href: routes.program, mode: "QUERY" },
];
