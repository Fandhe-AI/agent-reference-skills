# kubb generate

`kubb.config.ts` を読み込みコード生成パイプラインを実行するコマンド。デフォルトコマンドのため、引数なしの `kubb` も同じ動作になる。

## Signature / Usage

```shell
# config の input から生成
kubb generate

# input ファイルを指定して config を上書き
kubb generate ./petStore.yaml
```

## Arguments

| Name | Description |
| --- | --- |
| `[input]` | Swagger/OpenAPI ドキュメントのパスまたは URL（任意）。config の `input` を上書きする |

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--config=<path>`, `-c <path>` | | 設定ファイルのパス（例: `./kubb.staging.ts`） |
| `--log-level=<silent\|info\|verbose>`, `-l` | `info` | ログの詳細度。`verbose` でプラグインのタイミングを表示 |
| `--silent`, `-s` | `false` | ログレベルを `silent` に強制し出力を抑制 |
| `--verbose` | `false` | ログレベルを `verbose` に強制し遅いプラグインを表示 |
| `--reporter=<cli\|json\|file\|html>` | | 起動するレポーターをカンマ区切りで指定。省略時は `cli` |
| `--watch`, `-w` | `false` | 入力 spec が変わるたびにパイプラインを再実行 |
| `--dry-run` | `false` | ファイル書き込み・フォーマット・lint・post-generate コマンドを行わず実行をプレビュー |

`--reporter` に短縮フラグは無い。v4 の camelCase 表記（`--logLevel`、`--dryRun`）は動作するが deprecation 警告が出る。

## Reporters

レポーターは実行結果の出力方法を決める。config の `reporters` に登録されたものを `--reporter` が名前で選ぶ（`--reporter cli,file`）。デフォルトで 4 つ登録されている。

| Reporter | Output |
| --- | --- |
| `cli` | 実行終了時のターミナルサマリー。デフォルト。非対話ターミナルと AI エージェントセッションではプレーンテキスト |
| `json` | CI 向けの機械可読レポートを stdout に出力。JSON 形状は Diagnostics を参照 |
| `file` | 実行の diagnostics を `.kubb/kubb[-<name>]-<timestamp>.log` に書き出す。config に `name` が無ければ `<name>` 部分は省略。diagnostics が無い実行ではファイルを書かない |
| `html` | 生成ファイルと diagnostics を含む閲覧用レポートディレクトリを `.kubb/kubb[-<name>]-<timestamp>/index.html` に書き出す |

```shell
# ログファイルを書き出す
kubb generate --reporter file

# CI 向け JSON レポート。エラーがあれば終了コードは非ゼロ
kubb generate --reporter json
```

## Notes

- 出典: https://kubb.dev/docs/5.x/reference/commands/generate （kubb@5.11.0 の docs/5.x/reference/commands/generate.md）
- v4 の `--logLevel` / `--dryRun` は deprecated（kebab-case へ移行）。旧 `helpers/cli.md` の `-l, --logLevel` 表記はこれに該当。

## Related

- [validate](./validate.md)
- [init](./init.md)
