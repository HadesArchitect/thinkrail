---
title: Making the docs agent-friendly
description: How the ThinkRail docs serve AI agents as well as people, what the doc set already does for them, and the options still open.
type: explanation
status: draft
---

ThinkRail's docs have two kinds of readers: people in a browser, and agents, including ThinkRail's own
`pi` agent, that read the files to answer a question or draft an update. This page explains which
choices already make the docs work for agents, and which further steps are still proposals.

## Why agents are a first-class reader

An agent cannot see the sidebar, a status badge, or a highlighted callout unless that meaning is also
in the text. It follows links by path, cites headings, and trusts what it reads unless the page says a
claim is uncertain. A page that reads well as raw text usually reads well rendered; the reverse is not
always true.

The [docs automation](docs-automation.md) plan raises the stakes: agents that draft docs updates from
changesets must read the existing pages and know where a new one belongs.

## What the doc set already does

These rules hold today. They live in the [authoring guide](authoring-guide.md),
[`navigation.yml`](../navigation.yml), and the `docs-site/` preview.

| Practice | What an agent gets |
| --- | --- |
| **Plain CommonMark and GFM, no MDX.** Callouts are GitHub alerts, diagrams are fenced `mermaid` blocks, and the only HTML is `<details>`. | The raw `.md` file reads as well as the rendered page. |
| **Fixed frontmatter.** Every page has `title`, `description`, `type`, and `status`. The preview build rejects a `type` or `status` outside the allowed values. | Metadata it can parse without reading the body, including whether a page is `complete`, `draft`, or `outline`. |
| **One Diátaxis type per page.** | It knows whether a page is for lookup, steps, or reasons. |
| **One navigation file.** Order and grouping live only in `navigation.yml`; slugs come from file paths. | Every page in reading order, without inferring structure from filenames. |
| **Relative `.md` links.** | Links resolve in the repository checkout, so it can open the target file directly. |
| **Task-shaped titles and `##` sections.** How-to titles start with a verb. | Predictable anchors to cite, and titles that match the task a reader asks about. |
| **Facts checked against code.** Claims nobody could confirm carry a `> [!WARNING]` that starts with "Unverified". | It can tell confirmed from unconfirmed behavior in plain text. |
| **One page, one purpose.** | Short pages that fit in context and answer one question. |
| **A [glossary](../reference/glossary.md)** plus a list of terms to avoid. | Stable vocabulary, so a search for "workspace" finds the right pages. |
| **A changeset's `area:` is the folder slug.** | A drafting agent knows where to write without reading the navigation. |

Two limits apply. The preview checks only `type` and `status`, so "no other keys" and the
160-character `description` are conventions, not build errors. Its link plugin warns about a missing
page but does not fail the build, and it does not check anchors.

## Options not yet decided

None of these exist today. The [information architecture](information-architecture.md) next steps and
[hosting options](hosting-options.md) raise some of them.

| Option | What it would add | Notes |
| --- | --- | --- |
| **`llms.txt` and `llms-full.txt`** | A page index with descriptions, and one file with the full text | The preview generates neither. Starlight needs a community plugin. |
| **Raw Markdown per page** | A stable URL serving each page's source | Today the closest equivalent is the source on GitHub, through the **Edit page** link. |
| **Stable anchors** | A rule that a renamed heading or moved page keeps its old anchor or gets a redirect | Anchors come from heading text, so rewording a heading breaks saved links. |
| **Link and anchor check in CI** | A build that fails on a broken link or anchor | No docs check runs in CI today. |
| **Generated reference** | CLI, Settings, shortcut, and tool reference rendered from source | See [Docs automation](docs-automation.md). Generated tables cannot drift. |
| **Docs shipped to the agent** | The docs available to `pi` inside ThinkRail, as a bundled skill or an MCP resource | Answers "how do I…" from the docs for the installed version. |

> [!WARNING]
> Unverified: whether ThinkRail's `pi` can read MCP resources, as opposed to MCP tools, was not
> checked. A bundled skill is the more conservative route, because ThinkRail already ships skills to
> `pi`.

## Trade-offs

Each option costs maintenance. An `llms-full.txt` that bundles draft pages can teach an agent
unconfirmed behavior, so an export could skip pages whose `status` is not `complete`. Docs shipped in
the app follow its release cadence, while a hosted export can lag an installed nightly. A strict anchor
policy slows editing. The rules that already hold cost almost nothing, which is why they came first.
