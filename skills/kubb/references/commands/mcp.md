# kubb mcp

Model Context Protocol サーバーを起動するコマンド。Claude Code / Claude Desktop / Cursor / VS Code などの AI クライアントから spec の検証、`kubb.config.ts` の雛形作成、生成の実行ができる。

## Signature / Usage

```shell
kubb mcp
```

起動時の出力:

```text
⏳ Starting MCP server...
This feature is still under development, use with caution
```

stdio transport を使うため、クライアントがローカルプロセスとして起動する。クライアント設定例は公式の Set up the MCP server（/docs/5.x/ai/mcp）を参照。

## Tools

| Tool | Parameters | Description |
| --- | --- | --- |
| `generate` | `config?`（作業ディレクトリ内の config パス。省略時は `kubb generate` と同様に `.kubbrc`、次に `kubb.config`（拡張子 `ts` / `mts` / `cts` / `js` / `mjs` / `cjs`）を、作業ディレクトリ・その `.config/` と `configs/`・各親フォルダーの順に探索）、`input?`（spec パス。config を上書き）、`output?`（出力ディレクトリ。config を上書き）、`logLevel?`（`silent` / `info` / `verbose`、デフォルト `info`。関数をエクスポートする config に渡される） | パイプラインを実行。成功時はファイル数と警告・diagnostics を返し、失敗時は各 diagnostic の code・fix・docs リンクを返す。配列をエクスポートする config は先頭エントリを実行 |
| `validate` | `input`（パスまたは URL、必須） | 同梱の OpenAPI adapter で OpenAPI / Swagger ドキュメントを検証 |
| `init` | `input?`（デフォルト `./openapi.yaml`）、`output?`（デフォルト `./src/gen`） | 作業ディレクトリに空の `plugins` 配列を持つ `kubb.config.ts` をプロンプト無しで書き出す。パッケージのインストールやプラグイン追加は行わず、返信で各プラグインについて `kubb add <id> --yes` の実行を促す。`kubb.config.ts` が既にあると失敗 |

## Working directory

サーバーはクライアントが起動したフォルダーで動作する。`generate` はそこ、次に親フォルダーで config を探し、作業ディレクトリ外の `config` パスは拒否する。`init` はそこに `kubb.config.ts` を書く。プロジェクトでの起動方法は /docs/5.x/ai/mcp#working-directory を参照。

## Notes

- 開発中の機能。破壊的変更が起こりうる（公式 WARNING）。
- 同名の MCP でも、このコマンドは Kubb の生成を AI クライアントに公開するサーバー。`mcp` プラグイン（plugin-mcp）が OpenAPI から生成する MCP サーバーコードとは別物。
- 出典: https://kubb.dev/docs/5.x/reference/commands/mcp （kubb@5.11.0 の docs/5.x/reference/commands/mcp.md）

## Related

- [validate](./validate.md)
- [init](./init.md)
- [add](./add.md)
