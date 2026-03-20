# GitHub REST API リファレンス

GitHub REST API の包括的なリファレンスガイド。

## セクション一覧

| セクション | ファイル | 説明 |
|-----------|---------|------|
| [概要](./overview/) | [about.md](./overview/about.md) | REST API の基本概要、ベースURL、HTTPメソッド、ヘッダー、パラメータ |
| | [authentication.md](./overview/authentication.md) | 認証方法（PAT、GitHub App、OAuth等） |
| | [rate-limits.md](./overview/rate-limits.md) | レート制限（プライマリ・セカンダリ）とヘッダー |
| | [pagination.md](./overview/pagination.md) | ページネーションのパラメータとlinkヘッダー |
| | [api-versions.md](./overview/api-versions.md) | APIバージョン管理とサポートポリシー |
| | [permissions.md](./overview/permissions.md) | Fine-grained PAT と GitHub Apps の権限スコープ |
| | [best-practices.md](./overview/best-practices.md) | ベストプラクティスとアンチパターン |
| | [troubleshooting.md](./overview/troubleshooting.md) | よくあるエラーとデバッグ手順 |
| [リポジトリ](./repos/) | [repos.md](./repos/repos.md) | リポジトリの作成・取得・更新・削除 |
| | [contents.md](./repos/contents.md) | ファイルコンテンツの取得・作成・更新・削除 |
| | [branches.md](./repos/branches.md) | ブランチ管理とブランチ保護ルール |
| | [commits.md](./repos/commits.md) | コミット一覧・詳細・比較・ステータス |
| | [tags.md](./repos/tags.md) | タグの一覧取得とタグ保護 |
| | [releases.md](./repos/releases.md) | リリースとリリースアセットの管理 |
| | [collaborators.md](./repos/collaborators.md) | コラボレーターの管理と権限レベル |
| | [webhooks.md](./repos/webhooks.md) | リポジトリWebhookの作成・管理・配信 |
| | [deploy-keys.md](./repos/deploy-keys.md) | デプロイキーの管理 |
| [Issues](./issues/) | - | Issue の作成・管理・ラベル・マイルストーン |
| [Pull Requests](./pulls/) | - | プルリクエストの作成・レビュー・マージ |
| [Actions](./actions/) | - | GitHub Actions ワークフロー・実行・アーティファクト |
| [Git](./git/) | - | Git データ（blob、tree、commit、ref、tag） |
| [ユーザー](./users/) | - | ユーザー情報・SSH鍵・GPG鍵 |
| [Organization](./orgs/) | - | Organization の管理・メンバー・チーム |
| [検索](./search/) | - | コード・リポジトリ・Issue・ユーザーの検索 |
| [Checks](./checks/) | - | チェックラン・チェックスイートの管理 |
| [デプロイメント](./deployments/) | - | デプロイメントとデプロイメントステータス |
| [Gists](./gists/) | - | Gist の作成・管理・コメント |
| [Packages](./packages/) | - | GitHub Packages の管理 |
| [Pages](./pages/) | - | GitHub Pages の設定・ビルド |
