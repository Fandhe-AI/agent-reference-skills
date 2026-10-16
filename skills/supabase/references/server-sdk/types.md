# Types

`@supabase/server` の公開型。auth mode・設定・context・claims など。

## Signature / Usage

| Name | Description |
| --- | --- |
| `AuthMode` | request が提供すべき credentials を決める認証 mode |
| `AuthModeWithKey` | 名前付きキーを指定できる拡張 auth mode |
| `AuthConfig` | `auth` option の受理形（1 mode または順序付き list） |
| `CredentialedAuthMode` | credential を要求する auth mode（`"none"` 以外の `AuthModeWithKey`、keyed 形含む） |
| `AuthResult` | credential 検証の結果。解決済み auth mode・検証済み token（`"user"`）・decode 済み JWT claims・一致したキー名（`"publishable"` / `"secret"`） |
| `Credentials` | 受信 HTTP request から抽出された生の credentials（`core.extractCredentials` が `Authorization` / `apikey` から生成） |
| `ClientAuth` | client 作成関数用の auth identity |
| `CreateAdminClientOptions` | `core.createAdminClient` の options |
| `CreateContextClientOptions` | `core.createContextClient` の options |
| `ErrorResponseConfig` | エラーが response body にどこまで載るかの制御（`errors`） |
| `ShortCircuitConfig` | 自ら request に応答する全 middleware 共通の option（`errors` を自身の response に適用） |
| `OAuthProtectedResourceConfig` | `withOAuthProtectedResource` の設定。2 option とも固定文字列か request の関数を受け、既定は Edge Functions proxy 経由で到達した request からの導出（そこでは設定不要） |
| `ResourceMetadataOptions` | `resourceMetadataResponse` の options |
| `SupabaseContext` | 認証済み request ごとに作られる Supabase context。設定済み Supabase client と呼び出し元 identity を持つ。生成した layer / adapter によらず同一 |
| `JWTClaims` | RFC 7519 の標準 JWT claims に Supabase 固有 field を加えたもの。生の JWT payload（`UserClaims` が正規化された camelCase 版） |
| `SupabaseEnv` | 解決済み Supabase 環境設定。project URL・API キー・JWKS を保持。通常 `core.resolveEnv` が環境変数から自動解決するが `env` option で明示指定も可 |
| `UserClaims` | 認証済みユーザー identity の正規化 camelCase 版（`JWTClaims` から導出）。email 確認状態や providers を含む完全な `User` は context client で `supabase.auth.getUser()` を呼ぶ |
| `WithSupabaseConfig` | `withSupabase` と `createSupabaseContext` の設定。受理する auth mode・環境 override・CORS 挙動を制御 |
| `UrlOption` | 設定済み URL: 固定値または request ごとの導出 |
| `UnauthorizedResponseOptions` | `unauthorizedResponse` の options |

### AuthMode

- `"none"`: credentials 不要。全 request を受け入れる
- `"publishable"`: `apikey` ヘッダーに有効な publishable key が必要。`default` キーのみ一致
- `"secret"`: `apikey` ヘッダーに有効な secret key が必要（timing-safe 比較）。`default` キーのみ一致
- `"user"`: `Authorization: Bearer <token>` に有効な JWT が必要

bare の `"publishable"` / `"secret"` は `SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS` の `default` キーを解決する。他のキー指定や任意キー許可は `AuthModeWithKey`。

```ts
// Single mode
withSupabase({ auth: 'user' }, handler)

// Multiple modes — the first match wins.
// A mode is tried only when its credential is present; a JWT that is
// present but fails verification rejects immediately rather than falling
// through to the next mode.
withSupabase({ auth: ['user', 'publishable'] }, handler)
```

### AuthModeWithKey

コロン構文（`"publishable:web_app"`）で `SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS` の JSON object から特定の名前付きキーを要求する。`"publishable:*"` / `"secret:*"` は集合内の任意のキーを受理する。コロン無しの bare 形は `default` キーのみ一致。

```ts
// Accept only the "mobile" publishable key
withSupabase({ auth: 'publishable:mobile' }, handler)

// Accept any secret key
withSupabase({ auth: 'secret:*' }, handler)

// Mix named keys with other modes
withSupabase({ auth: ['user', 'publishable:web_app'] }, handler)
```

### AuthConfig

`auth` option の受理形: 1 つの mode、または左から順に試される mode の順序付き list。`"none"` は全 request を受け入れるため list の最後でのみ意味を持つ（その前が identity を作れる mode で、後ろは到達不能）。単独の `["none"]` は bare `auth: 'none'` と同義で意味が無い。型は `"none"` 単独、または 1 つ以上の credentialed mode の後ろの最終位置のみを受理する。単一 mode は配列で包む必要が無く（`"user"` と `["user"]` は同一設定）、unwrapped 形が union の先頭なのでエディタ補完に出る。

```ts
withSupabase({ auth: 'user' }, handler)              // one mode
withSupabase({ auth: ['secret', 'user'] }, handler)  // first match wins
withSupabase({ auth: ['user', 'none'] }, handler)    // optional user
withSupabase({ auth: 'none' }, handler)              // no credentials required
```

### ErrorResponseConfig

`withSupabase` と、request に直接応答する全 middleware（`withClaims` / `withRequiredClaims` / `withPostgresClient` / `withPostgresAdminClient` / `withOAuthProtectedResource`）が `errors` として受け付ける。

```ts
// Full payload: source, code, message, hint, docs, details
withSupabase({ auth: 'user' }, handler)

// Trimmed: code and message only
withSupabase({ auth: 'user', errors: { detailed: false } }, handler)
```

### WithSupabaseConfig

```ts
// Require authenticated users, auto-CORS enabled (default)
const config: WithSupabaseConfig = { auth: 'user' }

// Accept users or service-to-service calls, custom CORS headers
const config: WithSupabaseConfig = {
  auth: ['user', 'secret'],
  cors: { 'Access-Control-Allow-Origin': 'https://myapp.com' },
}

// No auth required, CORS disabled
const config: WithSupabaseConfig = { auth: 'none', cors: 'disabled' }
```

## Deprecated

- `Allow`: Deprecated。`AuthMode` を使う。将来の major release で削除予定
- `AllowWithKey`: Deprecated。`AuthModeWithKey` を使う。将来の major release で削除予定

## Notes

- 出典: https://supabase.com/llms/server.txt （Types 節、2026-10 取得）。原文は各型のフィールド一覧を示さない（`SupabaseContext` のメンバーは `overview.md` の例で確認できる `supabase` / `supabaseAdmin` / `userClaims` / `jwtClaims` / `authMode` のみ。書かれていないフィールドは載せていない）
- `Allow` / `AllowWithKey` は deprecated（後継: `AuthMode` / `AuthModeWithKey`）
- `AuthResult` は `userClaims`（例: `auth.userClaims!.id`）を持つ。bridge の `jwtClaims`（`sub`）とは別の正規化 shape（`migrating-off-adapters.md` の対応表参照）

## Related

- [middleware](./middleware.md)
- [primitives](./primitives.md)
- [errors](./errors.md)
- [overview](./overview.md)
