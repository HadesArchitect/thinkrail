---
title: ThinkRail and pi
description: What the pi engine owns, what ThinkRail adds around it, and why ThinkRail never runs a second agent or assembles prompts of its own.
type: explanation
status: complete
---

ThinkRail is deliberately a thin layer on top of `pi`. How the agent thinks, what it may do, and how it
manages context are `pi`'s job; ThinkRail adds a workspace, an editor, and a review surface around it.
This page explains where that line sits and why it matters to you.

## Who owns what

| Area | `pi` owns | ThinkRail owns |
| --- | --- | --- |
| **Models and providers** | The model registry, provider sign-in, API keys, and credential storage | The Settings screens that drive `pi`'s auth, and the JetBrains AI connection through your `central` CLI |
| **The agent loop** | The system prompt, tool calls, retries, compaction, and steering and follow-up queues | Nothing — there is no host-side loop |
| **Skills and extensions** | Discovery, parsing, and running them | Bundling its own packages, reading skills you keep for other agents, and gating what a repository supplies |
| **Sessions** | Session state, transcripts, token counts, and cost | Showing them, and the chat tabs you place in the workbench |
| **MCP** | Connections, OAuth, and tools through its built-in MCP | Settings screens, per-repository approvals, and the confirmation before calls that may change data |
| **Your code** | — | Projects, workspaces as git worktrees, the editor, diffs, terminals, review comments, and Open PR |

The rest of this page is the reasoning behind that table.

## Influence by feeding, never by assembling

ThinkRail shapes what the agent does only through what it feeds `pi`:

- **Files.** Specs, task notes in `.thinkrail/context/`, and anything else in the workspace.
- **`pi`'s own extension points.** Skills, extensions, and their tools — `spec_*`, `todo_*`, subagents,
  web research. A bundled package adds its standing rule as a named section of `pi`'s system prompt, the
  same way any third-party `pi` extension can.
- **Session-start choices.** The working directory, the model, and the thinking level you pick.

ThinkRail never builds a prompt behind your back, never rewrites `pi`'s system prompt wholesale, and
never runs its own loop that calls the model. Everything the agent knows reached it through a mechanism
you can inspect: a file, a skill, or an extension. When the agent misbehaves, you debug it the way you
would debug vanilla `pi`.

## Expose, don't recompute

The host reports what `pi` reports. Token usage and cost in the chat come from `pi`'s session stats. The
chat list includes sessions `pi` has on disk. A chat's title is `pi`'s session name, set by the agent
through a tool and never by a helper model. When ThinkRail and `pi` would disagree about a number,
ThinkRail is wrong by construction, so it does not keep its own copy.

## Your pi setup comes with you

ThinkRail runs `pi` with `pi`'s normal agent directory, `~/.pi/agent`. If you already use the `pi` CLI,
ThinkRail starts with what you have:

- **Providers and models** you signed in to or configured.
- **Sessions.** Transcripts are `pi`'s own files, so you can move between ThinkRail and the `pi` CLI in
  either direction.
- **Extensions and packages** from your `pi` settings, and — from 0.2.0, on the nightly channel today —
  your `mcp.json` servers.
- **Skills** from `pi`'s locations, plus portable Agent Skills you keep for Claude, Codex, Copilot, or
  Gemini, read in place. See [Use your existing skills](../extend/use-existing-skills.md).

Resources a *repository* supplies — its `.pi/` directory, committed skills, and MCP servers — load only
after you trust that project. The [trust model](../security/trust-model.md) explains why.

> [!WARNING]
> Compatibility has limits:
>
> - ThinkRail embeds its own copy of `pi`, which may be a different version from the one you installed.
>   An extension that depends on a specific `pi` version can behave differently. See
>   [Coming from pi](../coming-from-pi.md) for which version each release embeds.
> - Extensions that change `pi`'s terminal UI, such as themes or custom TUI rendering, do nothing in
>   ThinkRail. Engine-side behavior — tools, event hooks, slash commands, simple dialogs — works.
> - Tools from your own extensions show in the chat with a generic tool card, not a custom renderer.

## ThinkRail's packages work in vanilla pi

The dependency runs one way: ThinkRail depends on its `pi` packages, and those packages depend on nothing
in ThinkRail. Capabilities meant to be portable are held to a "vanilla parity" bar before they publish:
installed from the packed tarball into a clean `pi` setup, loaded by `pi`'s own loader under Node, and
exercised in a real terminal.

Today one package is published: [`@thinkrail/pi-visualize`](https://www.npmjs.com/package/@thinkrail/pi-visualize),
the diagram and comparison tool. Others — the spec graph, the TODO plan, subagents, background commands —
are built the same way but still ship only inside ThinkRail. The workflow skills are the exception: they
assume ThinkRail's question tool and are not meant to be portable. See
[Use ThinkRail packages in pi](../extend/use-thinkrail-packages-in-pi.md) and [Extensions](../extend/extensions.md).

## Why not a second runtime

ThinkRail could have wrapped another agent SDK, run `pi` as a subprocess, or grown its own loop around
the model. It does none of these, for three reasons:

- **One behavior.** A skill, an extension, or a session behaves the same in ThinkRail and in the `pi`
  CLI, because the same engine runs it. Two engines would drift, and you would debug the gap.
- **No hidden layer.** With one engine and no host-side prompt assembly, there is no second place where
  instructions could come from.
- **Upgrades stay mechanical.** A new `pi` release reaches you as an upgrade of one dependency, not as a
  port of features into a parallel runtime.

The costs are real, and ThinkRail accepts them:

- **No crash isolation.** `pi` runs in the host process, so a fatal fault in `pi` or an extension stops
  the whole host.
- **Tight coupling to `pi` releases.** `pi` ships often and sometimes breaks APIs. ThinkRail pins exact
  versions and keeps a registry of every place the host compensates for a missing `pi` API, each with a
  condition for deleting the workaround. Every `pi` upgrade re-checks that list against the installed
  package.
- **`pi`'s limits are ThinkRail's limits.** If `pi` cannot do something, ThinkRail does not fake it
  host-side.

## Related

- [How ThinkRail works](../run/how-thinkrail-works.md) — the host, the wire, and the UI
- [Connect a model provider](../get-started/connect-a-provider.md)
- [Tools the agent can call](agent-tools.md) — the tools ThinkRail's bundled packages add
