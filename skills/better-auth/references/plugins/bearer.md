# Bearer

Bearer プラグインは、ブラウザ Cookie の代替として Bearer トークンによる認証を提供する。リクエストをインターセプトし、Authorization ヘッダーに Bearer トークンを追加して API に転送する。

**セキュリティ警告**: Cookie をサポートしない API や Bearer トークンを必要とする API にのみ使用すること。不適切な実装はセキュリティ脆弱性につながる可能性がある。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { bearer } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [bearer()]
})
```

### クライアント側

ステップ1: サインイン後に Bearer トークンを取得

```typescript
const { data } = await authClient.signIn.email({
    email: "user@example.com",
    password: "securepassword"
}, {
    onSuccess: (ctx) => {
        const authToken = ctx.response.headers.get("set-auth-token")
        localStorage.setItem("bearer_token", authToken)
    }
})
```

ステップ2: グローバル設定

```typescript
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    fetchOptions: {
        onSuccess: (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token")
            if (authToken) {
                localStorage.setItem("bearer_token", authToken)
            }
        }
    }
})
```

ステップ3: 自動トークン注入の設定

```typescript
import { createAuthClient } from "better-auth/client"

export const authClient = createAuthClient({
    fetchOptions: {
        auth: {
            type: "Bearer",
            token: () => localStorage.getItem("bearer_token") || ""
        }
    }
})
```

ステップ4: 認証済みリクエストの送信

```typescript
const { data } = await authClient.listSessions()
```

ステップ5: リクエスト単位のトークン上書き（任意）

```typescript
const { data } = await authClient.listSessions({
    fetchOptions: {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
})
```

## API メソッド

### Auth クライアント外での使用

クライアント側:

```typescript
const token = localStorage.getItem("bearer_token")

const response = await fetch("https://api.example.com/data", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
```

サーバー側のセッション検証:

```typescript
import { auth } from "@/lib/auth"

export async function handler(req, res) {
    const session = await auth.api.getSession({
        headers: req.headers
    })
    if (!session) {
        return res.status(401).json({ error: "Unauthorized" })
    }
}
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `requireSignature` | boolean | `false` | トークンの署名を要求する |

## レスポンスヘッダー

認証成功後のレスポンスに含まれるヘッダー名: `set-auth-token`

## 注意点

- トークンの保存方法: localStorage は基本的なもの。機密性の高いアプリケーションではより安全な代替を検討すること
- 常に HTTPS 経由でトークンを送信すること
- Cookie の保護機能をバイパスするため、API アーキテクチャ上 Cookie が使用できない場合にのみ使用すること
- 本番環境ではトークン整合性検証のため `requireSignature: true` を有効にすること
- トークンの有効期限切れを適切に処理するリフレッシュ機構を実装すること
