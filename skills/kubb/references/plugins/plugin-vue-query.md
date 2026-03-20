# @kubb/plugin-vue-query

OpenAPI 仕様から Vue Query（TanStack Query）hooks を生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-vue-query
```

## 設定オプション

`@kubb/plugin-react-query` とほぼ同一の構成。主な違いは `importPath` のデフォルト値のみ。

### output

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `output.path` | `string` | `'hooks'` |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` |

### client

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `client.importPath` | `string` | — |
| `client.dataReturnType` | `'data' \| 'full'` | `'data'` |
| `client.baseURL` | `string` | — |
| `client.bundle` | `boolean` | `false` |

### query / mutation

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `query.methods` | `Array<HttpMethod>` | `['get']` |
| `query.importPath` | `string` | `'@tanstack/vue-query'` |
| `mutation.methods` | `Array<HttpMethod>` | `['post', 'put', 'delete']` |
| `mutation.importPath` | `string` | `'@tanstack/vue-query'` |

### その他

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `paramsType` | `'object' \| 'inline'` | `'inline'` |
| `paramsCasing` | `'camelcase'` | — |
| `parser` | `'client' \| 'zod'` | `'client'` |
| `infinite` | `Infinite \| false` | `false` |
| `queryKey` / `mutationKey` | `(props) => unknown[]` | — |
| `include` / `exclude` / `override` | `Array` | — |
| `transformers.name` | `(name, type?) => string` | — |

## 設定例

```typescript
pluginVueQuery({
  output: { path: './hooks' },
  group: { type: 'tag', name: ({ group }) => `${group}Hooks` },
  client: { dataReturnType: 'full' },
  query: { methods: ['get'], importPath: '@tanstack/vue-query' },
  infinite: { queryParam: 'next_page', initialPageParam: 0 },
})
```
