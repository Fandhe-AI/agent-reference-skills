# @kubb/mcp

Kubb のコード生成機能を AI アシスタント（Claude、Cursor 等）に公開する MCP（Model Context Protocol）サーバー（Kubb 5.11.0 の `packages/mcp/README.md` と docs 5.x reference/commands/mcp に準拠）。

サーバーは 3 つのツールを持つ。`generate` は `kubb.config.ts` から完全なビルドを実行し、成功時にビルドイベントを、失敗時に診断を返す。`validate` は OpenAPI 仕様を検証し、`init` は `kubb.config.ts` を作成する。

> This feature is under active development. Use it with caution and expect breaking changes.

## インストール

```bash
npm install --save-dev kubb @kubb/mcp
```

`kubb mcp` コマンドは `kubb` パッケージ（`@kubb/cli` を含む）から提供される。`kubb` が必要。`@kubb/mcp` 単体でも実行可能（どちらも stdio で同じサーバーを起動する）:

```bash
npx kubb mcp
npx @kubb/mcp
```

## クライアント設定

Claude Code ではプロジェクトルートから登録する:

```bash
claude mcp add kubb -- npx kubb mcp
```

その他のクライアント（例: Claude Desktop の `claude_desktop_config.json`）:

```json
{
  "mcpServers": {
    "kubb": {
      "command": "npx",
      "args": ["kubb", "mcp"]
    }
  }
}
```

単体パッケージを使う場合は `"args": ["@kubb/mcp"]`。

サーバーはクライアントが起動したディレクトリで `kubb.config.*` を探し、その外を指す `config` パスを拒否する。Claude Code は `claude` を実行したフォルダーで起動する。Claude Code などは設定の `cwd` キーを無視するため、別ディレクトリで起動するクライアントでは先にプロジェクトへ移動する（macOS / Linux）:

```json
{
  "mcpServers": {
    "kubb-petstore": {
      "command": "sh",
      "args": ["-c", "cd '/path/to/your/project' && npx kubb mcp"]
    }
  }
}
```

## 利用可能なツール

### `generate`

Kubb のビルドを config から実行する。成功時はビルドイベント（docs 5.x ではファイル数と警告・診断）、失敗時は診断（code / fix / docs リンク付き）を返す。配列を export する config は最初のエントリを実行する。

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `config` | `string` | 作業ディレクトリの `kubb.config.*` | 作業ディレクトリ内の設定ファイルのパス（README: `kubb.config.ts` または `.mts` / `.cts` / `.js` / `.mjs` / `.cjs`）。省略時は `kubb generate` と同様に探索（docs: `.kubbrc` → `kubb.config.*`、作業ディレクトリ・`.config/`・`configs/`・親フォルダーの順） |
| `input` | `string` | — | OpenAPI 仕様ファイルのパス（config を上書き） |
| `output` | `string` | — | 出力ディレクトリ（config を上書き） |
| `logLevel` | `'silent' \| 'info' \| 'verbose'` | `info` | 関数を export する config に渡される |

### `validate`

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `input` | `string` | 必須 | OpenAPI/Swagger 仕様のパスまたは URL（同梱の OpenAPI adapter で検証） |

### `init`

作業ディレクトリに `kubb.config.ts` をプロンプトなしで書き出す。パッケージのインストールもプラグイン追加もせず、`kubb.config.ts` が既にあれば失敗する。docs 5.x では `plugins` 配列が空の config を書き、返信が各プラグインに `kubb add <id> --yes` を実行するよう案内する。

| パラメータ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `input` | `string` | `./openapi.yaml` | OpenAPI 仕様のパス |
| `output` | `string` | `./src/gen` | 出力ディレクトリ |
| `plugins` | `string` | — | プラグインのカンマ区切りリスト（例: `plugin-ts,plugin-zod`）。`packages/mcp/README.md` にのみ記載され、docs 5.x の `init` ツール表には無い |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: './petstore.yaml',
  output: { path: './src/generated' },
  plugins: [pluginTs(), pluginAxios()],
})
```

## Notes

- パッケージは `kubb`（旧 `@kubb/cli` ではない）。README の例は `import { defineConfig } from 'kubb'` と `adapter: adapterOas()` を使うが、docs 5.x では `kubb/config` から import し adapter は既定で供給される
- 旧版ページにあった `@kubb/plugin-mcp` の `startServer` API の記述は、5.11.0 の `@kubb/mcp` README に記載がない（`@kubb/plugin-mcp` が生成する `server.ts` が `startServer()` を export する。plugin-mcp.md 参照）
- 旧版の `logLevel` 値 `error` / `warn` / `debug` は 5.11.0 の README・docs に記載がない

## Related

- [cli](./cli.md)
- [@kubb/plugin-mcp](../plugins/plugin-mcp.md)
- [ai/mcp](../ai/mcp.md)
