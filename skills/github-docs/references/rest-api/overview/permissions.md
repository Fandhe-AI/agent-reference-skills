# 権限（Permissions）

Fine-grained PAT と GitHub Apps に適用される権限スコープの概要。

## 権限カテゴリ

権限は3つのカテゴリに分類される。

| カテゴリ | 説明 | 対象 |
|---------|------|------|
| **Repository permissions** | リポジトリリソースへのアクセス権限 | コード、Issue、PR、Actions 等 |
| **Organization permissions** | Organization リソースへのアクセス権限 | メンバー、チーム、プロジェクト等 |
| **User permissions** | ユーザーリソースへのアクセス権限（PAT のみ） | プロフィール、メール、SSH鍵等 |

## アクセスレベル

各権限スコープに対して設定可能なアクセスレベル:

| レベル | 説明 |
|--------|------|
| **No access** | アクセスなし（デフォルト） |
| **Read** | 読み取り専用アクセス |
| **Write** | 読み取り + 書き込みアクセス |
| **Admin** | 読み取り + 書き込み + 管理操作（一部の権限スコープのみ） |

> **注意**: `Write` には `Read` が含まれ、`Admin` には `Write` と `Read` が含まれる。

## Repository Permissions（リポジトリ権限）

| 権限スコープ | 説明 | 対応するAPIリソース |
|-------------|------|-------------------|
| `actions` | GitHub Actions の管理 | ワークフロー、実行、アーティファクト |
| `administration` | リポジトリの管理設定 | リポジトリ設定、ブランチ保護、コラボレーター |
| `checks` | チェックランとスイートの管理 | チェックAPI |
| `code_scanning` | Code scanning アラートの管理 | Code scanning API |
| `codespaces` | Codespaces の管理 | Codespaces API |
| `contents` | リポジトリコンテンツの読み書き | ファイル、コミット、ブランチ、タグ、リリース |
| `dependabot_secrets` | Dependabot シークレットの管理 | Dependabot secrets API |
| `deployments` | デプロイメントの管理 | デプロイメント、環境API |
| `environments` | 環境の管理 | 環境API |
| `issues` | Issue の管理 | Issue、ラベル、マイルストーン、アサイニー |
| `merge_queues` | マージキューの管理 | マージキューAPI |
| `metadata` | リポジトリメタデータの読み取り | 基本的なリポジトリ情報（自動付与） |
| `packages` | パッケージの管理 | パッケージAPI |
| `pages` | GitHub Pages の管理 | Pages API |
| `pull_requests` | プルリクエストの管理 | PR、レビュー、コメント |
| `repository_hooks` | Webhook の管理 | リポジトリWebhook API |
| `secret_scanning` | Secret scanning アラートの管理 | Secret scanning API |
| `secrets` | Actions シークレットの管理 | Actions secrets API |
| `security_events` | セキュリティイベントの管理 | セキュリティアドバイザリ |
| `single_file` | 特定ファイルへのアクセス | 指定パスのファイルのみ |
| `statuses` | コミットステータスの管理 | コミットステータスAPI |
| `vulnerability_alerts` | 脆弱性アラートの管理 | Dependabot alerts API |
| `workflows` | ワークフローファイルの更新 | `.github/workflows` 内のファイル |

## Organization Permissions（Organization 権限）

| 権限スコープ | 説明 | 対応するAPIリソース |
|-------------|------|-------------------|
| `administration` | Organization の管理 | Organization 設定、Webhook |
| `blocking` | ユーザーブロックの管理 | ユーザーブロックAPI |
| `custom_organization_roles` | カスタムロールの管理 | カスタムロールAPI |
| `custom_properties` | カスタムプロパティの管理 | カスタムプロパティAPI |
| `custom_repository_roles` | カスタムリポジトリロールの管理 | カスタムリポジトリロールAPI |
| `events` | Organization イベントの読み取り | イベントAPI |
| `members` | メンバーの管理 | メンバー、招待API |
| `organization_hooks` | Organization Webhook の管理 | Organization Webhook API |
| `plan` | Organization プランの読み取り | プラン情報 |
| `projects` | Organization プロジェクトの管理 | Projects API |
| `secrets` | Organization シークレットの管理 | Organization secrets API |
| `self_hosted_runners` | セルフホストランナーの管理 | ランナーAPI |
| `team_discussions` | チームディスカッションの管理 | チームディスカッションAPI |

## User Permissions（ユーザー権限、PAT のみ）

| 権限スコープ | 説明 | 対応するAPIリソース |
|-------------|------|-------------------|
| `block` | ユーザーブロックの管理 | ユーザーブロックAPI |
| `codespaces` | ユーザーの Codespaces 管理 | Codespaces API |
| `email` | メールアドレスの管理 | メールAPI |
| `followers` | フォロー関係の管理 | フォロワーAPI |
| `gpg_keys` | GPG鍵の管理 | GPG鍵API |
| `gists` | Gist の管理 | Gist API |
| `keys` | SSH鍵の管理 | SSH鍵API |
| `plan` | プラン情報の読み取り | プラン情報 |
| `profile` | プロフィールの管理 | ユーザープロフィールAPI |
| `signing_keys` | 署名鍵の管理 | 署名鍵API |
| `starring` | スター付けの管理 | スターAPI |
| `watching` | ウォッチの管理 | サブスクリプションAPI |

## 権限の確認

### トークンの権限を確認

APIレスポンスのヘッダーで確認可能:

```
X-OAuth-Scopes: repo, user         # Classic PAT のスコープ
X-Accepted-OAuth-Scopes: repo      # エンドポイントが要求するスコープ
```

### GitHub App の権限確認

```bash
# インストールされたアプリの権限を確認
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/app/installations/{installation_id}
```

## 注意事項

- `metadata` 権限は、Fine-grained PAT や GitHub App でリポジトリを選択した場合に自動的に付与される（読み取りのみ）
- 権限不足の場合、`403 Forbidden` または `404 Not Found` が返される
- Organization はFine-grained PAT の利用をポリシーで制限・許可できる
