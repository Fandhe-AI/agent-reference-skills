# Organization

The Organization plugin manages organization members and teams, simplifying user access and permission management. It supports role and permission assignment, invitations, and team management.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { organization } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        organization()
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
import { organizationClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        organizationClient()
    ]
})
```

### Organization management

**Create organization**

```typescript
const { data, error } = await authClient.organization.create({
    name: "My Organization",
    slug: "my-org",
    logo: "https://example.com/logo.png",
    metadata: { someKey: "someValue" },
    userId: "some_user_id",
    keepCurrentActiveOrganization: false,
})
```

**Check slug availability**

```typescript
const { data, error } = await authClient.organization.checkSlug({
    slug: "my-org",
})
```

**List user's organizations**

```typescript
const { data: organizations } = authClient.useListOrganizations()
// or
const { data, error } = await authClient.organization.list()
```

**Set active organization**

```typescript
const { data, error } = await authClient.organization.setActive({
    organizationId: "org-id",
    organizationSlug: "org-slug",
})
```

**Get active organization**

```typescript
const { data: activeOrganization } = authClient.useActiveOrganization()
```

**Get full organization details**

```typescript
const { data, error } = await authClient.organization.getFullOrganization({
    query: {
        organizationId: "org-id",
        organizationSlug: "org-slug",
        membersLimit: 100,
    },
})
```

**Update organization**

```typescript
const { data, error } = await authClient.organization.update({
    data: {
        name: "updated-name",
        slug: "updated-slug",
        logo: "new-logo.url",
        metadata: { customerId: "test" },
    },
    organizationId: "org-id",
})
```

**Delete organization**

```typescript
const { data, error } = await authClient.organization.delete({
    organizationId: "org-id",
})
```

### Member management

**List members**

```typescript
const { data, error } = await authClient.organization.listMembers({
    query: {
        organizationId: "organization-id",
        limit: 100,
        offset: 0,
        sortBy: "createdAt",
        sortDirection: "desc",
        filterField: "createdAt",
        filterOperator: "eq",
        filterValue: "value",
    },
})
```

**Add member (server only)**

```typescript
const { data, error } = await authClient.organization.addMember({
    userId: "user-id",
    role: ["admin", "sale"],
    organizationId: "org-id",
    teamId: "team-id",
})
```

**Remove member**

```typescript
const { data, error } = await authClient.organization.removeMember({
    memberIdOrEmail: "user@example.com",
    organizationId: "org-id",
})
```

**Update member role**

```typescript
await authClient.organization.updateMemberRole({
    role: ["admin", "sale"],
    memberId: "member-id",
    organizationId: "organization-id",
})
```

**Get active member**

```typescript
const { data: member, error } = await authClient.organization.getActiveMember()
```

**Get active member role**

```typescript
const { data: { role }, error } = await authClient.organization.getActiveMemberRole()
```

**Leave organization**

```typescript
await authClient.organization.leave({ organizationId: "organization-id" })
```

### Invitations

**Send invitation**

```typescript
const { data, error } = await authClient.organization.inviteMember({
    email: "example@gmail.com",
    role: "member",
    organizationId: "org-id",
    resend: true,
    teamId: "team-id",
})
```

**Accept invitation**

```typescript
const { data, error } = await authClient.organization.acceptInvitation({
    invitationId: "invitation-id",
})
```

**Reject invitation**

```typescript
await authClient.organization.rejectInvitation({ invitationId: "invitation-id" })
```

**Cancel invitation**

```typescript
await authClient.organization.cancelInvitation({ invitationId: "invitation-id" })
```

**Get invitation**

```typescript
const { data, error } = await authClient.organization.getInvitation({
    query: { id: "invitation-id" },
})
```

**List invitations**

```typescript
const { data, error } = await authClient.organization.listInvitations({
    query: { organizationId: "organization-id" },
})
```

**List user's invitations**

```typescript
const invitations = await authClient.organization.listUserInvitations()
```

### Teams

**Create team**

```typescript
const { data, error } = await authClient.organization.createTeam({
    name: "my-team",
    organizationId: "organization-id",
})
```

**List teams**

```typescript
const { data, error } = await authClient.organization.listTeams({
    query: { organizationId: "organization-id" },
})
```

**Update team**

```typescript
const { data, error } = await authClient.organization.updateTeam({
    teamId: "team-id",
    data: {
        name: "My new team name",
        organizationId: "organization-id",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
})
```

**Delete team**

```typescript
const { data, error } = await authClient.organization.removeTeam({
    teamId: "team-id",
    organizationId: "organization-id",
})
```

**Set active team**

```typescript
const { data, error } = await authClient.organization.setActiveTeam({
    teamId: "team-id",
})
```

**List user's teams**

```typescript
const { data, error } = await authClient.organization.listUserTeams()
```

**List team members**

```typescript
const { data, error } = await authClient.organization.listTeamMembers({
    query: { teamId: "team-id" },
})
```

**Add team member**

```typescript
const { data, error } = await authClient.organization.addTeamMember({
    teamId: "team-id",
    userId: "user-id",
})
```

**Remove team member**

```typescript
const { data, error } = await authClient.organization.removeTeamMember({
    teamId: "team-id",
    userId: "user-id",
})
```

### Access control

**Permission check**

```typescript
const canCreateProject = await authClient.organization.hasPermission({
    permissions: { project: ["create"] },
})
```

**Role permission check (client side)**

```typescript
const canDelete = authClient.organization.checkRolePermission({
    permissions: { organization: ["delete"] },
    role: "admin",
})
```

### Dynamic access control

**Create role**

```typescript
const permission = { project: ["create", "update", "delete"] }
await authClient.organization.createRole({
    role: "my-unique-role",
    permission: permission,
    organizationId: "organization-id",
})
```

**Delete role**

```typescript
await authClient.organization.deleteRole({
    roleName: "my-role",
    roleId: "role-id",
    organizationId: "organization-id",
})
```

**List roles**

```typescript
const { data: roles, error } = await authClient.organization.listRoles({
    query: { organizationId: "organization-id" },
})
```

**Get role**

```typescript
const { data: role, error } = await authClient.organization.getRole({
    query: {
        roleName: "my-role",
        roleId: "role-id",
        organizationId: "organization-id",
    },
})
```

**Update role**

```typescript
const { data: updatedRole, error } = await authClient.organization.updateRole({
    roleName: "my-role",
    roleId: "role-id",
    organizationId: "organization-id",
    data: {
        permission: { project: ["create", "update", "delete"] },
        roleName: "my-new-role",
    },
})
```

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `allowUserToCreateOrganization` | `boolean \| (user: User) => Promise<boolean>` | `true` | Controls who can create organizations |
| `organizationLimit` | `number \| (user: User) => Promise<boolean>` | unlimited | Maximum organizations per user |
| `creatorRole` | `"admin" \| "owner"` | `"owner"` | Initial role of the creator |
| `membershipLimit` | `number \| (user: User, org: Organization) => Promise<number>` | `100` | Maximum members per organization |
| `sendInvitationEmail` | `async (data) => Promise<void>` | - | Function to send the invitation email |
| `invitationExpiresIn` | number (seconds) | `172800` (48 hours) | Invitation validity period |
| `cancelPendingInvitationsOnReInvite` | boolean | `false` | Cancel existing invitations on re-invite |
| `invitationLimit` | `number \| (user: User) => Promise<boolean>` | `100` | Maximum pending invitations |
| `requireEmailVerificationOnInvitation` | boolean | `false` | Require email verification for invitation actions |
| `disableOrganizationDeletion` | boolean | `false` | Disables organization deletion |

### Team configuration

```typescript
teams: {
    enabled: boolean,
    maximumTeams: number | (async (organizationId) => number),
    maximumMembersPerTeam: number | (async (teamId, organizationId) => number),
    allowRemovingAllTeams: boolean,
}
```

### Dynamic access control configuration

```typescript
dynamicAccessControl: {
    enabled: boolean,
    maximumRolesPerOrganization: number | (async (organizationId) => number),
}
```

### Schema customization

```typescript
schema: {
    organization: {
        modelName: "organizations",
        fields: { name: "title" },
        additionalFields: {
            myCustomField: {
                type: "string",
                input: true,
                required: false,
            },
        },
    },
}
```

### Hook system

```typescript
organizationHooks: {
    beforeCreateOrganization: async ({ organization, user }) => { },
    afterCreateOrganization: async ({ organization, member, user }) => { },
    beforeAddMember: async ({ member, user, organization }) => { },
    afterAddMember: async ({ member, user, organization }) => { },
    beforeCreateInvitation: async ({ invitation, inviter, organization }) => { },
    afterCreateInvitation: async ({ invitation, inviter, organization }) => { },
    beforeCreateTeam: async ({ team, user, organization }) => { },
    afterCreateTeam: async ({ team, user, organization }) => { },
}
```

### DB schema (organization table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| name | string | - | Organization name |
| slug | string | - | URL-friendly identifier |
| logo | string | ? | Logo URL |
| metadata | string | ? | Custom metadata JSON |
| createdAt | Date | - | Creation timestamp |

### DB schema (member table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| userId | string | FK | User reference |
| organizationId | string | FK | Organization reference |
| role | string | - | Member role |
| createdAt | Date | - | Date added |

### DB schema (invitation table)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| email | string | - | Invitee email |
| inviterId | string | FK | Inviter user reference |
| organizationId | string | FK | Organization reference |
| role | string | ? | Assigned role |
| status | string | - | Invitation status |
| createdAt | Date | - | Creation timestamp |
| expiresAt | Date | - | Expiration timestamp |
| teamId | string | ? | Team reference (optional) |

### DB schema (session table additional fields)

| Field | Type | Description |
|---|---|---|
| activeOrganizationId | string | ? | Currently active organization |
| activeTeamId | string | ? | Currently active team |

### DB schema (organizationRole table, dynamic AC only)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| organizationId | string | FK | Organization reference |
| role | string | - | Role name |
| permission | string | - | Permission JSON |
| createdAt | Date | - | Creation timestamp |
| updatedAt | Date | ? | Update timestamp |

### DB schema (team table, teams enabled only)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| name | string | - | Team name |
| organizationId | string | FK | Organization reference |
| createdAt | Date | - | Creation timestamp |
| updatedAt | Date | ? | Update timestamp |

### DB schema (teamMember table, teams enabled only)

| Field | Type | Key | Description |
|---|---|---|---|
| id | string | PK | Unique identifier |
| teamId | string | FK | Team reference |
| userId | string | FK | User reference |
| createdAt | Date | ? | Date added |

## Notes

- Default roles: `owner` (full control including organization deletion), `admin` (full control except deletion/ownership transfer), `member` (read-only)
- Default resources and actions: `organization` (update, delete), `member` (create, update, delete), `invitation` (create, cancel), `team` (create, update, delete, when enabled)
- Email verification can be required for invitation acceptance
- Role-based access control prevents unauthorized operations
- Invitations expire after the configured period (48 hours by default)
- Multiple roles are supported as a comma-separated string
- Dynamic roles cannot be checked client-side; use the `hasPermission` API for verification
