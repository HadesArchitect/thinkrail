---
title: Contribute to ThinkRail
description: Follow the contribution rules for ThinkRail, from the code of conduct and spec-first workflow to the checks to run and what a pull request needs.
type: how-to
status: draft
---

Use this page when you want to send a bug fix, feature, or docs change to the ThinkRail repository. It summarizes the rules; [`CONTRIBUTING.md`](../../CONTRIBUTING.md) and [`AGENTS.md`](../../AGENTS.md) are the sources of truth. Start with [Build ThinkRail from source](build-from-source.md) to get a working development setup.

## Before you start

- **Read the code of conduct.** The project follows the JetBrains Open Source and Community Code of Conduct. See [`CODE_OF_CONDUCT.md`](../../CODE_OF_CONDUCT.md), which also says how to report a violation.
- **Know the license.** By contributing, you agree your contributions are licensed under the [Apache License 2.0](../../LICENSE). `CONTRIBUTING.md` does not mention a separate contributor agreement.
- **Check for an existing issue.** Search [GitHub issues](https://github.com/JetBrains/thinkrail/issues) before filing. Bug reports use the **Bug report** template and feature ideas use **Feature request**. Include what you did, what you expected, what happened, your OS, Bun, and Node versions, and logs or a minimal reproduction.

## How the codebase is organized

ThinkRail is developed spec-first. Specs live next to the code and lead it:

- **Top-level specs.** [`goal-and-requirements.md`](../../goal-and-requirements.md) states the product goal and non-goals. [`architecture.md`](../../architecture.md) lists every app and package with its role and allowed dependencies.
- **Module specs.** Every package and meaningful directory carries a `SPEC.md` that states what it owns, what it exposes, and what it must not reach into.
- **Barrels.** A sub-module exposes its public surface through an `index.ts` barrel. Siblings import through the barrel, never through internals.

If your change moves or blurs a boundary, contract, or decision, update the owning `SPEC.md` first, then the code and the tests that pin it. Read only the specs that govern the code you touch.

## Make a change

1. [Fork the repository](https://docs.github.com/articles/fork-a-repo) and create a branch off `main`.
2. Keep the change focused and match the surrounding style and the conventions in `AGENTS.md`.
3. Add or update tests and specs.
4. Run the checks below.

Run the fast gates before you open a pull request:

```bash
bun run lint
bun run typecheck
bun run test
```

`AGENTS.md` also lists structural checks for dependency and module-boundary rules:

```bash
bun run check:deps
bun run check:boundaries
bun run check:seams
bun run check:spec-surface
```

The repository's pre-commit hook runs several of these gates (including `check:deps`, `check:boundaries`, `check:seams`, `lint`, and `typecheck`) on every commit.

Changes that touch the app also need the end-to-end suite. Install the browser once, then iterate on a single spec before running the whole gate:

```bash
bunx playwright install chromium
bun run e2e -- e2e/changes.spec.ts
bun run e2e
```

Run the complete `bun run e2e` once before you hand off, not after every small edit.

> [!WARNING]
> Some suites call a real model provider and spend tokens. `bun run e2e:full` runs everything, including agent-driven specs, and needs `pi` authentication. `bun run test:workflows` also uses real provider tokens and is not a commit gate. Run a focused live spec when your change touches agent behavior, and ask a maintainer before running the full `e2e:full` suite.

Agent-driven specs run against an isolated `pi` agent directory, never your real `~/.pi/agent`. [`e2e/SPEC.md`](../../e2e/SPEC.md) documents every runner mode and how to debug it.

Do not add suppressions such as `biome-ignore`, `@ts-expect-error`, or `eslint-disable` to make a check pass. Treat the error as a design signal and ask a maintainer if a suppression is truly needed.

## Open a pull request

Open the pull request against `main`. The template asks for:

- **Problem.** What the change solves and why it is needed.
- **Approach.** The important decisions and trade-offs, not a file-by-file transcript.
- **Changes.** The behavior, contract, or module changes reviewers should inspect.
- **Screenshots.** Before and after screenshots of the same scenario and viewport for frontend changes. Otherwise write that there are no frontend changes.
- **Related issues.** For example, `Closes #123`.
- **Checklist.** Fast gates pass, the e2e suite passes for app-affecting changes, specs are updated, and you have read the contributing guide and code of conduct.

Write commit messages and PR descriptions that explain why the change was made, not just what changed. A maintainer reviews your pull request and may ask for adjustments before merging.

If you change a user-visible capability, also check that [`README.md`](../../README.md) still describes it correctly.

## Work with an agent on ThinkRail

[`AGENTS.md`](../../AGENTS.md) is the instructions file for agents working in the repository. It tells them which specs to read, which boundaries to respect, and which gates to run. `CLAUDE.md` includes it, so agents that read either file get the same rules.

## Related

- [Build ThinkRail from source](build-from-source.md)
- [Get help](../run/get-help.md)
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
- [`AGENTS.md`](../../AGENTS.md)
- [`architecture.md`](../../architecture.md)
