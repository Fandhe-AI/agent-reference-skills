# SCIM

The SCIM plugin exposes a SCIM 2.0-compliant server on Better Auth, allowing third-party identity providers to sync identities into your service.

## Signature / Usage

### Installation

```bash
npm install @better-auth/scim
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { scim } from "@better-auth/scim"

const auth = betterAuth({
    plugins: [scim()]
})
```

Requires support for the POST, GET, PUT, PATCH, and DELETE HTTP methods.

Next.js example:

```typescript
import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
export const { POST, GET, PUT, PATCH, DELETE } = toNextJsHandler(auth)
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Generate SCIM token

```typescript
// Client
const { data, error } = await authClient.scim.generateToken({
    providerId: "acme-corp",
    organizationId: "the-org",
})

// Server
const data = await auth.api.generateSCIMToken({
    body: { providerId: "acme-corp", organizationId: "the-org" },
    headers: await headers(),
})
```

### List provider connections

```typescript
const { data, error } = await authClient.scim.listProviderConnections()
```

### Get provider connection details

```typescript
const { data, error } = await authClient.scim.getProviderConnection({
    query: { providerId: "acme-corp" },
})
```

### Delete provider connection

```typescript
const { data, error } = await authClient.scim.deleteProviderConnection({
    providerId: "acme-corp",
})
```

### SCIM user operations

**List**: `GET /scim/v2/Users`

```typescript
const data = await auth.api.listSCIMUsers({
    query: { filter: 'userName eq "user-a"' },
    headers: { authorization: 'Bearer <token>' },
})
```

**Get**: `GET /scim/v2/Users/:userId`

**Create**: `POST /scim/v2/Users`

```typescript
const data = await auth.api.createSCIMUser({
    body: {
        externalId: "third party id",
        name: { formatted: "Daniel Perez", givenName: "Daniel", familyName: "Perez" },
        emails: [{ value: "daniel@email.com", primary: true }],
    },
    headers: { authorization: 'Bearer <token>' },
})
```

**Update**: `PUT /scim/v2/Users/:userId`

**Patch**: `PATCH /scim/v2/Users/:userId`

```typescript
const data = await auth.api.patchSCIMUser({
    body: {
        schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
        Operations: [{ op: "replace", path: "/userName", value: "any value" }],
    },
    headers: { authorization: 'Bearer <token>' },
})
```

**Delete**: `DELETE /scim/v2/Users/:userId`

### Service provider configuration

- `GET /scim/v2/ServiceProviderConfig`
- `GET /scim/v2/Schemas`
- `GET /scim/v2/Schemas/:schemaId`
- `GET /scim/v2/ResourceTypes`
- `GET /scim/v2/ResourceTypes/:resourceTypeId`

## Options / Props

### Provider ownership

```typescript
scim({ providerOwnership: { enabled: true } })
```

Links each SCIM token to the user who generated it. Requires a migration after enabling.

### Default SCIM token

```typescript
scim({
    defaultSCIM: [{
        providerId: "default-scim",
        scimToken: "some-scim-token",
        organizationId: "the-org"
    }]
})
```

The SCIM token must be base64-encoded in the form `base64(scimToken:providerId[:organizationId])`.

### Token storage method

```typescript
// Encrypted
scim({
    storeSCIMToken: {
        encrypt: async (scimToken) => myCustomEncryptor(scimToken),
        decrypt: async (scimToken) => myCustomDecryptor(scimToken),
    }
})

// Hashed
scim({
    storeSCIMToken: {
        hash: async (scimToken) => myCustomHasher(scimToken),
    }
})
```

Default: plain text

### Lifecycle hooks

```typescript
scim({
    beforeSCIMTokenGenerated: async ({ user, member, scimToken }) => {
        // Validate and intercept
    },
    afterSCIMTokenGenerated: async ({ user, member, scimToken, scimProvider }) => {
        // Share the token or notify
    },
})
```

### DB schema (scimProvider table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | DB identifier |
| providerId | string | - | Provider ID |
| scimToken | string | - | Bearer token used for authentication |
| organizationId | string | ? | Organization ID (optional) |
| userId | string | ? | Owning user ID (when providerOwnership is enabled) |

## Notes

- **Critical security warning**: any authenticated user with access to the Better Auth instance can generate a SCIM token. This is a serious risk in multi-tenant scenarios
- Use the `beforeSCIMTokenGenerated` hook to restrict token generation to admins:

```typescript
scim({
    beforeSCIMTokenGenerated: async ({ user, member, scimToken }) => {
        const userHasAdmin = member?.role && userRoles.has(member.role)
        const userIsAdmin = userAdminIds.has(user.id)
        if (!userHasAdmin && !userIsAdmin) {
            throw new APIError("FORBIDDEN", { message: "User does not have enough permissions" })
        }
    },
})
```
