# CI

Vercel CI（beta）の有効化・無効化、実行（run）の一覧・詳細・ログ・検索・再実行

CI を実行したチームを選ぶか `--scope <team>` を指定する。Vercel CI は beta のため機能と設定は変わる可能性がある。全サブコマンドが `--format json`（`-F json`）または `--json` で機械可読な出力に対応する。

## 実行の調査（一覧・詳細・失敗ログ）

```sh
vercel ci ls
vercel ci inspect
vercel ci logs --failed
```

## リポジトリでの有効化・無効化

現在の Git リポジトリで Vercel CI を有効化（リポジトリはチームのプロジェクトに接続され、他チームのプロジェクトには接続されていないこと）。Git リモートが複数ある場合は `--remote` で選択（非対話では必須）。

```sh
vercel ci enable
vercel ci enable --remote origin --scope your-team
```

現在の GitHub リポジトリで無効化（事前に CLI を更新し、`vercel login` またはトークンで認証する）。非対話モードは JSON を自動で返し、`outcome` は `disabled` または `unchanged`。

```sh
vercel ci disable
vercel ci disable --remote upstream --scope your-team --non-interactive
```

## 実行の一覧

現在のブランチの実行を表示（エイリアス `list`）。`--status` は `queued` / `running` / `succeeded` / `failed` / `skipped`、`--limit` はデフォルト 20（最大 100）。

```sh
vercel ci ls --branch main
vercel ci ls --all-branches --status failed
vercel ci ls --format json
```

## 実行の詳細

コミット単位の現在の実行を表示（省略時）。実行 ID は `vercel ci ls` で確認。`--wait` は最大 10 分待ち、失敗時に終了コード 1 で終了する（待機の中断は実行をキャンセルしない）。

```sh
vercel ci inspect
vercel ci inspect your_run_id_here --attempt 1
vercel ci inspect --wait
```

## タスクログの取得

```sh
vercel ci logs --failed
vercel ci logs --task 'web#test' --level error --level fatal
vercel ci logs --grep ECONNRESET
vercel ci logs your_run_id_here --task 'web#build' --follow
```

ログレベルは `trace` / `debug` / `command` / `info` / `warn` / `error` / `systemError` / `fatal`。`--failed` と `--follow` は併用不可。`--follow` は 1 つの `--task` が必須。

## 直近の実行を横断検索

デフォルトは現在のブランチの直近 20 実行（`--runs` は最大 50）。

```sh
vercel ci grep ECONNRESET
vercel ci grep "out of memory" --all-branches --status failed --runs 50
```

## 完了した実行の再実行

実行 ID 省略時は現在のコミットの失敗した実行を選ぶ。成功・スキップ済みの実行は ID を指定する。

```sh
vercel ci rerun
vercel ci rerun your_run_id_here --wait
```

## JSON 出力

```sh
vercel ci inspect --json
vercel ci logs your_run_id_here --task 'web#build' --follow --json
```

## Notes

- Source: https://vercel.com/docs/cli/ci (fetched 2026-11-14)
