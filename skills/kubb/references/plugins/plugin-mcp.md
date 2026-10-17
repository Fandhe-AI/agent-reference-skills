# @kubb/plugin-mcp

OpenAPI 仕様から MCP（Model Context Protocol）サーバーを生成するプラグイン。各 operation が AI アシスタントから呼べる型付き MCP ツールになり、入出力に `@kubb/plugin-zod` のスキーマを使う（plugin-mcp 5.2.3 の docs に準拠）。

各ツールハンドラーは、クライアントプラグインが生成した operation 関数を呼ぶ。`output.path` のルートに `server.ts` / `start.ts` / `.mcp.json` を書き出し、`start.ts` が `server.ts` の `startServer()` を呼び、`.mcp.json` が stdio サーバーとして `start.ts` を起動する。

## インストール

```bash
npm install --save-dev @kubb/plugin-mcp
npm install @modelcontextprotocol/server zod
```

`@kubb/plugin-ts`・`@kubb/plugin-zod`・クライアントプラグイン（`@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client`）をあわせて登録し、クライアント側で `sdk` を未設定にする。サーバーを動かすアプリに `@modelcontextprotocol/server` v2 と `zod` 4.2 以降の v4 を入れる（`@kubb/plugin-axios` 使用時は `axios` も）。生成される `.mcp.json` は `npx tsx` を実行するため `tsx` などの TypeScript ランナーが必要。

## 設定オプション（v5）

`contentType` / `paramsCasing` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。`baseURL` などのトランスポート設定はクライアントプラグイン側で行う。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'mcp', barrel: { type: 'named' } }` | ハンドラーの出力先（`path` / `mode` / `barrel` / `banner` / `footer`）。`path` は `'mcp'` のようなフォルダー名にする（単一ファイル出力 `mode: 'file'` や拡張子付き `path` では `server.ts` などの置き場が無い）。`group` 使用時もそれらはルートに残る |
| `group` | `Group` | None | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `client` | `'fetch' \| 'axios' \| 'client'` | 自動検出 | ハンドラーが呼ぶ登録済みクライアントプラグイン。複数登録時に指定 |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverMcp>` | `resolverMcp` | 生成名・ファイルパスのカスタマイズ（`handler.name` など。旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |

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
    pluginMcp({ output: { path: 'mcp', mode: 'directory' } }),
  ],
})
```

## Notes

- 各ハンドラーは grouped `{ path, query, headers, body }` を渡す。常に `throwOnError: true` を渡すため、クライアントの `throwOnErrorDefault` に関わらず非 2xx は throw されツールエラーになる
- ハンドラーはクライアントの `returnType` に従う。`'full'`（既定）または `@kubb/plugin-client` の通常結果では `res.data` から成功ボディを読み、`'data'` では解決結果をそのままツールレスポンスボディにする
- Migration (v4 → v5): ハンドラーは grouped `*Options` と MCP の `ServerContext` を受け取り、生成クライアント operation に委譲して `res.data` を読む。`paramsCasing` は削除
- `.mcp.json` の `args` パスは Kubb の `root` からの `start.ts` の相対パス。MCP クライアントが別フォルダーで起動する場合は絶対パスにするか、`startServer()` 前にセットアップするため独自エントリを指す。生成された `.mcp.json` のサーバーエントリは、MCP クライアントが読む `.mcp.json`（Claude Code ならプロジェクトルート）へコピーする
- 詳細は [mcp-server](../plugin-guides/mcp-server.md) を参照

## Related

- [@kubb/plugin-zod](./plugin-zod.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-axios](./plugin-axios.md)
