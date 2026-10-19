---
title: Reader study
description: How the docs navigation was chosen — five simulated readers, three competing structures, and a blind retest.
type: explanation
status: complete
---

The first draft of these docs was organized by Diátaxis type: Tutorials, How-to guides, Reference,
Explanation. Diátaxis keeps each page clean, but it is a writing discipline, not a map readers
navigate by. To decide on a better structure without guessing, the navigation was tested with
simulated readers, redesigned, and tested again blind.

> [!NOTE]
> The readers were AI agents playing defined personas under strict navigation rules, not people.
> The results show where a structure confuses a reader with a given background; they are a
> cheap, repeatable stand-in for usability testing, not a substitute for it.

## Method

Five readers, each with a background, a vocabulary, and four real tasks:

| Reader | Background | Example task |
| --- | --- | --- |
| Maya | Junior frontend developer, ChatGPT Plus, never used a coding agent | "Can I use my ChatGPT subscription, and what does it cost?" |
| Dmitri | Senior engineer, daily `pi` user, Linux devbox over SSH | "Will my pi skills, extensions and keys work unchanged?" |
| Priya | Engineering manager evaluating a team pilot, SOC 2 | "What data leaves an engineer's machine, and can telemetry be off for the team?" |
| Sam | Indie builder, Claude Code and Cursor user | "Use a cheap model for subagents and a strong one for the main agent." |
| Lena | Returning daily user who only comes when something breaks | "The tab says it lost connection after an update. Fix it." |

The rules matched what a website visitor can do: start on the home page, open only pages in the
sidebar or linked from the current page, and search with the words the persona would type. Readers
stayed in character — a label that meant nothing to the persona was not decoded with insider
knowledge. For each task they logged steps, how many pages they had to combine, how confident the
first click was, the outcome, and a difficulty from 1 (instant) to 5 (gave up).

## Round 1: the Diátaxis navigation

| Measure | Result |
| --- | --- |
| Tasks fully answered | 11 of 20 (7 partial, 2 in the wrong place) |
| Average difficulty | 2.4 |
| Average steps | 2.2 |

Step counts were low because the whole sidebar is always visible. What cost readers time was
choosing the box and assembling answers:

- **Type labels meant little.** "Explanation" meant nothing to all five readers; "Operate" confused four.
- **One question, many boxes.** "Will my pi setup work?" spanned four pages in three sections;
  security and data spanned three sections; undo spanned two.
- **No front door** for the questions people arrive with: what it costs, coming from `pi`,
  evaluating for a team, how it compares with Cursor or Claude Code.
- **Search vocabulary mismatch.** Readers typed "telemetry", "undo", "SSH", "Claude Code"; the docs said
  "analytics" or nothing.

## Three competing structures

Three agents each designed a navigation around one principle, re-walked all 20 tasks, and argued its
weaknesses:

| Structure | Principle | Strongest point | Weakest point |
| --- | --- | --- | --- |
| User journey | Evaluate → get started → daily work → ship → customize → run | No file moves; clear stages | A feature like MCP lands in four stages |
| Product map | One area per thing the product has | Highest first-click confidence; a changeset's area names its docs folder | Questions that span areas need hub pages |
| Audience paths | "Choose your path" pages over a shared core | Answers audience questions in one place | Path pages restate facts and drift; extra clicks for task-driven readers |

All three agreed on more than they disagreed: drop type labels at the top, make *Get started* hold the
real first-run sequence, keep Reference as a lookup shelf, and write the same six missing pages —
what ThinkRail is and costs, coming from `pi`, a security and data overview, building from your own
spec, undoing changes, and moving to a new machine.

The chosen design is a **hybrid**: the product map as the backbone, with an audience front door
(*What is ThinkRail?* and *Coming from pi* at the top of *Get started*, and four "Where are you
starting?" questions on the home page) instead of separate path pages.

## Round 2: blind retest

With the new pages written, the same five readers ran again — each on **one** of three navigations
over identical page content, without knowing which: the original Diátaxis navigation, the pure
product map, and the hybrid. Every reader had six tasks: the original four plus two held-out tasks
that none of the structure designers had seen.

| Measure | Diátaxis (control) | Product map | Hybrid |
| --- | --- | --- | --- |
| Tasks found | 27 of 30 (2 in an unexpected place) | 28 of 30 | 28 of 30 |
| Average difficulty | 1.77 | 1.67 | 1.70 |
| High-confidence first clicks | 18 of 30 | 21 of 30 | 18 of 30 |
| Navigation score (1–10) | 7.6 | 8.2 | 8.2 |
| Evaluator (Priya) difficulty / score | 2.17 / 6 | 2.00 / 8 | 1.67 / 8 |

What the retest shows:

- **Content did most of the work.** Against round 1, every variant improved sharply, including the
  old navigation. The six new pages and task-shaped titles ("Undo or discard changes", "Coming from
  pi") let readers jump straight to an answer whatever the grouping.
- **Structure matters most for evaluators.** Priya gave the Diátaxis navigation 6/10: the decision
  pages sat at the bottom of *Explanation* and security facts were spread over three groups. The
  hybrid's "Evaluating for a team?" entry was the one clear structural win — her comparison task
  went from "found in an unexpected place" to one high-confidence click.
- **Product map and hybrid tie overall.** The pure product map scored slightly higher first-click
  confidence; the hybrid did better for the evaluator and for the `pi` user, who found *Coming from pi*
  under *Get started* rather than inside *Agent & chats*. The hybrid stays.
- **The remaining misses were content, in every variant**: no page title said "stop" the agent, the
  editor page did not mention Cursor, and license, platforms and maturity still take three pages.
  The first two were fixed after the retest.

> [!WARNING]
> One simulated reader per persona and variant is a small sample; differences under about 0.3 in
> difficulty or 1 point of score are within noise. Real-user sessions and docs search analytics
> should confirm these results once the docs are public.

## What changed

- Navigation follows the product map with a front door; see
  [Information architecture](information-architecture.md).
- Folders mirror the areas, so a changeset's `area:` names where its docs go; see
  [Docs automation](docs-automation.md).
- Seven pages were added and several sections filled in, all driven by the gaps readers hit.
