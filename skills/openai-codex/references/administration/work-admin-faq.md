# ChatGPT Work admin FAQ

Manage access, data, governance, observability, usage, and incident controls for ChatGPT Work (the Codex-powered, longer multi-step task mode inside ChatGPT).

## Overview

ChatGPT Work lets users delegate longer, multi-step tasks: it gathers context from chats, files, workspace resources, and connected systems, uses approved tools, and creates review-ready outputs. Launched July 9, 2026; for Enterprise/Edu, web and mobile access is off by default during a two-week preview (admins can enable it; explicit opt-outs persist). Desktop access is governed separately through Codex Local permissions and managed configuration.

## Core administrative controls

| Layer | Governs |
|-------|---------|
| Access to the enterprise workspace | SSO, domain verification, SCIM provisioning, user lifecycle, identity-group sync, MFA (Global Admin Console) |
| Access to ChatGPT Work within the workspace | ChatGPT Work access control + RBAC |
| Group membership | SCIM/identity-provider group sync (see [Groups and provisioning](./groups-and-provisioning.md)) |
| Workspace and member roles | Built-in Owner/Admin/Member roles + custom roles (see [Roles and workspace permissions](./roles-and-workspace-permissions.md)) |
| Plugins and connectors | Plugin policy, connector access/action controls (see [Plugin controls](./plugin-controls.md)) |
| Source-system permissions | Native application account/connection permissions |
| Approval and action restrictions | Per-connector action control (all / read-only / custom) |
| Credits | Per-user monthly limits (workspace default, group defaults, overrides) (see [ChatGPT usage limits and spend controls](./usage-limits.md)) |
| Analytics and reporting | Global Admin Console, workspace analytics, Compliance API, Codex reporting (see [Governance](./governance.md)) |

## Action risk categories

- **Read** — access/search/summarize without changing data
- **Draft** — prepare content for human review
- **Write** — create/update/delete records in connected systems
- **Share** — send/publish to more people/systems
- **Scheduled** — recurring/future-triggered tasks
- **Execute** — run code, shell commands, browser automation

## Incident and revocation controls

- Remove workspace/group access (SCIM-managed users: remove at the identity provider)
- Disable/restrict the relevant plugin or connector
- Revoke a shared connection, bot, service account, or Codex access token
- Remove/unpublish a Workspace Agent
- Disable the relevant schedule or trigger
- Revoke Codex access token, repository connection, and cloud-environment access individually — managed configuration is not a revocation mechanism

## Notes

- Governance spans three separate layers: ChatGPT Work access controls, Workspace Agent controls, and Codex managed configuration — they are not one uniform policy surface.
- The Compliance Logs Platform covers user prompts and agent responses (not files, actions, or tool calls) and retains data for 30 days; export continuously for longer retention.
- For Codex activity specifically, local runs execute on the user's machine under OS sandboxing and approval policies; Codex cloud runs in isolated OpenAI-managed environments.

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Governance](./governance.md)
- [ChatGPT usage limits and spend controls](./usage-limits.md)
- [Managed configuration](./managed-configuration.md)
