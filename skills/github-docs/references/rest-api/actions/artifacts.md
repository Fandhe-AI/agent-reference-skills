# Artifacts API

ワークフロー実行で生成されたアーティファクトの一覧取得・ダウンロード・削除を行うエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/artifacts` | リポジトリのアーティファクト一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts` | 特定ワークフロー実行のアーティファクト一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/artifacts/{artifact_id}` | 単一アーティファクトの取得 |
| GET | `/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/zip` | アーティファクトのダウンロード（zip） |
| DELETE | `/repos/{owner}/{repo}/actions/artifacts/{artifact_id}` | アーティファクトの削除 |

## パラメータ

### 一覧取得パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `name` | string | アーティファクト名でフィルタ |

## 注意事項

- ダウンロード URL は1分間で有効期限切れになる
- ダウンロードは zip 形式で返される
- アーティファクトはデフォルトで90日後に自動削除される（リポジトリ設定で変更可能）
