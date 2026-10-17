# Config basics

Codex reads configuration from multiple layered locations. User defaults live in `~/.codex/config.toml`; project overrides live in `.codex/config.toml` (loaded only for trusted projects).

## Signature / Usage

```toml
# ~/.codex/config.toml
model = "gpt-6.1-sol"
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
5. Cloud-managed `config.toml` defaults, when delivered for the signed-in workspace
6. System config (if present): `/etc/codex/config.toml` on Unix
7. Built-in defaults

Requirements constrain behavior; configuration values provide defaults. On managed machines, `requirements.toml` can additionally constrain security-sensitive settings (for example disallowing `approval_policy = "never"` or `sandbox_mode = "danger-full-access"`). See [Configuration Reference](./config-reference.md).

Cloud-managed and system configuration can define plugin marketplaces and set whether plugins are enabled by default; these are separate from enforced `requirements.toml` policies.

If a project is marked untrusted, Codex skips project-scoped `.codex/` layers (config, hooks, rules); user/system config and user/global hooks and rules still load.

## Common configuration options

| Key | Example | Description |
|-----|---------|-------------|
| `model` | `model = "gpt-6.1-sol"` | Default model. |
| `approval_policy` | `approval_policy = "on-request"` | `on-request` \| `never` \| granular table. `untrusted` is retired (see Notes). |
| `sandbox_mode` | `sandbox_mode = "workspace-write"` | `read-only` \| `workspace-write` \| `danger-full-access`. |
| `default_permissions` | `default_permissions = ":workspace"` | Named permission profile (`:read-only`, `:workspace`, `:danger-full-access`, or a custom `[permissions.<name>]`). |
| `[windows] sandbox` | `sandbox = "elevated"` | Legacy Windows sandbox fallback: `elevated` or `unelevated`. Prefer MXC via `[features] prefer_mxc = true`. |
| `web_search` | `web_search = "cached"` | `cached` (default) \| `indexed` \| `live` (same as `--search`) \| `disabled`. With `--yolo` or another full access sandbox setting, defaults to live. |
| `model_reasoning_effort` | `model_reasoning_effort = "medium"` | Reasoning effort for supported models. |
| `personality` | `personality = "none"` | Omits the built-in `Personality` section; `friendly` / `pragmatic` no longer select a style. |
| `[tui.keymap.*]` | see below | Customize TUI shortcuts. |
| `[shell_environment_policy]` | see below | Control env vars forwarded to spawned commands. |
| `log_dir` | `log_dir = "/path/to/codex-logs"` | Log directory; setting it also enables the opt-in `codex-tui.log`. One-off: `codex -c log_dir=./.codex-log`. |

```toml
[tui.keymap.global]
open_transcript = "ctrl-t"

[tui.keymap.composer]
submit = ["enter", "ctrl-m"]

[tui.keymap.chat]
interrupt_turn = "f12"

[shell_environment_policy]
ignore_default_excludes = false

[shell_environment_policy.filters]
"PATH" = "include"
"HOME" = "include"

[windows]
sandbox = "elevated" # Legacy fallback

[features]
prefer_mxc = true
```

`tui.keymap` is split into `[tui.keymap.global]`, `[tui.keymap.composer]`, and `[tui.keymap.chat]`. Selected composer actions fall back to matching `tui.keymap.global` bindings; context-specific bindings take precedence when supported. An empty list unbinds the action.

`shell_environment_policy.ignore_default_excludes` defaults to `true` (skips automatic filtering of names containing `KEY`/`SECRET`/`TOKEN`); set `false` to enable that filtering.

`shell_environment_policy.filters` (`map<string, "include" | "exclude">`) is the canonical, current form for pattern-based variable filtering; include entries create an allowlist and can't restore excluded values. The legacy `shell_environment_policy.exclude` / `include_only` arrays still work but are superseded by `filters` — don't combine the legacy arrays with `filters` in the same config layer.

## Feature flags

Use `[features]` to toggle optional/experimental capabilities. The table lists common user-facing flags, not every internal or under-development feature.

| Key | Default | Maturity | Description |
|-----|---------|----------|-------------|
| `apps` | true | Stable | Enable app (connector) integrations |
| `goals` | true | Stable | Enable persisted goals and automatic continuation |
| `hooks` | true | Stable | Enable lifecycle hooks from `hooks.json` or inline `[hooks]` |
| `fast_mode` | true | Stable | Enable Fast mode selection and the `service_tier = "fast"` path |
| `memories` | false | Experimental | Enable Memories |
| `multi_agent` | true | Stable | Enable subagent collaboration tools |
| `remote_plugin` | true | Stable | Enable the remote plugin catalog |
| `shell_snapshot` | true | Stable | Snapshot your shell environment to speed up repeated commands |
| `shell_tool` | true | Stable | Enable command execution tools |
| `unified_exec` | true | Stable | Enable resumable command execution; only managed requirements can disable it |
| `web_search` | true | Deprecated | Legacy toggle; prefer the top-level `web_search` setting |
| `web_search_cached` | false | Deprecated | Legacy toggle that maps to `web_search = "cached"` when unset |
| `web_search_request` | false | Deprecated | Legacy toggle that maps to `web_search = "live"` when unset |

Enable via `[features]` table (`feature_name = true`) or CLI: `codex --enable feature_name` (repeatable: `codex --enable feature_a --enable feature_b`). Set the key to `false` to disable. Omit keys to keep defaults.

## Notes

- The CLI and IDE extension share the same configuration layers.
- For one-off `-c`/`--config` overrides and TOML quoting rules, see [Advanced Config](./config-advanced.md).
- `approval_policy = "untrusted"` is retired; if an existing configuration uses it, see "Migrate from the retired `untrusted` approval policy" in the agent-approvals-security page (security-automation category).
- `personality`: the older `friendly` and `pragmatic` values no longer select a style, and Codex no longer provides the `/personality` command. Setting `none` doesn't change explicit custom base instructions.
- Windows: prefer MXC when the device and policy support it; use `unelevated` only when elevated setup is unavailable and organization policy permits it.
- Web search caches an OpenAI-maintained index of web results, which reduces exposure to prompt injection from arbitrary live content; treat web results as untrusted.

## Related

- [Advanced Configuration](./config-advanced.md)
- [Configuration Reference](./config-reference.md)
- [Sample Configuration](./config-sample.md)
- [Environment variables](./environment-variables.md)
