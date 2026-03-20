# Supabase OAuth Server

Supabase プロジェクトを OAuth 2.0 プロバイダとして機能させる。

## 概要

Supabase は OAuth 2.0 サーバーとしても機能し、外部アプリケーションが Supabase プロジェクトのユーザーを認証できる。これにより、自分の Supabase プロジェクトを「Login with MyApp」のような OAuth プロバイダとして公開できる。MCP（Model Context Protocol）の認証にも利用可能。

### 主な機能

- **OAuth 2.0 Authorization Code フロー**: セキュアな認証フローの提供
- **クライアント管理**: OAuth クライアントの作成・管理
- **スコープ制御**: アクセス可能な範囲の制御
- **PKCE サポート**: パブリッククライアント向けのセキュアなフロー

### OAuth 2.0 エンドポイント

| エンドポイント | URL |
|---------------|-----|
| Authorization | `https://<project-ref>.supabase.co/auth/v1/authorize` |
| Token | `https://<project-ref>.supabase.co/auth/v1/token` |
| UserInfo | `https://<project-ref>.supabase.co/auth/v1/user` |

## コード例

```typescript
// === OAuth クライアントの管理（Admin API） ===

// OAuth クライアントを作成
// POST /auth/v1/admin/oauth/clients
// Headers: { Authorization: 'Bearer <service_role_key>' }
// Body: {
//   "name": "My External App",
//   "redirect_uris": ["https://external-app.com/callback"],
//   "scopes": ["openid", "email", "profile"]
// }

// クライアント一覧を取得
// GET /auth/v1/admin/oauth/clients

// クライアントを削除
// DELETE /auth/v1/admin/oauth/clients/<client_id>

// === 外部アプリケーションからの OAuth 認証フロー ===

// 1. Authorization URL を構築
const authUrl = new URL(
  'https://your-project.supabase.co/auth/v1/authorize'
)
authUrl.searchParams.set('client_id', 'your-oauth-client-id')
authUrl.searchParams.set('redirect_uri', 'https://external-app.com/callback')
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('scope', 'openid email profile')
authUrl.searchParams.set('state', generateRandomState())

// PKCE の場合
const codeVerifier = generateCodeVerifier()
const codeChallenge = await generateCodeChallenge(codeVerifier)
authUrl.searchParams.set('code_challenge', codeChallenge)
authUrl.searchParams.set('code_challenge_method', 'S256')

// ユーザーを認証ページにリダイレクト
window.location.href = authUrl.toString()

// 2. コールバックでコードをトークンに交換
async function handleCallback(code: string) {
  const response = await fetch(
    'https://your-project.supabase.co/auth/v1/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://external-app.com/callback',
        client_id: 'your-oauth-client-id',
        client_secret: 'your-oauth-client-secret',
        // PKCE の場合
        code_verifier: codeVerifier,
      }),
    }
  )

  const tokens = await response.json()
  // tokens.access_token, tokens.refresh_token
  return tokens
}

// 3. ユーザー情報を取得
async function getUserInfo(accessToken: string) {
  const response = await fetch(
    'https://your-project.supabase.co/auth/v1/user',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const user = await response.json()
  return user
}

// === MCP 認証での利用 ===

// MCP サーバーの認証に Supabase OAuth を使用
// MCP クライアントが Supabase の OAuth エンドポイントに対して
// Authorization Code フローを実行し、
// 取得したアクセストークンで MCP サーバーにアクセス

// PKCE ヘルパー関数
function generateCodeVerifier(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function generateRandomState(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}
```

## 注意点

- OAuth クライアントの管理には `service_role` キーが必要
- クライアントシークレットは安全に保管し、サーバーサイドでのみ使用すること
- PKCE フローはパブリッククライアント（SPA、モバイルアプリ）で推奨される
- `redirect_uri` は OAuth クライアント作成時に登録した URL と完全に一致する必要がある
- `state` パラメータを使用して CSRF 攻撃を防止すること
- トークンの有効期限は Supabase Auth の JWT 設定に従う
- この機能はまだ比較的新しく、API が変更される可能性がある

## 関連

- [Auth 概要](./overview.md)
- [JWT 構造](./jwts.md)
- [サードパーティ Auth](./third-party-auth.md)
- [セッション管理](./sessions.md)
