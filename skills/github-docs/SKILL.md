---
name: github-docs
description: >
  GitHub 公式ドキュメント (docs.github.com)。REST API, GraphQL, Webhooks,
  GitHub Apps, OAuth Apps, gh CLI, PAT / GITHUB_TOKEN, Actions (jobs, steps,
  expressions, workflow commands, concurrency, OIDC, artifact attestations, lockfile),
  pull requests, issues, Projects v2, immutable releases, Codespaces, Packages,
  Copilot API / cloud agent, code scanning, secret scanning, Dependabot,
  Dependency graph / SBOM, Teams, Billing, activity (events / notifications)。
user-invocable: false
model: sonnet
---

# GitHub Docs リファレンス

GitHub 公式ドキュメント (docs.github.com) の主要セクションを網羅したスキル。

出典: docs.github.com Article Body API (free-pro-team@latest)、取得日 2026-10-17。REST は X-GitHub-Api-Version 2026-03-10 で記述（ヘッダー省略時の既定は 2022-11-28）。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/github-docs/
  SKILL.md
  references/
    actions/
      README.md
      artifact-attestations.md
      artifacts.md
      caching.md
      composite-actions.md
      concurrency.md
      contexts.md
      environment-variables.md
      events-triggers.md
      expressions.md
      limits.md
      lockfiles.md
      oidc.md
      permissions.md
      reusable-workflows.md
      runners.md
      secrets.md
      workflow-commands.md
      workflow-syntax.md
      creating-actions/
        README.md
        action-metadata.md
        docker-actions.md
        immutable-releases.md
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
    projects/
      README.md
      graphql-api.md
      rest-api.md
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
      agent-tasks/
        README.md
        agent-tasks.md
      agents/
        README.md
        secrets.md
        variables.md
      billing/
        README.md
        budgets.md
        usage.md
      campaigns/
        README.md
        campaigns.md
      actions/
        README.md
        artifacts.md
        cache.md
        concurrency-groups.md
        oidc.md
        secrets.md
        self-hosted-runners.md
        variables.md
        workflow-jobs.md
        workflow-runs.md
        workflows.md
      activity/
        events.md
        notifications.md
        starring.md
        watching.md
      checks/
        README.md
        check-runs.md
        check-suites.md
      codespaces/
        codespaces.md
      copilot/
        README.md
        cloud-agent-management.md
        coding-agent-management.md
        content-exclusion-management.md
        spaces.md
        usage-metrics.md
        user-management.md
      dependency-graph/
        README.md
        dependency-review.md
        dependency-submission.md
        sboms.md
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
      projects/
        fields.md
        items.md
        projects.md
      pulls/
        README.md
        pulls.md
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
      security/
        README.md
        code-scanning.md
        dependabot-alerts.md
        dependabot-repository-access.md
        dependabot-secrets.md
        secret-scanning.md
        secret-scanning-push-protection.md
      teams/
        README.md
        members.md
        teams.md
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
    concurrency-deploy-queue.md
    deploy-on-push.md
    manual-dispatch.md
    matrix-build.md
    oidc-aws-deploy.md
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

## samples 利用時の安全規約

`samples/` のサンプルは**そのまま複製されて消費側リポジトリの CI になる**前提の資材である。複製時に危険な書き方が伝播しないよう、全サンプルは以下を満たす。

- 外部 action・別リポジトリの reusable workflow は**コミット SHA 固定**で参照する（末尾コメントでバージョンを示す）。`@v4` / `@main` などの可動 ref は付け替え可能でサプライチェーン攻撃の経路になる
- `${{ ... }}` を `run:` 本文や `actions/github-script` の `script:` 本文へ**直接展開しない**。`env:` へ渡し、シェルでは `"${VAR}"`、JavaScript では `process.env.VAR` で参照する
- ジョブの `permissions` は必要最小限を明示する。既定権限が read-only のリポジトリでも動くようにする
- 各 `run:` は複数行ブロック（`run: |`）とし、先頭に `set -euo pipefail` を置く。ワークフロー側のステップにも `shell: bash` を明示する。未定義変数やパイプ途中の失敗を見逃さないため
- `$GITHUB_OUTPUT` などの環境変数は `"${GITHUB_OUTPUT}"` とクォートして参照する
- fork PR を扱う場合、`pull_request_target` へ単純置換しない。PR のコードを実行しないジョブへ分離する（`samples/pr-auto-comment.md` 参照）

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| ワークフロー構文・CI/CD 設定、イベントトリガー、シークレット、キャッシュ、アーティファクト | actions | [references/actions/README.md](references/actions/README.md) |
| ワークフローコマンド（::add-mask:: / GITHUB_OUTPUT / ジョブサマリー）、concurrency と queue、Actions の制限値 | actions | [references/actions/README.md](references/actions/README.md) |
| OIDC クラウド連携（id-token）、lockfile（gh actions-lock）、artifact attestations | actions | [references/actions/README.md](references/actions/README.md) |
| カスタムアクション作成（JavaScript・Docker・複合アクション）、immutable releases | actions/creating-actions | [references/actions/creating-actions/README.md](references/actions/creating-actions/README.md) |
| GitHub App 作成・認証・インストール、OAuth Apps との比較 | apps | [references/apps/README.md](references/apps/README.md) |
| SSH キー・PAT・2FA・SAML SSO・デプロイキー | authentication | [references/authentication/README.md](references/authentication/README.md) |
| gh コマンド、CLI クイックスタート、CLI 拡張機能 | cli | [references/cli/README.md](references/cli/README.md) |
| GraphQL クエリ・ミューテーション・スキーマ・ページネーション | graphql | [references/graphql/README.md](references/graphql/README.md) |
| GitHub Pages 作成・設定・カスタムドメイン | pages | [references/pages/README.md](references/pages/README.md) |
| GitHub Projects（v2）の GraphQL / REST API 操作 | projects | [references/projects/README.md](references/projects/README.md) |
| PR 作成・レビュー・マージ、CODEOWNERS、コンフリクト解決 | pull-requests | [references/pull-requests/README.md](references/pull-requests/README.md) |
| リポジトリ作成・設定、ブランチ保護、リリース・タグ管理 | repositories | [references/repositories/README.md](references/repositories/README.md) |
| REST API 概要・認証・レート制限・ページネーション | rest-api/overview | [references/rest-api/README.md](references/rest-api/README.md) |
| Actions API（ワークフロー・シークレット・アーティファクト等） | rest-api/actions | [references/rest-api/actions/README.md](references/rest-api/actions/README.md) |
| アクティビティ API（イベント・通知・スター・ウォッチ） | rest-api/activity | [references/rest-api/README.md](references/rest-api/README.md) |
| チェック API（check-runs・check-suites） | rest-api/checks | [references/rest-api/checks/README.md](references/rest-api/checks/README.md) |
| Codespaces API | rest-api/codespaces | [references/rest-api/README.md](references/rest-api/README.md) |
| Copilot API（利用状況メトリクス・ユーザー管理・Spaces・cloud agent 管理・content exclusion） | rest-api/copilot | [references/rest-api/copilot/README.md](references/rest-api/copilot/README.md) |
| Dependency graph API（dependency review / submission / SBOM） | rest-api/dependency-graph | [references/rest-api/dependency-graph/README.md](references/rest-api/dependency-graph/README.md) |
| Agent tasks API（Copilot cloud agent タスク） | rest-api/agent-tasks | [references/rest-api/agent-tasks/README.md](references/rest-api/agent-tasks/README.md) |
| Agents secrets / variables API | rest-api/agents | [references/rest-api/agents/README.md](references/rest-api/agents/README.md) |
| Security campaigns API | rest-api/campaigns | [references/rest-api/campaigns/README.md](references/rest-api/campaigns/README.md) |
| Teams API（チーム・メンバー） | rest-api/teams | [references/rest-api/teams/README.md](references/rest-api/teams/README.md) |
| Billing API（budgets / usage） | rest-api/billing | [references/rest-api/billing/README.md](references/rest-api/billing/README.md) |
| デプロイ・環境 API | rest-api/deployments | [references/rest-api/deployments/README.md](references/rest-api/deployments/README.md) |
| Gist API | rest-api/gists | [references/rest-api/gists/README.md](references/rest-api/gists/README.md) |
| Git データ API（blobs・commits・refs・tags・trees） | rest-api/git | [references/rest-api/git/README.md](references/rest-api/git/README.md) |
| Issue API（ラベル・マイルストーン・コメント・担当者） | rest-api/issues | [references/rest-api/issues/README.md](references/rest-api/issues/README.md) |
| Organization API | rest-api/orgs | [references/rest-api/orgs/README.md](references/rest-api/orgs/README.md) |
| パッケージ API | rest-api/packages | [references/rest-api/packages/README.md](references/rest-api/packages/README.md) |
| Pages API | rest-api/pages | [references/rest-api/pages/README.md](references/rest-api/pages/README.md) |
| Projects（v2）REST API（items・fields） | rest-api/projects | [references/rest-api/README.md](references/rest-api/README.md) |
| PR API（レビュー・レビューコメント・レビューリクエスト） | rest-api/pulls | [references/rest-api/pulls/README.md](references/rest-api/pulls/README.md) |
| リポジトリ API（ブランチ・コンテンツ・リリース・Webhook） | rest-api/repos | [references/rest-api/repos/README.md](references/rest-api/repos/README.md) |
| 検索 API | rest-api/search | [references/rest-api/search/README.md](references/rest-api/search/README.md) |
| セキュリティ API（code scanning・secret scanning・Dependabot alerts/secrets/repository access） | rest-api/security | [references/rest-api/security/README.md](references/rest-api/security/README.md) |
| ユーザー API | rest-api/users | [references/rest-api/users/README.md](references/rest-api/users/README.md) |
| Webhook 作成・イベントペイロード・セキュリティ・ベストプラクティス | webhooks | [references/webhooks/README.md](references/webhooks/README.md) |
| 典型的な Actions ワークフロー・デプロイ・CI パターンを知りたい | samples | [samples/README.md](samples/README.md) |
| gh CLI インストール・認証・API 呼び出しコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
