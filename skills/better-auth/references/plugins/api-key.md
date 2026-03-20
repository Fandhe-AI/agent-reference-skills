# API Key

API Key プラグインは、アプリケーション用の API キーの作成・管理を可能にし、API リクエストの認証と認可を提供する。レート制限、メタデータ、組織所有キー、セカンダリストレージをサポートする。

## セットアップ

### インストール

```bash
npm install @better-auth/api-key
```

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { apiKey } from "@better-auth/api-key"

export const auth = betterAuth({
    plugins: [
        apiKey()
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
import { apiKeyClient } from "@better-auth/api-key/client"

export const authClient = createAuthClient({
    plugins: [
        apiKeyClient()
    ]
})
```

## API メソッド

### API キー作成

`POST /api-key/create`

```typescript
// クライアント
const { data, error } = await authClient.apiKey.create({
    configId,
    name: 'project-api-key',
    expiresIn: 60 * 60 * 24 * 7,
    organizationId: "org-id",
    prefix: 'project-api-key',
    metadata: { someKey: 'someValue' },
})

// サーバー（追加パラメータあり）
const data = await auth.api.createApiKey({
    body: {
        configId,
        name: 'project-api-key',
        expiresIn: 60 * 60 * 24 * 7,
        userId: "user-id",
        organizationId: "org-id",
        prefix: 'project-api-key',
        remaining: 100,
        metadata: { someKey: 'someValue' },
        refillAmount: 100,
        refillInterval: 1000,
        rateLimitTimeWindow: 1000,
        rateLimitMax: 100,
        rateLimitEnabled: true,
        permissions,
    },
})
```

### API キー検証

```typescript
// クライアント
const { data, error } = await authClient.apiKey.verify({
    configId,
    key: "your_api_key_here",
    permissions: { projects: ["read", "read-write"] },
})

// サーバー
const data = await auth.api.verifyApiKey({
    body: {
        configId,
        key: "your_api_key_here",
        permissions: { projects: ["read", "read-write"] },
    },
})
```

レスポンス型: `{ valid: boolean, error: { message: string, code: string } | null, key: Omit<ApiKey, "key"> | null }`

### API キー取得

`GET /api-key/get`

```typescript
const { data, error } = await authClient.apiKey.get({
    query: { configId, id: "some-api-key-id" },
})
```

### API キー更新

`POST /api-key/update`

```typescript
// クライアント
const { data, error } = await authClient.apiKey.update({
    configId,
    keyId: "some-api-key-id",
    name: "some-api-key-name",
})

// サーバー（追加パラメータあり）
const data = await auth.api.updateApiKey({
    body: {
        configId,
        keyId: "some-api-key-id",
        userId: "some-user-id",
        name: "some-api-key-name",
        enabled: true,
        remaining: 100,
        refillAmount: 100,
        refillInterval: 1000,
        metadata: { "key": "value" },
        expiresIn: 60 * 60 * 24 * 7,
        rateLimitEnabled: true,
        rateLimitTimeWindow: 1000,
        rateLimitMax: 100,
        permissions,
    },
})
```

### API キー削除

`POST /api-key/delete`

```typescript
const { data, error } = await authClient.apiKey.delete({
    configId,
    keyId: "some-api-key-id",
})
```

ユーザー所有権を検証してから削除する。

### API キー一覧

`GET /api-key/list`

```typescript
const { data, error } = await authClient.apiKey.list({
    query: {
        configId,
        organizationId,
        limit,
        offset,
        sortBy,      // "createdAt" | "name" | "expiresAt"
        sortDirection, // "asc" | "desc"
    },
})
```

レスポンス: `{ apiKeys: Omit<ApiKey, "key">[], total: number, limit?: number, offset?: number }`

### 期限切れ API キー全削除

```typescript
const { data, error } = await authClient.apiKey.deleteAllExpiredApiKeys()
```

期限切れキーは API Key エンドポイントの呼び出し時に自動削除される（10秒のクールダウン付き）。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `configId` | string | `"default"` | マルチ設定セットアップ用の一意識別子 |
| `references` | `"user" \| "organization"` | `"user"` | API キーの所有タイプ |
| `apiKeyHeaders` | `string \| string[]` | `"x-api-key"` | API キーを確認するヘッダー名 |
| `storage` | `"database" \| "secondary-storage"` | `"database"` | ストレージバックエンド |
| `disableKeyHashing` | boolean | `false` | API キーハッシュの無効化（セキュリティリスク） |
| `deferUpdates` | boolean | `false` | パフォーマンス向上のため更新を遅延 |
| `enableSessionForAPIKeys` | boolean | `false` | API キーでセッションを表現可能にする |
| `fallbackToDatabase` | boolean | `false` | セカンダリストレージ使用時の DB フォールバック |
| `defaultKeyLength` | number | 64 | API キーの長さ（プレフィックス除く） |
| `defaultPrefix` | string | - | API キーのプレフィックス |
| `enableMetadata` | boolean | false | カスタムメタデータの保存を有効化 |
| `requireName` | boolean | false | 作成時にキー名を必須にする |

## DB スキーマ

### apikey テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | API キー識別子 |
| configId | string | - | 設定 ID（デフォルト: 'default'） |
| name | string | ? | API キー名 |
| start | string | ? | UI 表示用の先頭文字 |
| prefix | string | ? | プレーンテキストプレフィックス |
| key | string | - | ハッシュ化された API キー |
| referenceId | string | - | 所有者 ID（ユーザーまたは組織） |
| refillInterval | number | ? | リフィル間隔（ミリ秒） |
| refillAmount | number | ? | リフィル量 |
| lastRefillAt | Date | ? | 最終リフィル日時 |
| enabled | boolean | ? | 有効状態 |
| rateLimitEnabled | boolean | ? | レート制限状態 |
| rateLimitTimeWindow | number | ? | レート制限ウィンドウ（ミリ秒） |
| rateLimitMax | number | ? | ウィンドウあたりの最大リクエスト数 |
| requestCount | number | ? | 現在のウィンドウ内のリクエスト数 |
| remaining | number | ? | 残りリクエスト数 |
| lastRequest | Date | ? | 最終リクエスト日時 |
| expiresAt | Date | ? | 有効期限 |
| createdAt | Date | - | 作成日時 |
| updatedAt | Date | - | 最終更新日時 |
| permissions | string | ? | シリアライズされた権限 |
| metadata | string | ? | カスタムメタデータ（JSON） |

## 注意点

- API キーは機密クレデンシャルとして扱い、クライアント側コードに露出させないこと
- キーは安全に保存し、作成時に一度だけ表示すること
- ブルートフォース攻撃防止にレート制限を使用
- API キーのハッシュ化はデフォルトで有効。平文での保存はデータベース侵害時に脆弱
- プレフィックスにはアンダースコアの追加を推奨（例: `hello_`）
