import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";
import { firstPageUnder } from "../lib/nav.mjs";
import { DOCS_DIR, REPO_ROOT, repoBlobUrl, routeFor } from "../lib/site.mjs";

const EXTERNAL = /^([a-z][a-z0-9+.-]*:|\/\/|\/|#)/i;

function resolveTarget(target) {
	const rel = path.relative(DOCS_DIR, target);
	const insideDocs = rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
	const isDirectory = fs.existsSync(target) && fs.statSync(target).isDirectory();

	if (insideDocs && !isDirectory && rel.endsWith(".md") && rel !== "README.md") {
		if (!fs.existsSync(target)) console.warn(`[docs-site] link to missing docs page: ${rel}`);
		return routeFor(rel.replace(/\.md$/, "").replace(/\/index$/, ""));
	}
	if (insideDocs && isDirectory) {
		if (rel === "") return routeFor("index");
		if (fs.existsSync(path.join(target, "index.md"))) return routeFor(rel);
		const first = firstPageUnder(rel);
		if (first) return routeFor(first.slug);
	}
	const repoRel = path.relative(REPO_ROOT, target);
	if (repoRel.startsWith("..") || path.isAbsolute(repoRel)) return undefined;
	return repoBlobUrl(repoRel, isDirectory ? "tree" : "blob");
}

export default function remarkDocsLinks() {
	return (tree, file) => {
		if (!file.path) return;
		const fromDir = path.dirname(file.path);
		visit(tree, ["link", "definition"], (node) => {
			const url = node.url;
			if (!url || EXTERNAL.test(url)) return;
			const hashAt = url.search(/[#?]/);
			const pathPart = hashAt === -1 ? url : url.slice(0, hashAt);
			const suffix = hashAt === -1 ? "" : url.slice(hashAt);
			if (pathPart === "") return;
			let decoded = pathPart;
			try {
				decoded = decodeURI(pathPart);
			} catch {}
			const resolved = resolveTarget(path.resolve(fromDir, decoded));
			if (resolved) node.url = `${resolved}${suffix}`;
		});
	};
}
