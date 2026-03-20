# JWT

JWT プラグインは、セッションを使用できないサービス向けに JWT トークンでのユーザー認証を可能にする。JWT トークン取得エンドポイントとトークン検証用の JWKS エンドポイントを提供する。

セッションの代替ではなく、JWT トークンを必要とするサービス向けに使用する。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        jwt(),
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
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        jwtClient()
    ]
})
```

## API メソッド

### トークン取得（クライアント）

```typescript
const { data, error } = await authClient.token()
if (data) {
    const jwtToken = data.token
}
```

### HTTP エンドポイント

`GET /api/auth/token`

レスポンス: `{ "token": "ey..." }`

### セッションヘッダー経由

```typescript
await authClient.getSession({
    fetchOptions: {
        onSuccess: (ctx) => {
            const jwt = ctx.response.headers.get("set-auth-jwt")
        }
    }
})
```

### JWKS エンドポイント

`GET /api/auth/jwks`

```json
{
    "keys": [{
        "crv": "Ed25519",
        "x": "bDHiLTt7u-VIU7rfmcltcFhaHKLVvWFy-_csKZARUEU",
        "kty": "OKP",
        "kid": "c5c7995d-0037-4553-8aee-b5b620b89b23"
    }]
}
```

## トークン検証

### リモート JWKS（Jose 使用）

```typescript
import { jwtVerify, createRemoteJWKSet } from 'jose'

async function validateToken(token: string) {
    const JWKS = createRemoteJWKSet(
        new URL('http://localhost:3000/api/auth/jwks')
    )
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: 'http://localhost:3000',
        audience: 'http://localhost:3000',
    })
    return payload
}
```

### ローカル JWKS

```typescript
import { jwtVerify, createLocalJWKSet } from 'jose'

async function validateToken(token: string) {
    const storedJWKS = { keys: [{ /* JWKS from /api/auth/jwks */ }] }
    const JWKS = createLocalJWKSet({ keys: storedJWKS.data?.keys! })
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: 'http://localhost:3000',
        audience: 'http://localhost:3000',
    })
    return payload
}
```

## 設定オプション

### アルゴリズム選択

```typescript
jwt({
    jwks: {
        keyPairConfig: {
            alg: "EdDSA",
            crv: "Ed25519"
        }
    }
})
```

| アルゴリズム | カーブ/オプション | デフォルト |
|---|---|---|
| EdDSA | crv: Ed25519, Ed448 | Ed25519 |
| ES256 | N/A | - |
| ES512 | N/A | - |
| RSA256 | modulusLength (number) | 2048 |
| PS256 | modulusLength (number) | 2048 |
| ECDH-ES | crv: P-256, P-384, P-521 | P-256 |

### 秘密鍵暗号化

```typescript
jwt({
    jwks: {
        disablePrivateKeyEncryption: true  // デフォルト: false（AES256 GCM）
    }
})
```

### キーローテーション

```typescript
jwt({
    jwks: {
        rotationInterval: 60 * 60 * 24 * 30,  // 30日（秒）
        gracePeriod: 60 * 60 * 24 * 30         // 30日（秒）
    }
})
```

### JWT ペイロードの変更

```typescript
jwt({
    jwt: {
        definePayload: ({ user }) => ({
            id: user.id,
            email: user.email,
            role: user.role
        })
    }
})
```

### Issuer, Audience, Subject, Expiration

```typescript
jwt({
    jwt: {
        issuer: "https://example.com",
        audience: "https://example.com",
        expirationTime: "1h",
        getSubject: (session) => session.user.email  // デフォルト: user id
    }
})
```

デフォルト: BASE_URL が issuer と audience に使用。有効期限は15分。

### カスタム JWKS パス

```typescript
// サーバー
jwt({ jwks: { jwksPath: "/.well-known/jwks.json" } })

// クライアント（サーバーと一致させる）
jwtClient({ jwks: { jwksPath: "/.well-known/jwks.json" } })
```

### リモート JWKS URL

```typescript
jwt({
    jwks: {
        remoteUrl: "https://example.com/.well-known/jwks.json",
        keyPairConfig: { alg: 'ES256' },
    }
})
```

### カスタム署名

```typescript
jwt({
    jwks: {
        remoteUrl: "https://example.com/.well-known/jwks.json",
        keyPairConfig: { alg: 'EdDSA' },
    },
    jwt: {
        sign: async (jwtPayload) => {
            return await new SignJWT(jwtPayload)
                .setProtectedHeader({ alg: "EdDSA", kid: process.env.currentKid, typ: "JWT" })
                .sign(process.env.clientPrivateKey)
        },
    },
})
```

### カスタムアダプター

```typescript
jwt({
    adapter: {
        getJwks: async (ctx) => await yourCustomStorage.getAllKeys(),
        createJwk: async (ctx, webKey) => await yourCustomStorage.createKey(webKey)
    }
})
```

## DB スキーマ

### jwks テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| id | string | PK | 一意識別子 |
| publicKey | string | - | Web Key の公開部分 |
| privateKey | string | - | Web Key の秘密部分 |
| createdAt | Date | - | 作成日時 |
| expiresAt | Date | ? | 有効期限 |

## 注意点

- 秘密鍵はデフォルトで AES256 GCM を使用して暗号化される。セキュリティ上、暗号化を維持することが推奨
- JWKS は無期限にキャッシュされ、キー ID（kid）が異なる場合のみリフレッシュされる
- OAuth Provider モードで使用する場合は `/token` エンドポイントを無効化し、`disableSettingJwtHeader: true` を設定する
