---
title: Hosting options
description: Where the ThinkRail docs could be published, what JetBrains projects do today, and how the main docs tools and hosting setups compare.
type: explanation
status: draft
---

The content in `docs/` is platform-neutral, so the choice of tool and host is still open. This page frames that decision for the maintainers: what comparable projects do, how the candidate tools differ, and three concrete hosting setups.

Research for this page was done on 2026-10-18. Versions and plan terms come from package registries and vendor pages on that date and will drift.

## What JetBrains projects do today

The table lists a sample of JetBrains and JetBrains-backed projects and how they publish docs. It is not exhaustive.

| Project | Docs site | Tool | Host |
| --- | --- | --- | --- |
| Koog | [docs.koog.ai](https://docs.koog.ai) | MkDocs Material, `mkdocs-llmstxt` | GitHub Pages, custom domain |
| Tracy | [jetbrains.github.io/tracy](https://jetbrains.github.io/tracy/latest/) | MkDocs Material, `mike` versioning | GitHub Pages |
| Hexana | [jetbrains.github.io/hexana](https://jetbrains.github.io/hexana/) | MkDocs Material | GitHub Pages |
| Kotlin Toolchain (ex-Amper) | [kotlin-toolchain.org](https://kotlin-toolchain.org/latest/) | MkDocs Material, `mike` | GitHub Pages, own domain |
| Roer (agent workspace) | [jetbrains.github.io/roer](https://jetbrains.github.io/roer/) | Plain Markdown in `docs/`, custom landing page script | GitHub Pages |
| Kotlin DataFrame | [kotlin.github.io/dataframe](https://kotlin.github.io/dataframe/home.html) | Writerside | GitHub Pages |
| Kandy | [kotlin.github.io/kandy](https://kotlin.github.io/kandy/) | Writerside | GitHub Pages |
| kotlinx.rpc | [kotlin.github.io/kotlinx-rpc](https://kotlin.github.io/kotlinx-rpc/) | Writerside | GitHub Pages |
| Exposed | [jetbrains.com/help/exposed](https://www.jetbrains.com/help/exposed/) | Writerside | JetBrains help portal |
| Ktor | [ktor.io/docs](https://ktor.io/docs/) | Writerside | Own domain, S3 and CloudFront |
| Junie | [junie.jetbrains.com/docs](https://junie.jetbrains.com/docs/) | Writerside | Own domain |
| Agent Client Protocol (with Zed) | [agentclientprotocol.com](https://agentclientprotocol.com) | Mintlify | Vercel |
| IdeGYM (JetBrains Research) | [jetbrains-research.github.io/idegym](https://jetbrains-research.github.io/idegym/) | Docusaurus | GitHub Pages |

In nearly every case the docs live in the same repository as the code. GitHub Pages is the default host, both on `github.io` subpaths and on custom domains such as Koog's.

MkDocs Material on GitHub Pages is the common choice for newer, AI-era projects (Koog, Tracy, Hexana, Kotlin Toolchain). Writerside dominates the Kotlin ecosystem and the IDE help portal. The sample contains no project on Starlight or VitePress, and Docusaurus and Mintlify each appear once. Roer, the closest peer to ThinkRail, publishes plain Markdown. Of these, only Koog and Hexana serve an `llms.txt`, and Koog pairs it with a custom domain.

## Writerside status

JetBrains announced in March 2025 that it was [sunsetting the standalone Writerside IDE](https://platform.jetbrains.com/t/sunsetting-writerside-ide/874) because the market was too small to sustain it ([blog announcement](https://blog.jetbrains.com/writerside/2025/03/sunsetting-writerside-ide/)). The plugin stays free on JetBrains Marketplace, with updates and fixes promised for the foreseeable future because JetBrains technical writers use it internally.

Development continues. The [plugin help](https://www.jetbrains.com/help/writerside/8530.html) lists a 2026 build, there is a [llms.txt generator](https://www.jetbrains.com/help/writerside/generate-llms-txt.html), and a [Docker and GitHub Action builder](https://www.jetbrains.com/help/writerside/deploy-docs-to-github-pages.html) is current. No replacement has been announced.

For ThinkRail the weak points are practical: authoring needs the IntelliJ plugin and a Writerside-specific project layout, the Markdown dialect does not port, theming cannot match the website, and the output is a prebuilt static folder that cannot join the Astro build. Its one unique advantage is publishing under `jetbrains.com/help/`, which needs the JetBrains docs team and was not confirmed.

> [!WARNING]
> The blog announcement returned HTTP 403 during research. Its details come from the forum post and a search snippet.

## Candidates compared

| | Starlight | Docusaurus | VitePress | MkDocs Material / Zensical | Writerside | GitBook | Mintlify |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fit with the Astro site | Native integration | Second React app | Second Vue app | Second Python build | Prebuilt folder | Hosted, CNAME | Hosted, CNAME |
| Markdown portability | High | MDX, `:::` | Vue extensions | Python-Markdown | Own dialect | Git Sync | Proprietary MDX |
| Theming freedom | High | Very high | High | Medium | Low | Low | Low |
| Search | Pagefind, built in | Algolia | Local, built in | Built in | Built in | Built in | Built in |
| Versioning | Community plugin | Built in | None | `mike` | Supported | Variants | Supported |
| llms.txt / AI output | Community plugin | Community | Community | `mkdocs-llmstxt` | Built in | Built in | Built in |
| Maintenance health | Active, pre-1.0 | Active, v4 in canary | Stable line stale | Material in maintenance mode | Plugin only | Vendor | Vendor |
| Cost | $0 | $0 | $0 | $0 | $0 | Free tier unlikely to apply | Free tier limited |

Notes that the cells cannot carry:

- **Starlight** is pre-1.0, so Astro and Starlight bumps are coupled. `@astrojs/starlight` 0.42 needs Astro 7.2.10 or newer.
- **MkDocs Material** accepts only critical fixes until 2027-05-05. Its successor, [Zensical](https://squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/), reads `mkdocs.yml` but is pre-0.1 and lacks plugin parity. A new site on Material carries a migration within about six months.
- **VitePress** has a stable line last released in August 2025, and the website spec already rejects it as a Vue stack.
- **Docusaurus** is the safest large ecosystem and has built-in versioning, but it brings a second toolchain beside Astro.
- **Mintlify** is ruled out: customization is limited, and white-labeling is an Enterprise feature.
- **GitBook** has a [Community plan](https://gitbook.com/docs/account-and-billing/plans/community) whose open-source rules exclude projects tied to a for-profit or venture-backed company, so a JetBrains project likely does not qualify.

## Three hosting options

### Option A: Starlight at thinkrail.ai/docs

> [!TIP]
> Recommended. It is the fastest and most integrated route, and the Markdown moves unchanged to option C later.

**How it works.** Add [Starlight](https://starlight.astro.build/) to `apps/website`, build the docs in the same Astro build, and ship them in the existing Cloudflare Pages deploy under `/docs/`.

**Pros**
- One domain, so search ranking, analytics, and navigation are shared with the marketing site.
- Pagefind search needs no external service.
- The existing PR preview workflow covers docs automatically.
- Starlight can be themed from the site's palette tokens.
- Contributors edit plain Markdown in the same PR as the code.

**Costs and risks**
- Starlight is pre-1.0 and breaking minors are common.
- Docs deploy only with the website, so a docs fix redeploys the whole site, including the D1 migration step.
- Versioned docs rely on a community plugin.
- Compatibility with the site's Sätteri Markdown pipeline and sitemap setup has not been tested.

**Work needed**
- Bump `astro` from 7.2.8 to 7.2.10 or newer, and `@astrojs/markdown-satteri` from 0.3.7 to 0.4.0 or newer. The alternative is pinning Starlight 0.41.x.
- Amend `apps/website/SPEC.md`, which pins "no React, no Tailwind" for landing and blog, and the island-count constraints in `validateBuild.ts`.
- Add the docs paths to the `site.yml` workflow trigger.
- Wire PostHog and the sitemap filter into Starlight's head overrides.
- Add community plugins for `llms.txt`, Mermaid, and link validation.

### Option B: GitHub Pages

**How it works.** A GitHub Actions workflow builds the docs and deploys them to `jetbrains.github.io/thinkrail`, or to a custom domain through a CNAME as Koog does. The tool can be MkDocs Material, Starlight, or Docusaurus.

**Pros**
- It matches the convention of other JetBrains open-source repositories, and a `github.io` URL signals an official project.
- No change to the website, its spec, or its Cloudflare deploy.
- Free, with independent release timing.

**Costs and risks**
- A JetBrains org admin must enable Pages. The Pages API returns 404 for the repository today, and Roer's workflow notes org-private Pages visibility.
- The docs are on a separate origin, so analytics and look and feel can drift from the website.
- A subpath deploy needs a base-path setting.
- Choosing MkDocs Material means planning the Zensical migration up front.
- No PR preview URLs without extra setup.

**Work needed**
- A docs build configuration, a Pages workflow, and an org-level Pages decision.

### Option C: docs.thinkrail.ai on its own Cloudflare Pages project

**How it works.** A standalone docs project, for example `apps/docs`, deploys to its own Cloudflare Pages project with `docs.thinkrail.ai` as a custom domain.

**Pros**
- Independent deploy cadence and dependencies, with no coupling to the website's Astro version, D1 step, or spec.
- Free choice of tool, including Docusaurus versioning.

**Costs and risks**
- Two sites to theme and keep consistent, with a second `package.json`, deploy workflow, and preview setup.
- A subdomain splits search authority from `thinkrail.ai`.
- Cross-site navigation needs a shared header.

**Work needed**
- A new workspace package, a Cloudflare project, DNS for the subdomain, and a deploy workflow.

## What the preview demonstrates

The Starlight proof of concept in [`docs-site/`](../../docs-site/README.md) renders `docs/` unchanged. A content loader reads the folder, the sidebar is generated from [`navigation.yml`](../navigation.yml), and three small plugins handle relative `.md` links, GitHub alerts, and Mermaid blocks.

Because the pages need no per-page edits, option A or C is a short step from the preview. Switching to another tool means re-implementing roughly three small transforms plus a mapping from `navigation.yml` to that tool's sidebar format.

## Open questions for maintainers

- **Domain.** Is `thinkrail.ai/docs`, `docs.thinkrail.ai`, or a `jetbrains.github.io` URL the right public address? Is the JetBrains help portal on the table?
- **Review ownership.** Who reviews docs changes, and do they ship with feature PRs?
- **Versioning.** Do you need versioned docs at launch, or can one "latest" version serve until the nightly line stabilizes?
- **Search.** Is built-in Pagefind enough, or do you want Algolia?
- **Analytics.** How should docs analytics follow the website's consent policy?
- **AI output.** Should the site publish `llms.txt` and per-page Markdown?
- **Pages access.** If option B, who can enable GitHub Pages for the repository?
