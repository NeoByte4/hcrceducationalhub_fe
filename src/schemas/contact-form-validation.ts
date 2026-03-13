import { z } from "zod";
import { stringValidation } from "./generic-validation";

export const contactFormSchema = z.object({
  firstName: stringValidation("first name"),
  lastName: stringValidation("last name"),
  email: z.email("Please enter a valid Email"),
  message: stringValidation("description"),
  allowSubsciption: z.boolean().optional(),
});

export type IContactFormSchema = z.infer<typeof contactFormSchema>;
