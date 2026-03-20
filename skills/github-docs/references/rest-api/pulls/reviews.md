# PR Reviews API

プルリクエストのレビューの作成・取得・提出・却下を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews` | レビュー一覧取得 |
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` | 単一レビューの取得 |
| POST | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews` | レビューの作成 |
| PUT | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` | レビューの更新 |
| DELETE | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` | レビューの削除 |
| POST | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events` | レビューの提出（Submit） |
| PUT | `/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals` | レビューの却下（Dismiss） |

## パラメータ

### 作成パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `body` | string | レビューの本文 |
| `event` | string | レビューイベント（`APPROVE`, `REQUEST_CHANGES`, `COMMENT`） |
| `comments` | array | レビューコメントの配列 |

### 提出パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `body` | string | レビューの本文 |
| `event` | string | レビューイベント（`APPROVE`, `REQUEST_CHANGES`, `COMMENT`）（必須） |

### 却下パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `message` | string | 却下理由のメッセージ（必須） |

## レビューイベント

| イベント | 説明 |
|---|---|
| `APPROVE` | PR を承認する |
| `REQUEST_CHANGES` | 変更を要求する |
| `COMMENT` | コメントのみ（承認も変更要求もしない） |
| `PENDING` | 下書き状態（提出前） |

## 注意事項

- 削除できるのは `PENDING`（下書き）状態のレビューのみ
- 提出済みのレビューは削除できないため、却下（Dismiss）を使用する
