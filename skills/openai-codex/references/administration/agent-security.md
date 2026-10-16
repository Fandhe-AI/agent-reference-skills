# Agent Security

Admin Console area for managing Codex/Work policies and configuration. Replaces Policies & Configuration. Each policy has a Global baseline plus optional Local and Codex Cloud environment overrides.

## Signature / Usage

Managed networking path in the Admin Console:

```text
Admin Console > Agent Security > <policy> > Global | Local | Codex Cloud > Requirements > Manage Networking
```

Orchestrator controls (Global only) and their `requirements.toml` fields:

| Control | `requirements.toml` fields |
|---------|----------------------------|
| Approval policies and review | `allowed_approval_policies`, `allowed_approvals_reviewers`, `auto_review`, `guardian_policy_config` |
| Web search modes | `allowed_web_search_modes` |
| Apps, MCP servers, plugins | `apps`, `mcp_servers`, `plugins` |
| Command rules | `rules` |
| Managed hooks | `hooks`, `allow_managed_hooks_only` |

Execution controls (Global, with Local / Codex Cloud overrides):

| Control | `requirements.toml` fields |
|---------|----------------------------|
| Login shell use | `allow_login_shell` |
| Allowed sandbox modes | `allowed_sandbox_modes` |
| Permission profiles and defaults | `allowed_permission_profiles`, `default_permissions`, `permissions` |
| Remote sandbox configuration | `remote_sandbox_config` |
| Managed execution networking | `experimental_network` |
| Windows execution settings | `windows` |

Environment defaults (Defaults editor, `config.toml` fields): `allow_login_shell`, `shell_environment_policy`, `sandbox_mode`, `sandbox_workspace_write`, `default_permissions`, permissions, windows.

## Notes

- Global sets orchestrator controls (approvals, web search) and shared execution settings. Local applies to work on a connected computer; Codex Cloud applies to Codex cloud tasks and only takes effect after Codex Cloud is enabled on the permissions page. Empty environment settings inherit Global.
- Only **Allowed approval policies** and **Allowed web search modes** have dedicated Agent Security UI controls; configure the other orchestrator fields through TOML.
- Requirements set limits users cannot override; Defaults set starting values within those limits. A default does not override an enforced requirement.
- Policy precedence: across policies a higher-priority policy wins even over a more specific lower-priority one. Within one policy: OS-specific environment override, then all-OS environment override, then Global. For local execution, MDM and legacy managed-device requirements rank above Agent Security; the device's system requirements file ranks below it.
- Managed networking (UI): Admin Console > Agent Security > policy > Global / Local / Codex Cloud > Requirements > **Manage Networking**; add domains with Allow or Deny; **Only allow domains added by admins** prevents user config and per-domain approvals from expanding the managed proxy allowlist. With both on and no effective Allow entries, ordinary managed commands have no allowed destinations; a deny-only policy does not implicitly allow the rest of the internet.
- A managed command allowlist applies to commands using the managed proxy. Approved full sandbox escalation can bypass the command proxy; test both ordinary and escalated commands.
- Codex Cloud: Agent Security requirements constrain command networking, but the Cloud environment's internet settings apply separately and an Agent Security allowed domain does not override them. An explicit Off for local/private connectivity (`allow_local_binding`) can prevent Codex Cloud from reaching its upstream proxy.
- Hooks with Local computer access with Work Cloud: when managed policy and remote hooks are enabled, configure `mcp_tool` handlers in Global `requirements.toml`. Command/shell, prompt and agent handlers, hooks from local config/plugins/directories, environment-scoped hooks, and `SessionEnd` MCP hooks are not supported with cloud orchestration. A `PreToolUse` callback error, timeout, or malformed response can fail the hook without blocking the tool, and MCP hooks do not provide a complete Compliance API audit trail.
- Work Cloud: configure **Cloud browser use** and **Cloud network access** under Admin Console > Permissions & roles > Workspace capabilities > Cloud computer capabilities. Work Cloud containers and dots cloud computers use their own execution configuration, not the managed environment bundle. If `enforce_residency` is enabled in any cloud policy, **Allow local computer access** is disabled for both Work and dots.
- Migration: eligible legacy cloud policies migrate into Global, preserving assignments and ordering. SCIM membership sync and RBAC roles are unchanged.
- Policy API manages Global settings only; Local and Codex Cloud settings are managed through the Agent Security UI. Existing Global API workflows and Terraform integrations remain available after migration; test them.
- Source: https://learn.chatgpt.com/docs/enterprise/agent-security (retrieved 2026-10).

## Related

- [Managed configuration](./managed-configuration.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Governance](./governance.md)
- [Compliance API](./compliance-api.md)
