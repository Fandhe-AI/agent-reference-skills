# Codex Cloud

Give Codex coding tasks to work through in the cloud, from investigating bugs to building features. Review changes and continue from the web, mobile, or desktop app.

## Signature / Usage

Open ChatGPT on the web, mobile, or in the desktop app and sign in; or run `codex cloud` from the Codex CLI to browse and submit cloud tasks.

## Getting started

1. **Open ChatGPT** on the web, mobile, or in the desktop app, then sign in with your ChatGPT account.
2. **Create or select an environment.** On the web or in the desktop app, choose Work in > Cloud and open Select environment. On mobile, open Codex. Select an existing environment to begin; to create one, use the web or desktop app and select Create environment (see cloud-environments.md in the environments category).
3. **Let Codex prepare your project.** Choose your GitHub repositories and select Get started (connect GitHub if prompted). Codex inspects your repositories, installs dependencies and tools, and tests the workflow. Provide any missing access or information when asked.
4. **Review and publish.** For a new environment, review the setup and test results, save changes, and select Publish. Wait for Environment published.
5. **Start a task.** After publishing a new environment, select Start a new task (with an existing environment you can start right away). Describe your task and send it. Review the changes and test results, request follow-ups, and commit or open a pull request when ready.

## Why use Codex Cloud

- **Start with your project:** choose repositories; Codex inspects the project, works through setup, and asks for missing details or access.
- **Keep work moving:** start tasks from a published environment; each task has its own workspace and can keep working while your computer is asleep.
- **Review the work:** inspect changed files and results, request follow-up changes, and commit or open a pull request when you're ready.

## Notes

- Use Codex Cloud when work should run remotely, several tasks need the same setup, or your workflow needs service credentials (network secrets for allowed HTTPS services with limited network destinations).
- Next steps: configure cloud environments, internet access (Connect to services), environment variables and network secrets, saved state (Reuse and update saved state), and ChatGPT in Slack (see `../environments/cloud-environments.md` and `../third-party/slack.md`).
- From the CLI, `codex cloud` starts a task from your terminal, or lists recent cloud chats and checks their status.
- Legacy flow: the earlier environment-settings / secrets wording (chatgpt.com/codex/settings/environments) is the "Codex Cloud (Legacy)" experience, documented in `../environments/cloud-environment.md`; legacy internet access settings are in [cloud-internet-access.md](./cloud-internet-access.md).
- Source: https://learn.chatgpt.com/docs/cloud (retrieved 2026-10).

## Related

- [cloud-internet-access.md](./cloud-internet-access.md)
- [Cloud environments](../environments/cloud-environments.md)
- [Codex Cloud (Legacy) environment](../environments/cloud-environment.md)
- [cli.md](./cli.md)
- [ide.md](./ide.md)
- [models.md](./models.md)
