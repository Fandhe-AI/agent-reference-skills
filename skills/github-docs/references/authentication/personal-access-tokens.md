# パーソナルアクセストークン (Personal Access Tokens)

パーソナルアクセストークン（PAT）は、GitHub API や HTTPS 経由の Git 操作で認証するために使用するトークンです。GitHub は 2 種類の PAT を提供しています。

## Fine-grained PAT vs Classic PAT

| 特徴 | Fine-grained PAT（推奨） | Classic PAT |
|------|--------------------------|-------------|
| リポジトリスコープ | 特定のリポジトリに制限可能 | アカウント内のすべてのリポジトリ |
| 権限の粒度 | 細かいパーミッション単位 | スコープ単位（粗い） |
| 組織の承認 | 組織の承認が必要な場合あり | 不要 |
| 有効期限 | 必須（最大 366 日、または無期限） | 任意（設定推奨） |
| セキュリティ | より安全 | やや低い |
| 対象 | 単一ユーザーまたは組織 | アカウント全体 |

### Fine-grained PAT の制限事項

Fine-grained PAT では以下の操作がサポートされていません:

- メンバーでない公開リポジトリへのアクセス
- 外部コラボレーターとしてのアクセス
- 複数組織への同時アクセス
- GitHub Packages へのアクセス
- Checks API の呼び出し
- ユーザーアカウント所有の Projects へのアクセス

> ユーザーあたり最大 50 個の Fine-grained PAT を作成可能です。それ以上必要な場合は GitHub App の利用を検討してください。

## トークンの作成

### Fine-grained PAT

1. メールアドレスを確認済みであることを確認
2. **Settings** > **Developer settings** > **Fine-grained tokens** に移動
3. **Generate new token** をクリック
4. 以下を設定:
   - **トークン名**: 用途がわかる名前
   - **有効期限**: 最短 1 日〜最長 366 日、または無期限
   - **説明**: トークンの目的
   - **リソースオーナー**: ユーザーまたは組織
   - **リポジトリアクセス**: 全リポジトリ、選択したリポジトリ、またはパブリックのみ
   - **パーミッション**: 必要最小限の権限を選択
5. **Generate token** をクリックし、トークンを安全に保存

### Classic PAT

1. **Settings** > **Developer settings** > **Tokens (classic)** に移動
2. **Generate new token (classic)** をクリック
3. 以下を設定:
   - **Note**: 用途の説明
   - **Expiration**: 有効期限
   - **Scopes**: 必要なスコープを選択
4. **Generate token** をクリック

## パーミッション（Fine-grained PAT）

### リポジトリパーミッション

主要なパーミッション:

| パーミッション | 説明 |
|--------------|------|
| `actions` | GitHub Actions ワークフローの管理 |
| `contents` | リポジトリのコンテンツ（ファイル、コミット） |
| `issues` | Issue の管理 |
| `pull_requests` | Pull Request の管理 |
| `metadata` | リポジトリのメタデータ（読み取り専用） |
| `administration` | リポジトリの管理設定 |
| `deployments` | デプロイメントの管理 |
| `environments` | 環境の管理 |
| `pages` | GitHub Pages の管理 |
| `secrets` | シークレットの管理 |
| `webhooks` | Webhook の管理 |
| `workflows` | ワークフローファイルの更新 |

### 組織パーミッション

`administration`, `members`, `projects`, `secrets`, `self_hosted_runners`, `variables`, `webhooks` など

### アカウントパーミッション

`emails`, `followers`, `gpg_keys`, `keys`, `profile`, `starring` など

## スコープ（Classic PAT）

主要なスコープ:

| スコープ | 説明 |
|---------|------|
| `repo` | プライベートリポジトリへのフルアクセス |
| `repo:status` | コミットステータスの読み書き |
| `public_repo` | パブリックリポジトリへのアクセス |
| `admin:org` | 組織とチームの管理 |
| `write:org` | 組織メンバーシップの読み書き |
| `admin:repo_hook` | リポジトリフックの管理 |
| `workflow` | GitHub Actions ワークフローの更新 |
| `delete_repo` | リポジトリの削除 |
| `gist` | Gist の作成 |
| `read:packages` / `write:packages` | GitHub Packages の読み書き |

## 有効期限ポリシー

- **Fine-grained PAT**: 作成時に有効期限の設定が必須（1〜366 日、または無期限）
- **Classic PAT**: 有効期限の設定を強く推奨。1 年間未使用のトークンは自動的に削除される
- **組織ポリシー**: 組織は PAT の最大有効期間を制限するポリシーを設定可能

## トークンの取り消し

**Settings** > **Developer settings** > **Personal access tokens** から、不要なトークンを即座に削除できます。

## コマンドラインでの使用

HTTPS 経由の Git 操作でパスワードの代わりに PAT を使用します:

```bash
git clone https://github.com/USERNAME/REPO.git
# Username: YOUR-USERNAME
# Password: YOUR-PERSONAL-ACCESS-TOKEN
```

毎回の入力を避けるには、Git Credential Manager の利用を推奨します。

## セキュリティ推奨事項

1. **最小権限の原則**: 必要最小限のスコープ・パーミッションのみ付与する
2. **有効期限の設定**: すべてのトークンに有効期限を設定する
3. **Fine-grained PAT の優先使用**: 可能な限り Fine-grained PAT を使用する
4. **安全な保管**: トークンをリポジトリにコミットしない
5. **GitHub Actions では `GITHUB_TOKEN` を使用**: ワークフロー内では組み込みトークンを優先する
6. **定期的な棚卸し**: 不要なトークンは速やかに削除する
7. **シークレット管理**: GitHub Actions secrets や Codespaces secrets に保存する

## 代替手段

| ユースケース | 推奨方法 |
|------------|---------|
| コマンドラインの Git 操作 | GitHub CLI (`gh`) / Git Credential Manager |
| GitHub Actions ワークフロー | 組み込みの `GITHUB_TOKEN` |
| アプリケーション統合 | GitHub App |

## 参考リンク

- [Managing your personal access tokens - GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
