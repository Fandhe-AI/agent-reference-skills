# Quickstart

Start using Hermes Agent in a terminal with a chosen LLM provider, built-in tools, and slash commands after a one-line install.

## Signature / Usage

```bash
# Install (Linux/macOS/WSL2/Android)
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash

# Install (Windows PowerShell)
iex (irm https://hermes-agent.nousresearch.com/install.ps1)

# Configure provider
hermes model

# Start chatting
hermes
# or with terminal UI
hermes --tui
```

## Key Commands

| Command | Description |
|---------|-------------|
| `hermes` | Start interactive chat session |
| `hermes --tui` | Start with terminal UI (recommended) |
| `hermes --continue` / `hermes -c` | Resume previous session |
| `hermes update` | Update to latest version |
| `hermes doctor` | Run diagnostics |
| `hermes gateway` | Configure messaging integrations |
| `hermes setup` | Run interactive setup wizard |
| `hermes setup --portal` | Quick Nous Portal configuration (300+ models) |

## Slash Commands (in-session)

Type `/` inside a chat session to trigger autocomplete:

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/tools` | List and toggle tools |
| `/model` | Switch LLM provider mid-session |
| `/personality` | Adjust agent persona |

## Supported LLM Providers

18+ providers with no vendor lock-in. Models must support at least 64,000 tokens of context.

- **Nous Portal** (subscription, zero-config; 300+ models)
- OpenAI, Anthropic, Google Gemini
- OpenRouter (multi-provider routing)
- Hugging Face (open-source models)
- Local options: Ollama, LM Studio, VLLM
- Custom OpenAI-compatible endpoints

## Advanced Capabilities

| Feature | Description |
|---------|-------------|
| Desktop app | Native macOS, Windows, Linux app with drag-and-drop files |
| Sandboxed terminal | Docker or SSH isolation |
| Messaging integrations | Telegram, Discord, Slack, WhatsApp, Signal, Teams, and 20+ platforms |
| Voice mode | Speech-to-text + TTS |
| Cron scheduling | Automate recurring tasks |
| Skills marketplace | Extend agent functionality |
| ACP editor integration | VS Code, Zed, JetBrains |
| MCP server support | External tool integration |

## Notes

- Use **Alt+Enter** or **Ctrl+J** for multi-line input (e.g., pasting code blocks).
- Windows users can use the Desktop installer or the PowerShell one-liner (`iex (irm https://hermes-agent.nousresearch.com/install.ps1)`) — no WSL2 required.
- Provider configuration can be changed at any time with `hermes model` or `/model` inside a session.

## Related

- [Installation](./installation.md)
- [Learning Path](./learning-path.md)
