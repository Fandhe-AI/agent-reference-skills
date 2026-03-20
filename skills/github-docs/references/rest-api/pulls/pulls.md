# Pull Requests API

プルリクエストの CRUD 操作・マージ・ブランチ更新を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/pulls` | PR 一覧取得 |
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}` | 単一 PR の取得 |
| POST | `/repos/{owner}/{repo}/pulls` | PR の作成 |
| PATCH | `/repos/{owner}/{repo}/pulls/{pull_number}` | PR の更新 |
| PUT | `/repos/{owner}/{repo}/pulls/{pull_number}/merge` | PR のマージ |
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}/commits` | PR のコミット一覧取得 |
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}/files` | PR の変更ファイル一覧取得 |
| GET | `/repos/{owner}/{repo}/pulls/{pull_number}/merge` | PR がマージ済みか確認（204: 済み、404: 未マージ） |
| PUT | `/repos/{owner}/{repo}/pulls/{pull_number}/update-branch` | PR のブランチをベースブランチで更新 |

## パラメータ

### 一覧取得パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `state` | string | 状態フィルタ（`open`, `closed`, `all`）。デフォルト: `open` |
| `head` | string | ヘッドブランチでフィルタ（`user:ref-name` 形式） |
| `base` | string | ベースブランチでフィルタ |
| `sort` | string | ソート基準（`created`, `updated`, `popularity`, `long-running`）。デフォルト: `created` |
| `direction` | string | ソート方向（`asc`, `desc`）。デフォルト: `desc` |

### 作成パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `head` | string | マージ元ブランチ（必須） |
| `base` | string | マージ先ブランチ（必須） |
| `title` | string | PR のタイトル（必須） |
| `body` | string | PR の本文 |
| `draft` | boolean | ドラフト PR として作成するか |

### マージパラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `merge_method` | string | マージ方法（`merge`, `squash`, `rebase`）。デフォルト: `merge` |
| `commit_title` | string | マージコミットのタイトル |
| `commit_message` | string | マージコミットのメッセージ |
| `sha` | string | ヘッドの SHA（期待値と一致しない場合はマージ失敗） |

## 注意事項

- `mergeable` フィールドは `null` になることがある。バックグラウンドでマージ可能性を計算中の場合で、しばらく待ってから再取得が必要
- `update-branch` は PR のヘッドブランチをベースブランチの最新で更新する（マージまたはリベース）
