import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      coverImage: image().optional(),
      draft: z.boolean().default(false)
    })
});

const art = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/art' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      medium: z.string(),
      tags: z.array(z.string()).default([]),
      images: z.array(image()),
      featured: z.boolean().default(false)
    })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      kind: z.enum(['game', 'web']),
      tags: z.array(z.string()).default([]),
      coverImage: image(),
      description: z.string(),
      links: z
        .array(
          z.object({
            label: z.string(),
            url: z.string().url()
          })
        )
        .default([]),
      embed: z.string().optional()
    })
});

export const collections = { blog, art, projects };
