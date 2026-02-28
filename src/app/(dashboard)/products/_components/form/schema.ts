import * as z from "zod";

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .instanceof(File, { message: "Product image is required" })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size must be less than ${MAX_FILE_SIZE_MB}MB`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported"
  );

export const productFormSchema = z
  .object({
    model: z
      .string()
      .min(1, { message: "Model name is required" })
      .max(100, "Model name must be 100 characters or less"),
    brand_id: z.string().min(1, { message: "Brand is required" }),
    category_id: z.string().min(1, { message: "Category is required" }),
    condition: z.string().min(1, { message: "Condition is required" }),
    carrier_status: z.enum(["unlocked", "locked"], {
      errorMap: () => ({ message: "Carrier status must be unlocked or locked" }),
    }),
    base_price: z.coerce
      .number({ invalid_type_error: "Base price must be a number" })
      .positive({ message: "Base price must be greater than zero" })
      .finite(),
    description: z
      .string()
      .min(1, { message: "Description is required" })
      .max(1000, "Description must be 1000 characters or less"),
    images: z
      .array(
        z.union([
          z.string().url({ message: "Each image must be a valid URL" }),
          z.literal(""),
        ])
      )
      .min(1, { message: "At least one image is required" })
      .refine((imgs) => imgs.some((img) => img !== ""), {
        message: "At least one valid image URL is required",
      }),
    specifications: z.object({
      processor: z.string().min(1, { message: "Processor is required" }),
      display: z.string().min(1, { message: "Display is required" }),
      camera: z.string().min(1, { message: "Camera is required" }),
      battery: z.string().min(1, { message: "Battery is required" }),
      material: z.string().min(1, { message: "Material is required" }),
    }),
    variants: z
      .array(
        z.object({
          color: z.string().min(1, { message: "Color is required" }),
          storage: z.coerce
            .number({ invalid_type_error: "Storage must be a number" })
            .int({ message: "Storage must be a whole number" })
            .positive({ message: "Storage must be greater than zero" }),
          price: z.coerce
            .number({ invalid_type_error: "Price must be a number" })
            .positive({ message: "Price must be greater than zero" })
            .finite(),
          stock_quantity: z.coerce
            .number({ invalid_type_error: "Stock quantity must be a number" })
            .int({ message: "Stock quantity must be a whole number" })
            .min(0, { message: "Stock quantity cannot be negative" }),
        })
      )
      .min(1, { message: "At least one variant is required" })
  })
  .superRefine((data, ctx) => {
    data.variants.forEach((variant, index) => {
      if (variant.price < data.base_price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Variant price must be greater than or equal to the base price",
          path: ["variants", index, "price"],
        });
      }
    });
  });

export const updateProductFormSchema = z.object({
  base_price: z.coerce
    .number({ invalid_type_error: "Base price must be a number" })
    .positive({ message: "Base price must be greater than zero" })
    .finite(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, "Description must be 1000 characters or less"),
  images: z
    .array(
      z.union([
        z.string().url({ message: "Each image must be a valid URL" }),
        z.literal(""),
      ])
    )
    .min(1, { message: "At least one image is required" })
    .refine((imgs) => imgs.some((img) => img !== ""), {
      message: "At least one valid image URL is required",
    }),
  specifications: z.object({
    processor: z.string().min(1, { message: "Processor is required" }),
    display: z.string().min(1, { message: "Display is required" }),
    camera: z.string().min(1, { message: "Camera is required" }),
    battery: z.string().min(1, { message: "Battery is required" }),
    material: z.string().min(1, { message: "Material is required" }),
  }),
});


export const productBulkFormSchema = z
  .object({
    published: z.coerce.boolean().optional(),
    category: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (typeof data.published === "undefined" && data.category === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one of the fields must be filled.",
        path: ["published"],
      });
    }
  });

export type ProductBulkFormData = z.infer<typeof productBulkFormSchema>;
