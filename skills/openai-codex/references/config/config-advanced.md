# Advanced Configuration

More advanced `config.toml` options for providers, policies, and integrations.

## Profiles

Profiles are named configuration layers switched from the CLI. `--profile profile-name` loads `~/.codex/config.toml`, then overlays `~/.codex/profile-name.config.toml`. Names may contain letters, numbers, hyphens, underscores.

```toml
# ~/.codex/deep-review.config.toml
model = "gpt-5.5"
model_reasoning_effort = "xhigh"
approval_policy = "on-request"
model_catalog_json = "/Users/me/.codex/model-catalogs/deep-review.json"
```

```shell
codex --profile deep-review
codex exec --profile deep-review "review this change"
```

A profile file only needs the values that differ from the base user config (it sits above user config, below project/CLI config).

In Codex 0.134.0+, `--profile` no longer reads `[profiles.profile-name]` from `config.toml`; move legacy profile settings into `~/.codex/profile-name.config.toml` and drop the top-level `profile = "profile-name"` selector.

## One-off overrides from the CLI

```shell
# Dedicated flag
codex --model gpt-5.6-terra

# Generic key/value override (value is TOML, not JSON)
codex --config model='"gpt-5.6-terra"'
codex --config sandbox_workspace_write.network_access=true
codex --config 'shell_environment_policy.include_only=["PATH","HOME"]'
```

- Keys use dot notation for nested values (e.g. `mcp_servers.context7.enabled=false`).
- `--config` values parse as TOML; quote them so the shell doesn't split on spaces.
- Unparseable values are treated as strings.

## Config and state locations

`CODEX_HOME` (default `~/.codex`) holds `config.toml`, `auth.json` (or OS keychain), `history.jsonl`, logs, caches.

```toml
openai_base_url = "https://us.api.openai.com/v1"
```

## Project config files (`.codex/config.toml`)

Codex walks from the project root to cwd loading every `.codex/config.toml`; closest file wins on key conflicts. Loaded only when the project is trusted. Relative paths (e.g. `model_instructions_file`) resolve relative to the containing `.codex/` folder.

Project-local config cannot override: `openai_base_url`, `chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`, `model_providers`, `notify`, `profile`, `profiles`, `experimental_realtime_ws_base_url`, `otel` (Codex warns and ignores these). Set those in user-level config; select profiles with `--profile`.

## Hooks

Hooks load from `hooks.json` or inline `[hooks]` next to active config layers: `~/.codex/hooks.json`, `~/.codex/config.toml`, `<repo>/.codex/hooks.json`, `<repo>/.codex/config.toml`. Project-local hooks load only for trusted projects.

```toml
[[hooks.PreToolUse]]
matcher = "^Bash$"

[[hooks.PreToolUse.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/pre_tool_use_policy.py"'
timeout = 30
statusMessage = "Checking Bash command"
```

If a layer has both `hooks.json` and inline `[hooks]`, Codex loads both and warns.

## Agent roles

`[agents]` in `config.toml` configures subagent roles (see the Subagents docs, out of this scope).

## Project root detection

```toml
# Treat a directory as the project root when it contains any of these markers.
project_root_markers = [".git", ".hg", ".sl"]
```

Default marker is `.git`. Set `project_root_markers = []` to skip parent search and use cwd as root.

## Custom model providers

A provider defines base URL, wire API, auth, and headers. Custom providers cannot reuse reserved IDs `openai`, `ollama`, `lmstudio`.

```toml
model = "gpt-5.6-terra"
model_provider = "proxy"

[model_providers.proxy]
name = "OpenAI using LLM proxy"
base_url = "http://proxy.example.com"
env_key = "OPENAI_API_KEY"
```

```toml
[model_providers.proxy]
name = "OpenAI using LLM proxy"
base_url = "https://proxy.example.com/v1"
env_key = "OPENAI_API_KEY"
supports_standalone_web_search = true
```

Add headers:

```toml
[model_providers.example]
http_headers = { "X-Example-Header" = "example-value" }
env_http_headers = { "X-Example-Features" = "EXAMPLE_FEATURES" }
```

Command-backed bearer token auth:

```toml
[model_providers.proxy]
name = "OpenAI using LLM proxy"
base_url = "https://proxy.example.com/v1"
wire_api = "responses"

[model_providers.proxy.auth]
command = "/usr/local/bin/fetch-codex-token"
args = ["--audience", "codex"]
timeout_ms = 5000
refresh_interval_ms = 300000
```

Don't combine `[model_providers.<id>.auth]` with `env_key`, `experimental_bearer_token`, or `requires_openai_auth`.

### Amazon Bedrock provider

```toml
model_provider = "amazon-bedrock"
model = "<bedrock-model-id>"

[model_providers.amazon-bedrock.aws]
profile = "default"
region = "eu-central-1"
```

### OSS mode (local providers)

```toml
oss_provider = "ollama" # or "lmstudio"
```

### Azure provider

```toml
[model_providers.azure]
name = "Azure"
base_url = "https://YOUR_PROJECT_NAME.openai.azure.com/openai"
env_key = "AZURE_OPENAI_API_KEY"
query_params = { api-version = "2025-04-01-preview" }
wire_api = "responses"
request_max_retries = 4
stream_max_retries = 10
stream_idle_timeout_ms = 300000
```

To change the base URL of the built-in `openai` provider, use `openai_base_url` — don't define `[model_providers.openai]`.

## Approval policies and sandbox modes

```toml
approval_policy = "untrusted"   # Other options: on-request, never, or { granular = { ... } }
approvals_reviewer = "user"     # Or "auto_review" for automatic review
sandbox_mode = "workspace-write"
allow_login_shell = false       # Optional hardening: disallow login shells for shell tools

[sandbox_workspace_write]
exclude_tmpdir_env_var = false
exclude_slash_tmp = false
writable_roots = ["/Users/YOU/.pyenv/shims"]
network_access = false

[auto_review]
policy = """
Use your organization's automatic review policy.
"""
```

Granular policy allows/auto-rejects individual prompt categories: `sandbox_approval`, `rules`, `mcp_elicitations`, `request_permissions`, `skill_approval`.

Disable sandboxing entirely (only if the environment already isolates processes):

```toml
sandbox_mode = "danger-full-access"
```

Named permission profiles (built-ins and custom `[permissions.<name>]` tables) are documented separately under Permissions (security-automation scope in this skill).

## Shell environment policy

```toml
[shell_environment_policy]
inherit = "core"
set = { MY_FLAG = "1" }
ignore_default_excludes = false

[shell_environment_policy.filters]
"AWS_*" = "exclude"
"AZURE_*" = "exclude"
```

Order: automatic exclusions -> custom exclusions -> `set` values -> include-pattern allowlist. `inherit`: `all` | `core` | `none`. Legacy `exclude`/`include_only` arrays remain supported but cannot combine with `filters` in the same layer.

## MCP servers

See [Model Context Protocol](./mcp-config.md) for MCP server configuration details.

## Observability and telemetry (OTel)

```toml
[otel]
environment = "staging"   # defaults to "dev"
exporter = "none"         # set to otlp-http or otlp-grpc to send events
log_user_prompt = false   # redact user prompts unless explicitly enabled
```

```toml
[otel]
exporter = { otlp-http = { endpoint = "https://otel.example.com/v1/logs", protocol = "binary", headers = { "x-otlp-api-key" = "${OTLP_TOKEN}" } } }
```

Disable anonymous usage metrics collection:

```toml
[analytics]
enabled = false
```

Disable `/feedback` submission:

```toml
[feedback]
enabled = false
```

Suppress or surface reasoning output:

```toml
hide_agent_reasoning = true
show_raw_agent_reasoning = true
```

## Notifications

```toml
notify = ["python3", "/path/to/notify.py"]
```

The script receives one JSON argument with fields: `type` (`agent-turn-complete`), `thread-id`, `turn-id`, `cwd`, `input-messages`, `last-assistant-message`.

`notify` runs an external program; `tui.notifications` is built into the TUI (optionally filtered by event type); `tui.notification_method` picks `auto`/`osc9`/`bel`; `tui.notification_condition` picks `unfocused`/`always`.

## History persistence

```toml
[history]
persistence = "none"     # disable local history
max_bytes = 104857600    # 100 MiB cap; oldest entries dropped when exceeded
```

## Clickable citations

```toml
file_opener = "vscode" # or cursor, windsurf, vscode-insiders, none
```

## Project instructions discovery

- `project_doc_max_bytes`: bytes read from each `AGENTS.md`.
- `project_doc_fallback_filenames`: fallback filenames when `AGENTS.md` is missing.

## Desktop custom file handlers

User-level only, ChatGPT desktop app:

```toml
[desktop.custom_file_handlers.vscodium]
label = "VSCodium"
icon = "/Users/you/.codex/icons/vscodium.png"
command = "codium"

[desktop.custom_file_handlers.textedit]
label = "TextEdit"
icon = "/Users/you/.codex/icons/textedit.png"
command = "/usr/bin/open"
args = ["-a", "TextEdit"]
```

| Field | Required | Description |
|-------|----------|-------------|
| `label` | Yes | Display name in the app. |
| `icon` | Yes | Bundled icon, base64 `data:image/...`, `file:` URI, or absolute path. |
| `command` | Yes | Executable path or command name. |
| `args` | No | Args inserted between command and file input. Default `[]`. |
| `input` | No | `path` \| `json_argument` \| `json_stdin`. Default `path`. |
| `supports_ssh` | No | Offer handler for files in SSH workspaces. Default `false`. |

## TUI options

`[tui]` keys include `notifications`, `notification_method`, `notification_condition`, `animations`, `alternate_screen`, `show_tooltips`. See [Configuration Reference](./config-reference.md) for the full list.

## Notes

- For the full config key table (all sections above condensed into one searchable list), see [Configuration Reference](./config-reference.md).

## Related

- [Config basics](./config-basics.md)
- [Configuration Reference](./config-reference.md)
- [Model Context Protocol](./mcp-config.md)
