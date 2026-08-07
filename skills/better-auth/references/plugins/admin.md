# Admin

The Admin plugin provides administrative functions for user management: creating users, role management, ban/unban, impersonation, session management, and more.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        admin()
    ]
})
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        adminClient()
    ]
})
```

### Create user

`POST /admin/create-user`

```typescript
// Client
const { data: newUser, error } = await authClient.admin.createUser({
    email: "user@example.com",
    password: "some-secure-password",
    name: "James Smith",
    role: "user",
    data: { customField: "customValue" },
})

// Server
const newUser = await auth.api.createUser({
    body: {
        email: "user@example.com",
        password: "some-secure-password",
        name: "James Smith",
        role: "user",
        data: { customField: "customValue" },
    },
})
```

### List users

`GET /admin/list-users`

```typescript
// Client
const { data: users, error } = await authClient.admin.listUsers({
    query: {
        searchValue: "some name",
        searchField: "name",
        searchOperator: "contains",
        limit: 100,
        offset: 100,
        sortBy: "name",
        sortDirection: "desc",
        filterField: "email",
        filterValue: "hello@example.com",
        filterOperator: "eq",
    },
})

// Server
const users = await auth.api.listUsers({
    query: {
        searchValue: "some name",
        searchField: "name",
        searchOperator: "contains",
        limit: 100,
        offset: 100,
        sortBy: "name",
        sortDirection: "desc",
        filterField: "email",
        filterValue: "hello@example.com",
        filterOperator: "eq",
    },
    headers: await headers(),
})
```

Query parameters:
- `searchValue` (string): search term
- `searchField` ("email" | "name"): field to search
- `searchOperator` ("contains" | "starts_with" | "ends_with"): search type
- `limit` (string | number): number of rows to return (default: 100)
- `offset` (string | number): start position
- `sortBy` (string): sort field
- `sortDirection` ("asc" | "desc"): sort order
- `filterField` (string): filter field
- `filterValue` (string | number | boolean | string[] | number[]): filter value
- `filterOperator` ("eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "in" | "not_in" | "contains" | "starts_with" | "ends_with"): filter operator

Response: `{ users: User[], total: number, limit: number | undefined, offset: number | undefined }`

Pagination example:

```typescript
const pageSize = 10
const currentPage = 2

const users = await authClient.admin.listUsers({
    query: {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize
    }
})

const totalUsers = users.total
const totalPages = Math.ceil(totalUsers / pageSize)
```

### Get user

`GET /admin/get-user`

```typescript
const { data, error } = await authClient.admin.getUser({
    query: { id: "user-id" },
})
```

### Set role

`POST /admin/set-role`

```typescript
// Client
const { data, error } = await authClient.admin.setRole({
    userId: "user-id",
    role: "admin",
})

// Server
const data = await auth.api.setRole({
    body: { userId: "user-id", role: "admin" },
    headers: await headers(),
})
```

### Set password

`POST /admin/set-user-password`

```typescript
const { data, error } = await authClient.admin.setUserPassword({
    newPassword: 'new-password',
    userId: 'user-id',
})
```

### Update user

`POST /admin/update-user`

```typescript
// Client
const { data, error } = await authClient.admin.updateUser({
    userId: "user-id",
    data: { name: "John Doe" },
})

// Server
const data = await auth.api.adminUpdateUser({
    body: { userId: "user-id", data: { name: "John Doe" } },
    headers: await headers(),
})
```

### Ban user

`POST /admin/ban-user`

```typescript
await authClient.admin.banUser({
    userId: "user-id",
    banReason: "Spamming",
    banExpiresIn: 60 * 60 * 24 * 7,
})
```

Parameters:
- `userId` (string, required)
- `banReason` (string): reason for the ban
- `banExpiresIn` (number): expiration in seconds. undefined = permanent

### Unban user

`POST /admin/unban-user`

```typescript
await authClient.admin.unbanUser({ userId: "user-id" })
```

### List user sessions

`POST /admin/list-user-sessions`

```typescript
const { data, error } = await authClient.admin.listUserSessions({
    userId: "user-id",
})
```

### Revoke session

`POST /admin/revoke-user-session`

```typescript
const { data, error } = await authClient.admin.revokeUserSession({
    sessionToken: "session_token_here",
})
```

### Revoke all sessions

`POST /admin/revoke-user-sessions`

```typescript
const { data, error } = await authClient.admin.revokeUserSessions({
    userId: "user-id",
})
```

### Impersonate user

`POST /admin/impersonate-user`

```typescript
const { data, error } = await authClient.admin.impersonateUser({
    userId: "user-id",
})
```

Impersonation between admins is disabled by default. To enable it:

```typescript
const superAdmin = ac.newRole({
  ...adminAc.statements,
  user: ["impersonate-admins", ...adminAc.statements.user],
})
```

### Stop impersonating

`POST /admin/stop-impersonating`

```typescript
await authClient.admin.stopImpersonating()
```

### Remove user

`POST /admin/remove-user`

```typescript
const { data: deletedUser, error } = await authClient.admin.removeUser({
    userId: "user-id",
})
```

### Permission check

`POST /admin/has-permission`

```typescript
// Client
const canCreateProject = await authClient.admin.hasPermission({
    permissions: { project: ["create"] },
})

// Server
await auth.api.userHasPermission({
    body: {
        userId: 'id',
        permissions: { project: ["create"] },
    },
})

// Check directly against a role
await auth.api.userHasPermission({
    body: {
        role: "admin",
        permissions: { project: ["create"] },
    },
})
```

### Role permission check (synchronous, client side)

```typescript
const canCreateProject = authClient.admin.checkRolePermission({
    permissions: { user: ["delete"] },
    role: "admin",
})
```

### Custom access control setup

```typescript
// Step 1: create access control
import { createAccessControl } from "better-auth/plugins/access"

const statement = {
    project: ["create", "share", "update", "delete"],
} as const

const ac = createAccessControl(statement)

// Step 2: create roles
export const user = ac.newRole({ project: ["create"] })
export const admin = ac.newRole({ project: ["create", "update"] })
export const myCustomRole = ac.newRole({
    project: ["create", "update", "delete"],
    user: ["ban"],
})

// Including default permissions
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access"

const statement = {
    ...defaultStatements,
    project: ["create", "share", "update", "delete"],
} as const

const ac = createAccessControl(statement)
const admin = ac.newRole({
    project: ["create", "update"],
    ...adminAc.statements,
})

// Step 3: pass to server
export const auth = betterAuth({
    plugins: [
        adminPlugin({
            ac,
            roles: { admin, user, myCustomRole }
        }),
    ],
})

// Step 4: pass to client
export const client = createAuthClient({
    plugins: [
        adminClient({
            ac,
            roles: { admin, user, myCustomRole }
        })
    ]
})
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `defaultRole` | string | `"user"` | Default role |
| `adminRoles` | string[] | `["admin"]` | Roles considered admins |
| `adminUserIds` | string[] | `[]` | User IDs treated as admins |
| `impersonationSessionDuration` | number | 3600 (1 hour) | Impersonation session duration (seconds) |
| `defaultBanReason` | string | `"No reason"` | Default ban reason |
| `defaultBanExpiresIn` | number | undefined (permanent) | Default ban expiration (seconds) |
| `bannedUserMessage` | string | `"You have been banned..."` | Message shown to banned users |

## Notes

- All admin operations require user authentication and admin privileges
- Banned users cannot sign in, and all existing sessions are revoked
- `adminRoles` is unnecessary when using custom access control
- When using email enumeration protection (`requireEmailVerification` or `autoSignIn: false`), `customSyntheticUser` must be configured:

```typescript
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
            ...coreFields,
            role: "user",
            banned: false,
            banReason: null,
            banExpires: null,
            ...additionalFields,
            id,
        }),
    },
    plugins: [admin()],
})
```

### Default roles and permissions

- **admin**: full control over all resources and actions
- **user**: no admin actions
- Users can hold multiple roles as a comma-separated string
- **user resource**: `create`, `list`, `set-role`, `ban`, `impersonate`, `impersonate-admins`, `delete`, `set-password`
- **session resource**: `list`, `revoke`, `delete`

### DB schema

Additional fields on the user table:

| Field | Type | Description |
|---|---|---|
| `role` | string | User's role. Default `user` |
| `banned` | boolean | Ban status |
| `banReason` | string | Ban reason |
| `banExpires` | date | Ban expiration |

Additional fields on the session table:

| Field | Type | Description |
|---|---|---|
| `impersonatedBy` | string | ID of the admin who initiated impersonation |

## Related

- [organization.md](./organization.md)
