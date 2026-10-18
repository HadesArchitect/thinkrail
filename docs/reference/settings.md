---
title: Settings reference
description: Every Settings page and option in ThinkRail, in UI order, with what each does, its default, where it is stored, and how far it reaches.
type: reference
status: complete
---

Open **Settings** from the gear in the top bar. The left navigation groups pages under **Agent**, **Interface**, and **System**, with a **Get 100 credits for a user interview** button at the bottom that opens the **Feedback** page. This page lists the pages in that order.

## How to read the tables

The **Scope** column says how far a setting reaches and where it is stored.

| Scope | Meaning |
| --- | --- |
| Global (host) | Saved on the host in `~/.thinkrail/config.json`. It applies to every project and workspace on that host, and follows you across browsers and devices that connect to it. |
| Global (browser) | Saved in this browser or desktop profile. It does not follow you to another browser, device, or host. |
| This window (browser) | Saved in this browser or desktop profile for the current window only. |
| Global (`pi`) | Saved in `pi`'s own files under `~/.pi`, so the `pi` CLI sees it too. |
| Project | Applies to one project. |
| Workspace | Applies to one workspace and overrides the global value until you reset it. |

> [!NOTE]
> Some pages and options appear only when the host is new enough to support them. If a page described here is missing, the host is older than the app. **Updates** appears only when the app supplies update content: in the desktop app, and on a CLI host that can update itself.

Settings that change the model or the provider affect new chats. A chat that is already running keeps its model, effort, and context settings.

## Models

Part of **Agent**. Choose the models your chats use and review with.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Default model → Chat model** (model and effort pickers) | The model and reasoning effort that new chats start with. | The first available model; effort `medium` | Global (host) |
| **Visible models** | Hide models from every model picker. A switch **Show \<model\>** per model, a search box (**Search models…**), and a summary such as "2 models hidden. New models are shown automatically." The model a chat currently uses always stays visible. | All models visible | Global (browser) |
| **Review → Review model** (model and effort pickers) | The model and effort used when a plan or work is reviewed. | **\<default model\> (Default)**, which follows the chat model | Global (host) |
| **Review → Agent-triggered review** | Lets the agent review completed work by registering its `request_review` tool. Hidden on older hosts. | Off | Global (host) |
| **Review → Automatic fix cycle** | Sends the reviewer's requested changes back to the agent once. | Off | Global (host) |
| **GPT context window → Global** | Override the context window of OpenAI Responses and Codex-style models whose limit is the 272,000-token minimum. Choose **Default**, **1M**, or **Custom** (272,000 to 1,000,000 tokens). Larger contexts can raise cost or quota use. | **Default** (the catalog limit) | Global (`pi`), in `models.json` |
| **GPT context window → By each model** | The same choice for a single model. | **Default** | Global (`pi`), in `models.json` |

New chats use updated context limits. Existing chats may need a host restart. See [Choose models](../how-to/choose-models.md).

## Providers

Part of **Agent**. Connect at least one provider so the agent can run. **Refresh** re-reads the provider status.

| Section | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Connected** | Providers that are ready, with how they authenticate. **Sign out** removes a login made in the app. A provider configured through an environment variable, `models.json`, or JetBrains AI shows **Managed** instead. | Empty | Global (`pi`) |
| **JetBrains AI** | Connect, update, or disconnect JetBrains AI through the `central` CLI on the host. The card shows install, sign-in, and proxy actions as needed (**Recheck**, **Update**, **Connect**, **Disconnect**, **Start proxy**, **Sign in**). | Not connected | Host (managed by `central`) |
| **JetBrains AI → Show quota in top bar** | Show remaining JetBrains AI credits next to the connection status. | On | Global (host) |
| **JetBrains AI → Refresh every (sec)** | How often to refresh the quota. A whole number from 1 to 3600. | 30 | Global (host) |
| **Subscriptions** | **Sign in** with an existing Claude, ChatGPT, or Copilot plan, or add an **API key** instead. | none | Global (`pi`) |
| **Available (N)** | Providers that take an API key. The first eight are listed; **Show N more** lists the rest. | none | Global (`pi`) |

Credentials are stored by `pi` in `~/.pi/agent/auth.json`, never by ThinkRail. See [Connect a model provider](../how-to/connect-a-provider.md).

## MCP servers

Part of **Agent**. Manage the Model Context Protocol servers available to chats in the active project. It needs an open workspace. A server runs on the host and inherits its environment.

| Control | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Add a server** / **Import mcpServers JSON** | Add a server from a form or by pasting JSON, as **User — all projects** or **Project — .pi/mcp.json**. | No servers | Global (`pi`) or Project |
| Presets | One-click entries: Context7, DeepWiki, Linear (read-only), Sentry, Playwright. | none | Global (`pi`) or Project |
| Row switch **Enable \<name\>** / **Disable \<name\>** | Turn a server on or off. For a user-level server the switch applies to this project only. | On | Global (`pi`) or Project |
| Exposure chip | **Deferred** loads tools through tool search when needed, **Direct** declares them up front, **Hidden** registers them but keeps them out of reach. | Deferred | Global (`pi`) or Project |
| Row actions | **Sign in**, **Review & approve**, **Edit**, **Test connection**, **Reconnect**, **Reload now**, **Show log**, **Share with repo**, **Remove**. | none | Same as the server |
| **Review & approve** | Approve a server a repository defines in `.pi/mcp.json` before chats can start it. | Pending approval | Project |

User servers live in `~/.pi/agent/mcp.json`; project servers live in the repository's `.pi/mcp.json` and load only when the project is trusted and each entry is approved. The file format, exposure modes, and call approvals are in [MCP configuration](mcp-configuration.md) and [Connect MCP servers](../how-to/connect-mcp-servers.md).

## Prompt templates

Part of **Agent**. Manage the Markdown prompt templates you run as slash commands.

| Control | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Global templates** (**New**, **Add starter templates**) | Templates available in every project, stored as `.md` files in `~/.pi/agent/prompts/`. **Add starter templates** creates the starters `review`, `explain`, `tests`, `commit`, and `rename` when none exist. | None | Global (`pi`) |
| **Project templates** | Templates for the active project, stored in `.pi/prompts/` in the workspace. Needs an open project. | None | Project |
| Row actions **Open as file**, **Edit**, **Delete** | Open the file in a tab, edit its fields, or remove it (**Delete \<name\>?** asks for confirmation). | none | Same as the template |
| Template editor fields | **Name** (the slash command), **Scope** (**Global** or **This project**), **Description**, **Argument hint**, **Body**. The body supports `pi`'s `$1`, `$ARGUMENTS`, and `${1:-default}` placeholders. | none | Same as the template |

## Chat

Part of **Interface**. How chats look and behave.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Message order** | **Oldest first** shows early messages at the top. **Newest first** reverses the transcript. | Oldest first | Global (browser) |
| **Composer size** | How tall the message box can grow before it scrolls: **Compact**, **Roomy**, or **Half chat**. | Half chat | Global (host) |
| **Line width** | Maximum characters per line in chat, 40 to 240. | 120 | Global (host) |
| **Fit to pane** | Wrap lines shorter when the pane is narrow. | On | Global (host) |
| **Streaming response movement → Settle position** | Where the newest edge of a growing answer lands, as a percent from the top of the chat. 25 to 90, in steps of 5. | 75 | Global (browser) |
| **Streaming response movement → Trigger position** | Where the chat starts to move while an answer grows. 35 to 100, in steps of 5, at least 10 above Settle. | 100 | Global (browser) |
| **Subagents → Allow subagents** | Let chats delegate work to specialized agents. Work already running always finishes. | On | Global (host) |
| **Subagents → Per chat at once** | How many subagents run at the same time in one chat. More wait in line. 1 to 16. | 4 | Global (host) |
| **This workspace → Allow subagents** | Override the global switch for the active workspace. The tag shows **Global** until you change it, then **Custom**; click **Custom** to return to the global value. | Follows global | Workspace |
| **This workspace → Per chat at once** | Override the limit for the active workspace. Leave empty to follow the global value. | Follows global | Workspace |

The **This workspace** rows appear only while a workspace is active, and the subagent rows only on hosts that support them. See [Delegate to subagents](../how-to/delegate-to-subagents.md).

## Appearance

Part of **Interface**. Theme and editor text width.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Theme mode** | **System** follows your operating system's light or dark setting. **Light** and **Dark** fix the appearance. System is offered only when the host supports it. | Dark (fixed) | Global (host) |
| **Current on this device** | Read-only. Shows which appearance and theme System mode resolves to right now. Shown in System mode. | none | none |
| **Theme pair** | In System mode, pick the **Light theme** and **Dark theme** used for each appearance. | Derived from the current theme | Global (host) |
| **Theme** | In Light or Dark mode, pick one theme: Dark, Light, Minimal Dark, Minimal Light, High Contrast Dark, High Contrast Light. | Dark | Global (host) |
| **Contrast level** | **Default** or **High**. Switches to the high-contrast variant of the current theme or pair. | Default | Global (host) |
| **Editor → Line width** | Maximum characters per line in files and diffs, 40 to 240. | 120 | Global (host) |
| **Editor → Fit to pane** | Wrap lines shorter when the pane is narrow. | On | Global (host) |

If a configured theme does not exist in this app version, a warning names the theme ThinkRail uses instead.

## Layout

Part of **Interface**. Panel arrangements for the workbench. Layout changes apply to the current window.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| Preset cards **Balanced**, **Focus**, **Review** | Built-in layouts. Balanced: project tree on the left, review and spec tools on the right, terminal at the bottom. Focus: collapsed sidebars. Review: side-by-side chat panes with review tools. | **Balanced** is the default | Built in |
| **Set default** | Choose the layout that **Reset to default** applies. The card shows **Default**, or **Fallback** when the chosen default no longer exists. | Balanced | This window (browser) |
| **Apply now…** | Rearrange the current window into that layout. Open files and terminals are kept. Confirms with **Apply layout**. | none | This window |
| **Add new layout** | Save the current panel arrangement under a name (up to 200 characters). Up to 32 custom layouts. Custom layouts can be renamed and deleted. | No custom layouts | Global (host) |
| **Reset to default** → **Reset…** | Rearrange this window into the default layout. | none | This window |
| **Advanced → Group limits → Side groups** | Maximum groups per side region for new arrangements, 1 to 32. | 6 | This window (browser) |
| **Advanced → Group limits → Bottom groups** | Maximum groups in the bottom region, 1 to 32. | 3 | This window (browser) |

## Terminal

Part of **Interface**. Options for terminal tabs.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Scrollback** | How much recent output is restored when you reattach to a terminal: **Off**, **16 KB**, **64 KB**, **256 KB**, or **1 MB**. | 64 KB | Global (host) |
| **Windows shell** | The shell for new terminal tabs on a Windows host: **Auto** (PowerShell 7 when installed, otherwise Windows PowerShell), **PowerShell 7** (needs `pwsh`), **Windows PowerShell**, or **Command Prompt**. Shown only for a Windows host. A `SHELL` environment variable on the host always wins. | Auto | Global (host) |

## Workspaces

Part of **System**. When quiet workspaces move out of the way.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Settle idle workspaces after** | A workspace with no chat, terminal command, or commit for this long moves to its project's Settled shelf. Choose **1 day**, **3 days**, **7 days**, **14 days**, or **Never**. With **Never**, only a merged or closed pull request, or **Settle** by hand, moves a workspace. Open pull requests, running agents, and unread results never settle. | 7 days | Global (host) |

See [Manage workspaces](../how-to/manage-workspaces.md).

## Integrations

Part of **System**. Connections to tools on the host.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Local GitHub** | Shows whether the GitHub CLI (`gh`) on the host is authenticated, as **Connected** with your login, or **Not connected**. Run `gh auth login` in a terminal, then use **Refresh**. Needed to create workspaces from remote branches and for one-click pull requests; without it, **Open PR** falls back to GitHub's compare page. | Probed from `gh` | Host (read-only status) |

## Extensions

Part of **System**. The ThinkRail extensions the host gives the agent.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Enable \<extension\>** switch (today: **Visualize**) | Turning an extension off removes its tools from new chats, and from open chats once their current turn ends. Past results still render. | On | Global (host) |

Other bundled capabilities (spec tools, TODO list, workflows, web research, background commands) are not switchable here. See [Extensions](../explanation/extensions.md).

## Notifications

Part of **System**. Alerts when a workspace needs attention.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Enable notifications** | Notify you when a workspace needs your attention. In the desktop app, notifications are delivered by your operating system. | On | Global (host) |
| **Allow in browser** | Shown in a browser when permission is not yet granted. It asks the browser for notification permission. If the browser blocks notifications, **How to enable** lists the steps to allow them in the site settings. | Permission not granted | This browser |

## Privacy

Part of **System**. Usage analytics.

| Option | What it does | Default | Scope |
| --- | --- | --- | --- |
| **Share additional usage data** | Share setup, agent run, task completion, review, and pull-request outcome events, and how you found ThinkRail. Turning it off drops queued additional events. Basic events (launch, chat creation, message sends, provider connections) are not controlled by this switch. Hosts older than the additional-data consent show a **Share anonymous usage analytics** switch instead. | Off until the first-run dialog; the dialog offers it on | Global (host) |

No prompts, code, files, credentials, or account identity are collected. The `--no-analytics` flag and `THINKRAIL_NO_ANALYTICS` variable turn the additional data off for one run without changing this saved choice. See [Privacy and analytics](../explanation/privacy-and-analytics.md) and [Manage privacy](../how-to/manage-privacy.md).

## Updates

Part of **System**. Software updates. The page differs by how you run ThinkRail.

| Control | What it does | Applies to |
| --- | --- | --- |
| **Check for Updates** | Look for a newer release. ThinkRail also checks in the background. | Desktop app |
| **Download** | Download the available update. Downloads and installs start only when you choose them, and a download cannot be cancelled once started. | Desktop app |
| **Install & Restart** | Install the downloaded update and restart. Closing Settings and quitting normally does not install it. | Desktop app |
| **Run Update** | Run `thinkrail update` on the host machine in the background, even when the UI is open in a browser on another machine. After it succeeds, restart the host yourself. **Retry** appears after a failure, along with the manual `thinkrail update` command. | Installed CLI host |
| Version line | Shows the current version and channel (**stable** or **nightly**), and the available version. | Both |

The desktop updater is enabled only for packaged stable and nightly builds whose package carries an update feed. A build that is not connected to an update channel shows **Updates are unavailable**. See [Update and uninstall](../how-to/update-and-uninstall.md).

## Feedback

Opened from the **Get 100 credits for a user interview** button. It describes the product interview offer and has one button, **Schedule an interview**, which opens the booking page in a new tab. ThinkRail also shows an invitation dialog, **Help shape ThinkRail**, after your 10th accepted message; its counters are stored in `~/.thinkrail/feedback.json` and do not depend on analytics.

## Related

- [Keyboard shortcuts](keyboard-shortcuts.md)
- [Files and environment](files-and-environment.md)
- [CLI reference](cli.md)
