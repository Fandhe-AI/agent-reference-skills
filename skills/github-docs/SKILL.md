---
name: github-docs
description: >
  GitHub 公式ドキュメント リファレンス。
  REST API、GraphQL API、GitHub Actions (workflow, jobs, steps, expressions)、
  Webhooks、GitHub Apps、gh CLI、認証 (PAT / GITHUB_TOKEN / OAuth Apps)、
  pull requests, issues, projects, releases, Codespaces, Packages。
user-invocable: false
model: sonnet
---

# GitHub Docs リファレンス

GitHub 公式ドキュメント (docs.github.com) の主要セクションを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/github-docs/
  SKILL.md
  references/
    actions/
      README.md
      artifacts.md
      caching.md
      composite-actions.md
      contexts.md
      environment-variables.md
      events-triggers.md
      expressions.md
      permissions.md
      reusable-workflows.md
      runners.md
      secrets.md
      workflow-syntax.md
      creating-actions/
        README.md
        action-metadata.md
        docker-actions.md
        javascript-actions.md
    apps/
      README.md
      about.md
      authentication.md
      creating.md
      installation.md
      oauth-apps.md
      permissions-events.md
      webhooks.md
    authentication/
      README.md
      deploy-keys.md
      personal-access-tokens.md
      saml-sso.md
      ssh-keys.md
      two-factor-auth.md
    cli/
      README.md
      extensions.md
      quickstart.md
      reference.md
    graphql/
      README.md
      forming-calls.md
      overview.md
      pagination.md
      rate-limits.md
      schema-reference.md
    pages/
      README.md
      configuration.md
      custom-domains.md
      getting-started.md
    pull-requests/
      README.md
      code-owners.md
      conflicts.md
      creating.md
      merging.md
      reviewing.md
    repositories/
      README.md
      branches.md
      creating-managing.md
      files.md
      releases-tags.md
      settings.md
      templates.md
    rest-api/
      README.md
      actions/
        README.md
        artifacts.md
        secrets.md
        self-hosted-runners.md
        variables.md
        workflow-jobs.md
        workflow-runs.md
        workflows.md
      checks/
        README.md
        check-runs.md
        check-suites.md
      deployments/
        README.md
        deployments.md
        environments.md
      gists/
        README.md
        gists.md
      git/
        README.md
        blobs.md
        commits.md
        refs.md
        tags.md
        trees.md
      issues/
        README.md
        assignees.md
        comments.md
        issues.md
        labels.md
        milestones.md
      orgs/
        README.md
        orgs.md
      overview/
        about.md
        api-versions.md
        authentication.md
        best-practices.md
        pagination.md
        permissions.md
        rate-limits.md
        troubleshooting.md
      packages/
        README.md
        packages.md
      pages/
        README.md
        pages.md
      pulls/
        README.md
        review-comments.md
        review-requests.md
        reviews.md
      repos/
        README.md
        branches.md
        collaborators.md
        commits.md
        contents.md
        deploy-keys.md
        releases.md
        repos.md
        tags.md
        webhooks.md
      search/
        README.md
        search.md
      users/
        README.md
        users.md
    webhooks/
      README.md
      about.md
      best-practices.md
      creating.md
      events.md
      securing.md
  samples/
    README.md
    cache-dependencies.md
    ci-node.md
    composite-action.md
    deploy-on-push.md
    manual-dispatch.md
    matrix-build.md
    pr-auto-comment.md
    rest-api-call.md
    reusable-workflow-deploy.md
    scheduled-workflow.md
    secret-usage.md
  scripts/
    README.md
    api.md
    auth.md
    cli.md
    extensions.md
    generate.md
    install.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| ワークフロー構文・CI/CD 設定、イベントトリガー、シークレット、キャッシュ、アーティファクト | actions | [references/actions/README.md](references/actions/README.md) |
| カスタムアクション作成（JavaScript・Docker・複合アクション） | actions/creating-actions | [references/actions/creating-actions/README.md](references/actions/creating-actions/README.md) |
| GitHub App 作成・認証・インストール、OAuth Apps との比較 | apps | [references/apps/README.md](references/apps/README.md) |
| SSH キー・PAT・2FA・SAML SSO・デプロイキー | authentication | [references/authentication/README.md](references/authentication/README.md) |
| gh コマンド、CLI クイックスタート、CLI 拡張機能 | cli | [references/cli/README.md](references/cli/README.md) |
| GraphQL クエリ・ミューテーション・スキーマ・ページネーション | graphql | [references/graphql/README.md](references/graphql/README.md) |
| GitHub Pages 作成・設定・カスタムドメイン | pages | [references/pages/README.md](references/pages/README.md) |
| PR 作成・レビュー・マージ、CODEOWNERS、コンフリクト解決 | pull-requests | [references/pull-requests/README.md](references/pull-requests/README.md) |
| リポジトリ作成・設定、ブランチ保護、リリース・タグ管理 | repositories | [references/repositories/README.md](references/repositories/README.md) |
| REST API 概要・認証・レート制限・ページネーション | rest-api/overview | [references/rest-api/README.md](references/rest-api/README.md) |
| Actions API（ワークフロー・シークレット・アーティファクト等） | rest-api/actions | [references/rest-api/README.md](references/rest-api/README.md) |
| チェック API（check-runs・check-suites） | rest-api/checks | [references/rest-api/README.md](references/rest-api/README.md) |
| デプロイ・環境 API | rest-api/deployments | [references/rest-api/README.md](references/rest-api/README.md) |
| Gist API | rest-api/gists | [references/rest-api/README.md](references/rest-api/README.md) |
| Git データ API（blobs・commits・refs・tags・trees） | rest-api/git | [references/rest-api/README.md](references/rest-api/README.md) |
| Issue API（ラベル・マイルストーン・コメント・担当者） | rest-api/issues | [references/rest-api/README.md](references/rest-api/README.md) |
| Organization API | rest-api/orgs | [references/rest-api/README.md](references/rest-api/README.md) |
| パッケージ API | rest-api/packages | [references/rest-api/README.md](references/rest-api/README.md) |
| Pages API | rest-api/pages | [references/rest-api/README.md](references/rest-api/README.md) |
| PR API（レビュー・レビューコメント・レビューリクエスト） | rest-api/pulls | [references/rest-api/README.md](references/rest-api/README.md) |
| リポジトリ API（ブランチ・コンテンツ・リリース・Webhook） | rest-api/repos | [references/rest-api/README.md](references/rest-api/README.md) |
| 検索 API | rest-api/search | [references/rest-api/README.md](references/rest-api/README.md) |
| ユーザー API | rest-api/users | [references/rest-api/README.md](references/rest-api/README.md) |
| Webhook 作成・イベントペイロード・セキュリティ・ベストプラクティス | webhooks | [references/webhooks/README.md](references/webhooks/README.md) |
| 典型的な Actions ワークフロー・デプロイ・CI パターンを知りたい | samples | [samples/README.md](samples/README.md) |
| gh CLI インストール・認証・API 呼び出しコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
