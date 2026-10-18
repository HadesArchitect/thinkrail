---
title: Open a workspace in your editor
description: Open a workspace's folder in VS Code, a JetBrains IDE, Emacs, or Vim from ThinkRail, and understand which editors it detects.
type: how-to
status: draft
---

Open any workspace in an editor you already use, so you can edit or inspect the files the agent changed. ThinkRail launches the editor on the machine that runs the host.

## Before you begin

- Install the editor's command-line launcher so it is on your `PATH`. ThinkRail lists only the editors it can find.
- If you run ThinkRail on a remote host, the editor opens on that host, not on the machine where your browser runs.

## Steps

1. In the Projects tool, right-click a workspace row, or select the kebab menu "Actions for" the workspace. You can also open the workspace pill in the top bar.
2. Choose **Open in**.
3. Pick an editor from the submenu.

The editor opens the workspace's folder. For a Vim entry, ThinkRail runs `vim .` in that workspace's embedded terminal instead of launching a separate window.

## Which editors appear

ThinkRail checks for these launchers on the host and shows an entry for each one found:

| Editor | Launcher checked | Kind |
| --- | --- | --- |
| VS Code | `code` | Window |
| Emacs | `emacs` | Window |
| JetBrains IDE | First found of `idea`, `webstorm`, `pycharm`, `goland`, `rider`, `clion`, `phpstorm`, `rubymine` | Window |
| Vim | `vim` | Terminal |

Only one JetBrains entry appears, labelled for the first launcher found in that order: IntelliJ IDEA, WebStorm, PyCharm, GoLand, Rider, CLion, PhpStorm, or RubyMine. The host looks up launchers using your login shell's `PATH`, so tools installed through shell profiles are found even when ThinkRail starts from the Dock or Finder.

If none of these is installed, the **Open in** item does not appear.

Related workspace actions sit in the same menu: **Copy path** copies the folder path, and **Reveal in file manager** opens it in Finder, Explorer, or your Linux file manager.

## Use another editor, such as Cursor or Zed

ThinkRail does not detect Cursor, Zed, or other editors not listed above. A workspace is an ordinary
folder, so open it yourself:

1. In the same menu, choose **Copy path**.
2. Open that folder in your editor, for example `cursor <path>` or `zed <path>` in a terminal, or the
   editor's **Open Folder** command.

Edits you make there show up in ThinkRail's **Changes** tool like the agent's.

## Check that it worked

- The editor opens with the workspace folder as its project, and the folder's branch matches the one shown in ThinkRail.
- If you see "Failed to open in" followed by the editor's name, confirm the launcher runs from a terminal on the host.

## Related

- [Manage workspaces](manage-workspaces.md)
- [Review changes](../review/review-changes.md)
- [Workspaces and isolation](workspaces-and-isolation.md)
