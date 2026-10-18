---
title: Run ThinkRail on a remote machine
description: Start the ThinkRail host on a devbox and open its UI from a browser on another device over a private network such as Tailscale.
type: how-to
status: draft
---

Use the CLI host on a remote machine when your repositories, tools, and credentials live there. The agent
and terminals run on the remote machine; you work from a browser on your laptop.

> [!CAUTION]
> The host has no authentication. Anyone who can reach its port controls your agent, terminals, and files,
> with your user's permissions. Expose it only on a private network you control, such as a Tailscale tailnet
> with access controls. Never bind it to an address reachable from the public internet.

> [!WARNING]
> Unverified: this recipe has not been tested end to end for this page. The flags are confirmed in the CLI;
> the Tailscale steps are the intended setup described in the project's architecture notes.

## Before you begin

- ThinkRail's CLI [installed](install.md) on the remote machine, with `git` on its `PATH`.
- A model provider reachable from that machine. Credentials are stored on the remote machine, not your
  laptop. See [Connect a model provider](connect-a-provider.md).
- Both devices on the same private network, for example a tailnet. Note the remote machine's tailnet
  address or MagicDNS name.

## Start the host

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

## Connect from your laptop

1. On your laptop, join the same tailnet.
2. Open the URL in a browser, using the remote machine's MagicDNS name or tailnet IP:

   ```text
   http://my-devbox:24242
   ```

3. Open a project or choose the one you passed on the command line.

Most settings are stored on the host, so they follow you across browsers that use it. Layout and a few
view preferences stay in each browser. See [Settings reference](../reference/settings.md).

> [!NOTE]
> Everything runs on the remote machine: file paths, terminals, `git`, `gh`, MCP servers that use stdio,
> and provider keys. Keep the host process running with your usual tool, such as `tmux` or a service
> manager.

## Check that it worked

- The top bar shows **Connected**.
- A terminal opened in a workspace reports the remote machine's hostname.
- From a device that is not on the tailnet, the URL does not load.

## Related

- [CLI reference](../reference/cli.md)
- [Trust model](../explanation/trust-model.md#the-network-is-the-access-boundary)
- [Troubleshoot](troubleshoot.md)
- [Platform support](../reference/platform-support.md)
