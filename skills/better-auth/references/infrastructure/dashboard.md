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
| membershipProjection.role | string | Role assigned when projection **creates** a membership. Default: `"member"`. |
| fieldProjection | object | Opt-in SCIM-to-custom-field projection. |
| fieldProjection.enabled | boolean | Adds field-mapping schema and projects fields on SCIM reconcile. Default: `false`. |

Compatibility (`@better-auth/infra` requires Better Auth 1.4 or later; actively supported releases start at 0.3):

| `@better-auth/infra` | Better Auth 1.4 | 1.5 | 1.6 | 1.7 |
| --- | --- | --- | --- | --- |
| 0.3.x | ✓ | ✓ | ✓ | ✓ |
| 0.4.x | ✓ | ✓ | ✓ | ✓ |

Enable managed directory sync (requires the organization, SCIM, and `dash` plugins; SCIM must use `managedConnections`):

```ts
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { sso } from "@better-auth/sso";
import { scim } from "@better-auth/scim";
import { dash } from "@better-auth/infra";

export const auth = betterAuth({
  plugins: [
    organization(),
    sso({}),
    scim({
      connections: [],
      managedConnections: {
        credentialHashSecret: process.env.SCIM_CREDENTIAL_HASH_SECRET!,
      },
    }),
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
      managedDirectorySync: {
        enabled: true,
      },
    }),
  ],
});
```

Membership projection (enabled by default when managed directory sync is on):

```ts
dash({
  apiKey: process.env.BETTER_AUTH_API_KEY,
  managedDirectorySync: {
    enabled: true,
    membershipProjection: {
      enabled: true,
      role: "member", // role only when projection creates the membership
    },
  },
})
```

Turn it off only when SCIM should provision users without touching organization membership:

```ts
membershipProjection: {
  enabled: false,
}
```

SSO pairing (enabled by default; `ssoPairing: false` when you only need provisioning and never create paired directories):

```ts
plugins: [
  sso({}),
  dash({
    apiKey: process.env.BETTER_AUTH_API_KEY,
    managedDirectorySync: {
      enabled: true,
      ssoPairing: true,
    },
  }),
]
```

Field projection (opt-in; declare the fields, migrate, then map SCIM paths to target fields per directory in the Infrastructure dashboard):

```ts
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { scim } from "@better-auth/scim";
import { dash } from "@better-auth/infra";

export const auth = betterAuth({
  user: {
    additionalFields: {
      employeeId: { type: "string", required: false },
      department: { type: "string", required: false },
    },
  },
  plugins: [
    organization({
      schema: {
        member: {
          additionalFields: {
            title: { type: "string", required: false },
            costCenter: { type: "string", required: false },
          },
        },
      },
    }),
    scim({
      connections: [],
      managedConnections: {
        credentialHashSecret: process.env.SCIM_CREDENTIAL_HASH_SECRET!,
      },
    }),
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
      managedDirectorySync: {
        enabled: true,
        fieldProjection: {
          enabled: true,
        },
      },
    }),
  ],
});
```

Projectable fields:

| Entity | Projectable targets | Not projectable |
| --- | --- | --- |
| `user` | Writable `user.additionalFields`, plus allowlisted core field `image` | Identity fields managed by SCIM (`email`, `name`); sensitive keys (`role`, `password`, ban fields, 2FA secrets); `input: false` or reference fields |
| `member` | Writable `organization.schema.member.additionalFields` only | Membership-owned keys (`role`, user/org ids). Member maps require membership projection (default on) |

SCIM User attribute catalog for mappings: `userName`, `primaryEmail` / `emails.primary`, `displayName`, `externalId`, `name.formatted` / `name.givenName` / `name.familyName`, `title`, `userType`, `preferredLanguage` / `locale` / `timezone`, `photos.primary` (often mapped to `user.image`), `enterprise.employeeNumber`, `enterprise.costCenter` / `enterprise.organization` / `enterprise.division` / `enterprise.department`. Values are resolved as strings from the persisted SCIM user row, then coerced to the Better Auth field type (`string`, `number`, `boolean`, or `date`).

Projection modes (stored per connection and entity `user` / `member`; default `create-only`):

| Mode | Behavior |
| --- | --- |
| `create-only` | Fills empty targets (and values that still match a static schema default) on first provision. Once every productive mapped target is set, projection freezes for that row so later operator edits are preserved. Delayed SCIM attributes can still land until freeze. |
| `reconcile` | Rewrites mapped fields on every SCIM reconcile while the directory owns the profile / membership. Use when the IdP should remain the source of truth for those fields. |

Database models added when `managedDirectorySync.enabled` is `true` (Better Auth supplies the primary `id`):

| Model | Installed | Purpose |
| --- | --- | --- |
| `directorySyncConnection` | always | Managed directory's organization, SCIM connection, SSO pairing, lifecycle, and decommission state |
| `directorySyncMembershipProvenance` | always | Organization memberships created or managed by membership projection; `ownership` is `created` or `observed` |
| `directorySyncFieldMapping` | `fieldProjection.enabled` | Per-connection mapping from SCIM attributes (and/or static defaults) onto Better Auth fields (`entity`, `targetField`, `scimSource`, `scimPath`, `defaultValue`, `enabled`) |
| `directorySyncFieldProjectionMode` | `fieldProjection.enabled` | Per-connection, per-entity write cadence (`create-only` or `reconcile`) |
| `directorySyncFieldProvenance` | `fieldProjection.enabled` | Marks that create-only fields were applied for a provisioning domain + entity + target row |

Dashboard endpoints registered by the plugin (method path):

| Group | Endpoints |
| --- | --- |
| Config | GET `/dash/config`, `/dash/validate` |
| Users | GET `/dash/list-users`, `/dash/export-users`, `/dash/user`, `/dash/user-organizations`; POST `/dash/create-user`, `/dash/update-user`, `/dash/delete-user`, `/dash/delete-many-users`, `/dash/ban-user`, `/dash/ban-many-users`, `/dash/unban-user`, `/dash/set-user-role`, `/dash/set-password`, `/dash/unlink-account`, `/dash/send-verification-email`, `/dash/send-many-verification-emails`, `/dash/send-reset-password-email`; GET `/dash/impersonate-user` |
| Sessions | POST `/dash/sessions/revoke`, `/dash/sessions/revoke-all`, `/dash/sessions/revoke-many` |
| Organizations | GET `/dash/list-organizations`, `/dash/export-organizations`, `/dash/organization/options`, `/dash/organization/:id`, `/dash/organization/:id/members`; POST `/dash/organization/create`, `/update`, `/delete`, `/delete-many`, `/add-member`, `/remove-member`, `/update-member-role`, `/update-member` (all under `/dash/organization`) |
| Teams | GET `/dash/organization/:id/teams`, `/dash/organization/:orgId/teams/:teamId/members`; POST `/dash/organization/create-team`, `/update-team`, `/delete-team`, `/add-team-member`, `/remove-team-member` |
| Invitations | GET `/dash/organization/:id/invitations`, `/dash/accept-invitation`, `/dash/complete-invitation-handoff`, `/dash/complete-invitation-social`; POST `/dash/organization/invite-member`, `/cancel-invitation`, `/resend-invitation`, `/check-user-by-email`, `/dash/complete-invitation`, `/dash/check-user-exists` |
| SSO | GET `/dash/sso/connection-count`, `/dash/organization/:id/sso-providers`; POST `/dash/organization/:id/sso-provider/create`, `/update`, `/delete`, `/request-verification-token`, `/verify-domain`, `/mark-domain-verified` |
| Directory sync | GET `/dash/directory-sync/connection-count`, `/dash/organization/:id/directories`, `/dash/organization/:id/directories/:providerId`, `.../events`, `.../field-mappings`, `/dash/organization/:id/directory-field-mapping-options`; POST `/dash/organization/:id/directories` (create managed), `.../credentials/rotate`, `.../credentials/:credentialId/revoke`, `.../decommission`, `.../unpair`; PUT `.../field-mappings`; legacy POST `/dash/organization/directory/create`, `/delete`, `/regenerate-token` |
| Events | GET `/events/list`, `/events/audit-logs`, `/events/all-audit-logs`, `/events/types` |
| Analytics | GET `/dash/user-stats`, `/dash/user-graph-data`, `/dash/user-retention-data` |
| Two-factor | POST `/dash/enable-two-factor`, `/dash/complete-two-factor-setup`, `/dash/disable-two-factor`, `/dash/view-two-factor-totp-uri`, `/dash/view-backup-codes`, `/dash/generate-backup-codes` |

## Notes

- Activity tracking adds a `lastActiveAt` (`date`) field to the user schema and requires a migration: run `npx auth@latest migrate` (or `npx auth@latest generate` and apply the migration with your preferred tool).
- `managedDirectorySync` is the dashboard-side companion to the SCIM 1.7 plugin-managed connections (`scim({ managedConnections })`). SCIM 1.7 supports three connection modes (static code-defined, application-owned runtime verification, plugin-managed via `managedConnections`); managed directory sync is built for the third. `scim({ managedConnections })` owns the SCIM protocol, credential catalog, and user/group provisioning; `dash({ managedDirectorySync })` owns the per-organization connection lifecycle, dashboard APIs, and projection into your app. Managed directory sync requires `@better-auth/infra` 0.4.x.
- Enabling `managedDirectorySync` adds reservation tables and requires a migration (`npx auth@latest migrate`, or `npx auth@latest generate` and apply it with your preferred tool) before creating directories from the dashboard. Field projection adds its own tables: enable it, migrate, then configure mappings.
- Membership projection reconciles SCIM-provisioned users into the owning organization: active directory users are added (or linked if already members), deactivated users have directory-owned memberships removed, and projection only mutates memberships it owns (provenance `created` vs `observed`). Only directory-created memberships (`ownership: "created"`) receive member field projection. Paired SSO sign-in resolves the Better Auth user from the SCIM external id configured on the directory.
- Changed in the 1.7.23 docs: event names changed (user events `user_created` / `profile_updated` / `profile_image_updated` / `email_verified`; session `all_sessions_revoked` / `user_impersonated_stopped`; organization events are prefixed `organization_`); the dashboard endpoint paths above were renamed; the Log drains endpoint group no longer appears.
- The dash plugin automatically tracks user, session, account, verification, and (with the organization plugin) organization events; see Audit Logs for the full event list.
- Best practices: always set an API key; use a longer `updateInterval` for high-traffic apps; check audit log retention for your plan; secure dashboard endpoints with appropriate permissions.
- On Expo / React Native import `dashClient` from `@better-auth/infra/native` (same API).
- Source: https://www.better-auth.com/docs/infrastructure/plugins/dashboard (better-auth v1.7.23 docs)

## Related

- [Audit Logs](./audit-logs.md)
- [Sentinel](./sentinel.md)
- [Getting Started](./getting-started.md)
