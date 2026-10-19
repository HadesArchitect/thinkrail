---
title: Describe your project
description: Have the agent draft your project's specs with the bundled setting-up-a-project skill, so it starts every chat knowing the goal.
type: how-to
status: draft
---

Before your first change, have the agent write down what your project is. The bundled
`setting-up-a-project` skill drafts the project's specs: its goal, and for an existing codebase its
architecture and modules. The agent reads them in every later chat instead of relearning the project.

## Before you begin

- ThinkRail is running and a model provider is connected. See
  [Connect a model provider](connect-a-provider.md).
- Your project is open. On the Welcome screen, click **Open project**, choose **Open project** from the
  menu, and pick the folder. If the folder isn't a git repository, click **Initialize & open** when
  ThinkRail asks **Initialize a git repository?**.

You don't need to [trust the project](../security/trust-a-project.md): bundled skills load either way.

## Start the setup

1. On the project home, click **Set up project**, the card tagged `spec-first`. It appears only while the
   project folder has no specs.
2. The **Create workspace** dialog opens with **Isolated workspace** selected and
   `/skill:setting-up-a-project ` already in the message box. The note above it reads, in part, "the
   agent drafts your project's specs".
3. After the command, describe your idea if the repository is empty. For existing code you can leave
   it as is; the agent reads the code first.
4. Click **Create**. ThinkRail creates the workspace on a new branch and starts a chat with your
   message.

You can also start it from any chat: type `/skill:setting-up-a-project`, or ask in plain words, such as
"set up this project". The always-on routing rule sends project onboarding to the same skill.

## Answer the agent's questions

The skill first checks what the workspace holds, then follows one of three routes:

| Your project | What the agent does | What it writes |
| --- | --- | --- |
| Empty or near-empty repository | Interviews you to turn the idea into a goal | `goal-and-requirements.md` |
| Code, no specs | Reads agent files such as `AGENTS.md`, the docs, manifests, and code, then asks only what the code can't tell it | `goal-and-requirements.md`, `architecture.md`, and one `SPEC.md` per module |
| Already has specs | Offers to review or extend them | Only what you accept |

Questions arrive as cards that read "Your input is needed — the agent is waiting." The agent proposes
answers for you to confirm or correct. If the repository already has design docs or decision records,
the agent may offer to adopt them as specs in place instead of writing new ones.

## Review the specs

The specs are ordinary files on the workspace's branch. Open the **Changes** tool and read them as a
diff, the same way you review any change. See [Review changes](../review/review-changes.md). Nothing
reaches your default branch until you merge the branch yourself.

Merge the branch, for example through a pull request, before you start other work. A new workspace is
cut from the branch you choose in **From**, so it sees the specs only once they are on that branch. See
[Open a pull request](../review/open-a-pull-request.md).

> [!TIP]
> To write the specs straight into your checkout instead, pick **Project folder** in the dialog before
> you click **Start**. The work then runs in the Default workspace, with no isolation.

## Check that it worked

Open the **Specs** tool from the right rail. The tree shows your goal spec at the top, tagged **Main
spec**, with any architecture and module specs beneath it. Click a row to preview it.

> [!WARNING]
> Unverified: the questions you get and the exact set of specs depend on the model and your answers.
> The project home keeps showing **Set up project** until the specs exist in the project folder itself,
> for example after you merge the workspace branch; this follows from how the host checks for specs and
> has not been confirmed in a running app.

## Next step

[Make your first change](first-change.md).

## Related

- [Set up a project for spec-first work](../specs/spec-first-project.md): the full walkthrough on an
  empty folder, through the first feature.
- [Build from your own spec](../specs/build-from-your-own-spec.md): start from a spec you already wrote.
- [Built-in workflows](../specs/workflows.md): every bundled workflow and how it starts.
- [Living specs](../specs/living-specs.md): what specs are and how the agent keeps them current.
