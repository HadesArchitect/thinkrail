---
title: Security and data overview
description: What leaves your machine, what the agent can do without asking, project trust, telemetry controls for a team, signing, license, and support.
type: explanation
status: draft
---

ThinkRail runs on your machine and has no ThinkRail account or cloud service. Your prompts and the code
the agent reads go to the model provider you connect; search queries go to a web search provider when
the agent researches something. The agent works with
your user's permissions and does not ask before it reads files, edits them, or runs shell commands: it is
not a sandbox. Usage data (telemetry) contains no prompts, code, or file paths, and part of it cannot be
switched off in a packaged build. This page collects those facts for an evaluation or a security review
and links to the detail.

## What leaves your machine

| Destination | What is sent | When | How to turn it off |
| --- | --- | --- | --- |
| **Your model provider** (JetBrains AI, a subscription such as ChatGPT, Claude, or Copilot, or an API key provider), through `pi` | Your prompts and the chat so far, the system prompt with project instructions such as `AGENTS.md` and skill descriptions, and every tool result: file contents the agent reads and command output | Every agent turn, including subagents and agent reviews. `pi` also refreshes model lists from connected providers. | Not possible while the agent works. Choose the provider, or run a model server on your own network and add it in `~/.pi/agent/models.json`. `PI_OFFLINE=1` stops the model-list refresh. |
| **Web research providers**, through the bundled `pi-web-access` tools | Search queries, and the URLs the agent fetches | When the agent calls `web_search` or `fetch_content` | No switch in ThinkRail. See below. |
| **Your git remote and GitHub**, through your `git` and `gh` | Branches you push; pull request titles and bodies; `gh` sign-in checks | When you open a pull request or create a workspace from a remote branch, and when the agent runs `git` or `gh` itself | Do not sign in `gh`; the agent can still run any command your credentials allow. |
| **GitHub releases** (`api.github.com`, `github.com`, `raw.githubusercontent.com`) | A request for the latest release; no ThinkRail data | Installed CLI and packaged desktop builds check about every six hours; the installers and `thinkrail update` download from there | No switch. Builds from source do not check. Nothing downloads until you select **Download** or **Run Update**. |
| **PostHog, EU region** | Telemetry events: fixed event names, app version, OS, and fixed categories such as provider and authentication method, tied to a random installation ID. No prompts, code, file paths, or credentials. | Basic events in every packaged build; additional events while **Share additional usage data** is on | See [Telemetry](#telemetry). |
| **`thinkrail.ai`** | A one-time link between this installation and the website visit that brought you, opened in your browser | Once per packaged installation, only with additional sharing on and the first-run dialog confirmed | Turn off **Share additional usage data** before selecting **Done**, or run the CLI with `--no-open` or `--no-analytics`. |
| **MCP servers you approve** | The arguments of each tool call, and OAuth sign-in for remote servers | When the agent calls the server's tools | Switch the server off or **Remove** it in **Settings → MCP servers**. |
| **Anything a shell command reaches** | Whatever the command sends: package installs, `curl`, cloud CLIs | When the agent or an extension runs it | Restrict network access at the operating system or network level. |

Web research works without keys: searches go to Exa's public endpoint, or to OpenAI when you signed in
with a ChatGPT (Codex) subscription. Add a key for another provider (OpenAI, Brave, Parallel, Tavily, Exa,
Perplexity, or Gemini) in `~/.pi/web-search.json` to choose differently. Pages are fetched directly; for
a page that blocks the fetch, the tool can retry through a third-party reader service such as Jina Reader. See [Tools the agent can call](../agent/agent-tools.md#web-research-tools).

> [!NOTE]
> `pi`'s own install report runs only in its terminal app, which ThinkRail does not start. For OpenRouter,
> NVIDIA, and Cloudflare models, `pi` adds request headers that name `pi` as the client; set
> `PI_TELEMETRY=0` to leave them out.

Everything else stays local: ThinkRail state in `~/.thinkrail`, and credentials and chat transcripts in
`pi`'s directory, `~/.pi/agent`. See [Files and environment](../reference/files-and-environment.md).

## What the agent can do without asking

ThinkRail runs `pi`, and `pi` does not ask for approval before tool calls. ThinkRail adds one
confirmation: MCP tools that do not declare themselves read-only.

| Capability | How | Asks first? |
| --- | --- | --- |
| Read files | `read`, `grep`, `find`, `ls` | No. Any path your user account can read, not only the workspace. |
| Create and edit files | `write`, `edit` | No. Any path your user account can write; changes inside the workspace show up for review. |
| Run shell commands | `bash`, `background_command` | No. Commands run as you, with your environment, SSH agent, and signed-in CLIs. |
| Reach the network | `web_search`, `fetch_content`, and any shell command | No. |
| Call a read-only MCP tool | A tool the server marks `readOnlyHint` | No, once the server is on. |
| Call any other MCP tool | Every other MCP tool | Yes, each call: **Deny**, **Allow once**, or **Allow in this chat**. |
| Start subagents | `Agent` | No. A subagent works in the same workspace with its role's tools. The `scout` and `reviewer` roles are read-only by instruction but can run shell commands; subagents cannot call MCP tools. |
| Ask you a question | `ask_user_question` | It is the agent's choice to ask. |

Workspaces isolate git state, not processes. A new workspace is a git worktree that keeps the agent's
changes off your checkout; it does not contain a misbehaving command. Review changes before they leave the workspace. See
[Workspaces and isolation](../workspaces/workspaces-and-isolation.md) and
[Review changes](../review/review-changes.md).

A user-level `pi` extension can add its own gate to tool calls; `pi` ships examples such as a permission
gate for risky shell commands.

> [!WARNING]
> Unverified: ThinkRail does not ship or test such an extension, and how it behaves in subagents was not
> checked.

## Trust

A repository can ship skills, `pi` extensions, and MCP servers that would change what the agent is told or
run code on your machine. None of it loads until you trust the project, and each repository MCP server
also needs its own approval. Trust is consent, not a sandbox or a security scan. See
[Trust model](trust-model.md) and [Trust a project](trust-a-project.md).

The host has no authentication: anyone who can reach its port controls it. The CLI and desktop app listen
on localhost by default; keep the host on localhost or a private network. See
[Run ThinkRail on a remote machine](../run/run-on-a-remote-machine.md).

## Telemetry

ThinkRail sends usage data (telemetry) in two tiers. What each event contains is listed in
[Privacy and analytics](privacy-and-analytics.md).

- **Basic events** — launches, chat creation, message sends, provider connections. Always on in packaged
  builds.
- **Additional usage data** — setup progress, agent runs, plan and review activity, pull-request outcomes,
  and how you found ThinkRail. Controlled by **Share additional usage data**, which starts on in the
  first-run dialog. Additional events can start while that dialog is still open.

How to turn it off:

| Scope | How | Effect |
| --- | --- | --- |
| One person | **Settings → Privacy → Share additional usage data** off | Additional events stop until switched back on |
| One CLI run | `thinkrail --no-analytics` | Additional events stop for that run; the saved choice is unchanged |
| A team | Set `THINKRAIL_NO_ANALYTICS=1` in the environment ThinkRail starts from, through a managed shell profile or your device management | Additional events and the website link never start, even while the first-run dialog shows the switch on |
| A team, basic events too | Also set `THINKRAIL_POSTHOG_HOST` to an analytics host you run | Every event goes to that host instead of PostHog |
| Everything | [Build ThinkRail from source](../run/build-from-source.md) | A source build has no analytics key and sends nothing |

The honest limit: in a packaged build, basic events still report unless you redirect them with
`THINKRAIL_POSTHOG_HOST`. ThinkRail has no policy file or admin console. Set the variables before the
first launch, and note that the desktop app does not read `THINKRAIL_` variables from your shell profile.
See [Turn off usage data (telemetry)](manage-privacy.md#for-a-whole-team).

## Installers and signing

The Windows CLI and desktop setup are signed by JetBrains. The macOS CLI is signed but not yet notarized,
and the macOS desktop DMG is signed and notarized only from JetBrains' release service pipeline; older
DMGs can be unsigned. Linux builds are unsigned; check them against the published `SHA256SUMS`. The
CLI installers verify that checksum for you. See
[Platform support](../run/platform-support.md#signing-and-notarization).

## License, maturity and support

- **License.** ThinkRail is open source under the Apache License 2.0. It is free; you pay your model
  provider.
- **Maturity.** ThinkRail is a JetBrains incubator project at version 0.x. The repository publishes no
  support or stability policy for 0.x releases.
- **Channels.** Stable releases (`v0.1.x`) are the default install. Nightly builds are published most days
  as GitHub pre-releases and carry everything merged since the last stable. See the
  [Changelog](../changelog.md).
- **Support.** Report bugs and request features in
  [GitHub issues](https://github.com/JetBrains/thinkrail/issues).
- **Vulnerabilities.** Report a vulnerability privately to the maintainers, not in a public issue.

> [!WARNING]
> Unverified: the repository has no `SECURITY.md` and documents no private reporting channel. Whether
> GitHub's private vulnerability reporting is enabled for the repository was not confirmed.

## Related

- [Trust model](trust-model.md)
- [Privacy and analytics](privacy-and-analytics.md)
- [Turn off usage data (telemetry)](manage-privacy.md)
- [Tools the agent can call](../agent/agent-tools.md)
- [Files and environment](../reference/files-and-environment.md)
- [Platform support](../run/platform-support.md)
