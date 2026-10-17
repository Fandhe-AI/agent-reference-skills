# Managed configuration

Enforce runtime requirements across supported local clients (ChatGPT desktop app, Codex CLI, IDE extension) and distribute managed defaults.

## Overview

Managed configuration controls supported local runtime behavior. It doesn't grant ChatGPT workspace access, assign seats, or replace workspace RBAC — use [Roles and workspace permissions](./roles-and-workspace-permissions.md) for that. Two mechanisms:

- **Requirements** (`requirements.toml`) — admin-enforced constraints users can't override.
- **Managed defaults** (`managed_config.toml`) — starting values applied at launch; users can still change settings during a run, but the client reapplies managed defaults next launch.

## Signature / Usage

Allow only read-only and workspace permission profiles (Codex 0.138.0+):

```toml
default_permissions = ":workspace"

[allowed_permission_profiles]
":read-only" = true
":workspace" = true
# ":danger-full-access" omitted -> denied
```

Block never-approve / full-access sandbox modes (legacy); this example blocks `--ask-for-approval never` and `--sandbox danger-full-access` (including `--yolo`). `untrusted` here only preserves the stricter approval behavior derived from `trust_level = "untrusted"`; it doesn't make `approval_policy = "untrusted"` a supported explicit setting:

```toml
allowed_approval_policies = ["untrusted", "on-request"]
allowed_sandbox_modes = ["read-only", "workspace-write"]
```

Managed least-privilege custom profile (Codex 0.138.0+; organization-specific names, can't start with `:` or be `filesystem`):

```toml
default_permissions = "acme_review_only"

[allowed_permission_profiles]
":read-only" = true
":workspace" = true
acme_review_only = true

[permissions.acme_review_only]
description = "Review code without modifying the workspace."
extends = ":read-only"
```

Restrict plugin marketplace sources:

```toml
[marketplaces]
restrict_to_allowed_sources = true

[marketplaces.allowed_sources.company_plugins]
source = "git"
url = "https://github.com/example/company-plugins.git"
ref = "main"

[marketplaces.allowed_sources.internal_git]
source = "host_pattern"
host_pattern = '^git\.example\.com$'

[marketplaces.allowed_sources.local_plugins]
source = "local"
path = "/opt/company/codex-plugins"
```

Network access requirements:

```toml
[experimental_network]
enabled = true
managed_allowed_domains_only = true

[experimental_network.domains]
"api.openai.com" = "allow"
"**.example.com" = "allow"
"blocked.example.com" = "deny"
```

Authentication (local system `requirements.toml` or macOS MDM only):

```toml
allowed_login_methods = ["chatgpt"]
allowed_chatgpt_workspaces = ["00000000-0000-0000-0000-000000000000"]
cli_auth_credentials_store = "keyring"
```

Enforce command rules:

```toml
[rules]
prefix_rules = [
  { pattern = [{ token = "rm" }], decision = "forbidden", justification = "Use git clean -fd instead." },
  { pattern = [{ token = "git" }, { any_of = ["push", "commit"] }], decision = "prompt", justification = "Require review before mutating history." },
]
```

## Options / Requirement keys

| Key | Controls |
|-----|----------|
| `allowed_approval_policies` / `allowed_approvals_reviewers` | Which approval policies/reviewers (e.g. `auto_review`) users can select |
| `allowed_sandbox_modes` | Legacy sandbox-mode allowlist (`read-only`, `workspace-write`, `danger-full-access`) |
| `allowed_permission_profiles` / `default_permissions` | Permission-profile allowlist (Codex 0.138.0+; preferred over sandbox modes) |
| `allow_appshots` | Enable/disable Appshots |
| `allow_remote_control` | Enable/disable device remote control (not SSH remote connections) |
| `[[remote_sandbox_config]]` | Per-hostname sandbox-mode overrides |
| `allowed_web_search_modes` | Web search mode allowlist |
| `[experimental_network]` | Centrally defined network access rules (experimental; limited Windows support) |
| `[features]` | Pin feature flags (e.g. `in_app_updates`, `browser_use`, `computer_use`, `hooks`) |
| `[computer_use].allow_locked_computer_use` | Restrict Computer Use after a managed Mac locks |
| `guardian_policy_config` | Replace tenant-specific automatic-review policy text |
| `[permissions.filesystem].deny_read` | Deny-read paths/globs users can't override |
| `[hooks]` + `managed_dir` | Enforce managed lifecycle hooks; `allow_managed_hooks_only = true` skips user/project/session/plugin hooks |
| `[rules].prefix_rules` | Enforced command rules (`decision` must be `prompt` or `forbidden`) |
| `[mcp_servers.<name>].identity` | Restrict which MCP servers a client can enable, by command or URL |
| `features.plugins = false` | Disable plugins entirely |
| `[marketplaces]` | Restrict user-configured plugin marketplace sources (`restrict_to_allowed_sources`, `[marketplaces.allowed_sources.<name>]` with `source` `git` / `host_pattern` / `local`) |
| `[browser_use]` / `[computer_use]` | Browser origin policy and native-app access (`[computer_use.macos.bundle_ids]`, `windows.aumids`, `windows.exes`); `allow_webmcp`, `allow_history_access`, `disable_auto_review`, `allow_global_persistent_approval` |
| `[application.network]` | Desktop app network destinations (exact domains over HTTPS / WSS) |
| `guardian_extra_policy` / `additional_developer_instructions` | Extra automatic-review policy / managed developer instructions |
| `allowed_login_methods`, `allowed_chatgpt_workspaces`, `cli_auth_credentials_store`, `chatgpt_base_url` | Authentication requirements; set in the local system `requirements.toml` or macOS MDM (ignored in cloud-managed requirements) |
| `[windows]` `allow_mxc` / `allowed_sandbox_implementations` | Windows sandbox constraints |

## Locations and precedence

Requirements (low to high precedence): system `requirements.toml` (`/etc/codex/requirements.toml` or `%ProgramData%\OpenAI\Codex\requirements.toml`) → enterprise-managed requirements (cloud config bundle) → legacy `managed_config.toml` fields reinterpreted as requirements → macOS MDM (`com.openai.codex:requirements_toml_base64`).

Managed defaults (top overrides bottom): macOS MDM preferences → `managed_config.toml` (`/etc/codex/managed_config.toml` Unix, `~/.codex/managed_config.toml` Windows) → user's `config.toml`. CLI `--config` overrides apply to the base but managed layers still win.

## Notes

- Three mechanisms: requirements (admin-enforced, can't be overridden), configuration defaults (system or cloud-managed `config.toml` settings users can override), and legacy managed defaults (`managed_config.toml`). Support depends on the product, client version, and execution environment. Managed configuration doesn't grant a workspace seat or feature access.
- Agent Security (Admin Console) replaces Policies & Configuration, keeps existing policies, assignments, and ordering, and is available independently of Local computer access with Work Cloud. Before moving policy automation: inventory Terraform configurations and scripts that update policies; use the policy API for Global settings (Local or Codex Cloud settings use the Agent Security UI); test that updates reach the right policy and assignments and ordering are unchanged. If `enforce_residency` is enabled in any cloud policy, **Allow local computer access** is disabled for Work and dots. Within a policy: OS-specific environment override, then all-OS environment override, then Global; a higher-priority policy wins even if a lower-priority one is more specific. See agent-security.md.
- Plugin marketplaces and defaults: define local or Git marketplaces and plugin defaults in system `config.toml` or the configuration defaults in Agent Security (defaults, not enforced policy). Workspace GitHub import and sync is separate (see plugin-management.md). `requirements.toml` can pin `features.plugins = false` (also applies with API-key sign-in); allowed marketplace sources reject unmatched add, install, and Git refresh and filter configured marketplaces at runtime; OpenAI-curated Git marketplaces (including the API-key catalog) must also match the allowlist (`source = "git"`, `url = "https://github.com/openai/plugins.git"`, no `ref`). Source restrictions apply only to ChatGPT and Codex in the desktop app and Codex CLI.
- Retired `untrusted` approval policy: remove it from managed defaults, `managed_config.toml`, and any user, project, profile, or startup configuration. For interactive read-only use, `approval_policy = "on-request"` with a read-only sandbox or an allowed permission profile. To keep stricter approvals, omit `approval_policy`, set `trust_level = "untrusted"` for the project in user-level `~/.codex/config.toml`, and keep `untrusted` in `allowed_approval_policies`. For Codex 0.138.0+, prefer `allowed_permission_profiles` with managed `default_permissions`; use `allowed_sandbox_modes` for legacy deployments.
- Conflicts: when a value conflicts with an enforced rule, the local client falls back to a compatible value and notifies the user. An `mcp_servers` allowlist enables a server only when both name and identity match (an empty table disables all MCP servers); string `identity.command` matches only the command (not `args`, `cwd`, `env`, `env_vars`); structured matches use `executable` plus ordered `args` with `exact`, `prefix`, or full-value `regex`; plugin-bundled servers use `plugins.<plugin>.mcp_servers.<server>`.
- Layer composition: higher-precedence layers override scalar and list values; tables merge by key; rules, hooks, and filesystem restrictions have field-specific composition. Legacy `approval_policy`, `approvals_reviewer`, and `sandbox_mode` fields are reinterpreted as requirements (use `requirements.toml` for explicit allowlists). MDM and legacy managed-device requirements rank above Agent Security; the device's system requirements file ranks below it.
- Network policy by environment (same domain key within one policy): Global Deny + environment Allow = allowed in that environment; Global Allow + environment Deny = blocked; no override inherits Global; an Allow doesn't bypass a different matching Deny (e.g. an inherited wildcard) and an empty environment map doesn't clear inherited rules. Orchestrator limits: managed HTTP/SOCKS listener ports and non-loopback proxy listeners are unsupported by the cloud runtime. Verify executor support and test allowed and blocked destinations in each environment. `experimental_network.managed_allowed_domains_only = true` needs administrator-owned Allow entries (a deny-only policy doesn't allow the rest of the internet); don't combine `domains` with legacy `allowed_domains` / `denied_domains`. `[experimental_network]` is experimental and Windows support is limited. The proxy doesn't filter web search, apps and connectors, MCP servers, native-app traffic, or Codex service requests; control those with `allowed_web_search_modes`, `features.apps = false`, `features.plugins = false`, the managed `mcp_servers` list, and feature requirements (`browser_use`, `in_app_browser`, `computer_use`). Approved full sandbox escalation can bypass the command proxy. For Codex Cloud, an explicit `allow_local_binding = false` can prevent reaching the upstream proxy; the Cloud default is true only when no requirement, network profile, or proxy feature setting supplies a value.
- Cloud-managed requirements: delivered when a user signs in with ChatGPT on a supported plan (a delivery channel for `requirements.toml`-compatible policy; not workspace access or RBAC). The client checks a valid identity-matched cache, otherwise fetches the bundle with retries and writes a signed cache entry; if the request fails or times out with no valid cache the load returns an error rather than silently starting without the layer. A background refresh updates the cache for a later start. Don't rely on a copied group-matching algorithm. Authentication requirements (`allowed_login_methods`, `allowed_chatgpt_workspaces`, `cli_auth_credentials_store`, `chatgpt_base_url`) must be managed locally; user `forced_login_method` / `forced_chatgpt_workspace_id` must follow them, and if no login method is available Codex refuses to start.
- Appshots / device remote control: `allow_appshots = false` disables Appshots; `allow_remote_control = false` disables device remote control (not SSH remote connections); omitting either leaves normal availability. Web search: `allowed_web_search_modes = ["cached"]` prevents live search even in `danger-full-access`; `[]` allows only `disabled`. Host-specific sandbox: first matching `[[remote_sandbox_config]]` entry wins within a source (case-insensitive patterns, FQDN preferred); host-name matching is for policy selection only, not authenticated device proof.
- Browser and Computer Use: origins include scheme, host, and optional port (no path, query, or fragment) and, unlike command-network domain rules, distinguish HTTP from HTTPS and match the port. Matching origin rules resolve per field (a deny wins; the default origin policy fills unspecified fields); local config can add restrictions but can't relax a managed deny. `browser_use.disable_auto_review = true` (or `auto_review = "deny"` per origin) controls approval handling, not model safety monitoring. Windows `exes` rules require `publisher_name`, `product_name`, `access` (optional `binary_name`). `computer_use.allow_locked_computer_use = false` removes the controls for enabling Locked Use (doesn't turn it off if already enabled).
- Feature pins: `[features]` accepts canonical keys (`hooks`, `unified_exec`, `browser_use`, `browser_use_full_cdp_access`, `browser_use_external`, `in_app_browser`, `in_app_updates`, `computer_use`, ...); the runtime normalizes recognized features and rejects conflicting writes. A managed `unified_exec = false` keeps command execution but disables resumable processes and `write_stdin`. `in_app_updates = false` disables the desktop app's updater on restart (see manage-app-updates.md); `computer_use = false` also disables Record & Replay.
- Deny-read: `[permissions.filesystem] deny_read` accepts absolute paths (e.g. `/**/*.env`) or `~`-relative paths (not `./`); when present the runtime rejects full-access permissions and keeps local execution in a read-only or workspace sandbox. On native Windows it applies to direct file tools, not shell subprocess reads.
- Managed hooks: hook config comes from `requirements.toml`; the runtime doesn't distribute scripts in `managed_dir` (deliver via MDM; absolute script paths); `allow_managed_hooks_only = true` skips user, project, session, and plugin hooks. Cloud-orchestrated Work uses `mcp_tool` handlers in Global `requirements.toml`; command, prompt, agent handlers, local or plugin hooks, environment-scoped hooks, and `SessionEnd` MCP hooks aren't supported there; a `PreToolUse` callback error, timeout, or malformed response can fail the hook without blocking, and MCP hooks give no complete Compliance API audit trail. Rules from requirements merge with `.rules` files (most restrictive wins) and must use `decision` `prompt` or `forbidden`.
- Managed defaults (`managed_config.toml`): override the user's `config.toml` and CLI `--config` overrides at startup; users can still change settings during a run and the defaults reapply next launch; the runtime rejects disallowed values. Order (top overrides bottom): macOS MDM, `managed_config.toml`, user `config.toml`. Cloud `config.toml` uses normal configuration precedence and cloud `requirements.toml` uses requirements precedence. If missing, the managed layer is skipped. MDM workflow: base64-encode (no wrapping) the managed TOML under `com.openai.codex` at `config_toml_base64` or `requirements_toml_base64`, push the profile (Jamf Pro, Fleet, Kandji), ask users to restart and confirm the startup config summary, and update the payload to change or revoke; avoid secrets or high-churn values. Example defaults: `approval_policy = "on-request"`, `sandbox_mode = "workspace-write"`, `network_access = false`, `[otel] environment = "prod"`, `exporter = "otlp-http"`, `log_user_prompt = false`.
- Model retirements: replace `gpt-5.5` pinned in managed defaults, macOS MDM profiles, or saved configuration (retires 2026-10-14, noon PDT / 19:00 UTC; use `gpt-6.1-sol` once enabled for the affected users); configurations pinning `gpt-5.4` / `gpt-5.4-mini` follow the GPT-5.4 migration guidance in workspace-model-availability.md. The API and API-key sessions aren't affected.
- Recommended guardrails: prefer `workspace-write` with approvals; reserve full access for controlled containers; keep `network_access = false` unless a security review allows a collector or required domains; pin OTel exporter and environment but keep `log_user_prompt = false` unless policy allows storing prompts; audit drift between local `config.toml` and managed policy. Assign an owner to each managed policy, record target users or groups and the business reason for restrictions, and test an allowed and a blocked workflow (a workspace role or group alone doesn't enforce a local runtime restriction).
- Permission-profile allowlists require Codex 0.138.0+; earlier clients ignore `allowed_permission_profiles` and managed `default_permissions`.
- `[experimental_network]` is experimental — validate on target client versions/OSes before broad rollout; Windows support is limited.
- Don't deploy managed custom permission profiles until the whole fleet is upgraded to a supporting release.
- macOS MDM setup: base64-encode TOML into `config_toml_base64` (managed defaults) or `requirements_toml_base64` (requirements) under the `com.openai.codex` preference domain; compatible with Jamf Pro, Fleet, Kandji.
- Source: https://learn.chatgpt.com/docs/enterprise/managed-configuration (retrieved 2026-10).

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Manage app updates](./manage-app-updates.md)
- [Workspace model availability](./workspace-model-availability.md)
- [Admin rollout guide](./admin-rollout-guide.md)
