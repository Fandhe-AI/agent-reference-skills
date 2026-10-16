# Moving off the adapters

`@supabase/server/adapters/*`（Hono / H3 / Elysia / NestJS）から `@supabase/middleware` entry + bridge への移行手順。adapter は deprecated、2026-12-01 削除。

## Signature / Usage

adapter は各フレームワーク固有に `SupabaseContext` を構築して handler から届く場所に置いていた。engine がこのモデルを置き換え、middleware は `(handler) => handler` の entry（Web `Request` / `Response` 上の wrapper）になった。`withSupabaseClient()` / `withSupabaseAdminClient()` / `withRequiredClaims()` などは compose 可能な通常の entry。残るのは bridge で、パッケージではなくプロジェクト側が所有する。

adapter は現時点で動作するが 2026-12-01 に削除される。トップレベルの `withSupabase(config, handler)`（`@supabase/server`）はこの変更の対象外。

移行で 3 つの変更が生じ、最初の 1 つはエンドポイントを開放し得る。

## The auth trap

adapter は未認証リクエストを拒否していたが `withClaims()` は拒否しない。`auth: 'user'` のエンドポイントを `withRequiredClaims()` でなく `withClaims()` に移すと 401 が無言の 200 になる。

```ts
// Before: an anonymous request gets 401 and the handler never runs.
app.use('*', withSupabase({ auth: 'user' }))

// After, wrong: an anonymous request gets 200. The handler runs with
// jwtClaims === null and an unauthenticated Supabase client.
app.use('*', toHono([withClaims(), withSupabaseClient()]))

// After, right: the same gate the adapter applied.
app.use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
```

`withClaims()` は存在するが無効な token は拒否する。credential が全く無いリクエストはエラーにせず `jwtClaims: null` を提供して通す（匿名パスを許す設計）。何も throw / log されず、RLS が anonymous role に見せる範囲（しばしば空配列）で 200 を返すため、データのバグに見え認証バグとして気付かれにくい。

`withRequiredClaims()`（`@supabase/server/middleware/required-claims`）は同じ project JWKS で検証し、handler 前に拒否し、非 null の `jwtClaims` を提供する。2 つは排他（両方 `jwtClaims` キーを宣言するため併用はコンパイルエラー）。

対象エンドポイントは handler でなく adapter config に書かれているためレビューで見落としやすい。

| Adapter config               | Rejected before           | Replacement                       |
| ---------------------------- | ------------------------- | --------------------------------- |
| `auth: 'user'`, or no config | missing or invalid JWT    | `withRequiredClaims()`            |
| `auth: 'none'`               | nothing                   | nothing; the client entries alone |
| `auth: 'publishable'`        | missing or wrong `apikey` | none. Keep `withSupabase`         |
| `auth: 'secret'`             | missing or wrong `apikey` | none. Keep `withSupabase`         |

config 無しの `withSupabase()` は `auth: 'user'` で拒否していた。`publishable` / `secret` には compose 可能なゲートが無く、`withSupabase({ auth: 'publishable' })` / `withSupabase({ auth: 'secret' })` のまま残す（変更不要）。キー検査の自作はエンドポイント開放の原因。これらのモードは `apikey` ヘッダーのみ読み `Authorization` は読まないため `Authorization: Bearer <key>` は素の 401。`auth: 'secret:<name>'` は `supabaseAdmin` を `secretKeys['<name>']` に向けるので、そのエントリは本物の Supabase secret key でなければならない。

`withRequiredClaims` は標準エラー payload を返し、`withSupabase({ auth: 'user' })` と同じ code を使う。

| Request                                               | Status | `code`                |
| ----------------------------------------------------- | ------ | --------------------- |
| No `Authorization` header                             | 401    | `MISSING_CREDENTIALS` |
| An `sb_*` API key in the `Authorization` slot         | 401    | `UNUSABLE_CREDENTIAL` |
| A token that fails verification                       | 401    | `INVALID_JWT`         |
| A token, but the JWKS could not be fetched            | 500    | `JWKS_FETCH_FAILED`   |
| A token, but no JWKS source and no usable project URL | 500    | `JWKS_NOT_CONFIGURED` |

adapter はこれらの code を出さず各フレームワーク固有の形で拒否した（Hono は `text/plain` の `HTTPException`、H3 は `HTTPError`、Elysia は `onError` 経由の `SupabaseError`、NestJS のみ `HttpException({ message, code }, status)`）。status で分岐するクライアントは問題ないが body を parse するクライアントは再確認が必要。

どちらの entry も CORS preflight に応答せず short-circuit に CORS ヘッダーも付かない。ブラウザ呼び出しでは gate の前に `@supabase/middleware/cors` の `withCors` を compose する（entry を compose しない route には CORS が無い。health check のようなブラウザから呼ぶ公開 route も `withCors` を含む独自配列が必要。`curl` では通常の 200 になりブラウザだけが拒否する）。

## Keep `withSupabase` where it fits

`withSupabase(config, handler)` は deprecated ではない。fetch handler を wrap するためフレームワークの chain には bridge 経由で入らない。既に素の fetch handler なら `withSupabase()` のままで正当な最終形。`userClaims` / `authMode` を含む完全な `SupabaseContext` を auth gate の背後で得られる唯一の方法でもある。

他の entry を周囲に compose するには handler 無しの `withSupabase({ auth: 'user' })` を位置で配置する `pipeline` entry として使う（前の entry は auth gate より先、後ろの entry は完全な `SupabaseContext` を受ける）。`withSupabase(config, entry(handler))` のネストも動く。entry 形は 1.6.0 以降。

```ts
import { pipeline } from '@supabase/middleware'
import { withCors } from '@supabase/middleware/cors'
import { withSupabase } from '@supabase/server'

export default {
  fetch: pipeline(
    [
      withCors({ origin: ['https://app.example.com'] }),
      withSupabase({ auth: 'user', cors: 'disabled' }),
    ],
    async (_req, ctx) => Response.json({ user: ctx.userClaims?.id })
  ),
}
```

`withSupabaseClient()` / `withSupabaseAdminClient()` は設定欠落時に `EnvError` を throw し bridge は catch しない（adapter は clean な 500 にしていた）。`withSupabaseClient()` は entry chain（handler 前）で、`withSupabaseAdminClient()` は lazy 構築で最初の `supabaseAdmin` プロパティアクセス時（handler 内）に throw する。両方をフレームワークの error boundary で処理する。

## The shape change

adapter は 1 つのネストした object を公開していたが entry はキーごとにフラットに提供する。

```ts
// Before
const { supabase, userClaims } = c.var.supabaseContext

// After
const supabase = c.var.supabase
const jwtClaims = c.var.jwtClaims
```

`supabase` / `supabaseAdmin` は機械的な書き換え。claims は違う: どの entry も `userClaims` を提供せず、`withClaims()` / `withRequiredClaims()` は生の JWT payload である `jwtClaims` を提供し field 名が異なる。

| `userClaims` (adapters) | `jwtClaims` (middleware) |
| ----------------------- | ------------------------ |
| `.id`                   | `.sub`                   |
| `.role`                 | `.role`                  |
| `.email`                | `.email`                 |
| `.appMetadata`          | `.app_metadata`          |
| `.userMetadata`         | `.user_metadata`         |

一括リネームは TypeScript ではコンパイルエラーになるが、plain JavaScript や `as` の背後では `jwtClaims.id` が無言で `undefined` になる（`.id` は行の書き込み値に使われがち）。各読み取りを表に沿って個別に書き換える。

## Step by step

順序を守る。auth の棚卸しをコード変更の前に行う（直後のステップがエンドポイントを開放し得るため）。

### 1. Check your versions

bridge は `@supabase/server` 1.6.0 以降と Node 22 以降が必要。response phase（CORS やヘッダー付与など outgoing response を書き換える entry）が必要かも決める（`frameworks.md` の表参照）。`supabase` を handler 内で読むだけなら不要。

```bash
npm ls @supabase/server   # 1.6.0 or later
node --version            # 22 or later
```

### 2. Inventory every adapter registration

何も編集する前に実施。必要な情報は handler でなく adapter config にあり、import を差し替えると見えなくなる。各 hit について `withSupabase(...)` 呼び出しと `auth` 値を記録する（config 無しは `auth: 'user'` 扱い）。step 7 で照合する。

```bash
grep -rn "@supabase/server/adapters" src/
```

### 3. Decide what replaces each auth value

上の表に従う。`auth: 'user'` と config 無しは `withRequiredClaims()`、`auth: 'none'` はゲート不要、`auth: 'publishable'` / `'secret'` は compose 可能なゲートが無いため `withSupabase` に残す（未移行のままが良い結果）。ここで `withClaims()` を使わない。

```ts
// auth: 'user', or no config
toHono([withRequiredClaims(), withSupabaseClient()])

// auth: 'none'
toHono([withSupabaseClient()])

// auth: 'publishable' or auth: 'secret'
// Stop. Keep withSupabase for this endpoint.
```

### 4. Copy the bridge for your framework

以後プロジェクト側で所有する 1 ファイル: `src/lib/supabase-middleware.ts`（NestJS は `src/lib/supabase.guard.ts`）。そのままコピーしコメントも残す（Hono の `c.res` clear-then-assign が典型）。

```bash
npm install @supabase/middleware
mkdir -p src/lib
curl --fail -o src/lib/supabase-middleware.ts \
  https://raw.githubusercontent.com/supabase/server/main/examples/frameworks/hono/supabase-middleware.ts
```

### 5. Swap the registrations

step 3 の判断に従い 1 つずつ。`withSupabaseAdminClient()`（`@supabase/server/middleware/admin-client`）は旧コードが `supabaseAdmin` を読んでいた箇所にのみ追加する（secret key が必要）。

```ts
// Before
import { withSupabase } from '@supabase/server/adapters/hono'
app.use('*', withSupabase({ auth: 'user' }))

// After
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'
import { toHono } from './lib/supabase-middleware.js'
app.use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
```

### 6. Rewrite the call sites

ネストした object からフラットなキーへ。`event.context`（H3）・Elysia の route context・`req`（NestJS）も同じ形。`userClaims` は対象外で、claims の読み取りは上の field 表に沿って書き換える。

```text
c.var.supabaseContext.supabase       ->  c.var.supabase
c.var.supabaseContext.supabaseAdmin  ->  c.var.supabaseAdmin
c.var.supabaseContext.userClaims.id  ->  c.var.jwtClaims.sub
```

```bash
grep -rn "supabaseContext" src/    # expect no results
```

### 7. Verify

順に 3 つ。2 番目がこの手順の目的。Types: typecheck。Auth: step 2 で拒否と記録した全エンドポイントが今も拒否することを実証する（typecheck は何も示さない。初回呼び出しの `200` はゲート欠落の失敗を意味する）。Behavior: テストスイートを実行し 1 つの移行済みエンドポイントを E2E で確認（`auth: 'user'` だったものはサインインして `jwtClaims.sub` が user id であることを確認）。status が同じでも拒否 body は変わる。

```bash
npx tsc --noEmit

BASE=http://localhost:3000

# no credentials -> expect 401
curl -s -o /dev/null -w "%{http_code}\n" $BASE/your-endpoint

# a valid user token -> expect 200
curl -s -o /dev/null -w "%{http_code}\n" \
  -H "Authorization: Bearer $TOKEN" $BASE/your-endpoint
```

### 8. Clean up

残りは意図して残したエンドポイント（`publishable` / `secret`）か見落とし。フレームワーク peer dependency は他で使われていない場合のみ削除する。

```bash
grep -rn "@supabase/server/adapters" src/
```

## Call-site cheat sheet

| Before                                                          | After                                                                |
| --------------------------------------------------------------- | -------------------------------------------------------------------- |
| `import { withSupabase } from '@supabase/server/adapters/hono'` | `import { toHono } from './lib/supabase-middleware.js'`              |
| `app.use('*', withSupabase({ auth: 'user' }))`                  | `app.use('*', toHono([withRequiredClaims(), withSupabaseClient()]))` |
| `app.use('*', withSupabase({ auth: 'none' }))`                  | `app.use('*', toHono([withSupabaseClient()]))`                       |
| `c.var.supabaseContext.supabase`                                | `c.var.supabase`                                                     |
| `c.var.supabaseContext.supabaseAdmin`                           | `c.var.supabaseAdmin`                                                |
| `c.var.supabaseContext.userClaims.id`                           | `c.var.jwtClaims.sub` (the field names change too; see the table)    |
| `event.context.supabaseContext.supabase` (H3)                   | `event.context.supabase`                                             |
| `req.supabaseContext.supabase` (NestJS)                         | `req.supabase`                                                       |

adapter の `auth: 'user' | 'publishable' | 'secret' | 'none'` は credential 検証とリクエスト拒否の 2 役を担っていた。compose 可能な entry でその両方を行うのは user mode の `withRequiredClaims()` のみ。書き換え無しで adapter と同じ verify-then-build を求めるなら deprecated でないトップレベル `withSupabase()` を使う（entry として `pipeline` に compose できる）。

## Hand it to an agent

URL の `hono` を `h3` / `elysia` / `nestjs`（NestJS は `supabase.guard.ts`）に置き換えて貼り付ける。

```text
Migrate this project off @supabase/server's framework adapters
(@supabase/server/adapters/*) onto @supabase/middleware entries. Work in the
order below. Do not start at step 3.

STEP 1: INVENTORY. Do this before editing anything.
Grep for `@supabase/server/adapters` and list every withSupabase(...)
registration it feeds, with that call's `auth` value. A bare withSupabase()
with no config means auth: 'user'. Show me this list before you edit.

STEP 2: DECIDE THE AUTH REPLACEMENT for each one. This is the step that can
open an endpoint up, so do it deliberately:
  auth: 'user' (or no config) -> withRequiredClaims() from
      '@supabase/server/middleware/required-claims'
  auth: 'none'                -> no gate needed
  auth: 'publishable'/'secret' -> STOP. There is no composable gate. Leave the
      endpoint on withSupabase and tell me about it. Do not hand-roll a key
      check.
The adapters REJECTED unauthenticated requests. withClaims() does NOT: it
contributes jwtClaims: null and falls through, turning a 401 endpoint into a
200 endpoint silently. Never use withClaims() as the replacement for
auth: 'user'. Never compose withClaims() and withRequiredClaims() together;
they share the jwtClaims key and that is a compile-time conflict.

STEP 3: FETCH THE BRIDGE. Add @supabase/middleware as a direct dependency of
the project; the bridge imports it. Then download
https://raw.githubusercontent.com/supabase/server/main/examples/frameworks/hono/supabase-middleware.ts
and save it as src/lib/supabase-middleware.ts, verbatim. Do not "improve",
condense, or drop comments from it.

STEP 4: SWAP each registration to the bridge called on an entry array, e.g.
  toHono([withRequiredClaims(), withSupabaseClient()])
For NestJS, call toNestGuard(entries) once, assign it to a const, and pass
that const to every @UseGuards().
Import the client entries from '@supabase/server/middleware/client' and
'@supabase/server/middleware/admin-client'. Only include
withSupabaseAdminClient() where the old code actually read supabaseAdmin.

STEP 5: REWRITE call sites from the nested shape to flat keys:
  c.var.supabaseContext.supabase       -> c.var.supabase
  c.var.supabaseContext.supabaseAdmin  -> c.var.supabaseAdmin
Apply the equivalent for event.context / the Elysia context / req.
userClaims is NOT one of these. No middleware contributes that key;
c.var.userClaims does not exist. The entries contribute jwtClaims, the RAW JWT
payload, with different field names:
  userClaims.id            -> jwtClaims.sub
  userClaims.role          -> jwtClaims.role
  userClaims.email         -> jwtClaims.email
  userClaims.appMetadata   -> jwtClaims.app_metadata
  userClaims.userMetadata  -> jwtClaims.user_metadata
Rewrite each read individually. Do NOT do a blanket rename; in plain
JavaScript that leaves .id undefined with no error.
When finished there must be no remaining reference to `supabaseContext`.

STEP 6: VERIFY. Run the typecheck. Then, for every endpoint you listed in
step 1 as rejecting, confirm an unauthenticated request still returns 401 and
an authenticated one still returns 200. A passing typecheck does not prove
this; check it separately.

CONSTRAINTS
- Do NOT remove the `c.res = undefined` line in the Hono bridge or its comment.
  It looks redundant and is not: when a response-phase entry returns a new
  Response, Hono merges the previous response's headers over it, reverting
  anything the entry rewrote.
- On Hono, put a second entry array in its own sub-app mounted with
  app.route(). A second app.use() statement leaves c.var untyped.
- On NestJS, do not put withCors in the guard's array. CORS is
  app.enableCors().

REPORT, as a table: every adapter registration you found, its old `auth` value,
and whether the migrated version still rejects anonymous requests. Then list
every file you changed and anything you could not migrate.
```

## Notes

- 出典: https://supabase.com/docs/reference/server/frameworks#moving-off-the-adapters （原本 https://supabase.com/llms/server.txt、2026-10 取得）
- adapter 削除日: 2026-12-01（原文 "December 1, 2026"）
- 上記 agent prompt 内の `raw.githubusercontent.com/.../main/...` は原文のまま（`main` 参照。pin されていない点に注意）

## Related

- [frameworks](./frameworks.md)
- [adapters](./adapters.md)
- [middleware](./middleware.md)
