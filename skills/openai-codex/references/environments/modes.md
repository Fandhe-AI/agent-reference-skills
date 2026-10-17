# Codex environments (chat run modes)

Where a Codex chat runs and how its files stay isolated, chosen in the ChatGPT desktop app when starting a chat: Local, Worktree, or Cloud.

## Signature / Usage

In the ChatGPT desktop app, open the ChatGPT dropdown and select **Codex**. When starting a chat, choose where it runs. Use **Work in** to choose **This computer** or **Cloud**; for a local Git project, the separate **Worktree** control isolates changes from your current checkout.

## Options / Props

| Name | Description |
|------|-------------|
| Local | Work directly in the current project directory. |
| Worktree | Isolate changes in a Git worktree; runs on the local machine like Local. |
| Cloud | Start a remote task in its own workspace from a published, reusable cloud environment. |

## Notes

- Local and Worktree both run on the local computer; only Cloud runs remotely.
- A cloud task requires a published environment you can access. If none is available, create one on the web or in the desktop app, or ask a workspace admin for access to a shared environment. Selecting an environment is separate from creating or publishing it; shared access lets you use the environment but doesn't grant permission to edit it. You can also start and continue cloud tasks on the web or on mobile (open **Codex** and select a published environment).
- To create an environment, start a new task on the web or in the desktop app, choose **Work in** > **Cloud**, open **Select environment**, then select **Create environment**; Codex inspects your selected repositories and helps prepare and test their setup before you publish it (see cloud-environments.md).
- Each Cloud task has its own working files; file changes in a task don't update the reusable environment. To change the starting point for future tasks, update and republish the environment's setup. A cloud task uses the files and services in its cloud environment; your computer's local files, running processes, browser sign-ins, and VPN access aren't automatically transferred.
- This page is the desktop-app run-mode selector, distinct from `cloud-environment.md` (Codex Cloud (Legacy) environment configuration) and `getting-started/cloud.md` (Codex Cloud overview).

## Related

- [git-worktrees.md](./git-worktrees.md)
- [cloud-environments.md](./cloud-environments.md)
- [cloud-environment.md](./cloud-environment.md)
- [Codex cloud](../getting-started/cloud.md)
- [Prompting](../agent-configuration/prompting.md)
