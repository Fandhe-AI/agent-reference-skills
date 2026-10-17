# SCIM

The SCIM plugin adds an inbound System for Cross-domain Identity Management (SCIM) 2.0 service to Better Auth. A directory can use it to create, update, deactivate, and delete users and groups in your application. SCIM defines identity resources in RFC 7643 and the HTTP protocol in RFC 7644.

Each SCIM User links to a Better Auth User. Provisioning does not create a sign-in method or grant application access. Configure authentication separately, and use the optional identity and role callbacks when SCIM should affect your application.

## Signature / Usage

### Installation

```bash
npm install @better-auth/scim
```

### Enable database transactions

SCIM resource requests require a database adapter with native interactive transaction support (Kysely `transaction: true`, Drizzle `transaction: true`, Prisma `transaction: true`). Cloudflare D1 does not support the interactive transactions required.

```typescript
const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", transaction: true }),
});
```

### Configure a connection

Create a high-entropy bearer token in your secret manager and configure the same value in Better Auth and your directory.

```typescript
import { scim } from "@better-auth/scim";
import { betterAuth } from "better-auth";

const workforceToken = process.env.SCIM_WORKFORCE_TOKEN;
if (!workforceToken) throw new Error("SCIM_WORKFORCE_TOKEN is required");

export const auth = betterAuth({
  baseURL: "https://app.example.com/api/auth",
  plugins: [
    scim({
      connections: [
        {
          id: "workforce-acme",
          provisioningDomainId: "workspace-acme",
          credentials: [{ type: "bearer", id: "workforce-primary", token: workforceToken }],
        },
      ],
    }),
  ],
});
```

The connection ID owns the resources provisioned with this credential. The optional `provisioningDomainId` identifies the workspace, tenant, project, or other application boundary that receives lifecycle and role updates (defaults to the connection ID). For runtime tenant onboarding and credential rotation, configure the optional `managedConnections` catalog (see scim-reference.md). Applications with an existing catalog can resolve the connection atomically in `authentication.verifyBearerToken`.

### Expose the SCIM methods

The Better Auth route must forward `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST, PUT, PATCH, DELETE } = toNextJsHandler(auth);
```

```bash
npx auth migrate
# or
npx auth generate
```

### Configure your directory

| Setting | Value |
| --- | --- |
| Base URL | Your Better Auth base URL followed by `/scim/v2`, such as `https://app.example.com/api/auth/scim/v2` |
| Authentication | Bearer token |
| Token | A static token from `connections[].credentials` or the one-time token returned by a managed create or rotate call |

The directory sends `Authorization: Bearer <token>`. User and Group requests use `application/scim+json` or `application/json`. Discovery endpoints are public.

### How provisioning maps to your application

- A connection owns an isolated set of SCIM Users, Groups, and direct Group memberships.
- A SCIM User links to one Better Auth User.
- A provisioning domain identifies where your application applies lifecycle and access changes.
- A SCIM Group grants no application permission unless you configure a role projection.

Several connections can be configured; credentials remain isolated while multiple connections may contribute to the same provisioning domain.

### Provision users

When a directory creates a SCIM User, Better Auth creates a User by default, or links one when `identity.resolveUser` returns `link`. A SCIM User does not create an authentication account, so the user still needs SSO, a passkey, credentials, or another sign-in method. By default the SCIM source manages the Better Auth User's email and name. The plugin never links an incoming resource to an existing user by email.

```typescript
scim({
  connections,
  identity: {
    async resolveUser(input, { database }) {
      const userId = input.resource.externalId
        ? await findUserIdByDirectorySubject(database, input.connectionId, input.resource.externalId)
        : undefined;
      return userId ? { action: "link", userId, profile: "preserve" } : { action: "create" };
    },
  },
});
```

| Result | Behavior |
| --- | --- |
| `{ action: "create" }` | Creates a Better Auth User; the SCIM source manages its email and name |
| `{ action: "link", userId, profile: "manage" }` | Links an existing User; this source manages its email and name |
| `{ action: "link", userId, profile: "preserve" }` | Links an existing User without changing its Better Auth email or name |

Only one source can manage a Better Auth User's profile. Prefer a directory-owned immutable `externalId` as the link key; never an unverified email.

### Authenticate provisioned users with SSO

Use `acquireActiveSCIMUserLink` inside the SSO plugin's `resolveUser` callback when one SCIM connection controls who can sign in through a paired OIDC provider. It finds an active SCIM User by exact connection ID and `externalId`, returning `{ scimUserId, userId }`, or `null` for missing, inactive, deleted, tombstoned, orphaned, or decommissioned links.

```typescript
import { acquireActiveSCIMUserLink, scim } from "@better-auth/scim";
import { sso } from "@better-auth/sso";

sso({
  async resolveUser(input, context) {
    if (input.providerId !== workforceProviderId) return { action: "continue" };
    const link = await acquireActiveSCIMUserLink(
      { connectionId: workforceConnectionId, externalId: input.accountKey.accountId },
      context,
    );
    return link
      ? { action: "link", userId: link.userId, profile: "preserve" }
      : { action: "reject", code: "SCIM_USER_NOT_ACTIVE" };
  },
})
```

Configure the directory to send the OIDC provider's immutable, case-exact subject as the SCIM User's `externalId`. The helper never falls back to `userName`, email, another connection, or a tombstone. A lifecycle conflict during SSO aborts the attempt with `SSO_USER_RESOLUTION_FAILED` (no Account or Session is created); the user must start a fresh SSO attempt.

### Handle activation and deletion

`identity.reconcileUser` applies the combined SCIM lifecycle state. It receives every source linked to the Better Auth User and an `active` value that is `true` while at least one source remains active.

```typescript
scim({
  connections,
  identity: {
    async reconcileUser(state, { database }) {
      await setDirectoryAccessState(database, state.userId, state.active);
    },
  },
});
```

The callback runs in the same database transaction as the SCIM change; make it idempotent and write through the supplied `database`. Throwing rejects the request and rolls back the SCIM change. When the final active source is deactivated or deleted, the User's sessions are deleted; reactivation does not create a session. Deleting sessions does not block sign-in again, so persist the disabled state and enforce it in your authentication or authorization policy.

If a directory re-creates a user with the same `externalId` through the same connection, the existing Better Auth User is kept: an inactive SCIM User is reprovisioned (same SCIM ID, submitted profile and `active`, response `201`); a deleted one gets a new SCIM resource linked to the same User. `identity.resolveUser` is not called in either case. Reusing an active SCIM User's `externalId`, or another SCIM User's `userName`, still returns `409`. Better Auth never reprovisions by `userName` or email.

## Notes

- Changed in 1.7: SCIM supports three connection modes. Every request resolves an immutable connection ID, credential identity, scopes, and provisioning domain; the plugin no longer depends on the Organization or SSO plugins. Modes: static code-defined (`scim({ connections })`), application-owned runtime (`authentication.verifyBearerToken`), plugin-managed runtime (`managedConnections` plus trusted server APIs).
- Removed in 1.7: the legacy runtime connection-management endpoints, the SCIM client plugin, CLI scaffolding, `defaultSCIM`, `staticProviders`, `trustedDomains`, `providerOwnership`, and organization-scoped provider configuration. The 1.6 token-generation flow (`generateToken`, provider-connection endpoints, `storeSCIMToken`, token hooks) is not documented in the 1.7 page. Provisioned identities no longer create authentication accounts; use `identity` callbacks to link Users and apply lifecycle state, and `projection` callbacks to map Groups to roles.
- Changed in 1.7 (full reprovisioning required): the new SCIM models do not read or convert the 1.6 SCIM tables. Seven provisioning models (`scimConnectionBinding`, `scimIdentityTombstone`, `scimSubject`, `scimUser`, `scimGroup`, `scimGroupMember`, `scimProjectionGrant`) plus three optional managed-catalog models (`scimManagedConnection`, `scimManagedCredential`, `scimManagedConnectionEvent`) replace the legacy `scimProvider` model. Use a maintenance window: pause provisioning, stop every instance running the old plugin, back up legacy SCIM tables, inventory SCIM-created `account` / `user` rows, clear and then drop or rename incompatible legacy tables, enable native interactive transactions, apply the 1.7 schema, deploy the selected mode, and trigger a complete User and Group provisioning cycle before resuming. Never import a legacy token hash or accept the legacy bearer syntax. Retained legacy Users cause `409 Conflict` during reprovisioning unless `identity.resolveUser` returns an explicit link decision.
- Groups, custom roles, and role projection are in scim-groups-and-roles.md; options, endpoints, attributes, filters, PATCH paths, limits, and schema are in scim-reference.md.

## Related

- [scim-groups-and-roles.md](./scim-groups-and-roles.md)
- [scim-reference.md](./scim-reference.md)
- [sso.md](./sso.md)
