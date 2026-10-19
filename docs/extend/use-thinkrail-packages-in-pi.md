---
title: Use ThinkRail packages in pi
description: Install @thinkrail/pi-visualize in vanilla pi to give the agent a visualize tool for Mermaid diagrams and option comparisons.
type: how-to
status: draft
---

ThinkRail publishes some of its agent capabilities as ordinary `pi` packages. Use them to get the same
tools in the `pi` terminal, without ThinkRail.

## Before you begin

- A working `pi` install with a model provider configured. See [pi](https://pi.dev).
- Node 22.19 or newer, which vanilla `pi` already needs.

> [!NOTE]
> Do not install the package inside ThinkRail. ThinkRail already bundles `visualize`; turn it on or off in
> **Settings → Extensions**.

## Install `@thinkrail/pi-visualize`

1. In a terminal, install the package:

   ```bash
   pi install npm:@thinkrail/pi-visualize
   ```

2. Start `pi` in a project and ask for a diagram:

   ```text
   Draw a flowchart of how a request moves through our auth middleware.
   ```

## What you get

- **A `visualize` tool.** With `type: "diagram"` it takes raw Mermaid source. With `type: "comparison"` it
  takes a list of options, each with a name, description, pros, cons, a `recommended` flag, and optional
  inline Mermaid. Both accept a `title`.
- **Terminal drawings.** Flowcharts, state, sequence, class and ER diagrams, pies, mindmaps, timelines, and
  git graphs are drawn with Unicode box-drawing characters in your `pi` theme's colors.
- **Source as a fallback.** A diagram wider than your terminal, only partly drawable, or in an unsupported
  family such as gantt shows its Mermaid source in a code fence. Expand the tool result to see the source
  under a drawing.
- **Readable output everywhere.** The result is Markdown, so it also reads fine in `pi -p` and in JSON or
  RPC mode.
- **Basic validation.** The tool rejects empty sources and wrong shapes, and catches some Mermaid syntax
  errors with the renderer's own parser. The check is best effort; some malformed input still passes.
  ThinkRail's own build injects a stricter validator.

## Other packages

Only `@thinkrail/pi-visualize` is published today. ThinkRail's other agent capabilities, such as
subagents, background commands, the spec graph, and the TODO plan, are not published as packages yet.
Watch the [changelog](../changelog.md) for new ones.

## Check that it worked

- Your request produces a `visualize` tool call that shows a drawing or, for unsupported diagram types,
  a Mermaid code fence.
- A comparison request renders as sectioned Markdown with a recommended option.

## Related

- [Extensions](extensions.md)
- [ThinkRail and pi](../agent/thinkrail-and-pi.md)
- [Tools the agent can call](../agent/agent-tools.md)
