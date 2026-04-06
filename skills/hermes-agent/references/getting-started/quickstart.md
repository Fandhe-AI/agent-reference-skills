# Quickstart

Start using Hermes Agent in a terminal with a chosen LLM provider, built-in tools, and slash commands after a one-line install.

## Signature / Usage

```bash
# Install
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# Configure provider
hermes model

# Start chatting
hermes
```

## Key Commands

| Command | Description |
|---------|-------------|
| `hermes` | Start interactive chat session |
| `hermes --continue` / `hermes -c` | Resume previous session |
| `hermes update` | Update to latest version |
| `hermes doctor` | Run diagnostics |
| `hermes gateway` | Configure messaging integrations |
| `hermes setup` | Run interactive setup wizard |

## Slash Commands (in-session)

Type `/` inside a chat session to trigger autocomplete:

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/tools` | List and toggle tools |
| `/model` | Switch LLM provider mid-session |
| `/personality` | Adjust agent persona |

## Supported LLM Providers

15+ providers with no vendor lock-in:

- **Nous Portal** (subscription)
- OpenAI, Anthropic, OpenRouter
- Hugging Face (open-source models)
- Custom endpoints: VLLM, Ollama, etc.

## Advanced Capabilities

| Feature | Description |
|---------|-------------|
| Sandboxed terminal | Docker or SSH isolation |
| Messaging integrations | Telegram, Discord, Slack, WhatsApp, Signal |
| Voice mode | Speech-to-text + TTS |
| Cron scheduling | Automate recurring tasks |
| Skills marketplace | Extend agent functionality |
| ACP editor integration | VS Code, Zed, JetBrains |
| MCP server support | External tool integration |

## Notes

- Use **Alt+Enter** or **Ctrl+J** for multi-line input (e.g., pasting code blocks).
- Windows users must install WSL2 before running the installer.
- Provider configuration can be changed at any time with `hermes model` or `/model` inside a session.

## Related

- [Installation](./installation.md)
- [Learning Path](./learning-path.md)
