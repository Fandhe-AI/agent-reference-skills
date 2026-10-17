# SCIM Reference

SCIM options, endpoints, resource behavior, and database schema for `@better-auth/scim`.

## Signature / Usage

Bearer verification via an application-owned verifier (the plugin does not issue tokens or run an OAuth token endpoint):

```ts
scim({
  connections: [{ id: "workforce-acme", credentials: [] }],
  authentication: {
    async verifyBearerToken({ token }) {
      const claims = await verifyDirectoryAccessToken(token);
      if (!claims) return null;

      return {
        connectionId: "workforce-acme",
        credentialId: claims.clientId,
        scopes: claims.scopes,
        expiresAt: claims.expiresAt,
      };
    },
  },
});
```

Application-resolved connection (empty `connections`, verifier returns `connection`):

```ts
scim({
  connections: [],
  authentication: {
    async verifyBearerToken({ token }, { database }) {
      const credential = await database.findOne<EnterpriseSCIMCredentialRecord>({
        model: "enterpriseSCIMCredential",
        where: [{ field: "tokenHash", value: await hashSCIMToken(token) }],
      });
      if (
        !credential ||
        credential.revokedAt ||
        credential.expiresAt <= new Date()
      ) {
        return null;
      }

      await database.update({
        model: "enterpriseSCIMCredential",
        where: [{ field: "id", value: credential.id }],
        update: { lastAuthenticatedAt: new Date() },
      });
      return {
        connection: {
          id: credential.connectionId,
          provisioningDomainId: credential.provisioningDomainId,
        },
        credentialId: credential.id,
        scopes: credential.scopes,
        expiresAt: credential.expiresAt,
      };
    },
  },
});
```

Managed connection catalog:

```ts
scim({
  connections: [],
  managedConnections: {
    credentialHashSecret: process.env.SCIM_CREDENTIAL_HASH_SECRET!,
    maxActiveCredentials: 5,
    lastUsedWriteIntervalSeconds: 300,
  },
});

// Authenticate the caller and prove that they can manage this tenant first.
await requireOrganizationSCIMAdmin(session.user.id, organizationId);

const created = await auth.api.createSCIMManagedConnection({
  body: {
    creationRequestId: crypto.randomUUID(),
    provisioningDomainId: organizationId,
    actorId: session.user.id,
    scopes: [
      "scim.users.read",
      "scim.users.write",
      "scim.groups.read",
      "scim.groups.write",
    ],
    expiresAt: new Date("2027-01-01T00:00:00.000Z"),
  },
});

// Display created.token once, then discard it.
```

Microsoft Entra legacy Group schema compatibility:

```ts
scim({
  connections,
  compatibility: {
    microsoftEntra: {
      acceptLegacyGroupSchema: true,
    },
  },
});
```

Filter and PATCH examples:

```http
GET /api/auth/scim/v2/Users?filter=userName%20eq%20%22ada.login%40example.com%22
Authorization: Bearer <token>
```

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations": [
    {
      "op": "replace",
      "path": "active",
      "value": false
    }
  ]
}
```

Identity callback signature:

```ts
type SCIMIdentityResolution =
  | { action: "create" }
  | { action: "link"; userId: string; profile: "manage" | "preserve" };

type reconcileUser = (
  state: {
    userId: string;
    active: boolean;
    profileSourceId?: string;
    sources: readonly SCIMIdentitySource[];
  },
  context: { database: DBTransactionAdapter },
) => void | Promise<void>;
```

Trusted server APIs:

```ts
await auth.api.reconcileSCIMProjection({
  body: { provisioningDomainId: "workspace-acme" },
});

const result = await auth.api.decommissionSCIMConnection({
  body: {
    connectionId: "workforce-acme",
    provisioningDomainId: "workspace-acme",
  },
});
```

## Options / Props

Plugin options:

| Name | Type | Description |
| --- | --- | --- |
| connections | `readonly SCIMConnectionOptions[]` | Required. Code-defined connections; may be empty when the bearer verifier or managed catalog resolves connections. |
| authentication | `SCIMAuthenticationOptions` | Optional. Verifies bearer tokens and can resolve application-owned connections. |
| managedConnections | `SCIMManagedConnectionOptions` | Optional. Enables the SCIM-owned persisted connection and credential catalog and its trusted server APIs. |
| identity | `SCIMIdentity` | Optional. Links existing users and applies global lifecycle state. |
| projection | `SCIMProjection` | Optional. Maps Groups to roles and applies application access state. |
| compatibility | `SCIMCompatibilityOptions` | Optional. Enables narrow, provider-specific HTTP ingress shapes. |

Connection options:

| Name | Type | Description |
| --- | --- | --- |
| id | `string` | Required. Trimmed, unique, at most 255 characters. |
| credentials | `readonly SCIMBearerCredentialOptions[]` | Required list of static bearer credentials; may be empty when `authentication.verifyBearerToken` is configured. |
| provisioningDomainId | `string` | Optional application boundary (trimmed, nonempty, at most 255 characters). Defaults to the connection ID; may be shared by several connections. |

Bearer credential options:

| Name | Type | Description |
| --- | --- | --- |
| type | `"bearer"` | Required credential type. |
| id | `string` | Required stable identifier in the authenticated principal; unique within the connection. |
| token | `string` | Required opaque token; no whitespace; unique across all connections. |
| scopes | `readonly SCIMScope[]` | Optional operation scopes. Static credentials receive every scope when omitted. |
| expiresAt | `Date` | Optional hard expiry used during credential rotation. |

Managed connection server methods (server-only `auth.api`, no HTTP path, omitted from OpenAPI):

| Method | Required body | Result |
| --- | --- | --- |
| createSCIMManagedConnection | `creationRequestId`, `provisioningDomainId`, `actorId`, `scopes`, `expiresAt` | Creates a connection and initial credential; returns the raw token once. |
| listSCIMManagedConnections | `provisioningDomainId` | Lists connections in the qualified provisioning domain. |
| getSCIMManagedConnection | `connectionId`, `provisioningDomainId` | Returns connection and credential metadata without secrets. |
| rotateSCIMManagedCredential | `connectionId`, `provisioningDomainId`, `actorId`, `scopes`, `expiresAt` | Adds an overlapping credential atomically; returns its raw token once. |
| revokeSCIMManagedCredential | `connectionId`, `provisioningDomainId`, `credentialId`, `actorId` | Immediately rejects future requests using that credential. |
| listSCIMManagedConnectionEvents | `connectionId`, `provisioningDomainId` | Latest 100 lifecycle events in sequence order. |
| decommissionSCIMManagedConnection | `connectionId`, `provisioningDomainId`, `actorId` | Disables credentials, runs canonical reconciliation, permanently completes the connection. |

Scopes:

| Scope | Operations |
| --- | --- |
| scim.users.read | List or retrieve Users. |
| scim.users.write | Create, replace, patch, or delete Users. |
| scim.groups.read | List or retrieve Groups. |
| scim.groups.write | Create, replace, patch, or delete Groups. |

Endpoints (base `/scim/v2` under the Better Auth base URL):

| Method | Path | Result |
| --- | --- | --- |
| POST | `/scim/v2/Users` | Creates a SCIM User and creates or explicitly links a Better Auth User, or reprovisions an inactive User with the same `externalId`. 201. |
| GET | `/scim/v2/Users` | Connection's Users as a SCIM `ListResponse`. |
| GET | `/scim/v2/Users/:userId` | One User owned by the connection. |
| PUT | `/scim/v2/Users/:userId` | Replaces writable profile, preserving resource ID. 200. |
| PATCH | `/scim/v2/Users/:userId` | Ordered, atomic changes. 200 with updated resource. |
| DELETE | `/scim/v2/Users/:userId` | Deletes the SCIM resource, preserves the Better Auth User. 204. |
| POST | `/scim/v2/Groups` | Creates a Group and direct memberships. 201. |
| GET | `/scim/v2/Groups` | Connection's Groups as a `ListResponse`. |
| GET | `/scim/v2/Groups/:groupId` | One Group owned by the connection. |
| PUT | `/scim/v2/Groups/:groupId` | Replaces Group attributes and complete membership set. 200. |
| PATCH | `/scim/v2/Groups/:groupId` | Ordered, atomic attribute and membership changes. 200. |
| DELETE | `/scim/v2/Groups/:groupId` | Deletes Group, memberships, and projected grants. 204. |
| GET | `/scim/v2/ServiceProviderConfig` | Authentication, filter, PATCH, and pagination capabilities. |
| GET | `/scim/v2/Schemas` | Core User, Enterprise User, and Group schemas. |
| GET | `/scim/v2/Schemas/:schemaId` | One supported schema. |
| GET | `/scim/v2/ResourceTypes` | User and Group resource types. |
| GET | `/scim/v2/ResourceTypes/:resourceTypeId` | One resource type. |

Supported equality filters (1 to 10 expressions joined by `and`, form `attribute eq "value"`):

| Resource | Filters |
| --- | --- |
| User | `id`, `userName`, `externalId`, `emails.value`, `emails[type eq "work"].value` |
| Group | `id`, `displayName`, `externalId` |

Group PATCH paths:

| Path | Operations | Behavior |
| --- | --- | --- |
| displayName | add, replace | Requires a non-empty, unique value. |
| externalId | add, replace, remove | `remove` clears the identifier. |
| members | add | Adds the supplied User references. |
| members | replace | Replaces the complete membership set. |
| members | remove | Clears all members when no value is supplied, or removes the supplied references. |
| `members[value eq "<scim-user-id>"]` | remove | Removes one User reference. |

Schema models: `scimConnectionBinding`, `scimUser`, `scimGroup`, `scimGroupMember`, `scimSubject`, `scimIdentityTombstone`, `scimProjectionGrant`. With `managedConnections`: `scimManagedConnection`, `scimManagedCredential`, `scimManagedConnectionEvent`.

## Notes

- Requests with a body may use `application/scim+json` or `application/json`; responses use `application/scim+json`. User and Group endpoints require `Authorization: Bearer <token>`; discovery endpoints are public. Missing scope gives `403 Forbidden`; invalid or expired token gives `401 Unauthorized`.
- `POST` / `PUT` bodies must contain exactly one matching core schema URN (User: `urn:ietf:params:scim:schemas:core:2.0:User`, optionally with `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`; Group: `urn:ietf:params:scim:schemas:core:2.0:Group`). PATCH bodies must include `urn:ietf:params:scim:api:messages:2.0:PatchOp`. Unsupported or duplicate schema URNs give `400` with `scimType: "invalidValue"`. Attribute names are case-insensitive; duplicates differing only in case give `400` `invalidSyntax`.
- Null handling: in `POST` / `PUT` a `null` is treated as omitted; in PATCH `add` / `replace` a `null` value removes the target. `active: null` returns `400`.
- User `active` accepts exact case-insensitive strings `"true"` / `"false"` on `POST`, `PUT`, `PATCH` as a Microsoft Entra interoperability exception; other non-Boolean values return `400`.
- A PATCH filtered value path that matches nothing creates the value (instead of RFC 7644 `noTarget`) so one Entra operation does not discard the whole atomic request; a created email is never primary. `remove` on a filtered path that matches nothing is a no-op.
- `userName` is unique case-insensitively within the connection; `externalId` is unique exactly as supplied. Creating a User with an inactive User's `externalId` reprovisions it. Email must be globally unique (else `409`); changing the email clears `emailVerified`.
- Verifier-resolved dynamic connection IDs must be opaque, globally unique, never reused, and disjoint from code-defined IDs. Credential revocation is prospective; decommission the connection when effects must become terminal. Store only a hash or keyed digest of tokens.
- Managed catalog: `credentialHashSecret` is an independent HMAC secret of at least 32 characters; `maxActiveCredentials` is an integer 1 to 100 (default 5); `lastUsedWriteIntervalSeconds` defaults to 300. Raw tokens are returned only from create or rotate. `creationRequestId` (16 to 255 characters) is an immutable correlation, not an idempotency key; reuse returns `409` `SCIM_MANAGED_CREATION_REQUEST_ID_CONFLICT`. `actorId` is audit attribution, not authorization: wrap these methods in an authenticated, authorized route and send `Cache-Control: no-store` when returning a raw token.
- Pagination: one-based `startIndex` and nonnegative `count`; defaults `startIndex=1`, `count=100`, capped at 100. `attributes` / `excludedAttributes` (not combinable) select response fields.
- Unsupported: custom schema extensions, `User.groups`, passwords / IM / photos / X.509, nested Groups, Bulk, POST search, `/Me`, ETags, cursors, sorting, operators other than `eq` and `and`, built-in OAuth token endpoint, Basic auth, mutual TLS, HTTP management endpoints, audit records, webhooks. The package is server-only (no client plugin).
- Use `auth generate` to create the exact schema for your database adapter. `scimUser.serializedAttributes` is the required canonical profile source with no default.
- Legacy cutover (1.7): legacy `scimProvider` connections, credentials, and SCIM-created `account` rows are not converted. Pause provisioning, back up, clear legacy SCIM-owned rows while the old schema is active, apply the new schema, issue new credentials, and run a complete User and Group reprovisioning cycle. Never import legacy token hashes or accept the legacy bearer syntax. See the 1.7 SCIM upgrade guide in the official docs.
- Source: https://www.better-auth.com/docs/plugins/scim/reference (better-auth v1.7.10 docs)

## Related

- [SCIM](./scim.md)
- [SCIM Groups and Custom Roles](./scim-groups-and-roles.md)
