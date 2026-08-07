# Environments

| Name | Description | Path |
|------|-------------|------|
| Cloud environments | Control what Codex installs and runs during cloud chats: dependencies, tools (linters, formatters), and environment variables. Configured per repository in Codex settings. | [cloud-environment.md](./cloud-environment.md) |
| Worktrees | Git worktrees in Codex in the ChatGPT desktop app let Codex run multiple independent chats in the same project without interfering with each other, and move a chat between Local and Worktree via Handoff. | [git-worktrees.md](./git-worktrees.md) |
| Local environments | Configure setup steps for worktrees and common actions for a project, in Codex in the ChatGPT desktop app. Stored in the `.codex` folder at the project root, so the configuration can be checked into Git and shared. | [local-environment.md](./local-environment.md) |
| Codex environments (chat run modes) | Where a Codex chat runs and how its files stay isolated, chosen in the ChatGPT desktop app when starting a chat: Local, Worktree, or Cloud. | [modes.md](./modes.md) |
