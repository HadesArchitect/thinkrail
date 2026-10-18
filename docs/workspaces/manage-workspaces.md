---
title: Manage workspaces
description: Create an isolated workspace, work in the project folder, attach an existing worktree, switch between workspaces, settle quiet ones, and remove them.
type: how-to
status: draft
---

A workspace is one unit of work with its own chats, files, changes, and terminals. Create, switch, settle, and remove workspaces from the Projects tool and the workspace menu in the top bar.

## Before you begin

- Open a project: a local git repository. Use the **Add project** button in the Projects tool, then **Open project**, **Enter host path…**, or a recent project. If the folder is not a git repository, ThinkRail offers **Initialize & open**.
- Read [Workspaces and isolation](workspaces-and-isolation.md) if you want the reasoning behind worktrees.

## Create an isolated workspace

1. Press **Cmd/Ctrl+N**, or **Cmd/Ctrl+Alt+N** if your browser reserves the first one. You can also select the `+` on a project row, use the project's **Create workspace** menu item, or choose **New workspace** in the workspace menu.
2. Keep **Isolated workspace** selected under "Where the work runs".
3. In **From**, pick the branch to start from. The default is the branch currently checked out in the project. You can search branches, including remote ones.
4. Describe the work in the prompt box, optionally pick a model and effort, and select **Create**.

ThinkRail runs `git worktree add` to create a new branch in `~/.thinkrail/worktrees/<project-slug>/<branch>`, starts a chat, and sends your prompt.

The dialog has no name field. The workspace starts as `workspace-N`, and the agent names the workspace and branch from your request. To name it yourself, choose **Rename** from the workspace menu; that changes only the display name, not the branch or folder.

> [!NOTE]
> Creating a workspace from a remote branch needs the GitHub CLI signed in. Check **Settings → Integrations**.

## Prepare a new workspace

A new workspace is a fresh checkout of the branch you picked in **From**. It has the files git tracks on
that branch and nothing else, so it behaves like a freshly cloned repository.

| Gap | What ThinkRail does | What to do |
| --- | --- | --- |
| **No installed dependencies.** `node_modules`, virtual environments, and build output are not tracked, so they are not there. | Nothing. There is no setup script, post-create hook, or "run this on new workspaces" setting. | Install dependencies in the workspace: ask the agent ("run `npm install` first, then …") or run the install command in the workspace's terminal. |
| **Ignored files are not copied.** `.env` and other gitignored local config stay in your project folder. | Nothing. ThinkRail does not copy ignored or untracked files. | Copy what you need from your project folder, for example `cp /path/to/project/.env .env`, or tell the agent which values to use. |
| **Uncommitted work is not carried over.** The workspace starts from the committed branch, not from your working tree. | Nothing. | Commit the files you want the agent to see (a spec, a config change) before you create the workspace. |
| **Dev-server ports can collide.** Every workspace runs your project's own commands, and many projects hard-code a port such as 3000. | Nothing. ThinkRail does not assign ports to workspaces. Terminals start in the workspace folder and inherit the host's environment. | Give each workspace its own port through the project's own setting, for example a `PORT` value in that workspace's `.env`, or pass one on the command line. |

Because ThinkRail leaves these steps to you, put them where every agent will see them: a short
"Setting up a worktree" section in the project's `AGENTS.md` (install command, which env file to copy, how
to choose a port). The agent reads it at the start of each chat in the workspace.

> [!TIP]
> Create the workspace, then send the first message "Set this workspace up following `AGENTS.md`, then
> start on …". The agent installs dependencies with its own shell tool before it writes any code.

Two workspaces running the same dev server at once is the usual cause of "address already in use". Stop
the server in the workspace you are done with, or change one port. For running agents side by side, see
[Run agents in parallel](parallel-workspaces.md).

## Work in the project folder

Choose **Project folder** in the dialog, or the **Work in project folder** card on the project home screen. Every project has exactly one such Default workspace. Chats, changes, and terminals run directly in your project folder, with no isolation, and changes land on the current branch. The Default workspace cannot be renamed, settled, or removed.

## Attach an existing worktree

1. Open the project's context menu and choose **Open existing worktree…**.
2. Select a worktree from the list. Worktrees in detached HEAD state are shown but disabled; create a branch in them first.

ThinkRail uses the worktree in place and does not modify it. It does not start a chat.

## Switch workspaces

- Select the workspace pill in the top bar and choose a workspace under **Switch to**. Settled workspaces are under **Settled**.
- Select a workspace in the Projects tool.
- Press **Cmd/Ctrl+K** to open **Switch session**, which lists active chats across your workspaces.

A green dot on a workspace row means a chat needs your input or has an unread result.

## Settle and unsettle a workspace

Settling moves a workspace to the collapsed **Settled** shelf under its project. Nothing on disk changes.

- Workspaces settle automatically when their pull request merges or closes, or after sitting idle. Set the idle window in **Settings → Workspaces**: 1, 3, 7 (default), or 14 days, or never. Open pull requests, running agents, and unread results never settle.
- To settle by hand, use the check button on the row or **Settle** in its menu. It is disabled while the agent is working or a result is unread.
- To bring one back, choose **Keep active**. Real work in a settled workspace, such as a chat, a terminal command, or a commit, also brings it back.

## Remove a workspace

Open the workspace menu, then choose **Remove workspace** and confirm with **Remove**.

| Workspace kind | What is deleted | What stays |
| --- | --- | --- |
| Isolated | Its chats, terminals, and worktree folder, including uncommitted work | The git branch |
| Attached worktree | Its ThinkRail chats and terminals (**Remove from ThinkRail**) | The checkout, files, and branch |
| Default | Cannot be removed | Everything |

> [!WARNING]
> Uncommitted changes in an isolated workspace are lost when you remove it. ThinkRail has no merge action; merge through a pull request or with `git` in a terminal.

## Check that it worked

- The workspace appears under its project, with its branch shown beneath the name.
- The top bar's workspace pill and branch segment show the workspace you switched to.
- After removal, the row is gone and `git worktree list` in your repository no longer shows the folder.

## Related

- [Open a workspace in your editor](open-in-your-editor.md)
- [Open a pull request](../review/open-a-pull-request.md)
- [Keyboard shortcuts](../reference/keyboard-shortcuts.md)
- [Workspaces and isolation](workspaces-and-isolation.md)
- [Parallel workspaces tutorial](parallel-workspaces.md)
