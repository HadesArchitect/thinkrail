---
title: Install ThinkRail
description: Install the ThinkRail desktop app or the thinkrail CLI on macOS, Windows, or Linux, choose the stable or nightly channel, and verify the download.
type: how-to
status: complete
---

Install ThinkRail as a native desktop app, as the self-contained `thinkrail` CLI that opens the same UI in your browser, or both. The two forms are independent, and every release publishes a `SHA256SUMS` file on the [releases page](https://github.com/JetBrains/thinkrail/releases).

## Before you begin

- Install `git` and make sure it is on your `PATH`. ThinkRail creates workspaces with `git worktree`.
- Check your platform. Desktop builds exist for macOS on Apple Silicon, Windows x64, and Linux x64 and ARM64. The CLI also runs on those platforms, except Intel Macs: there is no prebuilt binary for Intel macOS, so [build from source](../develop/build-from-source.md) there.
- Plan to connect a model provider after installing. See [Connect a model provider](connect-a-provider.md).

**Not sure which form to pick?** Install the desktop app. Choose the CLI if you want to run ThinkRail on
a remote machine or prefer to start it from a terminal. You can install both later.

### Which Mac do I have?

The prebuilt desktop app and CLI run only on Macs with Apple Silicon. To check, open the Apple menu and choose **About This
Mac**. If the **Chip** line names Apple M1, M2, or later, you have Apple Silicon. If the window shows a
**Processor** line that names Intel, there is no prebuilt ThinkRail for your Mac; see
[Build from source](../develop/build-from-source.md).

## Install the desktop app

Download the `thinkrail-desktop-*` asset for your platform from the [releases page](https://github.com/JetBrains/thinkrail/releases).

| Platform | Asset | What to do |
| --- | --- | --- |
| macOS (Apple Silicon) | `thinkrail-desktop-darwin-arm64.dmg` | Open the DMG and follow the prompts. |
| Windows x64 | `thinkrail-desktop-windows-x64.zip` | Extract the complete ZIP, then run the setup executable in place, next to its payload. |
| Linux x64 | `thinkrail-desktop-linux-x64.tar.gz` | Extract the tarball and run `installer`. |
| Linux ARM64 | `thinkrail-desktop-linux-arm64.tar.gz` | Extract the tarball and run `installer`. |

> [!IMPORTANT]
> On Windows, do not move the setup executable out of the extracted folder. It needs the payload beside it.

On Linux, the desktop app needs glibc 2.38 or newer with GTK 3, WebKitGTK 4.1, Ayatana AppIndicator 3, and librsvg 2. On Ubuntu 24.04 or newer, install them with:

```bash
sudo apt install libgtk-3-0 libwebkit2gtk-4.1-0 libayatana-appindicator3-1 librsvg2-2
```

> [!NOTE]
> JetBrains signs the Windows setup executable. Linux artifacts are unsigned. Older published DMGs and locally built packages can be unsigned and blocked by Gatekeeper on macOS.

## Install the CLI

The installer downloads the binary for your platform, verifies its SHA-256 checksum against `SHA256SUMS`, installs it to `<prefix>/bin/thinkrail`, and adds that folder to your `PATH`. The default prefix is `~/.local` (`%USERPROFILE%\.local` on Windows).

On macOS and Linux, or under Git Bash on Windows:

```bash
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash
```

On Windows, from cmd or PowerShell:

```powershell
powershell -c "irm https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.ps1 | iex"
```

Open a new shell afterward so the `PATH` change applies.

## Choose a channel or pin a version

**Stable** is the default. **Nightly** builds are published roughly daily as pre-releases. A pinned version must belong to the channel you select.

On macOS and Linux, pass options after `-s --`:

```bash
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash -s -- --channel nightly
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash -s -- --channel stable --version 0.1.2
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash -s -- --prefix ~/tools --no-modify-path
```

On Windows, set environment variables first. The options are `THINKRAIL_CHANNEL`, `THINKRAIL_VERSION`, `THINKRAIL_PREFIX`, and `THINKRAIL_NO_MODIFY_PATH` (`1` leaves your `PATH` alone):

```powershell
# PowerShell
$env:THINKRAIL_CHANNEL='nightly'; irm https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.ps1 | iex

# cmd
set "THINKRAIL_CHANNEL=stable" && set "THINKRAIL_VERSION=0.1.2" && powershell -c "irm https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.ps1 | iex"
```

## Install manually and verify the checksum

1. Download the binary for your platform and `SHA256SUMS` from the same release. Binary names are `thinkrail-<os>-<arch>` (`.exe` on Windows), where `<os>` is `linux`, `darwin`, or `windows` and `<arch>` is `x64` or `arm64`.
2. Compute the file's SHA-256 and compare it with the matching line in `SHA256SUMS`:

   ```bash
   shasum -a 256 thinkrail-linux-x64
   grep thinkrail-linux-x64 SHA256SUMS
   ```

   On Windows, use `Get-FileHash -Algorithm SHA256 thinkrail-windows-x64.exe`.
3. Rename the file to `thinkrail` (`thinkrail.exe` on Windows) and place it at `<prefix>/bin/`, then make it executable on macOS and Linux.

> [!WARNING]
> A binary kept under its release filename, or outside the `<prefix>/bin` layout, cannot self-update. Replace it manually or reinstall it with the script.

## Check that it worked

Run:

```bash
thinkrail --version
```

It prints the installed version. Then run `thinkrail`, optionally with a git repository to open as a project:

```bash
thinkrail ~/code/my-repo
```

The CLI prints `thinkrail → http://localhost:24242` and opens your browser. For the desktop app, launch it from your applications list; its window opens directly.

## Related

- [Update and uninstall ThinkRail](../run/update-and-uninstall.md)
- [Connect a model provider](connect-a-provider.md)
- [CLI reference](../reference/cli.md) for every flag and environment variable
- [Platform support](../run/platform-support.md)
- [Build from source](../develop/build-from-source.md)
