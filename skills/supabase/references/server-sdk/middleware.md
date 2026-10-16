# Middleware

`@supabase/server` の middleware / entry 群。`withSupabase` 以外は `pipeline([...], handler)`（`@supabase/middleware`）に compose する。

## Signature / Usage

| Name | Import | Contributes / Role |
| --- | --- | --- |
| `withSupabase` | `@supabase/server` | 認証 + クライアント生成 + CORS を handler に wrap（deprecated ではない） |
| `createSupabaseContext` | `@supabase/server` | request から `SupabaseContext` を `{ data, error }` で構築 |
| `withClaims` | `@supabase/server/middleware/claims` | `ctx.jwtClaims`（token 無しは `null`、gate ではない） |
| `withRequiredClaims` | `@supabase/server/middleware/required-claims` | 非 null の `ctx.jwtClaims`（user-mode gate） |
| `withSupabaseClient` | `@supabase/server/middleware/client` | `ctx.supabase`（RLS 適用） |
| `withSupabaseAdminClient` | `@supabase/server/middleware/admin-client` | `ctx.supabaseAdmin`（RLS バイパス） |
| `withPostgresClient` | `@supabase/server/middleware/postgres` | `ctx.postgres`（RLS スコープの `pg`） |
| `withPostgresAdminClient` | `@supabase/server/middleware/postgres-admin` | `ctx.postgresAdmin`（RLS バイパスの `pg`） |
| `withOAuthProtectedResource` | `@supabase/server` | RFC 9728 OAuth Protected Resource |
| `fromSupabaseUrl` | `@supabase/server` | `authorizationServer` を Supabase Auth issuer に向ける |
| `ident` | 原文に import 記載なし | Postgres 識別子の quote |

Config 型: `WithClaimsConfig` / `WithRequiredClaimsConfig` / `WithSupabaseClientConfig` / `WithSupabaseAdminClientConfig` / `WithPostgresClientConfig` / `WithPostgresAdminClientConfig`（原文はいずれも "Configuration for <name>" のみ。`WithSupabaseClientConfig` は `createContextClient` と同じ env / client options から per-request の auth identity を除いたもの、`WithSupabaseAdminClientConfig` は `createAdminClient` のもの）。`PostgresApi` は `ctx.postgres` / `ctx.postgresAdmin` の形（両者は同一 surface で、前者は claims 注入 + role 降格のトランザクションで wrap、後者はそのまま接続文字列の role で実行）。`PostgresPoolOptions` は両 middleware の pool サイズ設定（同一接続文字列の 2 entry は options が同値の場合のみ pool を共有）。`RequestClaims` は `withPostgresClient` が上流 context に必要とする最小 claims 形状（`role` のみ読み、全体を `request.jwt.claims` にシリアライズ）。

## withSupabase

Web API の `Request` / `Response` 標準上で、CORS preflight・credential 検証・context 生成・エラーレスポンスを処理して handler を wrap する。handler は認証成功時のみ実行される。

```ts
import { withSupabase } from '@supabase/server'

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    const { data } = await ctx.supabase.rpc('get_my_profile')
    return Response.json(data)
  }),
}
```

## createSupabaseContext

`withSupabase` ラッパー無しで request から `SupabaseContext` を直接作る。フレームワーク route handler やカスタム middleware 用。`Response` でなく result tuple を返す。

```ts
const { data: ctx, error } = await createSupabaseContext(request, { auth: 'user' })
if (error) {
  // `toJSON()` yields { source, code, message, hint, docs, details }
  return Response.json(error.toJSON(), { status: error.status })
}
const { data } = await ctx.supabase.rpc('get_my_items')
```

## withClaims

project JWKS に対し Bearer token を検証して `ctx.jwtClaims` を提供する（`withSupabase` の `user` mode と同じ検証コア）。`withSupabase` で wrap しない standalone `pipeline([...], handler)` 用。`withSupabase` 内では context が既に `jwtClaims` を持つため不要。

- `Authorization: Bearer` token 無し（またはその位置に `sb_*` API key）: `null` を提供し anonymous として通す
- token あり・無効: 401 JSON（`{ message, code }`、`withSupabase` と同じ形）で short-circuit
- token あり・JWKS 未設定: 500 で short-circuit（検証は必須で decode-only mode は無い）

`withClaims` は auth gate ではない。token 無しを決して拒否せず、`[withClaims(), withSupabaseClient()]` は匿名を受け入れ `withSupabase({ auth: 'user' })`（token 無しを 401）の compose 版ではない。認証必須には `withRequiredClaims` を使う。両者は `jwtClaims` キーを共有するので併用はコンパイル時の衝突。

```ts
import { pipeline } from '@supabase/middleware'
import { withClaims } from '@supabase/server/middleware/claims'
import { withPostgresClient } from '@supabase/server/middleware/postgres'

export default {
  fetch: pipeline([withClaims(), withPostgresClient()], async (req, ctx) => {
    const rows = await ctx.postgres.query`select id, title from posts`
    return Response.json({ rows, caller: ctx.jwtClaims?.sub ?? 'anon' })
  }),
}
```

## withRequiredClaims

user-mode の auth gate。有効な user JWT を要求し非 null の `ctx.jwtClaims` を提供する。検証は `withSupabase` の `user` mode と同じ project JWKS コア。`withClaims` の required-caller 版。short-circuit は標準エラー payload で、同一リクエストに対し `withSupabase({ auth: 'user' })` と同じ code を返す。

- `Authorization: Bearer` token 無し: 401 `MISSING_CREDENTIALS`（handler は実行されない）
- その位置に `sb_*` API key: 401 `UNUSABLE_CREDENTIAL`
- token あり・無効: 401 `INVALID_JWT`（具体的理由を含む）
- token あり・JWKS 未設定: 500 `JWKS_NOT_CONFIGURED`

contribution が非 null のため gated handler は `ctx.jwtClaims` を fallback 無しで直接読める。`withPostgresClient` のように `jwtClaims` 前提を宣言する下流 entry は追加検証無しで compose できる。401 / 500 の short-circuit に CORS ヘッダーは付かず、素の pipeline は `OPTIONS` preflight に応答しない。ブラウザ向けには gate の前に `withCors`（`@supabase/middleware/cors`）を compose する。`withSupabase` の後ろに置くと context が検証済み `jwtClaims` を既に持つためコンパイル時の衝突になる（その経路のゲートは `withSupabase({ auth: 'user' })`）。

```ts
import { pipeline } from '@supabase/middleware'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withPostgresClient } from '@supabase/server/middleware/postgres'

export default {
  fetch: pipeline([withRequiredClaims(), withPostgresClient()], async (req, ctx) => {
    const rows = await ctx.postgres.query`select id, title from posts`
    return Response.json({ rows, caller: ctx.jwtClaims.sub })
  }),
}
```

## withSupabaseClient

呼び出し元の identity でスコープされた `ctx.supabase` を提供する（RLS 適用）。`withSupabase` が内部で compose するのと同じ middleware。standalone では Bearer token（あれば）を未検証のまま付与する（PostgREST が毎クエリ検証）。pipeline 自体が検証済み claims を必要とするなら上流に `withClaims` を compose する。

```ts
import { pipeline } from '@supabase/middleware'
import { withSupabaseClient } from '@supabase/server/middleware/client'

export default {
  fetch: pipeline([withSupabaseClient()], async (req, ctx) => {
    const { data } = await ctx.supabase.from('posts').select('id, title')
    return Response.json(data)
  }),
}
```

## withSupabaseAdminClient

secret key で認証された RLS バイパスの `ctx.supabaseAdmin` を提供する。`withSupabase` が内部で compose するのと同じ middleware。client は `ctx.supabaseAdmin` の最初のプロパティアクセス時に構築され request 内で memoize される。アクセスしない handler は secret key 不要。

```ts
import { pipeline } from '@supabase/middleware'
import { withSupabaseAdminClient } from '@supabase/server/middleware/admin-client'

export default {
  fetch: pipeline([withSupabaseAdminClient()], async (req, ctx) => {
    await ctx.supabaseAdmin.from('audit_log').insert({ action: 'ping' })
    return Response.json({ ok: true })
  }),
}
```

## withPostgresClient

RLS スコープの `pg` client `ctx.postgres` を提供する（「認証して user として query する」の安全版）。`withSupabaseClient` の direct-connection 版で service-role 版は `withPostgresAdminClient`。各 query は PostgREST と同様、呼び出し元の claims を注入し role へ降格する短いトランザクションで実行される。すべて transaction-local のため pool 接続に漏れない。

```sql
begin;
select set_config('request.jwt.claims', $claims, true);  -- auth.uid() resolves
set local role "authenticated";                          -- RLS now enforces
<your query>
commit;
```

- `authenticated` / `anon` のみ想定。他の role（`service_role` を含む）を指す token は 500 `code: 'UNSUPPORTED_ROLE'` で**拒否**され `anon` に降格されない。RLS バイパスは `withPostgresAdminClient` を明示的に compose する
- カスタム Postgres role（`role` claim）は未対応のため降格でなく拒否
- `ctx.jwtClaims`（`withSupabase` が検証済みで提供）を読むので pipeline で `withSupabase` の後にそのまま compose 可。standalone では `withClaims` を併用して `ctx.jwtClaims` を先に用意する
- テーブル権限: `authenticated` / `anon` として実行されるため RLS policy に加えて明示的な table privilege（例 `grant select, insert on <table> to authenticated`）が必要。不足は RLS の前に `permission denied`（SQLSTATE 42501）
- `pg` は raw TCP が必要なため Node / Deno（Supabase Edge runtime 含む）で動作し、Workers 型 isolate では動かない

```ts
pipeline([withSupabase({ auth: 'user' }), withPostgresClient()], handler)
```

## withPostgresAdminClient

RLS を**バイパスする** `pg` client `ctx.postgresAdmin` を提供する（全テーブルアクセス用）。`withSupabaseAdminClient` の direct-connection 版で、`withPostgresClient` が強制するガードレールからの意図的な opt-out。query は接続文字列の role のまま実行され、claim 注入・role 切替・wrapping transaction は無い。その role が読めるものは呼び出し元も読める。

`withPostgresClient` と異なり上流 prerequisite を宣言せず `ctx.jwtClaims` を見ないため、`auth: 'secret'` / `auth: 'none'` を含む任意の auth mode で compose できる。

```ts
import { pipeline } from '@supabase/middleware'
import { withSupabase } from '@supabase/server'
import { withPostgresAdminClient } from '@supabase/server/middleware/postgres-admin'

pipeline([withSupabase({ auth: 'secret' }), withPostgresAdminClient()], handler)
```

両方が必要な handler では両方を compose できる（pool は共有され `ctx.postgres` は RLS スコープのまま）:

```ts
pipeline([withSupabase({ auth: 'user' }), withPostgresClient(), withPostgresAdminClient()], handler)
```

- RLS は参照されないため user ごとのスコープは自分で `where` 句を書く。user 境界を越える必要がない限り `withPostgresClient` を使う
- `pg` は raw TCP が必要で Workers 型 isolate では動かない

## withOAuthProtectedResource

request handler を OAuth 2.1 Protected Resource（RFC 9728）として wrap する。

- `GET {resource}/oauth-protected-resource` で OAuth Protected Resource Metadata を返す（`OPTIONS` preflight を含む permissive CORS 付き）
- inner handler の `401` に `WWW-Authenticate: Bearer resource_metadata="..."` を付加する（handler が既に `WWW-Authenticate` を設定していればそちらが優先）
- 他の path は inner handler にそのまま通す
- 既定 URL を導出できない場合は `withSupabase` が設定エラーで返す JSON エラー（`500`、`x-supabase-server-error`）で応答する。設定された `resourceServer` / `authorizationServer` 関数の throw は呼び出し側のものとして伝播する

metadata route は path の**末尾**で照合されるため、`/oauth-protected-resource` で終わる **任意の** `GET` / `OPTIONS` が深さに関係なくここで応答され inner handler には届かない。他メソッドは通過。

Supabase Edge Functions ではゼロ設定。それ以外では `resourceServer` が必須で `authorizationServer` は `SUPABASE_URL` にフォールバックする。解決できない場合は `MISSING_RESOURCE_SERVER` / `MISSING_AUTHORIZATION_SERVER`。下流 context に `ctx.oauthProtectedResource`（解決済み metadata URL）を提供する。`withSupabase` の内側にネストする場合は最外の呼び出しが `satisfies FetchHandler` で anchor されると handler の `ctx` に型付けされる。認証情報を要求する auth mode の `withSupabase` の直後に置くとゲートが discovery と preflight に先に応答するため、スタック構築時に compose が拒否される。

```ts
import { withOAuthProtectedResource, withSupabase } from '@supabase/server'

Deno.serve(
  withOAuthProtectedResource(
    withSupabase({ auth: 'user' }, async (_req, { supabase }) => {
      const { data, error } = await supabase.from('items').select('*')
      if (error) throw error
      return Response.json(data)
    }),
  ),
)
```

```ts
import { withOAuthProtectedResource, fromSupabaseUrl } from '@supabase/server'

export default {
  fetch: withOAuthProtectedResource(
    {
      resourceServer: (req) => new URL(req.url).origin + '/api/mcp',
      authorizationServer: fromSupabaseUrl('https://abc123.supabase.co'),
    },
    handler,
  ),
}
```

非 Supabase の authorization server:

```ts
withOAuthProtectedResource(
  {
    resourceServer: 'https://api.example.com/mcp',
    authorizationServer: 'https://example.clerk.accounts.dev',
  },
  handler,
)
```

関連 helper: `resourceMetadataResponse`（RFC 9728 の metadata response。URL は Edge Functions 導出が既定で platform 外では throw するため `resource` / `authorizationServers` で上書き。options 型は `ResourceMetadataOptions`）、`unauthorizedResponse`（`WWW-Authenticate: Bearer resource_metadata="..."` 付き `401`。metadata URL は Edge Functions 導出が既定で platform 外では throw するため `resourceMetadataUrl` で上書き）。設定型 `OAuthProtectedResourceConfig` は `types.md` 参照。

## fromSupabaseUrl

`authorizationServer` を Supabase プロジェクトの Auth issuer に向ける。アプリ自身の origin が Supabase プロジェクトと無関係で request から issuer を導出できない、Supabase Edge Functions 外で使う。

```ts
import { withOAuthProtectedResource, fromSupabaseUrl } from '@supabase/server'

withOAuthProtectedResource(
  {
    resourceServer: (req) => new URL(req.url).origin + '/api/mcp',
    authorizationServer: fromSupabaseUrl('https://abc123.supabase.co'),
  },
  handler,
)
```

## ident

Postgres 識別子（table / column / role 名）を SQL テキストへ安全に補間するために quote する。bind parameter は *値* のみ扱い（`order by $1` は定数文字列 `$1` で並べ替え、`select $1 from t` はカラムでなくリテラルを選ぶ）、識別子は SQL テキストとして届く必要がある。この関数は名前を quote し埋め込み quote を二重化するので結果は常にちょうど 1 つの識別子になる。

**allowlist ではない。** 呼び出し側が与えた名前を quote しても valid な識別子になるだけで許可された識別子にはならない。`ident(req.query.sort)` は SQL injection にならないが、見せるべきでない column を読まれ得る。先に自分で管理する固定集合と照合してから quote する。

```ts
const SORTABLE = new Set(['created_at', 'title'])
if (!SORTABLE.has(column)) throw new Error('unsupported sort column')
const rows = await ctx.postgres.queryRaw(
  `select id, title from posts order by ${ident(column)} desc`,
)
```

## Notes

- 出典: https://supabase.com/llms/server.txt （Middleware 節、2026-10 取得）。原文は関数シグネチャを示さないため、引数型・戻り値型はここに書いていない
- `withSupabase` / `createSupabaseContext` / `withClaims` 等は standalone の `pipeline` と `withSupabase` 内部で役割が異なる点に注意（`withSupabase` 内では `jwtClaims` 済みで `withClaims` 不要）
- Supabase の `@supabase/server` middleware は Hono / H3 等の web フレームワークの middleware 概念とは別物（bridge を介して接続する。`frameworks.md` 参照）

## Related

- [primitives](./primitives.md)
- [types](./types.md)
- [errors](./errors.md)
- [frameworks](./frameworks.md)
- [migrating-off-adapters](./migrating-off-adapters.md)
