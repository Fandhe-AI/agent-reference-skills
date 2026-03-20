# パーミッションとイベント

## 権限の種類

GitHub App の権限は 3 つのカテゴリに分類される。各権限には **No access**、**Read-only**、**Read & write** のアクセスレベルを設定できる。

## リポジトリ権限

| 権限 | 説明 |
|------|------|
| **Actions** | GitHub Actions のワークフロー、ラン、アーティファクト |
| **Administration** | リポジトリの管理操作（設定、チーム、コラボレーター） |
| **Checks** | チェックラン、チェックスイート |
| **Code scanning alerts** | コードスキャンアラートの表示・管理 |
| **Codespaces** | Codespaces の作成・管理 |
| **Codespaces lifecycle admin** | Codespaces のライフサイクル管理 |
| **Codespaces metadata** | Codespaces のメタデータアクセス |
| **Codespaces secrets** | Codespaces シークレットの管理 |
| **Commit statuses** | コミットステータスの作成・更新 |
| **Contents** | リポジトリのコンテンツ（ファイル、コミット、ブランチ、タグ） |
| **Dependabot alerts** | Dependabot アラートの表示・管理 |
| **Dependabot secrets** | Dependabot シークレットの管理 |
| **Deployments** | デプロイメントの作成・管理 |
| **Discussions** | ディスカッションの管理 |
| **Environments** | デプロイメント環境の管理 |
| **Issues** | Issue の作成・編集・ラベル付け |
| **Merge queues** | マージキューの管理 |
| **Metadata** | リポジトリのメタデータ（常に Read-only で付与） |
| **Packages** | GitHub Packages の公開・管理 |
| **Pages** | GitHub Pages の管理 |
| **Projects** | プロジェクト（クラシック）の管理 |
| **Pull requests** | プルリクエストの作成・レビュー・マージ |
| **Repository custom properties** | カスタムプロパティの管理 |
| **Repository hooks** | リポジトリ Webhook の管理 |
| **Repository security advisories** | セキュリティアドバイザリの管理 |
| **Secret scanning alerts** | シークレットスキャンアラートの管理 |
| **Secrets** | Actions シークレットの管理 |
| **Variables** | Actions 変数の管理 |
| **Workflows** | ワークフローファイルの更新 |

## Organization 権限

| 権限 | 説明 |
|------|------|
| **Administration** | Organization の管理操作 |
| **Blocking users** | ユーザーのブロック管理 |
| **Custom organization roles** | カスタム Organization ロールの管理 |
| **Custom properties** | Organization カスタムプロパティの管理 |
| **Events** | Organization イベントの読み取り |
| **GitHub Copilot Business** | Copilot Business の管理 |
| **Members** | Organization メンバーの管理 |
| **Organization codespaces** | Organization Codespaces の管理 |
| **Organization codespaces secrets** | Organization Codespaces シークレットの管理 |
| **Organization codespaces settings** | Organization Codespaces 設定の管理 |
| **Organization dependabot secrets** | Organization Dependabot シークレットの管理 |
| **Plan** | Organization プランの読み取り |
| **Projects** | Organization プロジェクト（v2）の管理 |
| **Secrets** | Organization Actions シークレットの管理 |
| **Self-hosted runners** | セルフホステッドランナーの管理 |
| **Team discussions** | チームディスカッションの管理 |
| **Variables** | Organization Actions 変数の管理 |
| **Webhooks** | Organization Webhook の管理 |

## ユーザー権限

| 権限 | 説明 |
|------|------|
| **Block another user** | ユーザーのブロック |
| **Codespaces user secrets** | Codespaces ユーザーシークレット |
| **Email addresses** | メールアドレスの読み取り |
| **Followers** | フォロワー/フォロー中の管理 |
| **GPG keys** | GPG キーの管理 |
| **Gists** | Gist の作成・管理 |
| **Git SSH keys** | SSH キーの管理 |
| **Interaction limits** | インタラクション制限の管理 |
| **Plan** | ユーザープランの読み取り |
| **Profile** | プロフィールの管理 |
| **SSH signing keys** | SSH 署名キーの管理 |
| **Starring** | スター付きリポジトリの管理 |
| **Watching** | ウォッチ中のリポジトリの管理 |

## 権限とイベントの関係

特定の Webhook イベントをサブスクライブするには、対応する権限が必要。

| イベント例 | 必要な権限 |
|-----------|-----------|
| `push` | Contents (read) |
| `pull_request` | Pull requests (read) |
| `issues` | Issues (read) |
| `check_run` | Checks (read) |
| `deployment` | Deployments (read) |
| `workflow_run` | Actions (read) |
| `member` | Members (read) |
| `release` | Contents (read) |

## 最小権限の原則

- App に必要な**最小限の権限**のみを要求する
- 不要な権限を要求すると、ユーザーのインストール意欲が低下する
- 権限は後から追加できるが、既存のインストールでは再承認が必要

## 公式ドキュメント

- [Choosing permissions for a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app)
