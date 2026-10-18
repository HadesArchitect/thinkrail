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
| `scout` | Reconnaissance of the codebase, with search and web tools. Read-only by instruction: it also has `bash`. |
| `planner` | Read-only planning. |
| `worker` | Full implementation. It leaves its changes uncommitted. |
| `reviewer` | Review, read-only by instruction (it also has `bash`). It ends with `Verdict: Approve` or `Request changes`. |

You can also define your own agents as Markdown files with frontmatter: personal ones in `agents/` inside `pi`'s agent directory, and project ones in `.pi/agents/` or `.agents/agents/`. Project agents load only when the project is trusted. A repository cannot override a built-in role.

> [!NOTE]
> Subagents cannot start their own subagents and cannot call MCP tools.

## Use a cheaper model for subagents

By default a subagent runs on the same model as the chat that started it. To keep a strong model in the main chat and run research or review on a cheaper, faster one, set the subagent's model in one of two ways.

A subagent's model comes from the first of these that is set:

1. The `model` in the agent's definition file (a pin).
2. The `model` the agent passes in the `Agent` call.
3. The chat's current model.

A pinned model always wins, so the agent cannot override it by asking for a different one. Every setting must name a model your connected providers offer, as `provider/id`.

### Pin a model in a custom agent

Create a personal agent that always runs on a cheap model. It applies to every project.

1. Create `~/.pi/agent/agents/cheap-scout.md`. If you moved `pi`'s agent directory with `PI_CODING_AGENT_DIR`, use `agents/` inside that directory. For one project only, put the file in `.pi/agents/` or `.agents/agents/` in the workspace instead; those load only when the project is [trusted](../security/trust-a-project.md).
2. Add frontmatter and a system prompt:

   ```markdown
   ---
   name: cheap-scout
   description: Read-only recon on a low-cost model. Use for finding files, symbols, and call sites.
   tools: read, grep, find, ls
   model: anthropic/claude-haiku-4-5
   thinking: low
   max_turns: 15
   ---

   You map where things live in the codebase. Report paths, symbols, and call sites. Never modify files.
   ```

3. Send your next message. The host re-reads agent definitions at the start of every turn, so an open chat picks up the new file without a restart.
4. Ask for it by name: "Use the cheap-scout agent to find where authentication is handled."

Use the provider and id of a model you can pick in the composer. A name that matches no available model, or more than one, makes the `Agent` call fail with an error that asks you to write it as `provider/id`. `thinking` sets the reasoning effort for the subagent; leave it out and the subagent uses the chat's effort. See [Tools the agent can call](agent-tools.md#custom-agent-definitions) for every frontmatter field.

### Ask for a model on one delegation

For a one-off, name the model in your request: "Run a scout on `anthropic/claude-haiku-4-5` to list every place we read environment variables." The agent passes it as the `model` parameter of its `Agent` call. This works for the built-in `scout`, `planner`, `worker`, and `reviewer` roles and for any custom agent that has no pinned model. It has no effect on an agent whose definition pins a model.

### What you cannot change

You cannot give a built-in role a different model by writing a file with the same name. Built-in definitions load first and the first definition with a name wins, so a personal or project file named `scout` is ignored. Give your variant a new name, such as `cheap-scout` above, and ask for it by name. The same rule means a personal agent beats a project agent with the same name.

For the full parameter table of the `Agent` tool, see [Tools the agent can call](agent-tools.md#agent).

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

- [Steer, queue, or stop the agent](steer-and-queue.md)
- [Tools the agent can call](agent-tools.md)
- [Settings reference](../reference/settings.md)
- [Trust a project](../security/trust-a-project.md)
- [Extensions](../extend/extensions.md)
