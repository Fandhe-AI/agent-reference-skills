# REST API

| Name | Description | Path |
|------|-------------|------|
| Activity Logs | Endpoint for retrieving organization activity log events. Enterprise plan and OAuth authentication required. | [activity-logs.md](./activity-logs.md) |
| AI Usage | Endpoint for fetching per-user, per-day AI credit usage for an organization's plan. Enterprise plan required. | [ai-usage.md](./ai-usage.md) |
| Authentication | Overview of Figma REST API authentication methods: OAuth apps, plan access tokens, and personal access tokens. | [authentication.md](./authentication.md) |
| Comments | Endpoints for reading, posting, and deleting comments and emoji reactions on Figma files. | [comments.md](./comments.md) |
| Components & Styles | Endpoints for reading published components, component sets, and styles from team libraries. | [components.md](./components.md) |
| Dev Resources | Endpoints for reading and managing developer-contributed URLs attached to nodes in Figma Dev Mode. | [dev-resources.md](./dev-resources.md) |
| Developer Logs | Endpoint for searching granular API call logs across an organization. Enterprise + Governance+ plan required. | [developer-logs.md](./developer-logs.md) |
| Discovery | Endpoint for fetching text events that have occurred in Figma files across an organization. Enterprise + Governance+ plan required. | [discovery.md](./discovery.md) |
| Errors | Standard HTTP error codes returned by the Figma REST API. | [errors.md](./errors.md) |
| File Versions | Endpoint for retrieving the version history of a Figma file. | [file-versions.md](./file-versions.md) |
| Files | Endpoints for reading Figma file content, nodes, rendered images, image fills, and file metadata. | [files.md](./files.md) |
| Folders | Endpoints for listing team folders, subfolders, files within a folder, and lightweight folder metadata. | [folders.md](./folders.md) |
| Library Analytics | Endpoints for retrieving usage and action analytics for components, styles, and variables in a published library. Enterprise plan required. | [library-analytics.md](./library-analytics.md) |
| OAuth Apps | OAuth 2 flow for obtaining access tokens on behalf of users. Recommended method for production applications. | [oauth-apps.md](./oauth-apps.md) |
| oEmbed | Endpoint for generating embeddable rich previews of Figma files and published Makes. | [oembed.md](./oembed.md) |
| Payments | Endpoint for fetching payment information for users of plugins, widgets, and Community files. Personal access token only. | [payments.md](./payments.md) |
| Personal Access Tokens | Per-user API tokens that authenticate requests as the token owner. Suitable for individual scripts and personal tooling. | [personal-access-tokens.md](./personal-access-tokens.md) |
| Plan Access Tokens | Plan-scoped API tokens not tied to individual user accounts. Managed by plan administrators; suited for CI/CD and org-level automation. Generally available since 2026-07-23. | [plan-access-tokens.md](./plan-access-tokens.md) |
| Projects | Endpoints for listing team projects, files within a project, and lightweight project metadata. | [projects.md](./projects.md) |
| Rate Limits | Per-user, per-plan rate limits applied to all Figma REST API endpoints. Exceeding limits returns HTTP 429. | [rate-limits.md](./rate-limits.md) |
| SCIM API | SCIM v2 endpoints for provisioning and managing users and groups in a Figma organization. | [scim.md](./scim.md) |
| Scopes | Permission scopes that restrict what resources an OAuth 2 access token or personal access token can access. | [scopes.md](./scopes.md) |
| Users | Endpoint for reading the authenticated user's profile information via OAuth. | [users.md](./users.md) |
| Variables | Endpoints for reading and bulk-modifying variables and variable collections in Figma files. Enterprise plan required. | [variables.md](./variables.md) |
| Webhooks | Endpoints for creating, reading, updating, and deleting webhooks that fire on Figma events. | [webhooks.md](./webhooks.md) |
