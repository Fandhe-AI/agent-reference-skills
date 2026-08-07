# @kubb/plugin-mcp

OpenAPI 仕様から MCP（Model Context Protocol）サーバーを生成するプラグイン。v3.9.0 で追加。
AI モデルが API と対話可能になる。

## インストール

```bash
npm install --save-dev @kubb/plugin-mcp
```

## 設定オプション（v5）

`client` はオブジェクトではなく登録済みクライアントプラグイン（`@kubb/plugin-axios` / `@kubb/plugin-fetch`）を指す文字列になった。`baseURL` は `pluginMcp` ではなくクライアントプラグイン側で設定する。`contentType` / `paramsCasing` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。`pluginMcp` は `@kubb/plugin-ts` と `@kubb/plugin-zod` に依存するため、あわせて登録が必要。生成されるハンドラーは第2引数に MCP の `RequestHandlerExtra` を受け取るようになり、内部でリクエストを組み立てず登録済みクライアントの named operation を呼び出す形に変わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'mcp', barrel: { type: 'named' } }` | 出力先パス・バレルエクスポート設定 |
| `group` | `Group` | — | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `client` | `'fetch' \| 'axios'` | — | ハンドラーが呼び出す登録済みクライアントプラグイン |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverMcp>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginMcp } from '@kubb/plugin-mcp'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginZod(),
    pluginFetch({ baseURL: 'https://petstore.swagger.io/v2' }),
    pluginMcp({ client: 'fetch' }),
  ],
})
```
