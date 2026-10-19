---
title: Get help
description: Where to ask questions about ThinkRail, report a bug or request a feature, and follow new releases.
type: how-to
status: draft
---

Ask questions on Discord, report bugs and request features in GitHub issues, and follow releases on GitHub, the blog, and the changelog. Check [Troubleshoot ThinkRail](troubleshoot.md) first: it covers the most common problems and their fixes.

## Ask a question on Discord

Join the [ThinkRail Discord](https://discord.gg/Wybu9ceWkY) to ask how something works, share what you are building, or check whether others hit the same problem.

## Report a bug or request a feature

Open an issue in [GitHub issues](https://github.com/JetBrains/thinkrail/issues) and pick a template. Search existing issues first, in case yours is already filed.

| Template | What to gather first |
| --- | --- |
| **Bug report** | A description of the bug, the steps to reproduce it, what you expected, and what happened instead (logs, stack traces, or screenshots help). Also your OS, your Bun and Node versions, and your ThinkRail version or commit. |
| **Feature request** | The problem you are trying to solve, the solution you would like, alternatives you considered, and any extra context such as mockups or related issues. |

A blank issue is also allowed. The issue chooser links to the JetBrains Open Source and Community Code of Conduct, which applies to the project.

### Find your version and logs

- **CLI.** Run `thinkrail --version`.
- **Desktop app.** Read the current version in **Settings → Updates**.
- **Logs.** Structured logs are in `~/.thinkrail/logs/`, and a fatal error is also written to `~/.thinkrail/logs/crash.log`. See [Files and environment](../reference/files-and-environment.md#logs) for details. Run `thinkrail --verbose` before you reproduce the problem for more detail.

The steps for collecting a full report are in [Report a bug](troubleshoot.md#report-a-bug).

## Before you post

> [!WARNING]
> Issues and Discord messages are public. Do not paste API keys, tokens, or other secrets.

Log files redact secrets such as tokens and API keys, but they can contain file paths. Read a log before you attach it, and remove anything you do not want to share.

## Follow releases

- [GitHub releases](https://github.com/JetBrains/thinkrail/releases) list each stable release and nightly pre-release.
- The [ThinkRail blog](https://thinkrail.ai/blog/) covers larger announcements.
- The [changelog](../changelog.md) summarizes what changed in each version.

## Related

- [Troubleshoot ThinkRail](troubleshoot.md)
- [Changelog](../changelog.md)
- [Contribute to ThinkRail](../develop/contribute.md)
