# FAQ & Troubleshooting

Frequently asked questions, troubleshooting guidance, and workflow patterns for Hermes Agent.

## Frequently Asked Questions

### LLM Provider Support

Hermes works with any OpenAI-compatible API, including OpenRouter, Nous Portal, OpenAI, Anthropic, Google, z.ai/ZhipuAI, Kimi/Moonshot AI, MiniMax, and local models via Ollama, vLLM, llama.cpp, SGLang, or any OpenAI-compatible server.

### Windows Compatibility

Hermes requires a Unix-like environment. Install WSL2 and run Hermes from within it using the standard installation script.

### Android / Termux

Hermes runs on Android via Termux. Use the standard installation script within the Termux environment.

### Data Privacy

API calls go only to the LLM provider you configure. Hermes Agent does not collect telemetry, usage data, or analytics. Conversations, memory, and skills are stored locally.

### Offline & Local Models

Configure custom endpoints using `hermes model` and select the Custom endpoint option. Supported backends: Ollama, vLLM, llama.cpp server, SGLang, and LocalAI.

### Cost

Hermes Agent itself is free and open-source (MIT license). You pay only for LLM API usage from your chosen provider. Local models are completely free.

### Multi-User Access

Multiple users can interact with the same Hermes Agent instance via Telegram, Discord, Slack, WhatsApp, or Home Assistant. Access is controlled through allowlists and DM pairing.

### Memory vs. Skills

- **Memory**: stores facts — things the agent knows about you
- **Skills**: stores procedures — step-by-step instructions for how to do things

### Python Integration

Developers can import the `AIAgent` class and use Hermes programmatically within their own projects.

## Troubleshooting

### Installation Issues

| Symptom | Resolution |
|---------|------------|
| Command not found | Reload shell profile: `source ~/.bashrc` or `source ~/.zshrc` |
| Python too old | Requires Python 3.11+; install via apt or Homebrew |
| `uv` not found | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Permission errors | Avoid `sudo`; reinstall to `~/.local/bin` |

### Provider & Model Issues

| Symptom | Resolution |
|---------|------------|
| Invalid API key | Verify with `hermes config show`; confirm key matches provider |
| Model unavailable | List options with `hermes model`; verify identifier |
| Rate limiting | Wait or upgrade provider plan; switch models if needed |
| Context length exceeded | Use `/compress` command or switch to larger-context model |
| Context detection failure | Set `context_length` explicitly in `config.yaml` |

### Terminal Issues

| Symptom | Resolution |
|---------|------------|
| Dangerous command blocked | Review and approve with `y`; this is intentional safety behavior |
| `sudo` via messaging | Not supported in messaging gateways; configure passwordless sudo or use CLI |
| Docker not connecting | Ensure daemon is running; add user to docker group |

### Messaging Issues

| Symptom | Resolution |
|---------|------------|
| Bot not responding | Verify gateway running: `hermes gateway status` |
| Messages not delivering | Check logs at `~/.hermes/logs/gateway.log` |
| Allowlist confusion | Authorization modes: Allowlist, DM pairing, Open |
| Gateway won't start | Install platform-specific dependencies; check port conflicts |
| macOS PATH issues | Rerun `hermes gateway install` to capture updated PATH |

### Performance Issues

| Symptom | Resolution |
|---------|------------|
| Slow responses | Try smaller model; reduce active toolsets; check network |
| High token usage | Use `/compress` to reduce context |
| Session too long | Use `/compress` or start a fresh session |

### MCP Issues

| Symptom | Resolution |
|---------|------------|
| Server not connecting | Verify binary found; ensure Node.js available for npm-based servers |
| Tools not showing | Check logs for connection errors; verify server responds to `tools/list` |
| MCP timeouts | Check if server is still running; increase timeout if supported |

## Profiles

Profiles provide a managed layer on top of `HERMES_HOME`, handling directory structure, shell aliases, and skill updates across profiles.

### Key Behaviors

- **Bot token sharing**: Each messaging platform requires exclusive access to a bot token. If two profiles try to use the same token simultaneously, the second gateway will fail.
- **Data isolation**: Each profile has its own memory store, session database, and skills directory. They are completely isolated.
- **Update behavior**: `hermes update` pulls latest code and reinstalls dependencies once, then syncs updated skills to all profiles.
- **Profile movement**: Export with `hermes profile export`, then import on another machine.
- **Profile capacity**: No hard limit; practical limit depends on disk space and concurrent gateways the system can handle.

## Workflows & Patterns

### Multi-Model Workflows

Configure delegation in `config.yaml` to route subagents to specific models automatically.

### WhatsApp Per-Chat Binding

Current limitation prevents multiple profiles on one number. Workarounds: personality switching, cron jobs, separate numbers, or switching to Telegram/Discord.

### Telegram Display Control

Adjust `display.tool_progress` to `off`, `new`, `all`, or `verbose`.

### Telegram Skill Limits

Disable unused skills via `hermes skills config` to stay under the 100-command limit.

### Shared Thread Sessions

Slack supports thread-based sessions for multiple users. Discord supports channel-based sharing.

### Machine Export

Use profile export/import or sync the `~/.hermes/` directory (excluding the `hermes-agent` subdirectory).

### Common Errors

- **HTTP 400**: Usually indicates model mismatch or insufficient API key permissions on the provider side.
- **Shell permission issues**: Fix with `chmod 644 ~/.zshrc` if needed.

## Related

- [Skills Hub](./skills-hub.md)
