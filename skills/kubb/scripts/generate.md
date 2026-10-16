# generate

OpenAPI 仕様からコードを生成するコマンド集（kubb 5.11.0 基準）。

## 基本的なコード生成

```sh
npx kubb generate
```

`kubb.config.ts` の `input` を使ってコードを生成する。`kubb` のみでも同じ動作（`generate` が既定コマンド）。

## npm スクリプト経由での生成

`package.json` に以下を追加して実行する:

```sh
npm run generate
```

```json
{
  "scripts": {
    "generate": "kubb generate"
  }
}
```

## OpenAPI ファイルを指定して生成

```sh
kubb generate ./petStore.yaml
```

`[input]` にパスまたは URL を渡すと config の `input` を上書きする。

## カスタム設定ファイルを使って生成

```sh
kubb generate --config ./configs/kubb.config.ts
```

## ウォッチモードで生成（変更検知）

```sh
kubb generate --watch
```

入力仕様の変更を検知して再実行する。

## 詳細ログ付きで生成

```sh
kubb generate --verbose
```

ログレベルを `verbose` に固定し、遅いプラグインのタイミングを表示する。

## ドライランで生成

```sh
kubb generate --dry-run
```

ファイル書き込み・format・lint・post-generate コマンドを行わずに実行をプレビューする。

## レポーターを指定して生成

```sh
kubb generate --reporter file
```

実行の診断を `.kubb/kubb[-<name>]-<timestamp>.log` に書き出す。

> v5 では `--debug` と `--log-level debug` は削除された。ログファイルが必要な場合は `--reporter file` を使う（公式 migration ガイド）。

```sh
kubb generate --reporter json
```

CI 向けの機械可読レポートを stdout に出力する。エラー時の終了コードは非ゼロ。

```sh
kubb generate --reporter cli,file
```

`--reporter` は `cli` / `json` / `file` / `html` をカンマ区切りで指定できる（既定 `cli`）。

## オプション一覧

| オプション | 短縮形 | デフォルト | 説明 |
| --- | --- | --- | --- |
| `[input]` | — | — | 仕様のパスまたは URL（config の `input` を上書き） |
| `--config=<path>` | `-c` | — | config ファイルのパス |
| `--log-level=<silent\|info\|verbose>` | `-l` | `info` | ログレベル |
| `--silent` | `-s` | `false` | ログレベルを `silent` に固定 |
| `--verbose` | — | `false` | ログレベルを `verbose` に固定 |
| `--reporter=<cli\|json\|file\|html>` | — | `cli` | 使用するレポーター（カンマ区切り、短縮形なし） |
| `--watch` | `-w` | `false` | 入力仕様の変更で再実行 |
| `--dry-run` | — | `false` | 書き込み等を行わずプレビュー |

v4 の camelCase 表記（`--logLevel` / `--dryRun`）は動作するが非推奨警告が出る。

## テレメトリーを無効化して生成

```sh
DO_NOT_TRACK=1 kubb generate
```

```sh
KUBB_DISABLE_TELEMETRY=1 kubb generate
```

匿名使用統計の収集を無効化する（`1` または `true`）。

## OpenAPI ファイルの検証

```sh
kubb validate ./petstore.yaml
```

コード生成前に仕様の構文・構造エラーをチェックする。
