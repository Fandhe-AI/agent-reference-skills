# Webhook イベントとペイロード

## 配信ヘッダー

すべての Webhook 配信には以下の HTTP ヘッダーが含まれる。

| ヘッダー | 説明 |
|---------|------|
| `X-GitHub-Event` | イベントの名前（例: `push`, `pull_request`） |
| `X-GitHub-Delivery` | 配信を一意に識別する GUID |
| `X-Hub-Signature-256` | HMAC-SHA256 署名（Secret 設定時のみ） |
| `X-Hub-Signature` | HMAC-SHA1 署名（非推奨、SHA-256 を使用すること） |
| `X-GitHub-Hook-ID` | Webhook の一意な識別子 |
| `X-GitHub-Hook-Installation-Target-Type` | Webhook が作成されたリソースの種類 |
| `X-GitHub-Hook-Installation-Target-ID` | Webhook リソースの一意な識別子 |
| `User-Agent` | 常に `GitHub-Hookshot/` プレフィックスが付く |

## 共通ペイロードプロパティ

すべてのイベントペイロードに含まれる標準プロパティ。

| プロパティ | 型 | 説明 |
|-----------|------|------|
| `action` | string | イベントのアクション種別（例: `opened`, `closed`, `created`） |
| `sender` | object | イベントをトリガーした GitHub ユーザー |
| `repository` | object | イベントが発生したリポジトリ（リポジトリイベントの場合） |
| `organization` | object | Organization コンテキスト（org/enterprise Webhook の場合） |
| `installation` | object | GitHub App のインストール情報（App Webhook の場合） |
| `enterprise` | object | Enterprise コンテキスト（Enterprise Webhook の場合） |

## 制約事項

- **ペイロードサイズ上限**: 25 MB
- **一括操作の制限**: 3 つ以上のタグ/ブランチが一括操作された場合、個別イベントは生成されない
- **配信形式**: `application/json` または `application/x-www-form-urlencoded`

## イベント一覧

### リポジトリ関連

| イベント | 説明 |
|---------|------|
| `create` | Git ブランチまたはタグが作成された |
| `delete` | Git ブランチまたはタグが削除された |
| `fork` | リポジトリがフォークされた |
| `push` | コミットがブランチにプッシュされた |
| `repository` | リポジトリの作成・アーカイブ・設定変更 |
| `repository_dispatch` | カスタムリポジトリディスパッチイベント |
| `repository_import` | リポジトリのインポート完了 |
| `repository_ruleset` | リポジトリルールセットの作成・編集 |
| `public` | リポジトリがパブリックに変更された |
| `star` | リポジトリのスター追加/削除 |
| `watch` | リポジトリのウォッチ/サブスクリプション |

### プルリクエスト関連

| イベント | 説明 |
|---------|------|
| `pull_request` | プルリクエストの作成・クローズ・マージなど |
| `pull_request_review` | プルリクエストレビューの送信・却下 |
| `pull_request_review_comment` | プルリクエストの差分に対するコメント |
| `pull_request_review_thread` | プルリクエストコメントスレッドの解決/未解決 |
| `merge_group` | マージキューのステータスチェック要求 |

### Issue 関連

| イベント | 説明 |
|---------|------|
| `issues` | Issue の作成・クローズ・ラベル付け等 |
| `issue_comment` | Issue またはプルリクエストへのコメント |
| `issue_dependencies` | Issue のブロック関係の変更 |
| `sub_issues` | サブ Issue 関係の変更 |
| `label` | ラベルの作成・削除・編集 |
| `milestone` | マイルストーンの作成・ステータス変更 |

### コミット・ブランチ関連

| イベント | 説明 |
|---------|------|
| `commit_comment` | コミットへのコメント |
| `status` | Git コミットステータスの変更 |
| `branch_protection_configuration` | ブランチ保護設定の変更 |
| `branch_protection_rule` | ブランチ保護ルールの作成・削除・編集 |

### CI/CD・チェック関連

| イベント | 説明 |
|---------|------|
| `check_run` | チェックランの完了・再リクエスト |
| `check_suite` | チェックスイートの完了ステータス |
| `workflow_dispatch` | GitHub Actions ワークフローの手動トリガー |
| `workflow_job` | ワークフロージョブのステータス変更 |
| `workflow_run` | ワークフローランの完了 |
| `deployment` | デプロイメントの作成 |
| `deployment_status` | デプロイメントステータスの変更 |
| `deployment_protection_rule` | デプロイメント保護ルールのリクエスト |
| `deployment_review` | デプロイメントレビューの承認・拒否 |

### セキュリティ関連

| イベント | 説明 |
|---------|------|
| `code_scanning_alert` | コードスキャンアラートの検出・クローズ・修正 |
| `dependabot_alert` | Dependabot セキュリティアラート |
| `secret_scanning_alert` | シークレット検出とアサイン |
| `secret_scanning_alert_location` | シークレット検出場所 |
| `secret_scanning_scan` | シークレットスキャンの完了 |
| `security_advisory` | グローバルセキュリティアドバイザリの更新 |
| `security_and_analysis` | コードセキュリティ機能の有効化 |
| `repository_advisory` | セキュリティアドバイザリの公開 |
| `repository_vulnerability_alert` | セキュリティ脆弱性の検出（非推奨） |

### Organization 関連

| イベント | 説明 |
|---------|------|
| `organization` | Organization のアクティビティ・メンバー変更 |
| `org_block` | Organization ユーザーのブロック/アンブロック |
| `member` | リポジトリコラボレーターの変更 |
| `membership` | チーム メンバーシップの変更 |
| `team` | チームの作成・リポジトリアクセス変更 |
| `team_add` | チームのリポジトリ追加 |

### GitHub App 関連

| イベント | 説明 |
|---------|------|
| `installation` | GitHub App のインストールアクティビティ |
| `installation_repositories` | App リポジトリアクセスの変更 |
| `installation_target` | インストール先アカウント名の変更 |
| `github_app_authorization` | GitHub App 認証の取り消し |

### プロジェクト関連

| イベント | 説明 |
|---------|------|
| `project` | プロジェクト（クラシック）のアクティビティ |
| `project_card` | プロジェクトカードの変換・移動 |
| `project_column` | プロジェクトカラムの作成・管理 |
| `projects_v2` | Organization プロジェクトの作成・ステータス変更 |
| `projects_v2_item` | プロジェクトアイテムのアーカイブ・編集 |
| `projects_v2_status_update` | プロジェクトステータス更新 |

### その他

| イベント | 説明 |
|---------|------|
| `discussion` | リポジトリディスカッションのアクティビティ |
| `discussion_comment` | ディスカッションへのコメント |
| `gollum` | Wiki ページの作成・更新 |
| `page_build` | GitHub Pages ビルドの試行 |
| `package` | GitHub Packages の公開・更新 |
| `registry_package` | パッケージレジストリの公開（非推奨） |
| `release` | リリースの作成・公開・削除 |
| `deploy_key` | デプロイキーの作成・削除 |
| `meta` | Webhook の削除・管理 |
| `ping` | Webhook 設定の確認 |
| `sponsorship` | GitHub Sponsors のアクティビティ |
| `marketplace_purchase` | GitHub Marketplace 購入アクティビティ |
| `custom_property` | リポジトリカスタムプロパティのアクティビティ |
| `custom_property_values` | カスタムプロパティ値の更新 |
| `personal_access_token_request` | Fine-grained PAT リクエストの承認/拒否 |

## 公式ドキュメント

- [Webhook events and payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads)
