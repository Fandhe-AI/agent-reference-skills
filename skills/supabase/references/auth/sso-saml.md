# Enterprise SSO / SAML

SAML 2.0 プロトコルを使ったエンタープライズ向けシングルサインオン。

## 概要

Supabase Auth は SAML 2.0 プロトコルをサポートし、エンタープライズ向けの SSO（シングルサインオン）を実現する。Okta、Azure AD、Google Workspace、OneLogin などの Identity Provider（IdP）と連携可能。

### 主な機能

- **ドメインベースのルーティング**: ユーザーのメールドメインに基づいて適切な IdP に自動ルーティング
- **Attribute Mapping**: IdP のユーザー属性を Supabase Auth の user_metadata にマッピング
- **管理 API**: CLI または API で SSO プロバイダを追加・管理

### 要件

- Supabase Pro プラン以上
- SAML 2.0 対応の Identity Provider
- IdP 側で Service Provider（Supabase）の設定

### SSO フロー

1. ユーザーがメールアドレスを入力
2. ドメインから適切な IdP を特定
3. `signInWithSSO()` で IdP のログインページにリダイレクト
4. IdP で認証
5. SAML レスポンスが Supabase Auth に送信される
6. Supabase Auth がユーザーを作成/更新し、セッションを発行
7. アプリケーションにリダイレクト

## コード例

```typescript
// === SSO サインイン ===

// ドメインベースで SSO サインイン
const { data, error } = await supabase.auth.signInWithSSO({
  domain: 'company.com',
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})

if (data?.url) {
  // IdP のログインページにリダイレクト
  window.location.href = data.url
}

// プロバイダ ID を直接指定して SSO サインイン
const { data, error } = await supabase.auth.signInWithSSO({
  providerId: 'sso-provider-uuid',
  options: {
    redirectTo: 'https://example.com/dashboard',
  },
})

// === コールバック処理（PKCE フロー） ===

// /auth/callback ルートで:
const code = new URL(request.url).searchParams.get('code')
if (code) {
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
}

// === CLI での SSO プロバイダ管理 ===

// SSO プロバイダを追加（CLI）
// supabase sso add \
//   --type saml \
//   --metadata-url 'https://idp.example.com/metadata.xml' \
//   --domains 'company.com' \
//   --attribute-mapping '{"keys":{"email":{"name":"mail"}}}'

// SSO プロバイダ一覧を表示
// supabase sso list

// SSO プロバイダを更新
// supabase sso update <provider-id> \
//   --domains 'company.com,subsidiary.com'

// SSO プロバイダを削除
// supabase sso remove <provider-id>

// === 管理 API での SSO プロバイダ管理 ===

// プロバイダの追加（HTTP API）
// POST /auth/v1/admin/sso/providers
// {
//   "type": "saml",
//   "metadata_url": "https://idp.example.com/metadata.xml",
//   "domains": ["company.com"],
//   "attribute_mapping": {
//     "keys": {
//       "email": { "name": "mail" },
//       "name": { "name": "displayName" }
//     }
//   }
// }

// === SSO プロバイダの存在確認 ===

async function checkSSOProvider(email: string) {
  const domain = email.split('@')[1]

  try {
    const { data, error } = await supabase.auth.signInWithSSO({
      domain,
    })

    if (error) {
      // SSO プロバイダが設定されていない
      return false
    }
    return true
  } catch {
    return false
  }
}

// === ログインフォームでの統合 ===

async function handleLogin(email: string) {
  const domain = email.split('@')[1]

  // まず SSO を試行
  const { data: ssoData, error: ssoError } = await supabase.auth.signInWithSSO({
    domain,
  })

  if (!ssoError && ssoData?.url) {
    // SSO プロバイダが見つかった場合、IdP にリダイレクト
    window.location.href = ssoData.url
    return
  }

  // SSO プロバイダがない場合、通常のログインフォームを表示
  showPasswordLoginForm(email)
}
```

## 注意点

- SSO 機能は Pro プラン以上で利用可能
- SAML メタデータ URL は IdP から提供される。URL が無効な場合はメタデータ XML を直接アップロードすることも可能
- Attribute Mapping を正しく設定しないと、ユーザーのメールアドレスや名前が正しくマッピングされない
- ドメインは 1 つの SSO プロバイダにのみ関連付けられる
- SSO ユーザーは `auth.identities` に `sso:saml` プロバイダとして記録される
- IdP 側の ACS URL（Assertion Consumer Service URL）は `https://<project-ref>.supabase.co/auth/v1/sso/saml/acs` に設定する
- Entity ID は `https://<project-ref>.supabase.co/auth/v1/sso/saml/metadata` に設定する

## 関連

- [Auth 概要](./overview.md)
- [ソーシャルログイン](./social-login.md)
- [サードパーティ Auth](./third-party-auth.md)
- [リダイレクト URL](./redirect-urls.md)
