---
title: Review changes
description: Review an agent's work in the Changes tab, triage hunks, leave anchored comments, and send them back to a chat as structured context.
type: how-to
status: draft
---

Use the Changes review tab to read everything the agent changed in a workspace, mark what you accept,
and send the rest back as anchored comments. Review is local: it does not talk to GitHub.

## Before you begin

- A workspace with changes to look at. See [Manage workspaces](../workspaces/manage-workspaces.md).
- A chat in that workspace, if you want to send comments back. Comments stay drafts until you send them.

## Open the review tab

1. Open the **Changes** tool. Its scope pill (**Diff scope**) chooses what you review:
   **All changes** (work since the branch diverged from its target), **Uncommitted changes**,
   **Last turn**, a single entry under **Agent turns**, or a commit.
2. Click a file row. The scope's review tab opens with every changed file as a section in one scrolling
   surface. Double-click a row, or choose **Open as tab** from its menu, for a single-file diff tab.

You can also start from the chat. A finished turn ends with a divider such as **3 files changed · +42 −7**
and a **Review turn** chip that opens the review tab for exactly that turn.

> [!NOTE]
> **Agent turns** and commits are frozen snapshots and read-only: you can read and comment, but not keep or
> revert.

## Triage hunks

1. On any hunk, select **Keep** to mark it reviewed. The section header counts `k/n kept`; keeping the
   last hunk marks the file viewed.
2. Select **Revert hunk** to undo that hunk in the worktree. A toast offers **Undo**. **Revert file**
   in the section header does the same for a whole file. Reverting an added file moves it to the OS
   trash, so it stays recoverable. There is no revert-everything action; see [Undo or discard changes](undo-or-discard-changes.md).
3. Select **Ask agent about this hunk** to open a comment composer anchored to the hunk.

The bar at the bottom shows `n of N reviewed` with a progress bar.

- **Next unreviewed** (**J**) jumps to the next file you have not viewed.
- **Mark all viewed** marks every remaining file.
- **V** toggles the current file as viewed and advances.
- **Alt+Down** and **Alt+Up** move between files.

Shortcuts work when the review tab is the focused center tab and no text field or menu has focus.

Large diffs open collapsed. A file over 400 changed lines, or a lock or generated file, starts folded.
Over 50 files you are offered **One file** mode, and over 2,000 changed lines the tab waits behind
**Show diff anyway**.

## Follow the review guide

When the plan reviewer has run on the plan's steps, a **Review guide · agent** rail appears beside the diff
(not on phone-sized viewports). It shows a verdict, a **Suggested reading order**, and findings.

1. Select **Start**, then **Next** to walk the steps. **N** and **P** do the same from the keyboard.
2. On a finding, select **Fix this one** to send it to the agent, or **Apply fixes** to send every open
   finding.

## Leave a comment

1. Select lines in a file or diff and click the comment icon (**Comment on this line**). In rendered
   Markdown, select text and click **Comment on selection**. On an image or SVG, use **Comment on this
   image** to pin a region. Notebooks comment per cell.
2. Type in the composer (**Leave a review comment…**), then choose **Save draft** (**Cmd/Ctrl+Enter**),
   **Send now**, or **Cancel** (**Esc**).

Each comment records its path, which side of the diff it sits on, and a quote of the text. If the file
changes later, the comment re-anchors itself; one that cannot be found again is marked outdated, keeps its
snapshot, and can still be sent.

Drafts collect in the **Review** tool, grouped by file, with a count badge. **Mark resolved** closes a
comment by hand.

## Send comments to a chat

1. In the review tab, select **Send review (N)**, or in the **Review** tool select **Send all (N)**.
2. ThinkRail builds one structured message per file, with a stable id, the quoted text, and an outdated
   flag for each comment. It sends to your last open chat, or to a review chat it creates for that file
   and reuses for the rest of the review.
3. The chat shows a compact card: **Sent N review comments on `<file>`**.

The agent can answer by calling `resolve_comment`, which resolves a comment only in the chat that received
it. Sent comments are never deleted. When a file's comments are all resolved, select **Done — finish this
file's review**; **Clear review** archives sent comments, discards unsent drafts, and starts fresh.

## Check that it worked

- The progress bar reaches `N of N reviewed`.
- Sent comments leave the draft count and show as sent in the **Review** tool.
- A resolved comment shows as resolved after the agent calls `resolve_comment`.

## Related

- [Open a pull request](open-a-pull-request.md)
- [Steer and queue messages](../agent/steer-and-queue.md)
- [Keyboard shortcuts](../reference/keyboard-shortcuts.md)
- [Plan and review tutorial](../specs/plan-and-review.md)
