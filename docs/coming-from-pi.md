---
title: Coming from pi
description: Bring your pi setup into ThinkRail — what carries over, what does not, which pi version ThinkRail embeds, and how to check your setup.
type: how-to
status: draft
---

If you already use `pi` in the terminal, most of your setup works in ThinkRail unchanged. ThinkRail runs
`pi` in its own process against `pi`'s normal agent directory, `~/.pi/agent`, so your providers, skills,
extensions, prompt templates, and sessions are already there. This page lists what carries over, what does
not, and how to check it.

## Your pi setup in ThinkRail

| Your `pi` setup | In ThinkRail |
| --- | --- |
| **Agent directory**, `~/.pi/agent` or `PI_CODING_AGENT_DIR` | Read and written in place. ThinkRail keeps no copy. |
| **Sign-ins and saved keys** (`auth.json`, `/login`) | Connected. They show under **Connected** in **Settings → Providers**, where you can also sign in and out. |
| **Keys in environment variables**, such as `ANTHROPIC_API_KEY` or `OPENROUTER_API_KEY` | Count as connected and show as **Managed**. The host must see the variable; see [Environment variables](#environment-variables). |
| **`models.json`**: custom endpoints, base URLs, model overrides | Read as is. Providers it configures show as **Managed**. The **GPT context window** section in **Settings → Models** edits the same file. |
| **OpenRouter** | A built-in `pi` provider. Find **OpenRouter** in **Settings → Providers** and sign in or paste a key, or set `OPENROUTER_API_KEY`. A regional base URL in `models.json` applies too. |
| **Skills** in `~/.pi/agent/skills/`, `~/.agents/skills/`, and `pi` packages | Load in every chat. Invoke them with `/skill:<name>`. ThinkRail also reads skills you keep for Claude, Codex, Copilot, and Gemini. See [Use existing skills and prompt templates](extend/use-existing-skills.md). |
| **Prompt templates** in `~/.pi/agent/prompts/` | Become `/name` commands in the composer. Manage them in **Settings → Prompt templates**. |
| **Extensions and packages** from your `pi` settings | Load into every chat. Tools, event hooks, slash commands, and simple dialogs work. See [Extensions](extend/extensions.md). |
| **`settings.json`** | Read for packages, extensions, and resource paths. The model and effort a new chat starts with come from **Settings → Models**, not from `pi`'s defaults. See [Choose models and effort](agent/choose-models.md). |
| **MCP servers** in `~/.pi/agent/mcp.json` | Run in every chat from ThinkRail 0.2.0, currently nightly, on `pi`'s built-in MCP. Manage them in **Settings → MCP servers**. See [Connect MCP servers](extend/connect-mcp-servers.md). |
| **Sessions** in `~/.pi/agent/sessions/` | Shared. Sessions you ran in a project folder appear in that project's Default workspace chat history, and history search (**Ctrl+R**, scope **Everywhere**) covers every `pi` session on disk, including ones outside ThinkRail. |
| **`AGENTS.md` and `CLAUDE.md`** | Loaded by `pi` as usual, without project trust. See [Context files](#context-files). |
| **Folders `pi` already trusts** | Start trusted in ThinkRail. See [Project resources wait for trust](#project-resources-wait-for-trust). |

### Environment variables

The host reads provider keys from its own environment, so start the `thinkrail` CLI from a shell that has
them.

From ThinkRail 0.2.0, currently nightly, a host started outside a terminal, such as the desktop app
launched from the Dock or Finder, also imports your login shell's environment on macOS and Linux. Keys you
export in your shell profile then reach it. Variables that start with `PI_` or `THINKRAIL_`, including
`PI_CODING_AGENT_DIR`, are never imported this way: set them where the app starts, or use the CLI.

### Context files

`pi` reads context files the same way it does in the terminal: one from the agent directory, then one per
folder from the working directory up to the filesystem root. In each folder it takes the first of
`AGENTS.override.md`, `AGENTS.md`, or `CLAUDE.md`, so a folder with both `AGENTS.md` and `CLAUDE.md` loads
only `AGENTS.md`.

Where a chat runs changes which files apply:

- **Default workspace.** The working directory is your project folder, so the files there and in the
  folders above it apply, as in the terminal.
- **Isolated workspace.** The working directory is a worktree under `~/.thinkrail/worktrees/`. The
  `AGENTS.md` committed in the repository applies, and so do files in your home folder and
  `~/.pi/agent/`. Files in the folders above your project folder do not, and neither does an uncommitted
  `AGENTS.md` in your project folder.

`pi` does not read Claude Code's global `~/.claude/CLAUDE.md`. Put instructions for every project in
`~/.pi/agent/AGENTS.md`.

## What does not carry over

- **Terminal UI.** Themes, custom TUI rendering, and `pi`'s terminal keybindings do nothing in ThinkRail,
  which has its own UI, [themes](reference/settings.md), and
  [keyboard shortcuts](reference/keyboard-shortcuts.md).
- **Custom tool rendering.** Tools from your own extensions work, but the chat shows them with a generic
  tool card, not the renderer you wrote for the terminal.
- **Most interactive commands.** Of `pi`'s built-in commands, the composer offers `/compact`, `/name`,
  and `/model`. For the rest, use ThinkRail's screens: **Settings → Providers** instead of `/login`, and the
  workspace chat history instead of `/resume`.
- **The `pi` executable.** ThinkRail does not ship a `pi` command, so `pi install` and `pi mcp add` are not
  available from ThinkRail. Keep your terminal `pi` for those; ThinkRail picks up what they write.

## Which pi version ThinkRail runs

ThinkRail embeds its own copy of `pi`, pinned to an exact version, and does not use the `pi` you
installed. The two can differ, and an extension that depends on a specific `pi` version can behave
differently.

| ThinkRail | Embedded `pi` |
| --- | --- |
| Stable v0.1.6 | 1.0.2 |
| 0.2.0 nightly | 1.2.0 |

The [changelog](changelog.md) records every `pi` upgrade in an **Engine:** line under the release that ships it.

## Project resources wait for trust

What a repository supplies loads only after you trust that project: its `.pi/` settings, extensions,
skills, prompts, themes, and subagent definitions, and skills it commits for other agents. Its MCP servers
also need a separate approval each. Your personal setup in `~/.pi/agent` is never gated.

If `pi` already trusts a folder, through a saved decision or a global "always" setting, its `pi`
resources start trusted in ThinkRail. See [Trust a project](security/trust-a-project.md).

## Check your setup in ThinkRail

1. Install ThinkRail and start it. See [Install ThinkRail](get-started/install.md). If you moved `pi`'s agent
   directory, start the `thinkrail` CLI from a shell where `PI_CODING_AGENT_DIR` is set.
2. Open **Settings → Providers**. Your `pi` sign-ins appear under **Connected**, and keys from the
   environment or `models.json` appear as **Managed**. If one is missing, check that the host can see its
   variable, then select **Refresh**.
3. Open a project you already use with `pi`, then start a chat in its Default workspace.
4. In the composer, type `/`. The menu lists your skills as `/skill:<name>`, your prompt templates, and your
   extensions' commands, each tagged with its source.
5. Ask the agent which instructions it has from `AGENTS.md`. Its answer shows whether your context files
   loaded.
6. If the project ships its own `.pi/` resources, trust it from the notice on the project's home screen.
7. Press **Ctrl+R**, press it again until the scope reads **Everywhere**, and search for a prompt from a
   recent terminal session.

You are set up when your providers are connected, `/` lists your skills and templates, and your terminal
sessions show up in search.

## Related

- [ThinkRail and pi](agent/thinkrail-and-pi.md): what `pi` owns and what ThinkRail adds
- [Connect a model provider](get-started/connect-a-provider.md)
- [Use ThinkRail packages in pi](extend/use-thinkrail-packages-in-pi.md): the reverse direction
- [Files and environment](reference/files-and-environment.md)
