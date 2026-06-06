# cli

Kubb CLI の全コマンドとオプション一覧。

## バージョン確認

```sh
kubb --version
```

## ヘルプ表示

```sh
kubb --help
```

## `kubb init`: プロジェクトの初期化

```sh
npx kubb init
```

インタラクティブウィザードで `kubb.config.ts` を生成する。デフォルトで `@kubb/plugin-oas` と `@kubb/plugin-ts` が選択される。

## `kubb generate`: コード生成

```sh
kubb generate
```

`kubb.config.ts` の設定に基づいてコードを生成する。

```sh
kubb generate --config ./configs/kubb.config.ts
```

カスタム設定ファイルを指定する。

```sh
kubb generate --watch
```

入力ファイルの変更を監視してコードを再生成する。

```sh
kubb generate --log-level verbose
```

プラグインのパフォーマンスメトリクスを含む詳細ログを出力する。

```sh
kubb generate --debug
```

完全なデバッグログを出力し、`.kubb/` ディレクトリにログファイルを作成する。

```sh
kubb generate --silent
```

全出力を抑制する。

**`kubb generate` オプション一覧**:

| オプション | 短縮形 | 説明 |
|-----------|-------|------|
| `--config` | `-c` | 設定ファイルのパス |
| `--log-level` | `-l` | ログレベル: `silent` / `info`（デフォルト）/ `verbose` / `debug` |
| `--watch` | `-w` | 入力ファイルの変更を監視 |
| `--verbose` | `-v` | プラグインのパフォーマンスメトリクスを含む詳細ログ |
| `--debug` | `-d` | 完全なデバッグログ（`.kubb/` にログファイルを作成） |
| `--silent` | `-s` | 全出力を抑制 |
| `--help` | `-h` | ヘルプを表示 |

## `kubb validate`: OpenAPI ファイルの検証

```sh
kubb validate --input petstore.yaml
```

Swagger/OpenAPI ファイルの構文と構造をチェックする。`@kubb/oas` パッケージが必要。

## `kubb start`: HTTP サーバーの起動

```sh
kubb start petStore.yaml
```

```sh
kubb start --config kubb.config.ts
```

SSE（Server-Sent Events）ストリーミング付き HTTP サーバーを起動する。

**`kubb start` オプション一覧**:

| オプション | 短縮形 | デフォルト | 説明 |
|-----------|-------|----------|------|
| `--config` | `-c` | — | 設定ファイルのパス |
| `--log-level` | `-l` | `info` | ログレベル |
| `--port` | `-p` | 自動選択 | サーバーポート |
| `--host` | — | `localhost` | サーバーホスト名 |

## `kubb agent`: Agent サーバーの管理

```sh
kubb agent start
```

Kubb Studio との WebSocket 連携用 HTTP サーバーを起動する。

```sh
kubb agent start --config ./my-config.ts
```

```sh
kubb agent start --host 0.0.0.0 --port 8080
```

```sh
kubb agent start --allow-write
```

ファイルシステムへの書き込みを許可する。

```sh
kubb agent start --allow-all
```

> **警告**: `--allow-all` はファイルシステム書き込みを含む全権限を付与する。信頼できる環境でのみ使用すること。

**`kubb agent start` オプション一覧**:

| オプション | 短縮形 | デフォルト | 説明 |
|-----------|-------|----------|------|
| `--config` | `-c` | `kubb.config.ts` | 設定ファイルのパス |
| `--port` | `-p` | `3000` | サーバーポート |
| `--host` | — | `localhost` | サーバーホスト名 |
| `--allow-write` | — | — | ファイルシステム書き込みを許可 |
| `--allow-all` | — | — | 全権限を付与（`--allow-write` を含む） |

## `kubb mcp`: MCP サーバーの起動

```sh
npx kubb mcp
```

AI アシスタント（Claude、Cursor 等）向けの MCP（Model Context Protocol）サーバーを起動する。`@kubb/mcp` パッケージが必要。
