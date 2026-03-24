"use client";
import { IApplication_Form } from "@/src/app/(web)/form/[slug]/[id]/page";
import { BookingFormSchema } from "@/src/schemas/booking-form-validation";
import { formatIntlOrdinalDate } from "@/src/utils/format-intl-ordinal-date";
import React from "react";

interface ApplicationPreviewDialogProps {
  formData: BookingFormSchema;
  program: IApplication_Form;
  intakeDate?: string;
}

const dateCurrObj = new Date();

const calculateAge = (date: string) => {
  const dateObj = new Date(date);
  return dateCurrObj.getFullYear() - dateObj.getFullYear();
};

export default function ApplicationPreviewDialog({
  program,
  formData,
  intakeDate,
}: ApplicationPreviewDialogProps) {
  if (!formData) return null;

  return (
    <div className="space-y-6 max-h-96 md:max-h-[80vh] overflow-y-auto p-2">
      {/* ---------------- Program Details ---------------- */}
      <div>
        <h3 className="text-gray-600 text-sm font-semibold mb-2.5">
          Program Details
        </h3>

        <div className="border rounded-md p-2.5">
          <p className="text-sm font-medium">{program.name}</p>
          <div className="text-xs text-gray-600 mt-1 space-y-0.5">
            {/* Safe optional chaining to avoid undefined */}
            {program.institution?.name && (
              <p>Institution: {program.institution.name}</p>
            )}
            {intakeDate && (
              <p>Intake Date: {formatIntlOrdinalDate(intakeDate)}</p>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Applicant Details ---------------- */}
      <div>
        <h3 className="text-gray-600 text-sm font-semibold mb-2.5">
          Applicant(s) ({formData.users.length})
        </h3>
        <div className="space-y-2">
          {formData.users.map((user, index) => {
            if (!user) return null;

            return (
              <div key={index} className="border rounded-md p-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">
                      {user.fullName}{" "}
                      {index === 0 && (
                        <span className="text-xs font-secondary">
                          (Primary Applicant)
                        </span>
                      )}
                    </p>
                    <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                      <p>Email: {user.email}</p>
                      <p>Phone: {user.phone}</p>
                      <p>DOB: {formatIntlOrdinalDate(user.dateOfBirth)}</p>
                      <p>Age: {calculateAge(user.dateOfBirth)}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                    {index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- Agent Details ---------------- */}
      {formData.agent && (
        <div>
          <h3 className="text-gray-600 text-sm font-semibold mb-2.5">
            Agency Details
          </h3>

          <div className="border rounded-md p-2.5">
            <p className="text-sm font-medium">{formData.agent.agency_name}</p>
            <div className="text-xs text-gray-600 mt-1 space-y-0.5">
              <p>Phone: {formData.agent.agency_number}</p>
              <p>Agent: {formData.agent.agent_name}</p>
              <p>Email: {formData.agent.agent_email}</p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Special Message ---------------- */}
      {formData.message && (
        <div>
          <h3 className="text-gray-600 text-sm font-semibold mb-2.5">
            Message
          </h3>
          <p className="text-sm border rounded-md p-2 bg-gray-50">
            {formData.message}
          </p>
        </div>
      )}
    </div>
  );
}
