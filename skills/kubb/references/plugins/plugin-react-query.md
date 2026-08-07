# @kubb/plugin-react-query

OpenAPI 仕様から React Query（TanStack Query）hooks を生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-react-query
```

## 設定オプション（v5）

v5 で構成が大きく変わった。`client` はオブジェクトではなく、登録済みクライアントプラグイン（`@kubb/plugin-axios` / `@kubb/plugin-fetch`）を指す文字列になった。`parser` / `paramsType` / `pathParamsType` / `paramsCasing` / `contentType` は削除され、`transformers.name` は `resolver` に置き換わった。`hooks: true` を指定しないと `use*` hook 関数自体は生成されない（デフォルトでは factory ヘルパーのみ）。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'hooks', barrel: { type: 'named' } }` | 出力先パス・バレルエクスポート設定 |
| `group` | `Group` | — | tag / path によるフォルダー分割 |
| `client` | `'axios' \| 'fetch'` | — | hooks が呼び出す登録済みクライアントプラグイン |
| `infinite` | `Partial<Infinite> \| false` | `false` | `useInfiniteQuery` hooks の生成 |
| `suspense` | `Partial<object> \| false` | `false` | `useSuspenseQuery` hooks の生成 |
| `query` | `Partial<Query> \| false` | `{ methods: ['GET'], … }` | クエリ hooks の設定・無効化 |
| `queryKey` | `(props) => unknown[]` | `built-in` | 各クエリ hook の `queryKey` 構築 |
| `mutation` | `Partial<Mutation> \| false` | `{ methods: ['POST', 'PUT', 'PATCH', 'DELETE'], … }` | ミューテーション hooks の設定・無効化 |
| `mutationKey` | `(props) => unknown[]` | `built-in` | 各ミューテーション hook の `mutationKey` 構築 |
| `customOptions` | `CustomOptions` | — | 全 hook を自前の options 関数経由にする |
| `hooks` | `boolean` | `false` | factory の上に `use*` hook 関数を生成 |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverReactQuery>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen' },
  plugins: [
    pluginFetch({ baseURL: 'https://petstore.swagger.io/v2' }),
    pluginReactQuery({
      output: { path: './hooks' },
      group: { type: 'tag' },
      client: 'fetch',
      hooks: true,
      infinite: { queryParam: 'page', initialPageParam: 0 },
      suspense: {},
    }),
  ],
})
```
