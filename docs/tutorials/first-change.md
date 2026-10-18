---
title: Make your first change
description: Install ThinkRail, connect a model, and take one small agent change from an isolated workspace through review to a pull request.
type: tutorial
status: draft
---

In this tutorial you install ThinkRail, let the agent add a **Quick start** section to a README in one
of your GitHub repositories, review the diff, and open a pull request. Along the way you meet the pieces
you use every day: workspaces, chats, steering, the Changes review, and Open PR.

Before you start, make sure you have:

- **About 20 minutes.**
- **macOS on Apple Silicon, Linux, or Windows.** See [Platform support](../reference/platform-support.md).
- **`git` on your PATH.**
- **A GitHub repository you can push to, cloned locally**, with `origin` pointing at GitHub. Any small
  project with a `README.md` works.
- **A model provider**: a JetBrains AI account, or an API key or subscription for a provider such as
  Anthropic or OpenAI.
- **Optional: the GitHub CLI (`gh`), signed in** with `gh auth login`. Without it, ThinkRail opens
  GitHub's compare page for you to finish the pull request.

## Install and launch

### 1. Install the `thinkrail` CLI

Run the installer in a terminal. On macOS or Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash
```

On Windows, from cmd or PowerShell:

```powershell
powershell -c "irm https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.ps1 | iex"
```

The installer downloads the binary for your platform, verifies its checksum, and puts `thinkrail` on
your PATH. It finishes by printing `Run: thinkrail`. Open a new terminal so the updated PATH takes
effect.

> [!TIP]
> Prefer a native window? The desktop app runs the same host. See [Install ThinkRail](../how-to/install.md)
> for the desktop app, release channels, and other install options.

### 2. Launch ThinkRail

```bash
thinkrail
```

The terminal prints `thinkrail → http://localhost:24242` and your default browser opens that address.
If port 24242 is busy, ThinkRail picks the next free port and prints that URL instead. Keep the
terminal open: it is running the host.

### 3. Choose what usage data to share

A **Help improve ThinkRail** dialog appears first. It explains that ThinkRail never collects prompts,
code, files, credentials, or account identity. The **Share additional usage data** switch is on.
Leave it on or turn it off, then click **Done**.

You see the Welcome screen with a warning: "No model provider connected — the agent can't run."

You can change this choice later in **Settings → Privacy**. Read
[Privacy and analytics](../explanation/privacy-and-analytics.md) for exactly what is sent.

### 4. Connect a model provider

Click **Connect a provider** in the warning. Settings opens on the **Providers** page. Connect the
provider you have:

- **JetBrains AI.** The **JetBrains AI** card shows how to install the JetBrains Central CLI
  (`central`) if it is missing. Run the command it shows in a terminal, click **Recheck**, then click
  **Connect**. If the card says Central is signed out, click **Sign in** and finish in the browser.
- **An API key.** Under **Available**, find your provider and click **API key**. Paste the key and
  click **Submit**.
- **A Claude, ChatGPT, or Copilot subscription.** Under **Subscriptions**, click **Sign in** next to
  the provider and finish in the browser.

The provider moves to the **Connected** section. Press **Esc** to close Settings; the warning on the
Welcome screen is gone.

For details on each option, see [Connect a model provider](../how-to/connect-a-provider.md).

## Start the work

### 5. Open your project

On the Welcome screen, click the **Open project** card, then choose **Open project** from the menu.
Pick the folder of your cloned repository.

ThinkRail adds it to the **Projects** tool on the left and shows the project's home: its name in large
type and a row of cards, including **Start building** and **Work in project folder**. A repository
without specs also gets a **Set up project** card first; you use that one in
[Set up a project for spec-first work](spec-first-project.md).

> [!TIP]
> If a project trust notice appears, leave the project untrusted for now. Nothing in this tutorial
> needs it. See [Trust a project](../how-to/trust-a-project.md).

> [!NOTE]
> Screenshot to add: the project home with the **Set up project**, **Start building**, and **Work in
> project folder** cards.

### 6. Create a workspace with your task

Click **Start building**. The **Create workspace** dialog opens with **Isolated workspace** selected
and **From** set to the branch you have checked out, usually `main`.

In **What do you want to work on?**, type:

```markdown
Add a "Quick start" section to README.md that shows how to install and run this project. Base the commands on the project's real build files and scripts.
```

The dialog notes that ThinkRail will name the workspace and branch from your request. Click **Create**.

ThinkRail creates a git worktree on a new branch under `~/.thinkrail/worktrees/`, starts a chat in it,
and sends your message. The new workspace appears under your project in the **Projects** tool, and the
chat opens in the center with your message at the top. Your own checkout and branch are untouched.

### 7. Watch the agent work

The chat streams as the agent works. A status line reads "Thinking…", "Running read…", or "Writing…";
routine tool steps fold into compact activity groups you can expand.

Early on, the agent names the work. The workspace in the Projects tool and the top bar changes from
`workspace-1` to a short descriptive name, and the branch gets a matching slug. While the agent runs,
the workspace row shows a working badge, and the chat header shows token use and cost as `pi`
reports them.

> [!NOTE]
> If the agent needs a decision, it shows a card that reads "Your input is needed — the agent is
> waiting." Pick an option and click **Submit**. A card with several questions has a **Next →**
> button that leads to a **Review & submit** step, where **Submit** sends all your answers.

### 8. Steer the agent

While the agent is still working, type this in the message box:

```markdown
Keep the Quick start under ten lines.
```

The send button reads **Steer**. Press **Enter**. A **Steering:** row appears above the message box and
stays there until the agent picks the message up at its next step, so you don't have to wait for the
turn to end or stop it.

If the agent finished before you got here, press **Enter** anyway: the message goes out as a normal
message and the agent revises the section.

> [!TIP]
> **Cmd/Ctrl+Enter** queues a follow-up for after the agent finishes instead, and **Stop** ends the
> turn. See [Steer and queue messages](../how-to/steer-and-queue.md).

> [!NOTE]
> Screenshot to add: a streaming chat with the **Steer** button and a **Steering:** row above the
> message box.

## Review the change

### 9. Open the diff in Changes

When the agent finishes, its last message summarizes what it did. If you looked away, a green dot on
the workspace row tells you the result is waiting.

Open the **Changes** tool from the right rail. The scope reads **All changes**, and `README.md` is
listed with its `+N −M` line counts. Click it. A Changes review tab opens in the center with the diff
of the new section.

### 10. Leave a review comment and send it

Hover over a line in the new section and click **Comment on this line** in the gutter. In the box that
opens, type:

```markdown
Put the commands in a bash code block.
```

Click **Save draft**. The comment appears as a draft card on that line, and the review tab's toolbar
now shows **Send review (1)**. Click it.

ThinkRail sends the comment, with the quoted line and its context, to the chat as one structured
message. In the chat it appears as a compact card that reads "Sent 1 review comment on README.md". The
agent revises the file and can mark your comment resolved. The **Review** tool on the right tracks the
comment's status.

### 11. Keep the hunks you accept

Back in the review tab, which updates as the agent edits, read the revised diff. Click **Keep** on each
hunk you accept. When you keep the last hunk, the file is marked viewed and the bottom bar reads
"1 of 1 reviewed".

Keeping is your review state: it records that you read and accepted the change. If you disagree with a
hunk, **Revert hunk** undoes it in the worktree and **Ask agent about this hunk** starts a comment
anchored to it. See [Review changes](../how-to/review-changes.md).

> [!NOTE]
> Screenshot to add: the Changes review tab with a draft comment on a line and the **Send review (1)**
> button in the toolbar.

## Ship it

### 12. Ask the agent to commit

The change is still uncommitted in the workspace. Send this message in the chat:

```markdown
Commit this change with a short commit message.
```

The agent runs `git commit` in the workspace. The commit now appears under **Commits** in the
**Changes** scope menu.

### 13. Open the pull request

Open the **TODO List** tool from the right rail and click **Open the plan page**, the document icon next
to "Queue a task for the agent". A plan tab opens for this chat. Click **Open PR** in its header.

The **Open PR** dialog shows a **Title**, taken from the chat title, and a **Description** rendered from
the chat's plan, including a section that lists your commit. Edit either if you like, then click
**Open PR**.

ThinkRail pushes the branch to `origin` and creates the pull request against the branch you started
from. A "PR opened" message confirms it, and the pull request number appears next to the button.

If `gh` is not installed or not signed in, ThinkRail still pushes the branch and opens GitHub's compare
page in your browser with the title and description filled in; click **Create pull request** there. A
dialog explains how to set up `gh` so the next PR opens in one click. If the push itself can't
authenticate, a **Git push couldn't authenticate** dialog lists the commands that fix it. See
[Open a pull request](../how-to/open-a-pull-request.md).

Merge the pull request on GitHub when it is ready. ThinkRail has no merge button of its own; after the
pull request merges, the workspace moves to its project's **Settled** shelf on its own.

## What you built

- **An isolated workspace**: a git worktree on its own branch, with its own chat, changes, and
  terminal, while your checkout stayed as it was.
- **A reviewed change**: you steered the agent mid-turn, left an anchored comment that went back to the
  agent as structured context, and kept the hunks you accepted.
- **A pull request** whose title and description came from the chat, opened without leaving
  ThinkRail.

## Next steps

- [Run agents in parallel](parallel-workspaces.md) — try two approaches to one task and keep the
  better branch.
- [Set up a project for spec-first work](spec-first-project.md) — give the agent a spec graph to work
  from.
- [Work through a plan step by step](plan-and-review.md) — per-step commits, reviewer checks, and a PR
  body written from the plan.
- [Choose models and effort](../how-to/choose-models.md) and
  [Manage workspaces](../how-to/manage-workspaces.md) for everyday tasks.
- [How ThinkRail works](../explanation/how-thinkrail-works.md) and
  [Workspaces and isolation](../explanation/workspaces-and-isolation.md) for the ideas behind what you
  built here.
