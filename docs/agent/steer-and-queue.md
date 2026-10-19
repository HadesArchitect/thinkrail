---
title: Steer, queue, or stop the agent
description: Redirect a running turn with a steering message, queue a follow-up for later, interrupt and send now, or stop the turn.
type: how-to
status: draft
---

You do not have to wait for the agent to finish before you send another message. While a turn is running, you can steer it, queue a follow-up, interrupt it, or stop it.

## Before you begin

- Start a chat and send a prompt, so a turn is running. While it streams, the composer's primary button reads **Steer** and the placeholder reads "Steer the agent at its next step…".

## Choose how to send

| Goal | Action | Shortcut | What happens |
| --- | --- | --- | --- |
| Redirect the agent | **Steer** | **Enter** | The message is delivered at the agent's next step, after the current assistant message and its tool calls. |
| Add work for afterward | **Queue** | **Cmd/Ctrl+Enter** | The message runs after the agent finishes. |
| Cut in right now | **Interrupt** | **Cmd/Ctrl+Shift+Enter** | The current response is aborted and your message is sent immediately. The partial reply stays, marked as aborted. |
| Halt without sending | **Stop** | The **Stop** button | The turn is aborted. |

**Shift+Enter** inserts a newline in any state. When the agent is idle, **Enter** sends the message as a normal prompt.

You can also open the chevron next to **Steer**, labelled **Send options**, and pick **Steer**, **Queue**, or **Interrupt** from the menu. Each row shows its shortcut.

## Steer a running turn

1. Type your correction in the composer while the agent is working.
2. Press **Enter**.

The message appears in the pending strip above the composer as a **Steering** row. It is not shown in the transcript until the agent receives it. Steering suits corrections such as "use the existing helper instead" or "skip the tests for now".

## Queue a follow-up

1. Type the next task while the agent is working.
2. Press **Cmd/Ctrl+Enter**.

The message shows as a **Follow-up** row in the pending strip and runs once the agent finishes, after any retries, compaction, or other automatic work completes.

## Edit or remove a queued message

Each row in the pending strip has an edit icon and a remove icon. Use them to change or drop a message before it is delivered.

## Stop the turn

Select **Stop**. The abort also restores every queued message, text and images, back into the composer draft so nothing is lost. If a send is rejected, the draft is restored the same way.

> [!NOTE]
> A steering message cancels any MCP call confirmation that is still waiting for your answer.

## Check that it worked

- A steered or queued message appears as a **Steering** or **Follow-up** row in the pending strip.
- When the agent reaches its next step, a steering row disappears and your message appears in the transcript. A follow-up row does the same after the turn ends.
- After **Interrupt**, the transcript shows the partial reply marked as aborted, followed by your message.

## Related

- [Keyboard shortcuts](../reference/keyboard-shortcuts.md)
- [Choose models and effort](choose-models.md)
- [How ThinkRail works](../run/how-thinkrail-works.md)
- [Glossary](../reference/glossary.md)
