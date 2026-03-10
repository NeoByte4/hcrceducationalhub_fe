import HeadingText from "@/components/ui/heading-text";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContainerLayout from "../../layouts/container-layout";
import NewsletterForm from "../../forms/newsletter-form";

const NewsletterSection = () => {
  return (
    <ContainerLayout className="grid my-80 sm:my-16 md:grid-cols-2 gap-8 items-center">
      <div className="">
        <HeadingText>Join Our Exclusive Newsletter</HeadingText>
        <p className="text-text-secondary text-lg mt-2">
          Stay connected with Prestige Travel Corporation and be the first to
          receive exclusive offers, curated travel insights, and destination
          inspiration, delivered directly to your inbox
        </p>

        <div className="max-w-lg my-8">
          <NewsletterForm />
        </div>

        <p className="mt-6 text-text-secondary">
          By subscribing, you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="font-medium text-text-primary hover:underline"
          >
            Terms of Services
          </Link>
          .
          <br />
          You can{" "}
          {/* <Link href="/unsubscribe" className="hover:underline">
            unsubscribe
          </Link>{' '} */}
          unsubscribe at any time.{" "}
        </p>
      </div>
      <div className="flex items-center md:justify-end">
        <Image
          src={"/newsletter.webp"}
          width={500}
          height={500}
          alt="Doogle Image for newsletter section"
        />
      </div>
    </ContainerLayout>
  );
};

export default NewsletterSection;
