# サードパーティ Auth 連携

外部認証プロバイダとの統合と移行パス。

## 概要

Supabase は、外部の認証プロバイダ（Auth0、AWS Cognito、Clerk、Firebase Auth、WorkOS など）との統合をサポートしている。これにより、既存の認証基盤を維持しながら Supabase のデータベースや Storage を利用できる。

### サポートされる外部プロバイダ

| プロバイダ | 連携方法 |
|-----------|---------|
| **Auth0** | JWKS エンドポイント |
| **AWS Cognito** | JWKS エンドポイント |
| **Clerk** | JWKS エンドポイント |
| **Firebase Auth** | JWKS エンドポイント |
| **WorkOS** | JWKS エンドポイント |
| **カスタム** | 任意の OIDC 互換プロバイダ |

### 仕組み

1. 外部プロバイダが JWT を発行
2. Supabase が外部プロバイダの JWKS エンドポイントを使って JWT を検証
3. 検証済みの JWT で Supabase のサービス（Database, Storage）にアクセス
4. RLS ポリシーは JWT のクレーム（`sub`, `role` 等）を使って制御

### 設定

ダッシュボードの **Settings > API > Third-party Auth** で:
1. 「Enable third-party auth」をオン
2. JWKS URL を設定（例: `https://your-auth0-domain/.well-known/jwks.json`）
3. JWT のオーディエンス（`aud`）とイシュアー（`iss`）を設定

## コード例

```typescript
// === Auth0 との連携 ===

// 1. ダッシュボードの設定:
// JWKS URL: https://your-tenant.auth0.com/.well-known/jwks.json
// Allowed Issuer: https://your-tenant.auth0.com/
// Allowed Audiences: your-api-identifier

// 2. Auth0 から取得した JWT で Supabase にアクセス
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key',
  {
    global: {
      headers: {
        Authorization: `Bearer ${auth0AccessToken}`,
      },
    },
  }
)

// Auth0 のアクセストークンで Supabase のデータにアクセス
const { data, error } = await supabase
  .from('todos')
  .select('*')

// === AWS Cognito との連携 ===

// JWKS URL: https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json
// Issuer: https://cognito-idp.{region}.amazonaws.com/{userPoolId}

// Cognito のトークンで Supabase にアクセス
const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key',
  {
    accessToken: async () => {
      // Cognito から最新のアクセストークンを取得
      const session = await Auth.currentSession()
      return session.getAccessToken().getJwtToken()
    },
  }
)

// === Clerk との連携 ===

// JWKS URL: https://your-clerk-domain/.well-known/jwks.json
// Issuer: https://your-clerk-domain

import { useAuth } from '@clerk/nextjs'

function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth()

  const supabase = createClient(
    'https://your-project.supabase.co',
    'your-anon-key',
    {
      accessToken: async () => {
        // Clerk から Supabase 用のトークンを取得
        return await getToken({ template: 'supabase' }) ?? ''
      },
    }
  )

  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>
}

// === Firebase Auth との連携 ===

// JWKS URL: https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com
// Issuer: https://securetoken.google.com/{firebase-project-id}

import { getAuth, getIdToken } from 'firebase/auth'

const firebaseAuth = getAuth()

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key',
  {
    accessToken: async () => {
      const user = firebaseAuth.currentUser
      if (!user) return ''
      return await getIdToken(user)
    },
  }
)

// === RLS ポリシーでの外部 JWT 使用 ===

// SQL: 外部プロバイダの sub クレームでアクセス制御
// CREATE POLICY "Own data" ON public.todos
//   FOR ALL TO authenticated
//   USING (user_id = auth.uid());
// auth.uid() は JWT の sub クレームを返す

// SQL: カスタムクレームを使用
// CREATE POLICY "Premium users" ON public.premium_content
//   FOR SELECT TO authenticated
//   USING ((auth.jwt() ->> 'plan') = 'premium');

// === 移行パス: 外部プロバイダから Supabase Auth への移行 ===

// 1. 並行運用: 外部プロバイダと Supabase Auth を同時に使用
// 2. ユーザー移行: Admin API でユーザーを作成
const { data, error } = await supabaseAdmin.auth.admin.createUser({
  email: 'migrated-user@example.com',
  email_confirm: true,
  user_metadata: {
    // 外部プロバイダのユーザー情報を移行
    display_name: 'Migrated User',
    external_id: 'auth0|123456',
  },
})

// 3. パスワード移行（Password Verification Hook を使用）
// 旧システムのパスワードハッシュを検証し、成功したら bcrypt に変換
```

## 注意点

- JWKS エンドポイントは HTTPS で公開されている必要がある
- 外部プロバイダの JWT に `sub` クレームが含まれている必要がある（`auth.uid()` で参照するため）
- 外部 JWT の `role` クレームが `authenticated` であること。そうでない場合は RLS ポリシーの調整が必要
- 外部プロバイダのトークンリフレッシュは Supabase では管理されない。クライアント側で適切にトークンを更新すること
- サードパーティ Auth を有効にすると、Supabase Auth の組み込み認証と外部認証を併用できる
- 移行時は Password Verification Hook を使って、旧システムのパスワードハッシュを段階的に移行できる
- `accessToken` オプション（supabase-js v2.49.0+）を使うと、リクエストごとに最新のトークンを取得できる

## 関連

- [Auth 概要](./overview.md)
- [JWT 構造](./jwts.md)
- [Auth Hooks](./auth-hooks.md)
- [SSO / SAML](./sso-saml.md)
