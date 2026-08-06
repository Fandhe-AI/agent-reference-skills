# Config basics

Codex reads configuration from multiple layered locations. User defaults live in `~/.codex/config.toml`; project overrides live in `.codex/config.toml` (loaded only for trusted projects).

## Signature / Usage

```toml
# ~/.codex/config.toml
model = "gpt-5.6"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

Open the file from the Codex IDE extension via the gear icon > **Codex Settings > Open config.toml**.

## Configuration precedence

Highest to lowest precedence:

1. CLI flags and `--config` overrides
2. Project config files: `.codex/config.toml`, root to cwd (closest wins; trusted projects only)
3. [Profile](./config-advanced.md) files selected with `--profile profile-name` (`~/.codex/profile-name.config.toml`)
4. User config: `~/.codex/config.toml`
5. System config (if present): `/etc/codex/config.toml` on Unix
6. Built-in defaults

On managed machines, `requirements.toml` can additionally constrain security-sensitive settings (for example disallowing `approval_policy = "never"`). See [Configuration Reference](./config-reference.md).

If a project is marked untrusted, Codex skips project-scoped `.codex/` layers (config, hooks, rules); user/system config and hooks/rules still load.

## Common configuration options

| Key | Example | Description |
|-----|---------|-------------|
| `model` | `model = "gpt-5.6"` | Default model. |
| `approval_policy` | `approval_policy = "on-request"` | `untrusted` \| `on-request` \| `never` \| granular table. |
| `sandbox_mode` | `sandbox_mode = "workspace-write"` | `read-only` \| `workspace-write` \| `danger-full-access`. |
| `default_permissions` | `default_permissions = ":workspace"` | Named permission profile (`:read-only`, `:workspace`, `:danger-full-access`, or a custom `[permissions.<name>]`). |
| `[windows] sandbox` | `sandbox = "elevated"` | Native Windows sandbox mode: `elevated` (recommended) or `unelevated`. |
| `web_search` | `web_search = "cached"` | `cached` (default) \| `indexed` \| `live` \| `disabled`. |
| `model_reasoning_effort` | `model_reasoning_effort = "high"` | Reasoning effort for supported models. |
| `personality` | `personality = "friendly"` | `friendly` \| `pragmatic` \| `none`; overridable with `/personality`. |
| `[tui.keymap.*]` | see below | Customize TUI shortcuts. |
| `[shell_environment_policy]` | see below | Control env vars forwarded to spawned commands. |
| `log_dir` | `log_dir = "/path/to/codex-logs"` | Log directory; also enables `codex-tui.log`. |

```toml
[tui.keymap.global]
open_transcript = "ctrl-t"

[shell_environment_policy]
ignore_default_excludes = false

[shell_environment_policy.filters]
"PATH" = "include"
"HOME" = "include"
```

`shell_environment_policy.ignore_default_excludes` defaults to `true` (skips filtering `KEY`/`SECRET`/`TOKEN` variable names); set `false` to enable that automatic filtering.

`shell_environment_policy.filters` (`map<string, "include" | "exclude">`) is the canonical, current form for pattern-based variable filtering; include entries create an allowlist and can't restore excluded values. The legacy `shell_environment_policy.exclude` / `include_only` arrays still work but are superseded by `filters` — don't combine the legacy arrays with `filters` in the same config layer.

## Feature flags

Use `[features]` to toggle optional/experimental capabilities.

| Key | Default | Maturity | Description |
|-----|---------|----------|-------------|
| `apps` | true | Stable | Enable app (connector) integrations |
| `goals` | true | Stable | Persisted goals and automatic continuation |
| `hooks` | true | Stable | Lifecycle hooks from `hooks.json` or inline `[hooks]` |
| `fast_mode` | true | Stable | Fast mode selection / `service_tier = "fast"` |
| `memories` | false | Experimental | Enable Memories |
| `multi_agent` | true | Stable | Subagent collaboration tools |
| `personality` | true | Stable | Personality selection controls |
| `remote_plugin` | true | Stable | Remote plugin catalog |
| `shell_snapshot` | true | Stable | Snapshot shell env to speed up repeated commands |
| `shell_tool` | true | Stable | Default `shell` tool |
| `unified_exec` | true (not Windows) | Stable | Unified PTY-backed exec tool |
| `web_search` / `web_search_cached` / `web_search_request` | — | Deprecated | Prefer top-level `web_search` |

Enable via `[features]` table (`feature_name = true`) or CLI: `codex --enable feature_name` (repeatable). Omit keys to keep defaults.

## Notes

- The CLI and IDE extension share the same configuration layers.
- For one-off `-c`/`--config` overrides and TOML quoting rules, see [Advanced Config](./config-advanced.md).

## Related

- [Advanced Configuration](./config-advanced.md)
- [Configuration Reference](./config-reference.md)
- [Sample Configuration](./config-sample.md)
- [Environment variables](./environment-variables.md)
