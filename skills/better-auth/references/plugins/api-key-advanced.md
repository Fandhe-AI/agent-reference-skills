# API Key Advanced

API Key プラグインの高度な機能: セッション生成、複数設定、組織所有キー、ストレージモード、レート制限、リフィル、カスタムキー生成。

## API キーからのセッション生成

API キー検証時にモックセッションを自動作成する。

```typescript
export const auth = betterAuth({
    plugins: [
        apiKey({
            enableSessionForAPIKeys: true,
        }),
    ],
})
```

ユーザー所有の API キー（`references: "user"`）でのみ動作。組織所有キーではセッションをモックできない。

`enableSessionForAPIKeys` 有効時、API キーはリクエストごとに1回検証され、レート制限が適用される。

### カスタムヘッダー設定

```typescript
// 複数ヘッダー
apiKey({ apiKeyHeaders: ["x-api-key", "xyz-api-key"] })

// カスタムゲッター
apiKey({
    customAPIKeyGetter: (ctx) => {
        const has = ctx.request.headers.has("x-api-key")
        if (!has) return null
        return ctx.request.headers.get("x-api-key")
    },
})
```

## 複数設定

異なるプレフィックス、レート制限、権限を持つ個別の API キー設定を定義する。

```typescript
apiKey([
    {
        configId: "public",
        defaultPrefix: "pk_",
        rateLimit: {
            enabled: true,
            maxRequests: 100,
            timeWindow: 1000 * 60 * 60,
        },
    },
    {
        configId: "secret",
        defaultPrefix: "sk_",
        enableMetadata: true,
        rateLimit: {
            enabled: true,
            maxRequests: 1000,
            timeWindow: 1000 * 60 * 60,
        },
    },
])
```

### 特定設定でのキー作成

```typescript
// パブリックキー → pk_...
const publicKey = await auth.api.createApiKey({
    body: { configId: "public", userId: user.id },
})

// シークレットキー → sk_...
const secretKey = await auth.api.createApiKey({
    body: {
        configId: "secret",
        userId: user.id,
        metadata: { plan: "premium" },
    },
})
```

全操作に `configId` 指定が必要。

### グローバルオプション

```typescript
apiKey(
    [
        { configId: "public", defaultPrefix: "pk_" },
        { configId: "secret", defaultPrefix: "sk_" },
    ],
    { schema: { /* カスタムスキーマ */ } }
)
```

## 組織所有 API キー

```typescript
apiKey([
    { configId: "user-keys", defaultPrefix: "user_", references: "user" },
    { configId: "org-keys", defaultPrefix: "org_", references: "organization" },
])
```

### 組織キー作成

```typescript
const orgKey = await auth.api.createApiKey({
    body: { configId: "org-keys", organizationId: "org_123" },
})
```

### アクセス制御と権限

| アクション | 権限 | 説明 |
|---|---|---|
| Create | `apiKey: ["create"]` | 組織 API キーの作成 |
| Read/List | `apiKey: ["read"]` | 組織 API キーの閲覧と一覧 |
| Update | `apiKey: ["update"]` | 組織 API キーの変更 |
| Delete | `apiKey: ["delete"]` | 組織 API キーの削除 |

### ロール設定

```typescript
import { createAccessControl } from "better-auth/plugins/access"

const statements = { apiKey: ["create", "read", "update", "delete"] } as const
const ac = createAccessControl(statements)
const adminRole = ac.newRole({ apiKey: ["create", "read", "update", "delete"] })
const memberRole = ac.newRole({ apiKey: ["read"] })

export const auth = betterAuth({
    plugins: [
        organization({
            ac,
            roles: { admin: adminRole, member: memberRole },
            async sendInvitationEmail() {},
        }),
        apiKey([{ configId: "org-keys", defaultPrefix: "org_", references: "organization" }]),
    ],
})
```

組織 owner（`creatorRole`、デフォルト `"owner"`）は全 API キー操作に自動的にフルアクセス。

エラーコード:
- `USER_NOT_MEMBER_OF_ORGANIZATION`
- `INSUFFICIENT_API_KEY_PERMISSIONS`

## ストレージモード

### データベース（デフォルト）

```typescript
apiKey({ storage: "database" })
```

### セカンダリストレージのみ

```typescript
const redis = createClient()
await redis.connect()

export const auth = betterAuth({
    secondaryStorage: {
        get: async (key) => await redis.get(key),
        set: async (key, value, ttl) => {
            if (ttl) await redis.set(key, value, { EX: ttl })
            else await redis.set(key, value)
        },
        delete: async (key) => await redis.del(key),
    },
    plugins: [apiKey({ storage: "secondary-storage" })],
})
```

### セカンダリストレージ + DB フォールバック

セカンダリストレージを先にチェック。見つからない場合は DB にクエリし、自動的にセカンダリストレージに格納。書き込みは両方に行われる。

```typescript
apiKey({ storage: "secondary-storage", fallbackToDatabase: true })
```

### カスタムストレージ

```typescript
apiKey({
    storage: "secondary-storage",
    customStorage: {
        get: async (key) => await customStorage.get(key),
        set: async (key, value, ttl) => await customStorage.set(key, value, ttl),
        delete: async (key) => await customStorage.delete(key),
    },
})
```

## レート制限

API キーが検証されるたびに適用される（`/api-key/verify` エンドポイントおよびセッション作成用の API キー使用時）。

### デフォルト設定

```typescript
apiKey({
    rateLimit: {
        enabled: true,
        timeWindow: 1000 * 60 * 60 * 24, // 1日
        maxRequests: 10,
    },
})
```

### キーごとのカスタマイズ

```typescript
const apiKey = await auth.api.createApiKey({
    body: {
        rateLimitEnabled: true,
        rateLimitTimeWindow: 1000 * 60 * 60 * 24,
        rateLimitMax: 10,
    },
    headers: await headers(),
})
```

### スライディングウィンドウアルゴリズム

1. 最初のリクエスト: 許可、`requestCount` を1に設定
2. ウィンドウ内: `requestCount` を増分。`rateLimitMax` に達すると `RATE_LIMITED` エラーで拒否
3. ウィンドウリセット: 最終リクエストからの経過時間が `timeWindow` を超えるとカウンタリセット
4. 超過レスポンス: `tryAgainIn` ミリ秒値を含む

## Remaining, Refill, Expiration

### Remaining カウント

API キーが使用されるたびに `remaining` カウントが更新される。`null` の場合は制限なし。0になるとキーは無効化・削除される。

### Refill

API キー使用時に最終リフィルからの経過時間が `refillInterval` を超えると、`remaining` が `refillAmount` にリセットされる。

### Expiration

`expiresIn` が設定されていない場合、API キーは無期限。設定されている場合、その時間後に期限切れとなる。

## カスタムキー生成と検証

```typescript
apiKey({
    customKeyGenerator: (options: { length: number, prefix: string | undefined }) => {
        return mySuperSecretApiKeyGenerator(options.length, options.prefix)
    },
    customAPIKeyValidator: async ({ ctx, key }) => {
        const res = await keyService.verify(key)
        return res.valid
    },
})
```

`customKeyGenerator` で `length` プロパティを使用しない場合、`defaultKeyLength` を設定する必要がある。

## メタデータ

```typescript
// 有効化
apiKey({ enableMetadata: true })

// メタデータ付きで作成
const apiKey = await auth.api.createApiKey({
    body: { metadata: { plan: "premium" } },
})
```

## 注意点

- `verifyApiKey()` で手動検証後に `getSession()` で同じ API キーヘッダーを使用すると、レート制限カウンタが2回インクリメントされる。`enableSessionForAPIKeys: true` を使用するか、検証結果を再利用すること
- 組織所有キーはユーザーセッションをモックできない
