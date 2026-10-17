# Environments

| Name | Description | Path |
| --- | --- | --- |
| Codex Cloud (Legacy) | Codex Cloud (Legacy) continues to support environments for Code Review and the Linear and GitHub integrations. For the current web, mobile, and desktop experience, see [Cloud environments](./cloud-environments.md). Use environments to control what Codex installs and runs during cloud chats: dependencies, tools (linters, formatters), and environment variables. Configured in Codex settings (chatgpt.com/codex/settings/environments). | [cloud-environment.md](./cloud-environment.md) |
| Cloud environments | A cloud environment is the reusable setup (repositories, dependencies, tools, access settings) that Codex Cloud tasks start from. Each new task gets its own isolated workspace from the published environment; Codex inspects the repositories, prepares the setup, and tests it with you. | [cloud-environments.md](./cloud-environments.md) |
| Worktrees | Git worktrees in Codex in the ChatGPT desktop app let Codex run multiple independent chats in the same project without interfering with each other, and move a chat between Local and Worktree via Handoff. | [git-worktrees.md](./git-worktrees.md) |
| Local environments | Configure setup steps for worktrees and common actions for a project, in Codex in the ChatGPT desktop app. Stored in the `.codex` folder at the project root, so the configuration can be checked into Git and shared. | [local-environment.md](./local-environment.md) |
| Codex environments (chat run modes) | Where a Codex chat runs and how its files stay isolated, chosen in the ChatGPT desktop app when starting a chat: Local, Worktree, or Cloud. | [modes.md](./modes.md) |
