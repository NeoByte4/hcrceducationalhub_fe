import HeadingText from "@/components/ui/heading-text";
import React from "react";
import ContactForm from "../forms/contact-form";

const SidebarContactForm = () => {
  return (
    <div>
      <HeadingText className="mb-2" level={5} heading={3}>
        Start Your Study Abroad Journey
      </HeadingText>
      <p className="text-text-secondary mb-8">
        Planning to study abroad? Share your academic goals with us and our
        expert counsellors will guide you through university selection,
        application processing, scholarships, and visa assistance.
      </p>
      <ContactForm />
    </div>
  );
};

export default SidebarContactForm;
