---
title: Set up a project for spec-first work
description: Start an empty project with the Set up project workflow, let the agent draft its goal spec, then watch it amend the specs as it builds a first feature.
type: tutorial
status: draft
---

In this tutorial you start a small command-line habit tracker from an empty folder. The agent interviews
you, writes the project's root spec, and then designs and builds a first feature, updating the specs as
it goes. You finish with a repository whose **Specs** tool shows a spec graph rooted in your product
goal.

Before you start, make sure you have:

- **About 30 minutes.** Most of it is answering the agent's questions.
- **ThinkRail installed and a model provider connected.** If you haven't done that yet, follow
  [Make your first change](../get-started/first-change.md) through step 4.
- **`git` on your PATH.**

> [!TIP]
> The same workflow also works on an existing codebase without specs: the agent reads the code first and
> drafts a goal, an architecture, and one spec per module. This tutorial uses an empty folder so the
> path is the same for everyone. If you already have a spec of your own, see
> [Build from your own spec](build-from-your-own-spec.md).

## Create the project

### 1. Make an empty folder

In a terminal, create a folder for the project. On macOS or Linux:

```bash
mkdir -p ~/code/habit-tracker
```

On Windows, in PowerShell:

```powershell
mkdir ~\code\habit-tracker
```

You don't need to run `git init`; ThinkRail offers to do it in the next step.

### 2. Open the folder in ThinkRail

In the **Projects** tool, click **Add project** (the `+` button) and choose **Open project**. Pick the
`habit-tracker` folder.

ThinkRail asks **Initialize a git repository?** because the folder isn't one yet. Click
**Initialize & open**. ThinkRail runs `git init` and makes an empty first commit so it can create
worktrees from it.

The project home opens. Because the repository has no specs, the first card is **Set up project**,
tagged `spec-first`.

## Draft the goal with the agent

### 3. Start the Set up project workflow

Click **Set up project**. The **Create workspace** dialog opens with **Isolated workspace** selected and
the message box already holding `/skill:setting-up-a-project `. A note under it explains that the agent
drafts your project's specs, starting from its goal, before building.

After the prefilled text, type your idea:

```markdown
A command-line habit tracker. I log the habits I did each day and see my current streaks.
```

Click **Create**.

The chat opens with your message shown as a collapsed skill card for `setting-up-a-project`. The agent
checks the workspace with its spec tools, finds an empty repository with no specs, and switches to the
`starting-a-new-project` workflow. It tells you it will settle the goal and scope first and save them
as `goal-and-requirements.md`.

### 4. Answer the interview

The agent proposes answers instead of asking open questions, and checks them with you on question
cards. Each card reads "Your input is needed — the agent is waiting." and offers two to four options,
sometimes with one marked as recommended.

For each question, pick the option that fits, or type your own answer in the free-text option. When a
card has several questions, click **Next →** to move through them, then click **Submit** on the
**Review & submit** step.

As soon as the first section is settled, the agent creates `goal-and-requirements.md` and adds each
section you confirm. For a personal tool like this one, expect a short document: an overview, the
problem, the capabilities the tool is useless without, and tech notes once you pick a stack.

> [!NOTE]
> Screenshot to add: a question card in the chat during the goal interview.

### 5. Approve the draft

The agent offers to research similar existing tools on the web and add an **Alternatives Considered**
section. Accept or decline; either is fine for this tutorial.

It then shows you the full draft. Confirm it, and the agent changes the spec's `status` from `draft` to
`active`. It ends the workflow by suggesting the next step: an architecture sketch, then features
built one at a time.

## See the spec in the Specs tool

### 6. Open the Specs tool

Open the **Specs** tool from the right rail. The tree has one row, your product goal, tagged
**Main spec**. Click it to preview the document in the center; double-click to keep the tab open.

The file starts with frontmatter that makes it a spec. Yours will look something like this:

```yaml
---
id: habit-tracker
type: goal-and-requirements
status: active
title: Habit Tracker
---
```

A Markdown file is a spec when its frontmatter has an `id` and a `type`; the Specs tool builds its tree
from those fields and their links. Files in ThinkRail open read-only, so you change a spec by asking
the agent or in your own editor. See [Spec format](spec-format.md).

> [!NOTE]
> Screenshot to add: the Specs tool showing the goal spec tagged **Main spec**, with its preview open
> in the center.

## Grow the specs with a design conversation

### 7. Ask for the first feature

In the same chat, send:

```markdown
Let's build the first feature: log that I did a habit today, from the command line.
```

This changes what the product does, so the agent follows the `brainstorming` workflow: it designs the
change with you before writing any code. It reads the goal spec first, then opens a temporary task spec
at `.thinkrail/context/TASK-<slug>.md` in the workspace. That file is gitignored scratch, and it may
show up in the Specs tool with a **TASK** tag while the design is in progress.

### 8. Settle the design

The agent interviews you in two phases, again on question cards:

- **Product.** What you see and do: the command you type, what it prints, and what happens on edge
  cases such as logging the same habit twice in one day.
- **Technical.** The decisions the product answers leave open, such as the language and where the data
  is stored, with any alternative it rejected and why.

It records the answers in the task spec, then presents one design and asks you to approve it. Approve
it, or tell the agent what to change and approve the revised version.

### 9. Watch the build and the spec amendments

The agent implements the design. When the build is done, it brings the durable specs in line with what
it built, top-down: it updates `goal-and-requirements.md` if a capability changed, adds an
`architecture.md` or a module `SPEC.md` when the code now has real structure to describe, and runs
`spec_validate` to check the links. It reports which specs changed in a line or two and deletes the
task spec.

The Specs tool refreshes as the files change: the **TASK** row disappears and any new specs appear under
the goal.

### 10. Review the result in Changes

Open the **Changes** tool. Under **All changes** you see the new code next to the new and amended specs,
all on the workspace's own branch. Click a spec to read its diff in the Changes review tab, and
comment on lines the same way as in [Make your first change](../get-started/first-change.md#10-leave-a-review-comment-and-send-it).

Nothing reaches your default branch until you merge the workspace branch yourself, through a pull
request or with `git`.

## What you built

- **A spec-first repository**: a `goal-and-requirements.md` root spec, written from a short interview
  and approved by you.
- **A first feature with matching specs**: designed in a task spec, built, and reflected back in the
  durable specs before the agent handed off.
- **A Specs tree** that shows the graph and updates as the agent changes it.

## Next steps

- [Living specs](living-specs.md) — why specs live beside the code and how the agent keeps
  them current.
- [Spec format](spec-format.md) — every frontmatter field, type, and status.
- [Built-in workflows](workflows.md) — the bundled workflows and when each one runs.
- [Open a pull request](../review/open-a-pull-request.md) — once the folder has a GitHub remote.
- [Work through a plan step by step](plan-and-review.md) — build the next features as reviewed,
  per-step commits.

> [!WARNING]
> Unverified: the exact questions, the shape of the goal document, and which specs the agent amends in
> step 9 depend on the model and your answers. The task spec's visibility in the Specs tool while the
> design is in progress has not been confirmed in a running app.
