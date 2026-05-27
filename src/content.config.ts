import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string().optional(),
      tagline_en: z.string().optional(),
      type: z.string(),
      type_en: z.string().optional(),
      year: z.string(),
      summary: z.string(),
      summary_en: z.string().optional(),
      problem: z.string(),
      build: z.string(),
      stack: z.array(z.string()),
      cover: image().optional(),
      gallery: z.array(image()).optional(),
      bgVideo: z.string().optional(),
      accent: z.string(),
      accent2: z.string(),
      repo: z.string().optional(),
      demo: z.string().optional(),
      category: z.enum([
        "cliente",
        "personal",
        "fullstack",
        "practicas",
        "mobile",
        "ia",
      ]),
      // Icono del logo en el card del deck (cada proyecto debe tener uno distinto).
      logoIcon: z
        .enum([
          "box",
          "map-pin",
          "tooth",
          "egg",
          "megaphone",
          "paw",
          "ticket",
          "users",
          "clipboard",
          "pen",
        ])
        .default("box"),
      order: z.number().default(0),
    }),
});

export const collections = { projects };
