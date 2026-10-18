import { defineCollection } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { DOCS_DIR } from "./lib/site.mjs";

const homeFrontmatter = {
	template: "doc",
	tableOfContents: false,
	hero: {
		title: "ThinkRail documentation",
		tagline: "The agentic IDE that gets better every time you use it.",
		actions: [
			{
				text: "Get started",
				link: "get-started/first-change",
				variant: "primary",
			},
			{ text: "Install", link: "get-started/install", variant: "secondary" },
		],
	},
};

const docsGlob = glob({ pattern: ["**/*.md", "!README.md"], base: DOCS_DIR });

// Keeps docs/index.md platform-neutral: the home hero is injected here, before schema validation.
const docsLoader = {
	...docsGlob,
	load: (context: Parameters<typeof docsGlob.load>[0]) =>
		docsGlob.load({
			...context,
			parseData: (entry) =>
				context.parseData(
					entry.id === "index" ? { ...entry, data: { ...entry.data, ...homeFrontmatter } } : entry,
				),
		}),
};

export const collections = {
	docs: defineCollection({
		loader: docsLoader,
		schema: docsSchema({
			extend: z.object({
				type: z.enum(["tutorial", "how-to", "reference", "explanation"]),
				status: z.enum(["complete", "draft", "outline"]),
			}),
		}),
	}),
};
