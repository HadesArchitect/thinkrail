---
title: Choose models and effort
description: Pick a model and reasoning effort for a chat, pin favorites, set the default for new chats, and raise the context window for supported OpenAI models.
type: how-to
status: draft
---

Every chat has its own model and reasoning effort. Choose them from the composer, and set defaults that new chats start with.

## Before you begin

- Connect at least one provider. See [Connect a model provider](../get-started/connect-a-provider.md). If the picker is empty, it says "No models to show".

## Pick a model and effort for a chat

1. Select the **model · effort** pill in the composer footer. It shows the model name and the current effort.
2. Choose a model. The change applies immediately and the popover stays open. You can type in the search box to filter, or type something like `opus high` to select a model and level together.
3. Drag the effort slider. It offers only the levels the selected model supports, from off, minimal, low, medium, and high up to xhigh and max.

You can also type `/model` in the composer to open the picker, optionally prefilled with a search query.

Each model row shows its provider, what it draws on, price, and context size. The marker tells you how it is billed: a key icon for an API key, an infinity icon for a subscription, braces for an environment key, and a JCP tag for JetBrains AI. Per-token prices appear only for providers that charge per token.

> [!NOTE]
> The xhigh and max levels show a cost warning. Higher effort usually costs more and takes longer.

The model you pick here is also the default for the chat's subagents. To run subagents on a cheaper model while the chat keeps a strong one, see [Use a cheaper model for subagents](delegate-to-subagents.md#use-a-cheaper-model-for-subagents).

Model changes in the middle of a chat apply to the live session. A chat keeps the model catalog it started with, so a model from a provider you connected after the chat opened can be missing there. Start a new chat to use it.

## Pin favorites

In the picker, select the star on a model to add it to **Pinned**. Pinned models appear at the top, followed by **Recent**, which holds the last five models you chose. Other models sit in provider groups, folded behind **All models** while you have a shortlist. Favorites sync across browsers on the same host.

## Set the default for new chats

Either way sets the model and effort that new chats start with:

- In the picker, choose the model and effort, then select **Set as default**. It changes to **Default for new chats** once it matches.
- Open **Settings → Models** and set **Chat model** and its effort.

Without a default, new chats use the first available model at medium effort. When you start a chat from the **Create workspace** dialog, its picker has a **Default** row that follows this setting.

A saved chat reopens with its own model if that model is still available. Otherwise it uses the current default, and the replacement is saved only when you send a message.

## Hide models you never use

In **Settings → Models**, expand **Visible models** and switch off models you do not want. Hidden models disappear from every picker except for the one the current chat uses. This setting is stored in your browser.

## Raise the context window for OpenAI models

For OpenAI Responses and Codex models whose budget is the 272K minimum, **Settings → Models** has a **GPT context window** section. Pick **Default**, **1M**, or **Custom**, globally or for each model. The range is 272,000 to 1,000,000 tokens. It edits `models.json` in `pi`'s agent directory, so the `pi` CLI sees the same limit. New chats use the new limit. Existing chats may need a host restart.

## Check that it worked

- The pill in the composer shows the model and effort you chose.
- After **Set as default**, a new chat opens with that pair.

## Related

- [Connect a model provider](../get-started/connect-a-provider.md)
- [Settings reference](../reference/settings.md)
- [Use a cheaper model for subagents](delegate-to-subagents.md#use-a-cheaper-model-for-subagents)
- [ThinkRail and pi](thinkrail-and-pi.md)
