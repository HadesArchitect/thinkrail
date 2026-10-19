---
title: ThinkRail documentation
description: Learn ThinkRail, the open-source, spec-first agentic IDE built around pi, with isolated workspaces, reviewed diffs, and living specs.
type: explanation
status: draft
---

ThinkRail is the open-source agentic IDE that gets better every time you use it. It is built around
one agent, [`pi`](https://pi.dev), and gives it a full IDE: isolated workspaces, diffs to review, and
chats you can steer. ThinkRail is spec-first: your project's intent lives in living specs that the
agent reads and keeps current, so it builds on what it learned instead of relearning your project
every session.

## Main features

- **Spec-first.** `SPEC.md` files and project goal specs sit beside your code as ground truth, and the
  agent maintains them as it works. See [Living specs](specs/living-specs.md).
- **Parallel agents, isolated workspaces.** Each task runs in its own git worktree and branch, so
  several agents work at once without touching your checkout. You review every diff before it ships.
  See [Run agents in parallel](workspaces/parallel-workspaces.md) and
  [Review changes](review/review-changes.md).
- **Provider-agnostic.** Bring your own model: a Claude, ChatGPT, or GitHub Copilot subscription,
  JetBrains AI, or an API key for any provider `pi` supports. See
  [Connect a model provider](get-started/connect-a-provider.md).
- **Open and extensible, built on `pi`.** ThinkRail is Apache 2.0, and your `pi` skills, extensions,
  MCP servers, and prompt templates keep working. See [ThinkRail and pi](agent/thinkrail-and-pi.md).

## Where are you starting?

| If you are… | Start with |
| --- | --- |
| Deciding whether ThinkRail is for you | [What is ThinkRail?](what-is-thinkrail.md) |
| Coming from `pi` in the terminal | [Coming from pi](coming-from-pi.md) |
| Stuck, or have a question | [Get help](run/get-help.md) |
| Want to build or contribute to ThinkRail | [Build from source](develop/build-from-source.md) and [Contribute](develop/contribute.md) |

## Quick start

Install ThinkRail, connect a model, give the agent your project's specs, and ship one reviewed change:

1. [Install ThinkRail](get-started/install.md) — the desktop app or the `thinkrail` CLI.
2. [Connect a model provider](get-started/connect-a-provider.md) — JetBrains AI, a subscription
   sign-in, or your own API keys.
3. [Describe your project](get-started/describe-your-project.md) — the agent drafts your project's
   specs with the bundled `setting-up-a-project` skill.
4. [Make your first change](get-started/first-change.md) — from an empty workspace to a pull request.

## The documentation

The documentation follows the product. Each area opens with the idea behind it, then the guides, then
its reference.

| Area | What it covers |
| --- | --- |
| [Workspaces](workspaces/workspaces-and-isolation.md) | Projects, workspaces, git worktrees and branches, parallel agents, your editor |
| [Agent & chats](agent/thinkrail-and-pi.md) | `pi`, chats and sessions, models and effort, steering, follow-ups, subagents, agent tools |
| [Specs & plans](specs/living-specs.md) | Living specs, `SPEC.md` files, plans and TODO lists, built-in workflows |
| [Review & ship](review/review-changes.md) | Diffs, review comments, undo and discard, pull requests |
| [Skills, MCP & extensions](extend/extensions.md) | Skills, prompt templates, MCP servers, extensions, ThinkRail packages in `pi` |
| [Security & privacy](security/security-and-data-overview.md) | What leaves your machine, project trust, permissions, telemetry |
| [Run & troubleshoot](run/troubleshoot.md) | Fixes, getting help, updates, backup, remote machines and SSH, platforms |
| [Reference](reference/cli.md) | CLI flags, settings, keyboard shortcuts, files and environment variables, glossary |
| [Developing ThinkRail](develop/build-from-source.md) | Building from source, contributing |
| [Changelog](changelog.md) | What changed in each release, stable and nightly |

![The Specs tool listing a project's spec tree while the product goal spec is rendered in the editor](assets/specs-dark.png)

## Get help

- Ask questions on [Discord](https://discord.gg/Wybu9ceWkY).
- Report bugs and request features in [GitHub issues](https://github.com/JetBrains/thinkrail/issues).
- Follow releases on the [ThinkRail blog](https://thinkrail.ai/blog/), in the
  [changelog](changelog.md), and on [GitHub releases](https://github.com/JetBrains/thinkrail/releases).

For where to go with each kind of question, see [Get help](run/get-help.md).

ThinkRail is open source under the Apache License 2.0 and is a JetBrains incubator project.
