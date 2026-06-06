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
hermes cron run
```

## ジョブの削除

```bash
hermes cron remove
```

> **警告**: 削除したジョブは復元できない。

## スケジューラのステータス確認

```bash
hermes cron status
```

## 期限切れジョブを一度だけ実行

```bash
hermes cron tick
```
