# ThinkRail documentation (draft)

This folder holds the **first draft of ThinkRail's user documentation**: a complete information
architecture, a set of finished pages, outlines for the rest, and a changelog. It is written to be
moved onto whatever docs platform the team picks, so it deliberately has **no platform of its own yet**.

> [!IMPORTANT]
> Nothing here is published or decided. The hosting platform, URL, and final page set are open
> questions for the maintainers — see [Hosting options](about-these-docs/hosting-options.md).

## What is here

| Path | Contents |
| --- | --- |
| [`index.md`](index.md) | Docs home page |
| [`tutorials/`](tutorials/) | Learning-oriented lessons — follow along, end with a working result |
| [`how-to/`](how-to/) | Task-oriented guides for people who already know what they want |
| [`reference/`](reference/) | Dry, complete facts: CLI, settings, shortcuts, agent tools, file formats |
| [`explanation/`](explanation/) | Background and the reasoning behind ThinkRail's design |
| [`changelog.md`](changelog.md) | Release notes from v0.1.0 to the current nightly line |
| [`about-these-docs/`](about-these-docs/) | IA rationale, docs automation plan, hosting options, and the authoring guide |
| [`navigation.yml`](navigation.yml) | The single, platform-neutral source of page order and grouping |
| [`assets/`](assets/) | Images referenced by pages |

The structure follows [Diátaxis](https://diataxis.fr/): every page is exactly one of tutorial, how-to,
reference, or explanation, and says which in its frontmatter.

## Page status

Each page carries a `status` in its frontmatter:

- `complete` — reviewed against the source code at the time of writing; ready to publish.
- `draft` — substantially written, needs a maintainer review pass.
- `outline` — the page exists to show the IA; it holds the planned sections and the facts to cover.

## Portability rules

Pages are plain CommonMark + GitHub-flavored Markdown so they read correctly on GitHub today and port to
Starlight, Docusaurus, VitePress, MkDocs, or GitBook with mechanical changes only:

- YAML frontmatter with `title`, `description`, `type`, `status` — no platform-specific keys.
- Relative links to other `.md` files (they work on GitHub; site generators rewrite them).
- Callouts use GitHub alert syntax (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`).
- Diagrams use fenced `mermaid` blocks.
- No MDX, JSX components, shortcodes, or includes.
- Navigation lives only in [`navigation.yml`](navigation.yml), never in filenames or frontmatter.

The full authoring guide is in [`about-these-docs/authoring-guide.md`](about-these-docs/authoring-guide.md).

## Preview

A live build of this branch is published at
<https://hadesarchitect.github.io/thinkrail/>.

A throwaway proof-of-concept renders this folder with [Astro Starlight](https://starlight.astro.build/)
without changing a single page. It lives in [`../docs-site/`](../docs-site/) and is **not** part of the
monorepo workspace or CI:

```bash
cd docs-site
npm ci
npm run dev
```

The PoC exists to show that the content is platform-ready and what a branded site could look like — not
to pre-empt the platform decision.
