# Codex environments (chat run modes)

Where a Codex chat runs and how its files stay isolated, chosen in the ChatGPT desktop app when starting a chat: Local, Worktree, or Cloud.

## Signature / Usage

In the ChatGPT desktop app, open the ChatGPT dropdown and select **Codex**. When starting a chat, choose where it runs.

## Options / Props

| Name | Description |
|------|-------------|
| Local | Work directly in the current project directory. |
| Worktree | Isolate changes in a Git worktree; runs on the local machine like Local. |
| Cloud | Run remotely in a configured cloud environment. |

## Notes

- Local and Worktree both run on the local computer; only Cloud runs remotely.
- This page is the desktop-app run-mode selector, distinct from `cloud-environment.md` (cloud environment configuration: dependencies, secrets, caching) and `getting-started/cloud.md` (Codex cloud product overview).

## Related

- [git-worktrees.md](./git-worktrees.md)
- [cloud-environment.md](./cloud-environment.md)
- [Codex cloud](../getting-started/cloud.md)
- [Prompting](../agent-configuration/prompting.md)
