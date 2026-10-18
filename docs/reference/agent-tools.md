---
title: Agent tools
description: Every tool ThinkRail adds to a pi session, with parameters, behavior, and the packages that provide them.
type: reference
status: complete
---

ThinkRail runs `pi` in-process and adds a fixed set of tools to every chat on top of the tools `pi`
ships. This page lists those additions: name, purpose, parameters, and notes. For how the pieces fit
together, read [ThinkRail and pi](../explanation/thinkrail-and-pi.md).

## What is and is not listed here

`pi` owns its built-in tools (`read`, `bash`, `edit`, `write`, `grep`, `find`, `ls`, and the rest) and its
MCP tools. They are not documented on this page; see the [`pi` documentation](https://pi.dev).
Tools from MCP servers are named `mcp__<server>__<tool>` and are covered in
[MCP configuration](mcp-configuration.md).

Parameter types follow the tool schemas the model sees. A parameter marked **Required: no** may be
omitted.

| Group | Tools | Provided by | Availability |
| --- | --- | --- | --- |
| [Spec graph](#spec-graph-tools) | `spec_grep`, `spec_get`, `spec_graph`, `spec_create`, `spec_update`, `spec_delete`, `spec_validate` | `pi-spec-graph` | Always on |
| [TODO plan](#todo-plan-tools) | `todo_list`, `todo_add`, `todo_update`, `todo_promote`, `todo_remove`, `todo_write`, `todo_plan_summary` | `pi-todos` | Always on |
| [Subagents](#subagent-tools) | `Agent`, `get_subagent_result` | `pi-subagents` | On unless subagents are turned off |
| [Background commands](#background-command-tool) | `background_command` | `pi-background-commands` | Always on |
| [Host tools](#host-tools) | `ask_user_question`, `set_title`, `resolve_comment`, `request_review` | ThinkRail host | `request_review` is opt-in; the rest are always on |
| [Web research](#web-research-tools) | `web_search`, `fetch_content`, `get_search_content` | `pi-web-access` | Always on |
| [Visualize](#visualize-tool) | `visualize` | ThinkRail extension | On unless turned off in **Settings → Extensions** |

> [!NOTE]
> ThinkRail adds no confirmation prompt to the tools on this page. The only calls it gates are MCP tool
> calls that do not declare `readOnlyHint`; see [MCP configuration](mcp-configuration.md#call-confirmation).
> Whether `pi`'s own tools ask first is `pi`'s decision.

## Spec graph tools

Provided by the `pi-spec-graph` package. The tools read and manage the project's
[spec graph](spec-format.md). An always-on system prompt rule tells the agent to consult the owning spec
when work touches a documented boundary, contract, invariant, behavior, or architecture decision. The tools
manage frontmatter and structure only; the agent edits spec prose with `pi`'s `write` and `edit`.

The index is refreshed from disk on every call (changed files are re-read), so specs changed by hand or
by another tool are always current. Paths are relative to the working directory of the chat (the workspace root).

### `spec_grep`

Search the text of spec files, optionally narrowed by metadata. Returns `path:line: snippet` matches.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `pattern` | string | yes | Substring, or a regular expression when `regex` is true. |
| `regex` | boolean | no | Treat `pattern` as a regular expression. Default: substring. |
| `ignoreCase` | boolean | no | Case-insensitive match. Default: `true`. |
| `type` | string | no | Only search specs whose `type` equals this value. |
| `tag` | string | no | Only search specs that carry this tag. |
| `parent` | string | no | Only search specs whose `parent` is this id. |
| `dependsOn` | string | no | Only search specs whose `depends-on` list contains this id. |
| `limit` | number | no | Maximum matches to return. Default: 200. |

An invalid regular expression returns an error result. Matching is per line; there is no semantic search.

### `spec_get`

Look up one spec by id. Returns its frontmatter, file path, resolved forward links, and reverse links
(specs that point at it) across `parent`, `depends-on`, `references`, and `implements`. A link whose target
does not exist is marked `(missing)`. The result has no prose body; read the body with `read` using the
returned path.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | The spec id to look up. |

### `spec_graph`

Return a bounded slice of the graph around one spec.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `root` | string | yes | Id of the spec to start from. |
| `direction` | `subtree` \| `ancestors` \| `neighbors` | yes | `subtree` walks down the `parent` tree, `ancestors` walks up to the root, `neighbors` crosses one edge kind and its reverse. |
| `depth` | number | no | How many hops to expand. Default: 1. |
| `edge` | `parent` \| `depends-on` \| `references` \| `implements` | no | For `neighbors` only: which edge kind to cross. Default: `depends-on`. |

### `spec_create`

Create a spec file with scaffolded frontmatter and a heading-only body chosen by `type`. The scaffold
headings are Responsibility and Boundary for module and submodule specs; Drivers, Decisions, Invariants,
and Out of scope for architecture specs; Goal and Scope for goal specs; Purpose and Open items for
task-specs.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `path` | string | yes | Path relative to the project root, ending in `.md` (for example `src/foo/SPEC.md`). |
| `id` | string | yes | Unique spec id. |
| `type` | enum | yes | `goal-and-requirements`, `architecture-design`, `module-design`, `submodule-design`, or `task-spec`. |
| `title` | string | yes | Human-readable title. |
| `status` | enum | no | `draft`, `active`, `stale`, `done`, or `deprecated`. |
| `parent` | string | no | Id of the parent spec. |
| `dependsOn` | string[] | no | Ids for the `depends-on` list. |
| `references` | string[] | no | Ids for the `references` list. |
| `implements` | string[] | no | Ids for the `implements` list. |
| `covers` | string[] | no | Free-form coverage ids. |
| `tags` | string[] | no | Tags. |

The call fails if the file exists, the id is already in use, or the path cannot be indexed. See
[Spec tooling limits](spec-format.md#spec-tooling-limits) for the path rules.

### `spec_update`

Edit a spec's frontmatter in place. Existing field order, comments, nested fields, and line endings are
kept; the body is never touched. The `id` cannot be renamed and `id` and `type` cannot be removed.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Id of the spec to update. |
| `set` | object (string values) | no | Scalar fields to set or overwrite, such as `title`, `status`, or `parent`. List fields are rejected here. |
| `remove` | string[] | no | Frontmatter field names to delete. |
| `addList` | object | no | Entries to add to list fields. Keys: `depends-on`, `references`, `implements`, `covers`, `tags`; each value is a string array. Duplicates are not added. |
| `removeList` | object | no | Entries to remove from the same list fields. A list left empty is deleted. |

### `spec_delete`

Delete a spec file by id. Other specs that link to it are not edited; run `spec_validate` afterward.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Id of the spec to delete. |

### `spec_validate`

Report structural problems in the graph: links whose target does not exist (for `parent`, `depends-on`,
`references`, and `implements`), duplicate ids, and cycles in the `parent` chain. Takes no parameters.

## TODO plan tools

Provided by the `pi-todos` package. The tools read and write the chat's shared plan, which you see in the
**TODO List** rail and on the plan page. The plan is stored per chat at
`.thinkrail/context/todos/<chat id>.json` inside the workspace, in the gitignored `.thinkrail/context/`
folder, so it is scratch state and not committed.

A plan has **groups** (one task, titled by outcome) that contain ordered **steps**, plus a **loose queue**
at the end for raw items that either side can add. A step is `pending`, `in_progress`, or `done`. Exactly
one step is `in_progress`: setting a step to `in_progress` returns any other to `pending` and the result
says it was paused. A group's status is derived from its steps and never stored. Most results end with a
short reminder line, such as "nothing is in_progress" or a prompt to write the plan summary once every item
is done.

An always-on rule tells the agent the list exists, that a pending loose item is promoted into its own
group when the agent takes it into work, and that a plan is created when you ask for one or the work needs
at least three substantive steps.

### `todo_list`

Read the plan. The agent re-reads it before choosing each next step because you can edit it at any time.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `pending` \| `in_progress` \| `done` | no | Return only items with this status. Omit for the whole plan. |

### `todo_add`

Add one item without touching the rest of the plan.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | string | yes | One-line step title: imperative and about the outcome. |
| `group` | string | no | Title of the group to append to. The group is created if it does not exist. |
| `after` | string | no | Id of an existing step to insert after. Overrides `group`. Must be a step inside a group; an id of a loose item is rejected. |
| `note` | string | no | Short secondary line for agent-facing detail. |

With neither `group` nor `after`, the item goes into the loose queue.

### `todo_update`

Change one item. This is how the agent marks progress.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Id of the item. |
| `status` | `pending` \| `in_progress` \| `done` | no | New status. Done items stay in the plan as history. |
| `title` | string | no | New title. |
| `note` | string | no | New note. An empty string clears it. |
| `summary` | string | no | Completion summary in Markdown, set together with `status` `done`. An empty string clears it. |
| `verification` | string | no | Checks that were run, each as `check → result`, or `not verified`. An empty string clears it. |
| `commitSubject` | string | no | One-line commit subject for the step's code changes, set together with `status` `done`. An empty string clears it. |

When a step with changes goes to `done`, the host commits that step's delta under `commitSubject`, falling
back to the step title. The host only commits when its safety conditions hold (a recorded baseline, no
unrelated changes already in the tree, an unshared window, and a non-empty delta); otherwise it skips the
commit. Marking the last open item done prompts the agent to call `todo_plan_summary`.

### `todo_promote`

Turn a loose item into a group of its own in one step. The group keeps the loose item's id and title unless
`title` is given.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Id of a loose item. A step that is already inside a group is rejected. |
| `title` | string | no | Title for the new group instead of the loose item's own. |

The call fails when the id is unknown, the resolved title is empty, or a group with that title already
exists.

### `todo_remove`

Delete an item by id. The agent uses it only when you ask to drop an item, because finished items are
marked done rather than removed.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Id of the item to remove. |

### `todo_write`

Lay out or reconcile the plan from groups. Steps are matched to existing steps by group title plus step
title and keep their status, summary, and id, so repeating the call is safe. A `status` passed for an
existing step is ignored. Steps the agent leaves out are dropped, but loose items and done items are always
kept.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `groups` | array | yes | The plan as tasks. |
| `groups[].title` | string | yes | Task name, an outcome. |
| `groups[].todos` | array | yes | The task's ordered steps. |
| `groups[].todos[].title` | string | yes | Step title. |
| `groups[].todos[].status` | `pending` \| `in_progress` \| `done` | no | Initial status of a new step. Default: `pending`. |
| `groups[].todos[].note` | string | no | Short secondary line. |

### `todo_plan_summary`

Set the plan-level completion summary after the last item is done. The summary is cumulative across the
whole plan and shaped like a pull request body, with `## Summary`, `## Changes`, and `## Testing` sections.
The host prepends it when it renders the PR body for [Open PR](../how-to/open-a-pull-request.md).

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `summary` | string | yes | The cumulative summary. An empty string clears it. |

If items are still open, the summary is saved but only shows once everything is done.

## Subagent tools

Provided by the `pi-subagents` package, on top of `pi-delegation`. A subagent is a hidden child `pi` session
with its own context window. It works in the parent's workspace and branch, runs without anyone to answer
questions, and returns one final report. See [Delegate to subagents](../how-to/delegate-to-subagents.md) for
the workflow.

### `Agent`

Run a task in a subagent. Several `Agent` calls in one assistant message run in parallel.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `subagent_type` | string | yes | Name of the agent definition to run, such as `scout`. |
| `task` | string | yes | The complete, self-contained task. The subagent sees only this text. |
| `model` | string | no | A model for an unpinned agent, preferably `provider/id`. |
| `run_in_background` | boolean | no | Do not wait. The call returns the child session id at once. |

Behavior and limits:

- **Foreground** (default). The call waits and returns the subagent's final report. A failed run raises a
  tool error that still carries the run's details.
- **Background.** The result is the child session id. When the run finishes, a `subagent-completion`
  message is delivered to the chat as a follow-up and starts a new turn, unless you stopped the subagent
  yourself. `get_subagent_result` fetches the result on demand.
- **Model.** A definition's `model` wins over the `model` parameter, which wins over the parent chat's
  model. A reference matches `provider/id` exactly, an exact id, or a unique id prefix; an ambiguous or
  unknown reference is an error.
- **Result size.** Reports are capped at 50,000 characters; the full text stays in the child transcript.
- **No recursion, no MCP.** Subagents cannot call `Agent` or `get_subagent_result`, and they cannot call
  MCP tools. The parent calls MCP tools itself and passes what the subagent needs in `task`.
- **Concurrency.** Each chat runs at most the configured number of subagents at once; the rest wait in a
  first-in, first-out queue. See [Subagent settings](#subagent-settings).

### `get_subagent_result`

Collect the result or current status of a subagent started by this chat.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `session_id` | string | yes | The child session id that `Agent` returned. |

A running or queued subagent reports its status. An id from another chat, or from before a host restart,
is unknown because the run registry is in memory; the error names the transcript path when it survives.

### Subagent roles

The `Agent` tool lists the available definitions in its description. Four are built in:

| Role | Purpose | Tools | Notes |
| --- | --- | --- | --- |
| `scout` | Read-only recon. Returns compressed context: paths, symbols, call sites. | `read`, `grep`, `find`, `ls`, `bash`, `spec_grep`, `spec_get`, `spec_graph`, `web_search`, `fetch_content` | `bash` is for read-only inspection. |
| `planner` | Read-only planning. Returns an ordered, file-level change plan. | `read`, `grep`, `find`, `ls`, `spec_grep`, `spec_get`, `spec_graph` | Writes no code or files. |
| `worker` | Implements a well-scoped task end to end. | `pi` defaults: `read`, `bash`, `edit`, `write` | Leaves all changes uncommitted and never runs history- or index-changing `git` commands; the parent owns commits. |
| `reviewer` | Read-only review of a named diff or area. Ends with `Verdict: Approve` or `Verdict: Request changes`. | `read`, `grep`, `find`, `ls`, `bash`, `spec_grep`, `spec_get`, `spec_graph` | Also reads the repository's agent guidance files (project context). |

### Custom agent definitions

Add your own roles as Markdown files with frontmatter. The body is the system prompt.

| Location | Scope | Loaded when |
| --- | --- | --- |
| `<pi agent dir>/agents/*.md` (by default `~/.pi/agent/agents/`) | Personal | Always |
| `<workspace>/.pi/agents/*.md` | Project | The project is trusted |
| `<workspace>/.agents/agents/*.md` | Project | The project is trusted |

Names resolve built-in first, then personal, then project, and the first definition with a name wins. A
definition therefore cannot replace a built-in role or a personal role of the same name. Files that are
malformed, or that lack a `name`, a `description`, or a body, are skipped silently. The frontmatter is read
line by line as `key: value`, not as full YAML.

| Field | Required | Description |
| --- | --- | --- |
| `name` | yes | Role name used as `subagent_type`. |
| `description` | yes | What the role is for; shown to the parent agent. |
| `tools` | no | Comma-separated tool names, optionally in brackets. Omitted means `pi`'s default tools. |
| `model` | no | Pins the model. A pin cannot be overridden by the `Agent` call. |
| `thinking` | no | One of `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`. Other values are ignored. |
| `max_turns` | no | Positive integer turn cap. |
| `inherit_project_context` | no | `true` to load the repository's agent guidance files. |
| `skills` | no | Comma-separated skill names to load. |
| `extensions` | no | `true` to give the role ThinkRail's curated child extension set (spec read tools and web tools). |

```markdown
---
name: docs-checker
description: Read-only check that docs match the code they describe.
tools: read, grep, find, ls
thinking: medium
max_turns: 20
inherit_project_context: true
---

You verify documentation against source. Report each mismatch as path:line with the correct fact.
Never modify files.
```

### Subagent settings

**Settings → Chat → Subagents** has **Allow subagents** (global switch, on by default) and **Per chat at
once** (concurrency limit, 1 to 16, default 4). The active workspace can override both. Work already running
always finishes when you turn subagents off. While subagents are off, `Agent` fails with "Subagents are
disabled in this session."

## Background command tool

Provided by the `pi-background-commands` package. It starts a long-running, non-interactive shell command
that the chat owns, without holding the agent's turn. Ordinary `bash` is unchanged.

### `background_command`

One tool with four actions. Each action accepts only its own parameters; extra parameters are rejected.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `start` \| `list` \| `output` \| `stop` | yes | What to do. |
| `command` | string | `start` | The shell command, 1 to 65,536 characters. Start only. |
| `name` | string | no | Display name, up to 200 characters. Start only. |
| `timeout` | number | no | Timeout in seconds. Start only. There is no default timeout. |
| `id` | string | `output`, `stop` | Command id returned by `start`. |

Behavior and limits:

- At most 8 commands are active at once, and the latest 20 finished records are kept.
- Output is a replacement snapshot of the last 2,000 lines or 50 KiB, not an archive.
- There is no stdin and no terminal. The agent is told not to detach with `&`, `nohup`, or `disown`.
- When a command finishes on its own, a `background-command-completion` message with a short excerpt is
  delivered as a follow-up and starts a turn. A command you stop does not wake the agent.
- Stopping requests cancellation; it is not instant.
- Records live in host memory. After a host restart, earlier ids are unavailable.

You see running and finished commands in the chat's **Resources** view.

## Host tools

These tools are registered by the ThinkRail host rather than by a portable package. They are always
present in parent chats, except `request_review`.

### `ask_user_question`

Ask you one or more structured multiple-choice questions. The chat shows them as an interactive card and
the run waits for your answer.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `questions` | array | yes | One or more questions. Question text must be unique within a call. |
| `questions[].question` | string | yes | The full question, ending with a question mark. |
| `questions[].header` | string | yes | Short chip label, up to 16 characters. |
| `questions[].options` | array | yes | 2 to 4 options with unique labels. |
| `questions[].options[].label` | string | yes | Option text, up to 60 characters. |
| `questions[].options[].description` | string | yes | What the option means or what it costs. |
| `questions[].options[].preview` | string | no | Markdown shown beside the option. Single-select only. |
| `questions[].options[].recommendedReason` | string | no | One sentence, up to 160 characters, on why the agent recommends this option. |
| `questions[].multiSelect` | boolean | no | Allow several answers. Default: `false`. |

Notes:

- Every question also gets an **Other** free-text answer, and you can skip the whole set. The agent must not
  write its own "Other" option; the labels `Other`, `Type something.`, `Chat about this`, and `Next →` are
  reserved and rejected.
- A recommended option goes first, with "(Recommended)" in its label.
- Replying in the chat instead of answering the card supersedes the card, and your reply arrives as the
  next message.
- The call should be the only tool call in its assistant message; other calls in that message are
  discarded.

### `set_title`

Name the chat, its workspace, and the workspace branch.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `chat_title` | string | no | 3 to 6 words, in the language you write in. |
| `workspace_name` | string | no | 2 to 5 words naming the task, in your language. |
| `branch` | string | no | Short English kebab-case branch slug. Only valid together with `workspace_name`. |

The agent calls it once, when the task is clear, passing every name still missing. A name already set,
by an earlier call or by you, is kept, and the result says what was applied. A per-turn reminder appears
only while a name is still missing.

### `resolve_comment`

Mark a [review comment](../how-to/review-changes.md) as resolved after addressing it.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `commentId` | string | yes | The comment id from the review package the chat received, such as `rc_1a2b3c4d`. |
| `note` | string | no | One short line on what was done, shown in the review sidebar. |

It is valid only for comments sent to this chat. If a comment is unclear or the agent disagrees, it replies
in the conversation and does not resolve it.

### `request_review`

Ask an independent, read-only reviewer subagent to review a completed plan step. The result is a verdict,
`approve` or `request_changes`, with findings, plus text telling the agent what to do next under the current
review policy.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `itemId` | string | yes | Id of the plan step whose change set to review. |

The tool is withheld unless **Settings → Models → Review → Agent-triggered review** is on (off by default).
The **Automatic fix cycle** switch in the same group decides whether the next action is to fix the findings
once and re-review, or to stop and report them. The reviewer model comes from **Review model**.

## Web research tools

Provided by the third-party `pi-web-access` package, bundled at version 0.13.0. Search works without keys by
default; optional provider keys go in `~/.pi/web-search.json`. In ThinkRail the `workflow` parameter
defaults to `none`, because the package's browser curation page cannot open from the host. Video frame
extraction needs `ffmpeg` and, for YouTube, `yt-dlp` on the host.

### `web_search`

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | no | A single query. |
| `queries` | string[] | no | Several queries with different angles; each gets its own answer. Preferred for research. |
| `numResults` | number | no | Results per query. Default: 5, maximum 20. |
| `includeContent` | boolean | no | Also fetch full page content in the background. |
| `recencyFilter` | `day` \| `week` \| `month` \| `year` | no | Limit results by age. |
| `domainFilter` | string[] | no | Limit to domains; prefix a domain with `-` to exclude it. |
| `provider` | `auto` \| `openai` \| `brave` \| `parallel` \| `tavily` \| `exa` \| `perplexity` \| `gemini` | no | Search provider. Default: `auto`. |
| `workflow` | `none` \| `summary-review` \| `auto-summary` | no | Curation mode. ThinkRail sets `none` when the agent omits it. |

Provide `query` or `queries`; with neither, the call returns an error.

### `fetch_content`

Fetch URLs and extract readable Markdown. Handles web pages, PDFs, GitHub repositories, YouTube
transcripts, and local video files.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | string | no | A single URL. |
| `urls` | string[] | no | Several URLs, fetched in parallel. |
| `forceClone` | boolean | no | Clone a large GitHub repository that exceeds the size threshold. |
| `prompt` | string | no | Question for video analysis (YouTube and video files). |
| `timestamp` | string | no | Frame time or range for video, such as `23:45` or `23:41-25:00`. |
| `frames` | integer | no | Number of video frames, 1 to 12. |
| `model` | string | no | Override the Gemini model for video analysis. |

Provide `url` or `urls`. Content is stored for later retrieval, and long single-page results are truncated
inline.

### `get_search_content`

Retrieve the full stored content from an earlier `web_search` or `fetch_content` call.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `responseId` | string | yes | The id returned by the earlier call. |
| `query` | string | no | Which query's content to return (search results). |
| `queryIndex` | number | no | Index of the query. |
| `url` | string | no | Which URL's content to return (fetch results). |
| `urlIndex` | number | no | Index of the URL. |

## Visualize tool

Provided by the `visualize` extension: the portable package `@thinkrail/pi-visualize`, composed into
ThinkRail as an extension that you can turn off in **Settings → Extensions**. It renders a diagram or an
options comparison as a card in the chat instead of ASCII art or a Markdown table.

### `visualize`

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `diagram` \| `comparison` | yes | Which visualization to render. |
| `title` | string | no | Heading above the visualization. |
| `mermaid` | string | `diagram` | Mermaid source of any diagram kind. |
| `options` | array | `comparison` | The alternatives being compared. |
| `options[].name` | string | yes | Short label. |
| `options[].description` | string | no | One or two sentences. |
| `options[].pros` | string[] | no | Advantages. |
| `options[].cons` | string[] | no | Drawbacks. |
| `options[].recommended` | boolean | no | Highlights the one option the agent endorses. |
| `options[].mermaid` | string | no | Mermaid diagram for this option. |

ThinkRail validates Mermaid syntax on the host with the same Mermaid version the browser renders. Invalid
syntax is returned to the agent as a tool error so it can correct and retry. Fenced `mermaid` blocks in any
Markdown the app renders also draw as diagrams.

## Related

- [Spec format](spec-format.md)
- [Workflows](workflows.md)
- [MCP configuration](mcp-configuration.md)
- [Delegate to subagents](../how-to/delegate-to-subagents.md)
- [Extensions](../explanation/extensions.md)
