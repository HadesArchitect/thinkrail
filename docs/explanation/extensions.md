---
title: Extensions
description: The two kinds of extension in ThinkRail — portable pi packages and ThinkRail extensions — what exists today, and where extension support is heading.
type: explanation
status: draft
---

"Extension" means two related things in ThinkRail. A **portable `pi` package** gives the agent a
capability that works anywhere `pi` runs. A **ThinkRail extension** wraps such a capability with the
parts only ThinkRail needs: how the host bundles it and how the UI draws its results. This page explains
both, what you can use today, and what is planned.

## Two kinds

| | Portable `pi` package | ThinkRail extension |
| --- | --- | --- |
| **What it is** | Tools and skills for the agent | A `pi` capability plus a server half and a web half |
| **Runs in** | Vanilla `pi` and ThinkRail | ThinkRail only |
| **Distributed as** | npm, as `@thinkrail/pi-<name>` | Part of the ThinkRail build |
| **Example** | `@thinkrail/pi-visualize` | `visualize` |
| **You control it with** | `pi install` in vanilla `pi` | **Settings → Extensions** |

The split follows [ThinkRail and pi](thinkrail-and-pi.md): the capability belongs to `pi`, so it lives
in a package any `pi` user can install; only presentation and host wiring belong to ThinkRail.

## Portable pi packages

A portable package is an ordinary `pi` package: raw TypeScript with a `pi` manifest, loaded by `pi`'s own
loader. Before a package publishes, it has to pass a vanilla-parity check — installed from its packed
tarball into a clean `pi` setup, loaded under Node, its tools run, and its output checked in a real
terminal. A package may not assume ThinkRail exists: no ThinkRail paths, no host protocol, no ThinkRail
imports.

Today one package is published, [`@thinkrail/pi-visualize`](https://www.npmjs.com/package/@thinkrail/pi-visualize).
It adds a `visualize` tool for Mermaid diagrams and option comparisons. In the `pi` terminal it draws
diagrams with box-drawing characters; elsewhere its result reads as Markdown. See
[Use ThinkRail packages in pi](../how-to/use-thinkrail-packages-in-pi.md).

## ThinkRail extensions

A ThinkRail extension is a package with two halves that never import each other:

- **The server half** names the `pi` extensions the host loads into every chat — and, optionally, into
  subagents — plus any skill packages. It can also inject host-side behavior. The `visualize` server half
  swaps the package's best-effort Mermaid check for a strict one, so a diagram the agent produces is one
  the UI can parse.
- **The web half** registers renderers keyed by tool name. When the agent calls `visualize`, the chat
  shows a diagram or comparison card instead of raw text.

Tools without a registered renderer still work; the chat shows them with a generic tool card. That is
what you see for tools from your own `pi` extensions.

## What loads into a ThinkRail chat

| Source | Examples | Can you switch it off |
| --- | --- | --- |
| ThinkRail extensions | `visualize` | Yes, in **Settings → Extensions** |
| Packages ThinkRail bundles directly | Web research (`pi-web-access`), the spec graph, the TODO plan, workflows, subagents, background commands | No |
| Your own `pi` extensions and packages | Whatever your `pi` settings load | Through `pi`'s own settings |
| A repository's `.pi/` extensions | Whatever the project ships | Load only after you [trust the project](trust-model.md) |

The bundled packages in the second row are built like portable packages but are not yet wrapped as
ThinkRail extensions, so they do not appear in **Settings → Extensions**. They move over one at a time;
web research is planned next.

## Turning an extension off

**Settings → Extensions** lists the ThinkRail extensions the host gives the agent, with a switch for
each. Turning one off removes its tools from new chats, and from open chats once their current turn
ends. Past results still render, so old transcripts stay readable. The choice is saved on the host, so it
applies to every browser and device that uses that host.

The switch is global: there is no per-workspace override yet, and it does not yet cover skills an
extension ships.

## Your own pi extensions

ThinkRail runs `pi`'s normal extension discovery, so the extensions and packages you already use in the
`pi` CLI load into ThinkRail chats too. Engine-side behavior — tools, event hooks, slash commands, simple
dialogs — works. Anything that draws into `pi`'s terminal UI, such as a theme, does nothing in ThinkRail,
which has its own UI and themes. See the compatibility notes in [ThinkRail and pi](thinkrail-and-pi.md).

## Where this is going

ThinkRail's stated direction is full extension support, so that ThinkRail can build the tools it needs
around how you actually work. That is a direction, not a dated plan. Today:

- ThinkRail extensions are composed at build time from a registry in the repository. There is no way to
  install one into a released build.
- The extension API is internal and unversioned. It is not a stable surface for third parties yet.
- Installing and discovering extensions, a marketplace, per-extension settings, a per-workspace switch,
  and extensions that add their own panels or protocol methods are all deliberately deferred.
- Loading third-party UI bundles at runtime has been ruled out for now, until there is a versioned UI API
  and a security story for it.

If you want to extend ThinkRail today, write a `pi` extension. It works in the `pi` CLI and in ThinkRail,
and its tools show in ThinkRail chats with the generic tool card.

> [!NOTE]
> This page is a draft. The extension model is still settling, and the deferrals above may change as
> extension support grows. The [changelog](../changelog.md) records what ships.

## Related

- [Agent tools](../reference/agent-tools.md) — the tools bundled packages and extensions add
- [Settings reference](../reference/settings.md)
- [Use ThinkRail packages in pi](../how-to/use-thinkrail-packages-in-pi.md)
