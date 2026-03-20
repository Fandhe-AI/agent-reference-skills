# Labels API

リポジトリラベルおよび Issue ラベルの CRUD 操作を行うエンドポイント。

## エンドポイント

### リポジトリラベル

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/labels` | リポジトリの全ラベル一覧取得 |
| GET | `/repos/{owner}/{repo}/labels/{name}` | 単一ラベルの取得 |
| POST | `/repos/{owner}/{repo}/labels` | ラベルの作成 |
| PATCH | `/repos/{owner}/{repo}/labels/{name}` | ラベルの更新 |
| DELETE | `/repos/{owner}/{repo}/labels/{name}` | ラベルの削除 |

### Issue ラベル

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/issues/{issue_number}/labels` | Issue のラベル一覧取得 |
| POST | `/repos/{owner}/{repo}/issues/{issue_number}/labels` | Issue にラベルを追加 |
| PUT | `/repos/{owner}/{repo}/issues/{issue_number}/labels` | Issue のラベルを全置換 |
| DELETE | `/repos/{owner}/{repo}/issues/{issue_number}/labels/{name}` | Issue からラベルを削除 |

## パラメータ

### ラベル作成・更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `name` | string | ラベル名（作成時は必須） |
| `color` | string | 6文字の16進数カラーコード（`#` なし）。例: `ff0000` |
| `description` | string | ラベルの説明 |
