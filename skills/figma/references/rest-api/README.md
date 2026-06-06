# REST API

| Name | Description | Path |
|------|-------------|------|
| Authentication | Overview of OAuth apps, plan access tokens, and personal access tokens | [authentication.md](./authentication.md) |
| OAuth Apps | OAuth 2 authorization code flow for user-delegated access | [oauth-apps.md](./oauth-apps.md) |
| Personal Access Tokens | Per-user tokens passed via `X-Figma-Token` header | [personal-access-tokens.md](./personal-access-tokens.md) |
| Plan Access Tokens | Org-scoped tokens for CI/CD and admin automation (beta) | [plan-access-tokens.md](./plan-access-tokens.md) |
| Scopes | Permission scopes restricting token access to specific resources | [scopes.md](./scopes.md) |
| Rate Limits | Per-tier rate limits, 429 headers, and retry best practices | [rate-limits.md](./rate-limits.md) |
| Errors | Standard HTTP error codes (400, 403, 404, 429, 500) | [errors.md](./errors.md) |
| Files | GET file, GET file nodes, GET images, image fills, file metadata | [files.md](./files.md) |
| File Versions | GET version history for a file | [file-versions.md](./file-versions.md) |
| Comments | CRUD for comments and emoji reactions on files | [comments.md](./comments.md) |
| Users | GET current authenticated user via OAuth (`/v1/me`) | [users.md](./users.md) |
| Projects | List team projects, project files, and project metadata | [projects.md](./projects.md) |
| Components & Styles | Published components, component sets, and styles from team libraries | [components.md](./components.md) |
| Variables | Read and bulk-modify variables in files (Enterprise) | [variables.md](./variables.md) |
| Dev Resources | CRUD for developer URLs attached to nodes in Dev Mode | [dev-resources.md](./dev-resources.md) |
| Webhooks | Create and manage event-driven webhooks on teams, projects, files | [webhooks.md](./webhooks.md) |
| Activity Logs | Organization-level activity log events (Enterprise, OAuth required) | [activity-logs.md](./activity-logs.md) |
| Developer Logs | Granular API call logs (Enterprise + Governance+, plan token only) | [developer-logs.md](./developer-logs.md) |
| Discovery | Text events from org files (Enterprise + Governance+) | [discovery.md](./discovery.md) |
| Library Analytics | Component, style, and variable usage analytics (Enterprise) | [library-analytics.md](./library-analytics.md) |
| Payments | Payment information for plugins, widgets, and Community files | [payments.md](./payments.md) |
| oEmbed | Rich embed previews for Figma files and published Makes | [oembed.md](./oembed.md) |
| SCIM API | SCIM v2 user and group provisioning for organizations | [scim.md](./scim.md) |
