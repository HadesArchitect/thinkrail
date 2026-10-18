---
title: Use existing skills and prompt templates
description: Reuse skills from pi, Claude, Codex, Copilot, and Gemini folders, invoke them with /skill:, and manage project skills and prompt templates.
type: how-to
status: draft
---

ThinkRail reads the skills you already have, in place, and lets you invoke them from the composer. It does not copy them: `pi` parses every `SKILL.md`, so the same skill works in the `pi` CLI and in ThinkRail.

## Before you begin

- Put skills where ThinkRail looks (see below). A skill is a directory that contains a `SKILL.md` file.
- To use skills committed to a repository, trust the project. See [Trust a project](trust-a-project.md).

## Where skills are read from

When two skills share a name, the first match wins, in this order: `pi` and configured skills, ThinkRail's bundled skills, your personal skill folders, then project skill folders. A repository cannot shadow your own or ThinkRail's skills.

| Source | Location | Needs project trust |
| --- | --- | --- |
| `pi`, user | `~/.pi/agent/skills/`, `~/.agents/skills/`, and skills from `pi` packages and settings | No |
| `pi`, project | `<worktree>/.pi/skills/`, and `.agents/skills/` in the folder and its ancestors up to the repository root | Yes |
| Claude | `~/.claude/skills`, or `$CLAUDE_CONFIG_DIR/skills`; also each installed Claude plugin's `skills/` folder | No |
| Codex | `~/.codex/skills`, or `$CODEX_HOME/skills` | No |
| Copilot | `~/.copilot/skills` | No |
| Gemini | `~/.gemini/skills`, or under `$GEMINI_CLI_HOME` | No |
| Project, other agents | `<worktree>/.claude/skills`, `.github/skills`, `.gemini/skills` | Yes, plus per-skill acknowledgement |
| ThinkRail | Bundled with the app | No |

`PI_CODING_AGENT_DIR` relocates the `pi` agent folder. Claude plugins installed after a chat starts appear in a new chat.

## Invoke a skill

1. In the composer, type `/`. The menu lists skills, prompt templates, and extension commands, each tagged with its source, such as `skill/user` or `prompt/project`.
2. Pick a skill, shown as `/skill:<name>`. Use the arrow keys with **Enter** or **Tab** to choose, and **Esc** to close.
3. Add any arguments after the name, then send. The arguments are appended as your request.

The agent also sees every skill's name and description and may load one itself. A skill with `disable-model-invocation: true` in its frontmatter runs only when you invoke it. Your message appears in the transcript as a collapsed skill card.

## Turn skills on and off

Select the **Skills** button in the chat header (also in the **Create workspace** dialog). Skills are grouped by source: **ThinkRail**, **Pi**, **Personal**, one group per Claude plugin, and **Project**. Use the group and per-skill switches, then select **Reload** to apply them to the current chat. If skills change on disk, the button shows "Skills changed on disk — reload".

## Use project skills

Project skills from `.claude/skills`, `.github/skills`, and `.gemini/skills` stay off until you trust the project, because they enter the agent's system prompt.

1. Open the project's home screen, the **Create workspace** dialog, or the **Skills** dialog and find the trust notice.
2. Select **Trust project**.

Trust acknowledges the skills present at that moment. Skills that arrive later, after a pull or a branch switch, wait for **Review & enable**. **Stop trusting** unloads project skills again.

## Use prompt templates

Prompt templates are Markdown files that become `/name` commands. The name is the file name without `.md`.

- **Global.** `~/.pi/agent/prompts/*.md`
- **Project.** `<worktree>/.pi/prompts/*.md`, loaded only when the project is trusted

Manage them in **Settings → Prompt templates**: **New**, **Add starter templates** (`review`, `explain`, `tests`, `commit`, `rename`), and for project templates **Open as file**, **Edit**, and **Delete**. Templates accept `$1`, `$ARGUMENTS`, and `${1:-default}` placeholders. Picking one in the composer inserts its body; **Tab** and **Shift+Tab** step through placeholders.

## Check that it worked

- Typing `/skill:` in the composer lists your skills with a source tag.
- The **Skills** dialog shows the skill in its group with its switch on.
- A project skill shows an off reason such as "Off — trust this project first" until you trust the project.

## Related

- [Trust a project](trust-a-project.md)
- [Connect MCP servers](connect-mcp-servers.md)
- [Files and environment](../reference/files-and-environment.md)
- [Trust model](../explanation/trust-model.md)
- [ThinkRail and pi](../explanation/thinkrail-and-pi.md)
