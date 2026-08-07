# @kubb/plugin-cypress

OpenAPI 仕様から Cypress リクエスト定義を生成するプラグイン。v3.7.0 で追加。

## インストール

```bash
npm install --save-dev @kubb/plugin-cypress
```

## 設定オプション（v5）

`paramsType` / `pathParamsType` / `paramsCasing` / `contentType` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'cypress', barrel: { type: 'named' } }` | 出力先パス・バレルエクスポート設定 |
| `group` | `Group` | — | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `baseURL` | `string` | — | 各リクエストに付与するベース URL |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverCypress>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |

## 設定例

```typescript
pluginCypress({
  output: { path: './cypress', mode: 'directory', barrel: { type: 'named' } },
  group: { type: 'tag', name: ({ group }) => `${group}Requests` },
})
```
