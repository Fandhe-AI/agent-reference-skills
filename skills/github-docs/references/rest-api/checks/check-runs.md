# Check Runs API

個別のチェック実行を作成・管理するAPI。チェック実行はCI/CDパイプラインの個別ステップ（テスト、リンターなど）の結果を表す。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/repos/{owner}/{repo}/check-runs` | チェック実行を作成 |
| GET | `/repos/{owner}/{repo}/check-runs/{check_run_id}` | チェック実行を取得 |
| PATCH | `/repos/{owner}/{repo}/check-runs/{check_run_id}` | チェック実行を更新 |
| GET | `/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations` | アノテーション一覧を取得 |
| POST | `/repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest` | チェック実行を再リクエスト |
| GET | `/repos/{owner}/{repo}/commits/{ref}/check-runs` | リファレンスのチェック実行一覧を取得 |
| GET | `/repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs` | チェックスイートのチェック実行一覧を取得 |

## 権限

- **書き込みアクセス（作成・更新）はGitHub Appsのみ**
- 読み取りはOAuthアプリやPATでも可能

## チェック実行の作成

```
POST /repos/{owner}/{repo}/check-runs
```

### リクエストボディ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| name | string | Yes | チェック実行の名前 |
| head_sha | string | Yes | チェック対象のコミットSHA |
| details_url | string | No | 外部システムの詳細URL |
| external_id | string | No | 外部システムのID |
| status | string | No | `queued`, `in_progress`, `completed` |
| started_at | string | No | 開始時刻（ISO 8601） |
| conclusion | string | No | 結果（statusが`completed`の場合に必須） |
| completed_at | string | No | 完了時刻（ISO 8601） |
| output | object | No | 出力情報 |
| actions | object[] | No | アクションボタン（最大3個） |

### conclusion の値

| 値 | 説明 |
|-----|------|
| `action_required` | アクションが必要 |
| `cancelled` | キャンセル済み |
| `failure` | 失敗 |
| `neutral` | 中立 |
| `success` | 成功 |
| `skipped` | スキップ |
| `stale` | 古い結果 |
| `timed_out` | タイムアウト |

### output オブジェクト

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| title | string | Yes | 出力のタイトル |
| summary | string | Yes | サマリー（Markdown対応） |
| text | string | No | 詳細テキスト（Markdown対応） |
| annotations | object[] | No | コード行へのアノテーション |
| images | object[] | No | 画像の配列 |

### annotations（アノテーション）

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| path | string | Yes | ファイルパス |
| start_line | integer | Yes | 開始行 |
| end_line | integer | Yes | 終了行 |
| start_column | integer | No | 開始カラム（start_line == end_lineの場合のみ） |
| end_column | integer | No | 終了カラム（start_line == end_lineの場合のみ） |
| annotation_level | string | Yes | `notice`, `warning`, `failure` |
| message | string | Yes | メッセージ |
| title | string | No | タイトル |
| raw_details | string | No | 詳細（プレーンテキスト） |

### アノテーションの制限

- **1リクエストあたり最大50個**のアノテーション
- 50個を超える場合はチェック実行の更新（PATCH）を複数回実行する

## チェック実行の更新

```
PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}
```

作成時と同じパラメータで更新可能。進行中のチェック実行のステータスや結果を更新する際に使用する。

## リファレンスのチェック実行一覧

```
GET /repos/{owner}/{repo}/commits/{ref}/check-runs
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| check_name | string | チェック名でフィルタ |
| status | string | ステータスでフィルタ（`queued`, `in_progress`, `completed`） |
| filter | string | `latest`（デフォルト）または `all` |
