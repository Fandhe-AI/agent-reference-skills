# Configuration Reference

Complete searchable key reference for `config.toml` and `requirements.toml`. For conceptual guidance, start with [Config basics](./config-basics.md) and [Advanced Config](./config-advanced.md).

## Signature / Usage

```toml
# ~/.codex/config.toml
#:schema https://developers.openai.com/codex/config-schema.json
model = "gpt-6.1-sol"
approval_policy = "on-request"
```

User-level config lives at `~/.codex/config.toml`; project overrides live in `.codex/config.toml` (trusted projects only). Install the "Even Better TOML" VS Code/Cursor extension and add the `#:schema` line above for autocompletion. Config profile files live next to `config.toml` as `$CODEX_HOME/profile-name.config.toml`; select one with `--profile profile-name`.

Project-scoped config cannot override machine-local provider/auth/notification/telemetry keys: `openai_base_url`, `chatgpt_base_url`, `apps_mcp_product_sku`, `model_provider`, `model_providers`, `notify`, `profile`, `profiles`, `experimental_realtime_ws_base_url`, `otel`.

`experimental_instructions_file` is deprecated; rename it to `model_instructions_file`.

Set `model` to one available to your signed-in account or workspace (see models.md for GPT-6.1 Sol availability).

## `config.toml` key groups

### Model & provider

| Key | Type | Description |
|-----|------|-------------|
| `model` | string | Model to use (e.g. `gpt-6.1-sol`). |
| `review_model` | string | Optional `/review` model override (defaults to the current session model). |
| `model_provider` | string | Provider id from `model_providers` (default `openai`). |
| `openai_base_url` | string | Base URL override for the built-in `openai` provider. |
| `model_context_window` | number | Context window tokens available to the active model. |
| `model_auto_compact_token_limit` | number | Auto-compaction threshold (unset uses model defaults). |
| `model_auto_compact_token_limit_scope` | `total` \| `body_after_prefix` | `total` (default) counts the full active context; `body_after_prefix` only growth after the carried compaction-window prefix. |
| `model_catalog_json` | path | JSON model catalog loaded at startup; a profile file can override it. |
| `oss_provider` | `lmstudio` \| `ollama` | Default local provider for `--oss` (prompts if unset). |
| `model_providers.<id>` | table | Custom provider definition (`openai` / `ollama` / `lmstudio` reserved and can't be overridden). |
| `model_providers.<id>.{name,base_url,model_catalog_url,env_key,env_key_instructions,experimental_bearer_token,requires_openai_auth,query_params,http_headers,env_http_headers}` | mixed | Provider connection/auth settings. `model_catalog_url` is a full URL for a Codex-native model catalog. `experimental_bearer_token` is discouraged; use `env_key`. |
| `model_providers.<id>.wire_api` | `responses` | `responses` is the only supported value and the default. |
| `model_providers.<id>.{request_max_retries,stream_max_retries,stream_idle_timeout_ms}` | number | Retry/timeouts (defaults 4 / 5 / 300000). |
| `model_providers.<id>.supports_websockets` | boolean | Whether the provider supports the Responses API WebSocket transport. |
| `model_providers.<id>.supports_standalone_web_search` | boolean | Advertise a compatible standalone web search endpoint (default `false`; doesn't enable it by itself). |
| `model_providers.<id>.capabilities.external_web_access` | boolean | Whether the provider's hosted web search can access the live web. |
| `model_providers.<id>.capabilities.remote_compaction` | `unsupported` \| `v2` | Provider compaction protocol; `unsupported` uses local compaction, `v2` sends compaction triggers through Responses. |
| `model_providers.<id>.auth.{command,args,timeout_ms,refresh_interval_ms,cwd}` | mixed | Command-backed bearer token auth (defaults: `timeout_ms` 5000, `refresh_interval_ms` 300000; `0` refreshes only after an auth retry). Don't combine with `env_key`, `experimental_bearer_token`, or `requires_openai_auth`. |
| `model_providers.amazon-bedrock.aws.{profile,region}` | string | Built-in Amazon Bedrock provider AWS profile / region. |
| `model_reasoning_effort` | string | Reasoning effort advertised by the selected model, such as `low`, `medium`, `high`, `xhigh`, `max`, or `ultra`. Available levels depend on the model and client. |
| `plan_mode_reasoning_effort` | string | Plan-mode-specific override; unset uses the Plan preset default. |
| `model_reasoning_summary` | `auto`\|`concise`\|`detailed`\|`none` | Reasoning summary detail. |
| `model_verbosity` | `low`\|`medium`\|`high` | Optional GPT-5 Responses API verbosity override. |
| `model_supports_reasoning_summaries` | boolean | Force Codex to send or not send reasoning metadata. |
| `service_tier` | string | Preferred service tier for new turns; `fast` maps to the request value `priority`. |
| `personality` | `none` \| `friendly` \| `pragmatic` | Deprecated compatibility setting. `friendly` / `pragmatic` no longer select a style; `none` omits the built-in Personality section. |

### Approvals & sandbox

| Key | Type | Description |
|-----|------|-------------|
| `approval_policy` | `on-request`\|`never`\|granular table | When Codex pauses for approval. `untrusted` is unsupported; `on-failure` is deprecated (use `on-request` for interactive runs, `never` for non-interactive). Project entries with `trust_level = "untrusted"` remain supported. |
| `approval_policy.granular.{sandbox_approval,rules,mcp_elicitations,request_permissions,skill_approval}` | boolean | When `true`, that prompt category is allowed to surface (sandbox escalation / execpolicy `prompt` rules / MCP elicitations / `request_permissions` tool / skill-script approvals). |
| `approvals_reviewer` | `user`\|`auto_review` | Who reviews eligible prompts under `on-request` or granular policies (default `user`). Doesn't change sandboxing. |
| `auto_review.policy` | string | Local Markdown auto-review policy (managed `guardian_policy_config` takes precedence; blank ignored). |
| `auto_review.extra_policy` | string | Additional local Markdown policy (managed `guardian_extra_policy` takes precedence). |
| `allow_login_shell` | boolean | Allow login-shell semantics for shell tools (default `true`; when `false`, `login = true` requests are rejected). |
| `sandbox_mode` | `read-only`\|`workspace-write`\|`danger-full-access` | Filesystem/network sandbox policy. |
| `sandbox_workspace_write.{writable_roots,network_access,exclude_tmpdir_env_var,exclude_slash_tmp}` | mixed | Workspace-write mode tuning. |
| `windows.sandbox` | `mxc`\|`elevated`\|`unelevated` | Native Windows sandbox implementation. Explicit `mxc` fails when MXC is unavailable or prohibited by managed requirements. Use `features.prefer_mxc` with a legacy selection for automatic MXC selection with fallback. |
| `default_permissions` | string | Default named permission profile (`:read-only`, `:workspace`, `:danger-full-access`, or custom). Don't combine with `sandbox_mode` / `[sandbox_workspace_write]`. |
| `permissions.<name>.description` | string | Human-readable description (not inherited through `extends`). |
| `permissions.<name>.extends` | string | Parent profile (named profile, `:read-only`, or `:workspace`); `:danger-full-access`, undefined parents, and cycles are rejected. |
| `permissions.<name>.workspace_roots` / `.<path>` | table / boolean | Profile-defined workspace roots receiving `:workspace_roots` filesystem rules; a path set `true` opts in. |
| `permissions.<name>.filesystem` | table | Keys are absolute paths or tokens such as `:minimal` / `:workspace_roots`. |
| `permissions.<name>.filesystem.glob_scan_max_depth` | number | Max depth for expanding deny-read globs on platforms that snapshot matches before sandbox startup (min `1`). |
| `permissions.<name>.filesystem.<path-or-glob>` | `"read"`\|`"write"`\|`"deny"`\|table | Direct access for a path, glob, or token, or nested entries; `"deny"` denies reads. |
| `permissions.<name>.filesystem.":workspace_roots".<subpath-or-glob>` | `"read"`\|`"write"`\|`"deny"` | Access relative to each effective workspace root (`"."` for the root itself; e.g. `"**/*.env"` = `"deny"`). |
| `permissions.<name>.network.enabled` | boolean | Enable command network access for this profile; does not start the proxy (without `features.network_proxy` or managed networking requirements, access is direct and domain rules aren't enforced). |
| `permissions.<name>.network.{proxy_url,socks_url,enable_socks5,enable_socks5_udp,allow_upstream_proxy,dangerously_allow_non_loopback_proxy,dangerously_allow_all_unix_sockets,allow_local_binding}` | mixed | Sandboxed networking listener/policy fields for the profile. |
| `permissions.<name>.network.mode` | `limited` \| `full` | Network proxy mode for subprocess traffic. |
| `permissions.<name>.network.domains` / `.<pattern>` | table / `allow`\|`deny` | Domain rules (exact host, `*.example.com`, `**.example.com`, global `*`; `deny` wins). Enforced only when the proxy is active; doesn't restrict web search, apps, or MCP. |
| `permissions.<name>.network.unix_sockets` / `.<path>` | table / `allow`\|`deny` | Unix socket allowlist overrides (absolute paths). |
| `browser_use.allow_history_access` | boolean | `false` restricts browser-history access; managed requirements can enforce it. |
| `browser_use.default_origin_policy` | table | Fallback origin restrictions: `access`, `uploads`, `downloads`, `full_cdp_access`, each `allow` / `deny`. |
| `browser_use.origins.<origin>` | table | Per-origin restrictions (same fields); include an HTTP/HTTPS scheme and optional port, omit paths/queries/fragments. Local values can't relax managed denies. |
| `computer_use.default_app_access` | `allow` \| `deny` | Fallback native-app access policy; local config can't relax managed restrictions. |
| `computer_use.macos.bundle_ids` | map<string, `allow`\|`deny`> | macOS app access by bundle identifier. |
| `computer_use.windows.aumids` | map<string, `allow`\|`deny`> | Packaged Windows app access by AUMID. |
| `computer_use.windows.exes` | array<table> | Windows executable rules: `publisher_name`, `product_name`, `access` required; `binary_name` optional. |
| `computer_use.windows.always_allowed_app_ids` | array<string> | Windows apps Computer Use can open without prompting; others need approval (remove saved entries in the desktop app's Computer Use settings). |
| `projects.<path>.trust_level` | `"trusted"` \| `"untrusted"` | Per-project trust. Untrusted projects skip project-scoped `.codex/` layers (config, hooks, rules). |

### MCP servers

| Key | Type | Description |
|-----|------|-------------|
| `mcp_servers.<id>.command` / `.args` / `.env` / `.cwd` | mixed | STDIO server launch config. |
| `mcp_servers.<id>.env_vars` | array<string \| {name, source}> | Extra env vars to whitelist; strings default to `source = "local"`; `"remote"` only with executor-backed remote stdio. |
| `mcp_servers.<id>.url` | string | Streamable HTTP server endpoint. |
| `mcp_servers.<id>.auth` | `oauth`\|`chatgpt` | Auth fallback after bearer tokens/headers. `oauth` (default) uses stored MCP OAuth credentials; `chatgpt` uses the current ChatGPT session for the trusted first-party origin, then stored OAuth. |
| `mcp_servers.<id>.oauth.client_id` | string | Pre-registered OAuth client ID. |
| `mcp_servers.<id>.oauth.client_secret` | string | Client secret for a pre-registered client (requires nonempty `client_id`; stored in configuration). |
| `mcp_servers.<id>.oauth.callback_url` | string | Server-specific OAuth callback URL. |
| `mcp_servers.<id>.oauth.callback_port` | integer | Fixed callback listener port for this server (overrides `mcp_oauth_callback_port`). |
| `mcp_servers.<id>.bearer_token_env_var` / `.http_headers` / `.env_http_headers` | mixed | HTTP auth/headers. |
| `mcp_servers.<id>.http_headers_helper` | string (command) | Local command printing a JSON object of header names/values (locally connected HTTP servers only; explicit bearer tokens and OAuth take precedence over helper `Authorization`). |
| `mcp_servers.<id>.enabled` / `.required` | boolean | Disable without removing config; fail startup/resume if an enabled required server can't initialize. |
| `mcp_servers.<id>.startup_timeout_sec` (`_ms` alias) / `.tool_timeout_sec` | number | Timeouts (defaults 10s / 60s). |
| `mcp_servers.<id>.enabled_tools` / `.disabled_tools` | array<string> | Allow list / deny list (applied after `enabled_tools`). |
| `mcp_servers.<id>.default_tools_approval_mode` / `.tools.<tool>.approval_mode` | `auto`\|`prompt`\|`writes`\|`approve` | Approval mode defaults/overrides. |
| `mcp_servers.<id>.tools.<tool>.output_token_limit` | integer (positive) | Token budget for one tool's output (before the 20% serialization allowance); overrides the default truncation budget. |
| `mcp_servers.<id>.scopes` / `.oauth_resource` | mixed | OAuth scopes / RFC 8707 resource. |
| `mcp_servers.<id>.experimental_environment` | `local`\|`remote` | `remote` starts stdio servers through a remote executor environment; streamable HTTP remote placement isn't implemented. |
| `mcp_optional_startup_grace_ms` | integer (ms) | Shared wait for optional MCP servers when building the initial tool catalog (default `1000`; `0` waits for each server's `startup_timeout_sec`). |
| `mcp_oauth_credentials_store` | `auto`\|`file`\|`keyring` | Preferred MCP OAuth credential store. |
| `mcp_oauth_callback_port` | integer | Global fixed port for the OAuth callback server (server-specific `oauth.callback_port` wins; otherwise ephemeral). |
| `mcp_oauth_callback_url` | string | Base callback URL for MCP OAuth login (e.g. a devbox ingress URL); callback URL ports don't select the listener port. |
| `plugins.<plugin>.mcp_servers.<server>.{enabled,default_tools_approval_mode,enabled_tools,disabled_tools}` / `.tools.<tool>.approval_mode` | mixed | Enable/tune MCP servers bundled by an installed plugin without changing the manifest. |

See [Model Context Protocol](./mcp-config.md) for setup walkthroughs.

### Agents, skills, apps

| Key | Type | Description |
|-----|------|-------------|
| `agents.enabled` | boolean | Enable/disable multi-agent tools (default `true`). |
| `agents.max_concurrent_threads_per_session` (legacy alias `max_threads`) | number | Max concurrent spawned-agent threads, excluding the primary; unset lets Codex choose. |
| `agents.default_subagent_model` / `.default_subagent_reasoning_effort` | string | Defaults for spawned agents (explicit spawn values win). |
| `agents.interrupt_message` | boolean | Record message on interrupted agent turn (default `true`). |
| `agents.<name>.description` / `.config_file` | mixed | Custom subagent role declaration (scalar setting names are reserved as role names); relative `config_file` paths resolve from the declaring config file. |
| `skills.max_context_tokens` | integer | Token budget for the available-skills catalog (default 2% of the context window; explicit values capped at `10000`). |
| `skills.config[].{path,enabled}` | mixed | Per-skill enablement overrides (`path` is a folder containing `SKILL.md`). |
| `apps.<id>.enabled` | boolean | Enable/disable an app/connector (default `true`). |
| `apps._default.{enabled,destructive_enabled,open_world_enabled,approvals_reviewer,default_tools_approval_mode}` | mixed | Defaults for all apps (`destructive_hint` / `open_world_hint` tools; reviewer inherits top-level `approvals_reviewer` when omitted). |
| `apps.<id>.{destructive_enabled,open_world_enabled,default_tools_enabled,approvals_reviewer,default_tools_approval_mode}` | mixed | Per-app overrides. |
| `apps.<id>.tools.<tool>.enabled` / `.approval_mode` | mixed | Per-tool overrides (e.g. `repos/list`). |
| `tool_suggest.discoverables` / `.disabled_tools` | array<table> | Allow/deny tool suggestions for connectors or plugins (`{type = "connector"\|"plugin", id}`). |
| `marketplaces.<name>.{source_type,source,ref,sparse_paths}` | mixed | Plugin marketplace config: `source_type` `git` \| `local`; `source` is a Git location or an absolute local root containing `.agents/plugins/marketplace.json`; optional `ref` and `sparse_paths`. Definable in system, cloud-managed, user, or trusted-project config. |
| `plugins.<plugin>.enabled` | boolean | Enable/disable a local-marketplace plugin (`plugin-name@marketplace-name` key); doesn't override workspace-managed enabled states. |

### Features

| Key | Type | Description |
|-----|------|-------------|
| `features.apps` / `.hooks` / `.unified_exec` / `.shell_snapshot` / `.multi_agent` / `.goals` / `.remote_plugin` / `.fast_mode` / `.shell_tool` / `.enable_request_compression` / `.skill_mcp_dependency_install` | boolean | Stable toggles, on by default (see [Config basics](./config-basics.md)). `features.hooks`: `features.codex_hooks` is a deprecated alias. `features.unified_exec`: enabled on all platforms; user opt-outs are ignored, only managed requirements can disable it. `features.apps`: app and connector traffic isn't controlled by the sandboxed-command network proxy. |
| `features.ultrafast_mode` | boolean | Ultrafast mode controls (stable; on by default), independent of `features.fast_mode`; availability depends on model and account. |
| `features.personality` | boolean | Removed feature flag; accepted for compatibility and ignored. |
| `features.prefer_mxc` | boolean | Prefer MXC for local Windows execution when capabilities and policy allow it, otherwise retain the configured legacy sandbox. Disabled by default in the standalone CLI; command failures don't trigger fallback. |
| `features.prevent_idle_sleep` | boolean | Prevent sleep while a turn runs (experimental; off by default). |
| `features.memories` | boolean | Enable Memories (off by default). |
| `features.code_mode.{enabled,excluded_tool_namespaces,direct_only_tool_namespaces}` | mixed | Code mode (under development; off by default). |
| `features.context_management.experimental_mode` | boolean | Experimental; not currently available. |
| `features.rollout_budget.{enabled,limit_tokens,reminder_interval_tokens,sampling_token_weight,prefill_token_weight}` | mixed | Rollout budget tracking (under development; `limit_tokens` required when enabled; reminder interval defaults to 10% of the limit; weights default `1.0`). |
| `features.network_proxy` | boolean \| table | Start the sandboxed-command network proxy (experimental; off by default). Required to enforce permission-profile domain rules unless managed `experimental_network` requirements start it. Doesn't filter web search, apps, MCP, or other hosted tools. |
| `features.network_proxy.{enabled,domains,unix_sockets,allow_local_binding,enable_socks5,enable_socks5_udp,allow_upstream_proxy,dangerously_allow_non_loopback_proxy,dangerously_allow_all_unix_sockets,proxy_url,socks_url}` | mixed | Policy fields. `domains` is unset by default (no external destinations until `allow` rules); `enable_socks5` / `enable_socks5_udp` / `allow_upstream_proxy` default `true`; `proxy_url` defaults `"http://127.0.0.1:3128"`, `socks_url` `"http://127.0.0.1:8081"`. |
| `features.web_search` / `.web_search_cached` / `.web_search_request` | boolean | Deprecated; prefer top-level `web_search`. |
| `suppress_unstable_features_warning` | boolean | Suppress the under-development feature warning. |

### Hooks

| Key | Type | Description |
|-----|------|-------------|
| `hooks` | table | Inline lifecycle hooks (same event schema as `hooks.json`). |
| `hooks.<Event>` | array<table> | Matcher groups: `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SessionStart`, `SessionEnd`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, `Stop`, `Interrupt`. |
| `hooks.<Event>[].hooks[]` | table | Handler; command and MCP tool hooks supported (prompt/agent parsed but skipped). |
| `hooks.<Event>[].hooks[].async` | boolean | Run a command hook in the background (default `false`; `SessionEnd` always synchronous). |
| `hooks.<Event>[].hooks[].additionalContextLimit` | integer | Per-handler token threshold before oversized `additionalContext` is saved to disk (default `2500`; `0` = full context). |
| `hooks.<Event>[].hooks[].commandWindows` (alias `command_windows`) | string | Windows-only command override. |

### Memories

| Key | Type | Description |
|-----|------|-------------|
| `memories.generate_memories` / `.use_memories` | boolean | Toggle memory generation / injection (default `true`). |
| `memories.disable_on_external_context` (legacy `no_memories_if_mcp_or_web_search`) | boolean | Keep threads using MCP, web search, or tool search out of memory generation (default `false`). |
| `memories.max_raw_memories_for_consolidation` | number | Default `256`, capped at `4096`. |
| `memories.max_unused_days` | number | Default `30`, clamped `0`-`365`. |
| `memories.max_rollout_age_days` | number | Default `30`, clamped `0`-`90`. |
| `memories.max_rollouts_per_startup` | number | Default `16`, capped at `128`. |
| `memories.min_rollout_idle_hours` | number | Default `6`, clamped `1`-`48`. |
| `memories.min_rate_limit_remaining_percent` | number | Default `25`, clamped `0`-`100`. |
| `memories.extract_model` / `.consolidation_model` | string | Model overrides for memory jobs. |

### Shell / environment / execution

| Key | Type | Description |
|-----|------|-------------|
| `shell_environment_policy.inherit` | `all`\|`core`\|`none` | Baseline env inheritance for subprocesses. |
| `shell_environment_policy.ignore_default_excludes` | boolean | Keep `KEY`/`SECRET`/`TOKEN` vars before filters run (default `true`); `false` applies automatic secret-name exclusions. |
| `shell_environment_policy.filters` | map<string, `include`\|`exclude`> | Canonical case-insensitive pattern filters; includes form an allowlist and can't restore excluded values. |
| `shell_environment_policy.exclude` / `.include_only` | array<string> | Legacy arrays (don't combine with `filters` in a layer). |
| `shell_environment_policy.set` | map<string,string> | Explicit values injected after exclusions (include filters can still remove them). |
| `shell_environment_policy.experimental_use_profile` | boolean | Use the user shell profile when spawning subprocesses. |
| `background_terminal_max_timeout` | number | Max ms for empty `write_stdin` polls (default `300000`); replaces `background_terminal_timeout`. |
| `tool_output_token_limit` | number | Token budget per stored tool output. |
| `tools.web_search` | boolean \| table | Web search tool config (`context_size` low/medium/high, `allowed_domains`, `location {country, region, city, timezone}`); separate from sandbox network domain rules and doesn't restrict connectors or MCP. |
| `tools.view_image` | boolean | Enable the `view_image` local-image tool. |
| `web_search` | `disabled`\|`cached`\|`indexed`\|`live` | Web search mode (default `cached`; defaults to `live` with `--yolo` or another full access sandbox setting). |
| `experimental_use_unified_exec_tool` | boolean | Legacy name; prefer `[features].unified_exec` or `codex --enable unified_exec`. |

### Instructions & project docs

| Key | Type | Description |
|-----|------|-------------|
| `instructions` | string | Reserved for future use; prefer `model_instructions_file` or `AGENTS.md`. |
| `developer_instructions` | string | Additional injected developer instructions. |
| `model_instructions_file` | path | Replaces built-in instructions instead of `AGENTS.md`. |
| `compact_prompt` / `experimental_compact_prompt_file` | string / path | History-compaction prompt override (inline or file; the file form is experimental). |
| `project_root_markers` | array<string> | Project root marker filenames (default `[".git"]`). |
| `project_doc_max_bytes` | number | Bytes read from each `AGENTS.md`. |
| `project_doc_fallback_filenames` | array<string> | Fallback filenames when `AGENTS.md` is missing. |

### History, logging, telemetry

| Key | Type | Description |
|-----|------|-------------|
| `history.persistence` | `save-all`\|`none` | Save session transcripts to `history.jsonl`. |
| `history.max_bytes` | number | Cap history file size (drops oldest entries). |
| `log_dir` | path | Log directory (default `$CODEX_HOME/log`); setting it also enables `codex-tui.log`. |
| `sqlite_home` | path | SQLite-backed state DB directory (agent jobs, resumable runtime state). |
| `notify` | array<string> | External notification command (JSON payload argument). |
| `check_for_update_on_startup` | boolean | Check for updates on startup (set `false` only when centrally managed). |
| `feedback.enabled` | boolean | Enable `/feedback` submission across local clients (default `true`). |
| `analytics.enabled` | boolean | Enable/disable analytics for this machine/profile; in Codex CLI `false` also disables custom OTLP metrics exporters; unset applies the client default. |
| `hide_agent_reasoning` / `show_raw_agent_reasoning` | boolean | Suppress reasoning events (TUI and `codex exec`) / surface raw reasoning when emitted. |
| `otel.environment` | string | Environment tag (default `dev`). |
| `otel.exporter` / `.trace_exporter` | `none`\|`otlp-http`\|`otlp-grpc` | Exporter selection with endpoint metadata. |
| `otel.metrics_exporter` | `none`\|`statsig`\|`otlp-http`\|`otlp-grpc` | Defaults to `statsig`; `analytics.enabled = false` disables it in the CLI; `none` disables metrics export independently. |
| `otel.log_user_prompt` | boolean | Opt in to exporting raw user prompts with OTel logs. |
| `otel.exporter.<id>.{endpoint,protocol,headers}` / `otel.trace_exporter.<id>.{...}` | mixed | `protocol` `binary` \| `json`; static headers. |
| `otel.exporter.<id>.tls.{ca-certificate,client-certificate,client-private-key}` / `otel.trace_exporter.<id>.tls.*` | string | TLS certificate paths. |

### Auth & login

| Key | Type | Description |
|-----|------|-------------|
| `chatgpt_base_url` | string | Override the ChatGPT login flow base URL. |
| `cli_auth_credentials_store` | `file`\|`keyring`\|`auto`\|`ephemeral` | Where the CLI stores cached credentials. |
| `forced_login_method` | `chatgpt`\|`api` | Restrict to one auth method. |
| `forced_chatgpt_workspace_id` | string (uuid) | Limit ChatGPT login to one workspace. |

### UI (TUI / desktop)

| Key | Type | Description |
|-----|------|-------------|
| `tui.notifications` | boolean \| array<string> | Enable/filter TUI notifications. |
| `tui.notification_method` | `auto`\|`osc9`\|`bel` | Terminal notification mechanism (default `auto`). |
| `tui.notification_condition` | `unfocused`\|`always` | When notifications fire (default `unfocused`). |
| `tui.animations` / `.show_tooltips` | boolean | Welcome/status animations and tooltips (default `true`). |
| `tui.alternate_screen` | `auto`\|`always`\|`never` | Alternate screen usage (`auto` skips it in Zellij). |
| `tui.resume_cwd` | `current`\|`session` | Working directory on resume/fork (unset asks when they differ). |
| `tui.vim_mode_default` | boolean | Start the composer in Vim normal mode (toggle with `/vim`). |
| `tui.raw_output_mode` | boolean | Start in raw scrollback mode (toggle with `/raw` or `alt-r`). |
| `tui.auto_recap` | boolean | Automatic recaps while the terminal is unfocused (default `true`; `/recap` remains). |
| `tui.show_server_version_notice` | boolean | Informational notices about app-server version differences (default `true`). |
| `tui.status_line` / `.terminal_title` | array<string> \| null | Footer / title item ids (`terminal_title` defaults `["spinner", "project"]`; `null` disables). |
| `tui.theme` | string | Syntax-highlighting theme (kebab-case). |
| `tui.disable_paste_burst` | boolean | Disable burst-paste detection (default `false`); takes precedence over the legacy top-level `disable_paste_burst`. |
| `tui.keymap.<context>.<action>` | string \| array<string> | Keybinding; contexts: `global`, `chat`, `composer`, `editor`, `vim_normal`, `vim_operator`, `vim_text_object`, `pager`, `list`, `approval`. Selected composer actions fall back to `global`. `= []` unbinds. Key names such as `ctrl-a`, `shift-enter`, `page-down`, `minus`. |
| `tui.model_availability_nux.<model>` | integer | Internal startup-tooltip state keyed by model slug. |
| `file_opener` | `vscode`\|`vscode-insiders`\|`windsurf`\|`cursor`\|`none` | Citation link scheme (default `vscode`). |
| `disable_paste_burst` | boolean | Legacy fallback for `tui.disable_paste_burst`. |
| `windows_wsl_setup_acknowledged` | boolean | Windows onboarding acknowledgement. |
| `desktop.custom_file_handlers.<id>.{label,icon,command,args,input,supports_ssh}` | mixed | ChatGPT desktop app custom "Open in" handlers (user-level only; `label` / `icon` / `command` required; `input` `path` \| `json_argument` \| `json_stdin`, default `path`; `args` default `[]`; `supports_ssh` default `false`). |
| `notice.{hide_full_access_warning,hide_world_writable_warning,hide_rate_limit_model_nudge,hide_gpt5_1_migration_prompt,hide_gpt-5.1-codex-max_migration_prompt}` | boolean | In-product notice acknowledgement flags (mostly auto-managed). |
| `notice.model_migrations` | map<string,string> | Acknowledged model migrations as old->new mappings. |

## `requirements.toml`

Admin-enforced configuration that constrains security-sensitive settings users can't override (see enterprise managed configuration for locations and examples). For ChatGPT Business and Enterprise, Codex can also apply cloud-fetched requirements. Omitted keys remain unconstrained; some keys enforce an exact value (users can't override an enforced path, update preference, login-shell policy, or feedback setting). `[features]` pins runtime flags by the same canonical keys as `config.toml`, plus documented app-only keys.

| Key | Type | Description |
|-----|------|-------------|
| `sqlite_home` / `log_dir` / `model_catalog_json` / `check_for_update_on_startup` / `allow_login_shell` | mixed | Enforce the corresponding `config.toml` value. |
| `allowed_login_methods` | array<string> | Allow `chatgpt`, `api`, or both (at least one; `api` includes Amazon Bedrock). Local system requirements file or macOS MDM only; cloud-managed values ignored. |
| `allowed_chatgpt_workspaces` | array<string> | Restrict ChatGPT login (including access tokens) to listed workspace IDs; empty list disables ChatGPT login. Local file / MDM only. |
| `cli_auth_credentials_store` | `file`\|`keyring`\|`auto`\|`ephemeral` | Enforce the CLI credential store (`ephemeral` keeps credentials in memory). Local file / MDM only. |
| `chatgpt_base_url` | string | Enforce the ChatGPT service base URL before authentication and cloud-policy retrieval. Local file / MDM only. |
| `feedback.enabled` | boolean | Enforce feedback availability. |
| `allowed_approval_policies` | array<string> | Allowed policies (`on-request`, `never`, `granular`). Include `untrusted` to permit the stricter policy derived from an untrusted project; it can't be selected directly via `approval_policy`. |
| `allowed_approvals_reviewers` | array<string> | Allowed `approvals_reviewer` values (`user`, `auto_review`). |
| `guardian_policy_config` / `guardian_extra_policy` | string | Managed auto-review policy / extra policy (take precedence over local `[auto_review].policy` / `.extra_policy`; blank ignored). |
| `additional_developer_instructions` | string | Managed developer instructions as a separate developer message (rejected above 10,000 estimated tokens). |
| `auto_review.required_on_models` | array<string> | Model slugs that must use automatic review (non-empty, no provider namespace; lists from sources combine). |
| `auto_review.ignore_rules` | array<string> | Full model slugs (with provider namespace when present) for which `allow` prefix rules are ignored; deny and network rules still apply. |
| `allowed_permission_profiles` / `.<name>` | table<boolean> | Complete allowlist; omitted or `false` = denied (including future profiles). Matched by name across sources; a higher-precedence source can turn a profile off. |
| `default_permissions` | string | Managed default profile (must be allowed). Set explicitly; if omitted, Codex defaults to `:workspace` only when both `:workspace` and `:read-only` are allowed. |
| `enforce_residency` | string | Require a data residency (currently `us`). |
| `model_provider` | string | Enforce the provider ID. |
| `model_providers.<id>` | table | Managed provider definitions; each replaces the complete provider with the same ID (no field merging). |
| `models.new_thread.{model,model_reasoning_effort,service_tier}` | string | Managed defaults for new local threads (not enforcement). An explicit override of model or effort via `--model` / `--config` / `--profile` makes Codex ignore both `model` and `model_reasoning_effort`; `service_tier` is independent. |
| `permissions.<name>` | table | Admin-defined profile (same schema as `config.toml`); name can't start with `:`, be `filesystem`, or duplicate a loaded profile. |
| `permissions.filesystem.deny_read` | array<string> | Admin-enforced read denials (paths/globs). |
| `allowed_sandbox_modes` | array<string> | Allowed `sandbox_mode` values. |
| `windows.allowed_sandbox_implementations` | array<string> | Allowed legacy implementations (`elevated`, `unelevated`; non-empty; `elevated` preferred when both allowed). Doesn't restrict `mxc`. |
| `windows.allow_mxc` | boolean | `false` prohibits explicit MXC selection and `features.prefer_mxc`; omitted/`true` permits but doesn't enable or require it. |
| `remote_sandbox_config[].{hostname_patterns,allowed_sandbox_modes}` | mixed | First entry whose case-insensitive patterns (`*`, `?`) match the host overrides top-level `allowed_sandbox_modes` (sandbox modes only). |
| `allowed_web_search_modes` | array<string> | Allowed `web_search` values (`disabled` always allowed; empty list = only `disabled`). |
| `allow_managed_hooks_only` | boolean | Skip user/project/session/plugin hooks; keep managed hooks. |
| `allow_appshots` / `allow_remote_control` | boolean | `false` disables Appshots / device remote control. |
| `allow_browser_and_computer_use` | boolean | `false` blocks both Browser Use and Computer Use; `true`/omitted doesn't enable either. |
| `features.<name>` | boolean | Pin a runtime/app feature: `apps`, `in_app_updates`, `in_app_browser`, `in_app_chat`, `in_app_dictation`, `in_app_local_automation`, `browser_use`, `browser_use_external`, `browser_use_full_cdp_access`, `fast_mode`, `guardian_approval`, `memories`, `multi_agent`, `plugins`, `remote_plugin`, `realtime_conversation` (CLI `/voice`), `computer_use` (also Record & Replay), `workspace_dependencies`, `plugin_sharing` (cloud-managed only). |
| `in_app_browser.allow_external_browser_settings_import` | boolean | `false` prevents importing settings/browsing data from an external browser (managed-only). |
| `browser_use.{allow_webmcp,allow_history_access,disable_auto_review,allow_global_persistent_approval}` | boolean | Managed Browser Use switches (`allow_webmcp = true` opts the built-in browser into site tools; `disable_auto_review = true` asks the user instead). |
| `browser_use.default_origin_policy.{access,downloads,uploads,full_cdp_access,auto_review}` | `allow`\|`deny` | Fallback origin policy; `deny` on `access` also blocks uploads/downloads/CDP/auto review. `allow` only lets normal checks continue. |
| `browser_use.default_origin_policy.persistent_approval` / `.access_approval_lifetime` | boolean / `turn`\|`thread` | Whether `Always allow` is available / lifetime of non-persistent approvals (product default `thread`). |
| `browser_use.origins.<pattern>.*` | table | Origin-specific policy with the same fields. Keys `<scheme>://<host-pattern>[:<port>]` (`http`/`https`; exact host, `*.example.com`, `**.example.com`); paths, queries, credentials, wildcard schemes/ports invalid; quote in TOML. Multiple matches use the most restrictive value (`deny` > `allow`, `false` > `true`, `turn` > `thread`). |
| `computer_use.{allow_locked_computer_use,allow_persistent_approval,default_app_access}` | mixed | Locked Use enablement on managed macOS; saving app approvals across sessions; fallback app access (product default `allow`). |
| `computer_use.macos.bundle_ids.<bundle-id>` / `computer_use.windows.aumids.<aumid>` | `allow`\|`deny` | Exact app identity rules; an app must be allowed by each policy source (a `deny` from either wins). |
| `computer_use.windows.exes[].{publisher_name,product_name,binary_name,access}` | mixed | Rules for signed unpackaged executables matched by verified publisher (X.500 DN) and signed `ProductName` (and optional `OriginalFilename`); deny wins; unsigned use the default; ambiguous identity is blocked. |
| `application.network.{enabled,domains}` / `.domains.<domain>` | boolean / table | Destination restrictions for desktop app requests (HTTPS/WSS to explicitly allowed exact domains only; `enabled` defaults `true` when the table is present). Not for native modules or spawned processes. |
| `experimental_network.*` | mixed | Sandboxed networking requirements for local commands, independent of `features.network_proxy`: `enabled`, `http_port`, `socks_port`, `allow_upstream_proxy`, `dangerously_allow_non_loopback_proxy`, `dangerously_allow_all_unix_sockets`, `domains` / `domains.<pattern>` (`allow`/`deny`; exact, `*.example.com`, `**.example.com`, `*`; `deny` wins), `allowed_domains`, `denied_domains` (don't combine either with `domains`), `managed_allowed_domains_only`, `unix_sockets` (macOS, absolute paths), `allow_local_binding`. Doesn't route browser traffic or control web search, apps, MCP, or native-app traffic; Work Cloud doesn't inherit them. |
| `hooks.managed_dir` / `.windows_managed_dir` / `.<Event>` | mixed | Admin-enforced managed hooks (absolute existing directory; same schema as inline `[hooks]`, including `async`, `additionalContextLimit`, `commandWindows`). |
| `mcp_servers.<id>.identity.{command,url}` | string \| table | MCP server allowlist; both `<id>` and identity must match or the server is disabled. `command` exact string or `{executable, args[]{match = exact\|prefix\|regex, value\|expression}}` (full-length, ordered); `url` exact string or `{match, value\|expression}`. |
| `plugins.<plugin>.mcp_servers.<server>.identity.*` | mixed | Same identity allowlist scoped to a plugin's bundled servers (when `plugins` is present, unmatched plugin servers are disabled). |
| `marketplaces.restrict_to_allowed_sources` | boolean | When `true`, configured marketplace sources must match `allowed_sources` for add, install, refresh, and runtime loading (curated Git catalogs too). |
| `marketplaces.allowed_sources.<name>.{source,url,ref,host_pattern,path}` | mixed | `source` `git` (needs `url`, optional exact `ref`) \| `host_pattern` (regex on lowercase hostname; use `^`/`$`) \| `local` (absolute `path`). Names accumulate across layers. |
| `apps.<id>.enabled` / `.tools.<tool>.approval_mode` | mixed | Managed app/tool constraints (`enabled = false` stays restrictive when merging sources). |
| `rules.prefix_rules[].{pattern,decision,justification}` | mixed | Admin-enforced command prefix rules merged with `.rules` files. `pattern` is an array of tokens each with `token` or `any_of`; `decision` is `prompt` or `forbidden` only. |

## Notes

- Both tables above are condensed from the official page (493 `config.toml` options plus the `requirements.toml` table); consult the source for exact wording of edge cases before relying on precedence details in automated tooling.
- Removed / changed since earlier revisions of this page: `windows.sandbox_private_desktop` is no longer listed in the reference (both legacy Windows sandbox modes use a private desktop by default); `features.personality` is a removed flag; `model_providers.<id>.wire_api` accepts only `responses` (`wire_api = "chat"` isn't supported); `approval_policy = "untrusted"` is unsupported; `personality` values `friendly` / `pragmatic` no longer select a style.
- Managed permission-profile allowlists (`allowed_permission_profiles`, managed `default_permissions`) require Codex 0.138.0 or later; Codex 0.137.0 and earlier ignore them. Use `allowed_sandbox_modes` with `sandbox_mode`, and `allowed_permission_profiles` with managed `default_permissions`.
- The `in_app_browser` (browser pane a person uses), `browser_use` (agent-driven browser work), and `computer_use` (agent-driven native desktop apps) requirements are three separate surfaces. Nested Browser Use / Computer Use policy values don't grant access by themselves; where managed requirements and `config.toml` both apply, a `deny` from either wins.
- This page omits the official "Settings for Local computer access with Work Cloud" section, which covers ChatGPT Work only.
- Latest JSON schema: https://learn.chatgpt.com/docs/config-schema.json.

## Related

- [Config basics](./config-basics.md)
- [Advanced Configuration](./config-advanced.md)
- [Sample Configuration](./config-sample.md)
- [Model Context Protocol](./mcp-config.md)
