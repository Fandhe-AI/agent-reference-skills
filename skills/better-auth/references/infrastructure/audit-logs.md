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
| User | `user_signed_up`, `user_profile_updated`, `user_profile_image_updated`, `user_email_verified`, `user_banned`, `user_unbanned`, `user_deleted` |
| Session | `user_signed_in`, `user_signed_out`, `session_created`, `session_revoked`, `sessions_revoked_all`, `user_impersonated`, `user_impersonation_stopped` |
| Account | `account_linked`, `account_unlinked`, `password_changed` |
| Verification | `password_reset_requested`, `password_reset_completed`, `email_verification_sent` |
| Organization (organization plugin) | `organization_created`, `organization_updated`, `member_added`, `member_removed`, `member_role_updated`, `member_invited`, `invite_accepted`, `invite_rejected`, `invite_cancelled`, `team_created`, `team_updated`, `team_deleted`, `team_member_added`, `team_member_removed` |
| Security (Sentinel plugin) | `security_blocked`, `security_allowed`, `security_credential_stuffing`, `security_impossible_travel`, `security_geo_blocked`, `security_bot_blocked`, `security_suspicious_ip`, `security_velocity_exceeded`, `security_free_trial_abuse`, `security_compromised_password`, `security_stale_account` |

## Notes

- No manual instrumentation is needed; the `dash()` plugin hooks into the Better Auth instance.
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
- Source: https://www.better-auth.com/docs/infrastructure/plugins/audit-logs (better-auth v1.7.10 docs)

## Related

- [Dashboard Plugin (dash)](./dashboard.md)
- [Sentinel](./sentinel.md)
