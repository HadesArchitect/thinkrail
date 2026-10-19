import { visit } from "unist-util-visit";

const VARIANTS = {
	NOTE: { name: "note" },
	TIP: { name: "tip" },
	IMPORTANT: { name: "note", label: "Important" },
	WARNING: { name: "caution", label: "Warning" },
	CAUTION: { name: "danger", label: "Caution" },
};

const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*(\r?\n)?/i;

export default function remarkGithubAlerts() {
	return (tree) => {
		visit(tree, "blockquote", (node, index, parent) => {
			const paragraph = node.children[0];
			const text = paragraph?.type === "paragraph" ? paragraph.children[0] : undefined;
			if (text?.type !== "text") return;
			const match = text.value.match(MARKER);
			if (!match) return;
			const variant = VARIANTS[match[1].toUpperCase()];

			text.value = text.value.slice(match[0].length);
			if (text.value === "") paragraph.children.shift();
			if (paragraph.children.length === 0) node.children.shift();

			const children = [...node.children];
			if (variant.label) {
				children.unshift({
					type: "paragraph",
					data: { directiveLabel: true },
					children: [{ type: "text", value: variant.label }],
				});
			}
			parent.children[index] = {
				type: "containerDirective",
				name: variant.name,
				attributes: {},
				children,
			};
		});
	};
}
