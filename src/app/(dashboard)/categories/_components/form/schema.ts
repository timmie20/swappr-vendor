import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.instanceof(File).optional(),
  slug: z.string().min(1, "Slug is required"),
});

export const categoryBulkFormSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
  published: z.boolean().optional(),
});
