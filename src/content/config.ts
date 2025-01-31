import { glob } from "astro/loaders";
import { ProjectRoleEnum, ProjectTypeEnum } from "~types/project.type";
import { z } from "zod";
import { defineCollection } from "astro:content";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    projectType: ProjectTypeEnum,
    imageUrl: z.string(),
    siteUrl: z.string().url(),
    roles: z.array(ProjectRoleEnum),
    companyName: z.string(),
    projectName: z.string(),
    shortDescription: z.string(),
    startedAt: z.string(),
    endedAt: z.string(),
    stackIds: z.array(z.number()),
  }),
});

const posts = defineCollection({
  type: "content_layer",
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default("Astoir"),
      createdAt: z.string(),
      updatedAt: z.string(),
      title: z.string(),
      pinned: z.boolean().default(false),
      draft: z.boolean().default(true),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      series: z.string().optional(),
      description: z.string(),
    }),
});

// 사용할 컬렉션만 명시적으로 export
export const collections = {
  projects,
  posts,
};
