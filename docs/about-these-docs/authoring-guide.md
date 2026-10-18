---
title: Authoring guide
description: How ThinkRail docs pages are structured, formatted, and written so they stay portable across docs platforms.
type: reference
status: complete
---

This guide is the contract every page in `docs/` follows. It exists so the content can move to any
docs platform with mechanical changes only, and so pages written by different people read as one voice.

## One page, one purpose

Every page is exactly one [Diátaxis](https://diataxis.fr/) type. If a draft wants to be two types,
split it and link the halves.

| `type` | Reader is… | Page answers… | Shape |
| --- | --- | --- | --- |
| `tutorial` | learning | "Show me, I'll follow along." | Numbered steps toward one working result; no choices, no digressions |
| `how-to` | working | "How do I get X done?" | Goal in the title, prerequisites, steps, a check that it worked |
| `reference` | looking up | "What exactly is X?" | Tables and lists, complete and dry, structured like the thing it describes |
| `explanation` | thinking | "Why is it like this?" | Prose, context, trade-offs, alternatives considered |

Tutorials link out to reference for detail; how-tos link to explanation for "why"; explanation never
contains step-by-step instructions.

## Where a new page goes

The type lives in frontmatter; the folder and the sidebar follow the product.

- **The area of the thing the reader acts on.** A page goes in the area folder that owns that thing:
  `workspaces/`, `agent/`, `specs/`, `review/`, `extend/`, `security/`, or `run/`. When a page touches
  two areas, pick the one the reader acts on and link to it from the other.
- **First run goes in `get-started/`.** Install, provider setup, the first tutorial, and the audience
  entry pages live there, even though they also belong to an area.
- **Whole-product lookups go on the Reference shelf.** A reference page whose source belongs to one area
  lives in that area (the spec format in `specs/`, MCP configuration in `extend/`). CLI, Settings,
  keyboard shortcuts, files and environment, and the glossary index the whole product, so they live in
  `reference/`.
- **Order inside an area is concept, tutorial, how-to, reference.** List the page in
  [`navigation.yml`](../navigation.yml) in that position. Get started follows the first-run sequence,
  and Run & troubleshoot leads with Troubleshoot because that is why most readers open it.
- **A changeset's `area:` is the folder slug.** A changeset for a user-visible change names the folder
  its docs update belongs in, so the drafting agent knows where to write without reading the navigation.

## Frontmatter

Every page starts with exactly these keys, and only these:

```yaml
---
title: Connect a model provider        # sentence case; how-tos start with a verb
description: One sentence, under 160 characters, used for search results and link previews.
type: how-to                           # tutorial | how-to | reference | explanation
status: complete                       # complete | draft | outline
---
```

Do not add platform keys such as `sidebar_position`, `slug`, or `nav_order`. Order and grouping live in
[`navigation.yml`](../navigation.yml); slugs come from file paths.

The page body never repeats the title as an `# H1` — platforms render the title from frontmatter. Start
with a one- or two-sentence lead paragraph, then `##` sections.

## Markdown subset

Use CommonMark plus these GitHub-flavored extensions, all of which render on GitHub and port to every
candidate platform:

- **Links** — relative paths to `.md` files: `[Review changes](../review/review-changes.md)`. Add a
  heading anchor when useful: `../reference/cli.md#flags`. External links are absolute URLs.
- **Callouts** — GitHub alerts, one of `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`:

  ```markdown
  > [!TIP]
  > Press **Cmd/Ctrl+K** to switch between chats.
  ```

- **Diagrams** — fenced ` ```mermaid ` blocks. Keep them small: one idea per diagram.
- **Tables** — GFM pipe tables. Prefer them for any list of three or more items with two or more
  attributes.
- **Code** — fenced blocks with a language: `bash`, `powershell`, `json`, `yaml`, `markdown`, `ts`.
  Shell blocks contain commands only — no `$` prompts and no interleaved output.
- **Images** — `![Alt text that describes the content](../assets/<name>.png)`. Every image has
  meaningful alt text.
- **Collapsible detail** — `<details><summary>…</summary>` is the one HTML element allowed; use it
  sparingly for long optional content.

Not allowed: MDX or JSX components, tabs, shortcodes, includes/partials, footnotes, raw HTML other
than `<details>`, emoji shortcodes.

## Outline pages

A page with `status: outline` keeps the same frontmatter and has:

1. The lead paragraph, written as it will ship.
2. Every planned `##` section, each with a short bullet list of the facts it must cover and the
   source files or specs those facts come from.
3. A final callout:

   ```markdown
   > [!NOTE]
   > This page is an outline. It shows the planned structure and the facts it will cover.
   ```

## Voice and style

The docs use the register of the README and the landing page, not the blog.

- **Second person, present tense, active voice.** "You open a workspace," not "the user opens."
- **Terse and concrete.** Lead with what the reader can do. Cut throat-clearing ("In this section we
  will…"). One idea per sentence.
- **Bold lead-ins** for list items that name a concept: "**Isolated workspaces.** Each workspace is…"
- **Exact UI labels in bold**, with `→` for paths through the UI: **Settings → Models**.
- **Keyboard shortcuts** as **Cmd/Ctrl+K** — macOS first, joined with a slash.
- **`pi`** is always lowercase in code font. ThinkRail is one word, capital T and R. JetBrains AI is a
  provider option, never a requirement.
- **US spelling.** "Customize," "color," "behavior."
- **Honest about limits.** Say what a feature does not do ("local review, not a forge integration").
  Mark unconfirmed behavior with a `> [!WARNING]` rather than guessing.
- **No hype.** Avoid "seamless," "powerful," "revolutionary," "supercharge," "simply," "just," and
  exclamation marks.

## Terms

Use the terms defined in the [glossary](../reference/glossary.md) consistently. The ones most often
confused:

| Say | Not |
| --- | --- |
| project | repo (when you mean the ThinkRail object) |
| workspace | worktree (except when describing the git mechanism) |
| Default workspace | main workspace, root workspace |
| chat | session (except when describing `pi` internals) |
| steer / follow-up | interrupt / queue message |
| host | server, backend |

## Sources of truth

Docs describe the product as it ships; the specs in the repository describe how it is built. When a
fact is in a `SPEC.md`, link the code path in a review comment rather than duplicating internals on the
page. When docs and code disagree, the code wins and the page gets fixed.
