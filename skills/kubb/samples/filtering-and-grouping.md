# Filtering and Grouping

`include` / `exclude` と `group` を使い、生成対象のエンドポイントを絞り込み、タグ別にファイルを整理するワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginOas({ generators: [] }),
    pluginTs({
      output: { path: 'models' },
      // タグ "store" を除外
      exclude: [{ type: 'tag', pattern: 'store' }],
      // タグごとにファイルをグループ化
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Controller`,
      },
    }),
    pluginClient({
      output: { path: './clients' },
      // operationId でフィルタリング（正規表現可）
      include: [{ type: 'operationId', pattern: '^get' }],
      // path パターンでフィルタリング
      exclude: [{ type: 'path', pattern: '/internal/' }],
      group: { type: 'tag' },
    }),
  ],
})
```

`override` でエンドポイントごとにオプションを上書きする例:

```typescript
pluginReactQuery({
  output: { path: './hooks' },
  override: [
    {
      type: 'operationId',
      pattern: 'listPets',
      options: {
        infinite: {
          queryParam: 'page',
          initialPageParam: 0,
        },
      },
    },
  ],
})
```

## Notes

- `include` / `exclude` の `type` は `'tag'` / `'operationId'` / `'path'` / `'method'` / `'contentType'` から選択できる
- `pattern` は文字列（完全一致）または正規表現文字列として評価される
- `group.type: 'tag'` は OpenAPI の `tags` フィールドに基づきファイルを分割する
- `override` はマッチしたエンドポイントのプラグインオプションのみを上書きし、それ以外には影響しない
