# Environments API

リポジトリのデプロイ環境を設定・管理するAPI。環境には保護ルール、レビュアー、ブランチポリシーなどを設定できる。

## エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/repos/{owner}/{repo}/environments` | 環境一覧を取得 |
| GET | `/repos/{owner}/{repo}/environments/{environment_name}` | 環境を取得 |
| PUT | `/repos/{owner}/{repo}/environments/{environment_name}` | 環境を作成・更新 |
| DELETE | `/repos/{owner}/{repo}/environments/{environment_name}` | 環境を削除 |

## 環境の作成・更新

```
PUT /repos/{owner}/{repo}/environments/{environment_name}
```

環境が存在しない場合は作成、存在する場合は更新する。

### リクエストボディ

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| wait_timer | integer | デプロイ前の待機時間（分）。0〜43200（30日）|
| prevent_self_review | boolean | デプロイをトリガーしたユーザーが自身でレビュー承認するのを防止 |
| reviewers | object[] | 必要なレビュアー（最大6名） |
| deployment_branch_policy | object | デプロイ可能なブランチポリシー |

### reviewers

```json
{
  "reviewers": [
    {
      "type": "User",
      "id": 1
    },
    {
      "type": "Team",
      "id": 2
    }
  ]
}
```

- **最大6名**のユーザーまたはチームを指定可能
- `type` は `User` または `Team`
- `id` は対応するユーザーIDまたはチームID

### deployment_branch_policy

| フィールド | 型 | 説明 |
|-----------|-----|------|
| protected_branches | boolean | 保護ブランチのみにデプロイを制限 |
| custom_branch_policies | boolean | カスタムブランチポリシーを使用 |

**重要**: `protected_branches` と `custom_branch_policies` は**排他的（XOR）**の関係にある。

| protected_branches | custom_branch_policies | 動作 |
|-------------------|----------------------|------|
| `true` | `false` | 保護ブランチからのみデプロイ可能 |
| `false` | `true` | カスタム定義のブランチパターンからのみデプロイ可能 |
| `false` | `false` | すべてのブランチからデプロイ可能 |

`custom_branch_policies: true` の場合、別途ブランチポリシーのエンドポイントで対象ブランチパターンを設定する必要がある。

### レスポンス例

```json
{
  "id": 1,
  "node_id": "MDExOkVudmly...",
  "name": "production",
  "url": "https://api.github.com/repos/octocat/Hello-World/environments/production",
  "html_url": "https://github.com/octocat/Hello-World/deployments/activity_log?environments_filter=production",
  "protection_rules": [
    {
      "id": 1,
      "type": "wait_timer",
      "wait_timer": 30
    },
    {
      "id": 2,
      "type": "required_reviewers",
      "reviewers": [
        {
          "type": "User",
          "reviewer": {
            "login": "octocat",
            "id": 1
          }
        }
      ]
    }
  ],
  "deployment_branch_policy": {
    "protected_branches": true,
    "custom_branch_policies": false
  }
}
```

## 環境の削除

```
DELETE /repos/{owner}/{repo}/environments/{environment_name}
```

204 No Contentを返す。環境に関連するすべての保護ルールとデプロイブランチポリシーも削除される。
