---
title: Delegate work to subagents
description: Ask the agent to hand tasks to specialized subagents, run them in the foreground, in parallel, or in the background, and follow them in the Resources panel.
type: how-to
status: draft
---

A chat can delegate self-contained tasks to subagents: child agents that each get their own context window. Delegation keeps research and review noise out of your main conversation and lets independent work run side by side.

## Before you begin

- Subagents are on by default. If they are off, turn them on in **Settings → Chat** under **Subagents**.
- Subagents work in the same workspace folder as the chat that started them.

## Ask the agent to delegate

You do not call subagents yourself. Describe the work and say how to split it. The agent decides to use its `Agent` tool.

- **One task, wait for the answer (foreground).** "Have a scout map where authentication is handled, then summarize it." The parent chat waits for the result.
- **Several tasks at once (parallel).** "Use three scouts in parallel: one for the API routes, one for the database layer, one for the tests." Several `Agent` calls in a single assistant message run concurrently.
- **Work while you keep chatting (background).** "Run a reviewer in the background on the current changes." The agent gets a child id immediately; when the subagent finishes, the completion wakes the parent chat with the result.

## Built-in roles

| Role | What it does |
| --- | --- |
| `scout` | Read-only reconnaissance of the codebase, with search and web tools. |
| `planner` | Read-only planning. |
| `worker` | Full implementation. It leaves its changes uncommitted. |
| `reviewer` | Read-only review. It ends with `Verdict: Approve` or `Request changes`. |

You can also define your own agents as Markdown files with frontmatter: personal ones in `agents/` inside `pi`'s agent directory, and project ones in `.pi/agents/` or `.agents/agents/`. Project agents load only when the project is trusted. A repository cannot override a built-in role.

> [!NOTE]
> Subagents cannot start their own subagents and cannot call MCP tools.

## Follow a subagent

1. Open the **Resources** button in the chat header, or watch the dock above the composer.
2. In the inspector, find the subagent. Its state is one of Working, Queued, Stopping, Done, Failed, or Stopped.
3. Select **Inspect** to read its transcript, or open its tool card in the chat.
4. Select **Stop** on a row to stop one subagent, or **Stop all subagents** to stop them all.

A chat that owns running subagents or background commands shows as working even when the main agent is idle.

## Limit concurrency

Open **Settings → Chat** and find **Subagents**.

| Setting | Meaning | Default |
| --- | --- | --- |
| **Allow subagents** | Whether chats may delegate. | On |
| **Per chat at once** | Subagents that run concurrently in one chat, from 1 to 16. Extra ones wait in line, first in first out. | 4 |

Under **This workspace**, the same two controls override the global values for the active workspace. A workspace follows the global settings until you change a value; use the reset on the **Custom** tag to go back.

Work already running always finishes after you change a setting. Turning delegation off removes the delegation tools from live chats once their current turn ends.

## Check that it worked

- A subagent tool card appears in the transcript, and **Resources** shows a count.
- The inspector lists the subagent with its state, then moves it to Done.
- For a background task, a completion message arrives in the parent chat when the child finishes.

## Related

- [Steer or queue while the agent works](steer-and-queue.md)
- [Agent tools reference](../reference/agent-tools.md)
- [Settings reference](../reference/settings.md)
- [Trust a project](trust-a-project.md)
- [Extensions](../explanation/extensions.md)
