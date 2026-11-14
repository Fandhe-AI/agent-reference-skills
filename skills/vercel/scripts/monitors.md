# Monitors

モニター（アラートを発生させるルール）の作成・一覧・更新・削除と通知先（Slack / webhook）の管理

`vercel monitors` は非推奨の `vercel alerts rules` を置き換える（オプションとリクエスト本文は同じ。JSON 出力のキーは `rules` → `monitors`、`ruleTypes` → `monitorTypes`、`rule` → `monitor`、`ruleId` → `monitorId` に変わる）。モニター ID は `add` が返し `ls` が表示する。

## Signature / Usage

### モニターの一覧

リンク中のプロジェクトに影響するモニターを表示（エイリアス `list`）。

```sh
vercel monitors ls
```

チームの全モニターを表示。

```sh
vercel monitors ls --all
```

プロジェクトを指定してカスタムモニターのみ表示（`--type` は `built-in` / `custom`、繰り返し・カンマ区切り可）。

```sh
vercel monitors ls --project my-app --type custom
```

JSON 形式で出力（`{ "monitors": [...] }`）。

```sh
vercel monitors ls --all --format json
```

### スキーマの確認

利用可能なモニター種別を一覧表示。種別を指定すると、作成・更新で使えるフィールド・制約・例を表示する。

```sh
vercel monitors schema
```

```sh
vercel monitors schema --type built-in
vercel monitors schema --type custom --format json
```

カスタムモニターの本文を書く前に、メトリクス名・集計・ディメンションを確認する。

```sh
vercel metrics schema <metric-or-prefix>
```

### モニターの追加

JSON ファイルから追加する。本文の `type` は `built-in` または `custom` が必須。対象プロジェクトは本文の `ruleScope`、`--project <name-or-id>`、`--all`（組み込みモニターのみ）のいずれか 1 つで指定する（`ruleScope` と `--project` / `--all` は併用不可。リンク中のプロジェクトは自動では使われない）。カスタムモニターは `--project` が必須で `--all` は使えない。

組み込みのエラー異常検知モニターの本文例（`monitor.json`）。

```json
{
  "type": "built-in",
  "name": "Production server errors",
  "triggers": {
    "mode": "selected",
    "items": [
      {
        "type": "error_anomaly",
        "filter": "statusGroup:5xx AND route:/api/*"
      }
    ]
  },
  "matchMinimumSeverityLevel": "high"
}
```

```sh
vercel monitors add --project my-app --body ./monitor.json
```

カスタムのしきい値モニターの本文例（`monitor.json`）。

```json
{
  "type": "custom",
  "name": "Checkout server errors",
  "severity": "high",
  "evaluation": {
    "window": "5m",
    "query": {
      "metrics": {
        "errors": {
          "metric": "vercel.request.count",
          "aggregation": "count",
          "filter": "httpStatus >= 500"
        }
      },
      "outputs": ["errors"]
    }
  },
  "trigger": {
    "type": "threshold",
    "output": "errors",
    "operator": "gt",
    "threshold": 20
  }
}
```

```sh
vercel monitors add --project my-app --body ./monitor.json
```

### モニターの詳細確認・更新・削除

```sh
vercel monitors inspect ar_abc123
vercel monitors inspect ar_abc123 --format json
```

本文の一部（`patch.json`）でフィールドを更新（`--body` / `--project` / `--all` のいずれかが必須）。

```json
{
  "name": "Critical production errors",
  "matchMinimumSeverityLevel": "critical"
}
```

```sh
vercel monitors update ar_abc123 --body ./patch.json
```

プロジェクトスコープのみを変更。

```sh
vercel monitors update ar_abc123 --project my-app
```

> **警告**: 削除は取り消せない。チームのデフォルトモニターは削除できない。

```sh
vercel monitors rm ar_abc123
```

確認なしで削除。

```sh
vercel monitors rm ar_abc123 --yes
```

### 通知先（Slack / webhook）の管理

`vercel login` またはトークンで認証する。リンク中のプロジェクトのチームを使い、別のチームは `--scope <team>` で指定する。サブコマンドなしで `ls` を実行する。

```sh
vercel monitors notifications
vercel monitors notifications ls ar_example
vercel monitors notifications ar_example --json
```

Slack チャンネルを連携（Vercel アプリのインストールとチャンネルへの招待が事前に必要。インストールが 1 件だけなら `--slack-installation-id` は省略可）。

```sh
vercel monitors notifications link ar_example --slack-channel C123
vercel monitors notifications link ar_example --slack-channel C123 --slack-installation-id icfg_example
```

既存のアカウント webhook を連携（URL ではなく ID を渡す。ID は `vercel webhooks list` で確認）。`--critical-only` で Vercel Agent が Critical に引き上げたアラートのみ通知する。

```sh
vercel monitors notifications link ar_example --webhook wh_example
vercel monitors notifications link ar_example --webhook wh_example --critical-only
```

配信設定の変更（`--critical-only` または `--no-critical-only` のどちらか 1 つが必須）。

```sh
vercel monitors notifications update ar_example --slack-channel C123 --critical-only
vercel monitors notifications update ar_example --webhook wh_example --no-critical-only
```

連携の解除（webhook 自体の削除や Slack アプリのアンインストールは行わない。`link` / `update` / `unlink` は確認プロンプトなしで即時反映される）。

```sh
vercel monitors notifications unlink ar_example --slack-channel C123
vercel monitors notifications unlink ar_example --webhook wh_example
```

## Notes

- Source: https://vercel.com/docs/cli/monitors (fetched 2026-11-14)
