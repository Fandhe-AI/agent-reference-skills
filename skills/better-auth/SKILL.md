---
name: better-auth
description: >
  Better Auth (TypeScript 認証フレームワーク) API リファレンス。
  betterAuth, createAuthClient, signUp, signIn, session,
  OAuth, passkey, twoFactor, プラグイン, 認証, 認可
user-invocable: false
---

# Better Auth API リファレンス

Better Auth — TypeScript 向けフレームワーク非依存の認証・認可フレームワーク。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/better-auth/
├── SKILL.md                                ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md           ← インストール・基本設定（2ページ）
    ├── concepts/README.md                  ← コア概念（14ページ）
    ├── adapters/README.md                  ← DB アダプター（8ページ）
    ├── authentication/README.md            ← 認証方式（39ページ）
    ├── plugins/README.md                   ← プラグイン（32ページ）
    ├── reference/README.md                 ← 設定・セキュリティ・エラー（17ページ）
    └── guides/README.md                    ← ガイド（4ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、環境変数、auth インスタンス作成 | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| auth.api、クライアント、セッション、Cookie、DB、フック、OAuth、レートリミット、型安全性 | concepts | [references/concepts/README.md](./references/concepts/README.md) |
| Prisma、Drizzle、MongoDB、SQLite、PostgreSQL、MySQL 等 | adapters | [references/adapters/README.md](./references/adapters/README.md) |
| Email/Password、Google、GitHub、Apple 等のソーシャルログイン | authentication | [references/authentication/README.md](./references/authentication/README.md) |
| 2FA、Organization、Admin、Passkey、Magic Link、API Key 等 | plugins | [references/plugins/README.md](./references/plugins/README.md) |
| 設定オプション一覧、セキュリティ、FAQ、エラーコード | reference | [references/reference/README.md](./references/reference/README.md) |
| プラグイン作成、パフォーマンス最適化、DB アダプター作成 | guides | [references/guides/README.md](./references/guides/README.md) |
