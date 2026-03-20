# リポジトリ API リファレンス

リポジトリに関連するREST APIエンドポイントのセクション一覧。

## セクション一覧

| ファイル | 説明 | 主なエンドポイント |
|---------|------|------------------|
| [repos.md](./repos.md) | リポジトリの作成・取得・更新・削除 | `GET /user/repos`, `POST /orgs/{org}/repos`, `PATCH /repos/{owner}/{repo}` |
| [contents.md](./contents.md) | ファイルコンテンツの取得・作成・更新・削除 | `GET /repos/{owner}/{repo}/contents/{path}`, `PUT contents` |
| [branches.md](./branches.md) | ブランチ管理とブランチ保護ルール | `GET /repos/{owner}/{repo}/branches`, `PUT protection` |
| [commits.md](./commits.md) | コミット一覧・詳細・比較・ステータス | `GET /repos/{owner}/{repo}/commits`, `GET compare` |
| [tags.md](./tags.md) | タグの一覧取得とタグ保護 | `GET /repos/{owner}/{repo}/tags` |
| [releases.md](./releases.md) | リリースとリリースアセットの管理 | `POST /repos/{owner}/{repo}/releases`, `GET latest` |
| [collaborators.md](./collaborators.md) | コラボレーターの管理と権限レベル | `GET /repos/{owner}/{repo}/collaborators`, `PUT add` |
| [webhooks.md](./webhooks.md) | リポジトリWebhookの作成・管理・配信 | `POST /repos/{owner}/{repo}/hooks`, `GET deliveries` |
| [deploy-keys.md](./deploy-keys.md) | デプロイキーの管理 | `GET /repos/{owner}/{repo}/keys`, `POST create` |

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| リポジトリの読み取り | `metadata: read` |
| リポジトリの作成・更新 | `administration: write` |
| コンテンツの読み書き | `contents: read/write` |
| ブランチ保護の管理 | `administration: write` |
| コミットステータスの管理 | `statuses: read/write` |
| リリースの管理 | `contents: write` |
| コラボレーターの管理 | `administration: write` |
| Webhook の管理 | `repository_hooks: read/write` |
| デプロイキーの管理 | `administration: write` |
