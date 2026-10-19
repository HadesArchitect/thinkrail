---
title: Connect a model provider
description: Sign in with JetBrains AI through the central CLI, or connect a subscription or API key, so ThinkRail's agent can run.
type: how-to
status: draft
---

Connect at least one model provider so the agent can run. You can use JetBrains AI, a subscription you already pay for, or an API key. ThinkRail stores none of these credentials: `pi` keeps them in its own agent directory.

## Which option is for me?

| You have | Use | Section |
| --- | --- | --- |
| A ChatGPT, Claude, or GitHub Copilot plan | Sign in with that plan. No API key needed. | [Connect a subscription or API key](#connect-a-subscription-or-api-key) |
| A JetBrains AI account | JetBrains AI, through the `central` CLI | [Connect JetBrains AI](#connect-jetbrains-ai) |
| An API key, for example from Anthropic, OpenAI, or OpenRouter | Paste the key | [Connect a subscription or API key](#connect-a-subscription-or-api-key) |
| A working `pi` setup, or keys in environment variables | Nothing to do. ThinkRail uses it, as long as the host can see your environment variables. | [Coming from pi](../coming-from-pi.md#environment-variables) |

Whether your plan's usage limits are enough for agent work is up to the provider. See
[What is ThinkRail?](../what-is-thinkrail.md#what-it-costs).

## Before you begin

- Open ThinkRail. If no provider is connected, the welcome screen shows "No model provider connected" with a **Connect a provider** button.
- For JetBrains AI, install the `central` CLI version 1.4.0 or newer on the machine that runs the ThinkRail host.

## Connect JetBrains AI

JetBrains AI models reach ThinkRail through your own `central` CLI, which registers its models with `pi`. ThinkRail never reads Central's configuration.

1. Open **Settings → Providers**.
2. In the **JetBrains AI** card, follow the state it shows:
   - **Not installed.** Copy the install command from the card, run it in a terminal on the host, then select **Recheck**.
   - **Outdated.** Select **Update**.
   - **Installed, not connected.** Select **Connect**.
   - **Signed out.** The card warns that Central is signed out. Select **Sign in**, finish sign-in in the browser on the host, then select **Refresh**.
   - **Proxy stopped.** Select **Start proxy**.
3. If **Connect** fails because Central needs authentication, sign in and retry **Connect**.

The install commands are:

```bash
curl -fsSL https://central-cli.labs.jb.gg/install.sh | bash
```

```powershell
irm https://central-cli.labs.jb.gg/install.ps1 | iex
```

When JetBrains AI is connected, the `anthropic`, `openai`, and `google-vertex` providers that Central registers appear as **Managed** rows labelled JetBrains AI.

### Show your quota

The JetBrains AI card has a **Show quota in top bar** switch, on by default, and a **Refresh every (sec)** field from 1 to 3600 seconds, 30 by default. The top bar then shows remaining and total credits next to the connection status. If the read fails, it shows "Quota unavailable" with a **Retry** link.

## Connect a subscription or API key

1. Open **Settings → Providers**, or select **Connect a provider** on the welcome screen.
2. Under **Subscriptions**, find Claude, ChatGPT, or Copilot and select **Sign in**. Follow the dialog: it shows an **Open sign-in page** button or a device code to enter at a verification URL.
3. For an API key, select **API key** on a row under **Subscriptions** or **Available**. The first eight providers show; select **Show N more** for the rest. Paste the key into the dialog.

Providers configured outside the app, such as an `ANTHROPIC_API_KEY` environment variable or `~/.pi/agent/models.json`, also count as connected. They appear as **Managed** because ThinkRail cannot change them.

## Switch providers

- **Per chat.** Open the model picker in the composer footer and choose a model from any connected provider. See [Choose models and effort](../agent/choose-models.md).
- **For new chats.** Set a default in **Settings → Models**.
- **Disconnect.** Select **Sign out** on a **Connected** row, or **Disconnect** on the JetBrains AI card.

A chat keeps the model catalog it started with. A newly connected provider's models can be unavailable in chats that were already open; start a new chat to use them.

## Check that it worked

- The provider appears under **Connected** in **Settings → Providers**, with its auth kind (OAuth, API key, or environment).
- The welcome-screen warning is gone.
- The composer's model picker lists models from the provider.
- A message in a new chat gets a response.

If the page cannot read provider status, select **Refresh**.

## Related

- [Choose models and effort](../agent/choose-models.md)
- [Settings reference](../reference/settings.md)
- [ThinkRail and pi](../agent/thinkrail-and-pi.md) for why credentials live in `pi`
- [Privacy and analytics](../security/privacy-and-analytics.md)
