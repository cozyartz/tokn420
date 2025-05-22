// /src/content/config.ts
import { defineCollection, z } from "astro:content";

const zine = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    publishDate: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  zine,
};