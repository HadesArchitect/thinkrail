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
| [`index.md`](index.md) | Docs home page: front-door questions, the first three steps, and the map |
| [`get-started/`](get-started/) | What ThinkRail is, coming from `pi`, install, connect a provider, first change |
| [`workspaces/`](workspaces/) | Workspaces and isolation, parallel agents, managing workspaces, your editor |
| [`agent/`](agent/) | ThinkRail and `pi`, models, steering, subagents, the tools the agent can call |
| [`specs/`](specs/) | Living specs, spec-first projects, plans, built-in workflows, the spec format |
| [`review/`](review/) | Reviewing changes, undo and discard, pull requests |
| [`extend/`](extend/) | Extensions, skills and prompt templates, MCP servers and their configuration, packages for `pi` |
| [`security/`](security/) | Security and data overview, trust, privacy, telemetry |
| [`run/`](run/) | Troubleshooting, updates, backup, remote machines, building from source, platforms |
| [`reference/`](reference/) | Whole-product lookups: CLI, settings, keyboard shortcuts, files and environment, glossary |
| [`changelog.md`](changelog.md) | Release notes from v0.1.0 to the current nightly line |
| [`about-these-docs/`](about-these-docs/) | IA rationale, reader study, docs automation plan, hosting options, and the authoring guide |
| [`navigation.yml`](navigation.yml) | The single, platform-neutral source of page order and grouping |
| [`assets/`](assets/) | Images referenced by pages |

Navigation and folders follow the product: one area per thing ThinkRail has, plus a shared Reference
shelf. [Diátaxis](https://diataxis.fr/) is the discipline for each page: every page is exactly one of
tutorial, how-to, reference, or explanation, and says which in its `type` frontmatter. The type does
not decide a page's folder or its place in the sidebar.

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
