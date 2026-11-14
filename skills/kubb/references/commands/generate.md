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
| `[input]` | Swagger/OpenAPI ドキュメントのパス・URL・git 入力（`git+<repo>#<ref>:<path>`）（任意）。config の `input` を上書きする |

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--config=<path>`, `-c <path>` | | 設定ファイルのパス（例: `./kubb.staging.ts`） |
| `--log-level=<silent\|info\|verbose>`, `-l` | `info` | ログの詳細度。`verbose` でプラグインのタイミングを表示 |
| `--silent`, `-s` | `false` | ログレベルを `silent` に強制し出力を抑制 |
| `--verbose` | `false` | ログレベルを `verbose` に強制し遅いプラグインを表示 |
| `--reporter=<cli\|json\|file\|html>` | | 起動するレポーターをカンマ区切りで指定。省略時は `cli` |
| `--watch`, `-w` | `false` | ローカルの入力ファイルが変わるたびにパイプラインを再実行 |
| `--dry-run` | `false` | ファイル書き込み・フォーマット・lint・post-generate コマンドを行わず実行をプレビュー。サマリーに disk と比べた計画中のファイル変更を表示 |

`--reporter` に短縮フラグは無い。v4 の camelCase 表記（`--logLevel`、`--dryRun`）は動作するが deprecation 警告が出る。

`--watch` はローカルの `input` ファイルのみ監視する。URL や git 入力は 1 回だけ生成されるため、リモート spec の変更後は Kubb を再実行する。`--watch` では再ビルドごとに所要時間と spec で増減した schema / operation 数を 1 行で表示し、その下のサマリーに追加・変更・削除されたファイルを列挙する。対話ターミナルでは `r` で再ビルド、`q` で終了。

## Reporters

レポーターは実行結果の出力方法を決める。config の `reporters` に登録されたものを `--reporter` が名前で選ぶ（`--reporter cli,file`）。デフォルトで 4 つ登録されている。

CLI サマリーは結果と所要時間から始まり、plugin ごとの結果と出力パスが続く。内容が変わらなかったファイルは別集計され、`output.clean` が出力ディレクトリを書き直した場合も同様。

```text
✓ Generation complete  466ms

  17 files generated · 54 unchanged
  Plugins  4 passed
  Output   ./src/gen

File changes
  14 added · 3 modified · 1 deleted
  Lines  +312 −47
```

File changes は実行前のファイル内容との比較。カスタム storage driver ではこの節は出ない。行数の合計は各行の出現数で比較するため、ファイル内で行を移動しても削除と追加には数えない。`--dry-run` ではサマリーに “planned” と “Nothing was written.” と出る。プレーンターミナルと AI エージェントセッションでも同じサマリーを表示する。

| Reporter | Output |
| --- | --- |
| `cli` | 実行終了時のターミナルサマリー。デフォルト。非対話ターミナルと AI エージェントセッションではプレーンテキスト |
| `json` | CI 向けの機械可読レポートを stdout に出力。JSON 形状は Diagnostics を参照 |
| `file` | 実行のサマリー・plugin タイミング・問題を `.kubb/kubb[-<name>]-<timestamp>.log` に書き出す。config に `name` が無ければ `<name>` 部分は省略 |
| `html` | 生成ファイルと diagnostics を含む閲覧用レポートディレクトリを `.kubb/kubb[-<name>]-<timestamp>/index.html` に書き出す |

```shell
# ログファイルを書き出す
kubb generate --reporter file

# CI 向け JSON レポート。stdout はレポートのみで、実行ログは stderr。エラーがあれば終了コードは非ゼロ
kubb generate --reporter json
```

## Notes

- Migration (5.11 → 5.20): `kubb generate --watch` follows a local `input` file only and no longer polls a URL `input`; a URL or git input is generated once, with a warning (5.12.0 changelog, @kubb/cli, #4375). `input` accepts `git+<repo>#<ref>:<path>`; private repositories use your git credentials and `kubb validate` accepts the same form (#4375).
- Source: https://kubb.dev/docs/5.x/reference/commands/generate （kubb@5.20.0 の docs/5.x/reference/commands/generate.md、取得日 2026-11-14）
- v4 の `--logLevel` / `--dryRun` は deprecated（kebab-case へ移行）。旧 `helpers/cli.md` の `-l, --logLevel` 表記はこれに該当。

## Related

- [validate](./validate.md)
- [init](./init.md)
