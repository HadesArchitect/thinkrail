# ThinkRail docs site (Starlight proof of concept)

A throwaway [Astro Starlight](https://starlight.astro.build/) site that renders the platform-neutral
Markdown in [`../docs`](../docs) **without modifying a single page**. It exists to show that the content
is platform-ready and what a branded site could look like; it does not pre-empt the hosting decision
(see `docs/about-these-docs/hosting-options.md`).

It is a standalone npm project, deliberately **not** part of the root Bun workspace (the root
`bun.lock` and `package.json` are untouched). All dependencies are pinned exactly and `package-lock.json`
is committed.

## Commands

```bash
cd docs-site
npm ci               # install from the lockfile
npm run dev          # http://localhost:4321/thinkrail/
npm run build        # static site in dist/, including the Pagefind search index
npm run preview      # serve dist/ locally
```

Environment variables (all optional):

| Variable | Default | Purpose |
| --- | --- | --- |
| `DOCS_SITE` | `https://hadesarchitect.github.io` | Astro `site` |
| `DOCS_BASE` | `/thinkrail` | Astro `base` (use `/` for a root domain) |
| `DOCS_REPO` | `https://github.com/HadesArchitect/thinkrail` | Repo for edit links and rewritten source links |
| `DOCS_REF` | `claude/thinkrail-docs-draft-39556b` | Branch or tag for those links |
| `DOCS_DIR` | `../docs` | Content directory (handy for testing against a fixture) |
| `DOCS_REPO_ROOT` | parent of `DOCS_DIR` | Root that out-of-docs links resolve against |

Astro caches rendered Markdown by content digest. After editing a plugin, clear the cache:
`rm -rf .astro node_modules/.astro`.

Deploy helpers (neither runs automatically):

- `.github-workflow-example/docs-preview.yml` is an example GitHub Actions workflow (npm build, then
  `actions/deploy-pages`). Copy it to `.github/workflows/` to use it.
- `scripts/deploy-gh-pages.sh` builds and force-pushes `dist/` to the `gh-pages` branch of `origin`
  from a temporary directory.

## How the neutral content maps onto Starlight

| Neutral contract (`docs/`) | Starlight PoC |
| --- | --- |
| `**/*.md` pages, slugs from file paths | `src/content.config.ts`: a `glob` loader on `../docs` (excluding `README.md`) with `docsSchema` extended by `type` and `status` enums. `index.md` becomes the home route. |
| `index.md` stays neutral | The same file's loader wraps `parseData` so the entry with id `index` gets `template: splash` and a hero before schema validation. `src/components/Hero.astro` renders the landing (logo, tagline, CTAs, workbench screenshot, section cards). The Markdown body renders below it. |
| `navigation.yml` | `src/lib/nav.mjs` parses it at config time into Starlight's `sidebar` (nested groups; labels from each page's frontmatter `title`). Listed pages that do not exist yet are skipped with a warning, so the build works while pages are being written. |
| Relative `.md` links | `src/plugins/remark-docs-links.mjs` rewrites them (keeping `#anchors`) to routes under `base`. Links to a docs directory go to that section's first page; links to files outside the page set (`navigation.yml`, `README.md`) or outside `docs/` (`../../architecture.md`) become absolute GitHub URLs for `DOCS_REPO`/`DOCS_REF`. |
| GitHub alerts (`> [!NOTE]`) | `src/plugins/remark-github-alerts.mjs` turns them into the directive nodes Starlight's own aside plugin consumes, so they get Starlight's icons and styling. NOTE and TIP map directly; IMPORTANT becomes a note titled "Important"; WARNING becomes a caution titled "Warning"; CAUTION becomes a danger titled "Caution". |
| ` ```mermaid ` fences | `src/plugins/remark-mermaid.mjs` emits `<pre class="mermaid">`; `src/scripts/mermaid-client.ts` lazy-loads the `mermaid` npm package only on pages that contain a diagram and re-renders when the light/dark theme changes. |
| `type` / `status` frontmatter | `PageTitle.astro` shows a type badge (Tutorial, How-to, Reference, Explanation), a Draft or Outline badge, and an "Outline: planned structure" banner. `Banner.astro` shows the site-wide "Draft documentation preview" notice. |
| Images in `docs/assets` | Resolved relative to each Markdown file by Astro's image pipeline (`vite.server.fs.allow` includes the parent directory for dev). |
| Edit links | `editLink.baseUrl` ends in `.../edit/<ref>/docs/`; Starlight appends the entry's `../docs/<path>.md` file path, which normalizes to the right source file. |

Other notes: Starlight only runs its asides and heading-link plugins on its own collection directory, so
`markdown.processedDirs` points at `../docs`. Branding lives in `src/styles/theme.css` (ThinkRail zinc
neutrals, `#8dff4f` accent on dark and a deeper AA-safe green on light, Geist, JetBrains Mono, Orbitron
for the site title only). Pagefind search is on; last-updated is off.

## Porting the same content elsewhere

**Docusaurus.** Point the docs plugin at `../docs` with `routeBasePath: '/'`. Frontmatter `title` and
`description` work as-is; extra keys are ignored. Docusaurus rewrites relative `.md` links itself and
supports Mermaid with `@docusaurus/theme-mermaid`. GitHub alerts need a small remark plugin or the
`:::note` syntax via a one-time conversion; `navigation.yml` becomes a generated `sidebars.js`.
`docs/index.md` becomes the root doc.

**VitePress.** Set `srcDir` to `docs` (or symlink it). Relative `.md` links work natively, and recent
VitePress versions render GitHub alerts (`> [!NOTE]`) out of the box. Mermaid needs
`vitepress-plugin-mermaid`. Generate `themeConfig.sidebar` from `navigation.yml` in `config.mts`, and
map `index.md` to a `layout: home` hero with a config-level transform or a one-line frontmatter tweak.

**MkDocs (Material).** Set `docs_dir: docs` and convert `navigation.yml` to the `nav:` key (a small
script, since the shapes are almost identical). Relative `.md` links, `<details>` (with `pymdownx.details`),
Mermaid (via `pymdownx.superfences` custom fence) and admonitions work; GitHub alerts need the
`mkdocs-callouts` plugin or a conversion to `!!! note`. Frontmatter `title` and `description` are read
natively; other keys are ignored. Because pages have no `# H1`, Material derives the page heading from `title`.
