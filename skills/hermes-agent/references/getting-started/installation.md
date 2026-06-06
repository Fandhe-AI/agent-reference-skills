# Installation

Install Hermes Agent via the Desktop installer or a one-line script (Linux, macOS, WSL2, Android, Windows). The automated installer handles all dependencies and has you running in under two minutes.

## Signature / Usage

```bash
# Quick install (Linux, macOS, WSL2, Android/Termux)
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash

# Windows (PowerShell)
iex (irm https://hermes-agent.nousresearch.com/install.ps1)

# After installation
hermes
```

## Install Methods

| Method | Platforms | Notes |
|--------|-----------|-------|
| Desktop installer | macOS, Windows, Linux | Recommended; one-click, in-app self-update |
| CLI script (bash) | Linux, macOS, WSL2, Android | Handles all dependencies automatically |
| CLI script (PowerShell) | Windows native | No admin rights required |
| Nix flake / NixOS module | NixOS | Dedicated Nix setup path |

## Options / Props

| Extra | Description |
|-------|-------------|
| `[messaging]` | Telegram / Discord support |
| `[cron]` | Scheduled task support |
| `[voice]` | Speech-to-text / TTS |
| `[homeassistant]` | Home Assistant integration |
| `[slack]` | Slack connectivity |
| `[all]` | All optional extras |

Install with extras:

```bash
uv pip install -e ".[messaging,voice]"
```

## Manual Installation Steps

1. Clone repository with submodules
2. Install `uv` and create a Python 3.11 virtual environment
3. `uv pip install -e ".[all]"`
4. Optionally install `tinker-atropos` submodule
5. `npm install` for browser / WhatsApp tools (optional)
6. Create config directories at `~/.hermes/`
7. Add API keys to `~/.hermes/.env` (minimum: LLM provider key)
8. Symlink `hermes` command to `PATH`
9. `hermes model` — configure LLM provider
10. `hermes doctor` — verify installation

## Post-Installation Commands

| Command | Description |
|---------|-------------|
| `hermes model` | Select / change LLM provider |
| `hermes setup --portal` | Quick Nous Portal configuration (300+ models) |
| `hermes tools` | Enable or disable tools |
| `hermes doctor` | Diagnose configuration issues |
| `hermes chat -q "prompt"` | Test functionality non-interactively |
| `hermes config check` | Validate configuration |

## Notes

- Windows native is supported (no WSL2 required). The PowerShell installer bundles a portable MinGit and all dependencies under `%LOCALAPPDATA%\hermes`.
- Only **Git** is required before running the quick installer on Linux/macOS — all other dependencies (Python 3.11 via `uv`, Node.js v22, ripgrep, ffmpeg) are detected and installed automatically.
- The installer sets up a virtual environment and configures a global `hermes` command.
- If `hermes` is not found after install, reload your shell (`source ~/.bashrc` or `source ~/.zshrc`).
- Use `--skip-browser` to skip Playwright installation in headless environments.
- For service accounts, run `sudo npx playwright install-deps chromium` separately to allow unprivileged user installs.

## Related

- [Quickstart](./quickstart.md)
- [Learning Path](./learning-path.md)
