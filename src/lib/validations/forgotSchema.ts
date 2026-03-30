import { z } from "zod";

export const forgotSchema = z.object({
    email: z.email("Invalid email").min(1, "Email is required"),
});

export type ForgotPasswordInput = z.infer<typeof forgotSchema>;