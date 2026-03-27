import { Mail, MapPin, Phone } from "lucide-react";
import { siteDetails } from "./sit-details";

export const footerData = {
  bottom_message_text:
    "Proudly serving students through HCRC Educational Hub Consultancy",
  contact: [
    {
      name: "Email Us",
      href: `mailto:${siteDetails.email}`,
      label: `${siteDetails.email}`,
      icon: Mail,
      description: "For detailed inquiries and bespoke requests.",
    },
    {
      name: "Location",
      href: `https://maps.google.com/?q=${siteDetails.location}`,
      label: `${siteDetails.location}`,
      icon: MapPin,
      description: "Visit our office: Mon-Fri, 9:00am - 5:00pm.",
    },
    {
      name: "Phone",
      href: `tel:${siteDetails.phone}`,
      label: `${siteDetails.phone}`,
      icon: Phone,
      description: "Immediate assistance and quick consultations.",
    },
  ],
  socials: [
    {
      label: "Facebook",
      url: "https://www.facebook.com/470155786174865",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/prestigetravelcorporation/",
    },
    {
      label: "Tiktok",
      url: "https://www.tiktok.com/@prestige.travel.c",
    },
  ],
  info: {
    title: "We Are Here",
    description: "Contact HCRC anytime for queries or guidance.",
  },
  Countries: [
    {
      label: "australia",
      img: "/flag/australia.png",
    },
    {
      label: "canada",
      img: "/flag/canada.png",
    },
    {
      label: "european union",
      img: "/flag/european-union.png",
    },
    {
      label: "japan",
      img: "/flag/japan.png",
    },
    {
      label: "south korea",
      img: "/flag/south-korea.png",
    },
    {
      label: "USA",
      img: "/flag/united-states.png",
    },
  ],
};
