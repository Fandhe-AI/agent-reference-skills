# SCIM

SCIM プラグインは、Better Auth に SCIM 2.0 準拠サーバーを公開し、サードパーティ ID プロバイダーがサービスへの ID 同期を可能にする。

## セットアップ

### インストール

```bash
npm install @better-auth/scim
```

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { scim } from "@better-auth/scim"

const auth = betterAuth({
    plugins: [scim()]
})
```

POST, GET, PUT, PATCH, DELETE の HTTP メソッドサポートが必要。

Next.js 例:

```typescript
import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
export const { POST, GET, PUT, PATCH, DELETE } = toNextJsHandler(auth)
```

マイグレーション:

```bash
npx auth migrate
# または
npx auth generate
```

## API メソッド

### SCIM トークン生成

```typescript
// クライアント
const { data, error } = await authClient.scim.generateToken({
    providerId: "acme-corp",
    organizationId: "the-org",
})

// サーバー
const data = await auth.api.generateSCIMToken({
    body: { providerId: "acme-corp", organizationId: "the-org" },
    headers: await headers(),
})
```

### プロバイダー接続一覧

```typescript
const { data, error } = await authClient.scim.listProviderConnections()
```

### プロバイダー接続詳細

```typescript
const { data, error } = await authClient.scim.getProviderConnection({
    query: { providerId: "acme-corp" },
})
```

### プロバイダー接続削除

```typescript
const { data, error } = await authClient.scim.deleteProviderConnection({
    providerId: "acme-corp",
})
```

### SCIM ユーザー操作

**一覧**: `GET /scim/v2/Users`

```typescript
const data = await auth.api.listSCIMUsers({
    query: { filter: 'userName eq "user-a"' },
    headers: { authorization: 'Bearer <token>' },
})
```

**取得**: `GET /scim/v2/Users/:userId`

**作成**: `POST /scim/v2/Users`

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

**更新**: `PUT /scim/v2/Users/:userId`

**部分更新**: `PATCH /scim/v2/Users/:userId`

```typescript
const data = await auth.api.patchSCIMUser({
    body: {
        schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
        Operations: [{ op: "replace", path: "/userName", value: "any value" }],
    },
    headers: { authorization: 'Bearer <token>' },
})
```

**削除**: `DELETE /scim/v2/Users/:userId`

### サービスプロバイダー設定

- `GET /scim/v2/ServiceProviderConfig`
- `GET /scim/v2/Schemas`
- `GET /scim/v2/Schemas/:schemaId`
- `GET /scim/v2/ResourceTypes`
- `GET /scim/v2/ResourceTypes/:resourceTypeId`

## 設定オプション

### プロバイダー所有権

```typescript
scim({ providerOwnership: { enabled: true } })
```

各 SCIM トークンを生成したユーザーにリンク。有効化後にマイグレーションが必要。

### デフォルト SCIM トークン

```typescript
scim({
    defaultSCIM: [{
        providerId: "default-scim",
        scimToken: "some-scim-token",
        organizationId: "the-org"
    }]
})
```

SCIM トークンは `base64(scimToken:providerId[:organizationId])` 形式で base64 エンコードが必要。

### トークン保存方法

```typescript
// 暗号化
scim({
    storeSCIMToken: {
        encrypt: async (scimToken) => myCustomEncryptor(scimToken),
        decrypt: async (scimToken) => myCustomDecryptor(scimToken),
    }
})

// ハッシュ
scim({
    storeSCIMToken: {
        hash: async (scimToken) => myCustomHasher(scimToken),
    }
})
```

デフォルト: プレーンテキスト

## ライフサイクルフック

```typescript
scim({
    beforeSCIMTokenGenerated: async ({ user, member, scimToken }) => {
        // 検証とインターセプト
    },
    afterSCIMTokenGenerated: async ({ user, member, scimToken, scimProvider }) => {
        // トークン共有や通知
    },
})
```

## DB スキーマ

### scimProvider テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | DB 識別子 |
| providerId | string | - | プロバイダー ID |
| scimToken | string | - | 認証用 Bearer トークン |
| organizationId | string | ? | 組織 ID（任意） |
| userId | string | ? | 所有者ユーザー ID（providerOwnership 有効時） |

## 注意点

- **重大なセキュリティ警告**: Better Auth インスタンスにアクセスできる認証済みユーザーは誰でも SCIM トークンを生成可能。マルチテナントシナリオでは重大なセキュリティリスク
- `beforeSCIMTokenGenerated` フックでトークン生成を管理者に制限すること:

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
