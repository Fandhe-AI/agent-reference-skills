# OAuth Proxy

OAuth Proxy プラグインは、本番サーバーを通じて OAuth リクエストをプロキシすることを可能にする。リダイレクト URL が事前に決定できない開発環境やプレビューデプロイメントに有用で、複数の環境が単一の OAuth クライアント登録を共有できる。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { oAuthProxy } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        oAuthProxy({
            productionURL: "https://my-production-app.com",
        }),
    ],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
    },
})
```

### OAuth プロバイダー設定

本番ドメインのみでコールバック URL を登録:

```
https://my-production-app.com/api/auth/callback/github
```

### 信頼済みオリジン

```typescript
export const auth = betterAuth({
    trustedOrigins: [
        "http://localhost:3000",
        "https://my-app-*-preview.example.com",
    ],
})
```

全環境でデータの暗号化/復号のため同じ `BETTER_AUTH_SECRET` を共有する必要がある。

### クライアント側

```typescript
await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard"
})
```

## 動作の仕組み

1. プレビューサーバーが OAuth を開始、本番のリダイレクト URI でプロバイダーにリダイレクト
2. OAuth プロバイダーが本番サーバーにコールバック
3. 本番がコードをトークンに交換しユーザー情報を取得
4. 本番がプロフィールデータを暗号化しプレビューサーバーにリダイレクト（本番の DB には書き込まない）
5. プレビューサーバーがプロフィールを復号し、自身の DB でユーザー/セッションを作成

暗号化されたプロフィールデータは URL クエリパラメータで渡され、同じシークレットを共有するサーバーでのみ復号可能。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `productionURL` | string | `BETTER_AUTH_URL` 環境変数 | 本番サーバー URL。`baseURL` と一致する場合はプロキシしない |
| `currentURL` | string | 自動検出 | アプリケーションの現在の URL。自動検出が失敗した場合のみ設定 |
| `maxAge` | number（秒） | `60` | 暗号化プロフィールペイロードの最大有効期間。リプレイ攻撃防止のため短く保つ（30-60秒） |

## 注意点

- 開発/プレビュー環境専用
- `baseURL` が `productionURL` と一致する場合、プロキシは行われない
- プレビューデプロイメントは本番とは別のデータベースを使用可能
- 全環境で同じ `BETTER_AUTH_SECRET` の共有が必須
