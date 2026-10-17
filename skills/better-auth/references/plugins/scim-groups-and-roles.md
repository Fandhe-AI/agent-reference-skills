# SCIM Groups and Custom Roles

Provision SCIM Groups and map them to application roles. SCIM Groups store directory-owned membership; they grant no application permissions until a projection is configured.

## Signature / Usage

Create Group request body (members reference SCIM User IDs of the same connection, not Better Auth User IDs):

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:Group"],
  "externalId": "directory-group-finance",
  "displayName": "Finance administrators",
  "members": [
    {
      "value": "<scim-user-id>",
      "type": "User"
    }
  ]
}
```

Map Groups to custom roles:

```ts
const rolesByExternalGroupId = new Map([
  ["directory-group-finance", "billing-manager"],
]);

const allowedRolesByWorkspace = new Map([
  ["workspace-acme", new Set(["billing-manager"])],
]);

scim({
  connections: [
    {
      id: "workforce-acme",
      provisioningDomainId: "workspace-acme",
      credentials: [
        { type: "bearer", id: "workforce-primary", token: workforceToken },
      ],
    },
  ],
  projection: {
    roles: {
      map: ({ source }) => {
        const role = source.externalId
          ? rolesByExternalGroupId.get(source.externalId)
          : undefined;
        return role ? [role] : [];
      },
      exists: ({ provisioningDomainId, role }) => {
        const allowedRoles = allowedRolesByWorkspace.get(provisioningDomainId);
        return allowedRoles?.has(role) ?? false;
      },
    },
    async reconcileUser(state, { database }) {
      await replaceSCIMManagedRoles(database, state);
    },
  },
});
```

Replay a provisioning domain after changing mappings (trusted server code only; no HTTP route):

```ts
await auth.api.reconcileSCIMProjection({
  body: { provisioningDomainId: "workspace-acme" },
});
```

Rotate a credential (add the new one beside the old one with an expiry on the retiring one):

```ts
scim({
  connections: [
    {
      id: "workforce-acme",
      credentials: [
        { type: "bearer", id: "current", token: currentToken },
        {
          type: "bearer",
          id: "retiring",
          token: retiringToken,
          expiresAt: rotationEndsAt,
        },
      ],
    },
  ],
});
```

Decommission a connection:

```ts
const result = await auth.api.decommissionSCIMConnection({
  body: { connectionId: "workforce-acme" },
});

if (result.status === "reconciling") {
  console.info("SCIM decommissioning is still running", {
    reconciledUsers: result.reconciledUsers,
    batches: result.batches,
    retryAfter: result.retryAfter,
  });
}
```

## Options / Props

Projection callbacks:

| Name | Description |
| --- | --- |
| `roles.map` | Returns candidate role identifiers for one Group source. |
| `roles.exists` | Confirms that each candidate role exists in the provisioning domain. |
| `reconcileUser` | Applies the complete desired SCIM state for one Better Auth User in one provisioning domain. |

`projection.reconcileUser` state:

| Field | Meaning |
| --- | --- |
| `provisioningDomainId` | The application boundary that receives the access state. |
| `userId` | The linked Better Auth User ID. |
| `active` | `true` while at least one SCIM source in this domain is active. |
| `sources` | Every linked source in the domain, with its connection and active state. |
| `grants` | Validated role grants with the Group source that produced each grant. |

## Notes

- Groups support direct User members only. Nested Groups and members from another connection are rejected. A Group may contain up to 1,000 unique members; membership changes are atomic.
- All three projection callbacks receive a transaction-bound database context. Make the reconciler idempotent, write through the supplied `database`, and replace only SCIM-owned access so manual assignments and roles from other systems remain intact. Throwing rolls back the SCIM request.
- Prefer the immutable SCIM `id` in `roles.map`; use `externalId` only if the directory guarantees it stays stable. Do not turn `displayName` directly into a role (a directory administrator can rename a Group); use an explicit allowlist if the mapping reads it. Empty values and roles rejected by `roles.exists` grant nothing.
- Without `projection`, Groups and memberships remain available through SCIM but grant no application access.
- SCIM requests reconcile affected users immediately. `reconcileSCIMProjection` invokes `projection.reconcileUser` for every linked user in the domain. Keep `reconcileUser` configured until the replay finishes; to remove all mapped roles, remove `projection.roles` or make `map` return none, replay, then remove the remaining projection config.
- Credential rotation: an expired credential receives `401 Unauthorized`; tokens must be unique across all configured connections.
- Decommissioning is irreversible. Decommission a connection that has authenticated at least once before removing it from `connections`; a never-used connection has no persisted binding and can be removed directly. The method is server API only. If the result is `reconciling`, call again at or after `retryAfter` until it returns `complete`, then remove the connection from configuration. The connection's SCIM Users, Groups, and memberships are retained. Keep identity and projection callbacks idempotent.
- Source: https://www.better-auth.com/docs/plugins/scim/groups-and-roles (better-auth v1.7.10 docs)

## Related

- [SCIM](./scim.md)
- [SCIM Reference](./scim-reference.md)
