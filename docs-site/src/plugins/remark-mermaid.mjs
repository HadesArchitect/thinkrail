import { visit } from "unist-util-visit";

const escapeHtml = (value) =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default function remarkMermaid() {
	return (tree) => {
		visit(tree, "code", (node, index, parent) => {
			if (node.lang !== "mermaid" || !parent || index === undefined) return;
			parent.children[index] = {
				type: "html",
				value: `<pre class="mermaid" data-pagefind-ignore>${escapeHtml(node.value)}</pre>`,
			};
		});
	};
}
