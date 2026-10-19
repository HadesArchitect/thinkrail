import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { DOCS_DIR } from "./site.mjs";

// Parses docs/navigation.yml: each item is a page path (top-level paths become top-level links) or a
// group { label, items, collapsed? }; `collapsed: true` passes through to the Starlight sidebar group.

const toSlug = (file) => file.replace(/\.md$/, "").replace(/\/index$/, "");

export function readTitle(file) {
	const source = fs.readFileSync(path.join(DOCS_DIR, file), "utf8");
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return undefined;
	const title = yaml.load(match[1])?.title;
	return typeof title === "string" ? title : undefined;
}

let cachedTree;

export function loadNavigation() {
	if (cachedTree) return cachedTree;
	const raw = yaml.load(fs.readFileSync(path.join(DOCS_DIR, "navigation.yml"), "utf8")) ?? [];
	const walk = (items) =>
		items.flatMap((item) => {
			if (typeof item === "string") {
				if (!fs.existsSync(path.join(DOCS_DIR, item))) {
					console.warn(`[docs-site] navigation.yml lists missing page, skipping: ${item}`);
					return [];
				}
				return [{ file: item, slug: toSlug(item) }];
			}
			const children = walk(item.items ?? []);
			return children.length > 0
				? [{ label: item.label, items: children, collapsed: item.collapsed === true }]
				: [];
		});
	cachedTree = walk(raw);
	return cachedTree;
}

export function flattenNavigation(tree = loadNavigation()) {
	return tree.flatMap((node) => (node.items ? flattenNavigation(node.items) : [node]));
}

export function firstPageUnder(directory) {
	const prefix = `${directory.replace(/\/+$/, "")}/`;
	return flattenNavigation().find((page) => page.file.startsWith(prefix));
}

export function starlightSidebar() {
	const convert = (nodes) =>
		nodes.map((node) =>
			node.items
				? { label: node.label, items: convert(node.items), collapsed: node.collapsed }
				: { slug: node.slug, label: readTitle(node.file) ?? node.slug },
		);
	return convert(loadNavigation());
}
