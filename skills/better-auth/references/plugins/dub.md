# Dub

Dub のリンク管理プラットフォームと Better Auth を統合するプラグイン。Dub リンク経由でサインアップした際のリードトラッキングと、OAuth リンクをサポートする。

## インストール

```bash
npm install @dub/better-auth dub
```

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { dubAnalytics } from "@dub/better-auth"
import { Dub } from "dub"

const dubClient = new Dub({ token: process.env.DUB_API_KEY })

export const auth = betterAuth({
    plugins: [
        dubAnalytics({
            dubClient,
            leadEventName: "signup"
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { dubAnalyticsClient } from "@dub/better-auth/client"

export const authClient = createAuthClient({
    plugins: [dubAnalyticsClient()]
})
```

## 機能

### リードトラッキング

サインアップイベントを自動的に Dub のリードとしてトラッキング。`disableLeadTracking: true` で無効化できる。

### OAuth リンク

```typescript
// Dub との OAuth 連携
await authClient.dub.link({ callbackURL: "/dashboard" })

// サーバー側
const result = await auth.api.dubLink({ headers: req.headers })
```

## 設定オプション

| プロパティ | 型 | 説明 |
|---|---|---|
| `dubClient` | Dub | Dub クライアントインスタンス |
| `disableLeadTracking?` | boolean | リードトラッキングの無効化 |
| `leadEventName?` | string | サインアップリードのカスタムイベント名 |
| `customLeadTrack?` | function | カスタムリードトラッキング関数 |
| `oauth.clientId?` | string | OAuth クライアント識別子 |
| `oauth.clientSecret?` | string | OAuth クライアントシークレット |
| `oauth.pkce?` | boolean | PKCE セキュリティフローの有効化 |

## Related

- [generic-oauth.md](./generic-oauth.md)
