# Milestones API

マイルストーンの一覧取得・作成・更新・削除を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/milestones` | マイルストーン一覧取得 |
| GET | `/repos/{owner}/{repo}/milestones/{milestone_number}` | 単一マイルストーンの取得 |
| POST | `/repos/{owner}/{repo}/milestones` | マイルストーンの作成 |
| PATCH | `/repos/{owner}/{repo}/milestones/{milestone_number}` | マイルストーンの更新 |
| DELETE | `/repos/{owner}/{repo}/milestones/{milestone_number}` | マイルストーンの削除 |

## パラメータ

### 一覧取得パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `state` | string | 状態フィルタ（`open`, `closed`, `all`）。デフォルト: `open` |
| `sort` | string | ソート基準（`due_on`, `completeness`）。デフォルト: `due_on` |
| `direction` | string | ソート方向（`asc`, `desc`）。デフォルト: `asc` |

### 作成・更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `title` | string | マイルストーンのタイトル（作成時は必須） |
| `state` | string | 状態（`open`, `closed`）。デフォルト: `open` |
| `description` | string | マイルストーンの説明 |
| `due_on` | string | 期限日時（ISO 8601 形式） |
