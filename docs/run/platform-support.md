---
title: Platform support
description: Operating systems, architectures, signing status, Linux libraries, and software requirements for the ThinkRail desktop app and CLI.
type: reference
status: complete
---

ThinkRail ships as a native desktop app and as a self-contained `thinkrail` CLI that serves the same UI to your browser. This page lists what each runs on and what it needs.

## Support matrix

| Platform | Desktop app | CLI |
| --- | --- | --- |
| macOS, Apple Silicon (arm64) | Yes. DMG. | Yes. Signed binary. |
| macOS, Intel (x64) | No build. | No prebuilt binary. [Build from source](../develop/build-from-source.md). |
| Windows x64 | Yes. Setup ZIP. | Yes. Signed `.exe`. |
| Windows on ARM | No build. | The x64 binary runs under emulation. |
| Linux x64 | Yes. Setup tarball. | Yes. |
| Linux arm64 | Yes. Setup tarball. | Yes. |

The release assets are named `thinkrail-desktop-darwin-arm64.dmg`, `thinkrail-desktop-windows-x64.zip`, `thinkrail-desktop-linux-x64.tar.gz`, and `thinkrail-desktop-linux-arm64.tar.gz`. The CLI binaries are `thinkrail-darwin-arm64`, `thinkrail-linux-x64`, `thinkrail-linux-arm64`, and `thinkrail-windows-x64.exe`. Every release also publishes `SHA256SUMS`. Install steps are in [Install ThinkRail](../get-started/install.md).

> [!NOTE]
> The installers detect your platform and refuse unsupported ones. `install.sh` stops on Intel macOS, and both installers use the x64 Windows binary regardless of the Windows architecture.

## Signing and notarization

| Artifact | Status |
| --- | --- |
| Windows desktop setup executable | Signed by JetBrains. |
| Windows CLI | Signed by JetBrains. |
| macOS CLI | Signed, not yet notarized. |
| macOS desktop DMG | Signing and notarization run in JetBrains' release service pipeline. Older published DMGs and locally built packages can be unsigned, and Gatekeeper may block them. |
| Linux desktop and CLI | Unsigned. Check the download against `SHA256SUMS`. |

## Linux libraries

The Linux desktop app needs glibc 2.38 or newer and these libraries. That means Ubuntu 24.04 or newer, or a distribution with equivalent versions.

| Library | Ubuntu package |
| --- | --- |
| GTK 3 | `libgtk-3-0` |
| WebKitGTK 4.1 | `libwebkit2gtk-4.1-0` |
| Ayatana AppIndicator 3 | `libayatana-appindicator3-1` |
| librsvg 2 | `librsvg2-2` |

```bash
sudo apt install libgtk-3-0 libwebkit2gtk-4.1-0 libayatana-appindicator3-1 librsvg2-2
```

> [!NOTE]
> The glibc and library requirements are documented for the desktop app only. No minimum glibc is documented for the Linux CLI binary.

## Requirements

| Requirement | Needed for | Notes |
| --- | --- | --- |
| `git` on your `PATH` | Everything | ThinkRail creates workspaces with `git worktree`. |
| A model provider | Agent work | Sign in with JetBrains AI or connect any provider supported by `pi`. See [Connect a model provider](../get-started/connect-a-provider.md). |
| GitHub CLI (`gh`), signed in | Optional | Opening pull requests and creating workspaces from remote branches. |
| JetBrains `central` CLI, version 1.4.0 or newer | Optional | Only for the JetBrains AI provider. |
| `curl` and `bash` | `install.sh`, `thinkrail update` on macOS and Linux | |
| PowerShell 5.1 or newer | `install.ps1`, `thinkrail update` on Windows | `thinkrail update` uses `powershell.exe`, then `pwsh.exe`. |
| `ffmpeg`, `yt-dlp` | Optional | Frame extraction when the agent reads video through web research. |
| A graphical session | Linux folder picker | `DISPLAY` or `WAYLAND_DISPLAY` must be set on the host. |

You do not need Node.js or Bun to run the desktop app or the installed CLI. They are single-file executables.

### To develop ThinkRail

Building from source needs Bun 1.4.0 (the pinned package manager and runtime) and Node.js 22.19 or newer, which the in-process `pi` engine requires. See [Build from source](../develop/build-from-source.md).

## Browsers

The `thinkrail` CLI opens your default browser (`open` on macOS, `start` on Windows, `xdg-open` on Linux) and serves the app from the host. ThinkRail does not publish a browser support list. The desktop app uses the system webview: WebKit on macOS and Linux, and WebView2 on Windows.

> [!NOTE]
> No minimum browser versions are documented. The web app uses ES module workers, which every webview ThinkRail targets supports: Chromium, WebKit from Safari 15, and WebView2.

## Updates by platform

| Form | How it updates |
| --- | --- |
| Desktop app (stable and nightly packaged builds) | **Settings → Updates**: **Check for Updates**, **Download**, **Install & Restart**. |
| Installed CLI | `thinkrail update`, or **Run Update** in **Settings → Updates**. The CLI only self-updates when it sits in the installer's `<prefix>/bin` layout. |

Channels are **stable** and **nightly**. See [Update and uninstall](update-and-uninstall.md).

## Related

- [CLI reference](../reference/cli.md)
- [Files and environment](../reference/files-and-environment.md)
- [Install ThinkRail](../get-started/install.md)
- [Troubleshoot](troubleshoot.md)
