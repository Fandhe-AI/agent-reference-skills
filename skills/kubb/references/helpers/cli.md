# @kubb/cli

OpenAPI 仕様からコードを生成する Kubb の CLI ツール。

## インストール

```bash
bun add -d @kubb/cli
pnpm add -D @kubb/cli
npm install --save-dev @kubb/cli
yarn add -D @kubb/cli
```

## コマンド一覧

### `kubb init`

新規プロジェクトのインタラクティブセットアップウィザード。

```bash
npx kubb init
```

**ワークフロー**:
1. `package.json` の作成/検出
2. パッケージマネージャーの検出（npm, pnpm, yarn, bun）
3. OpenAPI 仕様ファイルのパスを入力
4. 出力ディレクトリの指定
5. プラグイン選択メニュー表示
6. パッケージのインストール
7. `kubb.config.ts` の生成

デフォルトで `@kubb/plugin-oas` と `@kubb/plugin-ts` が選択される。

### `kubb generate`（または `kubb`）

設定ファイルに基づいてコードを生成する。

```bash
kubb generate [OPTIONS]
kubb petStore.yaml
```

**オプション**:

| オプション | 説明 |
|-----------|------|
| `-c, --config` | 設定ファイルのパス |
| `-l, --logLevel` | ログレベル: `silent` \| `info` \| `verbose` \| `debug` |
| `-w, --watch` | 入力ファイルの変更を監視 |
| `-v, --verbose` | プラグインのパフォーマンスメトリクスを含む詳細ログ |
| `-s, --silent` | 全出力を抑制 |
| `-d, --debug` | 完全なデバッグログ（`.kubb/kubb-{name}-{timestamp}.log` を作成） |
| `-h, --help` | ヘルプを表示 |
| `-v, --version` | バージョンを表示 |

**ログレベル詳細**:
- `silent`: 出力なし
- `info`: 警告、エラー、情報メッセージ（デフォルト）
- `verbose`: プラグインのタイミングとパフォーマンスメトリクスを追加
- `debug`: 完全な実行トレースと詳細情報

### `kubb start`

SSE（Server-Sent Events）ストリーミング付き HTTP サーバーを起動する。

```bash
kubb start petStore.yaml
kubb start --config kubb.config.ts
```

**オプション**:

| オプション | デフォルト | 説明 |
|-----------|----------|------|
| `-c, --config` | — | 設定ファイルのパス |
| `-l, --logLevel` | `info` | ログレベル |
| `-p, --port` | 自動選択 | サーバーポート |
| `--host` | `localhost` | サーバーホスト名 |

### `kubb validate`

Swagger/OpenAPI ファイルの構文と構造をチェックする。`oas-normalize` を使用。

```bash
kubb validate --input petstore.yaml
```

**オプション**:

| オプション | 説明 |
|-----------|------|
| `-i, --input` | Swagger/OpenAPI ファイルのパス |
| `-h, --help` | ヘルプを表示 |

`@kubb/oas` パッケージが必要。

### `kubb agent`

Kubb Studio との WebSocket 連携用 HTTP サーバーを管理する。

```bash
kubb agent start
kubb agent start --config ./my-config.ts
kubb agent start --host 0.0.0.0 --port 8080
kubb agent start --allow-write
kubb agent start --allow-all
```

**`agent start` オプション**:

| オプション | デフォルト | 説明 |
|-----------|----------|------|
| `-c, --config` | `kubb.config.ts` | 設定ファイルのパス |
| `-p, --port` | `3000` | サーバーポート |
| `--host` | `localhost` | サーバーホスト名 |
| `--allow-write` | — | ファイルシステム書き込みを許可 |
| `--allow-all` | — | 全権限を付与（`--allow-write` を含む） |

**環境変数**:

| 変数 | 説明 |
|------|------|
| `PORT` | サーバーポート |
| `KUBB_ROOT` | プロジェクトルート |
| `KUBB_CONFIG` | 設定ファイルのパス |
| `KUBB_AGENT_TOKEN` | 認証トークン（Kubb Studio で作成） |
| `KUBB_STUDIO_URL` | Studio エンドポイント |
| `KUBB_ALLOW_WRITE` | 書き込み許可 |
| `KUBB_ALLOW_ALL` | 全権限 |

**API エンドポイント**: `GET /api/health` — サーバーステータス確認

### `kubb mcp`

AI アシスタント用の MCP（Model Context Protocol）サーバーを起動する。

```bash
npx kubb mcp
```

`@kubb/mcp` パッケージが必要。Claude Desktop、Cursor 等の MCP 対応ツールで利用可能。

## デバッグ

`--debug` フラグで `.kubb/` ディレクトリに詳細ログを作成:
- タイムスタンプ
- 設定詳細
- プラグイン実行タイミング
- スキーマパース情報
- ファイル生成進捗
- フォーマッター/リンター詳細
- エラースタックトレース

## テレメトリ

`kubb generate` 実行後に匿名使用統計を収集。OpenAPI 仕様、ファイルパス、シークレットは収集されない。

**無効化**:
```bash
DO_NOT_TRACK=1 kubb generate          # 標準的な無効化
KUBB_DISABLE_TELEMETRY=1 kubb generate # Kubb 固有の無効化
```
