---
title: ThinkRail documentation
description: Learn ThinkRail, the open-source agentic IDE built around pi — run agents in isolated workspaces, review their work, and keep intent in specs.
type: explanation
status: draft
---

ThinkRail is the agentic IDE that gets better every time you use it. It wraps the
[`pi`](https://pi.dev) coding agent in a real workbench — editor, diffs, terminals, and review — gives
every task its own git worktree, and keeps your project's intent in living specs the agent reads and
maintains.

## Start here

New to ThinkRail? Install it, connect a model provider, and ship one reviewed change in about 20
minutes:

1. [Install ThinkRail](how-to/install.md) — the desktop app or the `thinkrail` CLI.
2. [Connect a model provider](how-to/connect-a-provider.md) — JetBrains AI or your own keys.
3. [Make your first change](tutorials/first-change.md) — from an empty workspace to a pull request.

## Find your way

| If you want to… | Go to |
| --- | --- |
| Learn by doing, step by step | [Tutorials](tutorials/first-change.md) |
| Get a specific task done | [How-to guides](how-to/install.md) |
| Look up a flag, setting, shortcut, or tool | [Reference](reference/cli.md) |
| Understand why ThinkRail works the way it does | [Explanation](explanation/how-thinkrail-works.md) |
| See what changed recently | [Changelog](changelog.md) |

## What makes ThinkRail different

- **Agents get worktrees, not your working tree.** Every workspace is a `git worktree` with its own
  branch. Run several agents in parallel, ship the branch you want through a pull request, and remove
  the rest. Read [Workspaces and isolation](explanation/workspaces-and-isolation.md).
- **You see and steer the work.** Chats stream as the engine thinks; you can steer a running turn,
  queue a follow-up, leave anchored review comments on diffs, and send them back as structured context.
  Read [Review changes](how-to/review-changes.md).
- **Specs are the ground truth.** A connected graph of `SPEC.md` files lives beside the code, so intent
  survives the session. Read [Living specs](explanation/living-specs.md).
- **All of `pi`, nothing hidden.** Your models, skills, extensions, and providers stay `pi`'s.
  ThinkRail adds a surface, not a second agent. Read [ThinkRail and pi](explanation/thinkrail-and-pi.md).

![The Specs tool listing a project's spec tree while the product goal spec is rendered in the editor](assets/specs-dark.png)

## Get help

- Report bugs and request features in [GitHub issues](https://github.com/JetBrains/thinkrail/issues).
- Read the source and the engineering specs on [GitHub](https://github.com/JetBrains/thinkrail).
- Follow releases on the [ThinkRail blog](https://thinkrail.ai/blog/) and in the
  [changelog](changelog.md).

ThinkRail is open source under the Apache License 2.0 and is a JetBrains incubator project.
