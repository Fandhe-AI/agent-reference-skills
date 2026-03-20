# Issues API

Issue の CRUD 操作を行うエンドポイント。PR も Issue として扱われるため、`pull_request` キーの有無で判別する。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/issues` | 認証ユーザーに割り当てられた Issue の一覧取得 |
| GET | `/orgs/{org}/issues` | Organization の Issue 一覧取得 |
| GET | `/repos/{owner}/{repo}/issues` | リポジトリの Issue 一覧取得 |
| GET | `/repos/{owner}/{repo}/issues/{issue_number}` | 単一 Issue の取得 |
| POST | `/repos/{owner}/{repo}/issues` | Issue の作成 |
| PATCH | `/repos/{owner}/{repo}/issues/{issue_number}` | Issue の更新 |
| PUT | `/repos/{owner}/{repo}/issues/{issue_number}/lock` | Issue のロック |
| DELETE | `/repos/{owner}/{repo}/issues/{issue_number}/lock` | Issue のアンロック |

## パラメータ

### 一覧取得パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `state` | string | 状態フィルタ（`open`, `closed`, `all`）。デフォルト: `open` |
| `labels` | string | カンマ区切りのラベル名でフィルタ |
| `sort` | string | ソート基準（`created`, `updated`, `comments`）。デフォルト: `created` |
| `direction` | string | ソート方向（`asc`, `desc`）。デフォルト: `desc` |
| `since` | string | ISO 8601 形式の日時。この日時以降に更新された Issue のみ返す |
| `assignee` | string | アサイニーでフィルタ。`none` で未割当、`*` で割当済み |
| `milestone` | string | マイルストーン番号でフィルタ。`none` で未設定、`*` で設定済み |
| `filter` | string | フィルタ種別（`assigned`, `created`, `mentioned`, `subscribed`, `repos`, `all`） |

### 作成・更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `title` | string | Issue のタイトル（作成時は必須） |
| `body` | string | Issue の本文 |
| `assignees` | array of string | アサイニーのユーザー名 |
| `labels` | array of string | ラベル名 |
| `milestone` | integer | マイルストーン番号 |
| `state` | string | 状態（`open`, `closed`）。更新時のみ |

## 注意事項

- PR も Issue として返される。レスポンスに `pull_request` キーが存在する場合はプルリクエストである
- ロック時に `lock_reason` パラメータで理由を指定可能（`off-topic`, `too heated`, `resolved`, `spam`）
