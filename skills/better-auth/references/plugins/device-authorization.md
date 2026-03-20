# Device Authorization

Device Authorization プラグインは、RFC 8628 OAuth 2.0 Device Authorization Grant を実装し、スマート TV、CLI アプリケーション、IoT デバイス、ゲームコンソールなど入力能力が限られたデバイスでの認証を可能にする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { deviceAuthorization } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        deviceAuthorization({
            verificationUri: "/device",
        }),
    ],
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
import { deviceAuthorizationClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        deviceAuthorizationClient(),
    ],
})
```

## API メソッド

### デバイスコード要求

`POST /device/code`

```typescript
const { data, error } = await authClient.device.code({
    client_id,  // 必須
    scope,      // 任意
})
```

レスポンス: `user_code`, `device_code`, `verification_uri`, `verification_uri_complete`, `interval`, `expires_in`

### トークンポーリング

`POST /device/token`

```typescript
const { data, error } = await authClient.device.token({
    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    device_code,  // 必須
    client_id,    // 必須
})
```

認可成功時にアクセストークンを返す。

### ユーザーコード検証

```typescript
const response = await authClient.device({
    query: { user_code: formattedCode },
})
```

### デバイス承認

`POST /device/approve`

```typescript
const { data, error } = await authClient.device.approve({
    userCode,  // 必須
})
```

### デバイス拒否

`POST /device/deny`

```typescript
const { data, error } = await authClient.device.deny({
    userCode,  // 必須
})
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `verificationUri` | string | `/device` | ユーザーがコードを入力する URL（絶対または相対） |
| `expiresIn` | string | `30m` | デバイスコードの有効期限 |
| `interval` | string | `5s` | 最小ポーリング間隔 |
| `userCodeLength` | number | `8` | ユーザーフレンドリーなコードの長さ |
| `deviceCodeLength` | number | `40` | デバイス検証コードの長さ |
| `generateDeviceCode` | function | - | カスタムデバイスコード生成 |
| `generateUserCode` | function | - | カスタムユーザーコード生成 |
| `validateClient` | function | - | クライアント ID の検証 |
| `onDeviceAuthRequest` | function | - | 認可要求時のフック |

### カスタムコード生成例

```typescript
deviceAuthorization({
    generateDeviceCode: async () => crypto.randomBytes(32).toString("hex"),
    generateUserCode: async () => {
        const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        let code = ""
        for (let i = 0; i < 8; i++) {
            code += charset[Math.floor(Math.random() * charset.length)]
        }
        return code
    },
})
```

### クライアント検証例

```typescript
deviceAuthorization({
    validateClient: async (clientId) => {
        const client = await db.oauth_clients.findOne({ id: clientId })
        return client && client.allowDeviceFlow
    },
})
```

## DB スキーマ

### deviceCode テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| deviceCode | string | - | デバイス検証コード |
| userCode | string | - | ユーザーフレンドリーなコード |
| userId | string | - | 承認/拒否したユーザー（nullable） |
| clientId | string | - | OAuth クライアント識別子（nullable） |
| scope | string | - | 要求スコープ（nullable） |
| status | string | - | pending, approved, denied |
| expiresAt | Date | - | 有効期限 |
| lastPolledAt | Date | - | 最終ポーリング日時（nullable） |
| pollingInterval | number | - | ポーリング間隔（秒、nullable） |

## エラーコード

| コード | 意味 |
|---|---|
| `authorization_pending` | ユーザーがまだ承認していない（ポーリング継続） |
| `slow_down` | ポーリング頻度が高すぎる（間隔を延長） |
| `expired_token` | デバイスコードが期限切れ |
| `access_denied` | ユーザーが認可を拒否 |
| `invalid_grant` | 無効なデバイスコードまたはクライアント ID |

## 注意点

- ポーリング間隔を強制し、乱用を防止
- コードは設定された時間後に期限切れ（デフォルト30分）
- 本番環境では常にクライアント ID を検証すること
- 本番ではデバイス認可に HTTPS を使用
- ユーザーコードは類似文字（0/O, 1/I）を除外した限定文字セットを使用
- 承認/拒否にはユーザー認証が必要
