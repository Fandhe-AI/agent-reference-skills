# Workflow Jobs API

ワークフロージョブの取得・一覧取得・ログダウンロードを行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/jobs/{job_id}` | 単一ジョブの取得 |
| GET | `/repos/{owner}/{repo}/actions/runs/{run_id}/jobs` | ワークフロー実行のジョブ一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/jobs/{job_id}/logs` | ジョブログのダウンロード |

## パラメータ

### ジョブ一覧取得パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `filter` | string | フィルタ（`latest`, `all`）。デフォルト: `latest` |

## ジョブステータス

| ステータス | 説明 |
|---|---|
| `queued` | キューに追加済み（実行待ち） |
| `in_progress` | 実行中 |
| `completed` | 完了 |
| `waiting` | 承認待ちなどで待機中 |

## ジョブ結論（conclusion）

| 結論 | 説明 |
|---|---|
| `success` | 成功 |
| `failure` | 失敗 |
| `cancelled` | キャンセル済み |
| `skipped` | スキップ |
| `timed_out` | タイムアウト |

## 注意事項

- ジョブログのダウンロードはリダイレクト URL が返される（テキスト形式）
- `filter=latest` は最新の実行試行のジョブのみ返す。再実行した場合に前回の試行は含まれない
