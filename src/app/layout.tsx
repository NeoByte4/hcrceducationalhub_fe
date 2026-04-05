import { Figtree, Poppins } from "next/font/google";
import { Metadata } from "next";
import "./css/globals.css";
import Header from "../components/global/header";
import Footer from "../components/global/footer";

const poppins = Poppins({
  variable: "--font-primary",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const secondary = Figtree({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "http://localhost:3000";
const SITE_TITLE = "HCRC Education Hub";

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_TITLE} – Study Abroad Consultancy in Nepal | Education Visa Experts`,
    template: `%s | ${SITE_TITLE}`,
  },
  description:
    "HCRC Education Hub is a leading education consultancy in Nepal, offering expert guidance for higher education admissions worldwide. We help students secure admission to prestigious institutions, navigate visa processes, and find scholarships. Trusted by students for personalized, professional support.",
  keywords: [
    "HCRC Education Hub",
    "H.C.R.C. Education Hub Pvt. Ltd.",
    "study abroad consultancy Nepal",
    "education visa",
    "overseas education",
    "university admissions",
    "scholarship guidance",
    "Nepal study abroad",
    "education consultants Kathmandu",
    "higher education abroad",
    "student visa assistance",
    "Arjun Bhujel review",
    "John Adhikari testimonial",
    "Kajal Shrestha feedback",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_TITLE} – Your Gateway to Global Education`,
    description:
      "Leading education consultancy in Nepal specializing in higher education admissions worldwide. Expert guidance on courses, universities, scholarships, and visas.",
    url: SITE_URL,
    siteName: SITE_TITLE,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} – Study Abroad Experts`,
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} – Study Abroad Consultancy Nepal`,
    description:
      "Expert guidance for higher education abroad. Admissions, visas, scholarships – we help you succeed.",
    images: [`${SITE_URL}/twitter-card.jpg`],
  },
  icons: {
    icon: "/hcrc-logo.png",
    apple: "/hcrc-logo.png",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="HCRC Education Hub" />
      </head>
      <body
        className={`${secondary.variable} ${poppins.variable} antialiased relative`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
