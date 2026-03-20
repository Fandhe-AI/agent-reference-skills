---
name: github-docs
description: >
  GitHub 公式ドキュメント リファレンス。
  REST API, GraphQL, Actions, Webhooks, GitHub Apps, gh CLI,
  認証, workflow, pull requests, GITHUB_TOKEN
user-invocable: false
---

# GitHub Docs リファレンス

GitHub 公式ドキュメント (docs.github.com) の主要セクションを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/github-docs/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── rest-api/
    │   ├── README.md                     ← REST API 全体の目次
    │   ├── overview/                     ← 概要・認証・レート制限等（8ページ）
    │   ├── repos/                        ← リポジトリ API（10ページ）
    │   ├── issues/                       ← Issue API（6ページ）
    │   ├── pulls/                        ← PR API（5ページ）
    │   ├── actions/                      ← Actions API（8ページ）
    │   ├── git/                          ← Git データ API（6ページ）
    │   ├── users/                        ← ユーザー API（2ページ）
    │   ├── orgs/                         ← Organization API（2ページ）
    │   ├── search/                       ← 検索 API（2ページ）
    │   ├── checks/                       ← チェック API（3ページ）
    │   ├── deployments/                  ← デプロイ API（3ページ）
    │   ├── gists/                        ← Gist API（2ページ）
    │   ├── packages/                     ← パッケージ API（2ページ）
    │   └── pages/                        ← Pages API（2ページ）
    ├── actions/
    │   ├── README.md                     ← Actions 全体の目次
    │   ├── workflow-syntax.md            ← ワークフロー YAML 構文
    │   ├── events-triggers.md            ← イベントとトリガー
    │   ├── contexts.md                   ← コンテキスト
    │   ├── expressions.md               ← 式と関数
    │   ├── environment-variables.md      ← 環境変数
    │   ├── permissions.md                ← GITHUB_TOKEN パーミッション
    │   ├── runners.md                    ← ランナー
    │   ├── caching.md                    ← キャッシュ
    │   ├── artifacts.md                  ← アーティファクト
    │   ├── secrets.md                    ← シークレット管理
    │   ├── reusable-workflows.md         ← 再利用可能ワークフロー
    │   ├── composite-actions.md          ← 複合アクション
    │   └── creating-actions/             ← カスタムアクション作成（4ページ）
    ├── webhooks/
    │   ├── README.md                     ← Webhook 全体の目次（6ページ）
    │   └── ...
    ├── graphql/
    │   ├── README.md                     ← GraphQL API 全体の目次（7ページ）
    │   └── ...
    ├── apps/
    │   ├── README.md                     ← GitHub Apps 全体の目次（8ページ）
    │   └── ...
    ├── cli/
    │   ├── README.md                     ← GitHub CLI 全体の目次（4ページ）
    │   └── ...
    ├── authentication/
    │   ├── README.md                     ← 認証全体の目次（6ページ）
    │   └── ...
    ├── repositories/
    │   ├── README.md                     ← リポジトリ管理の目次（7ページ）
    │   └── ...
    ├── pull-requests/
    │   ├── README.md                     ← PR ワークフローの目次（6ページ）
    │   └── ...
    └── pages/
        ├── README.md                     ← GitHub Pages の目次（4ページ）
        └── ...
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| REST API エンドポイント、認証、レート制限、ページネーション | rest-api | [references/rest-api/README.md](./references/rest-api/README.md) |
| ワークフロー構文、CI/CD、イベント・トリガー、シークレット | actions | [references/actions/README.md](./references/actions/README.md) |
| Webhook 作成、イベント・ペイロード、セキュリティ | webhooks | [references/webhooks/README.md](./references/webhooks/README.md) |
| GraphQL クエリ、ミューテーション、スキーマ | graphql | [references/graphql/README.md](./references/graphql/README.md) |
| GitHub App 作成、認証、インストール、OAuth | apps | [references/apps/README.md](./references/apps/README.md) |
| gh コマンド、CLI 拡張機能 | cli | [references/cli/README.md](./references/cli/README.md) |
| SSH キー、PAT、2FA、SAML SSO | authentication | [references/authentication/README.md](./references/authentication/README.md) |
| リポジトリ作成・設定、ブランチ保護、CODEOWNERS | repositories | [references/repositories/README.md](./references/repositories/README.md) |
| PR 作成・レビュー・マージ、コンフリクト解決 | pull-requests | [references/pull-requests/README.md](./references/pull-requests/README.md) |
| GitHub Pages 作成、カスタムドメイン設定 | pages | [references/pages/README.md](./references/pages/README.md) |
