# Custom OAuth/OIDC Providers

組み込み以外の OAuth2 / OIDC 準拠 IdP を Supabase Auth に追加する。

## Signature / Usage

識別子は `custom:` プレフィックス必須（例 `custom:my-idp`）。種類は 2 つ。

- **OAuth2**: authorization / token / userinfo エンドポイントを手動指定
- **OIDC**: issuer URL のみ指定し、discovery でエンドポイントを自動解決

Free プランは最大 3 件、Pro 以上は無制限。作成フォームに read-only の Callback URL が表示されるので、外部 IdP のリダイレクト URI に設定する。識別子は 2〜50 文字、小文字英数字・ハイフン・コロン。

OIDC の自動挙動:

- discovery document は `{issuer}/.well-known/openid-configuration`（`discovery_url` 指定時はそちら）から取得
- `openid` scope は常に含まれる（`scopes` に無ければ自動追加）
- ID トークンは discovery document の `jwks_uri` の JWKS で検証

### Advanced configuration

- **PKCE**: 既定で有効（`pkce_enabled: true`）。サーバー側で完結。無効化は `pkce_enabled: false`（IdP が非対応の場合のみ推奨）
- **Authorization params**: 認可 URL に追加するクエリ（値はすべて文字列）。予約済みで上書き不可: `client_id`, `client_secret`, `redirect_uri`, `response_type`, `state`, `code_challenge`, `code_challenge_method`, `code_verifier`, `nonce`
- **Multi-platform**: `acceptable_client_ids` に追加 client ID を列挙し OIDC ID トークンの audience 検証で許可
- **Email-optional**: 既定ではメール必須。`email_optional: true` でメール無しサインインを許可（OAuth2 / OIDC 両方）

### OIDC-specific options

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `discovery_url` | `string` | `null` | Override the discovery document URL if the provider uses a non-standard location. |
| `skip_nonce_check` | `bool` | `false` | Skip nonce validation on ID tokens. Use only for providers that do not support nonce. |

### Error reference

| Error code | HTTP status | Description |
| --- | --- | --- |
| `validation_failed` | 400 | Invalid parameters: missing required fields, bad format, reserved params, or invalid URLs. |
| `conflict` | 400 | A provider with the same identifier already exists. |
| `over_custom_provider_quota` | 400 | Maximum number of custom providers reached. |
| `custom_provider_not_found` | 404 | No provider exists with the given identifier. |

### コード例

```js
// OAuth2 provider
const { data, error } = await supabase.auth.admin.customProviders.createProvider({
  provider_type: 'oauth2',
  identifier: 'custom:my-oauth-provider',
  name: 'My OAuth Provider',
  client_id: 'your-client-id',
  client_secret: 'your-client-secret',
  authorization_url: 'https://provider.example.com/oauth/authorize',
  token_url: 'https://provider.example.com/oauth/token',
  userinfo_url: 'https://provider.example.com/oauth/userinfo',
  scopes: ['profile', 'email'],
})

// OIDC provider
const { data, error } = await supabase.auth.admin.customProviders.createProvider({
  provider_type: 'oidc',
  identifier: 'custom:my-regional-provider',
  name: 'Regional Provider',
  client_id: 'your-client-id',
  client_secret: 'your-client-secret',
  issuer: 'https://auth.example.com',
  scopes: ['openid', 'profile', 'email'],
})

// Sign in
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'custom:my-provider',
})

// List / update / delete
const { data, error } = await supabase.auth.admin.customProviders.listProviders({
  type: 'oidc',
})

const { data, error } = await supabase.auth.admin.customProviders.updateProvider(
  'custom:my-provider',
  {
    name: 'Updated Provider Name',
    scopes: ['profile', 'email', 'groups'],
    enabled: false,
  }
)

const { data, error } =
  await supabase.auth.admin.customProviders.deleteProvider('custom:my-provider')
```

サインインは標準の authorize エンドポイントでも可。

```
GET https://your-project.supabase.co/auth/v1/authorize?provider=custom:my-provider
```

## Notes

- 公式は Flutter（`OAuthProvider('custom:my-provider')`）・Swift（`signInWithOAuth(provider: "custom:my-provider", redirectTo: ...)`）・Kotlin（`CustomProvider("custom:my-provider")`）の例も提示（原本参照）
- 更新は部分更新で `provider_type` と `identifier` は変更不可。client secret のローテーションは `client_secret` のみを更新
- Dashboard: Auth Providers → New Provider → Manual configuration（OAuth2）または Auto-discovery (OIDC)。一覧は Custom OAuth Providers 欄
- 出典: https://supabase.com/docs/guides/auth/custom-oauth-providers（取得日 2026-10）

## Related

- [ソーシャルログイン](./social-login.md)
- [サードパーティ Auth](./third-party-auth.md)
- [リダイレクト URL](./redirect-urls.md)
- [エラーコード](./error-codes.md)
