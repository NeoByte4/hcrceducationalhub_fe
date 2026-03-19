import React from "react";
import SubHeadingText from "@/components/ui/sub-heading-text";
import {
  IRequirements_data,
  IRequirement_document,
} from "@/src/graphql/types_api";

interface RequirementsListProps {
  title?: string;
  requirements: IRequirements_data[];
}

const RequirementsList: React.FC<RequirementsListProps> = ({
  title = "Requirements",
  requirements,
}) => {
  if (!requirements || requirements.length === 0) return null;

  return (
    <div className="mt-6">
      <SubHeadingText>{title}</SubHeadingText>

      {requirements.map((req, idx) => (
        <div key={idx} className="mt-4 p-4 rounded-lg border border-gray-200">
          {req.name && (
            <p className="font-semibold text-gray-800">{req.name}</p>
          )}

          <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
            {req.processing_time && (
              <li>Processing Time: {req.processing_time}</li>
            )}
            {req.visa_fee && <li>Visa Fee: {req.visa_fee}</li>}
            {req.biometrics && <li>Biometrics: {req.biometrics}</li>}
            {req.interview && <li>Interview: {req.interview}</li>}
            {req.health_insurance && (
              <li>Health Insurance: {req.health_insurance}</li>
            )}
            {req.dependents_allowed && (
              <li>Dependents Allowed: {req.dependents_allowed}</li>
            )}
            {req.notes && <li>Notes: {req.notes}</li>}
          </ul>

          {req.requirement_document && req.requirement_document.length > 0 && (
            <div className="mt-3">
              <p className="font-medium">Documents:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {req.requirement_document.map(
                  (doc: IRequirement_document, i: number) => (
                    <li key={i}>
                      {doc.name}
                      {doc.document && (
                        <>
                          {" - "}
                          <a
                            href={`/api/files/${doc.document.directus_files_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {doc.document.filename_download}
                          </a>
                        </>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequirementsList;
