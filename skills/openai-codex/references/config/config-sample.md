# Sample Configuration

A complete example `config.toml` covering most keys Codex reads, with default behaviors and short notes. Copy only the sections you need into `~/.codex/config.toml` (or a project-scoped `.codex/config.toml`).

## Signature / Usage

The sample selects GPT-6.1 Sol, which requires access for your signed-in account or workspace; if it isn't available, replace it with a model you can use.

```toml
################################################################################
# Core Model Selection
################################################################################
model = "gpt-6.1-sol"
# personality = "none"                 # omit the built-in Personality section; friendly/pragmatic no longer select a style
# review_model = "gpt-6.1-sol"         # /review override; default: current session model
model_provider = "openai"
# oss_provider = "ollama"
# service_tier = "fast"
# model_context_window = 128000
# model_auto_compact_token_limit = 64000
# model_auto_compact_token_limit_scope = "total" # total | body_after_prefix
# tool_output_token_limit = 12000
# model_catalog_json = "/absolute/path/to/models.json"
# background_terminal_max_timeout = 300000       # ms; default 5m
# log_dir = "/absolute/path/to/codex-logs"       # setting explicitly enables codex-tui.log
# sqlite_home = "/absolute/path/to/codex-state"

################################################################################
# Reasoning & Verbosity (Responses API capable models)
################################################################################
# model_reasoning_effort = "medium"    # levels vary by model and client
# plan_mode_reasoning_effort = "high"
# model_reasoning_summary = "auto"     # auto | concise | detailed | none
# model_verbosity = "medium"           # low | medium | high
# model_supports_reasoning_summaries = true

################################################################################
# Instruction Overrides
################################################################################
# developer_instructions = ""
# compact_prompt = ""
# model_instructions_file = "/absolute/or/relative/path/to/instructions.txt"
# experimental_compact_prompt_file = "/absolute/or/relative/path/to/compact_prompt.txt"

# notify = ["notify-send", "Codex"]

################################################################################
# Approval & Sandbox
################################################################################
approval_policy = "on-request"       # on-request (default) | never | { granular = {...} }
# approvals_reviewer = "user"        # user | auto_review
# approval_policy = { granular = {
#   sandbox_approval = true, rules = true, mcp_elicitations = true,
#   request_permissions = false, skill_approval = false
# } }
allow_login_shell = true             # default true
sandbox_mode = "read-only"           # read-only | workspace-write | danger-full-access
# default_permissions = ":workspace" # :read-only | :workspace | :danger-full-access | custom [permissions.<name>]

################################################################################
# Authentication & Login
################################################################################
cli_auth_credentials_store = "file"           # file | keyring | auto
chatgpt_base_url = "https://chatgpt.com/backend-api/"
# openai_base_url = "https://us.api.openai.com/v1"
# forced_chatgpt_workspace_id = "00000000-0000-0000-0000-000000000000"
# forced_login_method = "chatgpt"               # chatgpt | api
mcp_oauth_credentials_store = "auto"          # auto | file | keyring
# mcp_optional_startup_grace_ms = 1000          # 0 = wait for each server's startup_timeout_sec
# mcp_oauth_callback_port = 4321                # server-specific oauth.callback_port overrides
# mcp_oauth_callback_url = "https://devbox.example.internal/callback"

################################################################################
# Project Documentation Controls
################################################################################
project_doc_max_bytes = 32768
project_doc_fallback_filenames = []
# project_root_markers = [".git"]

################################################################################
# History & File Opener, UI misc
################################################################################
file_opener = "vscode"  # vscode | vscode-insiders | windsurf | cursor | none
hide_agent_reasoning = false
show_raw_agent_reasoning = false
windows_wsl_setup_acknowledged = false
check_for_update_on_startup = true

################################################################################
# Web Search
################################################################################
web_search = "cached"  # disabled | cached | indexed | live (live with --yolo / full access)
# suppress_unstable_features_warning = true

################################################################################
# Agents
################################################################################
[agents]
# enabled = true
# max_concurrent_threads_per_session = 6
# default_subagent_model = "gpt-6.1-sol"
# default_subagent_reasoning_effort = "medium"
# interrupt_message = true
# [agents.reviewer]
# description = "Find correctness, security, and test risks in code."
# config_file = "./agents/reviewer.toml" # relative to the config.toml that defines it

################################################################################
# Skills
################################################################################
# [skills]
# max_context_tokens = 2000        # default 2% of context window; capped at 10000

# [[skills.config]]
# path = "/path/to/skill/SKILL.md"
# enabled = false

################################################################################
# Sandbox settings (workspace-write only)
################################################################################
[sandbox_workspace_write]
writable_roots = []
network_access = false
exclude_tmpdir_env_var = false
exclude_slash_tmp = false

################################################################################
# Shell Environment Policy
################################################################################
[shell_environment_policy]
inherit = "all"                  # all | core | none
ignore_default_excludes = false  # default true; false removes KEY/SECRET/TOKEN names before filters
set = {}
experimental_use_profile = false

[shell_environment_policy.filters]
"AWS_*" = "exclude"
"AZURE_*" = "exclude"

################################################################################
# Sandboxed networking
################################################################################
# [features.network_proxy]
# enabled = true
# domains = { "api.openai.com" = "allow", "example.com" = "deny" }
#
# [permissions.workspace.workspace_roots]
# "~/code/app" = true
# [permissions.workspace.filesystem]
# glob_scan_max_depth = 3
# ":workspace_roots" = { "." = "write", "**/*.env" = "deny" }
# "/absolute/path/to/secrets" = "deny"
# [permissions.workspace.network]
# enabled = true
# proxy_url = "http://127.0.0.1:43128"
# admin_url = "http://127.0.0.1:43129"
# enable_socks5 = false
# socks_url = "http://127.0.0.1:43130"
# enable_socks5_udp = false
# allow_upstream_proxy = false
# dangerously_allow_non_loopback_proxy = false
# dangerously_allow_non_loopback_admin = false
# dangerously_allow_all_unix_sockets = false
# mode = "limited" # limited | full
# allow_local_binding = false
# [permissions.workspace.network.domains]
# "api.openai.com" = "allow"
# "example.com" = "deny"
# [permissions.workspace.network.unix_sockets]
# "/var/run/docker.sock" = "allow"

################################################################################
# History
################################################################################
[history]
persistence = "save-all"   # save-all | none
# max_bytes = 5242880

################################################################################
# UI, Notifications, and Misc
################################################################################
[tui]
disable_paste_burst = false         # overrides the legacy top-level setting
notifications = false
# notification_method = "auto"      # auto | osc9 | bel
# notification_condition = "unfocused"
animations = true
show_tooltips = true
# auto_recap = true
# show_server_version_notice = true
# alternate_screen = "auto"
# resume_cwd = "session"            # current | session
# status_line = ["model", "context-remaining", "git-branch"]
# terminal_title = ["spinner", "project"]
# theme = "catppuccin-mocha"
# [tui.keymap.global]
# open_transcript = "ctrl-t"
# open_external_editor = []
# [tui.keymap.composer]
# submit = ["enter", "ctrl-m"]
# [tui.keymap.chat]
# interrupt_turn = "f12"
# [tui.model_availability_nux]
# "gpt-6.1-sol" = 1

[analytics]
enabled = true

[feedback]
enabled = true

[notice]
# hide_full_access_warning = true
# hide_world_writable_warning = true
# hide_rate_limit_model_nudge = true
# hide_gpt5_1_migration_prompt = true
# "hide_gpt-5.1-codex-max_migration_prompt" = true
# model_migrations = { "gpt-5.4" = "gpt-6.1-sol" }

################################################################################
# Centralized Feature Flags
################################################################################
[features]
prefer_mxc = true   # Windows: prefer MXC when supported; disabled by default in the standalone CLI
# shell_tool = true
# apps = true
# hooks = false
# shell_snapshot = true
# multi_agent = true
# remote_plugin = true
# network_proxy = true  # required to enforce permission-profile domain rules
# fast_mode = true
# ultrafast_mode = true # independent of fast_mode
# enable_request_compression = true
# skill_mcp_dependency_install = true
# prevent_idle_sleep = false
# [features.code_mode]
# enabled = true
# excluded_tool_namespaces = ["mcp__codex_apps"]
# direct_only_tool_namespaces = ["mcp__history"]
# [features.rollout_budget]
# enabled = true
# limit_tokens = 100000
# reminder_interval_tokens = 10000
# sampling_token_weight = 1.0
# prefill_token_weight = 1.0

################################################################################
# Memories (enable with [features].memories first)
################################################################################
# [memories]
# generate_memories = true
# use_memories = true
# disable_on_external_context = false # legacy alias: no_memories_if_mcp_or_web_search

################################################################################
# Lifecycle hooks (inline or in a sibling hooks.json)
################################################################################
# [hooks]
# [[hooks.PreToolUse]]
# matcher = "^Bash$"
# [[hooks.PreToolUse.hooks]]
# type = "command"
# command = 'python3 "/absolute/path/to/pre_tool_use_policy.py"'
# timeout = 30
# statusMessage = "Checking Bash command"

################################################################################
# MCP servers
################################################################################
[mcp_servers]
# --- STDIO transport ---
# [mcp_servers.docs]
# enabled = true
# required = true
# command = "docs-server"          # required
# args = ["--port", "4000"]
# env = { "API_KEY" = "value" }
# env_vars = ["ANOTHER_SECRET"]
# env_vars = ["LOCAL_TOKEN", { name = "REMOTE_TOKEN", source = "remote" }]
# cwd = "/path/to/server"
# experimental_environment = "remote"
# startup_timeout_sec = 10.0       # alias startup_timeout_ms
# tool_timeout_sec = 60.0
# enabled_tools = ["search", "summarize"]
# disabled_tools = ["slow-tool"]
# scopes = ["read:docs"]
# oauth_resource = "https://docs.example.com/"
# [mcp_servers.docs.tools.search]
# output_token_limit = 30000

# --- Streamable HTTP transport ---
# [mcp_servers.github]
# url = "https://github-mcp.example.com/mcp"   # required
# bearer_token_env_var = "GITHUB_TOKEN"
# http_headers = { "X-Example" = "value" }
# env_http_headers = { "X-Auth" = "AUTH_ENV" }
# http_headers_helper = "company-auth mcp-headers"
# enabled_tools = ["list_issues"]
# disabled_tools = ["delete_issue"]
# scopes = ["repo"]
# [mcp_servers.github.oauth]
# client_id = "my-pre-registered-client"
# client_secret = "<client-secret>"            # stored in config
# callback_url = "http://127.0.0.1/callback"
# callback_port = 4321                         # set as well for http://127.0.0.1:4321/callback

################################################################################
# Model Providers (built-ins: openai, ollama, lmstudio, amazon-bedrock; IDs reserved)
################################################################################
[model_providers]
# --- built-in Amazon Bedrock provider options ---
# model_provider = "amazon-bedrock"
# model = "<bedrock-model-id>"
# [model_providers.amazon-bedrock.aws]
# profile = "default"
# region = "eu-central-1"

# --- OpenAI data residency ---
# [model_providers.openaidr]
# name = "OpenAI Data Residency"
# base_url = "https://us.api.openai.com/v1"
# wire_api = "responses"            # only supported value
# # requires_openai_auth = true
# # request_max_retries = 4         # default 4; max 100
# # stream_max_retries = 5          # default 5; max 100
# # stream_idle_timeout_ms = 300000
# # supports_websockets = true
# # supports_standalone_web_search = true
# # experimental_bearer_token = "sk-example"   # dev-only
# # http_headers = { "X-Example" = "value" }
# # env_http_headers = { "OpenAI-Organization" = "OPENAI_ORGANIZATION", "OpenAI-Project" = "OPENAI_PROJECT" }

# --- Azure/OpenAI-compatible ---
# [model_providers.azure]
# name = "Azure"
# base_url = "https://YOUR_PROJECT_NAME.openai.azure.com/openai"
# wire_api = "responses"
# query_params = { api-version = "2025-04-01-preview" }
# env_key = "AZURE_OPENAI_API_KEY"
# env_key_instructions = "Set AZURE_OPENAI_API_KEY in your environment"

# --- command-backed bearer token auth ---
# [model_providers.proxy]
# name = "OpenAI using LLM proxy"
# base_url = "https://proxy.example.com/v1"
# wire_api = "responses"
# model_catalog_url = "https://proxy.example.com/codex-models.json"
# [model_providers.proxy.capabilities]
# external_web_access = false
# remote_compaction = "unsupported" # unsupported | v2
# [model_providers.proxy.auth]
# command = "/usr/local/bin/fetch-codex-token"
# args = ["--audience", "codex"]
# timeout_ms = 5000
# refresh_interval_ms = 300000

# --- Local OSS ---
# [model_providers.local_ollama]
# name = "Ollama"
# base_url = "http://localhost:11434/v1"
# wire_api = "responses"

################################################################################
# Apps / Connectors
################################################################################
[apps]
# [apps._default]
# enabled = true
# destructive_enabled = true
# open_world_enabled = true
# approvals_reviewer = "user"                # user | auto_review
# default_tools_approval_mode = "auto"       # auto | prompt | writes | approve
# [apps.google_drive]
# enabled = false
# destructive_enabled = false
# default_tools_enabled = true
# approvals_reviewer = "auto_review"
# default_tools_approval_mode = "prompt"
# [apps.google_drive.tools."files/delete"]
# enabled = false
# approval_mode = "approve"

# [tool_suggest]
# discoverables = [
#   { type = "connector", id = "gmail" },
#   { type = "plugin", id = "figma@openai-curated" },
# ]
# disabled_tools = [
#   { type = "plugin", id = "slack@openai-curated" },
#   { type = "connector", id = "connector_googlecalendar" },
# ]

################################################################################
# Config Profiles (separate files under $CODEX_HOME, selected with codex --profile ci)
################################################################################
# $CODEX_HOME/ci.config.toml:
# model = "gpt-6.1-sol"
# approval_policy = "on-request"
# sandbox_mode = "read-only"
# service_tier = "fast"
# oss_provider = "ollama"
# model_reasoning_effort = "medium"
# plan_mode_reasoning_effort = "high"
# model_reasoning_summary = "auto"
# model_verbosity = "medium"
# personality = "none"
# chatgpt_base_url = "https://chatgpt.com/backend-api/"
# model_catalog_json = "./models.json"
# model_instructions_file = "/absolute/or/relative/path/to/instructions.txt"
# experimental_compact_prompt_file = "./compact_prompt.txt"
# tools_view_image = true
# features = { shell_snapshot = false }

[projects]
# [projects."/absolute/path/to/project"]
# trust_level = "trusted"   # or "untrusted"

[tools]
# view_image = true

################################################################################
# OpenTelemetry (OTEL)
################################################################################
[otel]
log_user_prompt = false
environment = "dev"
exporter = "none"            # none | otlp-http | otlp-grpc
trace_exporter = "none"
metrics_exporter = "statsig" # none | statsig | otlp-http | otlp-grpc; analytics.enabled = false disables it in the CLI
# [otel.exporter."otlp-http"]
# endpoint = "https://otel.example.com/v1/logs"
# protocol = "binary" # "binary" | "json"
# [otel.exporter."otlp-http".headers]
# "x-otlp-api-key" = "${OTLP_TOKEN}"
# [otel.exporter."otlp-http".tls]
# ca-certificate = "certs/otel-ca.pem"
# client-certificate = "/etc/codex/certs/client.pem"
# client-private-key = "/etc/codex/certs/client-key.pem"
# [otel.trace_exporter."otlp-grpc"]
# endpoint = "https://otel.example.com:4317"
# headers = { "x-otlp-meta" = "abc123" }

################################################################################
# Windows
################################################################################
[windows]
# mxc | elevated | unelevated. Legacy fallback when features.prefer_mxc is enabled; explicit mxc doesn't fall back.
sandbox = "elevated"
```

## Notes

- The official sample leaves the `[[skills.config]]` header uncommented with its keys commented out; it is commented out here so copying the sample does not create an entry without `path`.
- Root keys must appear before tables in TOML.
- In the official sample, the commented `model_provider = "amazon-bedrock"` / `model = "<bedrock-model-id>"` lines sit under `[model_providers]`; if uncommented there they become keys of that table, so move them to the root (Core Model Selection section, before any table header) and keep only `[model_providers.amazon-bedrock.aws]` under the providers section.
- Optional keys that default to "unset" are shown commented out with notes.
- MCP servers, profile files, and model providers in the sample are illustrative — remove or edit for your setup.
- Web search `cached` serves results from an OpenAI-maintained index; `indexed` gates external web access through the search index; `live` fetches the most recent data.
- `[features.network_proxy]` must be enabled for a profile's network domain rules to apply; a profile's `network.enabled` alone allows direct network access. Web search, apps, connectors, and MCP servers use separate controls. Exact hosts match only themselves; `*.example.com` matches subdomains only; `**.example.com` matches the apex plus subdomains; `*` allows any public host not denied.
- Set `default_permissions = "workspace"` before using the `[permissions.workspace.*]` example profile, and remove or comment out the root `sandbox_mode` line and the `[sandbox_workspace_write]` table — `default_permissions` must not be combined with them (see [Configuration Reference](./config-reference.md)).
- For every key's type/description, see [Configuration Reference](./config-reference.md).

## Related

- [Config basics](./config-basics.md)
- [Advanced Configuration](./config-advanced.md)
- [Configuration Reference](./config-reference.md)
