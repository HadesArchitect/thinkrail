---
title: Changelog
description: What changed in each ThinkRail release, from v0.1.0 to the current nightly line.
type: reference
status: draft
---

ThinkRail ships on two channels. Stable releases (`v0.1.x`) are tagged when a set of changes is ready;
nightly builds (`0.2.0-nightly.N`) are published as GitHub pre-releases most days and carry everything
merged since the last stable. To run nightly, install the CLI with `install.sh --channel nightly` (or set
`THINKRAIL_CHANNEL=nightly` on Windows), or download a `thinkrail-desktop-*` asset from a nightly
pre-release; both then offer updates for their own channel in **Settings → Updates**.

This page covers what you will notice. Every release on
[GitHub releases](https://github.com/JetBrains/thinkrail/releases) lists its full set of pull requests.

## 0.2.0 — Unreleased (nightly)

> [!NOTE]
> Everything below ships in nightly builds now and lands in the next stable release. Changes merged
> 2026-10-06 to 2026-10-18; the latest nightly is `0.2.0-nightly.33` (2026-10-17). Dates are merge dates,
> not release dates. [#749](https://github.com/JetBrains/thinkrail/pull/749) merged after nightly.33 and
> arrives in the next nightly.

This release is about connecting the agent to more tools and making its work easier to follow: MCP
servers, a continuous review of every change, and notifications that find you when the agent needs you.

### MCP servers in your chats

Chats now run the MCP servers from your `mcp.json` on `pi`'s built-in MCP engine, new in `pi` 1.1. Servers a
repository defines stay off until you approve them, and ThinkRail asks before calls the server does not
mark read-only. An **Always allow** answer that remembers an approval arrives in the next nightly. Add, approve, switch off, sign in to (OAuth), and
read the logs of the active project's servers in **Settings → MCP servers**, and see which servers each
chat connected to next to its background commands and subagents.

### Review every change in one scroll

The **Changes** tab is now one continuous view of every changed file instead of one diff tab per file.
Mark hunks **Keep** as you read, watch the progress bar, and jump to **Next unreviewed** (`J`). The host
records which agent run changed what, so shell writes, formatters, and renames show up too, and a
reviewer's reading order appears as a review guide alongside the diff. This is local review of the
agent's work, not a forge integration, and kept and viewed marks do not survive a reload yet.

### Know when the agent needs you

ThinkRail sends a notification when a workspace needs you: the agent asks a question, finishes, or fails.
In the browser these are browser notifications; the desktop app uses native OS notifications that work
while it is minimized. Neither fires while you are looking at the app or while background commands and
subagents are still running. Press **Cmd/Ctrl+K** to open a switcher and jump to the chat that needs you.

### A calmer, denser workbench

The workbench gains IntelliJ-style edge tool rails for Projects, Specs, Files, Changes, and Review, plus
two optional themes, **Minimal Light** and **Minimal Dark**. Spacing is tighter, Settings and the topbar
location strip are redesigned, and the plan moves to a **TODO List** side rail with Now / Up next / Done
sections. Finished or quiet workspaces settle onto a per-project shelf, so the Projects rail stays short;
nothing is deleted.

### pi packages

- `@thinkrail/pi-visualize` 0.1.0 is on npm (published 2026-10-14): `pi install npm:@thinkrail/pi-visualize`
  gives vanilla `pi` the `visualize` tool for Mermaid diagrams and option comparisons, drawn with box
  characters in the terminal. It replaces the interim `@thinkrail.ai/pi-visualize`, now deprecated
  ([#734](https://github.com/JetBrains/thinkrail/pull/734)).
- **Settings → Extensions** lists the ThinkRail extensions the agent gets, such as visualize, with an on/off switch for each ([#709](https://github.com/JetBrains/thinkrail/pull/709)).

**New**

- Chats run the MCP servers from `mcp.json`; repository-defined servers need approval and risky tools ask first ([#691](https://github.com/JetBrains/thinkrail/pull/691))
- **Settings → MCP servers**: add, approve, enable or disable, sign in to, and read logs of servers for the active project ([#692](https://github.com/JetBrains/thinkrail/pull/692), [#694](https://github.com/JetBrains/thinkrail/pull/694))
- Each chat lists its MCP servers and whether they connected ([#693](https://github.com/JetBrains/thinkrail/pull/693))
- MCP tool calls, resources, and `tool_search` render as cards with images and full output instead of raw JSON ([#695](https://github.com/JetBrains/thinkrail/pull/695))
- Continuous **Changes** review tab with per-hunk **Keep**, progress, **Next unreviewed**, host-recorded turn changes, and a review guide ([#668](https://github.com/JetBrains/thinkrail/pull/668))
- Browser notifications when a workspace needs you, suppressed while the window is focused ([#652](https://github.com/JetBrains/thinkrail/pull/652))
- Desktop: native OS notifications for the same events, also when the app is minimized ([#655](https://github.com/JetBrains/thinkrail/pull/655))
- **Cmd/Ctrl+K** opens a switcher to jump to any workspace or chat that needs you ([#633](https://github.com/JetBrains/thinkrail/pull/633))
- Minimal interface: edge tool rails, **Minimal Light** and **Minimal Dark** themes, and panel toggles that no longer rebuild the app ([#680](https://github.com/JetBrains/thinkrail/pull/680))
- Quiet workspaces settle onto a per-project shelf (PR merged or closed, or idle 7 days by default in **Settings → Workspaces**), with **Settle** / **Keep active** overrides ([#663](https://github.com/JetBrains/thinkrail/pull/663))
- The plan moves to a **TODO List** side rail (Now / Up next / Done, Check it / Checked), the agent can group loose items with `todo_promote`, and the plan summary renders as a PR body ([#706](https://github.com/JetBrains/thinkrail/pull/706))
- **Settings → Extensions** lists ThinkRail extensions with an on/off switch for each ([#709](https://github.com/JetBrains/thinkrail/pull/709))
- Per-chat subagent concurrency is configurable: global default 4, with an optional workspace override ([#699](https://github.com/JetBrains/thinkrail/pull/699))
- The trust prompt names exactly what trusting a project loads (extensions, skills, prompts, subagents, settings), and `pi` receives each project's trust ([#690](https://github.com/JetBrains/thinkrail/pull/690))
- Desktop: **Cmd+,** (macOS) or **Ctrl+,** (Windows, Linux) opens Settings ([#747](https://github.com/JetBrains/thinkrail/pull/747))

**Improved**

- Engine: `pi` 1.2.0 (via 1.1.0) adds MCP support and cancellable sign-ins; ThinkRail now imports your login-shell environment, including provider API keys, at start ([#689](https://github.com/JetBrains/thinkrail/pull/689), [#723](https://github.com/JetBrains/thinkrail/pull/723))
- Extension dialogs ask inline in the chat next to the tool call, and MCP approvals gain **Always allow** ([#749](https://github.com/JetBrains/thinkrail/pull/749))
- Settings redesigned, with all review settings grouped in a Review section on the **Models** page ([#710](https://github.com/JetBrains/thinkrail/pull/710), [#744](https://github.com/JetBrains/thinkrail/pull/744))
- Topbar location strip redesigned as quiet, captioned, clickable segments for project, workspace, branch, and PR ([#659](https://github.com/JetBrains/thinkrail/pull/659), [#712](https://github.com/JetBrains/thinkrail/pull/712))
- Denser UI: tighter gutters, row heights, and line heights in chat and side panes ([#703](https://github.com/JetBrains/thinkrail/pull/703))
- Projects rail keeps a stable order with newest workspaces first and Default on top; only the topbar switcher sorts by recent activity ([#713](https://github.com/JetBrains/thinkrail/pull/713), [#725](https://github.com/JetBrains/thinkrail/pull/725))
- Chats waiting on background work show as running, and unread results clear once you have seen them ([#728](https://github.com/JetBrains/thinkrail/pull/728))
- The agent can park loose notes in a shared TODO queue and promotes them when it starts work; sending from the Plan composer keeps you on the Plan page ([#654](https://github.com/JetBrains/thinkrail/pull/654))
- The design interview, where the agent asks before building and amends specs, is the default workflow again ([#711](https://github.com/JetBrains/thinkrail/pull/711))
- Brainstorming shows the alternatives it rejected instead of deciding silently ([#726](https://github.com/JetBrains/thinkrail/pull/726))
- Provider groups in the model picker appear as section headers ([#745](https://github.com/JetBrains/thinkrail/pull/745))
- Changes tree shows folder +/- counts only when the folder is collapsed ([#735](https://github.com/JetBrains/thinkrail/pull/735))
- New "TR" loader animation ([#727](https://github.com/JetBrains/thinkrail/pull/727))
- Notifications and toasts share one design: neutral backgrounds, consistent borders, one icon per severity ([#730](https://github.com/JetBrains/thinkrail/pull/730))
- Large files open without freezing the UI: file and diff views are virtualized ([#731](https://github.com/JetBrains/thinkrail/pull/731))
- Code in chat is highlighted off the main thread, removing freezes while answers stream ([#626](https://github.com/JetBrains/thinkrail/pull/626))
- Streaming no longer re-renders the composer, chat header, whole chat view, or review comment rows on every event ([#619](https://github.com/JetBrains/thinkrail/pull/619), [#697](https://github.com/JetBrains/thinkrail/pull/697), [#700](https://github.com/JetBrains/thinkrail/pull/700))
- Panel resizes, drags, and tab switches no longer re-render every open chat, editor, and terminal ([#682](https://github.com/JetBrains/thinkrail/pull/682))

**Fixed**

- Launching from the Dock, Finder, or a `.desktop` file picks up your login-shell `PATH`, so the agent finds `gh`, `bun`, and `node` ([#686](https://github.com/JetBrains/thinkrail/pull/686))
- Notifications no longer fire while you are looking at the app with DevTools or the address bar focused ([#705](https://github.com/JetBrains/thinkrail/pull/705))
- The attention dot and notifications stay off while a chat still has background commands or subagents running ([#716](https://github.com/JetBrains/thinkrail/pull/716))
- Saved chats reopen when their model is unavailable, using `pi`'s default without overwriting the saved choice ([#685](https://github.com/JetBrains/thinkrail/pull/685))
- A terminal no longer freezes after macOS sleep or a monitor reconnect ([#679](https://github.com/JetBrains/thinkrail/pull/679))
- Terminals no longer write marker commands into your shell history ([#715](https://github.com/JetBrains/thinkrail/pull/715))
- Drag-selecting text in a diff no longer crashes the desktop app on macOS ([#684](https://github.com/JetBrains/thinkrail/pull/684))
- Switching back to a chat that is still streaming no longer shows a blank transcript ([#636](https://github.com/JetBrains/thinkrail/pull/636))
- A scrolled source diff keeps its position when you switch away and back ([#674](https://github.com/JetBrains/thinkrail/pull/674))
- Scrolling a diff near its right edge no longer resizes the neighboring panel ([#736](https://github.com/JetBrains/thinkrail/pull/736))
- Typing past a live question card supersedes it and sends your text ([#669](https://github.com/JetBrains/thinkrail/pull/669))
- `set_title` names an unnamed workspace in the same call as the chat ([#658](https://github.com/JetBrains/thinkrail/pull/658))
- The **Let the agent request review: Off** setting and subagent gates survive a session reload, so no unwanted `request_review` calls ([#733](https://github.com/JetBrains/thinkrail/pull/733))
- Subagents can read images in the CLI binary instead of getting an "Image omitted" note ([#657](https://github.com/JetBrains/thinkrail/pull/657))
- Malformed terminal and settings requests are rejected instead of reaching the shell or your saved config ([#661](https://github.com/JetBrains/thinkrail/pull/661))
- The history search (Ctrl+R) overlay is no longer covered by message copy buttons ([#748](https://github.com/JetBrains/thinkrail/pull/748))

Plus 13 internal and documentation changes, including a README rewritten as a user-facing front page —
[full list on GitHub](https://github.com/JetBrains/thinkrail/compare/v0.1.6...main).

Thanks to [@zhuravlikjb](https://github.com/zhuravlikjb) and [@HadesArchitect](https://github.com/HadesArchitect) for their first contributions.

## v0.1.6 — 2026-10-06

This release is about reviewing agent output properly and choosing models with the cost in view. It is
the largest stable release so far and ships with `pi` 1.0.

### A review surface built for agent output

Diffs are faster, and comments can anchor to images, table
cells, JSON nodes, and notebook cells, not only lines. Each hunk has **Revert** and **Ask agent** with
undo, and code files are readable on a phone.

### One model and effort picker

A single picker replaces the separate model and effort chips. Search with queries like "opus high", keep
favorites and recents, and see how each model is connected (API key, subscription, environment key,
JetBrains AI). Per-token prices appear only where you actually pay per token, so you see what a choice
costs before you make it.

### The agent names your chats and workspaces

The agent titles chats and workspaces itself through a `set_title` tool: in your language, from the real
PR or issue title when there is one, with a short English branch slug. The first name sticks, and a name
you type always wins. This replaces a first-words heuristic that produced poor names for non-English
prompts and pasted links.

### A steadier UI while the agent works

The web app now builds with the React Compiler, which cuts needless re-renders; typing in the composer
used to touch about 130 components. Chat no longer jumps under you while an answer streams, and file and
diff views keep their scroll position when they refresh live.

### pi packages

- First published `pi` package: `@thinkrail.ai/pi-visualize` brings the `visualize` tool (diagrams and option comparisons) to vanilla `pi`. It has since moved to `@thinkrail/pi-visualize`; see 0.2.0 ([#597](https://github.com/JetBrains/thinkrail/pull/597))

**New**

- One review surface with rich comment anchors, per-hunk **Revert** / **Ask agent** with undo, and code viewing on phones ([#581](https://github.com/JetBrains/thinkrail/pull/581))
- Unified model and effort picker with search, favorites, recents, connection kinds, and per-token prices where they apply ([#614](https://github.com/JetBrains/thinkrail/pull/614))
- The agent names chats and workspaces via `set_title`; manual renames win ([#583](https://github.com/JetBrains/thinkrail/pull/583))
- Extend GPT context windows beyond the 272K cap, up to 1M where supported, through `pi` model overrides ([#615](https://github.com/JetBrains/thinkrail/pull/615))
- `@thinkrail.ai/pi-visualize` published for vanilla `pi` ([#597](https://github.com/JetBrains/thinkrail/pull/597))
- Desktop: themed frameless title bar with built-in window controls on Windows ([#536](https://github.com/JetBrains/thinkrail/pull/536))
- Desktop: trackpad pinch-to-zoom on macOS, 50% to 200% ([#589](https://github.com/JetBrains/thinkrail/pull/589))
- Desktop: confirmed quit (hold or double-press Cmd+Q on macOS, Ctrl+Q on Linux) and in-app close shortcuts (Cmd+W, Ctrl+W, Ctrl+F4) ([#609](https://github.com/JetBrains/thinkrail/pull/609))

**Improved**

- Engine: `pi` 0.99.1 → 1.0.2; prompt submission no longer slows down as a chat grows, and Claude keeps its prompt cache when tools are toggled ([#606](https://github.com/JetBrains/thinkrail/pull/606), [#624](https://github.com/JetBrains/thinkrail/pull/624))
- The green dot means a chat is waiting on you or has an unread result, and clears only when you open it ([#525](https://github.com/JetBrains/thinkrail/pull/525))
- An animated TR badge is the single "agent working" indicator in the Projects rail and the chat footer ([#610](https://github.com/JetBrains/thinkrail/pull/610), [#630](https://github.com/JetBrains/thinkrail/pull/630))
- Background commands and subagents get a live dock above the composer with per-row Stop and an inspector for logs and transcripts ([#631](https://github.com/JetBrains/thinkrail/pull/631))
- For design work, the agent interviews you over several question rounds instead of assuming after one ([#611](https://github.com/JetBrains/thinkrail/pull/611))
- Composer controls are borderless and labeled; the disabled send button no longer draws the eye ([#628](https://github.com/JetBrains/thinkrail/pull/628))
- The rendered Markdown diff collapses to changed blocks and list items ([#629](https://github.com/JetBrains/thinkrail/pull/629))
- Fewer needless re-renders across the app with the React Compiler ([#590](https://github.com/JetBrains/thinkrail/pull/590))
- Clearer wording on the user-interview invitation: credits are awarded after the interview ([#637](https://github.com/JetBrains/thinkrail/pull/637))

**Fixed**

- Chat no longer jumps while an answer streams, and finishing a response no longer pulls you to the bottom ([#568](https://github.com/JetBrains/thinkrail/pull/568))
- File and diff views keep your scroll position when they refresh live ([#608](https://github.com/JetBrains/thinkrail/pull/608))
- The app starts even when a session-state file is empty or corrupt after a crash ([#596](https://github.com/JetBrains/thinkrail/pull/596))
- A slightly over-long question option no longer produces a dead question card ([#612](https://github.com/JetBrains/thinkrail/pull/612))
- Commenting on a dragged region of an SVG keeps the region ([#648](https://github.com/JetBrains/thinkrail/pull/648))

Plus 8 internal and documentation changes —
[full list on GitHub](https://github.com/JetBrains/thinkrail/releases/tag/v0.1.6).

Thanks to [@Mark-Life](https://github.com/Mark-Life) for a first contribution, the React Compiler migration.

## v0.1.5 — 2026-10-01

This release is about quieter defaults and seeing what the agent left running, on a new `pi` engine.

### See and stop what the agent left running

A per-chat **Resources** popover lists the background commands and subagents the agent started, with their
logs and transcripts. Stop one, or all of them, without cancelling the whole turn.

### Default model and effort for new chats

Pick a default model and effort once in **Settings → Models** instead of choosing again in every new chat.

### pi 0.99: new models and ChatGPT sign-in

The embedded `pi` engine moves from 0.87.1 to 0.99.1. It brings GPT-6.1 Sol, Claude Sonnet 5.5, and Kimi
K3, plus **Sign in with ChatGPT** on the OpenAI provider.

**New**

- Per-chat **Resources** popover to inspect and stop background commands and subagents ([#489](https://github.com/JetBrains/thinkrail/pull/489))
- Default model and effort for new chats in **Settings → Models** ([#575](https://github.com/JetBrains/thinkrail/pull/575))

**Improved**

- Engine: `pi` 0.87.1 → 0.99.1 with new models, ChatGPT sign-in, and pricing and provider fixes ([#578](https://github.com/JetBrains/thinkrail/pull/578))
- Review is quieter by default: the agent no longer requests review after each step, and findings are no longer auto-fixed; both are opt-in ([#576](https://github.com/JetBrains/thinkrail/pull/576))
- Skills show their on/off state with switches ([#579](https://github.com/JetBrains/thinkrail/pull/579))
- Desktop: double-clicking the macOS topbar performs your System Settings title-bar action ([#562](https://github.com/JetBrains/thinkrail/pull/562))

Plus 1 internal change —
[full list on GitHub](https://github.com/JetBrains/thinkrail/releases/tag/v0.1.5).

## v0.1.4 — 2026-09-30

This release is about stability and control: updates you approve, and a workbench that stops blinking.

### Updates you control

On desktop, updates go **Download** → **Preparing** → **Install & Restart**, and nothing is applied until you
choose. Eligible CLI hosts get a one-click **Run Update**. Installers now refuse to replace files on an
unsafe layout.

### A workbench that stops blinking

Switching workspaces and releasing a panel resize used to rebuild and re-fade the whole app, including
chat, terminals, and editors. They no longer do.

### Shortcuts for zoom and new workspaces

**Cmd/Ctrl +**, **-**, and **0** zoom the desktop app. **Cmd/Ctrl+N** (or **Cmd/Ctrl+Alt+N**) creates a new
workspace from anywhere.

**New**

- Consent-driven updates on desktop and a one-click **Run Update** on eligible CLI hosts ([#558](https://github.com/JetBrains/thinkrail/pull/558))
- **Cmd/Ctrl+N** creates a workspace from anywhere ([#554](https://github.com/JetBrains/thinkrail/pull/554))
- Desktop: page zoom with Cmd/Ctrl plus, minus, and 0 ([#567](https://github.com/JetBrains/thinkrail/pull/567))

**Improved**

- Plan page: live Session block, cumulative Summary, Now executing / To do / Done layout, and an in-plan composer ([#555](https://github.com/JetBrains/thinkrail/pull/555))
- Markdown diffs open in the rendered view by default ([#569](https://github.com/JetBrains/thinkrail/pull/569))

**Fixed**

- Switching workspaces no longer makes the whole workbench blink ([#557](https://github.com/JetBrains/thinkrail/pull/557))
- Releasing a panel resize no longer rebuilds chat, terminals, and editors ([#566](https://github.com/JetBrains/thinkrail/pull/566))
- Text insertion and padding in the composer and New Workspace prompt ([#560](https://github.com/JetBrains/thinkrail/pull/560))

Plus 6 internal changes, including groundwork for durable multi-agent orchestration with no UI yet —
[full list on GitHub](https://github.com/JetBrains/thinkrail/releases/tag/v0.1.4).

## v0.1.3 — 2026-09-25

This release is about desktop polish and running plan review from the UI.

### Plan review by a subagent

**Start review** and **Review All** launch a dedicated review subagent. Its findings land in the
**Review** tab, and it uses the review model and effort you configured.

### A macOS title bar that matches your theme

The white system strip above a dark UI is gone: on macOS the ThinkRail topbar is the title bar.

### One scrollbar everywhere

Markdown preview, code editor, diffs, panels, and terminal share one scrollbar look and behavior.

**New**

- Plan review runs from the UI through a review subagent that files findings in the **Review** tab ([#472](https://github.com/JetBrains/thinkrail/pull/472))
- Desktop: themed macOS title bar merged with the ThinkRail topbar ([#458](https://github.com/JetBrains/thinkrail/pull/458))

**Improved**

- Engine: `pi` 0.84.3 → 0.87.1 with newer model catalogs, safer context handling, and corrected compaction accounting ([#537](https://github.com/JetBrains/thinkrail/pull/537), [#553](https://github.com/JetBrains/thinkrail/pull/553))
- One consistent scrollbar across preview, editor, diff, panels, and terminal ([#538](https://github.com/JetBrains/thinkrail/pull/538))

**Fixed**

- Providers routed through JetBrains AI (Anthropic, OpenAI, Vertex) are visible again in **Settings → Providers** ([#552](https://github.com/JetBrains/thinkrail/pull/552))
- Subagents that run `git commit` no longer break the one-step-one-commit mapping of the TODO list ([#547](https://github.com/JetBrains/thinkrail/pull/547))

Plus 1 documentation change —
[full list on GitHub](https://github.com/JetBrains/thinkrail/releases/tag/v0.1.3).

## v0.1.2 — 2026-09-20

This release is about chat names, a clear analytics choice, and questions the agent can rely on.

### Chats name themselves, and keep their names

After your first prompt, a new chat gets a meaningful title from a low-cost model. Names survive host
restarts, and a name you type always wins.

### A clear analytics choice

Basic usage events are now separate from product insights that need your consent. You choose at first
launch and can change it later in **Settings → Privacy**. No credentials or account identifiers are sent.

### Questions you can trust

A message you queue while the agent waits on your answer no longer silently replaces the question. The
agent can also ask more than four questions in one round, so related clarifications arrive together.

**New**

- Durable chat names, generated after the first prompt; manual renames win ([#492](https://github.com/JetBrains/thinkrail/pull/492))

**Improved**

- Analytics split into basic usage and consented product insights, with a first-launch choice ([#483](https://github.com/JetBrains/thinkrail/pull/483))
- The agent can ask more than four questions in one round ([#520](https://github.com/JetBrains/thinkrail/pull/520))
- Paste or drag images into the New Workspace dialog; very long chat messages scroll inside a capped height ([#518](https://github.com/JetBrains/thinkrail/pull/518))

**Fixed**

- A queued message no longer silently supersedes an unanswered question ([#517](https://github.com/JetBrains/thinkrail/pull/517))
- The "PR #N" chip stays clickable after reloads, reconnects, and in second windows ([#511](https://github.com/JetBrains/thinkrail/pull/511))

Plus 5 internal changes —
[full list on GitHub](https://github.com/JetBrains/thinkrail/releases/tag/v0.1.2).

Thanks to [@katsugtgz](https://github.com/katsugtgz) for a first contribution, a security update for the project website ([#505](https://github.com/JetBrains/thinkrail/pull/505)).

## v0.1.1 — 2026-09-16

This release is about stabilization: Windows terminals, plans for any chat, and update notices for CLI
users.

### Plans for every chat

The plan now works when a chat starts with an empty TODO list. Commits made outside the plan, by you or
the agent, are adopted into the plan and the PR summary under "Committed outside the plan", so the PR
description reflects everything that shipped.

### Choose your Windows shell

Windows terminals default to PowerShell 7 when it is installed and fall back to Windows PowerShell. Pick
PowerShell 7, Windows PowerShell, or Command Prompt in **Settings → Terminal**; `SHELL` still wins.

### Update notices for CLI users

The CLI host checks GitHub releases at startup and every six hours and tells you when a newer version
exists on your channel. Run `thinkrail update`, then restart.

**New**

- Configurable Windows shell in **Settings → Terminal** ([#465](https://github.com/JetBrains/thinkrail/pull/465))
- Plans work for chats that start with an empty TODO list, with outside commits adopted into the plan ([#484](https://github.com/JetBrains/thinkrail/pull/484))
- CLI: update notices for newer same-channel versions ([#467](https://github.com/JetBrains/thinkrail/pull/467))

**Improved**

- The Create Workspace prompt supports slash completion, skills, and prompt templates like the chat composer ([#468](https://github.com/JetBrains/thinkrail/pull/468))
- A terminal that fails to start explains why, with **Terminal Settings** and **Retry** buttons ([#476](https://github.com/JetBrains/thinkrail/pull/476))
- Built-in workflow guidance applies only where relevant, so questions and small, fully specified changes proceed directly ([#485](https://github.com/JetBrains/thinkrail/pull/485))
- Desktop: new green-on-black app icon, crisp at small sizes on every platform ([#466](https://github.com/JetBrains/thinkrail/pull/466), [#495](https://github.com/JetBrains/thinkrail/pull/495))

**Fixed**

- Session cost, token, and context readouts refresh instead of going stale ([#462](https://github.com/JetBrains/thinkrail/pull/462))
- A stale failed chat no longer takes over the workspace glyph in the Projects rail ([#464](https://github.com/JetBrains/thinkrail/pull/464))
- The "queued" chip no longer sticks when you send an image while the agent runs ([#460](https://github.com/JetBrains/thinkrail/pull/460))

Plus 4 internal and documentation changes —
[full list on GitHub](https://github.com/JetBrains/thinkrail/releases/tag/v0.1.1).

## v0.1.0 — 2026-09-10

This release is the first stable `0.1` build. It is about running several workspaces in parallel without
losing track of them, and keeping the desktop app current.

### Desktop apps update themselves

The desktop apps for macOS ARM64, Windows x64, and Linux x64/ARM64 check GitHub releases and download
updates in the background. You choose when to apply one with **Restart to Update**; **Later** or quitting
never installs.

### Agent activity in the Projects rail

Each workspace row shows whether its agents are running, waiting on you, queued, or failed. Idle rows
stay blank, and a collapsed project shows the rollup, so you stop opening each workspace to check.

### Themes that follow your OS

In **Settings → Appearance**, choose **Match system** with your own light and dark pair. Each device
follows its own OS setting.

### Subagent controls

A global switch and per-workspace overrides (**Use global**, **On**, **Off**) control delegation for cost,
rate limits, or safety. Changes apply to live chats without interrupting subagents already running.

**New**

- Global and per-workspace subagent controls ([#399](https://github.com/JetBrains/thinkrail/pull/399))
- Themes can match the system appearance with a chosen light and dark pair ([#405](https://github.com/JetBrains/thinkrail/pull/405))
- Agent activity glyphs in the Projects rail ([#413](https://github.com/JetBrains/thinkrail/pull/413))
- JetBrains AI credit balance in the top bar, configurable under Providers → JetBrains AI ([#415](https://github.com/JetBrains/thinkrail/pull/415))
- **Settings → Line width** sets the reading width of chat and files (40–240 columns); long lines soft-wrap in editors and diffs ([#406](https://github.com/JetBrains/thinkrail/pull/406))
- Desktop: auto-updates from GitHub releases with **Restart to Update** ([#456](https://github.com/JetBrains/thinkrail/pull/456))

**Improved**

- When the agent re-plans its TODO list, existing steps keep their status, summary, verification, and commit links ([#393](https://github.com/JetBrains/thinkrail/pull/393))
- The plan toolbar shows `base ← branch` like a GitHub PR, and the commits chip lists branch commits that open their diff ([#463](https://github.com/JetBrains/thinkrail/pull/463))
- Focus rings are consistent across the shell, including file tree rows ([#454](https://github.com/JetBrains/thinkrail/pull/454))
- Desktop: native app icons use the ThinkRail logo on every platform ([#449](https://github.com/JetBrains/thinkrail/pull/449))

**Fixed**

- A new workspace no longer starts with a chat that cannot reach the model; new workspaces and chats share `pi`'s default model ([#394](https://github.com/JetBrains/thinkrail/pull/394))
- A restart that leaves an interrupted tool call can no longer permanently break sessions on OpenAI Responses models ([#396](https://github.com/JetBrains/thinkrail/pull/396))
- Chat scrolling is predictable in both orderings: your input wins, and Latest/Follow no longer oscillate ([#432](https://github.com/JetBrains/thinkrail/pull/432))
- Branch pickers list branches from every git remote, not only `origin` ([#409](https://github.com/JetBrains/thinkrail/pull/409))
- Mermaid syntax errors in `visualize` diagrams go back to the agent so it can fix them ([#407](https://github.com/JetBrains/thinkrail/pull/407))
- Windows: background git, terminal, and helper processes no longer flash console windows ([#448](https://github.com/JetBrains/thinkrail/pull/448), [#453](https://github.com/JetBrains/thinkrail/pull/453))
- The "drag canceled" toast no longer appears when you only fold or toggle a panel ([#386](https://github.com/JetBrains/thinkrail/pull/386))
- The current-theme row labels which half is the device appearance and which is the resolved theme ([#412](https://github.com/JetBrains/thinkrail/pull/412))

Plus 11 internal changes —
[full list on GitHub](https://github.com/JetBrains/thinkrail/releases/tag/v0.1.0).

## Earlier releases

Twenty-one `0.0.x` releases, from v0.0.1 (2026-07-08) to v0.0.21 (2026-09-03), covered early development
and the public announcement on 2026-08-19. They are not summarized here; see
[GitHub releases](https://github.com/JetBrains/thinkrail/releases) for their pull request lists.
