---
title: CLI reference
description: Every thinkrail command, flag, environment variable, and exit behavior, plus the options of the install.sh and install.ps1 installers.
type: reference
status: complete
---

The `thinkrail` command starts the ThinkRail host on your machine and opens the app in your browser. Its `update` and `uninstall` subcommands manage the installed binary. This page lists every option; for task-oriented steps see [Install ThinkRail](../get-started/install.md) and [Update and uninstall](../run/update-and-uninstall.md).

## Synopsis

```text
thinkrail [options] [project-dir]
thinkrail update [--channel stable|nightly] [--version X.Y.Z|X.Y.Z-nightly.N|latest]
thinkrail uninstall [--remove-data|--keep-data] [-y]
```

A leading `update` or `uninstall` is a subcommand. It is handled before any launch option is read and never starts the host. Anything else is parsed as launch options.

## Launch the host

`thinkrail` boots the host in-process, prints the URL it serves on, and opens that URL in your default browser. It keeps running until you stop it.

### Arguments

| Argument | Default | Description |
| --- | --- | --- |
| `project-dir` | none | A git repository to open as a project at startup. A relative path resolves against the current directory. At most one is accepted; a second positional argument is an error. |

### Options

Options that take a value accept both `--port 8080` and `--port=8080`.

| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `--port` | integer, 0 to 65535 | `24242` | Port to listen on. If the port is taken, the host uses a free port instead and prints `Port <n> is in use; using free port <m>.` Anything else is an error: `Invalid --port: <value>`. |
| `--host` | host name or address | `localhost` | Address to bind. The host has no sign-in screen, so bind a non-loopback address only on a network you trust. When you bind `0.0.0.0` or `::`, the printed and opened URL uses `localhost`. |
| `--no-open` | none | off | Do not open the browser. Use it on a headless or remote machine. |
| `--no-analytics` | none | off | Turn off additional usage analytics for this run. Basic events stay on, and the saved choice in **Settings → Privacy** does not change. See [Privacy and analytics](../security/privacy-and-analytics.md). |
| `--verbose` | none | off | Debug-level logging in the terminal and in the log files under `~/.thinkrail/logs`. |
| `-v`, `--version` | none | | Print the version and exit. |
| `-h`, `--help` | none | | Print the usage text and exit. |

Unknown options fail with `Unknown option: <flag>`. A flag that needs a value and does not get one fails with `Missing value for <flag>`. In both cases the command prints the usage text.

### Precedence

For `--port` and `--host`, a flag beats the environment variable, which beats the default. An environment value for the port that is not an integer is ignored and the default applies.

### Startup output

On startup the host prints a short status mark when stdout is a terminal, then a line you can parse in scripts:

```text
thinkrail → http://localhost:24242
```

If the web app files are missing (only possible for a source checkout), the command prints a warning that names the missing directory and continues.

## Environment variables read by the CLI

| Variable | Equivalent | Description |
| --- | --- | --- |
| `THINKRAIL_PORT` | `--port` | Default listen port. |
| `THINKRAIL_HOST` | `--host` | Default bind address. |
| `THINKRAIL_STATIC_DIR` | none | Serve a different built web app. In the installed binary, a value you set wins over the embedded web app. |
| `THINKRAIL_NO_ANALYTICS` | `--no-analytics` | Any non-empty value turns off additional analytics for the run. Read by the host, not the argument parser. |
| `THINKRAIL_LOG_LEVEL` | `--verbose` | `debug`, `info`, `warn`, or `error`. Default `info`. An invalid value falls back to `info` and logs a warning. `--verbose` sets `debug` and takes precedence. |
| `THINKRAIL_DATA_DIR` | none | Use a different state directory instead of `~/.thinkrail`. See [Files and environment](files-and-environment.md). |
| `THINKRAIL_INSTALL_SCRIPT_URL` | none | `thinkrail update` on macOS and Linux downloads the installer from this URL instead of the default. For testing and forks. |
| `THINKRAIL_INSTALL_PS1_URL` | none | The same override for `thinkrail update` on Windows. |
| `XDG_CACHE_HOME` | none | Parent of the binary's unpack cache, `<XDG_CACHE_HOME>/thinkrail`. Without it the cache is `~/.cache/thinkrail`. |

The complete list of variables, including the ones the host and desktop app read, is in [Files and environment](files-and-environment.md#environment-variables).

## Exit behavior

| Situation | Exit code |
| --- | --- |
| `--help`, `--version` | `0` |
| Invalid arguments, or a fatal error while starting the host | `1`, with the message (and usage text for argument errors) on stderr |
| `Ctrl+C` (SIGINT) or SIGTERM while running | The host shuts down cleanly, then exits `0` |
| `update`, `uninstall` | The subcommand's own code, described below |

The host runs `pi` in the same process, so a fatal fault in a provider or the agent can end the whole process. The crash report goes to `~/.thinkrail/logs/crash.log`.

## `thinkrail update`

Re-runs the published installer for your installed channel and replaces the binary in `<prefix>/bin`. You do not need to pass anything for a normal update.

```text
thinkrail update [--channel stable|nightly] [--version X.Y.Z|X.Y.Z-nightly.N|latest]
```

| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `--channel` | `stable` or `nightly` | The installed channel | Switch to or force a channel. |
| `--version` | `X.Y.Z`, `X.Y.Z-nightly.N`, or `latest` | `latest` | Install a specific version. The version must belong to the channel: a `-nightly.N` version on `nightly`, a plain version on `stable`. |
| `-h`, `--help` | none | | Print the usage text. |

How it works:

- The channel comes from, in order, `--channel`, the install metadata at `~/.config/thinkrail/install.json`, and the channel baked into the binary.
- On macOS and Linux it downloads `install.sh` with `curl` and runs it with `bash`, so both must be installed. On Windows it downloads `install.ps1` and runs it with `powershell.exe`, or `pwsh.exe` if that is missing.
- It only works for a binary in the installer's layout, `<prefix>/bin/thinkrail` (`thinkrail.exe` on Windows). A binary kept under its release filename or elsewhere fails with a message to reinstall or replace it by hand.
- After a successful update, restart any running `thinkrail` host yourself.

| Exit code | Meaning |
| --- | --- |
| `0` | Updated, or help was printed. |
| `1` | Invalid arguments, the installer could not be downloaded, no PowerShell was found, or the layout is unsupported. |
| Installer code | On Windows, a non-zero installer exit code is passed through. On macOS and Linux, the installer's exit code is returned. |

On Windows, when the update fails, the command also prints the manual one-line commands for PowerShell and cmd.

## `thinkrail uninstall`

Removes the executable, the PATH entry the installer added, the install metadata, and the binary's unpack cache. Your app state in `~/.thinkrail` is kept unless you ask for it to be removed. `pi`'s own state in `~/.pi` is never touched.

```text
thinkrail uninstall [--remove-data|--keep-data] [-y]
```

| Option | Default | Description |
| --- | --- | --- |
| `--remove-data` | off | Also delete the app state directory: projects, workspaces, and the git worktrees under it, **including any uncommitted work in them**. |
| `--keep-data` | on | Keep the app state directory and skip the question. Cannot be combined with `--remove-data`. |
| `-y`, `--yes` | off | Ask nothing. Required when stdin is not a terminal, otherwise the command refuses to run. Keeps the app state unless `--remove-data` is given. |
| `-h`, `--help` | | Print the usage text. |

The command prints what it will remove, asks about the app state (default: keep), asks for a final confirmation, and then reports each removal as `removed`, `kept`, `not found`, or `failed`. It exits `1` if any removal failed or the arguments were invalid, and `0` otherwise, including when you answer no to the final confirmation (nothing is removed).

- **PATH edit on macOS and Linux.** The installer's block between `# >>> thinkrail PATH >>>` and `# <<< thinkrail PATH <<<` is removed from your shell startup files. A file with a start marker but no end marker is left untouched.
- **PATH edit on Windows.** The user PATH entry is removed only if the installer recorded that it added it.
- **Windows executable.** A running `thinkrail.exe` cannot be deleted. It is renamed aside and removed shortly after the command exits.

## Install scripts

The installers download the binary for your platform from the GitHub release, check it against `SHA256SUMS`, install it, record `~/.config/thinkrail/install.json`, and add the `bin` directory to your PATH.

### `install.sh` (macOS, Linux, Git Bash)

```bash
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash -s -- [options]
```

| Option | Value | Default | Description |
| --- | --- | --- | --- |
| `--channel` | `stable` or `nightly` | `stable` | Release channel. |
| `--version` | `X.Y.Z`, `X.Y.Z-nightly.N`, or `latest` | `latest` | Version to install. It must belong to the channel. |
| `--prefix` | absolute directory | `~/.local` | Install root. The binary lands at `<prefix>/bin/thinkrail`. A leading `~` is expanded. Characters that are unsafe in shell startup files are rejected. |
| `--no-modify-path` | none | off | Do not edit shell startup files. The script prints the `export PATH=...` line instead. |
| `-h`, `--help` | none | | Print usage and exit `0`. |

| Environment variable | Description |
| --- | --- |
| `THINKRAIL_REPO` | GitHub repository to download from. Default `JetBrains/thinkrail`. For forks. |

Behavior to know:

- **PATH.** If the `bin` directory is not on your PATH, the script appends a marked block to `~/.bashrc` (`~/.bash_profile` on macOS), `${ZDOTDIR:-$HOME}/.zshrc`, or `~/.config/fish/conf.d/thinkrail.fish`, based on `$SHELL`. For any other shell, and under Git Bash on Windows, it prints the line for you to add.
- **Tools it needs.** `curl`, plus `sha256sum` or `shasum`, `awk`, and `mktemp`. A checksum mismatch aborts the install.
- **Intel Macs.** The script stops with `No prebuilt ThinkRail for Intel macOS.`
- **Exit code.** `0` on success, `1` on any error.

### `install.ps1` (Windows)

Options are environment variables, because they work the same in cmd and PowerShell. Set them before the command. A saved copy of the script also accepts the matching parameters.

| Environment variable | Parameter | Default | Description |
| --- | --- | --- | --- |
| `THINKRAIL_CHANNEL` | `-Channel` | `stable` | `stable` or `nightly`. |
| `THINKRAIL_VERSION` | `-Version` | `latest` | `X.Y.Z`, `X.Y.Z-nightly.N`, or `latest`. It must belong to the channel. |
| `THINKRAIL_PREFIX` | `-Prefix` | `%USERPROFILE%\.local` | Absolute install root. The binary lands at `<prefix>\bin\thinkrail.exe`. It cannot contain `%`, `!`, `;`, double quotes, or newlines. |
| `THINKRAIL_NO_MODIFY_PATH` | `-NoModifyPath` | off | Set the variable to `1` to leave your user PATH alone and print advice instead. |
| `THINKRAIL_REPO` | none | `JetBrains/thinkrail` | GitHub repository to download from. |

- The installer downloads `thinkrail-windows-x64.exe`. There is no native Windows-on-ARM build, so the x64 binary runs under emulation.
- It adds the `bin` directory to the per-user PATH in the registry. Open a new terminal to pick it up.
- It throws on failure instead of exiting, so `powershell -c` reports exit code `1`.

## Examples

```bash
# Start on the default port and open the browser
thinkrail

# Open a repository as a project
thinkrail ~/code/my-repo

# Headless host on a fixed port, no browser
thinkrail --no-open --port 8080

# Reachable from your network (trusted networks only)
thinkrail --host 0.0.0.0 --no-open

# Debug logs for this run, additional analytics off
thinkrail --verbose --no-analytics

# Port and host from the environment
THINKRAIL_PORT=9000 THINKRAIL_HOST=127.0.0.1 thinkrail

# Update to the latest build on your channel
thinkrail update

# Switch to the nightly channel
thinkrail update --channel nightly

# Pin a stable version
thinkrail update --channel stable --version 0.1.2

# Uninstall without questions, keeping ~/.thinkrail
thinkrail uninstall -y

# Uninstall and delete app state
thinkrail uninstall --remove-data -y
```

```bash
# Install the nightly channel to a custom prefix without editing shell files
curl -fsSL https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.sh | bash -s -- --channel nightly --prefix ~/tools --no-modify-path
```

```powershell
$env:THINKRAIL_CHANNEL='nightly'; irm https://raw.githubusercontent.com/JetBrains/thinkrail/main/install.ps1 | iex
```

## Related

- [Install ThinkRail](../get-started/install.md)
- [Update and uninstall](../run/update-and-uninstall.md)
- [Run on a remote machine](../run/run-on-a-remote-machine.md)
- [Files and environment](files-and-environment.md)
- [Platform support](../run/platform-support.md)
