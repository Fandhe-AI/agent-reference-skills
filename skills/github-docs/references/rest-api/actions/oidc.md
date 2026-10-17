# Actions OIDC API

GitHub Actions の OpenID Connect (OIDC) トークンについて、subject claim のカスタマイズテンプレートと、トークンに含めるリポジトリ custom property を管理するエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/actions/oidc

## エンドポイント

### subject claim テンプレート

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/actions/oidc/customization/sub` | Organization のテンプレート取得 |
| PUT | `/orgs/{org}/actions/oidc/customization/sub` | Organization のテンプレート作成・更新（201） |
| GET | `/repos/{owner}/{repo}/actions/oidc/customization/sub` | リポジトリのテンプレート取得 |
| PUT | `/repos/{owner}/{repo}/actions/oidc/customization/sub` | リポジトリのテンプレート・opt-in / opt-out 設定（201） |

### OIDC トークンに含める custom property

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/enterprises/{enterprise}/actions/oidc/customization/properties/repo` | Enterprise の inclusion 一覧 |
| POST | `/enterprises/{enterprise}/actions/oidc/customization/properties/repo` | Enterprise に inclusion を追加（201） |
| DELETE | `/enterprises/{enterprise}/actions/oidc/customization/properties/repo/{custom_property_name}` | Enterprise の inclusion を削除（204） |
| GET | `/orgs/{org}/actions/oidc/customization/properties/repo` | Organization の inclusion 一覧 |
| POST | `/orgs/{org}/actions/oidc/customization/properties/repo` | Organization に inclusion を追加（201） |
| DELETE | `/orgs/{org}/actions/oidc/customization/properties/repo/{custom_property_name}` | Organization の inclusion を削除（204） |

## パラメータ

### subject claim PUT（ボディ）

| パラメータ | 対象 | 型 | 説明 |
|---|---|---|---|
| `include_claim_keys` | org / repo | array of strings | 一意な文字列の配列。各キーは英数字とアンダースコアのみ |
| `use_immutable_subject` | org / repo | boolean | true で、名前ベースではなくリポジトリ ID ベースの安定した `sub` claim 形式に opt-in |
| `use_default` | repo (必須) | boolean | true で既定テンプレートを使用（`include_claim_keys` は無視される） |

### custom property inclusion

| パラメータ | 型 | 説明 |
|---|---|---|
| `custom_property_name` | string (必須) | POST ボディ、または DELETE のパスに指定する、OIDC トークンに含める / から除く property 名 |

## レスポンス

- Organization テンプレート GET: `include_claim_keys`, `use_immutable_subject`
- リポジトリテンプレート GET: `use_default`, `include_claim_keys`, `use_immutable_subject`, `sub_claim_prefix`
- inclusion: `custom_property_name`, `inclusion_source`（`organization` / `enterprise`）

## 例

```curl
curl -L \
  -X PUT \
  https://api.github.com/orgs/ORG/actions/oidc/customization/sub \
  -d '{
  "include_claim_keys": [
    "repo",
    "context"
  ]
}'
```

```curl
curl -L \
  -X POST \
  https://api.github.com/orgs/ORG/actions/oidc/customization/properties/repo \
  -d '{
  "custom_property_name": "environment"
}'
```

## 注意事項

- 必要なスコープ: Organization の GET は `read:org`、subject claim PUT は `write:org`、custom property の POST / DELETE は `admin:org`、リポジトリは `repo`、Enterprise は `admin:enterprise`
- Enterprise のエンドポイントは OAuth app トークンまたは PAT (classic) 専用。"Enterprise administration" の fine-grained permission は利用不可
- custom property inclusion の POST は既に存在する場合 422、DELETE は存在しない場合 404
- リポジトリテンプレート PUT は `use_default` が必須
- 全エンドポイントは `X-GitHub-Api-Version: 2026-03-10` を使用（原文記載）

## Related

- [README.md](./README.md)
