# Generic OAuth

Generic OAuth プラグインは、任意の OAuth プロバイダーとの柔軟な統合を提供し、OAuth 2.0 と OpenID Connect（OIDC）フローの両方をサポートする。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        genericOAuth({
            config: [{
                providerId: "provider-id",
                clientId: "test-client-id",
                clientSecret: "test-client-secret",
                discoveryUrl: "https://auth.example.com/.well-known/openid-configuration"
            }]
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { genericOAuthClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        genericOAuthClient()
    ]
})
```

## API メソッド

### OAuth2 サインイン

```typescript
// クライアント
const { data, error } = await authClient.signIn.oauth2({
    providerId: "provider-id",
    callbackURL: "/dashboard",
    errorCallbackURL: "/error-page",
    newUserCallbackURL: "/welcome",
    disableRedirect: false,
    scopes: ["my-scope"],
    requestSignUp: false
})

// サーバー
const data = await auth.api.signInWithOAuth2({
    body: {
        providerId: "provider-id",
        callbackURL: "/dashboard",
        errorCallbackURL: "/error-page",
        newUserCallbackURL: "/welcome",
        disableRedirect: false,
        scopes: ["my-scope"],
        requestSignUp: false
    }
})
```

### OAuth アカウントリンク

```typescript
// クライアント
const { data, error } = await authClient.oauth2.link({
    providerId: "my-provider-id",
    callbackURL: "/successful-link"
})

// サーバー
const data = await auth.api.oAuth2LinkAccount({
    body: { providerId: "my-provider-id", callbackURL: "/successful-link" },
    headers: await headers()
})
```

### コールバック処理

プラグインは `/oauth2/callback/:providerId` にルートを自動マウントする。

デフォルトコールバック URL: `${baseURL}/api/auth/oauth2/callback/:providerId`

## プリコンフィグされたプロバイダー

- **Auth0**: `auth0(options)` - `domain` が必要
- **HubSpot**: `hubspot(options)`
- **Keycloak**: `keycloak(options)` - `issuer` が必要
- **LINE**: `line(options)` - `providerId` で複数リージョンをサポート
- **Microsoft Entra ID**: `microsoftEntraId(options)` - `tenantId` が必要
- **Okta**: `okta(options)` - `issuer` が必要
- **Slack**: `slack(options)`
- **Patreon**: `patreon(options)`

## 設定オプション

| オプション | 型 | 説明 |
|---|---|---|
| `providerId` | string | プロバイダー設定の一意識別子 |
| `discoveryUrl` | string | OIDC ディスカバリーエンドポイント URL |
| `issuer` | string | 検証用の期待される発行者識別子 |
| `requireIssuerValidation` | boolean | コールバックで issuer の存在を強制（デフォルト: `false`） |
| `authorizationUrl` | string | OAuth 認可エンドポイント |
| `tokenUrl` | string | トークン交換エンドポイント |
| `userInfoUrl` | string | ユーザープロフィール情報エンドポイント |
| `clientId` | string | OAuth クライアント ID |
| `clientSecret` | string | OAuth クライアントシークレット |
| `scopes` | string[] | 要求する OAuth スコープ |
| `redirectURI` | string | カスタムリダイレクト URL |
| `responseType` | string | OAuth レスポンスタイプ（デフォルト: `"code"`） |
| `prompt` | string | 認証体験の制御 |
| `pkce` | boolean | PKCE セキュリティを有効化（デフォルト: `false`） |
| `accessType` | string | リフレッシュトークン用に `"offline"` を使用 |
| `authentication` | string | トークン認証方法: `'basic'` or `'post'`（デフォルト: `'post'`） |
| `overrideUserInfo` | boolean | サインイン毎にユーザー情報を更新（デフォルト: `false`） |
| `disableImplicitSignUp` | boolean | 明示的なサインアップ意図を要求 |
| `disableSignUp` | boolean | 新規ユーザーサインアップを防止 |
| `getToken` | function | カスタムトークン交換ハンドラー |
| `getUserInfo` | function | カスタムユーザー情報取得 |
| `mapProfileToUser` | function | カスタムプロフィールマッピング |

## Issuer バリデーション

RFC 9207 に基づき、ミックスアップ攻撃を防止する。

| 条件 | `requireIssuerValidation` | 結果 |
|---|---|---|
| `iss` が期待値と一致 | - | 成功 |
| `iss` が不一致 | - | `issuer_mismatch` エラー |
| `iss` がない | `false` | 成功 |
| `iss` がない | `true` | `issuer_missing` エラー |

## 高度な使用方法

### カスタムトークン交換

```typescript
genericOAuth({
    config: [{
        providerId: "custom-provider",
        clientId: process.env.CUSTOM_CLIENT_ID,
        clientSecret: process.env.CUSTOM_CLIENT_SECRET,
        authorizationUrl: "https://provider.example.com/oauth/authorize",
        scopes: ["profile", "email"],
        getToken: async ({ code, redirectURI }) => {
            const response = await fetch(/* ... */)
            const data = await response.json()
            return {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                accessTokenExpiresAt: new Date(Date.now() + data.expires_in * 1000),
                scopes: data.scope?.split(" ") ?? [],
                raw: data
            }
        },
        getUserInfo: async (tokens) => {
            const response = await fetch(/* ... */)
            const data = await response.json()
            return {
                id: tokens.raw?.user_id,
                name: data.display_name,
                email: data.email,
                image: data.avatar_url,
                emailVerified: data.email_verified
            }
        }
    }]
})
```

### プロフィールマッピング

```typescript
mapProfileToUser: async (profile) => ({
    firstName: profile.given_name
})
```

## 注意点

- RFC 9207 に基づく issuer バリデーションでミックスアップ攻撃を防止
- `/oauth2/callback/:providerId` にルートを自動マウント
- `getToken` は非標準のトークンエンドポイントを持つプロバイダーに有用
- `raw` フィールドはプロバイダーからの元のトークンレスポンスを保持
