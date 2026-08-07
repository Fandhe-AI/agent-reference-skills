---
name: anthropic-claude-code-deploy
description: >
  Claude Code (code.claude.com) のデプロイ・CI/CD リファレンス。
  Amazon Bedrock / Google Cloud Agent Platform (Vertex AI) / Microsoft Foundry /
  Claude Platform on AWS 経由、Claude apps gateway、LLM gateway (protocol / rollout)、
  GitHub Actions (claude-code-action) / GitLab CI/CD / GitHub Enterprise Server (GHES)、
  code review 自動化・ultrareview、Slack (Claude Tag)、headless mode、cloud environments、
  devcontainer、self-hosted environments（runner 構成・identity 検証・本番デプロイ）。
user-invocable: false
---

# anthropic-claude-code-deploy

Claude Code (code.claude.com) を組織にデプロイする際のクラウドプラットフォーム連携・gateway・CI/CD・非対話実行環境のリファレンス。

Messages API を直接クラウドプラットフォームで呼ぶ場合は `anthropic-api-core` の platforms、CLI 本体の使い方・設定は `anthropic-claude-code`、権限・セキュリティ・エンタープライズ管理は `anthropic-claude-code-admin` を参照（本スキルはデプロイ経路と CI/CD 統合を担当）。

## ディレクトリ構成

```text
skills/anthropic-claude-code-deploy/
  SKILL.md
  references/
    cloud-platforms/
      README.md
      amazon-bedrock.md
      claude-platform-on-aws.md
      google-vertex-ai.md
      microsoft-foundry.md
    apps-gateway/
      README.md
      claude-apps-gateway.md
      claude-apps-gateway-config.md
      claude-apps-gateway-deploy.md
      claude-apps-gateway-on-aws.md
      claude-apps-gateway-on-gcp.md
      claude-apps-gateway-spend-limits.md
    llm-gateway/
      README.md
      gateways.md
      llm-gateway.md
      llm-gateway-connect.md
      llm-gateway-protocol.md
      llm-gateway-rollout.md
    cicd/
      README.md
      code-review.md
      github-actions.md
      github-actions-cloud-providers.md
      github-enterprise-server.md
      gitlab-ci-cd.md
      slack.md
      ultrareview.md
    headless-environments/
      README.md
      cloud-environments.md
      devcontainer.md
      headless.md
    self-hosted-environments/
      README.md
      self-hosted-environments.md
      self-hosted-environments-configuration.md
      self-hosted-environments-deploy.md
      self-hosted-environments-identity.md
      self-hosted-environments-quickstart.md
      self-hosted-environments-reference.md
      self-hosted-environments-testing.md
  samples/
    README.md
    github-actions-workflow.md
    github-actions-bedrock-vertex.md
    gitlab-ci.md
    devcontainer.md
    code-review-automation.md
    self-hosted-runner-quickstart.md
    self-hosted-runner-image.md
    self-hosted-runner-kubernetes.md
    self-hosted-runner-docker-compose.md
  scripts/
    README.md
    cloud-env-setup.md
    gateway-setup.md
    cicd-setup.md
    self-hosted-environments-setup.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` `scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Amazon Bedrock / Google Cloud Agent Platform (Vertex AI) / Microsoft Foundry / Claude Platform on AWS 経由で Claude Code を実行する設定・認証・IAM を知りたい | cloud-platforms | [references/cloud-platforms/README.md](references/cloud-platforms/README.md) |
| Claude apps gateway（自己ホスト gateway）の設定・デプロイ・AWS/GCP 実例・spend limits を知りたい | apps-gateway | [references/apps-gateway/README.md](references/apps-gateway/README.md) |
| サードパーティ LLM gateway 経由のルーティング・接続・protocol・組織向けロールアウトを知りたい | llm-gateway | [references/llm-gateway/README.md](references/llm-gateway/README.md) |
| GitHub Actions（claude-code-action）/ GitHub Enterprise Server / GitLab CI/CD への統合、自動 code review・ultrareview、Slack 連携を知りたい | cicd | [references/cicd/README.md](references/cicd/README.md) |
| headless mode でのプログラム実行、cloud environments のペア環境設定、devcontainer 導入を知りたい | headless-environments | [references/headless-environments/README.md](references/headless-environments/README.md) |
| 自己ホストインフラで Claude Code cloud session を実行する runner 構成・identity 検証・本番デプロイ・end-to-end テストを知りたい | self-hosted-environments | [references/self-hosted-environments/README.md](references/self-hosted-environments/README.md) |
| 典型的な使い方を知りたい（GitHub Actions ワークフロー、Bedrock/Vertex OIDC 連携、GitLab CI/CD、devcontainer、code review 自動化、self-hosted runner のクイックスタート/イメージ/Kubernetes/Docker Compose） | samples | [samples/README.md](samples/README.md) |
| クラウド環境変数・gateway・CI/CD・self-hosted environments のセットアップコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
