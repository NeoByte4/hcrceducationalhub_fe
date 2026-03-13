import { z } from "zod";

export const stringValidation = (label: string) =>
  z.string().min(2, `Please enter a valid ${label}.`);
