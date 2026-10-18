---
title: Work through a plan step by step
description: Have the agent plan a multi-step change, follow it in the TODO List, get one commit and one reviewer check per step, and ship the plan as a PR.
type: tutorial
status: outline
---

In this tutorial you give the agent a change big enough to need a plan, follow the plan as the agent
works through it, check each finished step with an independent reviewer agent, and open a pull request
whose description is written from the plan. You finish with a branch that has one commit per step and a
review trail you can show your team.

## Before you begin

- Time needed (estimate: about 30 minutes) and prerequisites as a short list: ThinkRail installed, a
  provider connected, a GitHub project open, and [Make your first change](first-change.md) completed.
- Use an isolated workspace, not **Work in project folder**: per-step commits are skipped while the
  folder has uncommitted work of its own (commit gate "no foreign dirt").
- Pick one concrete multi-step task for the sample repository (three to seven steps, so the agent makes
  one task group).
- Sources: `packages/server/src/todos/SPEC.md` (commit gate), `packages/pi-todos/skills/todos/SKILL.md`
  (granularity table).

## Ask for a plan

- There is no separate plan mode. The agent keeps a plan when you ask for one, or on its own when the
  work needs at least three substantive steps (`todos` skill trigger).
- Prompt wording that asks for a plan explicitly, so the tutorial path is deterministic.
- What you see: the agent calls `todo_write`; one group (the task, titled by outcome) with steps (title
  and status `pending` → `in_progress` → `done`; one step in progress at a time).
- Sources: `packages/pi-todos/skills/todos/SKILL.md`, `packages/pi-todos/tools/SPEC.md`.

## Follow the plan in the TODO List

- Open the **TODO List** tool from the right rail: the in-progress task on top, **Up next**, then
  **Done** with finished tasks collapsed; status glyphs, a `user` badge on items you added, an
  "N files" chip on steps with a change set.
- Glance states: working, waiting for your answer, paused.
- Add a loose item with the "Queue a task for the agent" row while the agent runs: it queues, and the
  agent picks it up after the current work. When idle, adding an item nudges the agent to start.
- Remove a not-yet-done item with its hover **Remove**; done items stay.
- Sources: `apps/web/src/panels/PlanRailPane.tsx`, `apps/web/src/chat/TodoList.tsx`,
  `apps/web/src/panels/SPEC.md`.

## Open the plan page

- **Open the plan page** button (document icon) opens a `Plan · <chat title>` tab in the center.
- Sections: the **Now** block with a status chip and the agent's latest message or pending question,
  answerable in place; a steer/message box; **+ Task** to add a task; **Done** with completed groups.
- Notices for commits or uncommitted changes that no step claims ("review them too").
- Screenshot placeholder: the plan page mid-run with the **Now** block.
- Sources: `apps/web/src/panels/PlanPane.tsx`, `apps/web/src/chat/useChatTodos.ts`.

## See one commit per step

- When a step goes `in_progress`, the host records a baseline; when it goes `done`, the host commits
  exactly that step's changes on your branch, with your git identity and the agent's `commitSubject`
  (fallback: the step title) as the message.
- The commit gate: a baseline exists, no foreign uncommitted changes, the window was not shared with
  another chat, and the change is not empty. Otherwise no commit is made and the Changes path list
  stands in.
- Commits made inside the window by others (for example a subagent) are adopted as that step's
  commits. A re-opened step appends a new commit.
- What you see: the done step's short sha and `N files · +A −R`; the "N files" chip opens Changes at
  that commit; the **Commits** list in the Changes scope menu.
- Sources: `packages/server/src/todos/SPEC.md`, `packages/server/src/todos/baselines.ts`.

## Promote a loose item into its own task

- Add a follow-up idea as a loose item from the TODO List while the agent works on the first task.
- When the agent takes it into work, it calls `todo_promote`: the loose item becomes its own group in
  one atomic step, keeping its id and your wording as the title.
- What you see: the item leaves the loose queue and appears as a task with its own steps.
- Sources: `packages/pi-todos/tools/promote.ts`, `packages/pi-todos/skills/todos/SKILL.md`.

## Check each step with the reviewer

- **Check it** on a done step runs a hidden, read-only reviewer subagent; row states "Checking…",
  "Needs a fix", or a verified glyph. **Check All** (plan actions menu) reviews every unsettled step one
  at a time; one review at a time per plan.
- Findings are filed in the **Review** tool as agent-authored comments, marked as filed by ThinkRail's
  reviewer agent; a reading guide can appear in the Changes review tab.
- With **Settings → Models → Review → Automatic fix cycle** off (the default), findings wait for you;
  turned on, the host sends them to the worker chat once and re-reviews. **Review model** sets the
  reviewer's model and effort. **Agent-triggered review** (off by default) lets the agent call
  `request_review` itself.
- Screenshot placeholder: a done step showing "Needs a fix" with its finding in the Review tool.
- Sources: `apps/web/src/panels/PlanPane.tsx`, `packages/server/src/todos/reviews.ts`,
  `apps/web/src/panels/ModelsSettings.tsx`, `packages/server/src/agent/requestReviewTool.ts`.

## Ship the plan as a pull request

- After the last step, the agent writes a cumulative summary with `todo_plan_summary`, shaped like a PR
  body: `## Summary`, `## Changes`, `## Testing`.
- The banner "All steps are done and reviewed — ready to ship." appears when every step is done and
  reviewed with no open findings.
- **Open PR** (or **Open draft PR** in the plan actions menu) opens the compose dialog: the description
  is the plan summary plus the steps with their shas and verification, the review trail, and any
  "Committed outside the plan" section.
- After the PR exists, the button becomes **Push updates (N)**; pushing refreshes the PR description
  from the plan. **Branch diverged** offers a command to integrate the remote first.
- Sources: `packages/server/src/pr/SPEC.md`, `packages/server/src/pr/prBody.ts`,
  `apps/web/src/panels/PrComposeDialog.tsx`, `packages/pi-todos/tools/planSummary.ts`.

## What you built

- A branch with one commit per plan step, each checked by a reviewer agent, and a PR whose body tells
  the story of the plan.

## Next steps

- Links: [Review changes](../how-to/review-changes.md), [Open a pull request](../how-to/open-a-pull-request.md),
  [Delegate to subagents](../how-to/delegate-to-subagents.md), [Settings](../reference/settings.md),
  [Agent tools](../reference/agent-tools.md).

> [!NOTE]
> This page is an outline. It shows the planned structure and the facts it will cover.
