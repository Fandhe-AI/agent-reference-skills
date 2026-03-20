# Admin

Admin プラグインは、ユーザー管理のための管理機能を提供する。ユーザーの作成、ロール管理、BAN/BAN解除、なりすまし、セッション管理などの操作が可能。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        admin()
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
import { adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        adminClient()
    ]
})
```

## API メソッド

### ユーザー作成

`POST /admin/create-user`

```typescript
// クライアント
const { data: newUser, error } = await authClient.admin.createUser({
    email: "user@example.com",
    password: "some-secure-password",
    name: "James Smith",
    role: "user",
    data: { customField: "customValue" },
})

// サーバー
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

### ユーザー一覧

`GET /admin/list-users`

```typescript
// クライアント
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

// サーバー
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

クエリパラメータ:
- `searchValue` (string): 検索語
- `searchField` ("email" | "name"): 検索フィールド
- `searchOperator` ("contains" | "starts_with" | "ends_with"): 検索タイプ
- `limit` (string | number): 返す行数（デフォルト: 100）
- `offset` (string | number): 開始位置
- `sortBy` (string): ソートフィールド
- `sortDirection` ("asc" | "desc"): ソート順
- `filterField` (string): フィルターフィールド
- `filterValue` (string | number | boolean | string[] | number[]): フィルター値
- `filterOperator` ("eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "in" | "not_in" | "contains" | "starts_with" | "ends_with"): フィルター操作

レスポンス: `{ users: User[], total: number, limit: number | undefined, offset: number | undefined }`

ページネーション例:

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

### ユーザー取得

`GET /admin/get-user`

```typescript
const { data, error } = await authClient.admin.getUser({
    query: { id: "user-id" },
})
```

### ロール設定

`POST /admin/set-role`

```typescript
// クライアント
const { data, error } = await authClient.admin.setRole({
    userId: "user-id",
    role: "admin",
})

// サーバー
const data = await auth.api.setRole({
    body: { userId: "user-id", role: "admin" },
    headers: await headers(),
})
```

### パスワード設定

`POST /admin/set-user-password`

```typescript
const { data, error } = await authClient.admin.setUserPassword({
    newPassword: 'new-password',
    userId: 'user-id',
})
```

### ユーザー更新

`POST /admin/update-user`

```typescript
// クライアント
const { data, error } = await authClient.admin.updateUser({
    userId: "user-id",
    data: { name: "John Doe" },
})

// サーバー
const data = await auth.api.adminUpdateUser({
    body: { userId: "user-id", data: { name: "John Doe" } },
    headers: await headers(),
})
```

### ユーザー BAN

`POST /admin/ban-user`

```typescript
await authClient.admin.banUser({
    userId: "user-id",
    banReason: "Spamming",
    banExpiresIn: 60 * 60 * 24 * 7,
})
```

パラメータ:
- `userId` (string, 必須)
- `banReason` (string): BAN 理由
- `banExpiresIn` (number): 有効期限（秒）。undefined = 永久

### ユーザー BAN 解除

`POST /admin/unban-user`

```typescript
await authClient.admin.unbanUser({ userId: "user-id" })
```

### ユーザーセッション一覧

`POST /admin/list-user-sessions`

```typescript
const { data, error } = await authClient.admin.listUserSessions({
    userId: "user-id",
})
```

### セッション取り消し

`POST /admin/revoke-user-session`

```typescript
const { data, error } = await authClient.admin.revokeUserSession({
    sessionToken: "session_token_here",
})
```

### 全セッション取り消し

`POST /admin/revoke-user-sessions`

```typescript
const { data, error } = await authClient.admin.revokeUserSessions({
    userId: "user-id",
})
```

### ユーザーなりすまし

`POST /admin/impersonate-user`

```typescript
const { data, error } = await authClient.admin.impersonateUser({
    userId: "user-id",
})
```

管理者間のなりすましはデフォルトで無効。有効化するには:

```typescript
const superAdmin = ac.newRole({
  ...adminAc.statements,
  user: ["impersonate-admins", ...adminAc.statements.user],
})
```

### なりすまし停止

`POST /admin/stop-impersonating`

```typescript
await authClient.admin.stopImpersonating()
```

### ユーザー削除

`POST /admin/remove-user`

```typescript
const { data: deletedUser, error } = await authClient.admin.removeUser({
    userId: "user-id",
})
```

### 権限チェック

`POST /admin/has-permission`

```typescript
// クライアント
const canCreateProject = await authClient.admin.hasPermission({
    permissions: { project: ["create"] },
})

// サーバー
await auth.api.userHasPermission({
    body: {
        userId: 'id',
        permissions: { project: ["create"] },
    },
})

// ロールで直接チェック
await auth.api.userHasPermission({
    body: {
        role: "admin",
        permissions: { project: ["create"] },
    },
})
```

### ロール権限チェック（同期、クライアント側）

```typescript
const canCreateProject = authClient.admin.checkRolePermission({
    permissions: { user: ["delete"] },
    role: "admin",
})
```

## アクセス制御システム

### デフォルトロール

- **admin**: 全リソースと全アクションのフルコントロール
- **user**: 管理アクションなし

ユーザーは複数ロールをカンマ区切り文字列で保持可能。

### デフォルト権限

- **user リソース**: `create`, `list`, `set-role`, `ban`, `impersonate`, `impersonate-admins`, `delete`, `set-password`
- **session リソース**: `list`, `revoke`, `delete`

### カスタム権限設定

```typescript
// ステップ1: アクセス制御作成
import { createAccessControl } from "better-auth/plugins/access"

const statement = {
    project: ["create", "share", "update", "delete"],
} as const

const ac = createAccessControl(statement)

// ステップ2: ロール作成
export const user = ac.newRole({ project: ["create"] })
export const admin = ac.newRole({ project: ["create", "update"] })
export const myCustomRole = ac.newRole({
    project: ["create", "update", "delete"],
    user: ["ban"],
})

// デフォルト権限を含める場合
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

// ステップ3: サーバーに渡す
export const auth = betterAuth({
    plugins: [
        adminPlugin({
            ac,
            roles: { admin, user, myCustomRole }
        }),
    ],
})

// ステップ4: クライアントに渡す
export const client = createAuthClient({
    plugins: [
        adminClient({
            ac,
            roles: { admin, user, myCustomRole }
        })
    ]
})
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `defaultRole` | string | `"user"` | デフォルトロール |
| `adminRoles` | string[] | `["admin"]` | 管理者とみなすロール |
| `adminUserIds` | string[] | `[]` | 管理者として扱うユーザー ID |
| `impersonationSessionDuration` | number | 3600（1時間） | なりすましセッション時間（秒） |
| `defaultBanReason` | string | `"No reason"` | デフォルト BAN 理由 |
| `defaultBanExpiresIn` | number | undefined（永久） | デフォルト BAN 期限（秒） |
| `bannedUserMessage` | string | `"You have been banned..."` | BAN ユーザーへのメッセージ |

## DB スキーマ

### user テーブル追加フィールド

| フィールド | 型 | 説明 |
|---|---|---|
| `role` | string | ユーザーのロール。デフォルト `user` |
| `banned` | boolean | BAN 状態 |
| `banReason` | string | BAN 理由 |
| `banExpires` | date | BAN 有効期限 |

### session テーブル追加フィールド

| フィールド | 型 | 説明 |
|---|---|---|
| `impersonatedBy` | string | なりすまし元の管理者 ID |

## 注意点

- メール列挙保護を使用している場合（`requireEmailVerification` または `autoSignIn: false`）、`customSyntheticUser` の設定が必要:

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

- 全管理操作にはユーザー認証と管理者権限が必要
- BAN されたユーザーはサインインできず、既存セッションは全て取り消される
- カスタムアクセス制御使用時は `adminRoles` は不要
