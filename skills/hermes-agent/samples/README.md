# samples

| Name | Description | Path |
|------|-------------|------|
| Basic Chat | Install Hermes Agent and start an interactive session with a configured LLM provider. | [basic-chat.md](./basic-chat.md) |
| Cron Scheduling | Schedule recurring agent tasks and deliver results to a messaging channel. | [cron-scheduling.md](./cron-scheduling.md) |
| Script-Only Cron Jobs | Run a script on a schedule with no LLM call and deliver its stdout to a messaging platform. | [cron-script-only.md](./cron-script-only.md) |
| Docker Terminal | Run agent commands inside an isolated Docker container to prevent destructive operations from affecting the host. | [docker-terminal.md](./docker-terminal.md) |
| Import from Other Agents | Import an existing Claude Code (`~/.claude`) or OpenAI Codex CLI (`~/.codex`) setup into Hermes. | [import-from-other-agents.md](./import-from-other-agents.md) |
| MCP Server Setup | Connect external MCP servers (filesystem, GitHub, internal APIs) and control which tools are exposed. | [mcp-server-setup.md](./mcp-server-setup.md) |
| Memory Management | Persist facts across sessions using the two-file memory system and search past sessions with full-text indexing. | [memory-management.md](./memory-management.md) |
| Messaging Gateway | Run Hermes as a persistent bot on Telegram, Discord, Slack, and other platforms via the gateway service. | [messaging-gateway.md](./messaging-gateway.md) |
| Pipe Script Output | Send text from any shell script, CI hook, or cron job to a messaging platform with `hermes send`. | [pipe-script-output.md](./pipe-script-output.md) |
| Python Library | Embed `AIAgent` in your own Python scripts, web apps, or automation pipelines without the CLI. | [python-library.md](./python-library.md) |
| Skills Install | Browse, install, and invoke community or official skills to extend agent capabilities without writing code. | [skills-install.md](./skills-install.md) |
| Voice Mode | Enable hands-free voice interaction in the CLI using push-to-talk recording with STT and TTS providers. | [voice-mode.md](./voice-mode.md) |
| GitHub PR Review via Webhook | Have Hermes review a pull request and post a comment when GitHub sends a `pull_request` webhook. | [webhook-github-pr-review.md](./webhook-github-pr-review.md) |
