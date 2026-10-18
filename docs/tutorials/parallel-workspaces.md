---
title: Run agents in parallel
description: Give one task to two agents in separate workspaces, compare their diffs, keep the better branch, and remove the other.
type: tutorial
status: draft
---

In this tutorial you ask two agents to write the same document in two different ways, each in its own
workspace, while both run at once. You compare the results, ship the one you prefer, and remove the
other. You finish knowing how ThinkRail keeps parallel work apart and how finished workspaces get out
of your way.

Before you start, make sure you have:

- **About 25 minutes.**
- **Completed [Make your first change](first-change.md)**, so ThinkRail is installed, a provider is
  connected, and your GitHub repository is open as a project.
- **No `CONTRIBUTING.md` in that repository yet.** If it has one, pick another file the repository is
  missing, such as `docs/FAQ.md`, and adjust the prompts.

## Start two agents on the same task

### 1. Create the first workspace

Select your project in the **Projects** tool and click its **Create workspace** button (the `+` on the
project row), or press **Cmd/Ctrl+Alt+N**. In the **Create workspace** dialog, keep **Isolated
workspace** and the **From** branch, and type:

```markdown
Write a CONTRIBUTING.md for this repository as a short checklist: at most ten bullet points covering setup, running the tests, and opening a pull request.
```

Click **Create**. The workspace appears under your project, its chat opens, and the agent starts.

> [!TIP]
> In the desktop app, **Cmd/Ctrl+N** also opens the dialog. Browsers reserve that shortcut for a new
> window, so the browser UI uses **Cmd/Ctrl+Alt+N**.

### 2. Create the second workspace while the first one runs

Don't wait for the first agent. Open the **Create workspace** dialog again from the same project, keep
the same **From** branch, and type:

```markdown
Write a CONTRIBUTING.md for this repository as a step-by-step walkthrough for a first-time contributor: setup, running the tests, and opening a pull request, with an example command for each step.
```

Click **Create**. You now have two workspaces under the project, each with its own branch and its own
folder under `~/.thinkrail/worktrees/`. Both rows show the working badge while their agents run, and
each agent soon renames its workspace and branch to match its task.

Neither agent can see or touch the other's files. Each one edits only its own worktree.

> [!NOTE]
> Screenshot to add: the Projects tool with two workspaces under one project, both showing the working
> badge.

### 3. Switch between the running chats

Press **Cmd/Ctrl+K** to open **Switch session**, which lists the active chats across your workspaces.
Pick one to jump to it; press **Cmd/Ctrl+K** again and pick the other to switch back. You can also
click a workspace in the **Projects** tool.

If an agent asks a question while you are looking at the other chat, its workspace row gets a green
dot. Answer the question card when you switch to it.

## Compare and choose

### 4. Read each diff

When both agents finish, select the first workspace and open the **Changes** tool. Click
`CONTRIBUTING.md` to open its diff in a Changes review tab. Then select the second workspace and do
the same. The **Changes** tool always shows the active workspace's changes, so each diff contains only
that agent's work.

> [!TIP]
> To read the two side by side, use **Split right** in a center group's header and open one diff on each
> side. See [Review changes](../how-to/review-changes.md).

### 5. Keep the better version

Pick the version you prefer. In its workspace, ask the agent to commit:

```markdown
Commit CONTRIBUTING.md with a short commit message.
```

Then open the pull request from that workspace's plan page, as in
[Make your first change](first-change.md#13-open-the-pull-request): **TODO List** → **Open the plan
page** → **Open PR**.

### 6. Remove the other workspace

In the **Projects** tool, right-click the workspace you didn't pick, or open its actions menu, and
choose **Remove workspace**. The confirmation explains that it deletes the workspace's chats,
terminals, and worktree, and keeps its git branch. Click **Remove**.

The workspace disappears from the tree. Its uncommitted work is gone; the branch stays in your
repository in case you want to look at it again. To delete the branch too, run this in a terminal in
your project folder, using the branch name the workspace showed:

```bash
git branch -D <branch-name>
```

> [!CAUTION]
> Removing a workspace discards anything in its worktree that was never committed. ThinkRail never
> deletes the branch itself.

## Let finished work settle

### 7. Watch the kept workspace move to Settled

After your pull request merges on GitHub, the kept workspace moves from the live list to the project's
**Settled · N** shelf, with a `merged` reason. The first time this happens in your browser, a message
explains why. Nothing on disk changes; settling only tidies the list.

Workspaces also settle after a quiet stretch with no chat, terminal command, or commit: 7 days by
default, which you can change in **Settings → Workspaces**. Running agents, unread results, and open
pull requests never settle. Any new work in a settled workspace, or **Keep active**, brings it back.

## What you built

- **Two isolated attempts at one task**, running at the same time on separate branches and folders.
- **A choice made from real diffs**, with the chosen branch shipped as a pull request.
- **A tidy project tree**: the rejected workspace removed, the shipped one settled on its own.

## Next steps

- [Manage workspaces](../how-to/manage-workspaces.md) — rename, settle, attach existing worktrees, and
  remove workspaces.
- [Delegate to subagents](../how-to/delegate-to-subagents.md) — parallel work inside a single chat.
- [Workspaces and isolation](../explanation/workspaces-and-isolation.md) — why every workspace is a
  worktree, and what that costs.

> [!WARNING]
> Unverified: this tutorial has not been run end to end. The agents' file contents, how quickly each
> one finishes, and the exact wording of the Settled shelf message depend on the run.
