---
title: Update and uninstall ThinkRail
description: Update the desktop app from Settings, update the thinkrail CLI in place, switch channels, and remove ThinkRail while keeping or deleting your app state.
type: how-to
status: draft
---

Keep ThinkRail current from inside the app or from the command line, and remove it cleanly when you are done. Updates never touch your projects: your state lives in `~/.thinkrail` and `pi`'s own state in `~/.pi`.

## Before you begin

- Know which form you installed. The desktop app updates through **Settings → Updates**. The CLI updates with `thinkrail update` or the **Run Update** button.
- Close or finish running agent turns before you restart the app or host.

## Update the desktop app

Packaged stable and nightly desktop builds check for updates in the background about every six hours and never download without you asking.

1. Open **Settings → Updates**. The top bar also shows an **Update available** button when a release is ready.
2. Select **Check for Updates** to look right now.
3. When the page reads that a version is available, select **Download**. The button label then follows the progress: **Downloading** with a percentage, then **Preparing update**.
4. When the update is ready, select **Install & Restart**.

After the app restarts, if the window is blank or reads **Disconnected**, see [Troubleshoot](troubleshoot.md#disconnected-or-blank-after-an-update).

Nothing is applied until you choose **Install & Restart**. Closing Settings leaves the update waiting, and quitting ThinkRail normally does not install it. You cannot cancel a download once it starts.

> [!NOTE]
> The **Updates** page appears only in packaged builds that carry a valid HTTPS update feed. If you installed a build that predates that feed, or run from source, install the latest release manually once. See [Install ThinkRail](../get-started/install.md).

## Update the CLI

### From the app

Installed stable and nightly CLI hosts check GitHub every six hours. When a newer version exists, **Settings → Updates** shows **Run Update**.

1. Open **Settings → Updates**.
2. Select **Run Update**. It runs `thinkrail update` on the machine that hosts ThinkRail, even if you opened the UI from another machine.
3. When the update finishes, restart the host manually. The page says when the new version is installed.

If the update fails, select **Retry** or use the manual command shown on the page.

### From the command line

```bash
thinkrail update
```

This re-runs the published installer for the channel you installed and replaces `<prefix>/bin/thinkrail`. To switch channels or pin a version, pass flags:

```bash
thinkrail update --channel nightly
thinkrail update --channel stable --version 0.1.2
```

A pinned version must belong to the selected channel. Restart `thinkrail` afterward so the new binary is the one running.

If the page is blank or the top bar reads **Disconnected** after an update, see
[Disconnected or blank after an update](troubleshoot.md#disconnected-or-blank-after-an-update).

> [!WARNING]
> A binary outside the `<prefix>/bin/thinkrail` layout cannot self-update safely. Reinstall it with the installer or replace it manually from the [releases page](https://github.com/JetBrains/thinkrail/releases). Running `thinkrail update` from a source checkout installs a published binary; it does not pull or rebuild your checkout.

## Switch from stable to nightly

Stable is the default channel. Nightly builds are published roughly daily as pre-releases.

- **CLI.** Run `thinkrail update --channel nightly`, then restart `thinkrail`. To go back, run
  `thinkrail update --channel stable`. Pinning a version with `--version` works only within the channel you select.
- **Desktop app.** Each desktop build follows the channel it was built for, shown on **Settings → Updates** as
  the **channel** next to the version. To change channel, download the other channel's desktop build from the
  [releases page](https://github.com/JetBrains/thinkrail/releases) and install it. See
  [Install ThinkRail](../get-started/install.md#choose-a-channel-or-pin-a-version).

Your projects, workspaces, and settings are shared by both channels, because they live in `~/.thinkrail`. Back
them up first if you want a restore point. See [Back up or move to a new machine](back-up-or-move.md).

> [!WARNING]
> Unverified: how a second desktop channel installs next to or over the first, and whether a stable build reads
> state a nightly build wrote. The repository does not specify either.

## Uninstall the CLI

```bash
thinkrail uninstall
```

The command removes the executable, the `PATH` entry the installer added, the install metadata, and the binary's staging cache. It asks whether to delete your app state. Use flags to answer ahead of time:

| Flag | Effect |
| --- | --- |
| `--keep-data` | Keep `~/.thinkrail`. This is the default. |
| `--remove-data` | Also delete `~/.thinkrail`: projects, workspaces, and the git worktrees under it. |
| `-y`, `--yes` | Ask nothing. Required when input is not a terminal. Keeps your data unless `--remove-data` is also given. |

`--keep-data` and `--remove-data` cannot be combined. Each removal is reported as `removed`, `kept`, `not found`, or `failed`, and any failure makes the command exit with status 1.

> [!CAUTION]
> `--remove-data` deletes the worktrees ThinkRail created, including uncommitted work in them. Commit or push anything you want to keep first. Branches that were already committed survive in your original repository.

`thinkrail uninstall` never touches `~/.pi`, so your provider credentials, chat transcripts, and `pi` settings stay.

## Uninstall the desktop app

`thinkrail uninstall` removes only the CLI. Remove the desktop app with your operating system's usual method, and delete `~/.thinkrail` yourself if you want a clean slate.

> [!WARNING]
> Unverified: this page does not document the OS-level uninstall steps for the desktop app, which the repository does not specify.

## Check that it worked

- After an update, run `thinkrail --version`, or open **Settings → Updates** and read the version line, which shows the version and channel (it starts with **Version** in the desktop app and **Current** for a CLI host).
- After an uninstall, `thinkrail --version` reports that the command is not found in a new shell. The command output lists each item it removed or kept.

## Related

- [Troubleshoot ThinkRail](troubleshoot.md), including a blank or disconnected page after an update
- [Back up or move to a new machine](back-up-or-move.md)
- [Install ThinkRail](../get-started/install.md)
- [CLI reference](../reference/cli.md)
- [Files and environment](../reference/files-and-environment.md) for what lives in `~/.thinkrail` and `~/.pi`
- [Changelog](../changelog.md)
