# Third-party

| Name | Description | Path |
|------|-------------|------|
| Code review | Use ChatGPT or Codex to understand code changes, investigate potential issues, and prepare review feedback: the Code Review plugin for pull requests, and the built-in `/review` command for local Git changes. | [code-review.md](./code-review.md) |
| Review GitHub pull requests with Codex | Use Codex code review to get another high-signal review pass on GitHub pull requests. Codex reviews the pull request diff, follows repository guidance from `AGENTS.md`, and posts a standard GitHub code review focused on serious issues. Security Review (research preview) provides a more in-depth review of potential security issues. | [github.md](./github.md) |
| Review GitLab merge requests with Codex | Codex code review posts a standard GitLab code review on merge requests, following repository guidance from `AGENTS.md`. GitLab support is in beta, available on all ChatGPT plans, and runs in Codex cloud. | [gitlab.md](./gitlab.md) |
| Use Codex in Linear | Delegate work from Linear issues: assign an issue to Codex or mention `@Codex` in a comment, and Codex creates a cloud chat and replies with progress and results. Available on paid plans. | [linear.md](./linear.md) |
| Use ChatGPT in Slack | Mention `@ChatGPT` in a Slack channel to start a request. If your workspace has Cloud delegation enabled, ChatGPT can send repository work to a separate Codex Cloud task and return the result to the thread. (Formerly `@Codex`; see "Move to the ChatGPT app".) | [slack.md](./slack.md) |
