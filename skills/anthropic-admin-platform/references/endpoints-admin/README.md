# endpoints-admin

| Name | Description | Path |
|------|-------------|------|
| Analytics Admin API | Organization-wide activity, cost, and usage analytics (mostly Claude Enterprise). | [analytics.md](./analytics.md) |
| API Keys Admin API | Manage regular API keys within an organization (list, view, update status). | [api-keys.md](./api-keys.md) |
| Compliance Settings Admin API | Get and update the organization's Compliance Settings singleton. | [compliance-settings.md](./compliance-settings.md) |
| Cost Report Admin API | Retrieve time-bucketed cost data for an organization. | [cost-report.md](./cost-report.md) |
| External Keys Admin API | Manage CMEK configs (AWS KMS / GCP Cloud KMS / Azure Key Vault) referenced by Workspaces. | [external-keys.md](./external-keys.md) |
| Federation Issuers Admin API | Register OIDC issuers Anthropic trusts for workload identity federation. | [federation-issuers.md](./federation-issuers.md) |
| Federation Rules Admin API | Authorization rules binding an issuer's verified JWTs to a service account. | [federation-rules.md](./federation-rules.md) |
| Invites Admin API | Invite new Users to an organization. | [invites.md](./invites.md) |
| MCP Tunnels Admin API (deprecated) | Manage org-scoped MCP Tunnels and their CA certificates. Deprecated. | [mcp-tunnels.md](./mcp-tunnels.md) |
| Organizations Admin API | Retrieve information about the organization associated with the authenticated key. | [organizations.md](./organizations.md) |
| Plugin Marketplaces Admin API (Beta) | List and read the plugin marketplaces that Plugins live in. | [plugin-marketplaces.md](./plugin-marketplaces.md) |
| Plugins Admin API (Beta) | Create and manage organization-owned Plugins and their versions. | [plugins.md](./plugins.md) |
| Rate Limits Admin API | List Messages API rate limits for an organization. | [rate-limits.md](./rate-limits.md) |
| RBAC Groups Admin API | Manage RBAC Groups and their membership (Beta, Claude Enterprise only). | [rbac-groups.md](./rbac-groups.md) |
| RBAC Roles Admin API | Read-only listing of RBAC Roles and the permissions each grants. | [rbac-roles.md](./rbac-roles.md) |
| Service Accounts Admin API | Manage non-human workload identities (service accounts) and their workspace memberships. | [service-accounts.md](./service-accounts.md) |
| Spend Limits Admin API | List and set spend limits, and manage spend limit increase requests. | [spend-limits.md](./spend-limits.md) |
| Telemetry Destinations Admin API (Beta) | Register OpenTelemetry (OTLP/HTTP) destinations and choose the workspaces they cover. | [telemetry-destinations.md](./telemetry-destinations.md) |
| Usage Report Admin API | Retrieve aggregated usage metrics for Claude Code and the Messages API. | [usage-report.md](./usage-report.md) |
| Users Admin API | Manage the Users in an organization. | [users.md](./users.md) |
| Workspaces Admin API | Manage Workspaces, their Members, rate-limit overrides, and Service Account memberships. | [workspaces.md](./workspaces.md) |
