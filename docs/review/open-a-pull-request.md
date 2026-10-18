---
title: Open a pull request
description: Push a workspace branch and create or update its GitHub pull request from the Plan page, with the plan as the description.
type: how-to
status: draft
---

Use **Open PR** to push a workspace's branch and create a GitHub pull request whose description comes from
the chat's plan. If a PR already exists, the same button pushes new commits and refreshes the description.

## Before you begin

- The workspace's branch has commits and differs from its base branch. **Open PR** is disabled when the
  branch is its base, and ThinkRail refuses to push a Default workspace on the default branch.
- The project has an `origin` remote. A base such as `upstream/main` is rejected; open that PR manually or
  create the workspace from a local or `origin` base.
- For one-click creation, the GitHub CLI (`gh`) is installed and signed in on the machine that runs the
  host:

  ```bash
  gh auth status
  ```

  Without it, ThinkRail still pushes the branch and falls back to GitHub's compare page (see below).
- Git can push without a terminal. ThinkRail pushes non-interactively, so an SSH key with a passphrase must
  already be loaded in your agent.

## Open the PR

1. Open the **TODO List** tool and select **Open the plan page**. The Plan page has the PR controls in its
   header. Finish or review the plan's steps first; the page shows "All steps are done and reviewed — ready
   to ship." when it is ready, but you can open a PR before that.
2. Select **Open PR**. For a draft, open the **Plan actions** menu and choose **Open draft PR**.
3. In the dialog, check the **Title** (prefilled from the chat title or branch) and the **Description**
   (rendered from the plan: summary, each step with its commit and verification, the review trail, and any
   commits made outside the plan). Both are editable.
4. Select **Open PR** (or **Open draft PR**) in the dialog.

ThinkRail then:

1. Pushes the branch to `origin` with an upstream set.
2. Looks for an open PR with the same head and base.
3. Creates one with `gh pr create`, or edits the existing one with `gh pr edit`.

Uncommitted files never block this; a toast tells you they stayed local.

## Open a PR without a plan

You do not need a plan to open a PR. The **TODO List** tool always has the plan-page button, even when the
list reads "No TODOs yet", and the Plan page it opens has the same **Open PR** button with an empty plan.

1. Commit the work you want in the PR. Uncommitted files stay local. If you did not ask the agent to
   commit, run `git commit` in a workspace terminal.
2. Open the **TODO List** tool and select **Open the plan page**, then select **Open PR**.
3. In the dialog, write the **Description** yourself. With no plan steps, ThinkRail has nothing to render
   except a **Committed outside the plan** list of the branch's commits, so the prefilled text is a short
   commit list. Edit it before you select **Open PR**.

If you would rather skip the Plan page, ask the agent to open the PR from the chat, or run
`/skill:shipping-a-pr` (see [Ship from a chat instead](#ship-from-a-chat-instead)).

## Ship several workspaces

Each workspace has its own branch, so each gets its own PR. ThinkRail has no screen that opens PRs for
several workspaces at once; repeat the steps above per workspace.

1. Press **Cmd/Ctrl+K** to open **Switch session**, or pick the workspace in the **Projects** tool or the
   workspace pill in the top bar. Switch to the first finished workspace.
2. Review its changes, open its Plan page, and select **Open PR**. The location bar shows a **Pull
   request** chip with the PR number for the active workspace, so you can tell which ones are done.
3. Switch to the next workspace and repeat.

The PRs are independent. They all branch from the base you picked when you created each workspace, so
when one merges, the others can conflict with it. Merge one, then ask the agent in the next workspace to
sync with the base (the `shipping-a-pr` skill does this), and resolve conflicts there before you merge it.

A workspace settles by itself after its PR merges or closes. See
[Manage workspaces](../workspaces/manage-workspaces.md#settle-and-unsettle-a-workspace). To compare
several agents before you choose what to ship, see the
[parallel workspaces tutorial](../workspaces/parallel-workspaces.md).

## Update an existing PR

Once the PR exists, the button reads **Push updates**, or **Push updates (N)** with N unpushed commits.
Selecting it pushes immediately and refreshes the PR description from the current plan, without showing the
dialog. A toast confirms: **PR updated**.

If the remote branch has commits you do not have, the button reads **Branch diverged** and is disabled.
Integrate `origin/<branch>` in a terminal first (the tooltip offers **Copy command**).

## If `gh` is missing or signed out

The branch is still pushed. ThinkRail opens GitHub's compare page in your browser with the title and
description prefilled, shows a **Branch pushed** toast, and opens a setup dialog, **GitHub CLI isn't
installed** or **GitHub CLI isn't signed in**, that lists the install command for your OS and
`gh auth login`.

Finish creating the PR on the compare page, or fix the setup and select **Open PR** again.

## If the push cannot authenticate

If git cannot push without a prompt, nothing is pushed and a **Git push couldn't authenticate** dialog
opens. It lists commands such as `ssh-add` and `gh auth login`, each with **Copy command** and **Run** (runs
in a workspace terminal). Fix the credentials, then select **Open PR** again.

> [!NOTE]
> Creating and updating PRs through ThinkRail works for GitHub only. For another remote, ThinkRail pushes the
> branch and says so; open the review on your forge. There is no in-app merge: merge through the PR or with
> `git`.

## Ship from a chat instead

The bundled `shipping-a-pr` workflow skill drives `gh` through the agent. Use it when you want to sync with
the base, refresh the body, add screenshots, or address review comments. Ask for it in a chat, or run
`/skill:shipping-a-pr`. By default it takes one status snapshot of checks and merge state; it waits for CI
only when you ask it to watch or wait until green. See [Built-in workflows](../specs/workflows.md).

## Check that it worked

- A **PR opened** or **PR updated** toast appears, and the location bar shows a **Pull request** chip with
  the PR number.
- The PR on GitHub carries the plan's summary, steps, and verification as its description.

## Related

- [Review changes](review-changes.md)
- [Undo or discard changes](undo-or-discard-changes.md)
- [Troubleshoot](../run/troubleshoot.md)
- [Plan and review tutorial](../specs/plan-and-review.md)
- [Trust model](../security/trust-model.md)
