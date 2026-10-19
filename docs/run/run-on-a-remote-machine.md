---
title: Run ThinkRail on a remote machine
description: Run ThinkRail on a devbox or remote server over SSH and open its UI in your laptop's browser through an SSH tunnel, or over a private network such as Tailscale.
type: how-to
status: draft
---

Use the CLI host on a remote machine when your repositories, tools, and credentials live there. The agent
and terminals run on the remote machine; you work from a browser on your laptop.

> [!CAUTION]
> The host has no authentication. Anyone who can reach its port controls your agent, terminals, and files,
> with your user's permissions. Keep it on localhost, or expose it only on a private network you control.
> Never bind it to an address reachable from the public internet.

There are two setups. For one person, use the SSH tunnel: nothing is exposed beyond the remote machine's
own localhost. Use Tailscale when several of your devices need to reach the same host without opening a
tunnel each time.

## Before you begin

- ThinkRail's CLI [installed](../get-started/install.md) on the remote machine, with `git` on its `PATH`.
- A model provider reachable from that machine. Credentials are stored on the remote machine, not your
  laptop. See [Connect a model provider](../get-started/connect-a-provider.md).
- For the SSH tunnel: SSH access from your laptop to the remote machine.
- For Tailscale: both devices on the same tailnet. Note the remote machine's tailnet address or MagicDNS name.

## Over an SSH tunnel

Recommended for a single user. The host stays on `localhost` on the remote machine, and SSH carries the
connection from your laptop.

1. On the remote machine, start ThinkRail without opening a browser. The host listens on `localhost`, port
   `24242`, by default:

   ```bash
   thinkrail --no-open ~/code/my-repo
   ```

   The optional last argument opens a git repository as a project. Read the printed line,
   `thinkrail → http://localhost:<port>`. If port `24242` was busy, the host printed a warning and picked a
   free port; use that port below.
2. On your laptop, open the tunnel. Replace `user@devbox` with your login and the remote machine's name:

   ```bash
   ssh -L 24242:localhost:24242 user@devbox
   ```

   Keep this terminal open. The tunnel lasts as long as the SSH session. If `24242` is already in use on
   your laptop, for example by a local ThinkRail, pick another local port, such as `-L 24300:localhost:24242`.
3. On your laptop, open `http://localhost:24242` in a browser, or the local port you chose.
4. Open a project or choose the one you passed on the command line.

Because the browser sees `localhost`, it treats the page as a secure context. Features that browsers
restrict to secure pages, such as clipboard access and notifications, work. If the SSH session drops, the top
bar reads **Disconnected**; reconnect SSH with the same command and the tab reconnects by itself. The host
keeps running on the remote machine, so start it inside `tmux` or a service manager, as noted under [What runs where](#what-runs-where).

> [!WARNING]
> Unverified: the tunnel recipe has not been tested end to end for this page. The host's defaults and the
> `--no-open` flag are confirmed in the CLI; the secure-context behavior is standard browser behavior for
> `localhost` and has not been checked in each browser.

## Over Tailscale

Use this when you want to reach the host from several devices without a tunnel. The host listens on the
remote machine's tailnet address, so the network, not ThinkRail, decides who can reach it. Use access
controls on your tailnet.

> [!WARNING]
> Unverified: this recipe has not been tested end to end for this page. The flags are confirmed in the CLI;
> the Tailscale steps are the intended setup described in the project's architecture notes.

### Start the host

1. On the remote machine, find its tailnet IP:

   ```bash
   tailscale ip -4
   ```

2. Start ThinkRail bound to that address, without opening a browser:

   ```bash
   thinkrail --host 100.101.102.103 --port 24242 --no-open ~/code/my-repo
   ```

   `--host` sets the bind address (default `localhost`). `--port` sets the port (default `24242`; if it is
   busy, the host picks a free one and prints a warning). `--no-open` skips launching a browser. The
   optional last argument opens a git repository as a project. The environment variables `THINKRAIL_HOST`
   and `THINKRAIL_PORT` set the defaults for the two flags.
3. Read the printed line, `thinkrail → http://<address>:<port>`, and use that port if it differs.

Binding to the tailnet address keeps the host off the machine's other network interfaces. Avoid
`--host 0.0.0.0`, which listens on all of them.

### Connect from your laptop

1. On your laptop, join the same tailnet.
2. Open the URL in a browser, using the remote machine's MagicDNS name or tailnet IP:

   ```text
   http://my-devbox:24242
   ```

3. Open a project or choose the one you passed on the command line.

> [!WARNING]
> A plain `http://` URL on another machine is not a secure context, so the browser withholds features
> that require one — for example clipboard access and browser notifications. Putting HTTPS in front of
> the host (such as with `tailscale serve`) should restore them; that setup is untested.

## What runs where

Most settings are stored on the host, so they follow you across browsers that use it. Layout and a few
view preferences stay in each browser. See [Settings reference](../reference/settings.md).

> [!NOTE]
> Everything runs on the remote machine: file paths, terminals, `git`, `gh`, MCP servers that use stdio,
> and provider keys. Keep the host process running with your usual tool, such as `tmux` or a service
> manager.

## Check that it worked

- The top bar shows **Connected**.
- A terminal opened in a workspace reports the remote machine's hostname.
- Tailscale: from a device that is not on the tailnet, the URL does not load.
- SSH tunnel: with the SSH session closed, `http://localhost:24242` on your laptop does not load.

## Related

- [CLI reference](../reference/cli.md)
- [Trust model](../security/trust-model.md#the-network-is-the-access-boundary)
- [Troubleshoot](troubleshoot.md), including a lost connection
- [Platform support](platform-support.md)
