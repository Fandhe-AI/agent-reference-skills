# @kubb/plugin-msw

OpenAPI 仕様から MSW（Mock Service Worker）ハンドラーを生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-msw
```

## 設定オプション（v5）

`contentType` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。`group` は `output.mode: 'directory'` が必須。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'handlers' }` | 出力先パス |
| `group` | `Group` | — | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `baseURL` | `string` | — | 各ハンドラーのリクエストに付与するベース URL |
| `handlers` | `boolean` | `false` | 全ハンドラーを再エクスポートする `handlers.ts` を生成 |
| `parser` | `'data' \| 'faker'` | `'data'` | 各ハンドラーが返すレスポンスボディの生成方法（`'faker'` は @kubb/plugin-faker 必要） |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverMsw>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |

## 設定例

```typescript
pluginMsw({
  output: {
    path: './mocks',
    mode: 'directory',
    banner: '/* eslint-disable no-alert, no-console */',
  },
  group: { type: 'tag', name: ({ group }) => `${group}Service` },
  handlers: true,
  parser: 'data',
  baseURL: 'https://api.example.com',
})
```
