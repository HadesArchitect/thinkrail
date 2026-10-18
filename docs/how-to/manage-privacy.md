---
title: Manage privacy settings
description: Turn additional usage sharing on or off in Settings, and suppress it for one run of the CLI with a flag or environment variable.
type: how-to
status: draft
---

Use these steps to control what ThinkRail reports. You can switch additional usage sharing off for good in
**Settings**, or for a single CLI run with a flag. Basic launch and chat events are not switchable in a
packaged build.

## Before you begin

Know which tier you are changing. **Basic events** (launches, chat creation, message sends, provider
connections) are always on in packaged builds. **Additional usage data** (setup progress, agent runs, task
completions, reviews, pull-request outcomes, and how you found ThinkRail) follows the
**Share additional usage data** switch. No event includes prompts, code, file paths, credentials, or
account identity. See [Privacy and analytics](../explanation/privacy-and-analytics.md) for the full list.

## Choose at first run

1. On first launch, the **Help improve ThinkRail** dialog appears. Its **Share additional usage data**
   switch starts on.
2. Turn the switch off if you do not want to share, then select **Done**. Closing the dialog saves the
   current choice.

The dialog appears once per installation.

## Change it later in Settings

1. Open **Settings** from the gear in the top bar.
2. Go to **Privacy**.
3. Turn **Share additional usage data** on or off. The change applies immediately.

Turning it off drops events that are queued or retrying; an event already sent cannot be recalled. Turning
it back on does not replay anything from the time it was off.

> [!NOTE]
> On an older host, the same page shows **Share anonymous usage analytics** instead. It controls the same
> thing.

## Turn sharing off for one CLI run

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

## Builds that never report

A build you compile from source carries no analytics key and sends nothing. Neither do test and CI runs.

## Check that it worked

- **Settings → Privacy** shows the switch in the position you chose, and it stays there after a reload.
- For a CLI run with the flag, **Settings → Privacy** keeps your saved choice; the flag affects only that
  run.

## Related

- [Privacy and analytics](../explanation/privacy-and-analytics.md)
- [CLI reference](../reference/cli.md)
- [Settings reference](../reference/settings.md)
