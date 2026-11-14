# Teams

Enterprise endpoints for reading team metadata, creating teams, and inviting team members. Added 2026-10-22.

## Signature / Usage

Adapted (not in the official docs): request example assembled from the endpoint's body parameters; the `<access_token>` placeholder is a private OAuth app token for an Enterprise plan.

```http
POST /v1/teams
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Design Systems",
  "sharing_audience_control": "invite_only",
  "org_discoverability": "hidden"
}
```

## Options / Props

### GET team

`GET /v1/teams/:team_id` — Returns metadata for a team the caller can access. Private OAuth apps can use this endpoint for Professional, Organization, and Enterprise plans. Plan access tokens can use it for Organization and Enterprise plans.

| Parameter | Type | Description |
|-----------|------|-------------|
| `team_id` | String (path) | The ID of the team |

**Scope:** `teams:read` | **Rate Limit:** Tier 2 | **Returns:** a Team

**Error Codes:** 401 (access token missing or incorrect), 403 (no permission to access the team), 429 (rate-limited), 500

---

### POST team

`POST /v1/teams` — Creates a team in the Enterprise plan associated with a private OAuth app. The app uses the authenticated user's permissions, and that user becomes the team owner. The request is subject to the same team-creation controls and permissions as team creation in Figma.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | String (body) | The name of the team |
| `description` | String (body) | Optional. A description of the team |
| `sharing_audience_control` | String (body) | The audience that can discover and join the team: `org_view`, `org_edit`, `invite_only`, `workspace_view`, or `workspace_edit` |
| `org_discoverability` | String (body) | Required when `sharing_audience_control` is `invite_only` and omitted otherwise. Must be `hidden` or `discoverable` |
| `workspace_id` | String (body) | Optional. The destination workspace. Required for `workspace_view` and `workspace_edit` |

**Scope:** `teams:write` | **Rate Limit:** Tier 2 | **Returns:** the created Team. Available only to private OAuth apps associated with an Enterprise plan.

**Error Codes:** 400 (invalid parameters), 401, 403 (no permission to create the team), 429, 500

---

### POST team invites

`POST /v1/teams/:team_id/invites` — Invites people to a team in the Enterprise plan associated with a private OAuth app. The team must belong to that plan, and the authenticated user must be allowed to grant the requested role. Each email address is processed independently. Per-address failures are returned in the `errors` array with a 200 response, even if `invites` is empty; always inspect `errors`. Existing team members keep their current role when it is higher than the requested role.

| Parameter | Type | Description |
|-----------|------|-------------|
| `team_id` | String (path) | The ID of the team to invite people to |
| `emails` | String[] (body) | Between 1 and 99 email addresses to invite |
| `role` | String (body) | The role to grant each invited member: `viewer`, `editor`, or `admin`. Existing roles are never downgraded |

**Scope:** `team_members:write` | **Rate Limit:** Tier 2. Available only to private OAuth apps associated with an Enterprise plan.

**Return value:** the normalized email addresses that were invited and any policy errors for individual addresses. An invitation can still require approval from an organization admin before the user joins the team.

```json
{
  "invites": [{ "email": String, "role": String }],
  "errors": [{ "email": String, "error": String }]
}
```

**Error Codes:** 400 (invalid body, role, email address, or count), 401, 403, 404 (team not found, or endpoint not enabled), 413 (body too large), 429, 500

### Team type

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | The unique identifier of the team |
| `name` | String | The name of the team |
| `description` | String | A description of the team, or null |
| `sharing_audience_control` | String | `org_view`, `org_edit`, `invite_only`, `workspace_view`, or `workspace_edit` |
| `org_discoverability` | String | `hidden` or `discoverable` for an invite-only team; null for other sharing audiences |
| `workspace_id` | String | The ID of the workspace containing the team, or null |
| `owner_user_id` | String | The ID of the user who owns the team, or null |
| `created_at` | String | The UTC ISO 8601 timestamp at which the team was created |

## Notes

- To find an existing team ID, see the note in [Folders](./folders.md) on reading it from the team page URL.
- The write endpoints (`POST /v1/teams`, `POST /v1/teams/:team_id/invites`) and the related folder / file-duplicate endpoints are limited to private OAuth apps associated with an Enterprise plan; they need the `teams:write`, `team_members:write`, `folders:write`, and `file_duplicate:write` scopes (see [Scopes](./scopes.md)).
- The example in Signature / Usage is an adaptation (see the `Adapted` line); the official page documents parameters only.
- Source: https://developers.figma.com/docs/rest-api/teams-endpoints/ (fetched 2026-11-14)
- Source: https://developers.figma.com/docs/rest-api/teams-types/ (fetched 2026-11-14)
- Source: https://developers.figma.com/docs/rest-api/changelog/ (October 22, 2026 entry, fetched 2026-11-14)

## Related

- [Folders](./folders.md)
- [Files](./files.md)
- [Scopes](./scopes.md)
- [OAuth Apps](./oauth-apps.md)
- [Rate Limits](./rate-limits.md)
