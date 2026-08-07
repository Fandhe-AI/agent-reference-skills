# Environment variables

Environment variables Codex reads, complementing `config.toml` for shell-scoped overrides and automation needs.

## Signature / Usage

```shell
export CODEX_HOME="$HOME/.codex"
export CODEX_API_KEY="sk-..."
codex exec "summarize this repo"
```

## Options / Props

| Name | Description |
|------|-------------|
| `CODEX_HOME` | Root directory for configuration, auth, logs, sessions. Default `~/.codex`; the directory must already exist if overridden. |
| `CODEX_SQLITE_HOME` | Where SQLite-backed state resides separately from `CODEX_HOME`. The config file option (`sqlite_home`) takes precedence. |
| `CODEX_NON_INTERACTIVE` | Set to `1`, `true`, or `yes` to skip installer prompts and use default responses (scripted install). |
| `CODEX_INSTALL_DIR` | Changes where the executable installs; platform-specific defaults on macOS, Linux, Windows. |
| `CODEX_API_KEY` | API key for single non-interactive runs via `codex exec`. |
| `CODEX_ACCESS_TOKEN` | ChatGPT or Codex access token for trusted automation scenarios. |
| `CODEX_CA_CERTIFICATE` | PEM certificate bundle for TLS; takes precedence over `SSL_CERT_FILE`. |
| `SSL_CERT_FILE` | PEM certificate bundle for TLS environments. |
| `RUST_LOG` | Logging verbosity: `error`, `warn`, `info`, `debug`, `trace`; supports per-component filtering. |

## Notes

- `CODEX_HOME` is the base for most other config/state locations documented in [Advanced Configuration](./config-advanced.md).

## Related

- [Config basics](./config-basics.md)
- [Advanced Configuration](./config-advanced.md)
