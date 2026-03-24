import { z } from "zod";
import { stringValidation } from "./generic-validation";

const userSchema = z.object({
  fullName: stringValidation("Full Name"),
  email: z.string().email("Please enter a valid email address."),
  phone: stringValidation("Phone Number"),
  dateOfBirth: z.string().min(1, "Please enter a valid Date of Birth"),
});

const agentSchema = z.object({
  agency_name: z.string(),
  agency_number: z.string(),
  agent_name: z.string(),
  agent_email: z.string(),
});

export const bookingFormSchema = z
  .object({
    users: z.array(userSchema).min(1, "At least one traveller is required."),
    classType: z.string().min(1, "Class Type"),
    occupancyType: z.string().min(1, "Please enter a valid Occupancy Type"),
    country: z.string().min(1, "Please enter a valid Country"),
    message: z.string().optional(),
    date: z.string().min(1, "Please enter a valid Date of departure"),
    isAgentBooking: z.boolean().optional(),
    agent: agentSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.isAgentBooking) {
        return (
          !!data.agent?.agency_name &&
          data.agent.agency_name.trim().length > 0 &&
          !!data.agent?.agency_number &&
          data.agent.agency_number.trim().length > 0 &&
          !!data.agent?.agent_name &&
          data.agent.agent_name.trim().length > 0 &&
          !!data.agent?.agent_email &&
          data.agent.agent_email.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.agent.agent_email)
        );
      }
      return true;
    },
    {
      message: "All agent details are required when booking as an agent.",
      path: ["agent"],
    },
  );

export type BookingFormSchema = z.infer<typeof bookingFormSchema>;
