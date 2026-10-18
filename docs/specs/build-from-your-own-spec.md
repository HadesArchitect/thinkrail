---
title: Build from your own spec
description: Add a spec you wrote to an existing repository, have the agent build against it, and keep the spec current as the code changes.
type: how-to
status: draft
---

You have a repository and a spec you wrote yourself. Give the spec a small frontmatter block, commit it,
name it in your first message, and the agent builds against it and amends it when the work changes what it
records. You do not have to run the interview-style setup.

## Before you begin

- A project open in ThinkRail (a local git repository) with a model connected. See
  [Make your first change](../get-started/first-change.md) if not.
- A Markdown file that states the intent: what to build, its boundaries, the decisions and why. A spec
  records intent the code cannot show, not a task list. See [Living specs](living-specs.md).

## Make your file a spec

1. Add a frontmatter block at the top of the file with an `id` and a `type`. A title is expected and a
   status is optional:

   ```markdown
   ---
   id: module-billing
   type: module-design
   status: active
   title: Billing service
   ---
   ```

   A Markdown file counts as a spec when its frontmatter has a non-empty `id` and `type`. The file name is
   free (`SPEC.md` beside the module is a convention), and any `.md` file under the project root counts.
   Files without both fields are ignored. The full schema, the five `type` values the tools create, and the
   link fields are in [Spec format](spec-format.md).
2. Link it into a graph if you have more than one spec. Set `parent` to the id of the spec above it, and
   use `depends-on`, `references`, or `implements` for cross-links. A single spec with no links is valid.
3. Keep it out of folders the scan skips: `node_modules`, `.git`, `dist`, `build`, and the `.claude`,
   `.superpowers`, `.gsd`, `.mockups`, and `.playwright-mcp` folders.
4. Commit it. An isolated workspace is a checkout of a branch, so a spec that exists only as an
   uncommitted file in your project folder is not in the new workspace.

> [!TIP]
> If you already keep design documents, adding frontmatter to them in place is enough. The content stays
> as it is.

## Point the agent at the spec

1. Create an isolated workspace with **Start building** on the project home, or **Cmd/Ctrl+N**. See
   [Manage workspaces](../workspaces/manage-workspaces.md#create-an-isolated-workspace). Choose **Start
   building**, not **Set up project**: **Set up project** is the interview path and is only offered when
   a project has no specs.
2. Open the **Specs** tool. Your spec appears in the tree, labeled by its title (or its `id` if there is
   no title). If it is missing, check the frontmatter and that the file is committed.
3. In the prompt, name the spec with `@` and say what you want. Typing `@` offers file paths; select the
   spec:

   ```markdown
   Implement the refund flow described in @services/billing/SPEC.md. The spec is approved, so don't
   re-interview me on what it already decides. Ask only about gaps it leaves open.
   ```

   You can skip the mention. The bundled `pi-spec-graph` package puts a rule in every chat that tells the
   agent to consult the owning spec when work touches a documented boundary, contract, or decision, and
   gives it `spec_grep`, `spec_get`, and `spec_graph` to find it. A mention is the reliable way to make it
   read yours first.

For a feature, behavior change, or bug fix, a routing rule sends the agent to the `brainstorming`
workflow, which orients in the spec graph, records a short temporary task-spec, builds, and then amends
the durable specs. Depth scales with the request, and a design in your request counts as approval of what
it covers. The steps are in [Built-in workflows](workflows.md#brainstorming). To force a workflow, start
the prompt with `/skill:brainstorming`.

## Review what the agent built

1. Open the **Changes** tool and read the diff against your spec. See
   [Review changes](../review/review-changes.md).
2. Send corrections as comments or in the chat. If the agent steps outside the spec, say which line it
   contradicts. A change that contradicts a spec is meant to be either wrong or a decision to change the
   spec, and the agent is told to surface which.

## Keep the spec current

The last step of the `brainstorming` workflow is to bring the durable specs in line with what was built,
so you usually do nothing extra:

1. After the change is built and verified, the agent edits the specs the change affects, top-down, writing
   each decision and its reason once in the spec that owns it. If nothing durable changed, it makes no
   edits.
2. It runs `spec_validate` to catch dangling links, duplicate ids, and parent cycles, and reports which
   specs changed in a line or two.
3. It deletes its temporary task-spec (`.thinkrail/context/TASK-<slug>.md`, which git ignores).

The spec edits land on the workspace branch, so they appear in **Changes** next to the code and ship in the
same pull request. Read them as you read code: the agent amends specs without asking you to approve each
edit.

To change a spec yourself, edit the file in your own editor or ask the agent. Files open read-only in
ThinkRail. The graph is re-read from disk on every call, so hand edits are picked up at once. See
[Open a workspace in your editor](../workspaces/open-in-your-editor.md).

If you want the spec to stay exactly as you wrote it, say so in the prompt ("don't edit the spec; tell me
what should change instead"). When a spec drifts from the code, set its `status` to `stale` so the next
reader knows.

## Tell other tools the project is spec-driven

The spec tools work without it, but a short section in the project's `AGENTS.md` makes the convention
portable to other agents: say the project is spec-driven and name the root and the nearest `SPEC.md` as the
place to start. See [Living specs](living-specs.md#specs-and-agentsmd).

## Check that it worked

- The **Specs** tool shows your spec, with its links in the tree.
- The agent's first messages show it reading your spec (a `spec_get` or a file read).
- After the run, **Changes** shows the spec edits, or the agent reports that no durable spec changed.

## Related

- [Living specs](living-specs.md)
- [Spec format](spec-format.md)
- [Built-in workflows](workflows.md)
- [Set up a project for spec-first work](spec-first-project.md), the interview-style alternative where the
  agent drafts the spec for you
- [Work through a plan step by step](plan-and-review.md)
