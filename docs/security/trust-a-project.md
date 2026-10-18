---
title: Trust a project
description: Decide whether a repository's skills, pi resources, and MCP servers may load, grant or revoke trust per project, and review new skills.
type: how-to
status: complete
---

Use project trust to control what a repository can add to the agent. Until you trust a project, the skills,
`pi` resources, and MCP servers it commits do not load. This page shows where the prompt appears, how to
grant or revoke trust, and what each choice unlocks.

## Before you begin

- A project is open in ThinkRail. A newly added project starts untrusted, unless `pi` already trusts the
  folder (through its saved decisions or a global "always" setting), in which case its `pi` resources start
  trusted.
- Read [Trust model](trust-model.md) if you want the reasoning. Trust is consent, not a
  sandbox and not a security scan: in any project, the agent's shell commands run as you. The
  [Security and data overview](security-and-data-overview.md) lists what the agent can do without asking.

## What the prompt means

When a project ships something that needs your decision, a notice appears. For example:

> This project ships 3 skills and its own Pi resources and 1 MCP server — off until you trust it.

Below it, a line says what **Trust project** would enable: the project's skills, prompts, themes, system
prompt, and subagent definitions load, and its extensions and settings can **run code on this machine**.
MCP servers still need your approval one by one.

| A project can ship | Loads after trust |
| --- | --- |
| Skills in `.claude/skills`, `.github/skills`, `.gemini/skills` (skill aliases) | Yes, and each new one needs a look |
| `.pi/` skills, prompts, themes, system prompt, subagent definitions | Yes |
| `.pi/` extensions and settings | Yes, and they run code |
| MCP servers in `.pi/mcp.json` | Only after trust plus a separate approval per server |

Your personal skills, ThinkRail's bundled skills, your own `pi` extensions, user-level MCP servers, and
`AGENTS.md` or `CLAUDE.md` files are not gated by project trust.

## Grant trust

1. Find the notice in any of these places:
   - the project's Welcome screen (project home), shown when you select a project with no workspace open;
   - the **Create workspace** dialog;
   - the **Skills** dialog in a chat.
2. Read what it lists. If you do not recognize the project's author, inspect `.pi/` and the skill folders
   in a terminal first.
3. Select **Trust project**.

The notice changes to "N project skills trusted." or "Project resources trusted." New chats load the
project's resources; open chats pick them up when they reload.

## Review skills that arrive later

Trusting acknowledges only the skills that exist at that moment. If a pull or branch switch brings new
ones, the notice reads "N new skills appeared since you trusted this project." and they stay off.

1. Review the skills it names, for example in the **Skills** dialog.
2. Select **Review & enable**.

## Approve repository MCP servers

Trust does not turn on a repository's MCP servers. Open **Settings → MCP servers**, find the server marked
**Pending approval**, and select **Review & approve**. The dialog shows the command that will run. If the
entry changes later, approval lapses and you approve the new version. See
[Connect MCP servers](../extend/connect-mcp-servers.md).

## Revoke trust

1. Open the project's Welcome screen, where the trusted notice has a **Stop trusting** button.
2. Select **Stop trusting**, then confirm **Stop trusting this project?**

The project's skills, `pi` resources, and MCP servers stop loading. Running subagents stop, idle chats
reload at once, and a busy chat reloads when its turn ends.

> [!NOTE]
> Trust is not a page in **Settings**. It lives in the project notice, so you decide with the project in
> front of you.

## Check that it worked

- The notice shows a trusted state, and **Stop trusting** appears.
- In the **Skills** dialog, the **Project** group's switches are no longer "Off — trust this project
  first".
- After revoking, the notice returns to "off until you trust it" and project skills are off again.

## Related

- [Security and data overview](security-and-data-overview.md)
- [Trust model](trust-model.md)
- [Use your existing skills](../extend/use-existing-skills.md)
- [Connect MCP servers](../extend/connect-mcp-servers.md)
- [Settings reference](../reference/settings.md)
