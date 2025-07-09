import z, { string } from "zod";

export const courseLevel = ["Beginner", "Intermediate", "Advance"] as const;
export const courseStatus = ["Draft", "Published", "Archive"] as const;
export const courseCategories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Game Development",
  "Business",
  "Marketing",
  "Finance",
  "Product Management",
  "Personal Development",
  "Language Learning",
] as const;
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  fileKey: z.string().min(1, { message: "File is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration must be at most 500 hour" }),
  level: z.enum(courseLevel, { message: "Level is required" }),
  category: z.enum(courseCategories, { message: "Level is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be at least 3 characters long" })
    .max(200, {
      message: "Small description must be at most 200 characters long",
    }),
  slug: string().min(3, {
    message: "Slug must be at least 3 characters long",
  }),
  status: z.enum(courseStatus, { message: "Status is required" }),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
