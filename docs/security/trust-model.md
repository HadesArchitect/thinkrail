---
title: Trust model
description: What a cloned repository could inject into the agent, how per-project trust and MCP approvals gate it, and why the network decides who reaches a host.
type: explanation
status: complete
---

ThinkRail runs an agent that reads files, runs commands, and calls tools on your machine. Some of what
shapes that agent comes from you; some could come from any repository you open. ThinkRail's rule is that
nothing a repository supplies reaches the agent until you say so. This page explains what is gated, what
is not, and where the boundaries are.

> [!IMPORTANT]
> Trust is not a sandbox. In any project, trusted or not, the agent's shell commands run as you, with your
> permissions, and `pi` does not ask before tool calls. See [What trust does not do](#what-trust-does-not-do)
> and, for a permissions table and everything that leaves your machine, the
> [Security and data overview](security-and-data-overview.md).

## What a cloned repository could inject

Opening a repository is not the same as trusting it. A repository can commit files that `pi` or
ThinkRail would otherwise load automatically:

| A repository can ship | Why it matters | Gate |
| --- | --- | --- |
| Skills in another agent's folder (`.claude/skills`, `.github/skills`, `.gemini/skills`) | Skill descriptions enter the system prompt and steer the agent | Project trust |
| `pi` resources in `.pi/`: skills, prompts, themes, a system prompt, subagent definitions | They change what the agent is told and how it delegates | Project trust |
| `pi` extensions and settings in `.pi/` | They **run code on your machine** | Project trust |
| MCP servers in `.pi/mcp.json` | A server is a program or endpoint the agent can call, possibly a local command | Project trust **and** a per-server approval |

Until you grant trust, none of these load. The project's Welcome screen, the **Create workspace** dialog, and the
**Skills** dialog show a notice that names what the project ships — for example, a count of skills, "its own Pi resources",
and MCP servers — and what trusting would enable, including when it would let code run.

## One grant per project

Trust is granted per project, explicitly, and can be revoked. Two details make it hold up over time:

- **New skills after trust need a look.** Granting trust acknowledges the skills that exist at that
  moment. A skill that arrives later — from a pull, a branch switch, a teammate's commit — stays off until
  you review and enable it.
- **Revoking takes effect promptly.** When you stop trusting a project, its skills, `pi` resources, and
  MCP servers stop loading. Running subagents stop, idle chats reload at once, and a busy chat finishes
  its current turn and then reloads without them.

If you already trust a folder in vanilla `pi`, ThinkRail starts that project with its `pi` resources
trusted, because `pi`'s own trust decision is the same consent. Skills from other agents' folders and
MCP servers still follow ThinkRail's own gates.

## Repository MCP servers need their own approval

Trusting a project does not turn on its MCP servers. Each server the repository defines needs a separate
approval, and that approval is tied to a fingerprint of the server's whole entry as written. If anyone
changes the entry — a different command, URL, argument, or environment value — the approval lapses and
the server stays off until you approve the new version. The approval dialog shows the command line that
will run, with credentials masked.

This closes a specific gap: without it, a repository could get a harmless server approved and later
change what it runs.

## Confirming calls that might change data

MCP tools can declare themselves read-only. ThinkRail asks before every call to a tool that does not, and
offers **Deny**, **Allow once**, or **Allow in this chat**. A chat-wide allowance lives only as long as
that chat session and is never saved. Steering the agent cancels a pending confirmation.

> [!NOTE]
> The read-only flag is a claim the server makes about its own tool. It decides when ThinkRail asks; it
> does not prove the tool is harmless. Approve servers you would be comfortable running yourself.

Subagents cannot call MCP tools, so delegation never routes around this prompt. Connection setup and
OAuth sign-in stay inside `pi`'s built-in MCP. See [Connect MCP servers](../extend/connect-mcp-servers.md)
and the [MCP configuration reference](../extend/mcp-configuration.md).

## What is never gated

Trust is about what a repository brings. What you bring is yours:

- **Your personal skills** — in `pi`'s agent folder and the skill folders of other agents in your home
  directory — and **ThinkRail's bundled skills** load without a trust prompt. You can still switch any
  skill off.
- **Your own `pi` extensions and `mcp.json` servers** load as they would in the `pi` CLI.
- **Precedence protects you.** When skill names collide, your own and ThinkRail's skills win over the
  ones a repository keeps in other agents' folders, so a repository cannot swap a skill you rely on for
  its own.

## No ThinkRail accounts

ThinkRail has no accounts, no login, and no tokens of its own. Everything that needs a credential goes
through a tool you already control:

- **Git and GitHub** through your `git` and `gh`. Open PR pushes with your git credentials and creates
  or updates the pull request with your `gh` session.
- **JetBrains AI** through your `central` CLI.
- **Every other model provider** through `pi`'s own sign-in and key storage.

The UI never receives a stored credential back, and secrets in MCP configuration are masked in every
screen. Removing ThinkRail removes no account, because there is none. See
[Connect a model provider](../get-started/connect-a-provider.md).

## The network is the access boundary

The host has no login screen. Who can use it is decided by who can reach its port:

- **By default, only your machine.** The CLI binds to `localhost`. The desktop app binds a random
  loopback port.
- **Beyond that, the network decides.** If you bind the CLI host to another address with `--host`, the
  design assumes a network that already authenticates devices, such as a Tailscale tailnet with access
  controls.

> [!CAUTION]
> Anyone who can reach an exposed host has your agent, your terminals, and your files, with your user's
> permissions — there is no second check. Never bind a host to an address reachable from an untrusted
> network. See [Run ThinkRail on a remote machine](../run/run-on-a-remote-machine.md).

## What trust does not do

- **It is not a sandbox.** In an untrusted project the agent can still run shell commands as you.
  `pi`'s tools run with your permissions, and nothing confines them to the workspace folder. Watch what the agent
  does, and review its changes before they leave the workspace.
- **Workspaces isolate git state, not processes.** A worktree keeps agents out of your checkout; it does
  not contain a misbehaving command. See [Workspaces and isolation](../workspaces/workspaces-and-isolation.md).
- **It does not vet code.** Trust is consent, not a security scan. ThinkRail tells you what a project
  would load; deciding whether that is safe is yours.

## Related

- [Security and data overview](security-and-data-overview.md)
- [Trust a project](trust-a-project.md)
- [Use your existing skills](../extend/use-existing-skills.md)
- [Settings reference](../reference/settings.md)
