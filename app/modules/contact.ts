import { z } from "zod";

export const contactSchema = z.object({
  email: z.string({ message: "required" }).email({ message: "email" }),
  message: z.string({ message: "required" }),
  name: z.string({ message: "required" }),
});
