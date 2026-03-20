# ソーシャルログイン（OAuth）

OAuth 2.0 / OIDC プロバイダを使ったソーシャルログイン。

## 概要

Supabase Auth は 19 以上のソーシャルログインプロバイダをサポートしている。`signInWithOAuth()` メソッドでプロバイダの認証ページにリダイレクトし、認証完了後にコールバック URL でセッションを取得する。

### サポートされているプロバイダ

| プロバイダ | Provider ID | 主な設定項目 |
|-----------|-------------|-------------|
| Google | `google` | Client ID, Client Secret, Consent Screen |
| GitHub | `github` | Client ID, Client Secret |
| Apple | `apple` | Services ID, Key ID, Team ID, Private Key |
| Azure (Microsoft) | `azure` | Application ID, Client Secret, Tenant URL |
| Discord | `discord` | Client ID, Client Secret |
| Facebook | `facebook` | App ID, App Secret |
| Figma | `figma` | Client ID, Client Secret |
| GitLab | `gitlab` | Application ID, Secret, Self-hosted URL |
| Kakao | `kakao` | REST API Key, Client Secret |
| Keycloak | `keycloak` | Client ID, Client Secret, Realm URL |
| LinkedIn (OIDC) | `linkedin_oidc` | Client ID, Client Secret |
| Notion | `notion` | OAuth Client ID, Client Secret |
| Slack (OIDC) | `slack_oidc` | Client ID, Client Secret |
| Spotify | `spotify` | Client ID, Client Secret |
| Twitch | `twitch` | Client ID, Client Secret |
| Twitter | `twitter` | API Key, API Secret |
| WorkOS | `workos` | Client ID, API Key |
| Bitbucket | `bitbucket` | Key, Secret |
| Zoom | `zoom` | Client ID, Client Secret |

### 共通設定

各プロバイダの Callback URL（リダイレクト URI）は以下の形式:
```
https://<project-ref>.supabase.co/auth/v1/callback
```

### 認証フロー

1. `signInWithOAuth()` でプロバイダの認証ページにリダイレクト
2. ユーザーがプロバイダで認証
3. Supabase Auth のコールバック URL にリダイレクト
4. Supabase Auth がトークンを処理
5. アプリケーションの `redirectTo` にリダイレクト
6. PKCE フローの場合、`exchangeCodeForSession()` でセッション取得

## コード例

```typescript
// === 基本的な OAuth サインイン ===

// Google でサインイン
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
})

// リダイレクト先を指定
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})

// === Google: スコープとオプション ===

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    scopes: 'openid email profile',
    queryParams: {
      access_type: 'offline',     // リフレッシュトークンを取得
      prompt: 'consent',          // 毎回同意画面を表示
    },
    redirectTo: 'https://example.com/auth/callback',
  },
})

// Google のプロバイダトークンを使って Google API にアクセス
const { data: { session } } = await supabase.auth.getSession()
const googleAccessToken = session?.provider_token

// === GitHub ===

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    scopes: 'repo user',
  },
})

// === Apple ===

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'apple',
  options: {
    scopes: 'name email',
  },
})

// === Azure (Microsoft) ===

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'azure',
  options: {
    scopes: 'openid profile email',
  },
})

// === PKCE フロー（サーバーサイド / SSR） ===

// 1. サインインを開始
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/auth/callback',
  },
})

// 2. コールバックでセッションに交換
// /auth/callback ルートで:
const code = new URL(request.url).searchParams.get('code')
if (code) {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
}

// === ポップアップウィンドウで OAuth（SPA 向け） ===

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    skipBrowserRedirect: true, // リダイレクトしない
  },
})

// data.url を使ってポップアップを開く
if (data.url) {
  const popup = window.open(data.url, '_blank', 'width=500,height=600')
}

// === ID トークンでサインイン（Native / Mobile） ===

// Google One Tap や Apple Sign In などで取得した ID トークンを使用
const { data, error } = await supabase.auth.signInWithIdToken({
  provider: 'google',
  token: 'google-id-token-from-native-sdk',
  nonce: 'optional-nonce', // Apple Sign In では必須
})

// === プロバイダトークンの取得 ===

// OAuth 認証後にプロバイダのアクセストークンを取得
const { data: { session } } = await supabase.auth.getSession()
console.log('Provider token:', session?.provider_token)
console.log('Provider refresh token:', session?.provider_refresh_token)
```

## 注意点

- 各プロバイダの Callback URL を正確に設定すること。形式は `https://<project-ref>.supabase.co/auth/v1/callback`
- `provider_token` はセッション内に保存されるが、Supabase Auth はプロバイダトークンの更新を行わない
- Apple Sign In では、ユーザーの名前は初回認証時のみ取得可能
- Twitter OAuth は OAuth 2.0 ではなく OAuth 1.0a を使用する
- `skipBrowserRedirect: true` はポップアップやカスタムリダイレクトフローに使用
- `signInWithIdToken()` はネイティブアプリで、プロバイダの SDK から取得した ID トークンを直接使用する場合に使う
- PKCE フローはサーバーサイドレンダリングで推奨される
- scopes はプロバイダごとに異なるため、各プロバイダのドキュメントを確認すること

## 関連

- [Auth 概要](./overview.md)
- [ID 管理・アカウントリンク](./identities.md)
- [SSO / SAML](./sso-saml.md)
- [リダイレクト URL](./redirect-urls.md)
