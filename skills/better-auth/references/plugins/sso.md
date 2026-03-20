# SSO

SSO プラグインは、OIDC、OAuth2、SAML 2.0 をサポートし、単一のクレデンシャルセットで複数のアプリケーションへの認証を可能にする。

## セットアップ

### インストール

```bash
npm install @better-auth/sso
```

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { sso } from "@better-auth/sso"

const auth = betterAuth({
    plugins: [
        sso({
            provisionUser: async ({ user, userInfo, token, provider }) => { },
            organizationProvisioning: {
                disabled: false,
                defaultRole: "member",
                getRole: async ({ user, userInfo, provider }) => "member"
            },
            domainVerification: { enabled: true },
        })
    ]
})
```

### クライアント側

```typescript
import { createAuthClient } from "better-auth/client"
import { ssoClient } from "@better-auth/sso/client"

const authClient = createAuthClient({
    plugins: [
        ssoClient({ domainVerification: { enabled: true } })
    ]
})
```

## API メソッド

### OIDC プロバイダー登録

```typescript
const { data, error } = await authClient.sso.register({
    providerId: "okta",
    issuer: "https://your-org.okta.com",
    domain: "yourcompany.com",
    oidcConfig: {
        clientId: "your-client-id",
        clientSecret: "your-client-secret",
        discoveryEndpoint: "https://idp.example.com/.well-known/openid-configuration",
        scopes: ["openid", "email", "profile"],
        pkce: true,
        mapping: {
            id: "sub",
            email: "email",
            emailVerified: "email_verified",
            name: "name",
            image: "picture",
            extraFields: { department: "department" }
        }
    }
})
```

### SAML プロバイダー登録

```typescript
await authClient.sso.register({
    providerId: "saml-provider",
    issuer: "https://idp.example.com",
    domain: "example.com",
    samlConfig: {
        entryPoint: "https://idp.example.com/sso",
        cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
        callbackUrl: "https://yourapp.com/api/auth/sso/saml2/callback/saml-provider",
        audience: "https://yourapp.com",
        wantAssertionsSigned: true,
        signatureAlgorithm: "sha256",
        digestAlgorithm: "sha256",
        mapping: {
            id: "nameID",
            email: "email",
            name: "displayName",
        }
    }
})
```

### SSO サインイン

```typescript
// メールで
await authClient.signIn.sso({ email: "user@example.com", callbackURL: "/dashboard" })

// ドメインで
await authClient.signIn.sso({ domain: "example.com", callbackURL: "/dashboard" })

// 組織スラッグで
await authClient.signIn.sso({ organizationSlug: "example-org", callbackURL: "/dashboard" })

// プロバイダー ID で
await authClient.signIn.sso({ providerId: "example-provider-id", callbackURL: "/dashboard", loginHint: "user@example.com" })
```

### ドメイン検証

```typescript
// 検証トークン要求
const { data, error } = await authClient.sso.requestDomainVerification({
    providerId: "acme-corp"
})

// ドメイン検証
const { data, error } = await authClient.sso.verifyDomain({
    providerId: "acme-corp"
})
```

DNS レコード形式:
- ホスト: `_better-auth-token-{providerId}`
- 値: 検証トークン
- TTL: 1週間

### SP メタデータ取得

```typescript
const response = await auth.api.spMetadata({
    query: { providerId: "saml-provider", format: "xml" }
})
```

## 設定オプション

| オプション | 型 | 説明 |
|---|---|---|
| `provisionUser` | function | ユーザープロビジョニングカスタムロジック |
| `organizationProvisioning.disabled` | boolean | 組織プロビジョニングの無効化 |
| `organizationProvisioning.defaultRole` | string | デフォルトロール |
| `organizationProvisioning.getRole` | function | ロール割り当てロジック |
| `defaultOverrideUserInfo` | boolean | ユーザー情報の上書き |
| `disableImplicitSignUp` | boolean | 暗黙的サインアップの無効化 |
| `providersLimit` | number \| function | プロバイダー数制限 |
| `redirectURI` | string | リダイレクト URI |
| `domainVerification.enabled` | boolean | ドメイン検証の有効化 |
| `defaultSSO` | array | デフォルト SSO 設定 |

### SAML セキュリティ設定

```typescript
saml: {
    enableInResponseToValidation: true,
    allowIdpInitiated: true,
    requestTTL: 300000,
    clockSkew: 300000,
    requireTimestamps: false,
    algorithms: { onDeprecated: "warn" },
    maxResponseSize: 262144,
    maxMetadataSize: 102400
}
```

## DB スキーマ

### ssoProvider テーブル

| フィールド | 型 | 説明 |
|---|---|---|
| id | string | PK |
| issuer | string | OIDC 発行者 URL |
| domain | string | メールドメイン |
| oidcConfig | string? | OIDC 設定（JSON） |
| samlConfig | string? | SAML 設定（JSON） |
| userId | string | FK to user |
| providerId | string | 一意のプロバイダー識別子 |
| organizationId | string? | 組織リンケージ |
| domainVerified | boolean? | ドメイン検証状態 |

## OIDC ディスカバリーエラー

| コード | 意味 |
|---|---|
| `issuer_mismatch` | ディスカバリードキュメントが異なる issuer を報告 |
| `discovery_incomplete` | 必須フィールドの欠落 |
| `discovery_not_found` | ディスカバリーエンドポイントで 404 |
| `discovery_timeout` | 10秒タイムアウト超過 |
| `discovery_untrusted_origin` | trustedOrigins にないオリジン |

## 注意点

- SAML アサーションリプレイ保護は常に有効
- 信頼済みオリジンの設定がディスカバリードメインに必要
- サポートされるアルゴリズム: RSA-SHA256/384/512, ECDSA-SHA256/384/512
- 非推奨アルゴリズム（SHA-1, RSA 1.5, 3DES）の使用は `algorithms.onDeprecated` で制御
- SAML エンドポイント: `/api/auth/sso/saml2/sp/metadata`, `/api/auth/sso/saml2/callback/{providerId}`
