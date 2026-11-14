---
name: openai-platform-ops
description: >
  OpenAI API (developers.openai.com) 運用・管理。
  Administration API, admin API keys, RBAC, projects, spend limits, audit logs,
  usage / costs API, Terraform provider, workload identity federation (WIF),
  moderation API, safety / CSAM guidance, Private Safety Processing (OCI), service tier 制限,
  production best practices, cost / latency 最適化。
  rate limits・webhooks は openai-api-core、Codex は openai-codex。
user-invocable: false
---

## 対象バージョン

OpenAI 公式ドキュメント（developers.openai.com/api/docs）は版タグを持たないため取得日で pin する。初回収録 2026-10-17、更新 2026-11-14（CSAM guidance 追加、Private Safety Processing の OCI Object Storage / Modified Abuse Monitoring、service tier 制限、12 時間 prompt caching の反映）。samples は意図的に未作成、scripts は 2026-10-17 時点のまま（OCI 登録の curl は `references/administration/private-safety-processing.md` を参照）。追跡は changelog（`/api/docs/changelog`）の新規項目で行う。

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
      wif-x509-certificates.md
      wif-idira.md
      private-safety-processing.md
    production/
      README.md
      safety-best-practices.md
      moderation.md
      safety-checks.md
      agent-builder-safety.md
      cybersecurity-checks.md
      csam-guidance.md
      misalignment-monitoring.md
      safety-enforcement.md
      under-18-guidance.md
      production-best-practices.md
      deployment-checklist.md
      gpt-actions-production.md
      cost-optimization.md
      model-optimization.md
      latency-optimization.md
      realtime-costs.md
      fast-mode.md
      ultrafast-mode.md
  scripts/
    README.md
    admin-api.md
    terraform.md
    moderation.md
    safety.md
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
| Ultrafast mode / fast mode で service tier を選びたい | production | [references/production/README.md](references/production/README.md) |
| CSAM 対策・児童安全ガイダンス (hash matching / 報告) を知りたい | production | [references/production/README.md](references/production/README.md) |
| misalignment monitoring・safety enforcement webhook・under-18 対応を知りたい | production | [references/production/README.md](references/production/README.md) |
| プロジェクト / 組織で使用可能な service tier を制限したい (400 `service_tier` エラー) | administration | [references/administration/README.md](references/administration/README.md) |
| ZDR with Private Safety Processing の外部ストレージ (AWS / Azure / GCP / OCI) を登録したい | administration | [references/administration/README.md](references/administration/README.md) |
| WIF を X.509 証明書または Idira で構成したい | administration | [references/administration/README.md](references/administration/README.md) |
| Admin API / Terraform / moderation の curl コマンドをコピペしたい | scripts | [scripts/README.md](scripts/README.md) |
| safety alerts / cases の curl コマンドをコピペしたい | scripts | [scripts/README.md](scripts/README.md) |

## 他スキルとの棲み分け

- rate limits・error handling・prompt caching・Batch API の実行方法は `openai-api-core` が担当（このスキルではプロダクション運用の文脈でのみ触れる）
- Codex のワークスペース・組織管理は `openai-codex` の `administration` カテゴリが担当。本スキルの `administration` は OpenAI API プラットフォーム（developers.openai.com）の組織管理を扱う
- Codex 向けの WIF 経路・Codex federation ルールのリファレンスは `openai-codex` が担当
- 一般的な webhooks（署名検証など）は `openai-api-core`、GPT-Live の音声セッションコストは `openai-realtime-audio` が担当
- クロススキルの相対リンクは張らず、スキル名のみで言及する
