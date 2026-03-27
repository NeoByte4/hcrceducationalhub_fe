import React from "react";
import Link from "next/link";
import Image from "next/image";
import ContainerLayout from "../layouts/container-layout";
import HeadingText from "@/components/ui/heading-text";
import { navLinks } from "@/src/data/navLinks";
import { footerData } from "@/src/data/footer-data";

const Footer = () => {
  return (
    <footer className="relative mb-6 w-full p-4">
      <ContainerLayout className="border border-surface-2 rounded-2xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-10 py-8">
          <section className="grid place-items-center sm:col-span-2 md:col-span-1">
            <Link className="block mb-4 md:mb-0 w-[150px] h-[65px]" href={"/"}>
              <Image
                src={"/hcrc-logo.png"}
                width={90}
                height={0}
                alt="Logo Image for Header"
                className="w-full h-full object-contain"
                priority
              />
            </Link>
          </section>

          <section className="flex flex-col gap-4 items-start">
            <HeadingText level={6} heading={0}>
              Quick Links
            </HeadingText>
            {navLinks.map(({ href, name }) => (
              <Link
                key={href}
                href={href}
                className={`text-base leading-6 hover:underline`}
              >
                {name}
              </Link>
            ))}
          </section>

          {/* Contact */}
          <section className="flex flex-col gap-6">
            {footerData.contact.map((data, i) => (
              <div key={i} className="space-y-2">
                <p className="font-bold font-secondary text-base flex gap-2 items-center">
                  <data.icon className="text-bg-btn-yellow" size={18} />{" "}
                  {data.name}
                </p>

                {data.href && (
                  <Link
                    href={data.href}
                    className="text-sm text-shadow-primary-dark mt-2 block"
                    target={data.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {data.label}
                  </Link>
                )}
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-4">
            <HeadingText level={6} heading={0}>
              Connect
            </HeadingText>

            {footerData.socials.map((item) => (
              <Link
                href={item.url}
                target="_blank"
                className="hover:underline"
                key={item.url}
              >
                {item.label}
              </Link>
            ))}
          </section>

          <section className="flex flex-col gap-6">
            <div>
              <HeadingText level={6} heading={0}>
                {footerData.info.title}
              </HeadingText>

              <p className="text-base leading-7">
                {footerData.info.description}
              </p>
            </div>

            <div>
              <HeadingText level={6} heading={0}>
                Countries We Serve
              </HeadingText>

              <div className="flex gap-2 mt-2">
                {footerData.Countries.map((logo, i) => (
                  <div
                    key={i}
                    className="w-10 flex items-center justify-center"
                  >
                    <Image
                      src={logo.img}
                      alt={`Image for ${logo.label}`}
                      height={25}
                      width={37}
                      unoptimized={true}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="w-full border-t border-t-surface-2 py-3 relative z-10 flex flex-col lg:flex-row md:items-center md:justify-between gap-3 text-text-secondary text-sm">
          <div className="flex items-center gap-2">
            <p>{footerData.bottom_message_text}</p>

            <div className="w-14 shrink-0">
              <Link
                href={"https://www.hcrceducationalhub.com/"}
                target="_blank"
              >
                <Image
                  src={"/hcrc-logo.png"}
                  alt="Quebec"
                  className="w-full h-full object-contain"
                  height={40}
                  width={50}
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p>Designed and Developed by</p>
            <div className="w-16 shrink-0">
              <Link href={"#"} target="_blank">
                <Image
                  src="/logo/neobyte.jpeg"
                  alt="Quebec"
                  className="w-full h-full object-contain"
                  height={50}
                  width={55}
                />
              </Link>
            </div>
          </div>
        </section>
      </ContainerLayout>
    </footer>
  );
};

export default Footer;
