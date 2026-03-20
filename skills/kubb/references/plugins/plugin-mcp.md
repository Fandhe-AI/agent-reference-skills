# @kubb/plugin-mcp

OpenAPI 仕様から MCP（Model Context Protocol）サーバーを生成するプラグイン。v3.9.0 で追加。
AI モデルが API と対話可能になる。

## インストール

```bash
npm install --save-dev @kubb/plugin-mcp
```

## 設定オプション

### output

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `output.path` | `string` | `'mcp'` |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` |
| `output.banner` / `output.footer` | `string \| (oas) => string` | — |
| `output.override` | `boolean` | `false` |

### client

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `client.importPath` | `string` | — |
| `client.dataReturnType` | `'data' \| 'full'` | `'data'` |
| `client.baseURL` | `string` | — |

### その他

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `contentType` | `'application/json' \| string` | — |
| `paramsCasing` | `'camelcase'` | — |
| `group.type` | `'tag'` | — |
| `group.name` | `(context) => string` | `'${ctx.group}Requests'` |
| `include` / `exclude` | `Array<{type, pattern}>` | — |
| `override` | `Array<{type, pattern, options}>` | — |
| `transformers.name` | `(name, type?) => string` | — |
| `generators` | `Generator[]` | — |

## 設定例

```typescript
pluginMcp({
  output: { path: './mcp', barrelType: 'named' },
  client: { baseURL: 'https://petstore.swagger.io/v2' },
  group: { type: 'tag', name: ({ group }) => `${group}Handlers` },
})
```
