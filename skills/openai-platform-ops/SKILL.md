---
name: openai-platform-ops
description: >
  OpenAI API (developers.openai.com) の運用・管理リファレンス。
  Administration API, admin API keys, RBAC, roles, groups, invites,
  projects, spend limits, audit logs, usage / costs API,
  Terraform provider (openai/openai), workload identity federation
  (WIF, OIDC/SPIFFE), safety best practices, moderation API,
  production best practices, deployment checklist, cost / latency
  optimization, fast mode, Realtime API costs。rate limits・error
  handling・prompt caching は openai-api-core、Codex のワークスペース
  管理は openai-codex が担当。
user-invocable: false
---

## ディレクトリ構成

```text
skills/openai-platform-ops/
  SKILL.md
  references/
    administration/
      README.md
      admin-api-keys.md
      rbac.md
      invites-and-users.md
      projects.md
      spend-limits-and-alerts.md
      audit-logs.md
      usage-and-costs-api.md
      terraform-provider.md
      terraform-projects-and-access.md
      terraform-service-accounts.md
      terraform-rate-limits-and-spend.md
      terraform-project-controls.md
      terraform-import-and-reconcile.md
      workload-identity-federation.md
      wif-aws.md
      wif-google-cloud.md
      wif-microsoft-azure.md
      wif-kubernetes.md
      wif-github-actions.md
      wif-oracle-cloud.md
      wif-spiffe.md
    production/
      README.md
      safety-best-practices.md
      moderation.md
      safety-checks.md
      agent-builder-safety.md
      cybersecurity-checks.md
      production-best-practices.md
      deployment-checklist.md
      gpt-actions-production.md
      cost-optimization.md
      model-optimization.md
      latency-optimization.md
      realtime-costs.md
      fast-mode.md
  scripts/
    README.md
    admin-api.md
    terraform.md
    moderation.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（または `scripts/README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

このスキルは組織・プロジェクトの運用管理とプロダクション運用ガイドが中心のため、動く実例集の `samples/` は意図的に作成していない。典型的な使い方は各リファレンスページの Signature / Usage セクション、または `scripts/` のコピペコマンドを参照する。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Admin API キー・RBAC・招待・プロジェクト管理を知りたい | administration | [references/administration/README.md](references/administration/README.md) |
| spend limits・audit logs・usage / costs API を知りたい | administration | [references/administration/README.md](references/administration/README.md) |
| Terraform provider でプロジェクト・サービスアカウント・レート制限を管理したい | administration | [references/administration/README.md](references/administration/README.md) |
| workload identity federation (WIF) で短命クレデンシャルを発行したい | administration | [references/administration/README.md](references/administration/README.md) |
| moderation API・safety best practices・agent の安全設計を知りたい | production | [references/production/README.md](references/production/README.md) |
| プロダクション投入前のチェックリスト・デプロイ準備を知りたい | production | [references/production/README.md](references/production/README.md) |
| コスト最適化・レイテンシ最適化・fast mode・Realtime API コストを知りたい | production | [references/production/README.md](references/production/README.md) |
| Admin API / Terraform / moderation の curl コマンドをコピペしたい | scripts | [scripts/README.md](scripts/README.md) |

## 他スキルとの棲み分け

- rate limits・error handling・prompt caching・Batch API の実行方法は `openai-api-core` が担当（このスキルではプロダクション運用の文脈でのみ触れる）
- Codex のワークスペース・組織管理は `openai-codex` の `administration` カテゴリが担当。本スキルの `administration` は OpenAI API プラットフォーム（developers.openai.com）の組織管理を扱う
- クロススキルの相対リンクは張らず、スキル名のみで言及する
