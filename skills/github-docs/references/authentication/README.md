# GitHub 認証 (Authentication)

GitHub で利用可能な認証方法の一覧です。用途やセキュリティ要件に応じて適切な方法を選択してください。

## 目次

| ファイル | 説明 | 主な用途 |
|---------|------|---------|
| [ssh-keys.md](./ssh-keys.md) | SSH キー | Git 操作の認証（push/pull/clone） |
| [personal-access-tokens.md](./personal-access-tokens.md) | パーソナルアクセストークン (PAT) | API アクセス、HTTPS 経由の Git 操作 |
| [two-factor-auth.md](./two-factor-auth.md) | 二要素認証 (2FA) | アカウントセキュリティの強化 |
| [saml-sso.md](./saml-sso.md) | SAML シングルサインオン | 組織レベルの認証管理 |
| [deploy-keys.md](./deploy-keys.md) | デプロイキー | 単一リポジトリへの自動化アクセス |

## 認証方法の比較

| 方法 | スコープ | 用途 | セキュリティレベル |
|------|---------|------|------------------|
| SSH キー | アカウント全体 | Git 操作 | 高 |
| Fine-grained PAT | リポジトリ単位 | API / Git 操作 | 最高 |
| Classic PAT | アカウント全体 | API / Git 操作 | 中 |
| デプロイキー | 単一リポジトリ | CI/CD、自動化 | 高 |
| SAML SSO | 組織単位 | 企業向け統合認証 | 最高 |

## 参考リンク

- [GitHub 認証ドキュメント](https://docs.github.com/en/authentication)
