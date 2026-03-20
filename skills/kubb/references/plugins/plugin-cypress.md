# @kubb/plugin-cypress

OpenAPI 仕様から Cypress リクエスト定義を生成するプラグイン。v3.7.0 で追加。

## インストール

```bash
npm install --save-dev @kubb/plugin-cypress
```

## 設定オプション

### output

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `output.path` | `string` | `'cypress'` |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` |
| `output.banner` / `output.footer` | `string \| (oas) => string` | — |
| `output.override` | `boolean` | `false` |

### パラメータ

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `paramsType` | `'object' \| 'inline'` | `'inline'` |
| `pathParamsType` | `'object' \| 'inline'` | `'inline'` |
| `paramsCasing` | `'camelcase'` | — |

### その他

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `contentType` | `'application/json' \| string` | — |
| `baseURL` | `string` | — |
| `group.type` | `'tag'` | — |
| `group.name` | `(context) => string` | `'${ctx.group}Requests'` |
| `include` / `exclude` | `Array<{type, pattern}>` | — |
| `override` | `Array<{type, pattern, options}>` | — |
| `transformers.name` | `(name, type?) => string` | — |
| `generators` | `Generator[]` | — |

## 設定例

```typescript
pluginCypress({
  output: { path: './cypress', barrelType: 'named' },
  group: { type: 'tag', name: ({ group }) => `${group}Requests` },
})
```
