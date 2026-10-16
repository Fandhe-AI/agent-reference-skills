# mcp

AI アシスタント連携用の MCP（Model Context Protocol）サーバー操作コマンド（kubb 5.11.0 基準）。

> 公式ドキュメントは MCP 機能を「開発中のため破壊的変更あり」と注記している。

## MCP サーバーの起動

```sh
npx kubb mcp
```

stdio 経由で通信する MCP サーバーが起動する。`kubb mcp` は `@kubb/cli` 由来で、`kubb` パッケージに含まれる。サーバーはクライアントが起動したディレクトリで `kubb.config.*` を探す。

## スタンドアロンでの実行

```sh
npx @kubb/mcp
```

`kubb mcp` と同じサーバーが stdio で起動する。`@kubb/mcp` は別パッケージとして単体インストールも可能で、`kubb mcp` の利用自体には `kubb` のインストールで足りる。

```sh
npm install -D @kubb/mcp
```

## Claude Code への登録

```sh
claude mcp add kubb -- npx kubb mcp
```

Claude Code は `claude` を実行したフォルダーでサーバーを起動するため、プロジェクトルートで実行する。

## Claude Desktop 等への MCP サーバー登録

MCP クライアントの設定（例: `claude_desktop_config.json`）に追加する:

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

スタンドアロン版を使う場合:

```json
{
  "mcpServers": {
    "kubb": {
      "command": "npx",
      "args": ["@kubb/mcp"]
    }
  }
}
```

設定ファイルの配置パスは原本の対象 README に記載が無いため要確認。

## 作業ディレクトリが異なるクライアント向け

`cwd` キーを無視するクライアントでは、プロジェクトへ移動してから起動する（macOS / Linux）:

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

## 提供ツール

| ツール | パラメーター | 説明 |
| --- | --- | --- |
| `generate` | `config?` / `input?` / `output?` / `logLevel?`（`silent` / `info` / `verbose`） | config から Kubb パイプラインを実行。失敗時は診断を返す |
| `validate` | `input`（必須、パスまたは URL） | OpenAPI / Swagger を検証 |
| `init` | `input?`（既定 `./openapi.yaml`）/ `output?`（既定 `./src/gen`） | 作業ディレクトリに `kubb.config.ts` を書き出す。パッケージはインストールせず、既存時は失敗 |

`init` の後は各プラグインに対して `kubb add <id> --yes` を実行する。

> `@kubb/mcp` の README は `init` に `plugins` パラメーターを挙げているが、公式 `kubb mcp` リファレンスの `init` 表には無い。差異があるため要確認。

> `kubb agent start` は 5.11.0 のコマンド一覧に存在しないため収録しない。Studio 連携は `cli.md` の `kubb studio` を参照。
