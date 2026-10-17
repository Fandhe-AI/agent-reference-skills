# Quickstart

Go from install to a verified working chat with Hermes Agent: install, choose a provider, run a first chat, verify sessions, then layer on gateway, cron, skills, voice, or routing.

## Signature / Usage

```bash
# Install (Linux / macOS / WSL2)
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

## The fastest path

| Goal | Do this first | Then do this |
|------|---------------|--------------|
| Hermes working on my machine | `hermes setup` | Run a real chat and verify it responds |
| I already know my provider | `hermes model` | Save the config, then start chatting |
| A bot or always-on setup | `hermes gateway setup` after CLI works | Connect Telegram, Discord, Slack, or another platform |
| A local or self-hosted model | `hermes model` → custom endpoint | Verify the endpoint, model name, and context length |
| Multi-provider fallback | `hermes model` first | Add routing and fallback only after the base chat works |

Rule of thumb: if Hermes cannot complete a normal chat, do not add more features yet.

## 1. Install Hermes Agent

- Recommended on macOS or Windows: download the Hermes Desktop installer from the Hermes website; it installs both the command-line and desktop applications.
- Without Desktop: run `install.sh` (Linux / macOS / WSL2) or `install.ps1` (Windows native), then reload your shell (`source ~/.bashrc` or `source ~/.zshrc`).
- aarch64 Android devices use the separate Termux APT package.
- Desktop first launch (v0.22.0): on a computer that has never used Hermes, the desktop app starts a short guided setup chat on the free trial model `nous/welcome` (once per OS user). **Skip setup** ends it; **Settings → Run onboarding again** brings it back.

## 2. Choose a Provider

```bash
hermes model
hermes setup --portal    # Nous Portal: 300+ models plus Tool Gateway
```

On a fresh install `hermes setup` offers three modes:

- **Quick Setup (Nous Portal)**: OAuth login, no API keys; model plus Tool Gateway tools billed to your Nous Portal subscription.
- **Full Setup**: walk through every provider, tool, and option yourself.
- **Blank Slate**: everything off except provider and model, the File Operations toolset, and the Terminal toolset. Writes an explicit `platform_toolsets.cli` list plus `agent.disabled_toolsets`. Re-enable with `hermes tools`, seed skills with `hermes skills opt-in --sync`, or tune with `hermes setup agent`.

Models must have at least 64,000 tokens of context (for local models, e.g. `--ctx-size 65536` for llama.cpp or `-c 65536` for Ollama). The full provider catalog with env vars and setup steps is on the Providers page (integrations/providers). You can switch providers at any time with `hermes model` or `/model`.

### How settings are stored

- Secrets and tokens go to `~/.hermes/.env`; non-secret settings go to `~/.hermes/config.yaml`.
- `hermes config set` routes the value to the right file:

```bash
hermes config set model anthropic/claude-opus-4.6
hermes config set terminal.backend docker
hermes config set OPENROUTER_API_KEY sk-or-...
```

## 3. Run Your First Chat

```bash
hermes            # classic CLI
hermes --tui      # modern TUI (recommended)
```

Both interfaces share sessions, slash commands, and config. Success looks like: the banner shows your model/provider, Hermes replies without error, it can use a tool if needed, and the conversation continues for more than one turn.

## 4. Verify Sessions Work

```bash
hermes --continue    # Resume the most recent session (short: hermes -c)
```

If it does not bring back the last session, check you are in the same profile and that the session was saved.

## 5. Try Key Features

| Command | What it does |
|---------|--------------|
| `/help` | Show all available commands |
| `/tools` | List available tools |
| `/model` | Switch models interactively |
| `/personality pirate` | Try a fun personality |
| `/save` | Save the conversation |

- Multi-line input: `Alt+Enter`, `Ctrl+J`, or `Shift+Enter` (`Shift+Enter` needs a terminal that sends it as a distinct sequence, e.g. Kitty / foot / WezTerm / Ghostty by default; iTerm2 / Alacritty / VS Code terminal once the Kitty keyboard protocol is enabled). `Alt+Enter` and `Ctrl+J` work everywhere.
- Interrupt: type a new message and press Enter to interrupt the current task and switch to the new instructions. `Ctrl+C` also works.

## 6. Add the Next Layer

Only after the base chat works.

| Layer | How |
|-------|-----|
| Bot or shared assistant | `hermes gateway setup` (Telegram, Discord, Slack, WhatsApp, Signal, Email, Home Assistant plugin, Microsoft Teams) |
| Automation and tools | `hermes tools`, `hermes skills`; cron only after the bot or CLI setup is stable |
| Sandboxed terminal | `hermes config set terminal.backend docker` or `ssh` |
| Voice mode | `hermes tools` → Voice providers, then `/voice on` and `Ctrl+B` to record; PM handles missing supported requirements |
| Skills | `hermes skills browse`, `hermes skills search <q>`, `hermes skills install <source/path>`; every installed skill becomes a slash command |
| MCP servers | `mcp_servers:` in `~/.hermes/config.yaml` |
| Editor integration (ACP) | `hermes acp` (ACP ships with the `all` extra; otherwise `cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['acp'], explicit=True)"`) |

For Docker sandboxes the egress credential-injection proxy keeps real API keys out of the sandbox: `hermes egress setup && hermes egress start`. Modal, SSH, Daytona, and Singularity are not wired yet.

```yaml
# ~/.hermes/config.yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"
```

## Common Failure Modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Empty or broken replies | Provider auth or model selection wrong | Run `hermes model` again and confirm provider, model, auth |
| Custom endpoint returns garbage | Wrong base URL, model name, or not OpenAI-compatible | Verify the endpoint in a separate client first |
| Gateway starts but nobody can message it | Bot token, allowlist, or platform setup incomplete | Re-run `hermes gateway setup`, check `hermes gateway status` |
| `hermes --continue` can't find old session | Switched profiles or never saved | `hermes sessions list`, confirm profile |
| Odd fallback behavior | Routing or fallback too aggressive | Keep routing off until the base provider is stable |
| `hermes doctor` flags config problems | Missing or stale config | Fix config, retest a plain chat first |

## Recovery Toolkit

In order: `hermes doctor`, `hermes model`, `hermes setup`, `hermes sessions list`, `hermes --continue`, `hermes gateway status`.

## Quick Reference

| Command | Description |
|---------|-------------|
| `hermes` | Start chatting |
| `hermes model` | Choose provider and model |
| `hermes tools` | Configure tools per platform |
| `hermes setup` | Full setup wizard |
| `hermes doctor` | Diagnose issues |
| `hermes update` | Update to latest version |
| `hermes gateway` | Start the messaging gateway |
| `hermes --continue` | Resume last session |

## Notes

- Python dependency commands on the upstream page assume a PM-prepared source checkout; after a dependency change, reactivate the checkout and restart Hermes.
- `hermes backup` migrates your whole setup to another machine (see the FAQ).

## Related

- [Installation](./installation.md)
- [Learning Path](./learning-path.md)
