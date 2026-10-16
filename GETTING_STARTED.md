# Getting started with ThinkRail

This guide picks up after [installation](README.md#install): what to do on first launch, how to open a
project, which way of working to choose, and how to review and ship what the agent builds. Shortcuts
written as `Mod` mean Cmd on macOS and Ctrl elsewhere.

## 1. First launch

- **Usage data.** A **Help improve ThinkRail** window asks whether to **Share additional usage data**.
  Choose and press **Done**; you can change it later in **Settings → Privacy**. See
  [Analytics & privacy](README.md#analytics--privacy) for what is collected.
- **Connect a model provider.** Until one is connected, the Welcome screen shows *No model provider
  connected — the agent can't run.* Press **Connect a provider** (or the gear in the top bar, then
  **Providers**) and pick one:
  - **JetBrains AI** — connects through JetBrains' Central CLI on the host; the JetBrains AI card walks
    you through installing it, signing in, and **Connect**.
  - **Subscriptions** — use an existing Claude, ChatGPT, or Copilot plan with **Sign in**.
  - **Available** — any other `pi` provider, with **Sign in** or **API key**.

  Providers `pi` already finds through environment variables or `models.json` are listed as configured
  outside the app. ThinkRail has no account of its own; credentials stay with `pi` and the provider.

## 2. Open a project

A project is a local git repository. With no project open, the Welcome screen shows one **Open project**
card; later, the **+** at the top of the Projects rail opens the same menu:

- **Open project** — pick a folder on the machine running ThinkRail.
- **Enter host path…** — type the path instead.
- **Recents** — reopen a project you had before.

From the command line, `thinkrail ~/code/my-repo` opens the repo directly.

ThinkRail works on git worktrees, so a folder that is not a git repository prompts **Initialize a git
repository?** — **Initialize & open** runs `git init` and commits the folder's current contents.

If the repository ships its own skills, `pi` resources, or MCP servers, a notice names what trusting it
would load. Nothing from the repository loads until you press **Trust project**, and **Stop trusting**
undoes it. MCP servers the repository defines still need your approval one by one.

## 3. Choose how to work

With a project selected, the Welcome screen offers up to three cards:

| Card | What it does | Pick it when |
| --- | --- | --- |
| **Set up project** *(spec-first)* | Opens a new workspace seeded with `/skill:setting-up-a-project`: the agent drafts the project's specs, starting from its goal, before building anything. Shown only while the project has no specs. | You are starting a new project, or bringing an existing codebase to ThinkRail for the first time. The specs become the agent's durable knowledge of the project. |
| **Start building** | Opens **Create workspace** on **Isolated workspace**: choose a base branch, optionally say *What do you want to work on?*, and **Create** cuts a fresh `git worktree` and branch and starts a chat there. | Most work. Each task gets its own branch, so several agents can run in parallel, and nothing touches your checkout until you merge. |
| **Work in project folder** | Enters the project's *Default* workspace — the project folder itself, on whatever branch it has checked out. No isolation. | Quick edits, or work that has to happen in your existing checkout and branch. |

Setup also runs in an isolated workspace, so the drafted specs are reviewable on their own branch. In
**Create workspace** you can still switch to **Project folder**. Every workspace appears under its
project in the Projects rail.

## 4. Work in a chat

- Type in the composer and press **Enter** to send. `@` mentions files; `/` lists commands, skills, and
  prompt templates.
- While the agent is working, you do not have to wait:
  - **Enter** — **Steer**: your message reaches the agent at its next step.
  - **Mod+Enter** — **Queue**: it runs after the agent finishes.
  - **Mod+Shift+Enter** — **Interrupt**: stops the current response and sends now.
- The model and thinking-level pickers sit in the composer and apply to that chat. Set the default model
  for new chats in **Settings → Models**.
- Open more chats in the same workspace with the **New chat** button in the tab strip. **Mod+N** starts a
  new workspace in the current project; in a browser, where Cmd/Ctrl+N opens a new window, use
  **Mod+Alt+N**.

## 5. Review and ship

- **Changes.** The Changes tool on the right lists the workspace's changes, scoped by **All changes**,
  **Uncommitted changes**, the last agent turn, earlier turns, or a commit. Click a row to open the
  Changes review tab, where you can read every changed file and mark each one viewed. A turn's **Review
  turn** chip in the chat opens the same review for just that turn.
- **Review comments.** Leave comments on lines of a file or diff. They collect in the Review tool as
  drafts until you **Send** one or **Send review** for all of them, which hands them to the agent in a
  chat.
- **The plan.** For multi-step work the agent keeps a shared plan in the **TODO List** tool. You can add
  and edit steps too. Open it as a page to review the changes behind each step.
- **Ship a pull request.** When every step is done and reviewed, the plan page offers **Open PR**: edit
  the title and description, and ThinkRail pushes the branch and opens the PR. You can also ask the agent
  to ship; the bundled `shipping-a-pr` workflow pushes, opens or updates the PR, and can watch CI and
  address review comments. Both use your own GitHub CLI (`gh`), installed and signed in on the host;
  **Settings → Integrations** shows its status.
- **Settled shelf.** When a workspace's pull request merges or closes, or the workspace sits idle, it
  moves to the project's **Settled** shelf in the Projects rail. You can also settle a workspace by hand.
  It comes back as soon as you work in it again. **Settings → Workspaces** sets how long idle takes.
