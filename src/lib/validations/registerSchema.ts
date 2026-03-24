import { z } from "zod";

export const registerSchema = z
    .object({
        email: z.email("Invalid email"),
        password: z.string().min(6, "Min 6 characters"),
        confirmPassword: z.string(),
        name: z.string().min(3, "Min 3 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });