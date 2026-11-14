# @kubb/plugin-react-query

OpenAPI 仕様から React Query（TanStack Query）のヘルパーを生成するプラグイン。既定では `queryOptions` / `mutationOptions` ファクトリとキーのみ、`hooks: true` で `useQuery` / `useMutation` も生成する（plugin-react-query 5.10.1 の docs に準拠）。

## インストール

```bash
npm install --save-dev @kubb/plugin-react-query
npm install @tanstack/react-query
```

HTTP クライアントは同梱されない。`@kubb/plugin-ts`（または codec 型を使う場合は `pluginZod({ inferred: 'codec' })`）とクライアントプラグイン（`@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client`）が必要で、クライアント側で `sdk` を未設定にする。`@tanstack/react-query` 5.82 以降の v5 を利用側アプリに入れる。バリデーションはクライアントプラグイン側で設定する。

## 設定オプション（v5）

v5 で構成が大きく変わった。`parser` / `paramsType` / `pathParamsType` / `paramsCasing` / `contentType` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'hooks', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割 |
| `client` | `'fetch' \| 'axios' \| 'client'` | 自動検出 | hooks が呼ぶ登録済みクライアントプラグイン。単一なら自動検出、複数登録時に指定。`'client'` は `@kubb/plugin-client`（クライアントモジュールが `RequestConfig` / `ResponseErrorConfig` 型も export する必要あり） |
| `returnType` | `'full' \| 'data'` | `'data'` | hooks が resolve する値の形。`'full'` はクライアントの `RequestResult` 全体（`{ status, data, error, contentType, headers, request, response }`）を返し status・レスポンスヘッダーを読める。infinite query はカーソルを `lastPage.data` から読む。クライアントプラグイン側の `returnType` が `'full'` か `'plain'` である必要があり、クライアントが `'data'` だと生成時にエラーで止まる |
| `infinite` | `Partial<Infinite> \| false` | `false` | `infiniteQueryOptions` / `useInfiniteQuery` の生成。`hooks: true` が必要 |
| `suspense` | `Partial<object> \| false` | `false` | `useSuspenseQuery` の生成（`{}` で有効化）。TanStack Query v5 以上・`hooks: true` が必要 |
| `query` | `Partial<Query> \| false` | `{ methods: ['GET', 'QUERY'], importPath: '@tanstack/react-query' }` | クエリの設定・無効化。`methods` を上書きする場合 `'QUERY'` を残さないと QUERY operation がスキップされる |
| `queryKey` | `(props: { node, casing, variant }) => Array<unknown>` | export 済み `queryKeyTransformer` | 各クエリの `queryKey` 構築。文字列はそのままコードに埋め込まれるので文字列リテラルは `JSON.stringify(...)` で包む。`variant` は `'query'` / `'suspenseQuery'` / `'infiniteQuery'` / `'suspenseInfiniteQuery'` |
| `mutation` | `Partial<Mutation> \| false` | `{ methods: ['POST', 'PUT', 'PATCH', 'DELETE'], importPath: '@tanstack/react-query' }` | ミューテーションの設定・無効化 |
| `mutationKey` | `(props: { node, casing, variant }) => Array<unknown>` | export 済み `mutationKeyTransformer` | 各ミューテーションの `mutationKey` 構築（`variant` は `'mutation'`） |
| `customOptions` | `{ importPath: string, name?: string }` | None | 全 hook を自前の options 関数経由にする。`name` の既定は `'useCustomHookOptions'`。`hooks: true` が必要。`importPath` が出力フォルダー内で未作成なら Kubb が雛形を生成 |
| `hooks` | `boolean` | `false` | factory の上に `use*` hook（`useQuery` / `useSuspenseQuery` / `useInfiniteQuery` / `useSuspenseInfiniteQuery` / `useMutation`）を生成 |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverReactQuery>` | `resolverReactQuery` | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |

### infinite のサブオプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `infinite.queryParam` | `string` | `'id'` | ページカーソルを運ぶクエリパラメーター |
| `infinite.initialPageParam` | `unknown` | `0` | 初回 fetch の `pageParam` 初期値 |
| `infinite.nextParam` | `string \| Array<string> \| null` | `null` | レスポンス上の次ページカーソルのパス（`'pagination.next.id'` または配列形式） |
| `infinite.previousParam` | `string \| Array<string> \| null` | `null` | 前ページカーソルのパス |
| `infinite.cursorParam` | `string \| null` | `null` | 非推奨。カーソルを持つトップレベルのレスポンスフィールド名（ドットパス不可）。`nextParam` / `previousParam` を使う |
| `infinite.getNextPageParam` | `string \| PageParamFn \| null` | `null` | `getNextPageParam` のソースをそのまま埋め込む（文字列または関数）。`nextParam` / `cursorParam` より優先 |
| `infinite.getPreviousPageParam` | `string \| PageParamFn \| null` | `null` | `getPreviousPageParam` のソース（文字列または関数）。`previousParam` / `cursorParam` より優先 |

`getNextPageParam` / `nextParam` / `cursorParam` のいずれも無い場合、hook は `initialPageParam` から空配列のページが来るまでカウントアップする（配列レスポンスのみ。それ以外のレスポンスでは生成時に警告）。

`definePageParam` はページとページパラメーターの型を付け、関数のソースを返す。通常の関数も使える。コピーされるのはソースのみなので、関数は config ファイルの変数を参照できない:

```typescript
import { definePageParam, pluginReactQuery } from '@kubb/plugin-react-query'

type PetsPage = { hasNext: boolean; number: number }

pluginReactQuery({
  hooks: true,
  infinite: {
    queryParam: 'page',
    getNextPageParam: definePageParam<PetsPage, number>((lastPage) => (lastPage.hasNext ? lastPage.number + 1 : undefined)),
  },
})
```

`queryKey` / `mutationKey` は既定の key を置き換えず拡張できる。`queryKeyTransformer` / `mutationKeyTransformer` を import して結果を spread する（既定のセグメントはリリース間で変わり得るので個別要素を読まない）:

```typescript
import { queryKeyTransformer } from '@kubb/plugin-react-query'

queryKey: (props) => [JSON.stringify(props.node.operationId), ...queryKeyTransformer(props)]
```

```typescript
import { mutationKeyTransformer } from '@kubb/plugin-react-query'

mutationKey: (props) => [JSON.stringify(props.node.operationId), ...mutationKeyTransformer(props)]
```

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginFetch(),
    pluginReactQuery({ hooks: true }),
  ],
})
```

## Notes

- Migration (v4 → v5): `hooks` の既定が `true` から `false` になった。`use*` を保つには `hooks: true`（`false` でもキーとオプションファクトリは出力される）
- Migration (v4 → v5): クエリ・ミューテーションは grouped `*Options`（`body` / `path` / `query` / `headers`）を取り、末尾のクライアント設定は `path` / `query` / `body` / `headers` / `url` を除く。`TData` は 2xx レスポンスのみ、エラーは `TError`。`*MutationKey` 型エイリアスの import は削除しランタイムのキーヘルパーを使う
- 自動の `enabled` ガードは削除された。リクエストを遅延するには TanStack Query の `enabled` か `skipToken` を使う。Suspense hook は常に実行される
- `baseURL` とバリデーションはクライアントプラグイン側に移動し、このプラグインの `parser` は削除
- Migration (5.5 → 5.10): `returnType` was added in 5.9.0 (default `'data'` keeps the previous output); `resolver.query.clientName` and `resolver.mutation.typeName` were removed in 5.8.0 (they were never called, so delete them from a custom `resolver`); the default `queryKeyTransformer` / `mutationKeyTransformer` are exported since 5.5.4; `inferred: 'direction'` was renamed `inferred: 'codec'` in 5.6.1 (`'direction'` is a deprecated alias)
- Migration (5.5 → 5.10): 5.10.0 removes `throwOnError` from the hooks' `client` option (always `true`; pass `contentType` for a multi-media-type mutation on the mutation variables instead), nests a tag group in the folders of its OpenAPI 3.2 `parent` tags (`group: { type: 'tag', name: ({ group }) => group }` keeps one folder per tag), and writes a status range in lower case (`ListPetsStatus2XX` becomes `ListPetsStatus2xx`, `'2XX'` becomes `'2xx'`). Hooks are skipped for `text/event-stream` (5.7.0) and JSON Lines (5.10.0) operations. Node.js 22.22 or newer is required since 5.6.0
- Source: https://kubb.dev/extensions/kubb-labs/plugin-react-query/options （`@kubb/plugin-react-query@5.10.1`、取得日 2026-11-14）、overview も同じ版
- 呼び出し方は [react-query-calling-operations](../plugin-guides/react-query-calling-operations.md) を参照

## Related

- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-vue-query](./plugin-vue-query.md)
- [@kubb/plugin-swr](./plugin-swr.md)
