import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid("Invalid product ID"),

        qty: z
          .number()
          .int("Quantity must be an integer")
          .min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one item is required"),

  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must be less than 100 characters"),

  street: z
    .string()
    .min(5, "Street must be at least 5 characters")
    .max(255, "Street is too long"),

  city: z
    .string()
    .min(2, "City is required")
    .max(100, "City is too long"),

  postalCode: z
    .string()
    .min(3, "Postal code is required")
    .max(20, "Postal code is too long"),

  country: z
    .string()
    .min(2, "Country is required")
    .max(100, "Country is too long"),

  paymentMethod: z.enum(["COD", "CARD", "ONLINE"]).optional(),


});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;