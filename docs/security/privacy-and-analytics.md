---
title: Privacy and analytics
description: What usage data ThinkRail reports, what it never collects, how the Share additional usage data switch works, and how the website attribution link behaves.
type: explanation
status: draft
---

ThinkRail reports a small set of usage events so the team can see whether people install it, start
chats, and get work done. It never reports what you work on. This page explains the two tiers of data,
the switches that control them, and the one-time link to the website visit that brought you here.

These usage events are ThinkRail's telemetry. For everything else that leaves your machine, including what
goes to your model provider, see [Security and data overview](security-and-data-overview.md).

## Two tiers

| Tier | What it covers | Control |
| --- | --- | --- |
| **Basic events** | Launches, chat creation, message sends, provider connections | Always on in packaged builds |
| **Additional usage data** | Setup progress, agent runs, task completions, reviews, pull-request outcomes, and how you found ThinkRail | **Share additional usage data** in **Settings → Privacy** |

Both tiers are reported by the host, not by the UI. The UI does no browser autocapture, and feature code
never reports on its own; the host observes outcomes and sends closed, predefined events.

## Basic events

| Event | When | Properties beyond the standard set |
| --- | --- | --- |
| `app_installed` | Once per installation, on its first packaged launch | None |
| `app_started` | The host boots | None |
| `chat_started` | A chat is created | Provider, model, and authentication method |
| `message_sent` | The host accepts a message you send | Send mode, provider, and authentication method |
| `provider_login` | A provider sign-in succeeds | Provider, method, and authentication method |

Every event carries the same standard properties: app version, release channel, operating system,
architecture, and build type, plus a random installation ID. Provider and model names pass through only
for built-in providers; anything custom is reported as `custom`. The authentication method is a fixed
category — API key, subscription, OAuth, Central, other, or unknown — never a credential, an account, or
a plan.

There is no switch for basic events in a packaged build; `THINKRAIL_POSTHOG_HOST` can send them to a host
you run instead of PostHog. A build you compile from source carries no analytics key and sends nothing,
and neither do test and CI runs.

## Additional usage data

With **Share additional usage data** on, the host also reports what happens after setup: whether a
provider, model, and project are ready; when agent runs start and settle, with bucketed duration and
retry counts; opening and adding to the plan; when a plan's task completes; review decisions and the
life of review comments; and how a pull-request action ended. Every field is a fixed category or a
bounded bucket, so an event says "a review comment was sent and its anchor had moved", never what the
comment said or which file it was on.

The switch is offered once, in the **Help improve ThinkRail** dialog at first launch, where it starts
on; additional events can start while the dialog is open. You can turn it off there or at any time in **Settings → Privacy**; the change applies immediately.
See [Turn off usage data (telemetry)](manage-privacy.md).

## What is never collected

No usage event includes:

- prompts, chat transcripts, or model output
- code, file contents, file paths, or file and project names
- credentials, API keys, or account identity
- token counts or costs
- error text or other free-form strings
- screen or session recordings

Counts describe installations, not people. Events are sent to PostHog's EU region with person profiles
and GeoIP enrichment turned off.

> [!NOTE]
> Personless reporting does not make events unlinkable: every event from one installation carries the
> same installation ID. How the analytics vendor handles the IP address of each request is governed by
> its own policy, not by ThinkRail.

## Turning additional sharing off

- **For good:** switch off **Share additional usage data** in **Settings → Privacy**. Events already
  queued or retrying are dropped; an event already sent cannot be recalled.
- **For one run of the CLI:** start it with `thinkrail --no-analytics`, or set
  `THINKRAIL_NO_ANALYTICS` to any non-empty value. This suppresses additional events for that run only and does not
  change your saved choice. Basic events still report.
- **For a team:** set `THINKRAIL_NO_ANALYTICS=1` in the environment ThinkRail starts from, before the
  first launch. See [For a whole team](manage-privacy.md#for-a-whole-team).

Turning sharing back on does not replay anything from the time it was off. See the
[CLI reference](../reference/cli.md) and the [settings reference](../reference/settings.md).

## The website attribution link

The team wants to know which pages and campaigns lead to an installation. With additional sharing on, a
packaged build may open your browser once, to a page on `thinkrail.ai` that then lands on the ThinkRail
blog. That visit lets the website hand the installation a summary of how you arrived.

How it is bounded:

- **Only once per installation, and only by consent.** It happens only in a packaged CLI or desktop
  build, with additional sharing on and the first-run dialog confirmed, after the app's window or browser
  tab has opened. A failed or finished attempt is never retried. Running the CLI with `--no-open` or
  `--no-analytics` skips it without using up the attempt.
- **Only with website consent.** The page reads the stored visit only if your browser accepted marketing
  cookies on `thinkrail.ai`, or if no consent is required where you are. Otherwise it goes straight to the
  blog and links nothing.
- **Only campaign data.** What transfers is a bounded summary of the visit — UTM source, medium,
  campaign, and content, a coarse referrer class, and a timestamp. No full URLs, search terms, ad click
  IDs, IP addresses, or browser details are stored. The host records the link in one
  `acquisition_linked` event.
- **It expires.** The installation keeps that campaign summary for 30 days after your last tracked visit
  and attaches it to later events only while additional sharing is on. Turning sharing off stops the
  attempt if it is in progress and stops attaching the summary.

> [!IMPORTANT]
> The browser page opens without a prompt of its own; the first-run dialog's switch is the consent. If
> you do not want that, switch off **Share additional usage data** before pressing **Done**.

## What else is stored locally

The **Help shape ThinkRail** interview invitation is counted locally in `~/.thinkrail` and is separate
from analytics. The installation ID and any campaign summary also stay in `~/.thinkrail`; the
installation ID is never sent to the UI. See [Files and environment](../reference/files-and-environment.md).

## Related

- [Security and data overview](security-and-data-overview.md)
- [Turn off usage data (telemetry)](manage-privacy.md)
- [How ThinkRail works](../run/how-thinkrail-works.md) — where state lives
