# FAQ & Troubleshooting

Frequently asked questions, troubleshooting guidance, and workflow patterns for Hermes Agent.

## Frequently Asked Questions

### LLM Provider Support

Hermes works with any OpenAI-compatible API, including OpenRouter, Nous Portal, OpenAI, Anthropic, Google, z.ai/ZhipuAI, Kimi/Moonshot AI, MiniMax, and local models via Ollama, vLLM, llama.cpp, SGLang, or any OpenAI-compatible server.

### Windows / Android / my platform

See the Platform Support page for the full availability matrix. In v0.22.2 docs Windows is supported natively (`install.ps1` or the MSIX desktop package; Windows 11 22H2+ for MSIX), and aarch64 Android uses the Termux APT package (`pkg install hermes-agent`), not the install scripts. WSL2 remains supported for Linux-style installs.

### I run Hermes in WSL2. How do I control my normal Windows Chrome?

Prefer an MCP bridge over `/browser connect`: run Hermes in WSL2 and add `chrome-devtools-mcp` as an MCP server through `cmd.exe` or `powershell.exe` (see the MCP guide).

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
| Unsupported Python version | Current first-party installations require Python 3.14, not an arbitrary newer version. The `>=3.11,<3.15` range in `pyproject.toml` only lets older installations run the updater before switching to 3.14; it does not mean the runtime supports 3.11-3.13. The installer and packaged distributions provide their pinned interpreter; do not replace the interpreter inside an installed app or container; run `hermes doctor` and use that installation's update method |
| `node: command not found` in terminal commands | Hermes builds an environment snapshot via `bash -l` and auto-sources `~/.bashrc`; list extra files in `terminal.shell_init_files` (setting it disables the default `~/.bashrc` auto-source unless you list it; `terminal.auto_source_bashrc: false` for strict login-shell semantics) |
| `uv` not found | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Permission errors | Avoid `sudo`; the installer installs to `~/.local/bin` (clean up an earlier sudo install with `sudo rm /usr/local/bin/hermes`) |

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
- **Profiles vs `HERMES_HOME`**: profiles are a managed layer (directory structure, shell aliases such as `hermes-work`, `~/.hermes/active_profile`, skill sync, tab completion). A directory under `~/.hermes/profiles/` is a profile only if it carries an identity file (`config.yaml`, `.env`, `SOUL.md`, `profile.yaml`, `auth.json`, or `state.db`).
- **Seeding a new profile**: `hermes profile create newname --clone-all` copies everything from the current profile; `--clone-from <profile>` copies from a specific source.
- **One agent per profile**: never run two agents against the same profile or Hermes home (each loads the other's memory writes); for shared memory across agents use an external memory provider.
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

Install Hermes on the new machine, run `hermes backup` on the source (zip at `~/hermes-backup-<timestamp>.zip`), copy it over, and run `hermes import <zip>` (stop the gateway first), then `hermes setup` to verify keys. A single profile moves with `hermes profile export work ./work-backup.tar.gz` and `hermes profile import ./work-backup.tar.gz work`.

| Feature | `hermes backup` | `hermes profile export` |
|---------|-----------------|-------------------------|
| Use case | Full machine migration | Porting/sharing one profile |
| Scope | Hermes data root minus exclusions | Single profile directory |
| Credentials | Included (`.env`, `auth.json`) | Excluded (stripped) |
| Format | `.zip` | `.tar.gz` |

The full backup excludes the source checkout, dependency environments and downloaded tools/runtimes, build caches, checkpoints, previous backups, browser profiles, bytecode, SQLite sidecars, `gateway.pid`, `cron.pid`, and `.backup.lock`. It reports files that failed to copy; review the skipped-file report before removing the source installation. `hermes backup --quick` saves selected state files only and is not a migration substitute. Manual fallback: `rsync -av --exclude='hermes-agent' ~/.hermes/ newmachine:~/.hermes/`.

### Still Stuck?

Search GitHub Issues, ask on the Nous Research Discord, or file a bug report with your OS, Python version, Hermes version (`hermes --version`), and the full error message.

### Common Errors

- **HTTP 400**: Usually indicates model mismatch or insufficient API key permissions on the provider side.
- **Shell permission issues**: Fix with `chmod 644 ~/.zshrc` if needed.

## Related

- [Skills Hub](./skills-hub.md)
