---
title: Build ThinkRail from source
description: Clone the repository, install dependencies, run the host and web client in development, and build the standalone CLI binary or the desktop app.
type: how-to
status: draft
---

Build and run ThinkRail from a checkout when you want to try unreleased changes, work on ThinkRail itself, or use a platform with no prebuilt binary, such as an Intel Mac.

## Before you begin

- Install [Bun](https://bun.sh) 1.4.0. The repository pins it as its package manager and runtime.
- Install Node.js 22.19 or newer. The in-process `pi` engine requires it.
- Install `git`.
- Have a model provider ready for agent work. See [Connect a model provider](../get-started/connect-a-provider.md).

## Run in development

1. Clone the repository and enter it:

   ```bash
   git clone https://github.com/JetBrains/thinkrail.git
   cd thinkrail
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the host and the web client together:

   ```bash
   bun run dev
   ```

   The host listens on port 24242 and the web dev server on 24269, or the next free port for each. The
   script opens your browser on the web dev server when it is ready. `Ctrl+C` stops both.

Development runs report version `0.0.0-dev` and have no application updater. Update a checkout with Git and rebuild it.

## Run the launchers

Each launcher is a thin wrapper over the same host.

| Goal | Command |
| --- | --- |
| Browser launcher in development | `bun run --filter @thinkrail/cli dev` |
| Standalone CLI binary | `bun run build:binary` |
| Package and open the desktop app | `bun run desktop:dev` |
| Package the desktop app without opening it | `bun run desktop:build` |

```bash
bun run --filter @thinkrail/cli dev
bun run build:binary
bun run desktop:dev
bun run desktop:build
```

To create host-native desktop installers, run `bun run desktop:package:stable` or `bun run desktop:package:canary`. `canary` is Electrobun's internal name for the public nightly channel.

> [!NOTE]
> Running `thinkrail update` from a source checkout installs a published binary. It does not pull, install dependencies, or rebuild your checkout.

## Run the checks

Run the fast gates before you open a pull request:

```bash
bun run lint
bun run typecheck
bun run test
```

[`CONTRIBUTING.md`](../../CONTRIBUTING.md) covers the end-to-end suites (`bun run e2e`), desktop packaging and smoke tests, and the repository layout.

## Check that it worked

- `bun run dev` starts the host and web client without errors, and the ThinkRail UI loads in your browser.
- A browser-launcher run prints `thinkrail → http://localhost:24242`, or a different port if 24242 is in use.
- After `bun run build:binary`, run the produced executable, `apps/cli/dist/thinkrail` (`thinkrail.exe` on Windows), with `--version`.

If the CLI warns that the web app was not found, build it first with `bun run build:web`. Source builds only.

App state still lives in `~/.thinkrail`, shared with any installed copy. Run an installed copy and a source build against the same folder only if you accept uncoordinated writes, or set `THINKRAIL_DATA_DIR` to give the source build its own folder.

## Related

- [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
- [Install ThinkRail](../get-started/install.md) for prebuilt binaries
- [Files and environment](../reference/files-and-environment.md)
- [How ThinkRail works](../run/how-thinkrail-works.md)
