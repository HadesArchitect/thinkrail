---
title: Glossary
description: Definitions of the terms ThinkRail's docs and interface use, with links to the page that covers each one.
type: reference
status: complete
---

The terms below are the ones ThinkRail's docs use consistently. Each entry links to the page that covers
the idea in depth.

**Alias skill.** A skill that another agent's folder provides, such as `.claude/skills` or
`.github/skills`, and that ThinkRail reads in place. Project-level alias skills load only after you trust
the project. See [Use existing skills](../how-to/use-existing-skills.md).

**Background command.** A long-running, non-interactive shell command that a chat starts with the
`background_command` tool and that keeps running without holding the agent's turn. See
[Agent tools](agent-tools.md#background-command-tool).

**Chat.** One conversation with the agent inside a workspace, backed by a `pi` session. A workspace can
hold several chats at once, each with its own model, effort, and cost. See
[Steer and queue messages](../how-to/steer-and-queue.md).

**Concept skill.** A workflow skill that carries norms shared by several workflows, such as how to ask
questions or how to write a spec, rather than steps to run. See [Workflows](workflows.md#concept-skills).

**Data directory.** The folder where ThinkRail keeps its own state: `~/.thinkrail` by default, or the path
in `THINKRAIL_DATA_DIR`. Provider credentials, chat transcripts, and MCP tokens stay in `pi`'s folders
instead. See [Files and environment](files-and-environment.md).

**Default workspace.** The built-in workspace whose folder is the project folder itself, with no worktree
and no isolation. You enter it explicitly through **Work in project folder**; it cannot be renamed,
removed, or settled. See
[Workspaces and isolation](../explanation/workspaces-and-isolation.md#the-default-workspace-is-an-explicit-choice).

**Exposure.** How an MCP server's tools reach the model: `deferred` (loaded through tool search),
`direct` (declared up front), or `hidden` (unreachable). See
[MCP configuration](mcp-configuration.md#tool-exposure).

**External workspace.** An existing git worktree that you attach to a project. ThinkRail can forget it but
never changes or deletes it. See
[Workspaces and isolation](../explanation/workspaces-and-isolation.md#attached-worktrees).

**Follow-up.** A message you queue while the agent is working so that it is delivered after the current
run finishes. Compare with **steer**. See [Steer and queue messages](../how-to/steer-and-queue.md).

**Host.** The ThinkRail engine process. It runs `pi` in-process, owns projects and workspaces, and serves
the web app over HTTP and WebSocket. The desktop app and the `thinkrail` command both start it. See
[How ThinkRail works](../explanation/how-thinkrail-works.md).

**Isolated workspace.** A workspace that ThinkRail creates as a new git worktree with its own branch, so
the agent's changes stay off your base branch until you merge them. This is the default kind. See
[Manage workspaces](../how-to/manage-workspaces.md).

**Launcher.** A thin entry point that starts the host: the `thinkrail` command opens a browser tab, and
the desktop app opens a native window. Neither contains engine logic. See
[How ThinkRail works](../explanation/how-thinkrail-works.md#two-launchers-one-app).

**Loose item.** An item in the TODO plan that belongs to no group: a raw note that you or the agent add
to a shared queue at the end of the plan. The agent promotes it to a group before working on it. See
[Agent tools](agent-tools.md#todo_promote).

**MCP override.** A project `mcp.json` entry with no `command`, `url`, or `type` that changes only the
enabled state or exposure of a user-level server. See [MCP configuration](mcp-configuration.md#configuration-files).

**MCP server.** A Model Context Protocol server that gives the agent extra tools, configured in
`mcp.json` and managed in **Settings → MCP servers**. See [MCP configuration](mcp-configuration.md).

**Open PR.** The built-in action that pushes a workspace's branch and creates or updates its pull request
on GitHub through the `gh` CLI, with a body rendered from the plan. See
[Open a pull request](../how-to/open-a-pull-request.md).

**Per-entry approval.** Your confirmation of one server that a repository defines in `.pi/mcp.json`. It is
tied to a fingerprint of the entry and lapses when the entry changes. See
[MCP configuration](mcp-configuration.md#repository-defined-servers-and-approval).

**`pi`.** The open-source coding-agent engine that ThinkRail runs in-process. `pi` owns models, skills,
compaction, cost, and session state. See [ThinkRail and pi](../explanation/thinkrail-and-pi.md).

**Plan.** The chat's shared TODO plan: groups of steps plus a loose queue, shown in the **TODO List** rail
and on the plan page. The agent updates step status; you can add and remove items. See
[Agent tools](agent-tools.md#todo-plan-tools).

**Plan review.** An independent, read-only reviewer subagent's verdict on a completed plan step, either
`approve` or `request_changes`, with findings filed as review comments. See
[Agent tools](agent-tools.md#request_review) and [Review changes](../how-to/review-changes.md).

**Portable pi package.** A package published to npm as `@thinkrail/pi-<name>` that works in plain `pi`
without ThinkRail. `@thinkrail/pi-visualize` is the one published today. See
[Extensions](../explanation/extensions.md#portable-pi-packages).

**Project.** A git repository that you have registered with ThinkRail. Workspaces, trust, and MCP
approvals belong to a project. See [Workspaces and isolation](../explanation/workspaces-and-isolation.md).

**Project trust.** Your per-project consent for ThinkRail to load what a repository supplies: alias skills,
`pi`'s `.pi/` resources, and project MCP servers. MCP servers additionally need per-entry approval. See
[Trust model](../explanation/trust-model.md) and [Trust a project](../how-to/trust-a-project.md).

**Provider.** A source of models, such as an API key, a subscription login, or JetBrains AI. Sign-in is
handled by `pi`. See [Connect a model provider](../how-to/connect-a-provider.md).

**Resources.** A per-chat view that lists the background commands, subagents, and MCP servers a chat
owns, with controls to inspect and stop them. See [Agent tools](agent-tools.md#background-command-tool).

**Review comment.** A note anchored to a file or diff in the local review, sent to a chat as structured
context. The agent marks it resolved with `resolve_comment`. See
[Review changes](../how-to/review-changes.md).

**Router skill.** The workflow skill that classifies new work and names the workflow to follow. The root
router is `choosing-a-workflow`. See [Workflows](workflows.md#router).

**Settled shelf.** A per-project shelf where finished or quiet workspaces move: automatically after the
pull request merges or closes, or after a week of inactivity by default, or manually. Real work brings a
workspace back. See
[Workspaces and isolation](../explanation/workspaces-and-isolation.md#the-settled-shelf).

**Skill.** A `SKILL.md` file that `pi` loads to teach the agent a procedure or a body of knowledge. Run
one directly with `/skill:<name>`. See [Use existing skills](../how-to/use-existing-skills.md).

**Spec.** A Markdown file whose frontmatter has an `id` and a `type`, recording a project's intent,
decisions, and boundaries. See [Spec format](spec-format.md).

**Spec graph.** The graph that spec frontmatter defines: a `parent` tree plus `depends-on`, `references`,
and `implements` links. See [Spec format](spec-format.md#how-the-graph-is-built).

**Spec-first.** Working so that a spec leads the code: a change that alters a boundary, contract, or
decision updates the spec in the same change. See [Living specs](../explanation/living-specs.md).

**Steer.** To send a message into a turn that is already running, so the agent sees it mid-run instead of
after it finishes. Compare with **follow-up**. See [Steer and queue messages](../how-to/steer-and-queue.md).

**Step commit.** The commit the host makes on your branch when a plan step is marked done, containing
only that step's changes, using the agent's `commitSubject`. See
[Agent tools](agent-tools.md#todo_update).

**Subagent.** A hidden child `pi` session that the `Agent` tool starts to do one task in its own context
window. Built-in roles are `scout`, `planner`, `worker`, and `reviewer`. See
[Agent tools](agent-tools.md#subagent-tools) and [Delegate to subagents](../how-to/delegate-to-subagents.md).

**Task-spec.** A temporary spec of type `task-spec` that records the design for one piece of work in the
gitignored `.thinkrail/context/` folder and is deleted when the work lands. See
[Spec format](spec-format.md#types).

**ThinkRail extension.** A package built into ThinkRail that pairs a `pi` capability with a server half and
a web half, such as `visualize`. Turn one off in **Settings → Extensions**. There is no public extension
API yet. See [Extensions](../explanation/extensions.md#thinkrail-extensions).

**Tool renderer.** The interface component that presents one tool's call and result in a chat. Tools
without a registered renderer use a default one. See [Extensions](../explanation/extensions.md).

**Wikilink.** The `[[spec-id]]` notation in ThinkRail's own spec prose. It is a writing convention; no
tool parses it. See [Spec format](spec-format.md#wikilinks).

**Workbench.** The layout of editor, diff, chat, and terminal tabs plus side and bottom panels. Its layout
is local to each browser window. See [How ThinkRail works](../explanation/how-thinkrail-works.md).

**Worker skill.** A workflow skill that carries out the steps of one workflow, such as `brainstorming` or
`shipping-a-pr`. See [Workflows](workflows.md).

**Workflow.** A repeatable way of running a piece of work, written as one or more skills. See
[Workflows](workflows.md).

**Workspace.** A unit of work inside a project. By default it is a git worktree with its own branch,
holding chats, files, and terminals. See
[Workspaces and isolation](../explanation/workspaces-and-isolation.md).

**Worktree.** A git feature that checks out another branch of the same repository into its own folder.
ThinkRail creates one per isolated workspace under `~/.thinkrail/worktrees`. See
[Workspaces and isolation](../explanation/workspaces-and-isolation.md#a-workspace-is-a-worktree).

