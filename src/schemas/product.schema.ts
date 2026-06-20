import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255, "Name is too long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  category: z.string().min(2, "Category is required").max(100, "Category is too long"),
  stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative"),
  ratings: z.number().min(0).max(5).optional(),
  imageUrl: z.string().url("Invalid image URL").optional(), 
});
export const updateProductSchema = productSchema.partial();

export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;