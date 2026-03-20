# Workflow Runs API

ワークフロー実行の一覧取得・再実行・キャンセル・ログ取得・デプロイメント承認を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/runs` | リポジトリのワークフロー実行一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs` | 特定ワークフローの実行一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/runs/{run_id}` | 単一ワークフロー実行の取得 |
| DELETE | `/repos/{owner}/{repo}/actions/runs/{run_id}` | ワークフロー実行の削除 |
| POST | `/repos/{owner}/{repo}/actions/runs/{run_id}/rerun` | ワークフロー実行の再実行 |
| POST | `/repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs` | 失敗ジョブのみ再実行 |
| POST | `/repos/{owner}/{repo}/actions/runs/{run_id}/cancel` | ワークフロー実行のキャンセル |
| POST | `/repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel` | ワークフロー実行の強制キャンセル |
| GET | `/repos/{owner}/{repo}/actions/runs/{run_id}/logs` | ワークフロー実行ログのダウンロード（zip） |
| DELETE | `/repos/{owner}/{repo}/actions/runs/{run_id}/logs` | ワークフロー実行ログの削除 |
| GET | `/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments` | 保留中のデプロイメント一覧取得 |
| POST | `/repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments` | 保留中のデプロイメントの承認/却下 |
| POST | `/repos/{owner}/{repo}/actions/runs/{run_id}/approve` | ワークフロー実行の承認 |

## フィルタパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `actor` | string | 実行をトリガーしたユーザー名でフィルタ |
| `branch` | string | ブランチ名でフィルタ |
| `event` | string | イベント種別でフィルタ（`push`, `pull_request` など） |
| `status` | string | ステータスでフィルタ（`completed`, `action_required`, `cancelled`, `failure`, `neutral`, `skipped`, `stale`, `success`, `timed_out`, `in_progress`, `queued`, `requested`, `waiting`, `pending`） |
| `created` | string | 作成日時でフィルタ（`>=2024-01-01` 形式） |

## 注意事項

- ログのダウンロードは zip 形式のリダイレクト URL が返される
- `force-cancel` は通常のキャンセルが効かない場合に使用する
- デプロイメントの承認には環境の reviewer 権限が必要
