# Configuration Reference

Complete searchable key reference for `config.toml` and `requirements.toml`. For conceptual guidance, start with [Config basics](./config-basics.md) and [Advanced Config](./config-advanced.md).

## Signature / Usage

```toml
# ~/.codex/config.toml
#:schema https://developers.openai.com/codex/config-schema.json
model = "gpt-5.5"
approval_policy = "on-request"
```

User-level config lives at `~/.codex/config.toml`; project overrides live in `.codex/config.toml` (trusted projects only). Install the "Even Better TOML" VS Code/Cursor extension and add the `#:schema` line above for autocompletion.

Project-scoped config cannot override machine-local provider/auth/notification/telemetry keys: `openai_base_url`, `chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`, `model_providers`, `notify`, `profile`, `profiles`, `experimental_realtime_ws_base_url`, `otel`.

`experimental_instructions_file` is deprecated; use `model_instructions_file`.

## `config.toml` key groups

### Model & provider

| Key | Type | Description |
|-----|------|-------------|
| `model` | string | Model to use (e.g. `gpt-5.5`). |
| `review_model` | string | Optional `/review` model override. |
| `model_provider` | string | Provider id from `model_providers` (default `openai`). |
| `openai_base_url` | string | Base URL override for the built-in `openai` provider. |
| `model_context_window` | number | Context window tokens. |
| `model_auto_compact_token_limit` | number | Auto-compaction threshold. |
| `model_auto_compact_token_limit_scope` | `total` \| `body_after_prefix` | Scope of the auto-compaction threshold. |
| `model_catalog_json` | path | JSON model catalog loaded at startup; overridable per profile. |
| `oss_provider` | `lmstudio` \| `ollama` | Default local provider for `--oss`. |
| `model_providers.<id>` | table | Custom provider definition (`openai`/`ollama`/`lmstudio` reserved). |
| `model_providers.<id>.{name,base_url,env_key,env_key_instructions,experimental_bearer_token,requires_openai_auth,wire_api,query_params,http_headers,env_http_headers,request_max_retries,stream_max_retries,stream_idle_timeout_ms,supports_websockets,supports_standalone_web_search}` | mixed | Provider connection/auth/retry settings. |
| `model_providers.<id>.auth.{command,args,timeout_ms,refresh_interval_ms,cwd}` | mixed | Command-backed bearer token auth. |
| `model_providers.amazon-bedrock.aws.{profile,region}` | string | Built-in Amazon Bedrock provider tuning. |
| `model_reasoning_effort` | `minimal`\|`low`\|`medium`\|`high`\|`xhigh` | Reasoning effort (Responses API). |
| `plan_mode_reasoning_effort` | `none`\|`minimal`\|`low`\|`medium`\|`high`\|`xhigh` | Plan-mode-specific override. |
| `model_reasoning_summary` | `auto`\|`concise`\|`detailed`\|`none` | Reasoning summary detail. |
| `model_verbosity` | `low`\|`medium`\|`high` | GPT-5 Responses API verbosity override. |
| `model_supports_reasoning_summaries` | boolean | Force reasoning metadata on/off. |
| `service_tier` | string | Preferred service tier (e.g. `fast`). |

### Approvals & sandbox

| Key | Type | Description |
|-----|------|-------------|
| `approval_policy` | `untrusted`\|`on-request`\|`never`\|granular table | When Codex pauses for approval. `on-failure` deprecated. |
| `approval_policy.granular.{sandbox_approval,rules,mcp_elicitations,request_permissions,skill_approval}` | boolean | Per-category granular approval toggles. |
| `approvals_reviewer` | `user`\|`auto_review` | Who reviews eligible prompts. |
| `auto_review.policy` | string | Local Markdown auto-review policy (managed `guardian_policy_config` takes precedence). |
| `allow_login_shell` | boolean | Allow login-shell semantics for shell tools (default `true`). |
| `sandbox_mode` | `read-only`\|`workspace-write`\|`danger-full-access` | Filesystem/network sandbox policy. |
| `sandbox_workspace_write.{writable_roots,network_access,exclude_tmpdir_env_var,exclude_slash_tmp}` | mixed | Workspace-write mode tuning. |
| `windows.sandbox` | `unelevated`\|`elevated` | Native Windows sandbox mode. |
| `windows.sandbox_private_desktop` | boolean | Run sandboxed child on a private desktop. |
| `default_permissions` | string | Default named permission profile (`:read-only`, `:workspace`, `:danger-full-access`, or custom). Don't combine with `sandbox_mode`/`[sandbox_workspace_write]`. |
| `permissions.<name>.*` | mixed | Custom permission profile fields (`description`, `extends`, `workspace_roots`, `filesystem.*`, `network.*`) — see the Permissions guide. |

### MCP servers

| Key | Type | Description |
|-----|------|-------------|
| `mcp_servers.<id>.command` / `.args` / `.env` / `.env_vars` / `.cwd` | mixed | STDIO server launch config. |
| `mcp_servers.<id>.url` | string | Streamable HTTP server endpoint. |
| `mcp_servers.<id>.auth` | `oauth`\|`chatgpt` | Auth fallback after bearer tokens/headers. |
| `mcp_servers.<id>.bearer_token_env_var` / `.http_headers` / `.env_http_headers` | mixed | HTTP auth/headers. |
| `mcp_servers.<id>.enabled` / `.required` | boolean | Enable/disable; fail startup if required server can't init. |
| `mcp_servers.<id>.startup_timeout_sec` (`_ms` alias) / `.tool_timeout_sec` | number | Timeouts (defaults 10s / 60s). |
| `mcp_servers.<id>.enabled_tools` / `.disabled_tools` | array<string> | Allow/deny list. |
| `mcp_servers.<id>.default_tools_approval_mode` / `.tools.<tool>.approval_mode` | `auto`\|`prompt`\|`writes`\|`approve` | Approval mode defaults/overrides. |
| `mcp_servers.<id>.scopes` / `.oauth_resource` | mixed | OAuth scopes / RFC 8707 resource. |
| `mcp_servers.<id>.experimental_environment` | `local`\|`remote` | Run stdio via remote executor (experimental). |
| `mcp_oauth_credentials_store` | `auto`\|`file`\|`keyring` | Preferred MCP OAuth credential store. |
| `mcp_oauth_callback_port` / `mcp_oauth_callback_url` | mixed | OAuth callback listener overrides. |
| `plugins.<plugin>.mcp_servers.<server>.*` | mixed | Enable/tune MCP servers bundled by an installed plugin. |

See [Model Context Protocol](./mcp-config.md) for setup walkthroughs.

### Agents, skills, apps

| Key | Type | Description |
|-----|------|-------------|
| `agents.enabled` | boolean | Enable/disable multi-agent tools (default `true`). |
| `agents.max_concurrent_threads_per_session` (legacy alias `max_threads`) | number | Max concurrent spawned-agent threads. |
| `agents.default_subagent_model` / `.default_subagent_reasoning_effort` | string | Defaults for spawned agents. |
| `agents.interrupt_message` | boolean | Record message on interrupted agent turn (default `true`). |
| `agents.<name>.description` / `.config_file` | mixed | Custom subagent role declaration. |
| `skills.config[].{path,enabled}` | mixed | Per-skill enablement overrides. |
| `apps.<id>.enabled` / `.destructive_enabled` / `.open_world_enabled` | boolean | Per-app connector controls. |
| `apps._default.*` / `apps.<id>.approvals_reviewer` / `.default_tools_approval_mode` | mixed | Default vs per-app tool approval behavior. |
| `apps.<id>.tools.<tool>.enabled` / `.approval_mode` | mixed | Per-tool overrides. |
| `tool_suggest.discoverables` / `.disabled_tools` | array<table> | Tool suggestion allow/deny list (`{type, id}`). |

### Features

| Key | Type | Description |
|-----|------|-------------|
| `features.apps` / `.hooks` / `.unified_exec` / `.shell_snapshot` / `.multi_agent` / `.goals` / `.remote_plugin` / `.personality` / `.fast_mode` / `.shell_tool` / `.enable_request_compression` / `.skill_mcp_dependency_install` / `.prevent_idle_sleep` | boolean | Stable/experimental feature toggles (see [Config basics](./config-basics.md) table for defaults). |
| `features.code_mode.enabled` / `.excluded_tool_namespaces` / `.direct_only_tool_namespaces` | mixed | Code mode config (under development). |
| `features.rollout_budget.enabled` / `.limit_tokens` / `.reminder_interval_tokens` / `.sampling_token_weight` / `.prefill_token_weight` | mixed | Rollout budget tracking (under development). |
| `features.network_proxy` | boolean \| table | Sandboxed networking (experimental). |
| `features.network_proxy.{domains,unix_sockets,allow_local_binding,enable_socks5,enable_socks5_udp,allow_upstream_proxy,dangerously_allow_non_loopback_proxy,dangerously_allow_all_unix_sockets,proxy_url,socks_url}` | mixed | Sandboxed networking policy fields. |
| `features.memories` | boolean | Enable Memories (off by default). |
| `features.web_search` / `.web_search_cached` / `.web_search_request` | boolean | Deprecated; prefer top-level `web_search`. |
| `suppress_unstable_features_warning` | boolean | Suppress the under-development feature warning. |

### Hooks

| Key | Type | Description |
|-----|------|-------------|
| `hooks.<Event>` | array<table> | Matcher groups: `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SessionEnd`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`. |
| `hooks.<Event>[].hooks[]` | table | Handler; command hooks supported (prompt/agent hooks parsed but skipped). |
| `hooks.<Event>[].hooks[].additionalContextLimit` | integer | Token threshold before oversized `additionalContext` is saved to disk (default `2500`; `0` = full context inline). |
| `hooks.<Event>[].hooks[].commandWindows` (alias `command_windows`) | string | Windows-only command override. |

### Memories

| Key | Type | Description |
|-----|------|-------------|
| `memories.generate_memories` / `.use_memories` | boolean | Toggle memory generation/injection (default `true`). |
| `memories.disable_on_external_context` (legacy `no_memories_if_mcp_or_web_search`) | boolean | Exclude threads using MCP/web-search from memory gen. |
| `memories.max_raw_memories_for_consolidation` / `.max_unused_days` / `.max_rollout_age_days` / `.max_rollouts_per_startup` / `.min_rollout_idle_hours` / `.min_rate_limit_remaining_percent` | number | Consolidation tuning. |
| `memories.extract_model` / `.consolidation_model` | string | Model overrides for memory jobs. |

### Shell / environment / execution

| Key | Type | Description |
|-----|------|-------------|
| `shell_environment_policy.inherit` | `all`\|`core`\|`none` | Baseline env inheritance for subprocesses. |
| `shell_environment_policy.ignore_default_excludes` | boolean | Keep `KEY`/`SECRET`/`TOKEN` vars before filters run (default `true`). |
| `shell_environment_policy.filters` | map<string, `include`\|`exclude`> | Canonical env-var pattern filters. |
| `shell_environment_policy.exclude` / `.include_only` | array<string> | Legacy filter arrays (don't combine with `filters`). |
| `shell_environment_policy.set` | map<string,string> | Explicit env values applied after exclusions. |
| `shell_environment_policy.experimental_use_profile` | boolean | Use the user shell profile when spawning subprocesses. |
| `background_terminal_max_timeout` | number | Max ms for empty `write_stdin` polls (default `300000`). |
| `tool_output_token_limit` | number | Token budget per stored tool output. |
| `tools.web_search` | boolean \| table | Web search tool config (`context_size`, `allowed_domains`, `location`). |
| `tools.view_image` | boolean | Enable `view_image` local-image tool. |
| `web_search` | `disabled`\|`cached`\|`indexed`\|`live` | Web search mode (default `cached`). |
| `experimental_use_unified_exec_tool` | boolean | Legacy; prefer `[features].unified_exec`. |

### Instructions & project docs

| Key | Type | Description |
|-----|------|-------------|
| `instructions` | string | Reserved; prefer `model_instructions_file` or `AGENTS.md`. |
| `developer_instructions` | string | Additional injected developer instructions. |
| `model_instructions_file` | path | Replaces built-in base instructions. |
| `compact_prompt` / `experimental_compact_prompt_file` | mixed | History-compaction prompt override (inline or file). |
| `project_root_markers` | array<string> | Project root marker filenames (default `[".git"]`). |
| `project_doc_max_bytes` | number | Bytes read from each `AGENTS.md`. |
| `project_doc_fallback_filenames` | array<string> | Fallback filenames when `AGENTS.md` is missing. |
| `projects.<path>.trust_level` | `trusted`\|`untrusted` | Per-project trust marking. |

### History, logging, telemetry

| Key | Type | Description |
|-----|------|-------------|
| `history.persistence` | `save-all`\|`none` | Save session transcripts to `history.jsonl`. |
| `history.max_bytes` | number | Cap history file size (drops oldest entries). |
| `log_dir` | path | Log directory (default `$CODEX_HOME/log`); also enables `codex-tui.log`. |
| `sqlite_home` | path | SQLite-backed runtime state directory. |
| `notify` | array<string> | External notification command (JSON payload argument). |
| `check_for_update_on_startup` | boolean | Check for updates on startup. |
| `feedback.enabled` | boolean | Enable `/feedback` submission (default `true`). |
| `analytics.enabled` | boolean | Enable/disable anonymous usage analytics. |
| `hide_agent_reasoning` / `show_raw_agent_reasoning` | boolean | Suppress / surface reasoning output. |
| `otel.environment` / `.exporter` / `.trace_exporter` / `.metrics_exporter` / `.log_user_prompt` | mixed | OpenTelemetry export config (`none`\|`otlp-http`\|`otlp-grpc`; metrics also `statsig`). |
| `otel.exporter.<id>.{endpoint,protocol,headers,tls.*}` / `otel.trace_exporter.<id>.{...}` | mixed | Per-exporter endpoint/TLS settings. |

### Auth & login

| Key | Type | Description |
|-----|------|-------------|
| `chatgpt_base_url` | string | Override ChatGPT login flow base URL. |
| `cli_auth_credentials_store` | `file`\|`keyring`\|`auto` | Where the CLI stores cached credentials. |
| `forced_login_method` | `chatgpt`\|`api` | Restrict to one auth method. |
| `forced_chatgpt_workspace_id` | string (uuid) | Limit ChatGPT login to one workspace. |

### UI (TUI / desktop)

| Key | Type | Description |
|-----|------|-------------|
| `tui.notifications` | boolean \| array<string> | Enable/filter TUI notifications. |
| `tui.notification_method` | `auto`\|`osc9`\|`bel` | Terminal notification mechanism. |
| `tui.notification_condition` | `unfocused`\|`always` | When notifications fire. |
| `tui.animations` / `.show_tooltips` | boolean | Welcome/status animations and tooltips. |
| `tui.alternate_screen` | `auto`\|`always`\|`never` | Alternate screen usage. |
| `tui.resume_cwd` | `current`\|`session` | Working directory on resume/fork. |
| `tui.vim_mode_default` / `.raw_output_mode` | boolean | Composer vim mode / raw scrollback mode. |
| `tui.status_line` / `.terminal_title` | array<string> \| null | Footer / title item ids. |
| `tui.theme` | string | Syntax-highlighting theme (kebab-case). |
| `tui.keymap.<context>.<action>` | string \| array<string> | Keybinding; contexts: `global`, `chat`, `composer`, `editor`, `vim_normal`, `vim_operator`, `vim_text_object`, `pager`, `list`, `approval`. `[]` unbinds. |
| `file_opener` | `vscode`\|`vscode-insiders`\|`windsurf`\|`cursor`\|`none` | Citation link scheme. |
| `disable_paste_burst` | boolean | Disable burst-paste detection. |
| `windows_wsl_setup_acknowledged` | boolean | Windows onboarding acknowledgement. |
| `desktop.custom_file_handlers.<id>.*` | mixed | ChatGPT desktop app custom "Open in" handlers (user-level only). |
| `notice.*` | mixed | In-product notice acknowledgement flags (mostly auto-managed). |
| `computer_use.windows.always_allowed_app_ids` | array<string> | Windows apps Computer Use can open without prompting. |

## `requirements.toml`

Admin-enforced configuration that constrains security-sensitive settings users can't override. Precedence: cloud-fetched requirements can also apply for ChatGPT Business/Enterprise. Omitted keys remain unconstrained; some keys enforce an exact value (not just an allowlist).

| Key | Type | Description |
|-----|------|-------------|
| `sqlite_home` / `log_dir` / `model_catalog_json` / `check_for_update_on_startup` / `allow_login_shell` | mixed | Enforce the corresponding `config.toml` value. |
| `feedback.enabled` | boolean | Enforce feedback availability. |
| `allowed_approval_policies` / `allowed_approvals_reviewers` | array<string> | Allowed values for `approval_policy` / `approvals_reviewer`. |
| `guardian_policy_config` | string | Managed auto-review policy (overrides local `[auto_review].policy`). |
| `allowed_permission_profiles.<name>` | boolean | Allow/deny a permission profile (omitted/`false` = denied). |
| `default_permissions` | string | Managed default permission profile (must be allowed). |
| `enforce_residency` | string | Require a data residency (currently `us`). |
| `models.new_thread.{model,model_reasoning_effort,service_tier}` | mixed | Managed defaults for new threads (explicit user choice takes precedence for model/effort). |
| `permissions.<name>` | table | Admin-defined permission profile (same schema as `config.toml`). |
| `allowed_sandbox_modes` | array<string> | Allowed `sandbox_mode` values. |
| `windows.allowed_sandbox_implementations` / `.sandbox_private_desktop` | mixed | Windows native sandbox constraints. |
| `remote_sandbox_config[].{hostname_patterns,allowed_sandbox_modes}` | mixed | Host-specific sandbox mode overrides. |
| `allowed_web_search_modes` | array<string> | Allowed `web_search` values (`disabled` always allowed). |
| `allow_managed_hooks_only` | boolean | Skip user/project/session/plugin hooks; keep managed hooks only. |
| `allow_appshots` / `allow_remote_control` | boolean | Disable Appshots / device remote control. |
| `features.<name>` | boolean | Pin a runtime/app feature (`apps`, `in_app_updates`, `in_app_browser`, `browser_use*`, `fast_mode`, `guardian_approval`, `memories`, `multi_agent`, `plugins`, `remote_plugin`, `computer_use`, `workspace_dependencies`, `plugin_sharing`). |
| `computer_use.allow_locked_computer_use` | boolean | Allow Computer Use after a managed macOS device locks. |
| `experimental_network.*` | mixed | Sandboxed networking requirements, independent of `features.network_proxy`: `enabled`, `http_port`, `socks_port`, `allow_upstream_proxy`, `dangerously_allow_non_loopback_proxy`, `dangerously_allow_all_unix_sockets`, `domains`, `allowed_domains`, `denied_domains`, `managed_allowed_domains_only`, `unix_sockets`, `allow_local_binding`. |
| `hooks.managed_dir` / `.windows_managed_dir` / `.{Event}` | mixed | Admin-enforced managed hooks (absolute directory required). |
| `permissions.filesystem.deny_read` | array<string> | Admin-enforced filesystem read denials (paths/globs). |
| `mcp_servers.<id>.identity.{command,url}` | mixed | MCP server allowlist by exact command/URL or matcher (`exact`\|`prefix`\|`regex`). |
| `plugins.<plugin>.mcp_servers.<server>.identity.*` | mixed | Same identity allowlist scoped to a plugin's bundled servers. |
| `marketplaces.restrict_to_allowed_sources` / `.allowed_sources.<name>.*` | mixed | Restrict plugin marketplace sources (`git`, `host_pattern`, `local`). |
| `apps.<id>.enabled` / `.tools.<tool>.approval_mode` | mixed | Managed app/tool constraints. |
| `rules.prefix_rules[].{pattern,decision,justification}` | mixed | Admin-enforced command prefix rules (`decision`: `prompt`\|`forbidden` only). |

## Notes

- Both tables above are condensed from the official page; consult the source for exact wording of edge cases before relying on precedence details in automated tooling.
- `requirements.toml` details, file locations, and precedence with cloud-fetched requirements are documented under Admin-enforced requirements (out of this skill's `config` scope — see enterprise/managed-configuration docs).

## Related

- [Config basics](./config-basics.md)
- [Advanced Configuration](./config-advanced.md)
- [Sample Configuration](./config-sample.md)
- [Model Context Protocol](./mcp-config.md)
