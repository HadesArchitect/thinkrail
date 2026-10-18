---
title: Turn off usage data (telemetry)
description: Turn off ThinkRail's additional usage data (telemetry) in Settings, for one CLI run, or for a whole team with environment variables.
type: how-to
status: draft
---

To stop sharing additional usage data (telemetry), open **Settings → Privacy** and turn off
**Share additional usage data**. For one CLI run, start `thinkrail --no-analytics`. For a team, set
`THINKRAIL_NO_ANALYTICS=1` in the environment ThinkRail starts from. Basic launch and chat events still
report in a packaged build unless you send them to your own analytics host.

## Turn it off in Settings

1. Open **Settings** from the gear in the top bar.
2. Go to **Privacy**.
3. Turn off **Share additional usage data**. The change applies immediately.

Turning it off drops events that are queued or retrying; an event already sent cannot be recalled. Turning
it back on does not replay anything from the time it was off.

> [!NOTE]
> On an older host, the same page shows **Share anonymous usage analytics** instead. It controls the same
> thing.

## Turn it off at first run

1. On first launch, the **Help improve ThinkRail** dialog appears. Its **Share additional usage data**
   switch starts on, and additional events can start while the dialog is open.
2. Turn the switch off, then select **Done**. Closing the dialog also saves the current choice.

The dialog appears once per installation. To make sure nothing additional is sent from the first launch,
use the environment variable described under [For a whole team](#for-a-whole-team).

## Turn it off for one CLI run

Start the CLI with the flag:

```bash
thinkrail --no-analytics
```

Or set the environment variable to any non-empty value:

```bash
THINKRAIL_NO_ANALYTICS=1 thinkrail
```

```powershell
$env:THINKRAIL_NO_ANALYTICS = "1"; thinkrail
```

This suppresses additional events for that run only and does not change your saved choice. Basic events
still report. `--no-analytics` also skips the one-time website attribution link, without using up the
attempt.

## For a whole team

ThinkRail has no policy file or admin console. Two environment variables, read by the host at startup,
give you team-wide control:

| Variable | Effect |
| --- | --- |
| `THINKRAIL_NO_ANALYTICS=1` | No additional events and no website attribution link, whatever the Settings switch says |
| `THINKRAIL_POSTHOG_HOST=<URL>` | Every event, basic and additional, goes to this host instead of PostHog's EU endpoint |

1. Set `THINKRAIL_NO_ANALYTICS=1` in the environment ThinkRail starts from, before the first launch:
   - **CLI started from a terminal:** export it from a shell profile your team manages, for example a line
     in `~/.zshrc` or `~/.bashrc` that your device management installs.
   - **Desktop app:** set it in the environment the app is launched with, such as a user or system
     environment variable your device management sets. The desktop app imports `PATH` and other values
     from your login shell, but never variables that start with `THINKRAIL_` or `PI_`.
2. To keep basic events off PostHog as well, also set `THINKRAIL_POSTHOG_HOST` to the URL of an analytics
   host you run. ThinkRail sends PostHog-format events with its own project key to that host.

> [!WARNING]
> Unverified: the per-OS way to give a desktop app an environment variable (for example `launchctl setenv`
> on macOS) was not tested with ThinkRail.

> [!NOTE]
> The host also sends nothing when `CI` is set or `NODE_ENV` is `test`. Those exist for automated runs and
> change how other tools behave, so do not use them as a team setting.

## Builds that never report

A build you compile from source carries no analytics key and sends nothing. Neither do test and CI runs.
See [Build ThinkRail from source](../run/build-from-source.md).

## What each tier covers

**Basic events** (launches, chat creation, message sends, provider connections) are always on in packaged
builds. **Additional usage data** (setup progress, agent runs, task completions, reviews, pull-request
outcomes, and how you found ThinkRail) follows the **Share additional usage data** switch. No event
includes prompts, code, file paths, credentials, or account identity. See
[Privacy and analytics](privacy-and-analytics.md) for the full list.

## Check that it worked

- **Settings → Privacy** shows the switch in the position you chose, and it stays there after a reload.
- For a CLI run with the flag, **Settings → Privacy** keeps your saved choice; the flag affects only that
  run.
- With `THINKRAIL_POSTHOG_HOST` set, your analytics host receives the events.

## Related

- [Security and data overview](security-and-data-overview.md)
- [Privacy and analytics](privacy-and-analytics.md)
- [CLI reference](../reference/cli.md)
- [Settings reference](../reference/settings.md)
- [Files and environment](../reference/files-and-environment.md#environment-variables)
