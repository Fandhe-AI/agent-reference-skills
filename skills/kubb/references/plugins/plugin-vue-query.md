# @kubb/plugin-vue-query

OpenAPI 仕様から Vue Query（TanStack Query）のヘルパーを生成するプラグイン。既定では `queryOptions` ファクトリとキーのみ、`hooks: true` でリアクティブなパラメーターを持つ `useQuery` / `useMutation` composables も生成する（plugin-vue-query 5.10.1 の docs に準拠）。

## インストール

```bash
npm install --save-dev @kubb/plugin-vue-query
npm install @tanstack/vue-query vue
```

HTTP クライアントは同梱されない。`@kubb/plugin-ts`（または codec 型を使う場合は `pluginZod({ inferred: 'codec' })`）とクライアントプラグイン（`@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client`）が必要で、クライアント側で `sdk` を未設定にする。`@tanstack/vue-query` 5.41 以降の v5 と `vue` 3.3 以降の v3 を利用側アプリに入れる。バリデーションはクライアントプラグイン側で設定する。

## 設定オプション（v5）

`@kubb/plugin-react-query` と同様の v5 構成。`parser` / `paramsType` / `paramsCasing` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'hooks', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割 |
| `client` | `'fetch' \| 'axios' \| 'client'` | 自動検出 | composables が呼ぶ登録済みクライアントプラグイン。`'client'` は `@kubb/plugin-client`（クライアントモジュールが `RequestConfig` / `ResponseErrorConfig` 型も export する必要あり） |
| `returnType` | `'full' \| 'data'` | `'data'` | composables が resolve する値の形。`'full'` はクライアントの `RequestResult` 全体（`{ status, data, error, contentType, headers, request, response }`）を返し status・レスポンスヘッダーを読める（`result.value?.response.headers.get('ETag')`）。infinite query はカーソルを `lastPage.data` から読む。クライアントプラグイン側の `returnType` が `'full'` か `'plain'` である必要があり、クライアントが `'data'` だと生成時にエラーで止まる |
| `infinite` | `Partial<Infinite> \| false` | `false` | `infiniteQueryOptions` / `useInfiniteQuery` の生成。`hooks: true` が必要。サブオプション（`queryParam` 既定 `'id'`、`initialPageParam` 既定 `0`、`nextParam` / `previousParam` / `cursorParam`（非推奨）/ `getNextPageParam` / `getPreviousPageParam` 既定 `null`）は plugin-react-query と同じ。`getNextPageParam` / `getPreviousPageParam` は文字列または関数（`definePageParam` は `@kubb/plugin-vue-query` から import） |
| `query` | `Partial<Query> \| false` | `{ methods: ['GET', 'QUERY'], importPath: '@tanstack/vue-query' }` | クエリの設定・無効化。`methods` を上書きする場合 `'QUERY'` を残さないと QUERY operation がスキップされる |
| `queryKey` | `(props: { node, casing, variant }) => Array<unknown>` | export 済み `queryKeyTransformer` | 各クエリの `queryKey` 構築（`variant` は `'query'` / `'infiniteQuery'`）。文字列は `JSON.stringify(...)` で包む。既定キーは infinite に `infinite: true` を付与 |
| `mutation` | `Partial<Mutation> \| false` | `{ methods: ['POST', 'PUT', 'PATCH', 'DELETE'], importPath: '@tanstack/vue-query' }` | ミューテーションの設定・無効化。`hooks` 指定時 `useMutation` の import 元になる |
| `mutationKey` | `(props: { node, casing, variant }) => Array<unknown>` | export 済み `mutationKeyTransformer` | 各ミューテーションの `mutationKey` 構築（`variant: 'mutation'`） |
| `hooks` | `boolean` | `false` | factory の上に `use*` composables（`useQuery` / `useInfiniteQuery` / `useMutation`）を生成 |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverVueQuery>` | `resolverVueQuery` | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginVueQuery } from '@kubb/plugin-vue-query'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginFetch(),
    pluginVueQuery({ hooks: true }),
  ],
})
```

## Notes

- Migration (v4 → v5): React Query の変更（`hooks` 既定 `false`、grouped `*Options`、自動 `enabled` ガード削除、`client` は `'axios' | 'fetch'` の自動検出）に加え、各パラメーターグループが `MaybeRefOrGetter` を受け取り、生成クライアント呼び出しで `toValue()` により unwrap される。composables を保つには `hooks: true`
- Migration (5.5 → 5.10): `returnType` was added in 5.9.0 (default `'data'` keeps the previous output); `resolver.query.clientName` and `resolver.mutation.typeName` were removed in 5.8.0 (delete them from a custom `resolver`); the default `queryKeyTransformer` / `mutationKeyTransformer` are exported since 5.5.4 (`import { queryKeyTransformer } from '@kubb/plugin-vue-query'`, spread its result to extend the default key); `inferred: 'direction'` was renamed `inferred: 'codec'` in 5.6.1
- Migration (5.5 → 5.10): 5.10.0 removes `throwOnError` from the composables' `client` option, nests a tag group in the folders of its OpenAPI 3.2 `parent` tags (`group.name` keeps one folder per tag) and writes a status range in lower case (`'2XX'` becomes `'2xx'`). Composables are skipped for `text/event-stream` (5.7.0) and JSON Lines (5.10.0) operations. Node.js 22.22 or newer is required since 5.6.0
- Source: https://kubb.dev/extensions/kubb-labs/plugin-vue-query/options （`@kubb/plugin-vue-query@5.10.1`、取得日 2026-11-14）、overview も同じ版
- Suspense hook オプションはこのプラグインの options にない（`useSuspenseQuery` は React Query 側のオプション）
- 呼び出し方は [vue-query-calling-operations](../plugin-guides/vue-query-calling-operations.md) を参照

## Related

- [@kubb/plugin-react-query](./plugin-react-query.md)
- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
