---
title: Undo or discard changes
description: Undo one hunk, discard everything an agent did by removing its workspace, delete the leftover branch, or back out of a commit.
type: how-to
status: draft
---

When you work in an isolated workspace, your project folder is untouched, so throwing the work away is
safe. Undo one hunk from the Changes tab, discard the whole workspace by removing it, or use `git` if you
worked in the project folder instead.

## Which one do you need?

| You want to… | Do this |
| --- | --- |
| Reject one hunk or one file | [Revert the hunk or file](#undo-one-hunk-or-file) |
| Start over on this task | [Remove the workspace](#discard-everything-in-a-workspace) |
| Get rid of the branch too | [Delete the leftover branch](#delete-the-leftover-branch) |
| Undo changes made in the project folder | [Use git in the project folder](#if-you-worked-in-the-project-folder) |
| Back out something already committed | [Undo after a commit](#undo-after-a-commit) |

## Undo one hunk or file

Use this to reject part of what the agent did and keep the rest.

1. Open the **Changes** tool and set **Diff scope** to **All changes** or **Uncommitted changes**. Other
   scopes (a single turn, **Last turn**, or a commit) are read-only. See
   [Review changes](review-changes.md#open-the-review-tab).
2. Open a file. On the hunk you do not want, select **Revert hunk**. To drop the file's whole change,
   select **Revert file** in the section header.
3. A toast reads **Reverted hunk in `<file>`** (or **Reverted `<file>`**), with an **Undo** button. Select
   **Undo** within about 8 seconds to put the change back.

Revert writes the original text back into the workspace's files. It does not make a commit. A file the
agent added is moved to your operating system's trash, so you can also recover it from there.

> [!NOTE]
> The **Undo** button works only while the host remembers the revert: the last 20 reverts per workspace,
> and not after a restart. If the toast says "This change can no longer be undone", reach the old text
> through git instead, or ask the agent to redo it.

**Revert hunk** only edits files, so it does not stop the agent. If the agent is working in the same
workspace, it can rewrite the lines again. Stop it first, or tell it what to leave alone with **Ask agent
about this hunk** (see [Steer or queue messages](../agent/steer-and-queue.md)).

## Discard everything in a workspace

There is no revert-everything button in the Changes tab. To throw away all of a workspace's work, remove
the workspace.

1. Open the workspace menu in the top bar (or the workspace's row in the **Projects** tool).
2. Choose **Remove workspace**, then **Remove** to confirm.

What happens:

- **Uncommitted changes are deleted** along with the workspace's worktree folder, its chats, and its
  terminals. They cannot be recovered through ThinkRail.
- **Committed work survives on the branch.** ThinkRail never deletes the git branch, so the commits stay in
  your repository.
- **Your project folder is not touched**: an isolated workspace lives in its own folder under
  `~/.thinkrail/worktrees/`, so nothing in your checkout changes.

> [!WARNING]
> Removing a workspace discards anything in it that was never committed. If you want to keep part of it,
> commit that part first, or use **Revert hunk** on the rest.

Removing a workspace you attached with **Open existing worktree…** only forgets its ThinkRail chats and
terminals. The checkout and its files stay on disk, so it is not a way to discard changes. See
[Manage workspaces](../workspaces/manage-workspaces.md#remove-a-workspace).

## Delete the leftover branch

The branch stays after you remove the workspace, so it shows up in your branch list. To delete it, open a
terminal in your project folder and run this with the branch name the workspace showed:

```bash
git branch -D <branch-name>
```

`-D` deletes the branch even if it was never merged, which is what you want when discarding. Check the name
first with `git branch`. If you already pushed the branch, delete it on the remote too, or close the pull
request on GitHub and delete the branch there.

## If you worked in the project folder

If you chose **Project folder** (the Default workspace) instead of an isolated workspace, the agent's edits
are in your real checkout, on your current branch, and ThinkRail has no remove action for it. Undo them with
`git` from a terminal in the project folder.

> [!CAUTION]
> These commands delete work that git has no copy of. Run `git status` first and read what it lists. Revert
> hunk and **Undo** can still help for edits you have not committed, because they work in this workspace
> too.

Review what changed:

```bash
git status
git diff
```

Then pick the narrowest command that does what you want:

```bash
# Restore one file to its last commit
git restore <file>

# Restore every tracked file to its last commit
git restore .

# Preview, then delete, files the agent created that git does not track
git clean -nd
git clean -fd
```

Run `git clean -nd` first: it only lists what `git clean -fd` would delete.

## Undo after a commit

Where you start depends on whether the commit left your machine.

- **Not pushed, and you want it gone.** In a terminal in the workspace, `git reset --hard <commit-before>`
  moves the branch back and discards the work after it. Use `git reset --soft HEAD~1` instead to undo the
  commit but keep its changes staged.
- **Already pushed, or in a pull request.** Add a new commit that cancels it with `git revert <sha>`, then
  push. Do not rewrite history on a branch other people may have.
- **From the Changes tab.** With **Diff scope** set to **All changes**, **Revert hunk** and **Revert file**
  also undo committed changes: they restore the text the branch started from as an uncommitted edit, which
  you can then commit or leave.
- **The whole workspace was wrong.** [Remove the workspace](#discard-everything-in-a-workspace) and delete
  its branch.

## Check that it worked

- The hunk disappears from the diff, or the file leaves the **Changes** list.
- After a removal, the workspace is gone from the tree and `git worktree list` no longer shows its folder.
- After deleting the branch, `git branch` no longer lists it.

## Related

- [Review changes](review-changes.md)
- [Manage workspaces](../workspaces/manage-workspaces.md)
- [Workspaces and isolation](../workspaces/workspaces-and-isolation.md)
- [Parallel workspaces tutorial](../workspaces/parallel-workspaces.md)
