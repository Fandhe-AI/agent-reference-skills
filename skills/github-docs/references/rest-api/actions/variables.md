# Actions Variables API

GitHub Actions の変数の CRUD 操作を行うエンドポイント。シークレットとは異なり、変数の値は API から取得可能。

## エンドポイント

### リポジトリ変数

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/actions/variables` | 変数一覧取得 |
| GET | `/repos/{owner}/{repo}/actions/variables/{name}` | 単一変数の取得（値も返却される） |
| POST | `/repos/{owner}/{repo}/actions/variables` | 変数の作成 |
| PATCH | `/repos/{owner}/{repo}/actions/variables/{name}` | 変数の更新 |
| DELETE | `/repos/{owner}/{repo}/actions/variables/{name}` | 変数の削除 |

### Organization 変数

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/actions/variables` | Organization 変数一覧取得 |
| GET | `/orgs/{org}/actions/variables/{name}` | 単一変数の取得 |
| POST | `/orgs/{org}/actions/variables` | 変数の作成 |
| PATCH | `/orgs/{org}/actions/variables/{name}` | 変数の更新 |
| DELETE | `/orgs/{org}/actions/variables/{name}` | 変数の削除 |

### Environment 変数

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/environments/{environment_name}/variables` | Environment 変数一覧取得 |
| GET | `/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` | 単一変数の取得 |
| POST | `/repos/{owner}/{repo}/environments/{environment_name}/variables` | 変数の作成 |
| PATCH | `/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` | 変数の更新 |
| DELETE | `/repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` | 変数の削除 |

## パラメータ

### 作成・更新パラメータ

| パラメータ | 型 | 説明 |
|---|---|---|
| `name` | string | 変数名（作成時は必須） |
| `value` | string | 変数の値（必須） |
| `visibility` | string | Organization 変数の公開範囲（`all`, `private`, `selected`） |
| `selected_repository_ids` | array of integer | `visibility` が `selected` の場合のリポジトリ ID 配列 |

## 注意事項

- シークレットとは異なり、変数の値は API レスポンスに含まれる
- 暗号化は不要で、平文の値をそのまま送信する
