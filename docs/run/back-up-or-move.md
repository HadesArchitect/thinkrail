---
title: Back up or move to a new machine
description: Move ThinkRail to a new laptop, or back it up. Push your work, copy settings, sign in again, and know why worktree paths and chats do not travel on their own.
type: how-to
status: draft
---

To move to a new laptop, push your work with `git`, install ThinkRail there, copy your settings, and sign in to your model providers again. Your projects come back from their repositories. Workspaces and chats are tied to folder paths on the old machine, so they do not move by copying alone.

## What lives where

| What | Where | Moves by copying? |
| --- | --- | --- |
| Your code and branches | Your repositories, and the git remote | Push and clone instead of copying. |
| Settings: theme, models, layouts | `~/.thinkrail/config.json` | Yes. |
| Provider logins and API keys | `~/.pi/agent/auth.json` | Yes, but re-signing in is safer. See [step 5](#move-to-a-new-machine). |
| `pi` settings, custom models, prompt templates, user subagents, user MCP servers | `~/.pi/agent/` (`settings.json`, `models.json`, `prompts/`, `agents/`, `mcp.json`) | Yes. Review `mcp.json` for absolute paths. |
| Project list and trust decisions | `~/.thinkrail/projects.json` | Only if project paths are identical on the new machine. |
| Workspace records | `~/.thinkrail/workspaces.json` | Only if the paths are identical. Each record stores an absolute `worktreePath`. |
| Workspace folders | `~/.thinkrail/worktrees/` | No. Each is a `git worktree` linked to its repository by absolute path. |
| Chats | `~/.pi/agent/sessions/`, one folder per working directory | Only if the workspace folders have the same paths. |
| Logs and caches | `~/.thinkrail/logs/`, `~/.cache/thinkrail/` | Not needed. |

The desktop app and the CLI share the same `~/.thinkrail` and `~/.pi` folders, so the table applies to both. On Windows, `~` is `%USERPROFILE%`. See [Files and environment](../reference/files-and-environment.md) for every file.

> [!WARNING]
> Do not copy between operating systems. Stored paths such as `/Users/lena/code/app` do not exist on the other system.

## Before you begin

- Install `git` and ThinkRail on the new machine. See [Install ThinkRail](../get-started/install.md). Use the same channel if you can.
- Know where each project's repository has a remote, such as GitHub. Anything that exists only on the old machine is at risk.

## Move to a new machine

1. **Commit and push every workspace.** In each workspace, run `git status` in its terminal, commit what you want to keep, and push the branch. A workspace folder holds your only copy of any work you have not pushed. See [Open a pull request](../review/open-a-pull-request.md).
2. **Quit ThinkRail on the old machine.** Quit the desktop app, or stop the CLI with **Ctrl+C**. ThinkRail does not lock its state files, so copy them while nothing is running.
3. **Copy your settings.** Copy `~/.thinkrail/config.json` to the same place on the new machine, plus the `pi` files you want from the table, such as `~/.pi/agent/settings.json`, `models.json`, and `prompts/`. Use `scp`, an external drive, or any encrypted transfer.
4. **Clone your repositories** on the new machine, then start ThinkRail and add each one with **Add project → Open project**. See [Manage workspaces](../workspaces/manage-workspaces.md).
5. **Sign in to your providers again.** Open **Settings → Providers** and sign in, or paste your API keys. See [Connect a model provider](../get-started/connect-a-provider.md). This is the safer choice: no credentials travel, so nothing can leak in transit or sit in a backup. If you copy `~/.pi/agent/auth.json` instead, treat it as a secret. It holds your logins and API keys, so move it over an encrypted channel only, and never through a synced or shared folder. A provider configured through an environment variable, such as `ANTHROPIC_API_KEY`, needs the variable set in the new machine's shell profile.
6. **Recreate your workspaces from the pushed branches.** Select **New workspace** and pick the pushed branch in **From**. This starts a new branch at that branch's tip. To keep working on the original branch instead, add a worktree for it in your clone with `git worktree add`, then choose **Open existing worktree…** on the project.
7. **Trust your projects again.** Trust decisions live in `projects.json`, which you did not copy. Open each project and grant trust when asked. See [Trust a project](../security/trust-a-project.md).

### Keep your chats

Chats are not part of the workspace: `pi` files each transcript under `~/.pi/agent/sessions/` by the working directory it ran in. A chat appears for a workspace only when that workspace's folder has the same absolute path as before.

To bring chats over, make the paths identical first: clone each repository to the same path, and give the new account the same user name. For workspaces under `~/.thinkrail/worktrees/`, that means the same home folder path too. Then copy `~/.pi/agent/sessions/`.

> [!WARNING]
> Unverified: moving chat transcripts to another machine has not been tested end to end. The per-directory filing is confirmed in the host code and in [Files and environment](../reference/files-and-environment.md); how `pi` names the folders, and whether a transcript opens under a different path, is not.

If you do not need old chats, skip this: new workspaces start with new chats.

### Move everything when paths are identical

If both machines have the same user name and every repository sits at the same path, you can copy `~/.thinkrail` (including `worktrees/`), `~/.pi/agent`, and your repositories as a set. Still push first and copy from a quit app. After the copy, a workspace that does not open usually points to a path that is missing. `git worktree repair` in the repository fixes the links `git` keeps between a repository and its worktrees.

> [!WARNING]
> Unverified: copying `~/.thinkrail/worktrees/` between machines has not been tested.

## Back up

To keep a restorable copy on the same machine, copy these while ThinkRail is not running:

- `~/.thinkrail/config.json`, `projects.json`, and `workspaces.json`: small, and they hold your settings, project list, trust decisions, and workspace records.
- `~/.pi/agent/`: your `pi` settings, models, prompts, MCP servers, and chats. `auth.json` and `mcp-auth.json` inside it are secrets, so keep the backup encrypted.

Your code is backed up by pushing to its remote. Workspace folders under `~/.thinkrail/worktrees/` are working copies of your branches, so back up the branches rather than the folders. If you set `THINKRAIL_DATA_DIR` or `PI_CODING_AGENT_DIR`, copy those folders instead.

## Check that it worked

- Your projects appear in the Projects tool, and each opens its repository.
- **Settings** shows your theme and favorite models.
- **Settings → Providers** shows a connected provider, and a new chat sends a message.
- Each workspace shows the branch and changes you pushed.

## Related

- [Files and environment](../reference/files-and-environment.md)
- [Update and uninstall ThinkRail](update-and-uninstall.md)
- [Manage workspaces](../workspaces/manage-workspaces.md)
- [Troubleshoot ThinkRail](troubleshoot.md)
