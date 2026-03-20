# Deployments API

リポジトリのデプロイメントを作成・管理するAPI。デプロイメントは特定のrefを特定の環境にデプロイするリクエストを表す。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/repos/{owner}/{repo}/deployments` | デプロイメント一覧を取得 |
| POST | `/repos/{owner}/{repo}/deployments` | デプロイメントを作成 |
| GET | `/repos/{owner}/{repo}/deployments/{deployment_id}` | デプロイメントを取得 |
| DELETE | `/repos/{owner}/{repo}/deployments/{deployment_id}` | デプロイメントを削除 |
| GET | `/repos/{owner}/{repo}/deployments/{deployment_id}/statuses` | デプロイステータス一覧を取得 |
| POST | `/repos/{owner}/{repo}/deployments/{deployment_id}/statuses` | デプロイステータスを作成 |
| GET | `/repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}` | デプロイステータスを取得 |

## デプロイメントの作成

```
POST /repos/{owner}/{repo}/deployments
```

### リクエストボディ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| ref | string | Yes | - | デプロイするブランチ、タグ、またはSHA |
| task | string | No | `deploy` | タスク名 |
| auto_merge | boolean | No | `true` | デフォルトブランチの先頭にrefを自動マージ |
| required_contexts | string[] | No | すべて | 必要なステータスコンテキスト（空配列でスキップ可能） |
| payload | string/object | No | `""` | デプロイメントに関連付けるペイロードデータ |
| environment | string | No | `production` | デプロイ先の環境名 |
| description | string | No | `""` | 説明文 |
| transient_environment | boolean | No | `false` | 一時的な環境かどうか |
| production_environment | boolean | No | - | 本番環境かどうか（省略時はenvironment名から推定） |

### auto_merge の動作

- `true` の場合、refがデフォルトブランチの先頭でなければ自動マージを試行
- マージに失敗した場合は `409 Conflict` を返す
- `false` にすると、refがデフォルトブランチの先頭でなくてもデプロイメントを作成する

## デプロイメントの削除

```
DELETE /repos/{owner}/{repo}/deployments/{deployment_id}
```

- ステータスが `inactive` のデプロイメントのみ削除可能
- アクティブなデプロイメントを削除するには、まずステータスを `inactive` に更新する

## デプロイステータスの作成

```
POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| state | string | Yes | ステータス状態（下記参照） |
| target_url | string | No | ステータスの詳細URL（非推奨、log_urlを推奨） |
| log_url | string | No | ログのURL |
| description | string | No | 説明文（最大140文字） |
| environment | string | No | 環境名 |
| environment_url | string | No | 環境のURL |
| auto_inactive | boolean | No | 一時的でない環境の先行デプロイを自動的にinactiveにする |

### state の値

| 値 | 説明 |
|-----|------|
| `error` | エラー発生 |
| `failure` | デプロイ失敗 |
| `inactive` | 非アクティブ |
| `in_progress` | 進行中 |
| `queued` | キュー待ち |
| `pending` | 保留中 |
| `success` | 成功 |

## 先行デプロイの自動非アクティブ化

- 一時的でない（`transient_environment: false`）環境で新しいデプロイが `success` になると、同じ環境の先行デプロイメントは自動的に `inactive` ステータスに変更される
- `auto_inactive: false` で無効化可能
