# Primitives

framework 非依存の低レベル関数（`@supabase/server/core`）。カスタムフレームワークや edge runtime で自前に compose する。

## Signature / Usage

| Name | Role |
| --- | --- |
| `createAdminClient` | RLS バイパスの admin Supabase client（secret key） |
| `createContextClient` | 呼び出し元スコープの client（publishable key + 任意の JWT、RLS 適用） |
| `extractCredentials` | `Authorization` / `apikey` ヘッダーの純粋な抽出（検証なし） |
| `resolveEnv` | 環境変数から Supabase 設定を解決 |
| `verifyAuth` | 抽出 + 検証を 1 ステップで |
| `verifyCredentials` | 抽出済み credentials を許可 auth mode に対し検証 |

オプション型: `VerifyAuthOptions`（`verifyAuth` 用）、`VerifyCredentialsOptions`（`verifyCredentials` 用）。`CreateAdminClientOptions` / `CreateContextClientOptions` は `types.md` 参照。

## createAdminClient

RLS をバイパスする admin Supabase client を作る。secret key で認証し全データにフルアクセスする。stateless で request ごとに 1 client。

使用キー: `auth.keyName` を指定するとその `SUPABASE_SECRET_KEYS` 内の名前付きキーを使い、存在しなければ throw する。省略時は `default` キー、`default` が無ければ集合の最初のキーにフォールバックする。`"secret"` auth mode は `default` のみ照合しフォールバックしない点が異なる（`types.md` の `AuthModeWithKey`）。

```ts
// Uses the `default` secret key (or the first key if no `default` exists)
const supabaseAdmin = createAdminClient()
const { data } = await supabaseAdmin.from('audit_log').insert({ action: 'user_login' })
```

```ts
const supabaseAdmin = createAdminClient({ auth: { keyName: 'internal' } })
```

## createContextClient

呼び出し元 context にスコープされた Supabase client を作る。publishable key と（任意で）呼び出し元の JWT で構成され RLS policy が適用される。stateless で request ごとに 1 client。

使用キー: `auth.keyName` を指定するとその `SUPABASE_PUBLISHABLE_KEYS` 内の名前付きキー（無ければ throw）。省略時は `default`、無ければ最初のキー。`"publishable"` auth mode は `default` のみ照合しフォールバックしない。

```ts
const { data: auth } = await verifyAuth(request, { auth: 'user' })
const supabase = createContextClient({
  auth: { token: auth.token, keyName: auth.keyName },
})
const { data } = await supabase.rpc('get_my_items')
```

## extractCredentials

受信 HTTP request から認証 credentials を抽出する。`Authorization: Bearer <token>` を `token`、`apikey: <key>` を `apikey` として読む。検証は行わない純粋な抽出で、結果を `verifyCredentials` に渡して許可 auth mode に対し検証する。

```ts
import { extractCredentials } from '@supabase/server/core'

const creds = extractCredentials(request)
console.log(creds.token)  // "eyJhbGci..." or null
console.log(creds.apikey) // "sb-abc123-publishable-..." or null
```

## resolveEnv

実行時の環境変数から Supabase 設定を解決する。`SUPABASE_URL`、キー（`SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS`）、JWKS source（inline は `SUPABASE_JWKS`、remote は `SUPABASE_JWKS_URL`、または `SUPABASE_PUBLIC_URL` / 解決済み `url` から導出した well-known endpoint）を読む。Deno / Node.js / Bun で動作。Cloudflare Workers では `overrides` か node-compat を使う。

```ts
const { data: env, error } = resolveEnv()
if (error) throw error

// Override for tests
const { data: env } = resolveEnv({ url: 'http://localhost:54321' })
```

## verifyAuth

request から credentials を抽出して検証までを 1 ステップで行う（`extractCredentials` + `verifyCredentials` の便宜関数）。生の credentials を見る必要が無いときに使う。

```ts
import { verifyAuth } from '@supabase/server/core'

const { data: auth, error } = await verifyAuth(request, {
  auth: 'user',
})

if (error) {
  return Response.json({ message: error.message }, { status: error.status })
}

console.log(auth.userClaims!.id) // "d0f1a2b3-..."
```

## verifyCredentials

抽出済み credentials を 1 つ以上の許可 auth mode に対し検証する。mode を順に試し最初の一致が勝つ。mode はその credential が存在する場合のみ試され、JWT が存在して検証に失敗した場合は次の mode にフォールスルーせず `InvalidJwtError` で連鎖を short-circuit する。抽出と検証を一度に行うには `verifyAuth`。

全 mode がフォールスルーした場合は実際の原因を示すエラーを返す: request が何も運ばなかったなら `MissingCredentialsError`、`apikey` がどの設定キーにも一致しなければ `InvalidApiKeyError`、サーバー設定上どの request も成功し得ない場合は `500`（`JwksNotConfiguredError` / `NoKeysConfiguredError`）。全エラーは `hint` / `docs` / 非機密の `details` を持つ。

misconfiguration の `500` は何も一致しなかった後にのみ報告されるため、許可 mode が request の credentials に一致すればそれが優先される（例: `['user', 'secret']` で JWKS 無しでも有効な apikey があれば `secret` として認証される）。Authorization 位置の `sb_*` 値は API key であり user token ではなく caller error のまま。

```ts
const credentials = extractCredentials(request)
const { data: auth, error } = await verifyCredentials(credentials, {
  auth: ['user', 'publishable'],
})
if (error) {
  console.error(error.code, error.message, error.hint)
  return Response.json(error.toJSON(), { status: error.status })
}
```

## Notes

- 出典: https://supabase.com/llms/server.txt （Primitives 節、2026-10 取得）。import 元は原文例の `@supabase/server/core`（`extractCredentials` / `verifyAuth`）のみ確認済み。他 primitive の import パスは原文に記載が無い
- 原文は関数シグネチャを示さないため、引数・戻り値の型は書いていない（`{ data, error }` tuple を返す形は例から確認）

## Related

- [middleware](./middleware.md)
- [types](./types.md)
- [errors](./errors.md)
