import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { starlightSidebar } from "./src/lib/nav.mjs";
import { BASE, DOCS_DIR, EDIT_BASE_URL, NOINDEX, SITE, SOCIAL_DISCORD_URL, SOCIAL_GITHUB_URL } from "./src/lib/site.mjs";
import remarkDocsLinks from "./src/plugins/remark-docs-links.mjs";
import remarkGithubAlerts from "./src/plugins/remark-github-alerts.mjs";
import remarkMermaid from "./src/plugins/remark-mermaid.mjs";

export default defineConfig({
	site: NOINDEX ? undefined : SITE,
	base: BASE,
	markdown: {
		processor: unified({
			remarkPlugins: [remarkDocsLinks, remarkGithubAlerts, remarkMermaid],
		}),
	},
	vite: {
		server: { fs: { allow: [".."] } },
	},
	integrations: [
		starlight({
			title: "ThinkRail Docs",
			description:
				"Draft documentation preview for ThinkRail, the agentic IDE that gets better every time you use it.",
			logo: { src: "./src/assets/logo-mark.svg", alt: "ThinkRail" },
			favicon: "/favicon.svg",
			social: [
				{ icon: "github", label: "GitHub", href: SOCIAL_GITHUB_URL },
				{ icon: "discord", label: "Discord", href: SOCIAL_DISCORD_URL },
			],
			editLink: { baseUrl: EDIT_BASE_URL },
			lastUpdated: false,
			head: NOINDEX
				? [{ tag: "meta", attrs: { name: "robots", content: "noindex, nofollow" } }]
				: [],
			markdown: { processedDirs: [DOCS_DIR] },
			sidebar: starlightSidebar(),
			customCss: [
				"@fontsource-variable/geist",
				"@fontsource-variable/jetbrains-mono",
				"@fontsource-variable/orbitron",
				"./src/styles/theme.css",
			],
			components: {
				Banner: "./src/components/Banner.astro",
				PageTitle: "./src/components/PageTitle.astro",
				Hero: "./src/components/Hero.astro",
				Footer: "./src/components/Footer.astro",
			},
		}),
	],
});
