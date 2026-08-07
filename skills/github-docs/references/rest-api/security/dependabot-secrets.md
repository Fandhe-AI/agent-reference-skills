# Dependabot Secrets API

Organization・リポジトリ単位で Dependabot シークレットを CRUD 操作するエンドポイント。

## エンドポイント

### Organization シークレット

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/dependabot/secrets` | シークレット一覧取得 |
| GET | `/orgs/{org}/dependabot/secrets/public-key` | 暗号化用の公開鍵を取得 |
| GET | `/orgs/{org}/dependabot/secrets/{secret_name}` | 単一シークレットの取得 |
| PUT | `/orgs/{org}/dependabot/secrets/{secret_name}` | シークレットの作成または更新 |
| DELETE | `/orgs/{org}/dependabot/secrets/{secret_name}` | シークレットの削除 |
| GET | `/orgs/{org}/dependabot/secrets/{secret_name}/repositories` | アクセス可能なリポジトリ一覧取得 |
| PUT | `/orgs/{org}/dependabot/secrets/{secret_name}/repositories` | アクセス可能なリポジトリを一括置換 |
| PUT | `/orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}` | リポジトリの追加 |
| DELETE | `/orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}` | リポジトリの削除 |

### リポジトリシークレット

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/dependabot/secrets` | シークレット一覧取得 |
| GET | `/repos/{owner}/{repo}/dependabot/secrets/public-key` | 暗号化用の公開鍵を取得 |
| GET | `/repos/{owner}/{repo}/dependabot/secrets/{secret_name}` | 単一シークレットの取得 |
| PUT | `/repos/{owner}/{repo}/dependabot/secrets/{secret_name}` | シークレットの作成または更新 |
| DELETE | `/repos/{owner}/{repo}/dependabot/secrets/{secret_name}` | シークレットの削除 |

## パラメータ

### 作成・更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `encrypted_value` | string | LibSodium で暗号化されたシークレットの値（必須） |
| `key_id` | string | 暗号化に使用した公開鍵の ID（必須） |
| `visibility` | string | Organization シークレットの公開範囲（`all`, `private`, `selected`） |
| `selected_repository_ids` | array of integer | `visibility` が `selected` の場合のリポジトリ ID 配列 |

## Notes

- シークレットの値は API から取得できない（名前・作成日時・更新日時のみ）
- 作成・更新時は事前に `GET public-key` で取得した公開鍵で暗号化した値を送信する
- `/repos/{owner}/{repo}/actions/secrets` `/orgs/{org}/actions/secrets`（Actions シークレット）とは別のシークレットストア。パスと暗号化フローの形は同じだが、`dependabot/secrets` を Actions ワークフローから参照することはできない

## Related

- [dependabot-alerts.md](./dependabot-alerts.md)
