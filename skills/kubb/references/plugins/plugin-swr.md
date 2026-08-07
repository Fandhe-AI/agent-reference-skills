# @kubb/plugin-swr

OpenAPI 仕様から SWR hooks を生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-swr
```

## 設定オプション（v5）

v5 で `client` はオブジェクトではなく登録済みクライアントプラグイン（`@kubb/plugin-axios` / `@kubb/plugin-fetch`）を指す文字列になった。`parser` / `paramsType` / `pathParamsType` / `paramsCasing` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'hooks' }` | hooks の出力先パス |
| `group` | `Group` | — | tag / path によるフォルダー分割 |
| `client` | `'fetch' \| 'axios'` | — | hooks が呼び出す登録済みクライアントプラグイン |
| `query` | `Partial<Query> \| false` | `{ methods: ['GET'], importPath: 'swr' }` | `useSWR` hooks の設定・無効化 |
| `queryKey` | `Transformer` | `built-in` | 各クエリ hook の SWR キー構築 |
| `mutation` | `Partial<Mutation> \| false` | `{ methods: ['POST', 'PUT', 'PATCH', 'DELETE'], importPath: 'swr/mutation' }` | `useSWRMutation` hooks の設定・無効化 |
| `mutationKey` | `Transformer` | `built-in` | 各ミューテーション hook の SWR キー構築 |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverSwr>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginSwr } from '@kubb/plugin-swr'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen' },
  plugins: [
    pluginFetch({ baseURL: 'https://petstore.swagger.io/v2' }),
    pluginSwr({
      output: { path: './hooks' },
      group: { type: 'tag' },
      client: 'fetch',
    }),
  ],
})
```
