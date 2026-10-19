---
title: About these docs
description: Table of contents for the maintainer-facing section that explains how the ThinkRail docs are built and why.
type: explanation
status: draft
---

This section is for maintainers and docs contributors, not for people using ThinkRail. It explains how the docs are built and the decisions behind them. It is marked private in the sidebar.

## Start here

If you are about to write or edit a page, read the [Authoring guide](authoring-guide.md) first. It is the contract every page follows.

## Pages in this section

| Page | What it covers | Read it when… |
| --- | --- | --- |
| [Information architecture](information-architecture.md) | Who the docs serve, how the sections are organized, and the reasoning behind that structure. | You are adding a section or questioning where a page belongs. |
| [Reader study](reader-study.md) | How the navigation was chosen: five simulated readers, three competing structures, and a blind retest. | You want the evidence behind the sidebar before changing it. |
| [Docs automation](docs-automation.md) | How changesets, scripts, and agents could produce docs, the changelog, and release notes, with people approving. | You are working on the docs pipeline or release process. |
| [Hosting options](hosting-options.md) | Where the docs could be published, what JetBrains projects do, and how the candidate tools compare. | You are helping choose the docs tool or host. |
| [Authoring guide](authoring-guide.md) | Page types, frontmatter, the Markdown subset, voice, and terms. | You write or review any docs page. |
| [Making the docs agent-friendly](making-docs-agent-friendly.md) | How the docs serve AI agents: plain Markdown, frontmatter, a single navigation file, and code-verified facts, plus proposals such as `llms.txt`. | You want agents to read, cite, or update the docs reliably. |

## Related files

- [`docs/README.md`](../README.md) describes the draft as a whole.
- [`navigation.yml`](../navigation.yml) holds the sidebar order and grouping.
