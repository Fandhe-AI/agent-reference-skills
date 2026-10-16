# Framework bridges

`@supabase/server` の middleware を Hono / H3 (Nuxt) / Elysia / NestJS / TanStack Start 内で動かす bridge（プロジェクトにコピーする 1 ファイル）。

## Signature / Usage

- bridge は `@supabase/middleware` の entry 配列をフレームワーク自身の middleware スロットで実行する。route handler は `supabase` / `jwtClaims` などをフレームワークのリクエスト状態から読む
- 従来の framework adapter（`@supabase/server/adapters/*`）は deprecated、2026-12-01 削除。移行は `migrating-off-adapters.md`
- 必要: `@supabase/server` 1.6.0 以降、Node 22 以降。`withRequiredClaims` は 1.5.1、`withSupabase` の entry 形は 1.6.0 で追加。1.5.1 未満には `/middleware/*` export が無い
- bridge ファイルは `@supabase/middleware` を import するため直接依存として追加する（pnpm 等の strict な package manager では transitive dependency を import できない）
- bridge ファイルは https://github.com/supabase/server/tree/main/examples/frameworks にある。コメント込みでそのままコピーする（冗長に見える行にも理由がある）

### bridge が提供する 3 機能

- Context: entry が `supabase` / `jwtClaims` などの型付きキーを提供し handler が読む
- Short-circuit: entry が `Response` を返すと route は実行されない（`withRequiredClaims` の拒否方法）
- Response phase: `async function*` の entry が `yield` で outgoing response を見て書き換える（`withCors` が必要とする）

| Framework      | Context | Short-circuit | Response phase | Pattern           |
| -------------- | ------- | ------------- | -------------- | ----------------- |
| Hono           | Yes     | Yes           | Yes            | middleware slot   |
| H3 / Nuxt      | Yes     | Yes           | Yes            | middleware slot   |
| Elysia         | Yes     | Yes           | Yes            | wrap `app.handle` |
| NestJS         | Yes     | Yes           | No             | guard             |
| TanStack Start | Yes     | Yes           | Yes            | middleware slot   |

handler 内で `supabase` を読むだけなら全行で足りる。bridge は呼び出し時に entry 配列を 1 回だけ fold し、状態は request をまたいで保持される。同じキーを提供する 2 entry や前提 entry 欠落は呼び出し箇所でコンパイルエラーになる。

保護 route group は `withRequiredClaims()`、公開 group は `withClaims()` を使う。両者とも `jwtClaims` を提供するため同一配列には置けない。

| Framework      | One array per route group                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Hono           | One sub-app per array, mounted with `app.route()`. A second `app.use()` statement is not enough.              |
| H3 / Nuxt      | `app.use('/path', toH3(entries))` before the routes under that path                                           |
| Elysia         | One Elysia instance per array, each wrapped with `wrapElysia`, behind a fetch handler that dispatches by path |
| NestJS         | `@UseGuards()` on the controller or the handler                                                               |
| TanStack Start | `.middleware([...])` on each server function or server route                                                  |

## Hono

`hono/supabase-middleware.ts` をコピー。`toHono` が Hono middleware を返す。chain で `.use()` し、提供キーは `Env` 宣言なしで `c.var` に型付けされる。ゲートする route より前に登録する（後から追加した route より前の middleware しか効かず、先に追加した route はゲート無しで動く）。

`app.use(...)` と `app.get(...)` を別行にすると型が `c.var` に伝播しない（ゲートは動くので型検査失敗だけが兆候）。別配列の route は別 sub-app にして `app.route()` でマウントする。

bridge の `c.res` は代入前にクリアされる。response-phase entry が新しい `Response` を返すと Hono の `res` setter が前のヘッダーをコピーし書き換えを戻してしまうため。この行とコメントは残す。Cloudflare Workers では bridge が `c.env` で pipeline を seed するので `getEnv` が binding を読める。

```ts
import { Hono } from 'hono'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toHono } from './lib/supabase-middleware.js'

const app = new Hono()
  .use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
  .get('/todos', async (c) => {
    const { data, error } = await c.var.supabase.from('todos').select()
    if (error) return c.json({ error: error.message }, 500)
    return c.json(data)
  })
  .get('/me', (c) => c.json({ id: c.var.jwtClaims.sub }))

export default { fetch: app.fetch }
```

```ts
import { withClaims } from '@supabase/server/middleware/claims'

const me = new Hono()
  .use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
  .get('/', (c) => c.json({ id: c.var.jwtClaims.sub }))

const feed = new Hono()
  .use('*', toHono([withClaims(), withSupabaseClient()]))
  .get('/', (c) => c.json({ anonymous: c.var.jwtClaims === null }))

const app = new Hono().route('/me', me).route('/feed', feed)
```

## H3 / Nuxt

`h3/supabase-middleware.ts` をコピー。`toH3` が H3 middleware を返す。`event.context` はジェネリックでないため、entry 配列を `const` に切り出し `@supabase/middleware` の `Contributions<typeof entries>` で読む（または小さな型付き accessor を自作）。

```ts
import { H3 } from 'h3'
import type { Contributions } from '@supabase/middleware'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toH3 } from './lib/supabase-middleware.js'

const entries = [withRequiredClaims(), withSupabaseClient()] as const

const app = new H3()
app.use(toH3(entries))

app.get('/todos', async (event) => {
  const { supabase } = event.context as Contributions<typeof entries>
  const { data, error } = await supabase.from('todos').select()
  if (error) throw error
  return data
})

export default { fetch: app.fetch }
```

## Elysia

`elysia/supabase-middleware.ts` をコピー。Elysia の lifecycle hook は request phase のみで `.resolve()` に `next()` が無く outgoing response を見られない。そこで `wrapElysia` が entry を `app.handle` の周りに compose し、`supabaseCtx()` plugin が context を route に渡す。

`supabaseCtx<typeof entries>()` で route context を型付けする（`wrapElysia` と同じ tuple 型を渡す）。entry は app 全体を包むため app-wide に効く。別配列が必要なら別 Elysia instance を別々に wrap し、前段の fetch handler で path ごとに振り分ける。

2 関数は対で使う。`wrapElysia` 無しで `app.listen()` や `export default app` で提供すると entry が実行されず `supabaseCtx()` が全 route で throw する。

```ts
import { Elysia } from 'elysia'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { supabaseCtx, wrapElysia } from './lib/supabase-middleware.js'

const entries = [withRequiredClaims(), withSupabaseClient()] as const

const app = new Elysia()
  .use(supabaseCtx<typeof entries>())
  .get('/todos', async (c) => {
    const { data, error } = await c.supabase.from('todos').select()
    if (error) throw error
    return data
  })

export default {
  fetch: wrapElysia(entries, (req) => app.handle(req)),
}
```

## NestJS

`nestjs/supabase.guard.ts` をコピー。`toNestGuard` が guard class を返す。guard は context と short-circuit のみ（response phase 不可: interceptor は `Response` でなく controller の戻り値を受けるため `yield` が作用しない）。

- `withCors` を配列に入れても short-circuit（401）にしかヘッダーが付かず成功レスポンスには付かない。preflight は guard に届かず（guard は routing 後で `OPTIONS` route が無いため）404 になる。CORS は `app.enableCors()` を使い、guard の配列に `withCors` を入れない
- `toNestGuard` は 1 回だけ呼び class を全 route で再利用（pipeline を 1 回だけ fold）。short-circuit 時は entry のヘッダーを response にコピーし、entry の status と `{ message, code }` body で `HttpException` を throw する
- bridge は Nest の request から headers と method で Web `Request` を作る。**body は転送されない**。body を読む entry は空 body を見て動くため、署名検査・body 監査を配列に置くと何も検査されず通る。これらは Nest middleware に置く
- Nest request が既に持つプロパティ（`body` / `query` 等）と同名のキーを提供する contribution は上書きせず throw する
- `Injectable()` は関数呼び出しとして適用するためファイル自体は decorator transform なしで動くが、controller は decorator が必要（swc / ts-node / build step。Node 組み込みの type stripping は `@Controller()` 行を拒否）
- Nest は `POST` に既定で 201 を返す（他フレームワークは 200）

```ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import type { Contributions } from '@supabase/middleware'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toNestGuard } from './lib/supabase.guard.js'

const entries = [withRequiredClaims(), withSupabaseClient()] as const
const SupabaseGuard = toNestGuard(entries)

@Controller('todos')
export class TodosController {
  @Get()
  @UseGuards(SupabaseGuard)
  async list(@Req() req: Contributions<typeof entries>) {
    const { data, error } = await req.supabase.from('todos').select()
    if (error) throw error
    return data
  }
}
```

## TanStack Start

TanStack Start に adapter は存在しなかったため統合ガイダンス。adapter からの移行手順は適用されない。`tanstack-start/supabase-middleware.ts` をコピー。`toTanStackStart` が request middleware を返す。

- `request` は既に Web `Request`、`next()` は下流 `Response` を持つ object に解決される
- `.server<Contributions>` が下流の `context` を型付けする（ジェネリックに制約が無く、省略すると context が `undefined` 型になる）。`<const Entries>` が tuple を保つので `context.*` が型付きのまま
- engine は context を自分で seed する場合のみ request body を buffer する。bridge は seed するので in place で buffer し、cached reader を同一 object に設置するため entry と handler が同じ body を読める
- `createMiddleware({ type: 'request' })` を使う（`Response` を返して short-circuit でき、`createServerFn().middleware([...])` が request middleware を受け付ける）
- server function では Start の fetcher は `application/json` body を status を見ずに値として返す（`response.ok` は non-JSON のときのみ）。`withRequiredClaims()` の 401 が呼び出し側の promise を `{ message, code }` で resolve してしまうため、bridge は server function での short-circuit を `status` と `code` 付き error として rethrow する。server route は `Response` をそのまま返す
- `.middleware([...])` を呼ぶファイルは client に出荷されるため、参照する entry module は client から到達可能。設定は request ごとに `getEnv` で読み、secret を module scope に置かない
- Vite dev server は CORS に自前で応答するので `withCors` 無しの route は dev で動き build 後に失敗する。ブラウザから呼ぶ全 route に `withCors` を compose し、production build で preflight を確認する

```ts
import { createServerFn } from '@tanstack/react-start'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toTanStackStart } from './lib/supabase-middleware.js'

const supabase = toTanStackStart([withRequiredClaims(), withSupabaseClient()])

export const getTodos = createServerFn()
  .middleware([supabase])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from('todos').select()
    if (error) throw error
    return data
  })

export const whoAmI = createServerFn()
  .middleware([supabase])
  .handler(async ({ context }) => ({ id: context.jwtClaims.sub }))
```

## Notes

- 出典: https://supabase.com/docs/reference/server/frameworks （原本 https://supabase.com/llms/server.txt、2026-10 取得）
- adapter 利用中は先に `migrating-off-adapters.md` の auth trap を読むこと（エラー無しでエンドポイントが開放され得る）
- TanStack Start の bridge は TanStack Start 側スキルの `createServerFn` / middleware とは別の Supabase 側 bridge 実装

## Related

- [migrating-off-adapters](./migrating-off-adapters.md)
- [middleware](./middleware.md)
- [adapters](./adapters.md)
