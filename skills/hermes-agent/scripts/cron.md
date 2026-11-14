# Cron

スケジュールジョブの作成・管理・実行。

## ジョブ一覧の表示

```bash
hermes cron list
```

## ジョブの作成

```bash
hermes cron create
hermes cron add
```

## ジョブの編集

```bash
hermes cron edit
```

## ジョブの一時停止・再開

```bash
hermes cron pause
hermes cron resume
```

## ジョブの即時実行（次のスケジューラサイクルで）

```bash
hermes cron run <job_id_or_name>
```

手動実行は追加の fire であり、予定された実行はそのまま残り、`repeat` 回数も消費されない。

## 実行中のジョブの現在の run を停止

```bash
hermes cron cancel <job_id_or_name>
hermes cron cancel <job_id_or_name> --reason "wedged on the staging API"
```

スケジュールは変更されずジョブは有効のまま。スクリプトジョブはプロセスツリーが終了され、エージェントジョブは次のチェックポイントで中断される。`hermes cron remove` も実行中の run をキャンセルする。

## ジョブごとのタイムゾーンと取りこぼし設定

```bash
hermes cron create "0 9 * * 1-5" --timezone Asia/Hong_Kong "HK market open brief"
hermes cron edit market-open --grace-minutes 0
hermes cron edit market-open --grace-minutes 180
hermes cron create "0 7 * * 1-5" "Morning brief" --catch-up off
hermes cron edit <job> --catch-up on
```

`--timezone ""`（edit）でプロファイルのタイムゾーンを継承。`--grace-minutes` は 0〜1440 で、`0` は取りこぼしを実行しない、`""` で算出済みの窓に戻す。`--catch-up on|off` はジョブごとの取りこぼし実行の上書き。

## ジョブの削除

```bash
hermes cron remove <job_id_or_name>
```

> **警告**: 削除したジョブは復元できない。実行中の run があればキャンセルされる。

## スケジューラのステータス確認

```bash
hermes cron status
```

## 期限切れジョブを一度だけ実行

```bash
hermes cron tick
```

スケジューラを 1 パスだけ実行して終了する（システム crontab 等の外部スケジューラ向け）。gateway が稼働している必要がある（エージェントジョブは gateway 内で実行され、tick は起動しない）。gateway が無いとエージェントジョブはスキップされ、`hermes gateway start` 後の次の tick で実行される。`no_agent` のスクリプトジョブは tick 単独でも実行される。

## 注記

v0.23 の変更: `hermes cron cancel`、`--timezone`、`--grace-minutes`、`--catch-up` の追加。ジョブの指定は ID の代わりに名前（大文字小文字を区別しない）も使える（曖昧な場合は候補 ID を示して拒否される）。`script` はコマンドラインではなくファイルで、`--script "echo hi"` は作成時に拒否される。

- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron (pinned to v0.23.1)
