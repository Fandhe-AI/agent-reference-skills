# Sample Configuration

A complete example `config.toml` covering most keys Codex reads, with default behaviors and short notes. Copy only the sections you need into `~/.codex/config.toml` (or a project-scoped `.codex/config.toml`).

## Signature / Usage

```toml
################################################################################
# Core Model Selection
################################################################################
model = "gpt-5.6"
# personality = "pragmatic"            # none | friendly | pragmatic
# review_model = "gpt-5.6"
model_provider = "openai"
# oss_provider = "ollama"
# service_tier = "fast"
# model_context_window = 128000
# model_auto_compact_token_limit = 64000
# model_auto_compact_token_limit_scope = "total" # total | body_after_prefix
# tool_output_token_limit = 12000
# model_catalog_json = "/absolute/path/to/models.json"
# background_terminal_max_timeout = 300000
# log_dir = "/absolute/path/to/codex-logs"
# sqlite_home = "/absolute/path/to/codex-state"

################################################################################
# Reasoning & Verbosity (Responses API capable models)
################################################################################
# model_reasoning_effort = "medium"        # minimal | low | medium | high | xhigh
# plan_mode_reasoning_effort = "high"
# model_reasoning_summary = "auto"         # auto | concise | detailed | none
# model_verbosity = "medium"               # low | medium | high
# model_supports_reasoning_summaries = true

################################################################################
# Instruction Overrides
################################################################################
# developer_instructions = ""
# compact_prompt = ""
# model_instructions_file = "/absolute/or/relative/path/to/instructions.txt"
# experimental_compact_prompt_file = "/absolute/or/relative/path/to/compact_prompt.txt"

################################################################################
# Notifications
################################################################################
# notify = ["notify-send", "Codex"]

################################################################################
# Approval & Sandbox
################################################################################
approval_policy = "on-request"       # untrusted | on-request | never | { granular = {...} }
# approvals_reviewer = "user"        # user | auto_review
# approval_policy = { granular = {
#   sandbox_approval = true, rules = true, mcp_elicitations = true,
#   request_permissions = false, skill_approval = false
# } }
allow_login_shell = true             # default true
sandbox_mode = "read-only"           # read-only | workspace-write | danger-full-access
# default_permissions = ":workspace" # :read-only | :workspace | :danger-full-access | custom name

################################################################################
# Authentication & Login
################################################################################
cli_auth_credentials_store = "file"           # file | keyring | auto
chatgpt_base_url = "https://chatgpt.com/backend-api/"
# openai_base_url = "https://us.api.openai.com/v1"
# forced_chatgpt_workspace_id = "00000000-0000-0000-0000-000000000000"
# forced_login_method = "chatgpt"               # chatgpt | api
mcp_oauth_credentials_store = "auto"          # auto | file | keyring
# mcp_oauth_callback_port = 4321
# mcp_oauth_callback_url = "https://devbox.example.internal/callback"

################################################################################
# Project Documentation Controls
################################################################################
project_doc_max_bytes = 32768
project_doc_fallback_filenames = []
# project_root_markers = [".git"]

################################################################################
# History & File Opener
################################################################################
file_opener = "vscode"  # vscode | vscode-insiders | windsurf | cursor | none
hide_agent_reasoning = false
show_raw_agent_reasoning = false
disable_paste_burst = false
windows_wsl_setup_acknowledged = false
check_for_update_on_startup = true

################################################################################
# Web Search
################################################################################
web_search = "cached"  # disabled | cached | indexed | live
# suppress_unstable_features_warning = true

################################################################################
# Agents (multi-agent roles and limits)
################################################################################
[agents]
# enabled = true
# max_concurrent_threads_per_session = 6
# default_subagent_model = "gpt-5.6-terra"
# default_subagent_reasoning_effort = "high"
# interrupt_message = true
# [agents.reviewer]
# description = "Find correctness, security, and test risks in code."
# config_file = "./agents/reviewer.toml"

################################################################################
# Skills (per-skill overrides)
################################################################################
# [[skills.config]]
# path = "/path/to/skill"       # folder containing SKILL.md
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
# Shell Environment Policy for spawned processes
################################################################################
[shell_environment_policy]
inherit = "all"                  # all | core | none
ignore_default_excludes = false
set = {}
experimental_use_profile = false

[shell_environment_policy.filters]
"AWS_*" = "exclude"
"AZURE_*" = "exclude"

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
notifications = false
# notification_method = "auto"      # auto | osc9 | bel
# notification_condition = "unfocused"
animations = true
show_tooltips = true
# alternate_screen = "auto"
# resume_cwd = "session"
# status_line = ["model", "context-remaining", "git-branch"]
# terminal_title = ["spinner", "project"]
# theme = "catppuccin-mocha"

[analytics]
enabled = true

[feedback]
enabled = true

[notice]
# hide_full_access_warning = true
# model_migrations = { "gpt-5.4" = "gpt-5.6-terra" }

################################################################################
# Centralized Feature Flags
################################################################################
[features]
# shell_tool = true
# apps = true
# hooks = false
# unified_exec = true
# multi_agent = true
# fast_mode = true
# network_proxy = false

################################################################################
# Memories
################################################################################
# [memories]
# generate_memories = true
# use_memories = true
# disable_on_external_context = false

################################################################################
# Lifecycle hooks (inline; or use a sibling hooks.json)
################################################################################
# [hooks]
# [[hooks.PreToolUse]]
# matcher = "^Bash$"
# [[hooks.PreToolUse.hooks]]
# type = "command"
# command = 'python3 "/absolute/path/to/pre_tool_use_policy.py"'
# timeout = 30

################################################################################
# MCP servers
################################################################################
[mcp_servers]
# --- STDIO transport ---
# [mcp_servers.docs]
# command = "docs-server"
# args = ["--port", "4000"]
# env = { "API_KEY" = "value" }
# env_vars = ["ANOTHER_SECRET"]
# startup_timeout_sec = 10.0
# tool_timeout_sec = 60.0
# enabled_tools = ["search", "summarize"]
# disabled_tools = ["slow-tool"]

# --- Streamable HTTP transport ---
# [mcp_servers.github]
# url = "https://github-mcp.example.com/mcp"
# bearer_token_env_var = "GITHUB_TOKEN"
# http_headers = { "X-Example" = "value" }
# scopes = ["repo"]

################################################################################
# Model Providers
################################################################################
[model_providers]
# [model_providers.openaidr]
# name = "OpenAI Data Residency"
# base_url = "https://us.api.openai.com/v1"
# wire_api = "responses"

# [model_providers.azure]
# name = "Azure"
# base_url = "https://YOUR_PROJECT_NAME.openai.azure.com/openai"
# wire_api = "responses"
# query_params = { api-version = "2025-04-01-preview" }
# env_key = "AZURE_OPENAI_API_KEY"

################################################################################
# Apps / Connectors
################################################################################
[apps]
# [apps._default]
# enabled = true
# default_tools_approval_mode = "auto"   # auto | prompt | writes | approve

################################################################################
# Config Profiles (separate files under $CODEX_HOME)
################################################################################
# $CODEX_HOME/ci.config.toml:
# model = "gpt-5.6-terra"
# approval_policy = "on-request"
# sandbox_mode = "read-only"

################################################################################
# Projects (trust levels)
################################################################################
[projects]
# [projects."/absolute/path/to/project"]
# trust_level = "trusted"   # or "untrusted"

################################################################################
# Tools
################################################################################
[tools]
# view_image = true

################################################################################
# OpenTelemetry (OTEL) - disabled by default
################################################################################
[otel]
log_user_prompt = false
environment = "dev"
exporter = "none"           # none | otlp-http | otlp-grpc
trace_exporter = "none"
metrics_exporter = "statsig" # none | statsig | otlp-http | otlp-grpc

################################################################################
# Windows
################################################################################
[windows]
sandbox = "unelevated"   # unelevated | elevated
```

## Notes

- Root keys must appear before tables in TOML.
- Optional keys that default to "unset" are shown commented out with notes.
- MCP servers, profile files, and model providers in the sample are illustrative — remove or edit for your setup.
- For every key's type/description, see [Configuration Reference](./config-reference.md).

## Related

- [Config basics](./config-basics.md)
- [Advanced Configuration](./config-advanced.md)
- [Configuration Reference](./config-reference.md)
