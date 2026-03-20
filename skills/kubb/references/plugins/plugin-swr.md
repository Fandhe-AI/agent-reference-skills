# @kubb/plugin-swr

OpenAPI 仕様から SWR hooks を生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-swr
```

## 設定オプション

### output

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `output.path` | `string` | `'hooks'` |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` |
| `output.banner` / `output.footer` | `string \| (oas) => string` | — |
| `output.override` | `boolean` | `false` |

### client

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `client.importPath` | `string` | — | カスタムクライアントパス |
| `client.dataReturnType` | `'data' \| 'full'` | `'data'` | レスポンス形式 |
| `client.baseURL` | `string` | — | ベース URL |
| `client.bundle` | `boolean` | `false` | ランタイムバンドル |

### query / mutation

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `query.methods` | `Array<HttpMethod>` | — | クエリ対象メソッド |
| `query.importPath` | `string` | `'swr'` | SWR インポートパス |
| `mutation.methods` | `Array<HttpMethod>` | `['post', 'put', 'delete']` | ミューテーション対象メソッド |
| `mutation.importPath` | `string` | `'swr/mutation'` | SWR mutation インポートパス |
| `mutation.paramsToTrigger` | `boolean` | `false` | `trigger()` 経由でパラメータを渡す（v5 でデフォルト化） |

### パラメータ・パーサー

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `paramsType` | `'object' \| 'inline'` | `'inline'` |
| `pathParamsType` | `'object' \| 'inline'` | `'inline'` |
| `paramsCasing` | `'camelcase'` | — |
| `parser` | `'client' \| 'zod'` | `'client'` |
| `queryKey` / `mutationKey` | `(props) => unknown[]` | — |

### フィルタリング

| オプション | 型 |
|-----------|-----|
| `group.type` | `'tag'` |
| `include` / `exclude` | `Array<{type, pattern}>` |
| `override` | `Array<{type, pattern, options}>` |
| `transformers.name` | `(name, type?) => string` |

## 設定例

```typescript
pluginSwr({
  output: { path: './hooks' },
  group: { type: 'tag', name: ({ group }) => `${group}Hooks` },
  client: { dataReturnType: 'full' },
  parser: 'zod',
})
```
