import { siteDetails } from "@/src/data/sit-details";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorTextSection = ({
  item = "Data",
  parent = "Item",
  customMsg = "",
}: {
  item?: string;
  parent?: string;
  customMsg?: string;
}) => {
  return (
    <div className="text-text-secondary">
      <AlertTriangle className="text-yellow-600" />
      <p>{customMsg ? customMsg : ` No ${item} found of this ${parent}!`}</p>
      <p>
        Please email us at{" "}
        <Link
          className="text-primary-dark hover:text-primary-dark/95 transition-all"
          href={`mailto:${siteDetails.email}`}
        >
          {siteDetails.email}
        </Link>{" "}
        for more information.
      </p>
    </div>
  );
};

export default ErrorTextSection;
