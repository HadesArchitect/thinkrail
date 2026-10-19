---
title: Connect MCP servers
description: Add Model Context Protocol servers from Settings or mcp.json, approve repository-defined servers, sign in with OAuth, and control tool calls per chat.
type: how-to
status: draft
---

Give the agent extra tools by connecting Model Context Protocol (MCP) servers. ThinkRail uses the MCP support built into `pi`: `pi` owns connections, OAuth, and tool exposure, and ThinkRail adds the management screen, approvals, and a confirmation step for calls that may change data.

## Before you begin

- Open a workspace. **Settings → MCP servers** needs one: it shows "Open a workspace to manage its MCP servers" otherwise.
- Servers run on the host that runs ThinkRail and inherit its environment. Add only servers you trust.

## Add a server from Settings

1. Open **Settings → MCP servers** and select **Add a server**, or **Import mcpServers JSON** to paste an existing config.
2. Choose where it applies: **User — all projects**, or **Project — .pi/mcp.json**. Project servers load only after you trust the project.
3. Fill in the **Form** tab, or switch to **Paste JSON**.
   - For a **stdio command**, enter one executable in **Command** and one argument per line in **Arguments**. Arguments are never split by a shell.
   - For an **HTTP URL**, enter the server's streamable HTTP endpoint and any headers.
4. Review the "Confirm what will run" step and save.

Or start from a preset: **Context7** (library docs), **DeepWiki** (public GitHub repositories), **Linear (read-only)**, **Sentry**, and **Playwright**. Linear and Sentry need sign-in after you add them. Playwright is added disabled and drives a browser on the host.

## Add a server by editing `mcp.json`

`pi` reads two files. A project entry with the same name replaces the user entry.

| Scope | File |
| --- | --- |
| User | `~/.pi/agent/mcp.json` (follows `PI_CODING_AGENT_DIR`) |
| Project | `<worktree>/.pi/mcp.json`, committed to git |

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "exposure": "direct"
    },
    "files": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"],
      "env": { "LOG_LEVEL": "info" }
    }
  }
}
```

Names use letters, digits, `-`, and `_`. `exposure` is `deferred` (the default: tools load through tool search when needed), `direct` (declared to the model up front), or `hidden`. See [MCP configuration](mcp-configuration.md) for every field.

## Approve a repository-defined server

A server in a repository's `.pi/mcp.json` stays off until you approve it, even in a trusted project.

1. Trust the project if prompted. See [Trust a project](../security/trust-a-project.md).
2. In **Settings → MCP servers**, find the server marked **Pending approval**.
3. Select **Review & approve**, check what it connects to or runs, and confirm.

If the entry changes later, it shows "Changed since approval" and needs approval again.

## Sign in to an OAuth server

1. In **Settings → MCP servers**, find a server marked **Needs sign-in**.
2. Select **Sign in** and finish authorizing in the browser page that opens.
3. To revoke, open the row's menu and choose **Sign out**.

You can also type `/mcp login <name>` in a chat. Only one sign-in per server runs at a time. If you use ThinkRail from a browser on another machine, the sign-in supports pasting the redirect back.

## Control tool calls

When a tool does not declare itself read-only, ThinkRail asks before each call: "Allow the MCP call server/tool?" with three answers.

| Answer | Effect |
| --- | --- |
| **Deny** | The call is blocked. |
| **Allow once** | This call runs. |
| **Allow in this chat** | That tool runs without asking for the rest of this chat. Never saved. |

Read-only tools run without asking. Closing the dialog blocks the call. Builds after `0.2.0-nightly.33`
add an **Always allow** answer that remembers the approval; see
[MCP configuration](mcp-configuration.md#call-confirmation).

## See and disable servers per chat

Open **Resources** in the chat header. Each MCP server appears with its status. Choose **Disable in this chat** or **Enable in this chat**; the change applies when the chat is idle. **Sign in** there opens the matching Settings page. Subagents cannot call MCP tools.

## Check that it worked

- The server row shows **Connected**, with a tool count, or select **Test connection**.
- For a deferred server, ask the agent to use it; the agent finds its tools through `tool_search` first.
- A failed server shows **Failed**; select **Show log** or read `~/.pi/agent/mcp.log`.

## Related

- [MCP configuration reference](mcp-configuration.md)
- [Trust a project](../security/trust-a-project.md)
- [Use existing skills](use-existing-skills.md)
- [Trust model](../security/trust-model.md)
