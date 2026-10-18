const diagrams = Array.from(document.querySelectorAll<HTMLElement>("pre.mermaid"));

if (diagrams.length > 0) {
	for (const el of diagrams) el.dataset.source = el.textContent ?? "";
	const { default: mermaid } = await import("mermaid");
	let renderId = 0;

	const token = (name: string) =>
		getComputedStyle(document.documentElement).getPropertyValue(name).trim();

	const render = async () => {
		const dark = document.documentElement.dataset.theme !== "light";
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: "strict",
			theme: "base",
			fontFamily: token("--sl-font"),
			themeVariables: {
				darkMode: dark,
				background: "transparent",
				primaryColor: token("--tr-surface"),
				primaryTextColor: token("--sl-color-white"),
				primaryBorderColor: token("--sl-color-accent"),
				secondaryColor: token("--sl-color-gray-5"),
				tertiaryColor: token("--sl-color-gray-6"),
				lineColor: token("--sl-color-gray-3"),
				textColor: token("--sl-color-text"),
				noteBkgColor: token("--sl-color-gray-5"),
				noteTextColor: token("--sl-color-white"),
			},
		});
		for (const el of diagrams) {
			try {
				const { svg } = await mermaid.render(`mermaid-${renderId++}`, el.dataset.source ?? "");
				el.innerHTML = svg;
				el.dataset.rendered = "true";
			} catch (error) {
				el.textContent = el.dataset.source ?? "";
				console.error("[docs-site] mermaid render failed", error);
			}
		}
	};

	await render();
	new MutationObserver(() => void render()).observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"],
	});
}
