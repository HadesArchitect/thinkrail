---
title: Troubleshoot ThinkRail
description: Fix common problems by symptom — no provider, git or gh not found, blocked desktop installs, failing MCP servers, a host that won't start — and report a bug.
type: how-to
status: draft
---

Find your symptom, check the cause, and apply the fix. If nothing here matches, collect the details in
[Report a bug](#report-a-bug).

## The chat cannot run: no provider or model

**Symptom.** A banner reads "No model provider connected — the agent can't run." A new chat fails to send.

**Cause.** No provider is connected, so there is no model to use.

**Fix.** Select **Connect a provider**, or open **Settings → Providers**. Sign in with a subscription,
add an API key, or connect JetBrains AI. A provider set up through an environment variable such as
`ANTHROPIC_API_KEY` or `~/.pi/agent/models.json` also counts. See
[Connect a model provider](connect-a-provider.md).

## `git` is not found

**Symptom.** Opening a project, creating a workspace, or viewing changes fails.

**Cause.** ThinkRail requires `git` on the host's `PATH`.

**Fix.** Install `git`, then restart ThinkRail so it picks up the new `PATH`. Confirm with:

```bash
git --version
```

## A tool installed in your shell is not found

**Symptom.** `gh`, `central`, or an editor works in your terminal but ThinkRail cannot find it, usually
after launching from the Dock, Finder, or a desktop launcher.

**Cause.** GUI launchers start apps with a minimal `PATH`. At start, the host reads the `PATH` from your
login shell (`SHELL`) and merges it with the one it inherited.

**Fix.** Set the tool's directory in your login shell's startup files, such as `~/.zprofile` or
`~/.bash_profile`, then restart ThinkRail. Or start the CLI from a terminal where `which <tool>` succeeds.

## Open PR says the GitHub CLI is not signed in

**Symptom.** After **Open PR**, a **Branch pushed** toast appears, GitHub's compare page opens, and a
dialog reads **GitHub CLI isn't installed** or **GitHub CLI isn't signed in**.

**Cause.** `gh` is missing or unauthenticated on the machine running the host, so ThinkRail could push but
not create the PR.

**Fix.** Install `gh` if needed, run `gh auth login` in a terminal, and select **Open PR** again.
**Settings → Integrations** shows **Local GitHub** status; select **Refresh** after signing in. If the
dialog reads **Git push couldn't authenticate**, load your SSH key (`ssh-add`) or sign in with
`gh auth login`; ThinkRail pushes without a terminal, so it cannot prompt for a passphrase. See
[Open a pull request](open-a-pull-request.md).

## The desktop app is blocked or will not install

| Platform | Cause | Fix |
| --- | --- | --- |
| macOS | An older or locally built DMG is unsigned, so Gatekeeper blocks it. The macOS CLI is signed but not yet notarized. | Download a current release from GitHub. If you trust the file, macOS lets you open it anyway from System Settings → Privacy & Security. |
| macOS on Intel | There is no Intel desktop or prebuilt CLI build. | Use an Apple Silicon Mac, or [build from source](build-from-source.md). |
| Windows | The setup executable was moved away from its payload. | Extract the whole ZIP and run the setup executable in place. |
| Linux | Artifacts are unsigned, and the desktop app needs system libraries. | See the next section. |

## The Linux desktop app will not start

**Cause.** The desktop build needs glibc 2.38 or newer, GTK 3, WebKitGTK 4.1, Ayatana AppIndicator 3, and
librsvg 2. Ubuntu 24.04 or newer provides them.

**Fix.**

```bash
sudo apt install libgtk-3-0 libwebkit2gtk-4.1-0 libayatana-appindicator3-1 librsvg2-2
```

On other distributions, install the equivalent packages. If your glibc is older, use the CLI instead.

## An MCP server is failing

**Symptom.** A server shows **Failed**, **Needs sign-in**, **Pending approval**, or **Invalid config**.

**Cause.** The label names it: the server did not start, it needs OAuth, a repository entry awaits your
approval, or its configuration is malformed.

**Fix.** Open **Settings → MCP servers** and act on the row: **Sign in**, **Review & approve**, **Edit**,
**Test connection**, or **Reconnect**. Select **Show log** for the server's output; `pi` also writes it to
`~/.pi/agent/mcp.log`. A project server needs the project to be [trusted](trust-a-project.md) first. See
[Connect MCP servers](connect-mcp-servers.md).

## The host will not start, or the UI says Disconnected

**Symptom.** The CLI exits, the desktop app shows a startup error dialog, or the top bar reads
**Disconnected**.

**Cause and fix.**

- **Bad arguments.** Messages such as `Unknown option`, `Invalid --port`, or `Missing value for --port`
  print the usage text. Correct the command.
- **Port busy.** `Port 24242 is in use; using free port N.` is a normal fallback. Open the URL the CLI
  prints.
- **Fatal fault.** `pi` runs in-process, so a fatal fault can end the host. Restart it and read
  `~/.thinkrail/logs/crash.log`.
- **Logs.** Structured logs are under `~/.thinkrail/logs/` as `thinkrail.<date>.<n>.jsonl`. Run
  `thinkrail --verbose`, or set `THINKRAIL_LOG_LEVEL=debug`, for debug output in the terminal and files.

## A reopened chat uses a different model

**Symptom.** An old chat opens with a model you did not pick.

**Cause.** The chat's saved model is no longer available, for example after you removed a provider. ThinkRail
reopens the transcript with the current default model so it stays readable.

**Fix.** Pick the model you want in the composer. The original saved model is kept until you send a
message, so reconnecting the provider before you send restores it.

## Report a bug

1. Gather versions: run `thinkrail --version`, or read the current version in **Settings → Updates**
   (desktop). Add your OS and architecture.
2. Reproduce with `thinkrail --verbose` if you can, and note the exact steps.
3. Collect the newest file in `~/.thinkrail/logs/`, and `crash.log` if it exists. Read them first;
   logs can contain file paths.
4. Open an issue at [GitHub issues](https://github.com/JetBrains/thinkrail/issues) using the bug report
   template.

## Check that it worked

The symptom is gone after the fix, and the top bar shows **Connected**.

## Related

- [Install ThinkRail](install.md)
- [Files and environment](../reference/files-and-environment.md)
- [Platform support](../reference/platform-support.md)
- [CLI reference](../reference/cli.md)
