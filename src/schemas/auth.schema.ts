import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name must be less than 100 characters"),

        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(50, "Username must be less than 50 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

        email: z
            .string()
            .email("Invalid email address")
            .max(255, "Email is too long"),

        phoneNumber: z
            .string()
            .min(10, "Phone number is too short")
            .max(20, "Phone number is too long")
            .optional().or(z.literal("")),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(255, "Password is too long")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
        confirmPassword: z
            .string()
            .min(8, "Confirm password must be at least 8 characters")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterInput = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .max(255, "Email is too long"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password is too long")
})

export type LoginInput = z.infer<typeof loginSchema>;

export const verifyEmailSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6, "otp must be 6 characters").min(6,"otp must me min 6 characters").max(6,"otp must me max 6 characters")
})
    export type verifyEmailInput = z.infer<typeof verifyEmailSchema>;