---
name: anthropic-admin-platform
description: >
  Claude API (platform.claude.com) の組織管理・Admin API (sk-ant-admin) リファレンス。
  users, invites, workspaces, API keys, service accounts, RBAC (groups / roles),
  Workload Identity Federation (WIF, federation issuers / rules),
  Usage & Cost API, rate limits / spend limits, Analytics API, Compliance API,
  CMEK, zero data retention (ZDR), data residency, inference hooks。
user-invocable: false
---

# anthropic-admin-platform

Claude API (platform.claude.com) — 組織の管理・認証・利用統計・コンプライアンスをカバーする Admin 系公式リファレンス。
Admin API（sk-ant-admin キー）による users / invites / workspaces / API keys / service accounts / RBAC 管理、
Workload Identity Federation (WIF) による長期キー不要の認証、Usage & Cost API・rate limits・spend limits・Analytics API
での利用統計取得、Compliance API・CMEK・zero data retention・data residency・inference hooks によるセキュリティ／コンプライアンス統制を扱う。

Messages API 本体は `anthropic-api-core`、Managed Agents は `anthropic-managed-agents`、Claude Code の組織管理
（permissions / enterprise setup）は `anthropic-claude-code-admin`、OpenAI 側の WIF / Administration API は
`openai-platform-ops` を参照（本スキルは Claude API の組織管理・Admin 系エンドポイントを担当）。

## ディレクトリ構成

```text
skills/anthropic-admin-platform/
  SKILL.md
  references/
    auth-access/
      README.md
      authentication.md
      workload-identity-federation.md
      wif-admin-api.md
      wif-reference.md
      wif-aws.md
      wif-azure.md
      wif-gcp.md
      wif-github-actions.md
      wif-kubernetes.md
      wif-spiffe.md
      wif-okta.md
    admin-api/
      README.md
      admin-api.md
      admin-api-keys.md
      user-management.md
      workspaces.md
      analytics-api.md
      claude-code-analytics-api.md
      inference-hooks.md
      inference-hooks-configuration.md
      inference-hooks-endpoint.md
    compliance-security/
      README.md
      compliance-api.md
      compliance-api-access.md
      compliance-activity-feed.md
      compliance-content-data.md
      compliance-org-data.md
      compliance-errors.md
      compliance-faq.md
      compliance-integration-patterns.md
      cmek.md
      cmek-aws-kms.md
      cmek-azure-key-vault.md
      cmek-google-cloud-kms.md
      data-residency.md
      access-transparency.md
      app-attest.md
      api-and-data-retention.md
    usage-cost/
      README.md
      usage-cost-api.md
      rate-limits-api.md
      spend-limits-api.md
    endpoints-admin/
      README.md
      users.md
      invites.md
      workspaces.md
      api-keys.md
      cost-report.md
      organizations.md
      rate-limits.md
      external-keys.md
      federation-issuers.md
      federation-rules.md
      mcp-tunnels.md
      rbac-groups.md
      rbac-roles.md
      service-accounts.md
      spend-limits.md
      usage-report.md
      analytics.md
    endpoints-compliance/
      README.md
      activities.md
      apps-artifacts.md
      code.md
      groups.md
      organizations.md
      apps-chats.md
      apps-projects.md
  scripts/
    README.md
    admin-curl.md
    compliance-curl.md
    wif-setup.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. `endpoints-admin`（98 EP・sk-ant-admin キー必須）と `endpoints-compliance`（31 EP・Compliance Access Key 必須）は
   エンドポイント個別ページではなく**リソース単位の集約ページ**（1 リソース 1 ファイルに全エンドポイントを表で網羅）なので、
   リソース名（Users / Invites / Workspaces / API Keys / Service Accounts / RBAC Groups・Roles / Federation Issuers・Rules /
   Activities / Organizations / Groups 等）から直接ページを引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| API キー / WIF / App Attest による認証方式・WIF の AWS・Azure・GCP・GitHub Actions・Kubernetes・Okta・SPIFFE 連携を知りたい | auth-access | [references/auth-access/README.md](references/auth-access/README.md) |
| Admin API（sk-ant-admin キー）でのユーザー・ワークスペース・招待管理、Analytics API・Claude Code Analytics API、inference hooks の概要・設定・実装を知りたい | admin-api | [references/admin-api/README.md](references/admin-api/README.md) |
| Compliance API（Activity Feed・chats/files/projects の取得削除・組織データ一覧）、CMEK（AWS KMS / Azure Key Vault / Google Cloud KMS）、zero data retention・data residency・access transparency を知りたい | compliance-security | [references/compliance-security/README.md](references/compliance-security/README.md) |
| Usage and Cost API・Rate Limits API・Spend Limits API で組織の利用量・コスト・支出限度額を取得したい | usage-cost | [references/usage-cost/README.md](references/usage-cost/README.md) |
| Users / Invites / Workspaces / API Keys / Service Accounts / RBAC Groups・Roles / Federation Issuers・Rules / Rate Limits / Spend Limits / Cost Report / Usage Report / Analytics / External Keys（CMEK）/ Organizations の各 Admin API エンドポイント仕様を確認したい | endpoints-admin | [references/endpoints-admin/README.md](references/endpoints-admin/README.md) |
| Activities / Organizations / Groups / Apps Chats / Apps Projects / Apps Artifacts / Code Artifacts の各 Compliance API エンドポイント仕様を確認したい | endpoints-compliance | [references/endpoints-compliance/README.md](references/endpoints-compliance/README.md) |
| Admin API・Compliance API の curl コマンド例、WIF のサービスアカウント・issuer・rule 作成とトークン交換手順を知りたい | scripts | [scripts/README.md](scripts/README.md) |
