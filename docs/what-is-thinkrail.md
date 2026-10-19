---
title: What is ThinkRail?
description: Who ThinkRail is for, what you need to run it, what it costs, and how it compares with Cursor, Claude Code, GitHub Copilot, and plain pi.
type: explanation
status: draft
---

ThinkRail is a free, open-source app for working with a coding agent on your own git repositories. Each
task runs in its own copy of the repository, you review what the agent changed as a diff before anything
ships, and your project's intent lives in spec files the agent reads. This page answers the questions
people ask before they install it.

## What it is, in plain words

You open a git repository in ThinkRail and describe a task in a chat. The agent reads and edits files,
runs commands, and reports back while you watch, steer it, or start another task in parallel. Every task
gets an isolated workspace, a git worktree on its own branch, so your own checkout stays untouched until
you merge. See [Workspaces and isolation](../workspaces/workspaces-and-isolation.md) and
[Open a workspace in your editor](../workspaces/open-in-your-editor.md).

ThinkRail comes as a desktop app or as the `thinkrail` CLI, which opens the same app in your browser.

## Who it is for

- **Newcomers to coding agents** who want to see and review what an agent does instead of reading a
  terminal scrollback. You need basic git and a git repository; no terminal agent experience.
- **`pi` users** who want an IDE around the agent without giving up their setup. See
  [Coming from pi](coming-from-pi.md).
- **Agent-first builders** who run several agents at once and want each one's work isolated and
  reviewable.

## What you need

- **A computer ThinkRail runs on:** macOS on Apple Silicon, Windows x64, or Linux x64 or ARM64. There is
  no build for Intel Macs. See [Platform support](../run/platform-support.md).
- **`git` on your `PATH`**, and a project that is a git repository.
- **A model.** ThinkRail has no model of its own and no account system. Connect one of:
  - **JetBrains AI**, through the JetBrains `central` CLI;
  - **a subscription you already pay for**, by signing in with Claude, ChatGPT, or GitHub Copilot;
  - **an API key** for any provider `pi` supports, such as Anthropic, OpenAI, Google, or OpenRouter.

  See [Connect a model provider](connect-a-provider.md).
- **Optional: the GitHub CLI (`gh`)**, signed in, to open pull requests in one click.

## What it costs

ThinkRail itself is free and open source under the Apache License 2.0. What you pay for is the model:

| Model option | What you pay |
| --- | --- |
| JetBrains AI | Your JetBrains AI credits. The top bar can show how many remain. |
| Subscription sign-in | Nothing extra beyond your plan. Your plan's usage limits apply. |
| API key | The provider's per-token prices. The model picker shows them per million tokens. |

The chat header shows token use and cost as `pi` reports them.

`pi`'s sign-in flows are written for ChatGPT Plus and Pro and for Claude Pro and Max plans, and a GitHub
Copilot sign-in exists alongside them.

> [!WARNING]
> Unverified: whether a given plan, such as ChatGPT Plus or a free Copilot plan, has enough usage for
> agent work, and what each provider's terms say about using a subscription in a third-party tool.
> ThinkRail does not set or check these limits. Check your provider's plan details.

## How it compares

ThinkRail is a workbench around one agent, `pi`, rather than an editor with AI added or an agent of its
own.

| Tool | What it is | How ThinkRail relates |
| --- | --- | --- |
| **Cursor** | An AI code editor based on VS Code, with its own agent and plans | ThinkRail is not an editor replacement. It opens files read-only, for reading and review, and opens a workspace in VS Code or a JetBrains IDE when you want to edit by hand. You bring your own model. |
| **Claude Code** | Anthropic's coding agent for the terminal and IDEs, using Claude models | ThinkRail runs a different agent, `pi`, which can use your Claude plan or key alongside other providers. It reads skills from `~/.claude/skills` and a project's `CLAUDE.md`. |
| **GitHub Copilot** | GitHub's coding assistant in editors and on GitHub | ThinkRail can use your Copilot subscription as a model provider. It opens pull requests through your own `gh`; it has no merge button and no code-review integration with GitHub. |
| **Plain `pi`** | The same agent in a terminal | ThinkRail adds isolated workspaces, diff review with comments sent back to the agent, specs, plans, and a UI, and shares your `pi` setup. Keep the `pi` CLI for terminal and scripted work. |

> [!WARNING]
> Unverified: the descriptions of Cursor, Claude Code, and GitHub Copilot summarize how those products
> present themselves. They are not a feature-by-feature comparison. Check each product's own docs.

## What pi is

[`pi`](https://pi.dev) is an open-source coding agent, MIT-licensed, that runs in a terminal: it talks to
models, calls tools such as the shell and file edits, and keeps each session on disk. ThinkRail runs
`pi` inside its own process and builds the UI around it, so models, credentials, skills, and sessions all
belong to `pi`. See [ThinkRail and pi](../agent/thinkrail-and-pi.md).

## Maturity

- **Early.** ThinkRail is at version 0.x and is a JetBrains incubator project.
- **Two channels.** Stable releases (`v0.1.x`) shipped seven times between 2026-09-10 and 2026-10-06.
  Nightly builds (`0.2.0-nightly.N`) are published most days and carry everything merged since the last
  stable. See [Install ThinkRail](install.md#choose-a-channel-or-pin-a-version) and the
  [changelog](../changelog.md).
- **No published support policy.** There is no stated stability promise or support commitment yet.
  Report bugs and ask questions in [GitHub issues](https://github.com/JetBrains/thinkrail/issues).

For what leaves your machine, what the agent can do without asking, and how to turn off usage data, see
[Security and data overview](../security/security-and-data-overview.md).

## License

ThinkRail is open source under the [Apache License 2.0](https://github.com/JetBrains/thinkrail/blob/main/LICENSE).
The source is on [GitHub](https://github.com/JetBrains/thinkrail).

## Next steps

- [Install ThinkRail](install.md)
- [Connect a model provider](connect-a-provider.md)
- [Make your first change](first-change.md)
