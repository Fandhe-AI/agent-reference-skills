# One-Time Token

One-Time Token（OTT）プラグインは、安全な使い捨てセッショントークンの生成と検証機能を提供する。主にクロスドメイン認証に使用される。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { oneTimeToken } from "better-auth/plugins/one-time-token"

export const auth = betterAuth({
    plugins: [
        oneTimeToken()
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { oneTimeTokenClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        oneTimeTokenClient()
    ]
})
```

## API メソッド

### トークン生成

`GET /one-time-token/generate`

```typescript
// クライアント
const { data, error } = await authClient.oneTimeToken.generate()

// サーバー
const data = await auth.api.generateOneTimeToken({
    headers: await headers(),  // セッション Cookie が必要
})
```

現在のセッションに紐づいた `token` を返す。デフォルトで3分間有効。

### トークン検証

`POST /one-time-token/verify`

```typescript
// クライアント
const { data, error } = await authClient.oneTimeToken.verify({
    token: "some-token",
})

// サーバー
const data = await auth.api.verifyOneTimeToken({
    body: { token: "some-token" },
})
```

トークンに紐づいたセッションを返す。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `disableClientRequest` | boolean | false | true の場合、サーバー側でのみトークン生成 |
| `expiresIn` | number | 3 | トークンの有効期間（分） |
| `generateToken` | function | - | カスタムトークン生成ロジック。`session` と `ctx` を受け取る |
| `storeToken` | "plain" \| "hashed" \| custom | "plain" | トークンの DB 保存方法 |

### トークン保存設定

```typescript
// プレーンテキスト（デフォルト）
oneTimeToken({ storeToken: "plain" })

// ビルトインハッシャー
oneTimeToken({ storeToken: "hashed" })

// カスタムハッシャー
oneTimeToken({
    storeToken: {
        type: "custom-hasher",
        hash: async (token) => myCustomHasher(token)
    }
})
```

## 注意点

- generate エンドポイントにはセッション Cookie が必要
- トークンは検証に一度だけ使用可能
- デフォルトの有効期限は3分
- クロスドメイン認証シナリオ向け設計
- `disableClientRequest` でトークン生成をサーバー側のみに制限可能
