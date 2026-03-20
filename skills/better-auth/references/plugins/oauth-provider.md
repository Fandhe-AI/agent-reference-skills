# OAuth Provider

OAuth 2.1 Provider プラグインは、Better Auth サーバーを OAuth 2.1 準拠の認可プロバイダーに変換する。OIDC 互換、動的クライアント登録、JWT/JWKS 統合、MCP サポートを提供する。

サポートするグラントタイプ: `authorization_code`（PKCE S256 必須）、`refresh_token`（offline_access スコープ）、`client_credentials`（M2M）

## セットアップ

### インストール

```typescript
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"
import { oauthProvider } from "@better-auth/oauth-provider"

const auth = betterAuth({
    disabledPaths: ["/token"],
    plugins: [
        jwt(),
        oauthProvider({
            loginPage: "/sign-in",
            consentPage: "/consent",
        })
    ],
})
```

マイグレーション:

```bash
npx auth migrate
# または
npx auth generate
```

### Well-Known エンドポイント

OpenID Configuration (`/.well-known/openid-configuration/route.ts`):

```typescript
import { oauthProviderOpenIdConfigMetadata } from "@better-auth/oauth-provider"
import { auth } from "@/lib/auth"
export const GET = oauthProviderOpenIdConfigMetadata(auth)
```

OAuth Authorization Server (`/.well-known/oauth-authorization-server/[issuer-path]/route.ts`):

```typescript
import { oauthProviderAuthServerMetadata } from "@better-auth/oauth-provider"
import { auth } from "@/lib/auth"
export const GET = oauthProviderAuthServerMetadata(auth)
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { oauthProviderClient } from "@better-auth/oauth-provider/client"

export const authClient = createAuthClient({
    plugins: [oauthProviderClient()],
})
```

### リソースサーバークライアント

```typescript
import { auth } from "@/lib/auth"
import { createAuthClient } from "better-auth/client"
import { oauthProviderResourceClient } from "@better-auth/oauth-provider/resource-client"

export const serverClient = createAuthClient({
    plugins: [oauthProviderResourceClient(auth)],
})
```

## 主要 API メソッド

### OAuth クライアント管理

- `authClient.oauth2.getClient({ query: { client_id } })` - クライアント取得
- `authClient.oauth2.publicClient({ query: { client_id } })` - 公開クライアント情報取得
- `authClient.oauth2.getClients()` - クライアント一覧
- `authClient.oauth2.createClient({ redirect_uris: [...] })` - クライアント作成
- `auth.api.adminCreateOAuthClient(...)` - 管理者クライアント作成
- `authClient.oauth2.updateClient({ client_id, update })` - 更新
- `authClient.oauth2.client.rotateSecret({ client_id })` - シークレットローテーション
- `authClient.oauth2.deleteClient({ client_id })` - 削除

### 同意管理

- `authClient.oauth2.consent({ accept, scope })` - 同意の承認/拒否
- `authClient.oauth2.getConsent({ query: { id } })` - 同意取得
- `authClient.oauth2.getConsents()` - 同意一覧
- `authClient.oauth2.deleteConsent({ id })` - 同意取り消し

### 動的クライアント登録

```typescript
oauthProvider({
    allowDynamicClientRegistration: true,
    allowUnauthenticatedClientRegistration: true,
})

const client = await authClient.oauth2.register({
    client_name: "My Client",
    redirect_uris: ["https://client.example.com/callback"],
})
```

### トークン検証

```typescript
import { verifyAccessToken } from "better-auth/oauth2"

const payload = await verifyAccessToken(accessToken, {
    verifyOptions: {
        issuer: "https://auth.example.com",
        audience: "https://api.example.com",
    },
    scopes: ["read:post"],
})
```

## 設定オプション

### リダイレクトスクリーン

```typescript
oauthProvider({
    loginPage: "/sign-in",
    consentPage: "/consent",
    signUp: { page: "/sign-up", shouldRedirect: async ({ headers }) => { ... } },
    selectAccount: { page: "/select-account", shouldRedirect: async ({ headers }) => { ... } },
    postLogin: { page: "/select-organization", shouldRedirect: async ({ session, scopes, headers }) => { ... } },
})
```

### 有効期限

```typescript
oauthProvider({
    accessTokenExpiresIn: "1h",
    m2mAccessTokenExpiresIn: "1h",
    idTokenExpiresIn: "10h",
    refreshTokenExpiresIn: "30d",
    codeExpiresIn: "10m",
    scopeExpirations: { "write:payments": "5m" },
})
```

### スコープとクレーム

```typescript
oauthProvider({
    scopes: ["openid", "profile", "offline_access", "read:post"],
    customIdTokenClaims: ({ user, scopes, metadata }) => ({ locale: "en-GB" }),
    customAccessTokenClaims: ({ user, scopes, referenceId }) => ({ ... }),
    customUserInfoClaims: ({ user, scopes, jwt }) => ({ ... }),
})
```

### ストレージ

```typescript
oauthProvider({
    storeClientSecret: "hashed", // "encrypted" | "plain"
    storeTokens: "hashed",
})
```

### レート制限

```typescript
oauthProvider({
    rateLimit: {
        token: { window: 60, max: 20 },
        authorize: { window: 60, max: 30 },
        introspect: { window: 60, max: 100 },
        revoke: { window: 60, max: 30 },
        register: { window: 60, max: 5 },
        userinfo: { window: 60, max: 60 },
    },
})
```

### Pairwise Subject Identifiers

```typescript
oauthProvider({ pairwiseSecret: "your-256-bit-secret" })
```

クライアントごとにユニークでリンク不可能な `sub` を提供（相関防止）。

## DB スキーマ

### oauthClient

主要フィールド: `id`, `clientId`, `clientSecret?`, `disabled?`, `skipConsent?`, `enableEndSession?`, `subjectType?`, `scopes?`, `userId?`, `referenceId?`, `redirectUris`, `tokenEndpointAuthMethod?`, `grantTypes?`, `responseTypes?`, `public?`, `requirePKCE?`, `metadata?`

### oauthRefreshToken

`id`, `token`, `clientId`, `sessionId?`, `userId`, `referenceId?`, `scopes`, `revoked?`, `authTime?`, `createdAt`, `expiresAt`

### oauthAccessToken

`id`, `token`, `clientId`, `sessionId?`, `refreshId?`, `userId?`, `referenceId?`, `scopes`, `createdAt`, `expiresAt`

### oauthConsent

`id`, `userId`, `clientId`, `referenceId?`, `scopes`, `createdAt`, `updatedAt`

## MCP 統合

```typescript
import { mcpHandler } from "@better-auth/oauth-provider"

const handler = mcpHandler({
    jwksUrl: "https://auth.example.com/api/auth/jwks",
    verifyOptions: { issuer: "https://auth.example.com", audience: "https://api.example.com" },
}, (req, jwt) => {
    return createMcpHandler(/* ... */)(req)
})
```

## 注意点

- PKCE はデフォルトで必須（OAuth 2.1）。レガシーの機密クライアントでのみ無効化可能
- クライアントシークレットはデフォルトでハッシュ化。一度だけ表示
- リフレッシュトークンはリフレッシュリクエストごとにローテーション
- `disableJwtPlugin: true` で不透明アクセストークンのみモードに切り替え可能
- OIDC Provider プラグインからの移行ガイドあり（スキーマ変更を含む）
