# OIDC Provider

OIDC Provider プラグインは、独自の OpenID Connect プロバイダーを構築・管理し、外部サービスに依存せずにユーザー認証を完全に制御することを可能にする。

**ステータス**: このプラグインは近い将来、OAuth Provider プラグインに置き換えられる予定。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { oidcProvider } from "better-auth/plugins"

const auth = betterAuth({
    plugins: [
        oidcProvider({
            loginPage: "/sign-in",
        })
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
import { oidcClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
    plugins: [
        oidcClient()
    ]
})
```

## API メソッド

### OAuth アプリケーション登録

```typescript
// クライアント
const { data, error } = await authClient.oauth2.register({
    redirect_uris: ["https://client.example.com/callback"],
    token_endpoint_auth_method: "client_secret_basic",
    grant_types: ["authorization_code"],
    response_types: ["code"],
    client_name: "My App",
    client_uri: "https://client.example.com",
    logo_uri: "https://client.example.com/logo.png",
    scope: "profile email",
    contacts: ["admin@example.com"],
    tos_uri: "https://client.example.com/tos",
    policy_uri: "https://client.example.com/policy",
    metadata: {"key": "value"},
    software_id: "my-software",
    software_version: "1.0.0",
})

// サーバー
const data = await auth.api.registerOAuthApplication({
    body: { /* 同じパラメータ */ },
})
```

登録パラメータ:

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| `redirect_uris` | string[] | Yes | リダイレクト URI のリスト |
| `token_endpoint_auth_method` | `"none" \| "client_secret_basic" \| "client_secret_post"` | No | トークンエンドポイント認証方法 |
| `grant_types` | string[] | No | サポートするグラントタイプ |
| `response_types` | `("code" \| "token")[]` | No | サポートするレスポンスタイプ |
| `client_name` | string | No | アプリケーション名 |
| `scope` | string | No | スペース区切りのスコープ |

### UserInfo エンドポイント

`GET /oauth2/userinfo`

```typescript
const response = await fetch('https://your-domain.com/api/auth/oauth2/userinfo', {
    headers: { 'Authorization': 'Bearer ACCESS_TOKEN' }
})
const userInfo = await response.json()
```

返されるクレーム:
- `openid` スコープ: `sub`
- `profile` スコープ: `name`, `picture`, `given_name`, `family_name`
- `email` スコープ: `email`, `email_verified`

### 同意エンドポイント

`POST /oauth2/consent`

```typescript
// URL パラメータ経由
const params = new URLSearchParams(window.location.search)
const consentCode = params.get('consent_code')
const res = await authClient.oauth2.consent({
    accept: true,
    consent_code: consentCode,
})

// Cookie ベース
const res = await authClient.oauth2.consent({
    accept: true,
})
```

## 設定オプション

```typescript
interface OIDCProviderOptions {
    allowDynamicClientRegistration?: boolean  // デフォルト: false
    metadata?: OIDCMetadata
    loginPage: string
    consentPage?: string
    trustedClients?: (Client & { skipConsent?: boolean })[]
    getAdditionalUserInfoClaim?: (user, scopes, client) => Record<string, any>
    useJWTPlugin?: boolean  // デフォルト: false
    schema?: AuthPluginSchema
}
```

### 信頼済みクライアント

```typescript
oidcProvider({
    loginPage: "/sign-in",
    trustedClients: [
        {
            clientId: "internal-dashboard",
            clientSecret: "secure-secret-here",
            name: "Internal Dashboard",
            type: "web",
            redirectUrls: ["https://dashboard.company.com/auth/callback"],
            disabled: false,
            skipConsent: true,
            metadata: { internal: true }
        },
    ]
})
```

### カスタムクレーム

```typescript
oidcProvider({
    loginPage: "/sign-in",
    getAdditionalUserInfoClaim: async (user, scopes, client) => {
        const claims = {}
        if (scopes.includes("profile")) {
            claims.department = user.department
        }
        return claims
    }
})
```

### JWT プラグイン統合

```typescript
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
    disabledPaths: ["/token"],
    plugins: [
        jwt(),
        oidcProvider({ useJWTPlugin: true, loginPage: "/sign-in" })
    ]
})
```

`useJWTPlugin: false`（デフォルト）の場合、ID トークンは HMAC-SHA256 でアプリケーションシークレットを使用して署名される。

## DB スキーマ

### oauthApplication テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | DB ID |
| clientId | string | - | OAuth クライアントの一意識別子 |
| clientSecret | string | ? | シークレットキー（パブリッククライアントは任意） |
| name | string | - | クライアント名 |
| redirectUrls | string | - | カンマ区切りリダイレクト URL |
| metadata | string | ? | 追加メタデータ |
| type | string | - | クライアントタイプ（web, mobile 等） |
| disabled | boolean | ? | 無効化状態 |
| userId | string | FK? | 所有者ユーザー ID |
| createdAt | Date | - | 作成日時 |
| updatedAt | Date | - | 更新日時 |

### oauthAccessToken テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | DB ID |
| accessToken | string | - | アクセストークン |
| refreshToken | string | - | リフレッシュトークン |
| accessTokenExpiresAt | Date | - | アクセストークン有効期限 |
| refreshTokenExpiresAt | Date | - | リフレッシュトークン有効期限 |
| clientId | string | FK | OAuth クライアント ID |
| userId | string | FK? | 関連ユーザー ID |
| scopes | string | - | カンマ区切りスコープ |
| createdAt | Date | - | 作成日時 |
| updatedAt | Date | - | 更新日時 |

### oauthConsent テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | DB ID |
| userId | string | FK | 同意したユーザー |
| clientId | string | FK | OAuth クライアント ID |
| scopes | string | - | カンマ区切り同意スコープ |
| consentGiven | boolean | - | 同意状態 |
| createdAt | Date | - | 作成日時 |
| updatedAt | Date | - | 更新日時 |

## 注意点

- デフォルトではクライアント登録に認証が必要。`allowDynamicClientRegistration: true` でパブリック登録を許可
- `skipConsent: true` の信頼済みクライアントは同意画面を完全にバイパス
- OIDC 準拠のため `/token` エンドポイントを無効化し `/oauth2/token` を使用すること
- 開発中のプラグインであり、本番使用には適さない可能性がある
- OAuth Provider プラグインへの移行を推奨
