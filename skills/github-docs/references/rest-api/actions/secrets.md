# Actions Secrets API

GitHub Actions のシークレットの CRUD 操作を行うエンドポイント。シークレットの値は LibSodium で暗号化して送信する必要がある。

## エンドポイント

### リポジトリシークレット

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/secrets` | シークレット一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/secrets/{secret_name}` | 単一シークレットの取得（値は返却されない） |
| PUT | `/repos/{owner}/{repo}/actions/secrets/{secret_name}` | シークレットの作成または更新 |
| DELETE | `/repos/{owner}/{repo}/actions/secrets/{secret_name}` | シークレットの削除 |
| GET | `/repos/{owner}/{repo}/actions/secrets/public-key` | 暗号化用の公開鍵を取得 |

### Organization シークレット

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/actions/secrets` | Organization シークレット一覧取得 |
| GET | `/orgs/{org}/actions/secrets/{secret_name}` | 単一シークレットの取得 |
| PUT | `/orgs/{org}/actions/secrets/{secret_name}` | シークレットの作成または更新 |
| DELETE | `/orgs/{org}/actions/secrets/{secret_name}` | シークレットの削除 |
| GET | `/orgs/{org}/actions/secrets/public-key` | 暗号化用の公開鍵を取得 |

### Environment シークレット

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/environments/{environment_name}/secrets` | Environment シークレット一覧取得 |
| GET | `/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` | 単一シークレットの取得 |
| PUT | `/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` | シークレットの作成または更新 |
| DELETE | `/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` | シークレットの削除 |
| GET | `/repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key` | 暗号化用の公開鍵を取得 |

## パラメータ

### 作成・更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `encrypted_value` | string | LibSodium で暗号化されたシークレットの値（必須） |
| `key_id` | string | 暗号化に使用した公開鍵の ID（必須） |
| `visibility` | string | Organization シークレットの公開範囲（`all`, `private`, `selected`） |
| `selected_repository_ids` | array of integer | `visibility` が `selected` の場合のリポジトリ ID 配列 |

## 注意事項

- シークレットの値は API から取得できない（名前・作成日時・更新日時のみ）
- 作成・更新時は LibSodium（tweetnacl）で公開鍵を使って暗号化した値を送信する必要がある
- 暗号化の前に公開鍵の取得（`GET public-key`）が必須
