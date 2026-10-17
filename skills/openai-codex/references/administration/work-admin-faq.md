# ChatGPT Work admin FAQ

Manage access, data, governance, observability, usage, and incident controls for ChatGPT Work (the Codex-powered, longer multi-step task mode inside ChatGPT).

## Overview

ChatGPT Work brings the technology behind Codex into ChatGPT for longer, multi-step tasks: it gathers context from chats, files, workspace resources, and connected systems, uses approved tools, and creates review-ready outputs. Access, context, actions, network behavior, and credit use vary by plan, workspace settings, source permissions, and surface. Where supported, workspace owners or authorized admins manage Work Cloud, Work Local, and Codex Local through distinct permissions; for eligible Enterprise and Edu workspaces the default workspace role includes Work unless an authorized administrator turns it off. Browser and network controls further restrict Work Cloud. Codex Local access (desktop, CLI, IDE) is governed through Codex Local permissions and managed configuration. (Earlier revisions of this page stated a July 9, 2026 launch and a two-week preview; the current official FAQ doesn't state either.)

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

- Work across devices: Local computer access with Work Cloud (ChatGPT Work; see the cloud-local-access guidance) lets eligible members continue a Work conversation across desktop, mobile, and web, applies only to tasks created after you enable it, doesn't change Codex's existing configuration behavior (its conversations don't appear in Codex history), isn't suitable for strict zero data retention, and if the computer is unavailable an eligible task can continue in a cloud container without local files, tools, or local enterprise requirements. Enable via Work Cloud, review the Agent Security baseline, then **Allow local computer access** under Workspace settings > Permissions & roles (disabled if `enforce_residency` is enabled in any cloud policy). Turning it off interrupts running turns and doesn't change retention policies.
- Core controls detail: SCIM and synchronized identity groups aren't included with ChatGPT Business; ChatGPT doesn't provide workspace-wide MFA enforcement (enforce SSO and MFA through your identity provider); built-in Enterprise roles include Owner, Admin, Member, and Analytics Viewer; a Codex-only seat doesn't grant access to Work; credits are shared between Work and Codex with monthly per-user limits via workspace default, group defaults, and individual overrides (Business follows a separate model).
- Observability: the Compliance Logs Platform provides Work user prompts and agent responses for eligible Enterprise and Edu workspaces (connected app calls are logged separately; no complete audit trail for every hosted file operation, shell command, browser interaction, tool invocation, or approval) and retains data for 30 days. Local Codex clients can opt in to OpenTelemetry exports (API requests, errors, prompt metadata, tool-approval decisions, tool results); prompt contents stay redacted unless `otel.log_user_prompt = true` is set as a separate explicit opt-in; this doesn't provide an OTel export for ChatGPT Work on the web. Enabling Local computer access with Work Cloud changes what an existing OTel collector receives: the local executor can still export supported execution events but cloud orchestration events don't reach it.
- Usage and cost: Work and Codex share pricing, credits, and usage limits; use spend controls, usage analytics, and the unified Cost API for eligible Enterprise administrators; don't treat aggregated analytics as exact per-workflow cost attribution. Highest-variance patterns include frequent or scheduled workflows, large retrieval, repeated app calls, retries, large artifacts, and Codex chats that process repositories, run commands, or use cloud environments.
- Recommended admin actions: choose who needs Work; set roles and permissions in **Permissions & roles**; review plugins and data sources; set expectations for appropriate use cases; set credit and usage controls (with model and effort guidance); identify first high-value workflows; prepare champions and support teams; explain review and approval expectations; monitor adoption and adjust.
- Governance spans three separate layers: ChatGPT Work access controls, Workspace Agent controls, and Codex managed configuration — they are not one uniform policy surface.
- The Compliance Logs Platform covers user prompts and agent responses (not files, actions, or tool calls) and retains data for 30 days; export continuously for longer retention.
- For Codex activity specifically, local runs execute on the user's machine under OS sandboxing and approval policies; Codex cloud runs in isolated OpenAI-managed environments.

## Related

- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Governance](./governance.md)
- [ChatGPT usage limits and spend controls](./usage-limits.md)
- [Managed configuration](./managed-configuration.md)
