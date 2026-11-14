# Audit Logs

Authentication events are collected automatically once `dash()` is active, and can be queried through `dashClient()`.

## Signature / Usage

```ts
import { createAuthClient } from "better-auth/client";
import { dashClient } from "@better-auth/infra/client";

export const authClient = createAuthClient({
  plugins: [dashClient()],
});

const session = await authClient.getSession();

const logs = await authClient.dash.getAuditLogs({
  session: session.data,
  limit: 50,
  offset: 0,
});

logs.data?.events;  // Array of audit log events
logs.data?.total;   // Total count
logs.data?.limit;   // Page size
logs.data?.offset;  // Current offset
```

`authClient.dash.getAllAuditLogs({ session, organizationId, userId, eventType, ... })` returns events for organizations where the caller is admin or owner.

## Options / Props

`getAuditLogs` parameters (current user):

| Name | Type | Description |
| --- | --- | --- |
| limit | number | Results per page (max 100, default 50) |
| offset | number | Pagination offset (default 0) |
| organizationId | string | Filter by organization |
| identifier | string | Filter by identifier |
| eventType | string | Filter by event type |
| userId | string | Filter by user ID |
| user | object | User object with ID |
| session | object | Session object with user |

`getAllAuditLogs` parameters:

| Name | Type | Description |
| --- | --- | --- |
| limit | number | Results per page (max 100, default 50) |
| offset | number | Pagination offset (default 0) |
| organizationId | string | Limit results to one organization (you must be owner or admin) |
| userId | string | Limit to one user's activity across organizations you administer as owner or admin |
| eventType | string | Filter by event type |
| identifier | string | Match `eventData.identifier` (organization-scoped actor identity) |
| session | object | Session object with user |

Tracked events:

| Group | Events |
| --- | --- |
| User | `user_created`, `profile_updated`, `profile_image_updated`, `email_verified`, `email_changed`, `user_banned`, `user_unbanned`, `user_role_updated`, `user_deleted`, `anonymous_user_converted`, `two_factor_enabled`, `two_factor_disabled`, `two_factor_verified` |
| Session | `user_signed_in`, `user_signed_out`, `user_sign_in_failed`, `session_created`, `session_revoked`, `all_sessions_revoked`, `user_impersonated`, `user_impersonated_stopped` |
| Account | `account_linked`, `account_unlinked`, `password_changed` |
| Verification | `password_reset_requested`, `password_reset_completed`, `email_verification_sent` |
| Organization (organization plugin) | `organization_created`, `organization_updated`, `organization_deleted`, `organization_member_added`, `organization_member_removed`, `organization_member_role_updated`, `organization_member_invited`, `organization_member_invite_accepted`, `organization_member_invite_rejected`, `organization_member_invite_canceled`, `organization_team_created`, `organization_team_updated`, `organization_team_deleted`, `organization_team_member_added`, `organization_team_member_removed` |
| Security (Sentinel plugin) | `security_check`, `security_signal` |

## Notes

- No manual instrumentation is needed; the `dash()` plugin hooks into the Better Auth instance.
- Event names changed in the 1.7.23 docs: organization events are prefixed `organization_` (e.g. filter with `eventType: "organization_member_invited"`, formerly `member_invited`), and the Sentinel security events are consolidated into `security_check` (one event per protected user action; `eventData.outcome` is `passed`, `challenged`, or `blocked`; includes `evaluatedChecks`, `triggeredBy`, and `reason`) and `security_signal` (informational detection detail for the Security dashboard; does not count toward security usage).
- An identifier is a unique value for an event, for example an email address or username.
- `getAllAuditLogs` requires the organization plugin so membership roles can be evaluated.
- Pagination example: loop with `limit` / `offset` until `events.length < limit`.

```ts
// `authClient` is the client created in Signature / Usage above
async function fetchAllAuditLogs() {
  const session = await authClient.getSession();
  const limit = 100;
  let offset = 0;
  const allEvents = [];

  while (true) {
    const result = await authClient.dash.getAllAuditLogs({
      session: session.data,
      limit,
      offset,
    });

    const events = result.data?.events ?? [];
    allEvents.push(...events);

    if (events.length < limit) break;
    offset += limit;
  }

  return allEvents;
}
```
- Source: https://www.better-auth.com/docs/infrastructure/plugins/audit-logs (better-auth v1.7.23 docs)

## Related

- [Dashboard Plugin (dash)](./dashboard.md)
- [Sentinel](./sentinel.md)
