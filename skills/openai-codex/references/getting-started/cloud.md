> OpenAI Codex (learn.chatgpt.com) のドキュメント.

# Codex cloud

Run coding tasks in isolated, parallel cloud environments. Work in parallel, and start work from the web, GitHub, Linear, or Slack.

## Signature / Usage

Open [chatgpt.com/codex](https://chatgpt.com/codex) and sign in with a ChatGPT account, or run `codex cloud` from the Codex CLI to browse and submit cloud tasks.

## Getting started

1. **Open Codex and sign in** at [chatgpt.com/codex](https://chatgpt.com/codex).
2. **Connect GitHub** and choose the repositories Codex can access.
3. **Create an environment** in [environment settings](https://chatgpt.com/codex/settings/environments): configure dependencies, tools, environment variables, or secrets the task needs.
4. **Start your first task**: choose the environment and describe the result you want; watch logs or let the task run in the background.
5. **Review the result**: inspect the summary and diff, ask for follow-up changes, or open a pull request.

## Why use Codex cloud

- **Run work in parallel** — give longer tasks dedicated environments and continue other work.
- **Reproduce the environment** — configure dependencies, tools, variables, and setup steps per repository.
- **Review before you merge** — inspect the summary/diff, request a follow-up, or open a pull request.

## Use Codex cloud when...

- Work needs to run in the background and you want to return when it's ready.
- You want to compare several attempts by running tasks in parallel without tying up your local machine.
- Work starts in GitHub, Linear, or Slack and you want to hand it off without leaving the pull request, issue, channel, or thread.
- You are away from your development machine and want to start/review work from the web or Codex CLI.

## Notes

- Codex CLI can browse active/completed cloud chats, submit work, and apply the result to a local repository via `codex cloud`.
- Internet access for cloud agents is off by default and is configured per environment (see Agent internet access below).
- Cloud environment configuration details, and GitHub/Linear/Slack integration specifics, belong to separate reference pages outside this category.

## Related

- [cloud-internet-access.md](./cloud-internet-access.md)
- [cli.md](./cli.md)
- [ide.md](./ide.md)
- [models.md](./models.md)
