# Actions Concurrency Groups API

GitHub Actions の concurrency group（同一グループで同時に実行されるのは 1 つのジョブ / ワークフローのみ）の状態を読み取るエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/actions/concurrency-groups

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/concurrency_groups` | リポジトリのアクティブな concurrency group 一覧 |
| GET | `/repos/{owner}/{repo}/actions/concurrency_groups/{concurrency_group_name}` | 特定グループとキュー内の全インスタンス（非アクティブ / 不存在は 404） |
| GET | `/repos/{owner}/{repo}/actions/runs/{run_id}/concurrency_groups` | ワークフロー run（またはそのジョブ）に関連する全グループ |

## パラメータ

| パラメータ | 対象 | 型 | 説明 |
|---|---|---|---|
| `per_page` | 一覧 / run | integer | 1 ページの件数（最大 100、既定 30） |
| `after` | 一覧 / run | string | Link ヘッダーのカーソル。これより後の結果 |
| `before` | run | string | Link ヘッダーのカーソル。これより前の結果 |
| `concurrency_group_name` | 単一取得 | string (必須) | グループ名 |
| `ahead_of_run` | 単一取得 | integer | 指定 run ID より前のキュー項目と run 自身に絞る。`ahead_of_job` と排他 |
| `ahead_of_job` | 単一取得 | integer | 指定 job ID より前のキュー項目と job 自身に絞る。`ahead_of_run` と排他 |
| `run_id` | run | integer (必須) | ワークフロー run の ID |

## レスポンス

- 一覧: `total_count`, `concurrency_groups[]`（`group_name`, `group_url`, `last_acquired_at`）
- 単一取得: `group_name`, `group_url`, `total_count`, `group_members[]`（`run_id`, `run_name`, `run_url`, `run_html_url`, `job_id`, `job_name`, `job_url`, `job_html_url`, `status`: `in_progress` / `pending`）
- run 別: `total_count`, `concurrency_groups[]`（`group_name`, `group_url`, `group_members[]` に `position`, `position_url` を含む）

## 例

```curl
curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/actions/concurrency_groups
```

## 注意事項

- private リポジトリでは OAuth app トークン / PAT (classic) に `repo` スコープが必要
- `ahead_of_run` は workflow レベルの concurrency と reusable workflow のリースに一致する。run 内のジョブレベルのリースは run 全体をブロックするとはみなさない。ジョブ単位は `ahead_of_job` を使う
- 指定した run / job がそのグループに存在しない場合は 422
- run 別エンドポイントは run の設定から導出するため、現在キューに項目が無くても group が含まれ、その場合 `group_members` は空配列。`total_count` は設定上関与するグループ数（アクティブ数ではない）
- 単一取得はリポジトリ全体のライブ状態を返し、アクティブ項目が無いと 404。run 別エンドポイントは run の設定上のグループを返す点が異なる
- run 別エンドポイントは group 名順で、`after` は前方のみのページングで `rel="prev"` を返さない。後方へは前方ページの next カーソルから `before` を使う
- 全エンドポイントは `X-GitHub-Api-Version: 2026-03-10` を使用（原文記載）

## Related

- [README.md](./README.md)
