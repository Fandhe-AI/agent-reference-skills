# Organization

Organization プラグインは、組織メンバーとチームの管理を可能にし、ユーザーアクセスと権限管理を簡素化する。ロールと権限の割り当て、招待、チーム管理をサポートする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { organization } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        organization()
    ]
})
```

マイグレーション:

```bash
npx auth migrate
# または
npx auth generate
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { organizationClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        organizationClient()
    ]
})
```

## API メソッド

### 組織管理

**組織作成**

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

**スラッグ利用可否チェック**

```typescript
const { data, error } = await authClient.organization.checkSlug({
    slug: "my-org",
})
```

**ユーザーの組織一覧**

```typescript
const { data: organizations } = authClient.useListOrganizations()
// または
const { data, error } = await authClient.organization.list()
```

**アクティブ組織設定**

```typescript
const { data, error } = await authClient.organization.setActive({
    organizationId: "org-id",
    organizationSlug: "org-slug",
})
```

**アクティブ組織取得**

```typescript
const { data: activeOrganization } = authClient.useActiveOrganization()
```

**組織の完全情報取得**

```typescript
const { data, error } = await authClient.organization.getFullOrganization({
    query: {
        organizationId: "org-id",
        organizationSlug: "org-slug",
        membersLimit: 100,
    },
})
```

**組織更新**

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

**組織削除**

```typescript
const { data, error } = await authClient.organization.delete({
    organizationId: "org-id",
})
```

### メンバー管理

**メンバー一覧**

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

**メンバー追加（サーバーのみ）**

```typescript
const { data, error } = await authClient.organization.addMember({
    userId: "user-id",
    role: ["admin", "sale"],
    organizationId: "org-id",
    teamId: "team-id",
})
```

**メンバー削除**

```typescript
const { data, error } = await authClient.organization.removeMember({
    memberIdOrEmail: "user@example.com",
    organizationId: "org-id",
})
```

**メンバーロール更新**

```typescript
await authClient.organization.updateMemberRole({
    role: ["admin", "sale"],
    memberId: "member-id",
    organizationId: "organization-id",
})
```

**アクティブメンバー取得**

```typescript
const { data: member, error } = await authClient.organization.getActiveMember()
```

**アクティブメンバーロール取得**

```typescript
const { data: { role }, error } = await authClient.organization.getActiveMemberRole()
```

**組織脱退**

```typescript
await authClient.organization.leave({ organizationId: "organization-id" })
```

### 招待

**招待送信**

```typescript
const { data, error } = await authClient.organization.inviteMember({
    email: "example@gmail.com",
    role: "member",
    organizationId: "org-id",
    resend: true,
    teamId: "team-id",
})
```

**招待承認**

```typescript
const { data, error } = await authClient.organization.acceptInvitation({
    invitationId: "invitation-id",
})
```

**招待拒否**

```typescript
await authClient.organization.rejectInvitation({ invitationId: "invitation-id" })
```

**招待キャンセル**

```typescript
await authClient.organization.cancelInvitation({ invitationId: "invitation-id" })
```

**招待取得**

```typescript
const { data, error } = await authClient.organization.getInvitation({
    query: { id: "invitation-id" },
})
```

**招待一覧**

```typescript
const { data, error } = await authClient.organization.listInvitations({
    query: { organizationId: "organization-id" },
})
```

**ユーザー招待一覧**

```typescript
const invitations = await authClient.organization.listUserInvitations()
```

### チーム

**チーム作成**

```typescript
const { data, error } = await authClient.organization.createTeam({
    name: "my-team",
    organizationId: "organization-id",
})
```

**チーム一覧**

```typescript
const { data, error } = await authClient.organization.listTeams({
    query: { organizationId: "organization-id" },
})
```

**チーム更新**

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

**チーム削除**

```typescript
const { data, error } = await authClient.organization.removeTeam({
    teamId: "team-id",
    organizationId: "organization-id",
})
```

**アクティブチーム設定**

```typescript
const { data, error } = await authClient.organization.setActiveTeam({
    teamId: "team-id",
})
```

**ユーザーチーム一覧**

```typescript
const { data, error } = await authClient.organization.listUserTeams()
```

**チームメンバー一覧**

```typescript
const { data, error } = await authClient.organization.listTeamMembers({
    query: { teamId: "team-id" },
})
```

**チームメンバー追加**

```typescript
const { data, error } = await authClient.organization.addTeamMember({
    teamId: "team-id",
    userId: "user-id",
})
```

**チームメンバー削除**

```typescript
const { data, error } = await authClient.organization.removeTeamMember({
    teamId: "team-id",
    userId: "user-id",
})
```

### アクセス制御

**権限チェック**

```typescript
const canCreateProject = await authClient.organization.hasPermission({
    permissions: { project: ["create"] },
})
```

**ロール権限チェック（クライアント側）**

```typescript
const canDelete = authClient.organization.checkRolePermission({
    permissions: { organization: ["delete"] },
    role: "admin",
})
```

### 動的アクセス制御

**ロール作成**

```typescript
const permission = { project: ["create", "update", "delete"] }
await authClient.organization.createRole({
    role: "my-unique-role",
    permission: permission,
    organizationId: "organization-id",
})
```

**ロール削除**

```typescript
await authClient.organization.deleteRole({
    roleName: "my-role",
    roleId: "role-id",
    organizationId: "organization-id",
})
```

**ロール一覧**

```typescript
const { data: roles, error } = await authClient.organization.listRoles({
    query: { organizationId: "organization-id" },
})
```

**ロール取得**

```typescript
const { data: role, error } = await authClient.organization.getRole({
    query: {
        roleName: "my-role",
        roleId: "role-id",
        organizationId: "organization-id",
    },
})
```

**ロール更新**

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

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `allowUserToCreateOrganization` | `boolean \| (user: User) => Promise<boolean>` | `true` | 組織作成権限の制御 |
| `organizationLimit` | `number \| (user: User) => Promise<boolean>` | 無制限 | ユーザーあたりの最大組織数 |
| `creatorRole` | `"admin" \| "owner"` | `"owner"` | 作成者の初期ロール |
| `membershipLimit` | `number \| (user: User, org: Organization) => Promise<number>` | `100` | 組織あたりの最大メンバー数 |
| `sendInvitationEmail` | `async (data) => Promise<void>` | - | 招待メール送信関数 |
| `invitationExpiresIn` | number (秒) | `172800`（48時間） | 招待の有効期間 |
| `cancelPendingInvitationsOnReInvite` | boolean | `false` | 再招待時に既存の招待をキャンセル |
| `invitationLimit` | `number \| (user: User) => Promise<boolean>` | `100` | 保留中の最大招待数 |
| `requireEmailVerificationOnInvitation` | boolean | `false` | 招待操作にメール認証を要求 |
| `disableOrganizationDeletion` | boolean | `false` | 組織削除を無効化 |

### チーム設定

```typescript
teams: {
    enabled: boolean,
    maximumTeams: number | (async (organizationId) => number),
    maximumMembersPerTeam: number | (async (teamId, organizationId) => number),
    allowRemovingAllTeams: boolean,
}
```

### 動的アクセス制御設定

```typescript
dynamicAccessControl: {
    enabled: boolean,
    maximumRolesPerOrganization: number | (async (organizationId) => number),
}
```

### スキーマカスタマイズ

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

## DB スキーマ

### organization テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| name | string | - | 組織名 |
| slug | string | - | URL フレンドリーな識別子 |
| logo | string | ? | ロゴ URL |
| metadata | string | ? | カスタムメタデータ JSON |
| createdAt | Date | - | 作成日時 |

### member テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| userId | string | FK | ユーザー参照 |
| organizationId | string | FK | 組織参照 |
| role | string | - | メンバーロール |
| createdAt | Date | - | 追加日時 |

### invitation テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| email | string | - | 招待先メール |
| inviterId | string | FK | 招待者ユーザー参照 |
| organizationId | string | FK | 組織参照 |
| role | string | ? | 割り当てロール |
| status | string | - | 招待状態 |
| createdAt | Date | - | 作成日時 |
| expiresAt | Date | - | 有効期限 |
| teamId | string | ? | チーム参照（任意） |

### session テーブル追加フィールド

| フィールド | 型 | 説明 |
|---|---|---|
| activeOrganizationId | string | ? | 現在のアクティブ組織 |
| activeTeamId | string | ? | 現在のアクティブチーム |

### organizationRole テーブル（動的AC のみ）

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| organizationId | string | FK | 組織参照 |
| role | string | - | ロール名 |
| permission | string | - | 権限 JSON |
| createdAt | Date | - | 作成日時 |
| updatedAt | Date | ? | 更新日時 |

### team テーブル（チーム有効時のみ）

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| name | string | - | チーム名 |
| organizationId | string | FK | 組織参照 |
| createdAt | Date | - | 作成日時 |
| updatedAt | Date | ? | 更新日時 |

### teamMember テーブル（チーム有効時のみ）

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| teamId | string | FK | チーム参照 |
| userId | string | FK | ユーザー参照 |
| createdAt | Date | ? | 追加日時 |

## デフォルトロールと権限

ロール:
- `owner`: 組織削除を含む完全な制御
- `admin`: 組織削除/所有権を除く完全な制御
- `member`: 読み取りのみ

リソースとアクション:
- `organization`: update, delete
- `member`: create, update, delete
- `invitation`: create, cancel
- `team`: create, update, delete（有効時）

## フックシステム

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

## 注意点

- メール認証を招待承認の要件にできる
- ロールベースのアクセス制御が不正な操作を防止
- 招待は設定された期間後に期限切れ（デフォルト48時間）
- 複数ロールはカンマ区切り文字列でサポート
- 動的ロールはクライアント側でチェックできない。検証には `hasPermission` API を使用する
