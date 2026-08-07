# @kubb/plugin-vue-query

OpenAPI 仕様から Vue Query（TanStack Query）hooks を生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-vue-query
```

## 設定オプション（v5）

`@kubb/plugin-react-query` と同様の v5 構成（`client` は登録済みクライアントプラグインを指す文字列、`hooks: true` で `use*` composables を生成）。`parser` / `paramsType` / `paramsCasing` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'hooks' }` | composables の出力先パス |
| `group` | `Group` | — | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `client` | `'axios' \| 'fetch'` | — | composables が呼び出す登録済みクライアントプラグイン |
| `infinite` | `Partial<Infinite> \| false` | `false` | `useInfiniteQuery` composables の生成 |
| `query` | `Partial<Query> \| false` | `{ methods: ['GET'], … }` | クエリ composables の設定・無効化 |
| `queryKey` | `(props) => Array<unknown>` | `built-in` | 各クエリ composable の `queryKey` 構築 |
| `mutation` | `Partial<Mutation> \| false` | `{ methods: ['POST', …], … }` | ミューテーション composables の設定・無効化 |
| `mutationKey` | `(props) => Array<unknown>` | `built-in` | 各ミューテーション composable の `mutationKey` 構築 |
| `hooks` | `boolean` | `false` | factory の上に `use*` composables を生成 |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverVueQuery>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginVueQuery } from '@kubb/plugin-vue-query'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen' },
  plugins: [
    pluginFetch({ baseURL: 'https://petstore.swagger.io/v2' }),
    pluginVueQuery({
      output: { path: './hooks' },
      group: { type: 'tag' },
      client: 'fetch',
      hooks: true,
      infinite: { queryParam: 'next_page', initialPageParam: 0 },
    }),
  ],
})
```
