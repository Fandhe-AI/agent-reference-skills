# Self-Hosted Runners API

セルフホストランナーの管理・トークン発行・ラベル操作を行うエンドポイント。

## エンドポイント

### ランナー管理

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/runners` | ランナー一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/runners/{runner_id}` | 単一ランナーの取得 |
| DELETE | `/repos/{owner}/{repo}/actions/runners/{runner_id}` | ランナーの削除 |
| GET | `/repos/{owner}/{repo}/actions/runners/downloads` | ランナーアプリケーションのダウンロード URL 一覧取得 |

### トークン・設定

| メソッド | パス | 説明 |
|---|---|---|
| POST | `/repos/{owner}/{repo}/actions/runners/generate-jitconfig` | JIT（Just-In-Time）ランナー設定の生成 |
| POST | `/repos/{owner}/{repo}/actions/runners/registration-token` | ランナー登録トークンの発行 |
| POST | `/repos/{owner}/{repo}/actions/runners/remove-token` | ランナー削除トークンの発行 |

### ランナーラベル

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | ランナーのラベル一覧取得 |
| POST | `/repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | ランナーにラベルを追加 |
| PUT | `/repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | ランナーのラベルを全置換 |
| DELETE | `/repos/{owner}/{repo}/actions/runners/{runner_id}/labels` | ランナーのカスタムラベルを全削除 |
| DELETE | `/repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}` | ランナーから特定のラベルを削除 |

## パラメータ

### JIT 設定生成パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `name` | string | ランナー名（必須） |
| `runner_group_id` | integer | ランナーグループ ID（必須） |
| `labels` | array of string | ランナーのラベル（必須、1〜100個） |
| `work_folder` | string | 作業ディレクトリ。デフォルト: `_work` |

### ラベル操作パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `labels` | array of string | ラベル名の配列 |

## 注意事項

- 登録トークンおよび削除トークンは発行から1時間で有効期限切れになる
- JIT ランナーは1回のジョブ実行で自動的に削除される
- Organization レベルのエンドポイントも同様の構造で `/orgs/{org}/actions/runners/...` に存在する
