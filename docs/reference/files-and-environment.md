---
title: Files and environment
description: Where ThinkRail and pi keep files on disk, where workspaces and logs live, which ports are used, and every environment variable ThinkRail reads.
type: reference
status: draft
---

ThinkRail keeps its own state in one directory, `~/.thinkrail`. Everything that belongs to `pi` (credentials, chat transcripts, MCP configuration) stays in `pi`'s own directory, `~/.pi`. This page lists both, plus the installer's files, ports, and environment variables.

> [!WARNING]
> Unverified: the location of the desktop app's own per-user data directory (see [Desktop app files](#desktop-app-files)) is chosen by the Electrobun framework and was not confirmed from the repository.

## Directories at a glance

| Location | Owner | Purpose |
| --- | --- | --- |
| `~/.thinkrail/` | ThinkRail | App state: projects, workspaces, settings, review comments, logs. Move it with `THINKRAIL_DATA_DIR`. |
| `~/.thinkrail/worktrees/` | ThinkRail | The git worktrees behind your workspaces. |
| `~/.pi/agent/` | `pi` | Credentials, models, chat transcripts, MCP config, prompt templates. Move it with `PI_CODING_AGENT_DIR`. |
| `<workspace>/.thinkrail/context/` | ThinkRail | Per-workspace scratch files, ignored by git. |
| `<repository>/.pi/` | `pi` | Project-level `pi` resources: settings, prompts, MCP servers, subagents, extensions. |
| `~/.config/thinkrail/install.json` | Installer | Records how the CLI was installed. |
| `~/.cache/thinkrail/` | CLI binary | Files unpacked from the installed binary. |

On Windows, `~` is your user profile folder (`%USERPROFILE%`).

## `~/.thinkrail`

ThinkRail creates this directory on first use. Files are JSON unless noted. If a state file cannot be read, ThinkRail sets the file aside as `<file>.corrupt-<timestamp>` and starts from empty.

| Path | Contents |
| --- | --- |
| `config.json` | Host-wide settings: theme, analytics choice, notifications, terminal options, composer size, line widths, favorite and recent models, default and review models, subagent options, JetBrains AI quota options, settle days, disabled extensions, custom layouts. See [Settings reference](settings.md). |
| `projects.json` | Known projects: open or closed, slug, trust decisions, skill and MCP approvals. |
| `workspaces.json` | Workspace records: name, branch, worktree path, base branch, last activity, per-workspace overrides. |
| `terminals.json` | The list of terminal tabs per workspace. Running shells do not survive a host restart; the tabs do. |
| `session-lifecycle.json`, `session-receipts.json`, `turns.json` | Bookkeeping for chat completion and unread state, and the per-run change sets behind **Agent turns**. Chat transcripts are not here. |
| `reviews/<workspace-id>.json` | Local review comments for a workspace. |
| `reviews/archive/<workspace-id>/<review-id>.json` | Reviews archived by **Clear review**. |
| `delegation/` | Subagent child sessions, grouped by workspace. |
| `worktrees/<project-slug>/<branch>/` | The git worktree for each ThinkRail-created workspace. |
| `installation.json` | A random installation ID, used for analytics. It is not sent as a file and holds no account information. |
| `attribution.json` | A record of whether the one-time "how you found ThinkRail" link was attempted. Expires after 30 days. |
| `feedback.json` | Counters for the interview invitation. |
| `logs/` | Log files, described under [Logs](#logs). |

### Workspace worktrees

A workspace you create from a project gets its own `git worktree`:

```text
~/.thinkrail/worktrees/<project-slug>/<branch>/
```

`<project-slug>` is the project's stable slug and `<branch>` is the workspace's branch name, a short kebab-case slug. The **Default** workspace is not a worktree: it is the project's own folder. An existing worktree you attach stays where it is.

Removing a workspace deletes its worktree, including uncommitted work, but keeps the git branch. See [Manage workspaces](../workspaces/manage-workspaces.md) and [Workspaces and isolation](../workspaces/workspaces-and-isolation.md).

### Inside a workspace

Each workspace has a scratch folder, `.thinkrail/context/`, with a `.gitignore` containing `*`, so it never shows up in your changes. It holds temporary files such as:

| Path | Contents |
| --- | --- |
| `.thinkrail/context/todos/<session-id>.json` | The plan (TODO list) for a chat. |
| `.thinkrail/context/todos/<session-id>.baselines.json` | Baselines used to compute per-step changes. |
| `.thinkrail/context/TASK-<slug>.md` | Task specs written by the brainstorming workflow. |
| `.thinkrail/context/pr-body.md` | Pull request body drafts. |
| `.thinkrail/context/pr-shots/` | Screenshots staged for a pull request. |

## `pi` files

`pi` stores its state under its agent directory, `~/.pi/agent` by default. Set `PI_CODING_AGENT_DIR` to the directory itself to move all of it. ThinkRail reads and writes these files through `pi` and never keeps copies.

| Path | Contents |
| --- | --- |
| `~/.pi/agent/auth.json` | Provider logins and API keys. |
| `~/.pi/agent/models.json` | Custom models and per-model context windows. |
| `~/.pi/agent/settings.json` | `pi` settings, including installed `pi` packages. |
| `~/.pi/agent/sessions/` | Chat transcripts as JSONL, one folder per working directory. ThinkRail rebuilds a chat from here after a reload or restart. |
| `~/.pi/agent/prompts/` | Global prompt templates (**Settings → Prompt templates**). |
| `~/.pi/agent/mcp.json` | User-level MCP servers. |
| `~/.pi/agent/mcp-auth.json` | OAuth tokens for MCP servers. |
| `~/.pi/agent/mcp.log` | MCP server messages. |
| `~/.pi/agent/trust.json` | Saved project-trust decisions made through `pi`. |
| `~/.pi/agent/extensions/` | User-installed `pi` extensions. JetBrains AI adds `jetbrains-central.ts` here through the `central` CLI. |
| `~/.pi/agent/agents/` | Personal subagent definitions. |
| `~/.pi/web-search.json` | Optional API keys for web research providers. It moves to `$PI_CODING_AGENT_DIR` if that is set, or to `$XDG_CONFIG_HOME/pi` if only `XDG_CONFIG_HOME` is set. |

Inside a repository, `pi` and ThinkRail read project resources from `<repository>/.pi/`: `settings.json`, `prompts/`, `mcp.json`, `agents/`, `extensions/`, and `skills/`. These load only when the project is trusted. See [Trust a project](../security/trust-a-project.md).

### Skill locations read in place

ThinkRail also reads skills that other agents use, without copying them:

| Path | Notes |
| --- | --- |
| `~/.agents/skills/` | Personal skills shared across agents. |
| `<project>/.claude/skills/`, `<project>/.github/skills/`, `<project>/.gemini/skills/` | Project skills from other agents. |
| `~/.claude/skills/` (or `$CLAUDE_CONFIG_DIR/skills`) | Claude user skills, plus skills from installed Claude plugins. |
| `~/.codex/skills/` (or `$CODEX_HOME/skills`) | Codex user skills. |
| `~/.copilot/skills/` | Copilot user skills. |
| `~/.gemini/skills/` (or `$GEMINI_CLI_HOME/.gemini/skills`) | Gemini user skills. |

See [Use existing skills](../extend/use-existing-skills.md).

## Installer and CLI files

| Path | Contents |
| --- | --- |
| `<prefix>/bin/thinkrail` | The CLI binary. `thinkrail.exe` on Windows. The default prefix is `~/.local`. |
| `~/.config/thinkrail/install.json` | Channel, version, tag, prefix, whether the installer added the Windows PATH entry, and the install time. Read by `thinkrail update` and `thinkrail uninstall`. On Windows: `%USERPROFILE%\.config\thinkrail\install.json`. |
| `~/.cache/thinkrail/` | The installed binary unpacks its web app, skills, and runtime helpers here, under a folder per kind and version. `$XDG_CACHE_HOME/thinkrail` if `XDG_CACHE_HOME` is set. |
| Shell startup file | On macOS and Linux, a block between `# >>> thinkrail PATH >>>` and `# <<< thinkrail PATH <<<` in `~/.bashrc` (`~/.bash_profile` on macOS), `.zshrc` (in `$ZDOTDIR` if set), or `~/.config/fish/conf.d/thinkrail.fish`. |

### Desktop app files

The desktop app keeps the same `~/.thinkrail` state as the CLI. It also keeps two small files for the window itself, `routes.json` (the last route per window) and `preferences.json`, in the per-user data directory the framework provides. Set `THINKRAIL_DESKTOP_USER_DATA` to change that directory.

> [!WARNING]
> Unverified: the default location of that directory on each OS.

The desktop app, the CLI, and a source checkout do not lock each other out of `~/.thinkrail`. If you run more than one against the same directory, their changes to shared files are not coordinated and can overwrite each other.

## Logs

| Path | Contents |
| --- | --- |
| `~/.thinkrail/logs/thinkrail.<date>.<n>.jsonl` | Structured JSON log lines. A new file starts each day and whenever a file reaches 10 MB. ThinkRail keeps the active file and 14 older ones. Secrets such as tokens and API keys are redacted. |
| `~/.thinkrail/logs/crash.log` | Plain-text report of a fatal error, appended before the process exits. |
| `~/.pi/agent/mcp.log` | MCP server messages, owned by `pi`. |

The terminal shows the same log lines in a readable form. The default level is `info`; run `thinkrail --verbose` or set `THINKRAIL_LOG_LEVEL=debug` for more. Output that `pi` or an extension writes with `console.*` is intentionally not written to the log files.

## Ports and network

| Where | Port | Notes |
| --- | --- | --- |
| CLI host | `24242` | Change with `--port` or `THINKRAIL_PORT`. If the port is taken, the host scans upward for a free one. |
| Desktop app | A random loopback port | Bound to `127.0.0.1` on port `0` at each launch and never saved. |
| Source checkout (`bun run dev`) | `24242` for the host, `24269` for the web dev server | Change with `THINKRAIL_PORT` and `THINKRAIL_WEB_PORT`. |

The CLI binds `localhost` unless you pass `--host`. The host has no sign-in screen, so keep it on a loopback address or a network you trust.

Outbound connections the host makes:

| Destination | Purpose |
| --- | --- |
| Your model providers | Agent requests, through `pi`. |
| `api.github.com` and `github.com` | Release checks for updates (CLI and desktop). Also used by the installers to download binaries. |
| PostHog (EU endpoint) | Usage analytics, in release builds only. See [Privacy and analytics](../security/privacy-and-analytics.md). |
| Web search providers | The agent's web research tools. |
| `raw.githubusercontent.com` | Installer scripts and downloads. |
| `thinkrail.ai` | A one-time attribution link, opened in your browser. |
| MCP servers you configure | Tool calls to those servers. |

The full list, with what is sent and how to turn each off, is in the
[Security and data overview](../security/security-and-data-overview.md#what-leaves-your-machine).

## Environment variables

### Variables you can set

| Variable | Read by | Description |
| --- | --- | --- |
| `THINKRAIL_DATA_DIR` | Host | Use this directory instead of `~/.thinkrail`. |
| `THINKRAIL_PORT` | CLI | Default for `--port`. |
| `THINKRAIL_HOST` | CLI | Default for `--host`. |
| `THINKRAIL_STATIC_DIR` | CLI | Serve a different built web app. |
| `THINKRAIL_NO_ANALYTICS` | Host | Any non-empty value turns off additional analytics for this run. |
| `THINKRAIL_LOG_LEVEL` | Host | `debug`, `info`, `warn`, or `error`. Default `info`. |
| `THINKRAIL_CHANNEL`, `THINKRAIL_VERSION`, `THINKRAIL_PREFIX`, `THINKRAIL_NO_MODIFY_PATH` | `install.ps1` | Windows installer options. See [CLI reference](cli.md#installps1-windows). |
| `THINKRAIL_REPO` | `install.sh`, `install.ps1` | GitHub repository the installers download from. Default `JetBrains/thinkrail`. |
| `THINKRAIL_INSTALL_SCRIPT_URL`, `THINKRAIL_INSTALL_PS1_URL` | `thinkrail update` | Installer URL overrides. |
| `THINKRAIL_POSTHOG_HOST` | Host | Send analytics to a different ingestion host. |
| `THINKRAIL_DESKTOP_USER_DATA` | Desktop app | Directory for the window's own state files. |
| `PI_CODING_AGENT_DIR` | `pi` | Move `pi`'s agent directory (default `~/.pi/agent`). |
| `PI_OFFLINE` | `pi` | Disable network refresh of the model catalog. ThinkRail sets it itself while it builds the runtime. |
| `CLAUDE_CONFIG_DIR`, `CODEX_HOME`, `GEMINI_CLI_HOME` | Host | Locations of other agents' skill directories. |
| `XDG_CACHE_HOME` | CLI binary | Parent of the unpack cache. |
| `XDG_CONFIG_HOME` | `pi` web research | Location of `web-search.json` when `PI_CODING_AGENT_DIR` is not set. |
| `ZDOTDIR` | Installer, uninstaller | Where the installer writes the zsh PATH block and `thinkrail uninstall` looks for it. |
| Provider variables such as `ANTHROPIC_API_KEY` | `pi` | A provider configured through the environment counts as connected and shows as **Managed**. |

### Variables the host reads from your system

| Variable | Description |
| --- | --- |
| `HOME`, `USERPROFILE` | Home folder (`USERPROFILE` on Windows). Base of `~/.thinkrail` and `~/.pi`. |
| `PATH` | Where the host finds `git`, `gh`, `central`, and editors. At startup the host merges in the `PATH` from your login shell, so tools installed through shell profiles are found when the app starts from the Dock or a launcher. |
| `SHELL` | The shell for new terminal tabs. When set, it wins over **Settings → Terminal → Windows shell**. |
| `SSH_AUTH_SOCK` | On macOS, if it is missing, the host reads it from `launchctl` so git can use your SSH agent. |
| `LANG`, `LC_ALL`, `LC_CTYPE` | If none is set, the host sets a UTF-8 locale so child processes behave. |
| `DISPLAY`, `WAYLAND_DISPLAY` | On Linux, a graphical session is required for the folder picker. |
| `CI`, `NODE_ENV=test` | Turn analytics off. |

Variables from your login shell that start with `PI_` or `THINKRAIL_` are never imported, so set those in the environment that launches ThinkRail.

### Variables ThinkRail sets for child processes

| Variable | Where | Value |
| --- | --- | --- |
| `TERM`, `COLORTERM` | Terminal tabs | `xterm-256color`, `truecolor` |
| `PI_SESSION_ID`, `PI_SESSION_FILE`, `PI_PROVIDER`, `PI_MODEL`, `PI_REASONING_LEVEL` | Background commands | Describe the chat that started the command. |

### Developer and test variables

These are for working on ThinkRail itself, not for normal use.

| Variable | Purpose |
| --- | --- |
| `THINKRAIL_WEB_PORT` | Port of the web dev server in `bun run dev`. |
| `THINKRAIL_GH_OFFLINE=1` | Skip the `gh` checks: the GitHub status reports not connected and Open PR uses its compare-URL fallback. |
| `THINKRAIL_PICK_DIR` | Preset the result of the folder picker. |
| `THINKRAIL_E2E_FAKE_OAUTH`, `THINKRAIL_E2E_MODEL` | End-to-end test helpers. |
| `THINKRAIL_DESKTOP_CONTROL_FILE`, `THINKRAIL_DESKTOP_E2E_HOST`, `THINKRAIL_DESKTOP_HIDDEN`, `THINKRAIL_DESKTOP_READY_FILE`, `THINKRAIL_DESKTOP_NAVIGATION_PROBE_FILE`, `THINKRAIL_DESKTOP_TITLE_BAR_PROBE_FILE`, `THINKRAIL_DESKTOP_WINDOW_CONTROLS_PROBE_FILE` | Desktop packaging and smoke tests. |
| `THINKRAIL_SHIKI_THEME`, `THINKRAIL_SHIKI_THEME_NAME`, `THINKRAIL_MONACO_COLOR_VARIABLES` | Web build theming switches. |

## Related

- [CLI reference](cli.md)
- [Settings reference](settings.md)
- [Platform support](../run/platform-support.md)
- [Troubleshoot](../run/troubleshoot.md)
- [Back up or move to a new machine](../run/back-up-or-move.md)
