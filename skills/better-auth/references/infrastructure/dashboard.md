# Dashboard Plugin (dash)

The `dash()` plugin connects your Better Auth instance to Better Auth Infrastructure, enabling analytics tracking, activity monitoring, event logging, and admin dashboard APIs.

## Signature / Usage

```ts
import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";

export const auth = betterAuth({
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
      activityTracking: {
        enabled: true,
        updateInterval: 300000,  // Update interval in ms (default: 5 minutes)
      },
    }),
  ],
});
```

Client:

```ts
import { createAuthClient } from "better-auth/client";
import { dashClient } from "@better-auth/infra/client";

export const authClient = createAuthClient({
  plugins: [
    dashClient({
      resolveUserId: ({ userId, user, session }) => {
        return userId || user?.id || session?.user?.id;
      },
    }),
  ],
});
```

## Options / Props

`DashOptions`:

| Name | Type | Description |
| --- | --- | --- |
| apiUrl | string | API URL. Default: `https://dash.better-auth.com` |
| kvUrl | string | KV store URL. Default: `https://kv.better-auth.com` |
| apiKey | string | API key. Falls back to `BETTER_AUTH_API_KEY` in env. |
| apiOptions | object | `timeout?: number` (ms, default `3000`), `headers?: Record<string, string>` |
| kvOptions | object | `timeout?: number` (ms, default `1000`), `retry?: { attempts?; baseDelay?; maxDelay? }` (defaults `2` / `400` / `600`), `headers?` |
| apiTimeout | number | Deprecated alias for `apiOptions.timeout`. |
| kvTimeout | number | Deprecated alias for `kvOptions.timeout`. |
| activityTracking | object | Activity tracking configuration (`enabled`, `updateInterval`). |
| managedDirectorySync | object | Managed directory-sync control-plane options. |

`managedDirectorySync`:

| Name | Type | Description |
| --- | --- | --- |
| enabled | boolean | Enables the managed directory-sync control plane and SCIM reservation tables / APIs. Default: `false`. |
| ssoPairing | boolean | Installs SSO `resolveUser` and provider-mutation hooks for paired directories. Default: `true`. |
| membershipProjection | object | Enables SCIM-to-organization membership projection. |
| membershipProjection.enabled | boolean | Enables the projection hook. Default: `true`. |
| membershipProjection.role | string | Role assigned to projected memberships. Default: `"member"`. |

```ts
dash({
  apiKey: process.env.BETTER_AUTH_API_KEY,
  managedDirectorySync: {
    enabled: true,
    ssoPairing: true,
    membershipProjection: { enabled: true, role: "member" },
  },
})
```

Dashboard endpoints registered by the plugin (method path):

| Group | Endpoints |
| --- | --- |
| Users | GET `/dash/users`, GET `/dash/users/online-count`, GET/POST/PATCH/DELETE `/dash/user`, POST `/dash/user/ban`, `/dash/user/unban`, `/dash/user/password`, `/dash/user/impersonate` |
| Sessions | GET/DELETE `/dash/sessions`, POST `/dash/session/revoke`, POST `/dash/sessions/revoke-all` |
| Organizations | GET `/dash/organizations`, GET/POST/PATCH/DELETE `/dash/organization`, GET `/dash/organization/members`, POST/DELETE `/dash/organization/member`, PATCH `/dash/organization/member/role` |
| Teams | GET `/dash/organization/teams`, POST/PATCH/DELETE `/dash/organization/team`, POST/DELETE `/dash/organization/team/member` |
| Invitations | GET `/dash/organization/invitations`, POST `/dash/organization/invite`, `/invite/cancel`, `/invite/resend` |
| SSO | GET `/dash/organization/sso-providers`, POST/PATCH/DELETE `/dash/organization/sso-provider`, POST `/dash/organization/sso-provider/verify-domain` |
| Directory sync | GET `/dash/organization/directories`, POST/DELETE `/dash/organization/directory`, POST `/dash/organization/directory/token` |
| Log drains | GET `/dash/organization/log-drains`, POST/PATCH/DELETE `/dash/organization/log-drain`, POST `/dash/organization/log-drain/test` |
| Events | GET `/events/list`, `/events/audit-logs`, `/events/types` |
| Analytics | GET `/dash/stats`, `/dash/graph`, `/dash/retention`, `/dash/map` |
| Two-factor | POST `/dash/user/2fa/enable`, `/dash/user/2fa/disable`; GET `/dash/user/2fa/totp-uri`, `/dash/user/2fa/backup-codes`; POST `/dash/user/2fa/backup-codes/generate` |

## Notes

- Activity tracking adds a `lastActiveAt` (`date`) field to the user schema and requires a migration: run `npx auth migrate` (or `npx auth generate` and apply the migration with your preferred tool).
- `managedDirectorySync` is the dashboard-side companion to the SCIM 1.7 plugin-managed runtime flow (`scim({ managedConnections })`). It adds the models `directorySyncConnection` and `directorySyncMembershipProvenance` and requires migrations (`npx auth migrate`).
- The dash plugin automatically tracks user, session, account, verification, and (with the organization plugin) organization events; see Audit Logs for the full event list.
- Best practices: always set an API key; use a longer `updateInterval` for high-traffic apps; check audit log retention for your plan; secure dashboard endpoints with appropriate permissions.
- On Expo / React Native import `dashClient` from `@better-auth/infra/native` (same API).
- Source: https://www.better-auth.com/docs/infrastructure/plugins/dashboard (better-auth v1.7.10 docs)

## Related

- [Audit Logs](./audit-logs.md)
- [Sentinel](./sentinel.md)
- [Getting Started](./getting-started.md)
