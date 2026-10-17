# Environment variables

Codex uses `config.toml` for durable settings. Environment variables cover shell-scoped overrides, automation secrets, installer behavior, and diagnostics. This page lists stable public variables Codex reads directly (not internal/test variables, nor provider secret names you choose with `env_key`).

## Signature / Usage

```shell
export CODEX_HOME="$HOME/.codex"
export CODEX_API_KEY="sk-..."
codex exec "summarize this repo"
```

```bash
curl -fsSL -o install.sh https://chatgpt.com/codex/install.sh
less install.sh   # review the contents and origin first
CODEX_NON_INTERACTIVE=1 sh install.sh
```

```bash
RUST_LOG=debug codex -c log_dir=./.codex-log
tail -F ./.codex-log/codex-tui.log
```

## Options / Props

Core locations:

| Variable | Used by | Default | Description |
|----------|---------|---------|-------------|
| `CODEX_HOME` | CLI, IDE extension, app-server, installers | `~/.codex` | Root for Codex state (config, auth, logs, sessions, skills, standalone package metadata). If you set it, the directory must already exist. |
| `CODEX_SQLITE_HOME` | CLI and app-server state | `CODEX_HOME` | Where SQLite-backed state is stored. The `sqlite_home` config option takes precedence. Relative paths resolve from the current working directory. |

Installer variables (standalone install scripts `https://chatgpt.com/codex/install.sh` and `install.ps1`):

| Variable | Default | Description |
|----------|---------|-------------|
| `CODEX_NON_INTERACTIVE` | `false` | `1`, `true`, or `yes` skips installer prompts (prompts use their default response); for scripted installs and updates, not first-run setup. |
| `CODEX_INSTALL_DIR` | `~/.local/bin` on macOS/Linux; `%LOCALAPPDATA%\Programs\OpenAI\Codex\bin` on Windows | Where the visible `codex` command is installed. The standalone package cache still lives under `CODEX_HOME/packages/standalone`. |

Authentication and network:

| Variable | Used by | Description |
|----------|---------|-------------|
| `CODEX_API_KEY` | Exec, review, TypeScript SDK, remote exec-server | API key for a non-interactive Codex process. Set it inline rather than job-wide when running repository-controlled code. |
| `CODEX_ACCESS_TOKEN` | CLI, app-server, trusted automation | ChatGPT or Codex access token. For persisted login, pipe it to `codex login --with-access-token`. |
| `OPENAI_FEDERATION_RULE_ID` | Workload identity | Selects the federation rule configured for the workload. |
| `OPENAI_IDENTITY_TOKEN_FILE` | Workload identity | Absolute path of the file containing the current OIDC token or SPIFFE JWT-SVID. |
| `OPENAI_WORKLOAD_IDENTITY_CONTEXT` | Workload identity | Optional bounded JSON identifiers for client-reported audit attribution; doesn't affect authentication or authorization. |
| `CODEX_CA_CERTIFICATE` | HTTPS, login, and WebSocket clients | PEM CA bundle for corporate TLS interception or private roots. Takes precedence over `SSL_CERT_FILE`. |
| `SSL_CERT_FILE` | HTTPS, login, and WebSocket clients | Fallback PEM CA bundle path when `CODEX_CA_CERTIFICATE` is unset. |

Diagnostics:

| Variable | Used by | Description |
|----------|---------|-------------|
| `RUST_LOG` | CLI and app-server | Rust log filtering and verbosity (`error`, `warn`, `info`, `debug`, `trace`, or targeted filters such as `codex_core=debug,codex_tui=debug`). `codex exec` defaults to `error` output unless set more verbose. |

## Notes

- `CODEX_HOME` is the base for most other config/state locations documented in [Advanced Configuration](./config-advanced.md).
- For provider API keys, set `env_key` in the model provider configuration; Codex reads the variable named there, so the name isn't a fixed Codex variable.
- The interactive CLI records diagnostics in bounded local stores by default; the plaintext `codex-tui.log` is opt-in via an explicit `log_dir`. In non-interactive mode, `codex exec` prints messages inline instead of writing a TUI log file.
- Run installers with `CODEX_NON_INTERACTIVE=1` on the shell that runs the downloaded installer; PowerShell: `irm https://chatgpt.com/codex/install.ps1 -OutFile install.ps1`, review the file, then `$env:CODEX_NON_INTERACTIVE=1; ./install.ps1`.
- The official docs show the installers piped straight into the shell; this page instead downloads, reviews, then runs the installer as separate steps for safety.
- For automation secret handling and access token setup, see the non-interactive mode and access-tokens pages.

## Related

- [Config basics](./config-basics.md)
- [Advanced Configuration](./config-advanced.md)
