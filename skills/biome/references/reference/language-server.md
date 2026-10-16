# Language server

Biome は Language Server Protocol (LSP) をファーストクラスでサポート。

## Supported methods

- `initialize`
- `initialized`
- `workspace/didChangeConfiguration`
- `workspace/didChangeWatchedFiles`
- `workspace/didChangeWorkspaceFolders`
- `textDocument/didOpen`
- `textDocument/didChange`
- `textDocument/didSave`
- `textDocument/didClose`
- `textDocument/publishDiagnostics`
- `textDocument/codeAction`
- `codeAction/resolve`
- `textDocument/formatting`
- `textDocument/rangeFormatting`
- `textDocument/onTypeFormatting`
- `textDocument/definition`

## Extension settings

エディタ拡張の開発者向け設定（ユーザー向けではない）。拡張側で別名・別形式で公開してよい（例: Zed 拡張は `require_configuration` を JSONC の `require_config_file` にマップ）。

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `require_configuration` | `boolean` | `false` | `true` の場合、プロジェクトルートに `biome.json` が存在するまでパース以外の解析を行わない |
| `configuration_path` | `string` | `null` | カスタム設定ファイルのパス。`biome.json` / `biome.jsonc` またはそれを含むフォルダー。相対・絶対可。設定がサブフォルダーにある場合に使用 |
| `inline_config` | `object` | `null` | インライン形式の Biome 設定。ディスク上の `biome.json`（またはデフォルト）の値を上書きする |
| `go_to_definition` | `boolean` | `false` | Biome の module graph を使った `textDocument/definition` を有効化 |

```json
{
  "inline_config": {
    "linter": {
      "rules": {
        "suspicious": {
          "noConsole": "off"
        }
      }
    }
  }
}
```

`go_to_definition` の対応範囲:

- JavaScript / TypeScript / JSX / TSX / HTML 系ファイルで、同一ファイルまたは他ファイルで宣言された変数の定義解決
- JSX/TSX・HTML 系ファイルで使われる CSS クラスの定義解決
- JSX/TSX コンポーネント、HTML 系コンポーネントの定義解決

対象外: 依存パッケージ内の変数、プロジェクトで import されていない依存パッケージの変数。

## Integrate Biome in an editor extension

### Use the LSP proxy

`lsp-proxy` コマンドを実行すると 2 プロセスが起動する: 要求された操作を実行する daemon と、クライアント（エディタ）と daemon の間のプロキシとなるサーバー。エディタが JSON-RPC を送れるなら、このコマンドを実行するよう設定するだけでよい。

### Use `stdin`

LSP 非対応のエディタは `biome` バイナリを標準入力経由で呼び出せる。対象コマンド: `format` / `lint` / `check`。結果（変更なしなら元の内容）は stdout、診断は stderr に出力される。`--stdin-file-path` が必須。パスは存在しなくてよいが、正しい拡張子が必要。

バイナリの解決と呼び出しはエディタ側の責務。npm 配布パッケージ:

- `@biomejs/cli-darwin-arm64`
- `@biomejs/cli-darwin-x64`
- `@biomejs/cli-linux-arm64`
- `@biomejs/cli-linux-x64`
- `@biomejs/cli-win32-arm64`
- `@biomejs/cli-win32-x64`

バイナリ名は `biome` / `biome.exe`（パッケージのルート直下）。

### Use the daemon with the binary

CLI で daemon を起動し、各コマンドに `--use-server` を付けて利用する（この方式ではユーザーにログを提供できない）。

```shell
biome start
echo "console.log('')" | biome format --use-server --stdin-file-path=dummy.js
```

## Language Server logs

daemon のログは `biome-logs` フォルダーに保存される。

- Linux: `~/.cache/biome`
- Windows: `C:\Users\<UserName>\AppData\Local\biomejs\biome\cache`
- macOS: `/Users/<UserName>/Library/Caches/dev.biomejs.biome`

その他の OS ではシステムの一時ディレクトリ。正確なパスは次で取得し、ログは 1 時間ごとにローテーションされる。

```shell
biome explain daemon-logs
```

## Notes

- daemon を自前で使う場合、ゴーストプロセスを避けるため `biome stop` で再起動・終了する責任がある。
- 出典: biomejs.dev/reference/language-server/（website commit 49293f2）。

## Related

- [cli](./cli.md)
- [daemon](./daemon.md)
- [vscode](./vscode.md)
- [zed](./zed.md)
