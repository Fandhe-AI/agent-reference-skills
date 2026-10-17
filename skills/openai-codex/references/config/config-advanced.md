# Advanced Configuration

More advanced `config.toml` options for providers, policies, and integrations.

## Profiles

Profiles are named configuration layers switched from the CLI. `--profile profile-name` loads `~/.codex/config.toml`, then overlays `~/.codex/profile-name.config.toml`. Names may contain letters, numbers, hyphens, underscores.

```toml
# ~/.codex/deep-review.config.toml
model = "gpt-6.1-sol"
model_reasoning_effort = "medium"
approval_policy = "on-request"
model_catalog_json = "/Users/me/.codex/model-catalogs/deep-review.json"
```

```shell
codex --profile deep-review
codex exec --profile deep-review "review this change"
```

A profile file only needs the values that differ from the base user config (it sits above user config, below project/CLI config). Use top-level keys in the profile file; don't nest them under `[profiles.profile-name]`. Profile files can also override `model_catalog_json`; Codex uses the profile value when both files set it. The example model requires GPT-6.1 Sol access; otherwise choose a model you can use.

In Codex 0.134.0 and later, `--profile` no longer reads `[profiles.profile-name]` from `config.toml`, and the top-level `profile = "profile-name"` selector is no longer supported; move legacy profile settings into `~/.codex/profile-name.config.toml` and remove the `[profiles.profile-name]` table and `profile` selector from `config.toml`.

## One-off overrides from the CLI

```shell
# Dedicated flag
codex --model gpt-6.1-sol

# Generic key/value override (value is TOML, not JSON)
codex --config model='"gpt-6.1-sol"'
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

To point the built-in OpenAI provider at an LLM proxy, router, or data-residency enabled project, set `openai_base_url` instead of defining a new provider; it changes the base URL for the built-in `openai` provider without a separate `model_providers.<id>` entry. See the authentication page for credential storage modes.

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
model = "gpt-6.1-sol"
model_provider = "proxy"

[model_providers.proxy]
name = "OpenAI using LLM proxy"
base_url = "http://proxy.example.com"
env_key = "OPENAI_API_KEY"

[model_providers.local_ollama]
name = "Ollama"
base_url = "http://localhost:11434/v1"

[model_providers.mistral]
name = "Mistral"
base_url = "https://api.mistral.ai/v1"
env_key = "MISTRAL_API_KEY"
```

For organization gateways, see the enterprise pages "Sign in with ChatGPT through a gateway", "Use API/provider credentials" (connect-to-a-gateway), and "Roll out a gateway".

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

The auth command receives no `stdin` and must print the token to stdout. Codex trims surrounding whitespace, treats an empty token as an error, and refreshes proactively at `refresh_interval_ms`; set `refresh_interval_ms = 0` to refresh only after an authentication retry. Don't combine `[model_providers.<id>.auth]` with `env_key`, `experimental_bearer_token`, or `requires_openai_auth`.

`supports_standalone_web_search` defaults to `false` for custom providers. Standalone web search is under development and off by default; setting it to `true` doesn't enable it — the provider must support a compatible endpoint, and the selected model and runtime must support standalone search. The configured `web_search` mode and managed search restrictions still apply.

### Amazon Bedrock provider

Codex includes a built-in `amazon-bedrock` model provider. Set it directly as `model_provider`; unlike custom providers, it supports only the nested AWS profile and region overrides. If you omit `profile`, Codex uses the standard AWS credential chain. Set `region` to the supported Bedrock region that should handle requests (see amazon-bedrock.md).

```toml
model_provider = "amazon-bedrock"
model = "<bedrock-model-id>"

[model_providers.amazon-bedrock.aws]
profile = "default"
region = "eu-central-1"
```

### OSS mode (local providers)

Codex can run against a local "open source" provider such as Ollama or LM Studio when you pass `--oss`. Choose one for a single run with `--local-provider`, or set `oss_provider` as the default. If neither is set, the interactive CLI prompts you to choose; `codex exec` exits with an error.

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

To change the base URL of the built-in `openai` provider, use `openai_base_url` — don't define `[model_providers.openai]` (built-in provider IDs can't be overridden).

## API organizations using data residency

Projects created with data residency enabled can create a model provider to update the `base_url` with the correct prefix. For ChatGPT workspaces with data residency, a custom provider isn't required; Codex respects workspace residency settings when you sign in with ChatGPT.

```toml
model_provider = "openaidr"
[model_providers.openaidr]
name = "OpenAI Data Residency"
base_url = "https://us.api.openai.com/v1" # Replace 'us' with domain prefix
requires_openai_auth = true # per authentication contract; not in the official snippet
```

## Model reasoning, verbosity, and limits

```toml
model_reasoning_summary = "none"          # Disable summaries
model_verbosity = "low"                   # Shorten responses
model_supports_reasoning_summaries = true # Force reasoning
model_context_window = 128000             # Context window size
```

`model_verbosity` applies only to providers using the Responses API; Chat Completions providers ignore it.

## Approval policies and sandbox modes

Codex and ChatGPT Work no longer support `approval_policy = "untrusted"`; see "Migrate from the retired `untrusted` approval policy" in agent-approvals-security.md. For permission profiles that configure filesystem and network access together, see permission-profiles.md.

Set `approvals_reviewer = "auto_review"` to route eligible interactive approval requests through automatic review; this changes the reviewer, not the sandbox boundary. `[auto_review].policy` holds local reviewer policy instructions; managed `guardian_policy_config` takes precedence.

```toml
approval_policy = "on-request"  # Other options: never, or { granular = { ... } }
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

Example granular approval policy (allows or auto-rejects individual prompt categories, so e.g. `request_permissions` or skill-script prompts fail closed):

```toml
approval_policy = { granular = { sandbox_approval = true, rules = true, mcp_elicitations = true, request_permissions = false, skill_approval = false } }
```

The official docs show this as a commented multi-line example; TOML 1.0 inline tables cannot span lines, so it is written on one line here.

In workspace-write mode, some environments keep `.git/`, `.agents/`, `.codex/`, and `.aws/` read-only even when the rest of the workspace is writable, so commands like `git commit` may still need approval outside the sandbox. To skip or block specific commands, use rules (see rules.md).

Disable sandboxing entirely (only if the environment already isolates processes):

```toml
sandbox_mode = "danger-full-access"
```

Named permission profiles (built-ins and custom `[permissions.<name>]` tables) are documented separately in permission-profiles.md (security-automation category).

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

Order: automatic exclusions -> custom exclusions -> `set` values -> include-pattern allowlist. `inherit`: `all` | `core` | `none`. Filter patterns are case-insensitive and support `*` and `?`; when any pattern uses `"include"`, only matching variables are kept, and includes don't restore already-excluded variables. Filter keys merge case-insensitively across layers. `set` runs after exclusions so it can restore an excluded variable, but an include allowlist can still remove it. `ignore_default_excludes` defaults to `true`; set `false` to apply the automatic `KEY`/`SECRET`/`TOKEN` exclusions first. Legacy `exclude`/`include_only` arrays remain supported but Codex rejects combining them with `filters` in the same layer.

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

```toml
[otel]
exporter = { otlp-grpc = { endpoint = "https://otel.example.com:4317", headers = { "x-otlp-meta" = "abc123" } } }
```

OTel log export is disabled by default. With `exporter = "none"` Codex records events but sends nothing; exporters batch asynchronously and flush on shutdown.

What gets emitted (representative events): `codex.conversation_starts` (model, reasoning settings, sandbox/approval policy), `codex.api_request`, `codex.sse_event`, `codex.websocket_request` / `codex.websocket_event`, `codex.user_prompt` (length; content redacted unless enabled), `codex.tool_decision` (approved/denied; config vs user), `codex.tool_result` (duration, success, output snippet). With the OTel metrics pipeline enabled, Codex also emits counters and duration histograms (e.g. `codex.api_request`, `codex.api_request.duration_ms`, `codex.tool.call`, `codex.tool.call.duration_ms`, `codex.sse_event`, `codex.websocket.request`) tagged with `auth_mode`, `originator`, `session_source`, `model`, `app.version`.

Anonymous usage and health metrics are sent by default, are independent of OTel log/trace export, and contain no PII. `[analytics] enabled = false` disables them (and custom OTLP metrics exporters in Codex CLI).

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

Handler ID is the final segment of the table header: 1–64 characters, starting with an ASCII letter or number, otherwise ASCII letters, numbers, periods, underscores, or hyphens; quote an ID containing a period (`[desktop.custom_file_handlers."company.editor"]`). The app exposes it as `custom:<id>`. Save `config.toml` and restart the desktop app. `input = "json_argument"` appends a JSON object with `target`, `path`, `appPath`, and `location` (1-based `line` / `column`, or `null`); `json_stdin` writes it to standard input and also includes `hostConfig`, `remoteWorkspaceRoot`, `remotePath` (`null` when not applicable).

## TUI options

`[tui]` keys include `notifications`, `notification_method`, `notification_condition`, `animations`, `alternate_screen`, `show_tooltips`. See [Configuration Reference](./config-reference.md) for the full list.

## Notes

- The official data-residency snippet omits authentication; per the authentication docs a custom provider without `env_key` or `requires_openai_auth = true` is treated as requiring no auth, so this page adds `requires_openai_auth = true` (alternatively set `env_key = "OPENAI_API_KEY"`).
- For the full config key table (all sections above condensed into one searchable list), see [Configuration Reference](./config-reference.md).

## Related

- [Config basics](./config-basics.md)
- [Configuration Reference](./config-reference.md)
- [Model Context Protocol](./mcp-config.md)
