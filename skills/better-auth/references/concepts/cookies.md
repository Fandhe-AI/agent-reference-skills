# Cookies

Better Auth は Cookie を使用してセッショントークン、セッションデータ、OAuth 状態、その他の認証関連情報を保存する。すべての Cookie は auth オプションの `secret` キーまたは `BETTER_AUTH_SECRET` 環境変数を使用して暗号的に署名される。バージョン管理されたシークレットでのローテーション時、暗号化された Cookie データは現在のキーを自動的に使用し、以前のキーでも復号可能。

## 設定オプション

| Option | Purpose | Default | Type |
|--------|---------|---------|------|
| `cookiePrefix` | 全 Cookie 名のプレフィックス | `"better-auth"` | string |
| `cookies` | カスタム Cookie 名と属性 | 下記デフォルト参照 | object |
| `crossSubDomainCookies.enabled` | サブドメイン間共有の有効化 | `false` | boolean |
| `crossSubDomainCookies.domain` | Cookie 共有のルートドメイン | — | string |
| `useSecureCookies` | 非本番環境でも Secure フラグを強制 | `false` | boolean |

### デフォルト Cookie

- **`session_token`**: セッショントークンを保存
- **`session_data`**: Cookie キャッシュ有効時にセッションデータを保存
- **`dont_remember`**: `rememberMe` 無効時のフラグを保存
- **`two_factor`**: 二要素認証プラグイン使用時（プラグイン依存）

## コード例

### カスタム Cookie プレフィックスの設定

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    cookiePrefix: "my-app",
  },
});
```

### カスタム Cookie 名と属性

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    cookies: {
      session_token: {
        name: "custom_session_token",
        attributes: {
          // カスタム Cookie 属性を設定
        },
      },
    },
  },
});
```

### クロスサブドメイン設定

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "app.example.com",
    },
  },
  trustedOrigins: [
    "https://example.com",
    "https://app1.example.com",
    "https://app2.example.com",
  ],
});
```

### Secure Cookie の強制

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    useSecureCookies: true,
  },
});
```

## Safari ITP とクロスドメインソリューション

Safari の Intelligent Tracking Prevention (ITP) はサードパーティ Cookie をブロックする。フロントエンドと API が異なるドメインにある場合、Safari で認証が失敗する可能性がある。

### 問題シナリオ

```
Frontend: https://app.domainB.com
API:      https://domainA.com
```

`credentials: "include"` 付きリクエストで、Safari は `domainA.com` をサードパーティとして扱い、`Set-Cookie` ヘッダーが無視され、セッションが失敗する。

### ソリューション 1: リバースプロキシ

API 呼び出しをフロントエンドのドメインを通じてルーティング:

**Netlify 設定:**

```toml
[[redirects]]
  from = "/api/*"
  to = "https://domainA.com/api/:splat"
  status = 200
  force = true
```

**Vercel 設定:**

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://domainA.com/api/:path*"
    }
  ]
}
```

### ソリューション 2: 共有親ドメイン

共通の親ドメイン構造を使用:

```
https://app.example.com
https://api.example.com
```

クロスサブドメイン Cookie を有効化:

```typescript
export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "example.com",
    },
  },
});
```

## セキュリティ考慮事項

- **HTTP-Only**: 本番環境ではすべての Cookie がデフォルトで `httpOnly`（JavaScript アクセスを防止）
- **Secure フラグ**: 本番環境では Cookie は自動的に Secure フラグを使用
- **ドメイン制限**: クロスサブドメイン Cookie は必要な場合のみ有効にし、ドメインは必要最小限のスコープに設定
- **信頼されないサブドメイン**: 侵害される可能性のあるサブドメインには注意。信頼されないサービスには別ドメインを検討
- **署名**: Cookie は改ざん防止のため暗号的に署名される
- **本番モード**: 非本番環境ではセキュリティを強制するために明示的に `useSecureCookies: true` が必要

## 注意点

- Cookie の命名パターン: `${prefix}.${cookie_name}`（例: `better-auth.session_token`）
- プラグインは追加の Cookie を導入する可能性がある（プラグインドキュメントを参照）
- Cookie によるセッションデータキャッシュは明示的な有効化が必要
- バージョン管理されたシークレットはキーローテーション時の Cookie 復号を自動的に管理
