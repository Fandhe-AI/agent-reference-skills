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

Block never-approve / full-access sandbox modes (legacy):

```toml
allowed_approval_policies = ["untrusted", "on-request"]
allowed_sandbox_modes = ["read-only", "workspace-write"]
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
| `[marketplaces]` | Restrict user-configured plugin marketplace sources |

## Locations and precedence

Requirements (low to high precedence): system `requirements.toml` (`/etc/codex/requirements.toml` or `%ProgramData%\OpenAI\Codex\requirements.toml`) → enterprise-managed requirements (cloud config bundle) → legacy `managed_config.toml` fields reinterpreted as requirements → macOS MDM (`com.openai.codex:requirements_toml_base64`).

Managed defaults (top overrides bottom): macOS MDM preferences → `managed_config.toml` (`/etc/codex/managed_config.toml` Unix, `~/.codex/managed_config.toml` Windows) → user's `config.toml`. CLI `--config` overrides apply to the base but managed layers still win.

## Notes

- Permission-profile allowlists require Codex 0.138.0+; earlier clients ignore `allowed_permission_profiles` and managed `default_permissions`.
- `[experimental_network]` is experimental — validate on target client versions/OSes before broad rollout; Windows support is limited.
- Don't deploy managed custom permission profiles until the whole fleet is upgraded to a supporting release.
- macOS MDM setup: base64-encode TOML into `config_toml_base64` (managed defaults) or `requirements_toml_base64` (requirements) under the `com.openai.codex` preference domain; compatible with Jamf Pro, Fleet, Kandji.

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Manage app updates](./manage-app-updates.md)
- [Workspace model availability](./workspace-model-availability.md)
- [Admin rollout guide](./admin-rollout-guide.md)
