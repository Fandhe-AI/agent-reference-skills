# OAuth Apps との比較

## 推奨事項

GitHub は新規開発では **GitHub Apps** の使用を推奨している。GitHub Apps は細粒度の権限、リポジトリレベルのアクセス制御、短命トークンによる高いセキュリティを提供する。

## 主要な違い

### 認証とトークン

| 側面 | GitHub Apps | OAuth Apps |
|------|-------------|------------|
| **トークンの有効期間** | 1 時間で失効（IAT） | 取り消されるまで有効 |
| **認証方式** | 秘密鍵 + JWT | リクエストトークン → アクセストークン（Web リダイレクト） |
| **ユーザー識別** | Bot として識別（例: `@app-name[bot]`） | 認証ユーザーとして識別（例: `@octocat`） |
| **独立動作** | ユーザーなしで動作可能 | ユーザーコンテキストが必要 |

### 権限モデル

| 側面 | GitHub Apps | OAuth Apps |
|------|-------------|------------|
| **粒度** | 細粒度（リソースごとに read/write） | ブロードなスコープ |
| **リポジトリアクセス** | ユーザーが選択したリポジトリのみ | ユーザーのアクセス可能な全リソース |
| **権限の分離** | Issues のみのアクセスが可能（コードなし） | `repo` スコープでコード・Issue・PR すべてにアクセス |
| **最小権限** | 容易に実現 | スコープが広いため困難 |

### インストールとアクセス制御

| 側面 | GitHub Apps | OAuth Apps |
|------|-------------|------------|
| **インストール者** | Organization Owner またはリポジトリ Admin | ユーザーが認証; Org Owner がポリシー管理 |
| **承認フロー** | App 作成者が権限を設定; Org Owner が承認 | ユーザーが直接認証 |
| **取り消し** | アンインストールで全アクセス即時無効 | トークン削除; Webhook は手動削除が必要 |
| **リポジトリ追加/削除** | Admin が即座に管理可能 | ユーザーの権限変更に依存 |

### Webhook

| 側面 | GitHub Apps | OAuth Apps |
|------|-------------|------------|
| **Webhook 管理** | 組み込み、自動設定 | リポジトリ/Org ごとに個別設定 |
| **アンインストール時** | 自動的に無効化 | トークン削除後も Webhook は残る（手動削除が必要） |

### レート制限

| 側面 | GitHub Apps | OAuth Apps |
|------|-------------|------------|
| **スケーリング** | リポジトリ数・Org ユーザー数に応じて増加 | 固定 5,000 リクエスト/時間/ユーザー |
| **制限の増加** | App またはインストール単位で申請可能 | 全トークンに一律適用 |

### Git アクセス

| 側面 | GitHub Apps | OAuth Apps |
|------|-------------|------------|
| **HTTP 認証** | インストールトークンをパスワードとして使用 | トークンをユーザー名として使用 |
| **デプロイキー** | - | API 経由で設定可能 |

### Bot / マシンアカウント

| 側面 | GitHub Apps | OAuth Apps |
|------|-------------|------------|
| **Bot アカウント** | 組み込み Bot（Enterprise シートを消費しない） | マシンユーザーアカウント（シートを消費） |
| **パスワードログイン** | 不可 | 資格情報の管理が必要 |

## Enterprise での例外

OAuth App は Enterprise レベルのリソースアクセスに適している場合がある。GitHub App にはまだ Enterprise レベルの権限が付与できないため、Enterprise 管理操作には OAuth App が必要な場合がある。

## 移行パス: OAuth App から GitHub App へ

### 移行の推奨理由

- セキュリティの向上（短命トークン、細粒度権限）
- ユーザー体験の向上（リポジトリ選択、透明な権限）
- スケーラビリティの向上（レート制限の柔軟性）

### 移行手順の概要

1. **権限のマッピング**: OAuth スコープを GitHub App の細粒度権限に対応付ける
2. **認証フローの更新**: OAuth フローを GitHub App の認証方式に変更
3. **API 呼び出しの更新**: トークンの取得・使用方法を変更
4. **Webhook の移行**: リポジトリ/Org Webhook から App Webhook に移行
5. **テストと検証**: 全機能が正常に動作することを確認
6. **ユーザーへの通知**: 既存ユーザーに移行を案内

### 主要なスコープ対応表

| OAuth スコープ | GitHub App 権限 |
|---------------|----------------|
| `repo` | Contents (read/write), Issues (read/write), Pull requests (read/write) |
| `repo:status` | Commit statuses (read/write) |
| `public_repo` | Contents (read) ※パブリックリポジトリのみ |
| `admin:repo_hook` | Repository hooks (read/write) |
| `admin:org` | Organization administration (read/write) |
| `admin:org_hook` | Organization webhooks (read/write) |
| `user` | Email addresses (read), Profile (read/write) |
| `read:user` | Email addresses (read), Profile (read) |
| `delete_repo` | Administration (write) |
| `workflow` | Workflows (write) |

## 公式ドキュメント

- [Differences between GitHub Apps and OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps)
- [Migrating OAuth apps to GitHub Apps](https://docs.github.com/en/apps/creating-github-apps/guides/migrating-oauth-apps-to-github-apps)
