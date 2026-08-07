# Crons

Cron Jobs の追加・一覧・手動トリガー（beta）

## Cron Job の一覧表示

デフォルトサブコマンド（`vercel crons` のみでも同じ）。

```sh
vercel crons ls
```

JSON 形式で出力。

```sh
vercel crons ls --format json
```

## Cron Job の追加

対話形式で `vercel.json` に追加。

```sh
vercel crons add
```

パスとスケジュールを指定して追加。

```sh
vercel crons add --path /api/cron --schedule "0 10 * * *"
```

## Cron Job の手動トリガー

デプロイ済みの Cron Job を即時実行（テスト用）。事前に `vercel deploy --prod` 等で `vercel.json` をデプロイしておく必要がある。

```sh
vercel crons run /api/cron
```
