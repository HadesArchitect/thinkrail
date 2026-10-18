import path from "node:path";

// Astro runs with the project root as cwd; import.meta.url is unreliable once bundled into dist/.prerender.
const siteRoot = process.cwd();

function normalizeBase(value) {
	const trimmed = value.trim().replace(/\/+$/, "");
	if (trimmed === "") return "";
	return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export const SITE = process.env.DOCS_SITE ?? "https://hadesarchitect.github.io";
// Preview builds stay out of search engines: robots noindex, and no `site` so Starlight emits no sitemap or canonical URLs.
export const NOINDEX = (process.env.DOCS_NOINDEX ?? "1") !== "0";
export const BASE = normalizeBase(process.env.DOCS_BASE ?? "/thinkrail");

export const DOCS_DIR = path.resolve(siteRoot, process.env.DOCS_DIR ?? "../docs");
export const REPO_ROOT = path.resolve(
	siteRoot,
	process.env.DOCS_REPO_ROOT ?? path.join(DOCS_DIR, ".."),
);

export const REPO_URL = (
	process.env.DOCS_REPO ?? "https://github.com/HadesArchitect/thinkrail"
).replace(/\/+$/, "");
export const REPO_REF = process.env.DOCS_REF ?? "claude/thinkrail-docs-draft-39556b";
export const SOCIAL_GITHUB_URL = "https://github.com/JetBrains/thinkrail";
export const SOCIAL_DISCORD_URL = "https://discord.gg/Wybu9ceWkY";

export const repoBlobUrl = (repoRelativePath, kind = "blob") =>
	`${REPO_URL}/${kind}/${REPO_REF}/${repoRelativePath.split(path.sep).join("/")}`;

export const EDIT_BASE_URL = `${REPO_URL}/edit/${REPO_REF}/${path
	.relative(REPO_ROOT, DOCS_DIR)
	.split(path.sep)
	.join("/")}/`;

export const routeFor = (slug) => (slug === "index" ? `${BASE}/` : `${BASE}/${slug}/`);
