---
title: MCP configuration
description: Where mcp.json lives, the schema of a server entry, the presets in Settings, call confirmation, repository approvals, sign-in, and logs.
type: reference
status: complete
---

ThinkRail connects to [Model Context Protocol](https://modelcontextprotocol.io) servers through the MCP
support built into `pi`. `pi` owns the connections, OAuth, and tool exposure; ThinkRail adds a management
page, approvals for servers that a repository defines, and a confirmation prompt for calls that may change
data. This page covers the configuration files and the behavior around them. For the task-oriented guide,
read [Connect MCP servers](../how-to/connect-mcp-servers.md).

> [!NOTE]
> ThinkRail has no `pi` executable, so the `pi mcp add` and `pi mcp login` shell commands from the `pi`
> documentation are not available. Use **Settings → MCP servers**, edit the files below, or use `/mcp` in a
> chat.

## Configuration files

| Scope | File | Applies to | Loaded when |
| --- | --- | --- | --- |
| User | `mcp.json` in the `pi` agent directory, by default `~/.pi/agent/mcp.json` (set `PI_CODING_AGENT_DIR` to move it) | Every project on this host | Always |
| Project | `.pi/mcp.json` in the workspace | Chats in that project | The project is trusted, and each entry is approved |

Keep personal servers and servers that need credentials in the user file. Use the project file for servers
the repository needs, since it is committed with the code.

A project entry with the same name as a user entry replaces it. A project entry with none of `command`,
`url`, or `type` is an **override**: it can set only `enabled`, `exposure`, and `toolExposure` on the
user-level server of the same name and keeps everything else, including `env`, `headers`, and `auth`.

```json
{
  "mcpServers": {
    "internal-tools": { "enabled": false }
  }
}
```

A changed file reaches a running chat at its next idle reload; a busy chat waits until it is idle.
Invalid entries are reported and skipped without stopping other servers from loading. Settings shows an
unreadable file or a file without a valid `mcpServers` object as a file-level error.

## File format

The file is a JSON object with a `mcpServers` object that maps server names to entries.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "docs": {
      "url": "https://example.com/mcp",
      "headers": { "Authorization": "Bearer ${DOCS_TOKEN}" },
      "description": "Search and read the product documentation"
    }
  }
}
```

**Server names** may contain only letters, digits, `_`, and `-`. Names that differ only in `-` versus `_`
count as the same server, and a second one is rejected. A server's tools are named
`mcp__<server>__<tool>`.

### Entry fields

An entry is a stdio server (it has `command`) or a streamable HTTP server (it has `url`). The legacy
`sse` transport is rejected.

| Field | Type | Applies to | Description |
| --- | --- | --- | --- |
| `command` | string | stdio | One executable, not a shell string. A leading `~/` means your home directory. |
| `args` | string[] | stdio | Arguments, one per element. Never split by a shell. |
| `env` | object (string values) | stdio | Environment variables for the process. |
| `cwd` | string | stdio | Working directory. A relative path resolves against the chat's directory. |
| `url` | string | HTTP | The server's streamable HTTP endpoint; `http:` or `https:`. |
| `headers` | object (string values) | HTTP | Request headers. |
| `oauth` | object | HTTP | OAuth client settings; see [OAuth](#oauth). |
| `auth` | object | HTTP | `{ "provider": "<name>" }`, using a `pi` provider's credentials. Allowed only in the user file, and only for `https` URLs or loopback addresses. |
| `type` | string | both | Optional. `stdio`, `http`, or `streamable-http`. `command` or `url` selects the transport when it is omitted. |
| `timeout` | number | both | Per-request timeout in seconds. Positive. Default: 60. |
| `enabled` | boolean | both | `false` keeps the entry without connecting. |
| `exposure` | string | both | How tools reach the model; see [Tool exposure](#tool-exposure). |
| `toolExposure` | object | both | Per-tool exposure. Keys are tool names or patterns where `*` matches any characters. |
| `description` | string | both | One sentence about what the server offers. It lists the server for the model and for tool search. |

`env` and `headers` values can reference environment variables as `${NAME}`. A value can also be a command
that produces the value, written as a `!` prefix that makes up the whole value:

```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/readonly",
      "headers": { "Authorization": "!echo Bearer $(gh auth token)" }
    }
  }
}
```

Commands run on the host. Prefer `${NAME}` references over literal secrets; Settings warns when a value
looks like a secret.

### Tool exposure

`exposure` decides how the model reaches a server's tools.

| Value | Behavior |
| --- | --- |
| `deferred` | The default in ThinkRail. Tools are not declared up front; the agent loads them through `tool_search` when it needs them. |
| `direct` | Tools are declared to the model up front, like built-in tools. Best for small, frequently used servers. |
| `hidden` | Tools are registered but unreachable. |

`codemode` and `codemode-deferred` are valid values in the file format, but ThinkRail does not ship the
codemode runtime and treats them, and an unset value, as `deferred`. `toolExposure` overrides the server's
value for individual tools; an exact tool name beats a pattern, and among patterns the first match wins.

```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/",
      "exposure": "deferred",
      "toolExposure": { "search_code": "direct", "delete_*": "hidden" }
    }
  }
}
```

### OAuth

HTTP servers that use OAuth need no credentials in the file. When a server rejects an unauthenticated
connection, its row shows **Needs sign-in**. Servers that support dynamic client registration need nothing
else; for others, configure a registered client in `oauth`:

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | string | Registered client id. |
| `clientSecret` | string | Optional secret. May use `${NAME}` or a `!command`. |
| `callbackPort` | integer | Loopback port, 1 to 65535. The redirect URI is `http://127.0.0.1:<port>/callback`. |
| `callbackUrl` | string | Redirect URI. Must be `http` on `localhost`, `127.0.0.1`, or `[::1]`, with no query or fragment. |
| `scope` | string | Space-separated scopes, for servers that do not advertise theirs. |
| `clientName` | string | Name to register under, for servers that accept only known clients. |
| `clientRegistration` | `dcr` \| `cimd` | `cimd` identifies `pi` by a client metadata document instead of registering. It cannot be combined with `clientId` or `clientName`. |
| `authServerMetadataUrl` | string | Metadata document of the right authorization server, when the server advertises the wrong one. `https`, or `http` on a loopback address. |

A running chat uses new credentials on its next turn. `pi` stores tokens, not ThinkRail:

| File | Purpose |
| --- | --- |
| `~/.pi/agent/mcp-auth.json` | OAuth tokens (inside the `pi` agent directory). |
| `~/.pi/agent/mcp.log` | Messages that servers send, one entry per message. Moves to `mcp.log.1` after 5 MB. |

Credentials belong to a server name and URL. Servers with the same URL under different names sign in
separately.

## Presets

**Settings → MCP servers** lists presets in its empty state and in the **Presets** section of the **Add a
server** dialog. A preset prefills the form and still goes through the confirmation step.

| Preset | Endpoint | Exposure | Notes |
| --- | --- | --- | --- |
| Context7 | `https://mcp.context7.com/mcp` | `direct` | Current library and framework documentation. No sign-in. |
| DeepWiki | `https://mcp.deepwiki.com/mcp` | `direct` | Questions about public GitHub repositories. No sign-in. |
| Linear (read-only) | `https://mcp.linear.app/mcp/readonly` | default | Read-only endpoint. Sign in after adding. |
| Sentry | `https://mcp.sentry.dev/mcp` | default | Issues, events, and releases. Sign in after adding. Flagged as able to modify data. |
| Playwright | `npx -y @playwright/mcp@0.0.83` | default | Drives a browser on the host. Added disabled; you turn it on per project. Flagged as able to modify the sites its browser opens. |

All presets are added at user scope. The same dialog has a **GitHub** recipe under **Paste JSON**
(labeled "Not a preset"): the read-only GitHub endpoint with an `Authorization` header built from your
GitHub CLI token, which needs `gh` signed in on the host.

## Managing servers in Settings

**Settings → MCP servers** needs an open workspace. Each row shows the server name, a scope tag (**User**
or **Project**), the transport (**stdio** or **HTTP**), an exposure menu, a status, an on/off switch, and a
menu with the actions available for its state.

Status labels: Starting, Connected, Needs sign-in, Failed, Disconnected, Disabled, Disabled in this
project, Disabled in this chat, Pending approval, Invalid config, Pending reload, Not running, Handled
elsewhere, and Unknown. Actions that can appear include **Sign in**, **Review & approve**, **Edit**,
**Test connection**, **Reconnect**, **Reload now**, **Open a chat**, **Show log**, **Share with repo**, and
**Remove**.

- **Add a server** and **Import mcpServers JSON** open the **Add MCP servers** dialog with **Form** and
  **Paste JSON** tabs. Choose scope **User — all projects** or **Project — .pi/mcp.json**. A server that
  runs a command or carries secrets goes through a **Confirm what will run** step before it is saved.
- **Share with repo** writes a project override entry for a user-level server so that the repository can
  record its enabled state or exposure.
- **Show log** shows the latest 200 lines of that server's messages from `mcp.log`, with credential-looking
  values masked.
- Secret-looking values and endpoint credentials are masked in the page, in logs, and in error text.
- Writes keep unknown keys and indentation and replace the file atomically. The host refuses to write a
  project file when `.pi` or `mcp.json` is a symbolic link, with error `MCP_PATH_UNSAFE`. An invalid config
  is refused with `MCP_CONFIG_INVALID`.
- If another extension has taken over `/mcp`, or `pi` settings contain `-builtin:mcp`, management in
  Settings is read-only and the code is `MCP_HANDLED_ELSEWHERE`.

In a chat, **Resources** lists MCP servers with **Enable in this chat** and **Disable in this chat**, which
restart that chat's servers when it is idle, and **Sign in**. Chat-level choices are not saved.

## Repository-defined servers and approval

A server in the project's `.pi/mcp.json` can run commands on your machine, so two separate consents gate
it:

1. **Project trust.** The project must be trusted at the `pi`-resource level. See
   [Trust a project](../how-to/trust-a-project.md) and [Trust model](../explanation/trust-model.md).
2. **Per-entry approval.** Even in a trusted project, each repository entry stays **Pending approval**
   until you choose **Review & approve** and confirm what it will run: where it connects, its working
   directory, and the names of its environment variables.

Approval is stored per project in `projects.json` in the ThinkRail data directory (`~/.thinkrail`, or
`THINKRAIL_DATA_DIR`) under `mcpApprovals`, which maps each server name to a SHA-256 fingerprint of the
whole entry as written. If the entry changes in any way, including a reordering of `toolExposure`, its
fingerprint no longer matches, the row shows **Changed since approval**, and the server stops loading until
you approve it again. Repository override entries are approved the same way. Per-project switches for
user-level servers are kept in `mcpOverrides` in the same file and are not part of the repository.

User-level servers are not gated by trust or approval.

## Call confirmation

Before any `mcp__<server>__<tool>` call, ThinkRail checks the tool's `readOnlyHint` annotation. A tool that
declares `readOnlyHint: true` runs without asking. For any other MCP tool, the chat shows "Allow the MCP
call `<server>/<tool>`? It may change data." with a preview of the arguments (first 160 characters) and
three answers:

| Answer | Effect |
| --- | --- |
| **Deny** | The call is blocked and the agent is told you denied it. |
| **Allow once** | The call runs. |
| **Allow in this chat** | The call runs, and later calls to the same tool in this chat run without asking. The grant is not saved and ends with the chat. |

> [!NOTE]
> Builds after `0.2.0-nightly.33` ask in the chat next to the tool call and add an **Always allow** answer
> that remembers the approval ([#749](https://github.com/JetBrains/thinkrail/pull/749)). This page describes
> the behavior up to `0.2.0-nightly.33`.

Dismissing the prompt, stopping the run, or having no interface attached blocks the call. Sending a steer
message cancels any confirmations that are waiting. The prompt covers MCP tools only; the tool search and
resource tools are not named `mcp__...`, and `pi` marks the resource tools read-only.

Subagents cannot call MCP tools at all. The parent calls them and passes the results in the task text.

## Sign-in

**Sign in** on a row, `/mcp login <name>` in a chat, and the same in the chat's server list all start an
OAuth flow. Settings returns the authorization URL to your browser; a chat never opens a browser on the
host. If your browser runs on a different machine from the host, paste the redirected URL back into the
sign-in screen. A per-server lock allows one sign-in at a time and reports "A sign-in for `<name>` is
already running in Settings" (or "in a chat") otherwise. **Sign out** deletes the stored credentials.

## Logs and diagnostics

| What | Where |
| --- | --- |
| Messages a server sends | `~/.pi/agent/mcp.log`, and `mcp.log.1` after rotation. Use **Show log** on the row. |
| Connection errors and a failed stdio server's stderr tail | The row's status detail, masked. |
| **Test connection** | Row menu action for HTTP servers that are in effect; probes the connection from Settings. |
| Host logs | `~/.thinkrail/logs/`; see [Files and environment](files-and-environment.md). |

MCP results appear in chat as bounded cards that summarize content blocks by kind, URI, type, and size and
never embed image or audio data.

## Related

- [Connect MCP servers](../how-to/connect-mcp-servers.md)
- [Trust a project](../how-to/trust-a-project.md)
- [Trust model](../explanation/trust-model.md)
- [Agent tools](agent-tools.md)
- [`pi` MCP documentation](https://pi.dev)
