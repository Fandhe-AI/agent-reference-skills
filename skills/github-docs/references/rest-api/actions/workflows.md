# Workflows API

ワークフローの一覧取得・有効化/無効化・手動実行（dispatch）・使用状況の確認を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/workflows` | ワークフロー一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/workflows/{workflow_id}` | 単一ワークフローの取得 |
| PUT | `/repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable` | ワークフローの有効化 |
| PUT | `/repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable` | ワークフローの無効化 |
| POST | `/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches` | ワークフローの手動実行（dispatch） |
| GET | `/repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing` | ワークフローの使用状況（実行時間）取得 |

## パラメータ

### 手動実行（dispatch）パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `ref` | string | 実行対象のブランチまたはタグ（必須） |
| `inputs` | object | ワークフローの入力パラメータ（最大25プロパティ） |

## 注意事項

- `workflow_id` にはワークフロー ID（数値）またはファイル名（例: `main.yml`）を指定可能
- dispatch の `inputs` は最大25個のプロパティまで指定可能
- ワークフローの有効化/無効化は PUT メソッドを使用（レスポンスボディなし、204を返す）
