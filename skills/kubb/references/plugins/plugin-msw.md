# @kubb/plugin-msw

OpenAPI 仕様から MSW（Mock Service Worker）ハンドラーを生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-msw
```

## 設定オプション

### output

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `output.path` | `string` | `'handlers'` |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` |
| `output.banner` / `output.footer` | `string \| (oas) => string` | — |
| `output.override` | `boolean` | `false` |

### MSW 固有オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `handlers` | `boolean` | `false` | `handlers.ts` に全ハンドラーをグループ化して生成 |
| `parser` | `'data' \| 'faker'` | `'data'` | レスポンスデータ生成方法（`'faker'` は @kubb/plugin-faker 必要） |
| `baseURL` | `string` | — | カスタムベース URL |
| `contentType` | `'application/json' \| string` | — | コンテンツタイプ |

### その他

| オプション | 型 |
|-----------|-----|
| `group.type` | `'tag'` |
| `group.name` | `(context) => string` |
| `include` / `exclude` | `Array<{type, pattern}>` |
| `override` | `Array<{type, pattern, options}>` |
| `transformers.name` | `(name, type?) => string` |
| `generators` | `Generator[]` |

## 設定例

```typescript
pluginMsw({
  output: {
    path: './mocks',
    barrelType: 'named',
    banner: '/* eslint-disable no-alert, no-console */',
  },
  group: { type: 'tag', name: ({ group }) => `${group}Service` },
  handlers: true,
  parser: 'data',
  baseURL: 'https://api.example.com',
})
```
