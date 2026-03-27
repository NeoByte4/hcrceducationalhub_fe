import { Facebook, Twitter, InstagramIcon } from "lucide-react";

export const newsShareLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Twitter",
    icon: Twitter,
    getUrl: (url: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    getUrl: () => `https://www.instagram.com/`,
  },
];
