# Errors

`@supabase/server` が生成する全エラー型とエラーコード。

## Signature / Usage

全エラーは基底クラス `SupabaseServerError` を継承し、`code` / `message` / `hint` / `docs` / `status` / `toJSON()` を持つ（例から確認できるメンバー）。`message` は `[@supabase/server]` prefix 付き。`withSupabase` は全エラーレスポンスに `ErrorCodeHeader`（ヘッダー）で `code` を載せ、body は `ErrorPayload`（`errors: { detailed: false }` 時は `MinimalErrorPayload`）。

### クラス・型

| Name | Description |
| --- | --- |
| `SupabaseServerError` | 本ライブラリが生成する全エラーの基底。`EnvError` / `AuthError` 等をまとめて catch できる |
| `SupabaseServerErrorOptions` | `SupabaseServerError` に付く任意の診断情報 |
| `AuthError` | 認証・認可の失敗。`status` は `401`（credential 起因）または `500`（サーバー誤設定で誰も認証できない） |
| `EnvError` | 必須環境変数の欠落・不正。常に `status: 500` |
| `PostgresPoolError` | Postgres pool が接続を渡せない場合。常に `status: 503`（一時的でリトライ可） |
| `Errors` | 全エラー型の factory map。エラー code 定数をキーに `hint` / `docs` / `details` 付きの `EnvError` / `AuthError` / `PostgresPoolError` を返す |
| `ErrorSource` | 全エラーに付くパッケージ識別子。各インスタンスの `source`、`withSupabase` の JSON body の `source`、`message` の `[@supabase/server]` prefix として現れる |
| `ErrorCodeHeader` | `withSupabase` が全エラーレスポンスに設定するヘッダー（`code` を運ぶ） |
| `ErrorPayload` | `SupabaseServerError` のシリアライズ形。`withSupabase` が失敗時に返す JSON body そのもの |
| `MinimalErrorPayload` | `errors: { detailed: false }` 時の縮小 body。`message` は prefix を保つ |
| `ApiKeyFormat` | `apikey` ヘッダー値を public prefix で分類した結果（診断用。キーを echo せずに形式不一致を報告） |
| `AuthFailureContext` | 失敗した認証試行について認証 pipeline が知る全情報（秘密を除く）。message / hint / `details` 生成用 |
| `ReceivedCredentials` | request が運んだ credentials の非機密サマリー |
| `AuthGenericError` | 汎用の認証エラー code |
| `EnvGenericError` | 汎用の環境エラー code |

### エラー code 別エラー

| Name | 意味 |
| --- | --- |
| `MissingCredentialsError` | `apikey` も `Authorization: Bearer` も無く、許可 auth mode が許さない |
| `UnusableCredentialError` | credential は届いたがどの許可 mode でも使えない（`Authorization` 内の `sb_*` API key、または誤った scheme / 大文字小文字 / bare 値 / 空 token）。`MissingCredentialsError`（何も届かなかった）と「認証されなかった」空間を正確に二分し、`errors: { detailed: false }` で `hint` / `details` が消えても code が単独で正しい |
| `InvalidApiKeyError` | `apikey` ヘッダーはあるが許可 auth mode の設定キーのどれにも一致しない |
| `InvalidJwtError` | `Authorization` の JWT が検証失敗。`details.jwt` と message に具体的理由（expired / bad signature / unknown `kid` / malformed / `sub` 無し / `aud`・`iss` 不一致または欠落 / `nbf` が未来） |
| `InvalidCredentialsError` | 汎用の credential 失敗。より具体的な code に当てはまらない場合の fallback。v1.5 より前は `withSupabase` が失敗 request に返す唯一の code だった。`MissingCredentialsError` / `InvalidApiKeyError` / `InvalidJwtError` での照合を推奨 |
| `JwksFetchFailedError` | remote JWKS endpoint を取得できないか使えない値を返した。upstream 起因の `status: 500` |
| `JwksNotConfiguredError` | auth mode `"user"` で JWT が渡されたが JWKS が未設定で検証不可。サーバー誤設定の `status: 500` |
| `NoKeysConfiguredError` | `"publishable"` / `"secret"` mode が要求されたが該当種のキーが未設定で一致し得ない。サーバー誤設定の `status: 500` |
| `UnsupportedRoleError` | 検証済み `role` claim が middleware が assume しない Postgres role（RLS をバイパスする、または未対応）を指す。`withPostgresClient` が `anon` として無言で実行する代わりに返す |
| `MissingSupabaseURLError` | `SUPABASE_URL` 未設定 |
| `MissingPublishableKeyError` | 名前付き publishable key が `SUPABASE_PUBLISHABLE_KEYS` に無い |
| `MissingSecretKeyError` | 名前付き secret key が `SUPABASE_SECRET_KEYS` に無い |
| `MissingDefaultPublishableKeyError` | default publishable key が無い |
| `MissingDefaultSecretKeyError` | default secret key が無い |
| `MissingConnectionStringError` | Postgres 接続文字列が未設定で `withPostgresClient` / `withPostgresAdminClient` が接続できない |
| `MissingResourceServerError` | `withOAuthProtectedResource` に `resourceServer` が無く導出できない |
| `MissingAuthorizationServerError` | `withOAuthProtectedResource` に `authorizationServer` が無く導出できない |
| `CreateSupabaseClientError` | 認証成功後に Supabase client の作成に失敗 |
| `PostgresPoolBusyError` | チェックアウト待機中ずっと全 pool 接続が busy でクエリが接続を得られなかった。`details.max` は pool サイズ、`details.waitedMs` は待機時間 |
| `PostgresConnectPausedError` | 接続試行が失敗し pool が新規試行を一時停止しており、新規接続が要るクエリが試行せず拒否された。`cause` が失敗内容、`details.retryAfterMs` が停止の残り時間 |

### コード例

AuthError を捕捉:

```ts
import { createSupabaseContext } from '@supabase/server'

const { data: ctx, error } = await createSupabaseContext(request, { auth: 'user' })
if (error) {
  // error is an AuthError — `toJSON()` includes source, code, message, hint, docs, details
  return Response.json(error.toJSON(), { status: error.status })
}
```

EnvError を捕捉:

```ts
import { EnvError } from '@supabase/server'

try {
  const client = createAdminClient()
} catch (e) {
  if (e instanceof EnvError) {
    console.error(`[${e.code}] ${e.message}\n${e.hint}`)
    // → "[MISSING_SUPABASE_URL] [@supabase/server] SUPABASE_URL is required but not set."
    //   "Set SUPABASE_URL to your project URL (https://<project-ref>.supabase.co), …"
  }
}
```

ライブラリ由来の全エラーを捕捉:

```ts
import { SupabaseServerError } from '@supabase/server'

try {
  const supabase = createAdminClient()
} catch (e) {
  if (e instanceof SupabaseServerError) {
    console.error(e.code, e.message, e.hint, e.docs)
    return Response.json(e.toJSON(), { status: e.status })
  }
  throw e
}
```

型付きエラーを throw（`Errors` factory）:

```ts
throw Errors[MissingSupabaseURLError]()
throw Errors[MissingPublishableKeyError]('mobile', ['default', 'web'])
```

PostgresPoolError を 503 + Retry-After で返す:

```ts
import { PostgresPoolError } from '@supabase/server'

try {
  return Response.json(await ctx.postgres.query`select * from notes`)
} catch (e) {
  if (e instanceof PostgresPoolError) {
    const retryAfterMs = Number(e.details?.retryAfterMs ?? 1000)
    return Response.json(e.toJSON(), {
      status: e.status,
      headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) },
    })
  }
  throw e
}
```

## Notes

- 出典: https://supabase.com/llms/server.txt （Errors 節、2026-10 取得）
- `ctx.postgres` / `ctx.postgresAdmin` は `PostgresPoolError` を query 呼び出しから throw する。middleware はこれを response に変換しないため handler か host の error handler が応答を決める
- `EnvError`: `withSupabaseClient()` は handler 前（entry chain）、`withSupabaseAdminClient()` は最初の `supabaseAdmin` アクセス時（handler 内）に throw し、bridge は catch しない
- 文字列 code 値（`MISSING_CREDENTIALS` / `UNUSABLE_CREDENTIAL` / `INVALID_JWT` / `JWKS_FETCH_FAILED` / `JWKS_NOT_CONFIGURED` / `UNSUPPORTED_ROLE` / `MISSING_SUPABASE_URL` / `MISSING_RESOURCE_SERVER` / `MISSING_AUTHORIZATION_SERVER`）は原文の他節・例で確認できたものに限る。他エラーの文字列 code は原文に記載が無いため書いていない
- Supabase Auth 本体のエラー（GoTrue の `AuthApiError` 等）とは別系統。そちらは別カテゴリの `auth/error-codes.md` を参照

## Related

- [middleware](./middleware.md)
- [primitives](./primitives.md)
- [types](./types.md)
