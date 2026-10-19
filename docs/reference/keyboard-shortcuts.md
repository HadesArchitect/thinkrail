---
title: Keyboard shortcuts
description: Every keyboard shortcut in ThinkRail by area, with macOS and Windows or Linux keys, and where each one works.
type: reference
status: complete
---

This page lists every shortcut ThinkRail defines. ThinkRail has no keymap file and no way to rebind shortcuts, and there is no command palette. **Cmd/Ctrl+K** opens a session switcher, not a command list.

## Conventions

- **Cmd** is the macOS Command key; the same shortcut uses **Ctrl** on Windows and Linux. "macOS" and "Windows / Linux" columns spell out the difference.
- **Browser** means the app opened by the `thinkrail` CLI in a web browser. **Desktop** means the native app. A row marked "Both" works in each.
- App-wide shortcuts do nothing while a modal dialog is open.
- Your browser reserves some chords, such as **Cmd/Ctrl+N** and **Cmd/Ctrl+W**. That is why ThinkRail offers an alternative for creating a workspace.

## App-wide

| Action | macOS | Windows / Linux | Context |
| --- | --- | --- | --- |
| Create a workspace (opens the **Create workspace** dialog) | **Cmd+N** or **Cmd+Option+N** | **Ctrl+N** or **Ctrl+Alt+N** | Both. Use the Alt variant when the browser keeps **N**. |
| Switch session (open or close the session switcher) | **Cmd+K** | **Ctrl+K** | Both. Pressing it again closes the switcher. |
| Show or hide the left side (Projects) | **Cmd+B** | **Ctrl+B** | Both |
| Show or hide the right side (Specs, Files, Changes, Review, TODO List) | **Cmd+J** | **Ctrl+J** | Both. Needs an active workspace. |
| Show or hide the bottom panel | **Cmd+Shift+J** | **Ctrl+Shift+J** | Both. Needs an active workspace. |
| Open history search; while it is open, cycle its scope | **Ctrl+R** | **Ctrl+R** | Both. The Control key on macOS too. Not handled inside a terminal. |
| Focus the next or previous workbench group | **Ctrl+F6** / **Ctrl+Shift+F6** | **Ctrl+F6** / **Ctrl+Shift+F6** | Both |
| Close the topmost dialog, menu, or overlay | **Esc** | **Esc** | Both |

## Desktop app

These shortcuts exist only in the desktop app.

| Action | macOS | Windows | Linux |
| --- | --- | --- | --- |
| Close the focused item (a tab or the focused panel; never the window) | **Cmd+W** (menu **Window → Close**) | **Ctrl+W** or **Ctrl+F4** | **Ctrl+W** or **Ctrl+F4** |
| Quit | Hold **Cmd+Q** for about 1.2 seconds, or press it twice within half a second | No quit shortcut. Closing the window quits the app. | Hold **Ctrl+Q** for about 1.2 seconds, or press it twice within half a second |
| Open Settings (0.2.0 nightly builds) | **Cmd+,** | **Ctrl+,** | **Ctrl+,** |
| Hide ThinkRail | **Cmd+H** | none | none |
| Hide other apps | **Cmd+Option+H** | none | none |
| Minimize | **Cmd+M** | none | none |
| Zoom the page in | **Cmd++** or **Cmd+=** | **Ctrl++** or **Ctrl+=** | **Ctrl++** or **Ctrl+=** |
| Zoom the page out | **Cmd+-** | **Ctrl+-** | **Ctrl+-** |
| Reset page zoom | **Cmd+0** | **Ctrl+0** | **Ctrl+0** |
| Pinch to zoom the page | Trackpad pinch | none | none |

- A single press of the quit chord does nothing. An on-screen hint, such as "Hold ⌘Q or press twice to quit" on macOS, explains the gesture.
- **Ctrl+W** is not handled inside a terminal on Windows and Linux, so the shell receives it. **Ctrl+F4** and, on Linux, **Ctrl+Q** work in a terminal too.
- Page zoom steps between 50% and 200%.
- **Open Settings** is new in the 0.2.0 nightly line and is not in v0.1.6. It does nothing while another
  dialog is open, and the browser UI binds no Settings shortcut.
- The app menu on macOS also carries the standard **Edit** commands (undo, redo, cut, copy, paste, select all). Windows has an **Edit** menu only.

## Chat composer

| Action | macOS | Windows / Linux | Context |
| --- | --- | --- | --- |
| Send the message (agent idle) | **Enter** | **Enter** | Composer |
| Insert a new line | **Shift+Enter** | **Shift+Enter** | Composer |
| Steer: deliver at the agent's next step (agent running) | **Enter** | **Enter** | Composer |
| Queue as a follow-up after the agent finishes (agent running) | **Cmd+Enter** | **Ctrl+Enter** | Composer |
| Interrupt the current response and send now (agent running) | **Cmd+Shift+Enter** | **Ctrl+Shift+Enter** | Composer. With the agent idle it sends. |
| Recall an older prompt | **Up** | **Up** | Composer, when the draft is empty or already showing a recalled prompt |
| Recall a newer prompt, or clear back to empty | **Down** | **Down** | Composer, while recalling |
| Move in the slash-command menu | **Up** / **Down** | **Up** / **Down** | After typing `/` |
| Pick the highlighted slash command | **Enter** or **Tab** | **Enter** or **Tab** | Slash-command menu |
| Move in the file-mention menu | **Up** / **Down** | **Up** / **Down** | After typing `@` |
| Pick the highlighted file | **Enter** or **Tab** | **Enter** or **Tab** | File-mention menu |
| Close the slash or mention menu | **Esc** | **Esc** | Menu open |
| Jump to the next or previous template placeholder | **Tab** / **Shift+Tab** | **Tab** / **Shift+Tab** | After a prompt template inserted placeholders |
| End placeholder editing | **Esc** | **Esc** | Placeholder editing |

The same placeholder, slash-command, and **Enter** behavior applies to the prompt box in the **Create workspace** dialog, where **Enter** creates the workspace and **Shift+Enter** adds a line. See [Steer and queue messages](../agent/steer-and-queue.md).

## History search

Open it with **Ctrl+R**, or with the **History** button.

| Action | macOS | Windows / Linux |
| --- | --- | --- |
| Move through results | **Up** / **Down** | **Up** / **Down** |
| Insert the selected prompt into the composer | **Enter** | **Enter** |
| Insert the selected prompt and send it | **Cmd+Enter** | **Ctrl+Enter** |
| Jump to the source message of a result | **Shift+Enter** (on a prompt), or **Enter** (on a message) | **Shift+Enter** (on a prompt), or **Enter** (on a message) |
| Switch between the list and the zoomed two-pane view | **Tab** | **Tab** |
| Save the selected prompt as a template | **Cmd+S** | **Ctrl+S** |
| Cycle the scope (This chat, Workspace, Project, Everywhere) | **Ctrl+R** | **Ctrl+R** |
| Close | **Esc** | **Esc** |

## Agent questions

When the agent asks you a question with choices (the `ask_user_question` card):

| Action | Key |
| --- | --- |
| Move between choices | **Up** / **Down**, **Home** / **End** |
| Select a choice, or toggle one in a multiple-choice question | **Space** |
| Confirm the choice | **Enter** |
| Go to the previous or next question (when not typing in a text box) | **Left** / **Right** |
| Skip the questions and cancel | **Shift+Esc** |
| Finish a free-text note | **Enter**, or **Esc** |

These keys are the same on every platform.

## Review and diffs

| Action | macOS | Windows / Linux | Context |
| --- | --- | --- | --- |
| Save a review comment draft | **Cmd+Enter** | **Ctrl+Enter** | Comment box, and when editing a saved comment |
| Cancel a comment | **Esc** | **Esc** | Comment box |
| Mark the current file viewed and advance | **V** | **V** | Focused **Changes** review tab, not while typing or a menu is open |
| Jump to the next unreviewed file | **J** | **J** | Same |
| Go to the next or previous file | **Option+Down** / **Option+Up** | **Alt+Down** / **Alt+Up** | Same |
| Go to the next or previous step of the review guide | **N** / **P** | **N** / **P** | Same |

## Workbench: tabs, rails, and the project tree

These keys work when focus is on the control itself.

| Action | Key | Context |
| --- | --- | --- |
| Select the previous or next tab (wraps around) | **Left** / **Right** | Focused tab in a tab strip |
| Select the first or last tab | **Home** / **End** | Focused tab |
| Activate the focused tab | **Enter** or **Space** | Focused tab |
| Close the focused tab | **Delete** | Focused tab |
| Move the tab left or right | **Option+Shift+Left** / **Right** on macOS, **Alt+Shift+Left** / **Right** on Windows and Linux | Center tab strip and bottom rail |
| Move a tab up or down in a side rail | **Option+Shift+Up** / **Down** on macOS, **Alt+Shift+Up** / **Down** on Windows and Linux | Side rail |
| Move between tool icons on an edge rail | **Arrow keys**, **Home**, **End**; **Enter** or **Space** opens or folds | Focused rail icon |
| Resize a pane | **Arrow keys** | Focused pane separator |
| Open the context menu for a project row | **Context Menu** key or **Shift+F10** | Focused row in the project tree |

## Other contexts

| Context | Behavior |
| --- | --- |
| Terminal | Chords such as **Ctrl+R** go to the shell. The exceptions are the desktop close and quit chords listed above. |
| File viewer | Files open read-only in an editor. Its built-in find (**Cmd/Ctrl+F**) works. |
| Plan page add box | **Enter** adds the item, **Shift+Enter** inserts a new line, **Esc** closes the box. |
| TODO List add box | **Enter** queues the task. |
| Chat tab rename | **Enter** saves the new name, **Esc** cancels. |

## Related

- [Settings reference](settings.md)
- [Steer and queue messages](../agent/steer-and-queue.md)
- [Review changes](../review/review-changes.md)
