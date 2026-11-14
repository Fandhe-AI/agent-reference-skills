---
name: gcp-foundation
description: >
  Google Cloud (GCP) の基盤 (IAM / リソース階層 / 認証 / 課金) の gcloud・REST・IAM ロール・ガイド。
  IAM allow・deny・conditions・PAB・サービスアカウント・WIF・Workforce・PAM、Organization Policy、Cloud Billing 予算、Cloud Quotas、Service Usage、Cloud Asset Inventory、Customer Care、ADC・API キー・impersonation、Policy Intelligence、Essential Contacts、MCP servers。
  gcloud 全般は gcp-cli、言語別 ADC は gcp-client-libraries、KMS・VPC-SC・IAP は gcp-security とは別。
user-invocable: false
---

# gcp-foundation

Google Cloud (GCP) の基盤スキル。IAM・リソース階層・Organization Policy・Cloud Billing・Cloud Quotas / Service Usage・Cloud Asset Inventory・Customer Care・認証（ADC / トークン / API キー / impersonation）・Policy Intelligence・Essential Contacts・Identity Platform / Cloud Identity API・Google Cloud MCP servers の概要を扱う。

参照本文は英語（公式ドキュメントの原語）。

## ディレクトリ構成

```text
skills/gcp-foundation/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14（別 PR で投入）
      README.md
      <group>/
        README.md
        <group>-<sub>.md          # GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS
    rest/                         # 機械生成: Discovery 由来のメソッド表、取得 2026-11-14（別 PR で投入）
      README.md
      <api>/
        README.md
        <api>.md
    rest-schemas/                 # 機械生成: Discovery 由来のメッセージスキーマ、取得 2026-11-14（別 PR で投入）
      README.md
      <api>/
        README.md
        <api>.md
    iam/                          # 機械生成: IAM roles-permissions reference、取得 2026-11-14（別 PR で投入）
      README.md
      <service>.md                # 例: iam.md / resourcemanager.md / orgpolicy.md / cloudasset.md / billing.md / serviceusage.md
    iam-guides/
      access-policies/            # allow / deny policy・変更の反映
      conditions/
      roles/
      service-accounts/
      federation-credentials/
      audit-logging/
      policy-guardrails/
      privileged-access-manager/
      service-account-credentials/
      workload-and-workforce-federation/
      access-management/
      groups-and-identities/
      policy-concepts/
      role-types/
      principal-identifiers/
      access-testing/
      iam-troubleshooting/
      delegated-administration/
      elevated-access/
      service-agents/
      service-account-concepts/
      service-account-lifecycle/
      workload-identity-federation/
      workforce-identity-federation/
      principal-access-boundary/  # 各ディレクトリに README.md と個別ページ
    resource-hierarchy/
      organization-policy/
      projects-folders/
      organization-admin/
      labels/
      service-usage/
      quotas/                     # 各ディレクトリに README.md と個別ページ
    billing/
      accounts/
      access/
      budgets-alerts/
      export-bigquery/
      cost-management/
      api/                        # 各ディレクトリに README.md と個別ページ
    asset-support/
      asset-inventory-core/
      asset-feeds-export/
      asset-analysis/
      support-cases/
      support-plans/              # 各ディレクトリに README.md と個別ページ
    auth-mcp/
      adc/
      credentials-and-tokens/
      api-keys/
      overview/
      mcp-servers/                # 各ディレクトリに README.md と個別ページ
  samples/
    README.md
    create-project-and-check-billing.md
    grant-role-read-modify-write.md
    conditional-expiring-binding.md
    service-account-impersonation.md
    local-development-adc.md
    github-actions-workload-identity-federation.md
    workforce-identity-federation-sign-in.md
    deny-policy.md
    org-policy-restrict-services-dry-run.md
    principal-access-boundary.md
    budget-alerts-api.md
    billing-export-bigquery.md
    asset-inventory-export.md
    asset-inventory-search.md
    enable-and-disable-apis.md
    quota-view-and-adjust.md
  scripts/
    README.md
    auth.md
    iam.md
    projects-orgs.md
    org-policy.md
    billing.md
    quotas-services.md
    asset-inventory.md
    diagnostics.md
```

`references/gcloud/` が担当する gcloud グループ（20）: `iam` / `resource-manager` / `org-policies` / `organizations` / `projects` / `billing` / `quotas` / `services` / `asset` / `essential-contacts` / `policy-troubleshoot` / `policy-intelligence` / `recommender` / `identity` / `workload-identity` / `support` / `active-directory` / `domains` / `cloudlocationfinder` / `resource-config`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/<group>/README.md` からページ（GA は全文）を引く
2. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`
3. IAM ロール・権限 → `references/iam/<service>.md`（ロール ID・権限名のサービス接頭辞で引く。例: `roles/orgpolicy.*` → `orgpolicy.md`）
4. 概念・手順 → 各ガイド（`iam-guides` / `resource-hierarchy` / `billing` / `asset-support` / `auth-mcp`）の README.md から個別ページを特定して Read する
5. 作業例 → `samples/README.md`、コマンド集 → `scripts/README.md`

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（iam / projects / billing / services / asset ほか 20 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| REST のメソッド・パスを調べたい（cloudresourcemanager / iam / orgpolicy / serviceusage / cloudbilling / billingbudgets / cloudquotas / cloudasset / cloudsupport / recommender / policysimulator / iamcredentials / sts / cloudidentity ほか） | rest | [references/rest/README.md](references/rest/README.md) |
| REST のリクエスト・レスポンスのメッセージ型を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md) |
| ロール ID の権限一覧・事前定義ロールを調べたい | iam | [references/iam/README.md](references/iam/README.md) |
| allow policy / deny policy / 変更の反映を理解したい | iam-guides/access-policies | [references/iam-guides/access-policies/README.md](references/iam-guides/access-policies/README.md) |
| IAM Conditions（期限付き・時間帯・リソース名）を書きたい | iam-guides/conditions | [references/iam-guides/conditions/README.md](references/iam-guides/conditions/README.md) |
| ロール選択・カスタムロール作成、ロール種別 | iam-guides/roles、iam-guides/role-types | [references/iam-guides/roles/README.md](references/iam-guides/roles/README.md)、[references/iam-guides/role-types/README.md](references/iam-guides/role-types/README.md) |
| サービスアカウントの概念・作成・権限・鍵・ベストプラクティス | iam-guides/service-account-concepts、service-account-lifecycle、service-accounts、service-account-credentials | [references/iam-guides/service-account-concepts/README.md](references/iam-guides/service-account-concepts/README.md)、[references/iam-guides/service-account-lifecycle/README.md](references/iam-guides/service-account-lifecycle/README.md)、[references/iam-guides/service-accounts/README.md](references/iam-guides/service-accounts/README.md)、[references/iam-guides/service-account-credentials/README.md](references/iam-guides/service-account-credentials/README.md) |
| サービスエージェントを理解したい | iam-guides/service-agents | [references/iam-guides/service-agents/README.md](references/iam-guides/service-agents/README.md) |
| Workload Identity Federation（外部 IdP・GitHub Actions・他クラウド・Kubernetes） | iam-guides/workload-identity-federation、federation-credentials、workload-and-workforce-federation | [references/iam-guides/workload-identity-federation/README.md](references/iam-guides/workload-identity-federation/README.md)、[references/iam-guides/federation-credentials/README.md](references/iam-guides/federation-credentials/README.md)、[references/iam-guides/workload-and-workforce-federation/README.md](references/iam-guides/workload-and-workforce-federation/README.md) |
| Workforce Identity Federation（従業員の SSO・gcloud ログイン） | iam-guides/workforce-identity-federation | [references/iam-guides/workforce-identity-federation/README.md](references/iam-guides/workforce-identity-federation/README.md) |
| Privileged Access Manager（PAM）で一時昇格したい | iam-guides/privileged-access-manager、elevated-access | [references/iam-guides/privileged-access-manager/README.md](references/iam-guides/privileged-access-manager/README.md)、[references/iam-guides/elevated-access/README.md](references/iam-guides/elevated-access/README.md) |
| deny policy・Principal Access Boundary・ガードレール | iam-guides/policy-guardrails、principal-access-boundary | [references/iam-guides/policy-guardrails/README.md](references/iam-guides/policy-guardrails/README.md)、[references/iam-guides/principal-access-boundary/README.md](references/iam-guides/principal-access-boundary/README.md) |
| アクセス管理の全体像・ポリシー概念・プリンシパル識別子・グループ | iam-guides/access-management、policy-concepts、principal-identifiers、groups-and-identities | [references/iam-guides/access-management/README.md](references/iam-guides/access-management/README.md)、[references/iam-guides/policy-concepts/README.md](references/iam-guides/policy-concepts/README.md)、[references/iam-guides/principal-identifiers/README.md](references/iam-guides/principal-identifiers/README.md)、[references/iam-guides/groups-and-identities/README.md](references/iam-guides/groups-and-identities/README.md) |
| 権限エラー・アクセスのテスト・委任管理・監査ログ | iam-guides/iam-troubleshooting、access-testing、delegated-administration、audit-logging | [references/iam-guides/iam-troubleshooting/README.md](references/iam-guides/iam-troubleshooting/README.md)、[references/iam-guides/access-testing/README.md](references/iam-guides/access-testing/README.md)、[references/iam-guides/delegated-administration/README.md](references/iam-guides/delegated-administration/README.md)、[references/iam-guides/audit-logging/README.md](references/iam-guides/audit-logging/README.md) |
| 組織・フォルダ・プロジェクトの階層、プロジェクトの作成・移動 | resource-hierarchy/projects-folders | [references/resource-hierarchy/projects-folders/README.md](references/resource-hierarchy/projects-folders/README.md) |
| Organization Policy の制約・カスタム制約・dry-run | resource-hierarchy/organization-policy | [references/resource-hierarchy/organization-policy/README.md](references/resource-hierarchy/organization-policy/README.md) |
| 組織の管理者設定・Essential Contacts | resource-hierarchy/organization-admin | [references/resource-hierarchy/organization-admin/README.md](references/resource-hierarchy/organization-admin/README.md) |
| ラベル・タグでリソースを分類したい | resource-hierarchy/labels | [references/resource-hierarchy/labels/README.md](references/resource-hierarchy/labels/README.md) |
| API の有効化・無効化（Service Usage） | resource-hierarchy/service-usage | [references/resource-hierarchy/service-usage/README.md](references/resource-hierarchy/service-usage/README.md) |
| クォータの確認・引き上げ（Cloud Quotas） | resource-hierarchy/quotas | [references/resource-hierarchy/quotas/README.md](references/resource-hierarchy/quotas/README.md) |
| 請求先アカウントの概念・プロジェクトとの紐付け | billing/accounts | [references/billing/accounts/README.md](references/billing/accounts/README.md) |
| 請求先アカウントの IAM ロール・アクセス管理 | billing/access | [references/billing/access/README.md](references/billing/access/README.md) |
| 予算・アラート・自動コスト制御 | billing/budgets-alerts | [references/billing/budgets-alerts/README.md](references/billing/budgets-alerts/README.md) |
| 課金データの BigQuery エクスポート・分析クエリ | billing/export-bigquery | [references/billing/export-bigquery/README.md](references/billing/export-bigquery/README.md) |
| コスト管理 | billing/cost-management | [references/billing/cost-management/README.md](references/billing/cost-management/README.md) |
| Cloud Billing API・Budget API | billing/api | [references/billing/api/README.md](references/billing/api/README.md) |
| Cloud Asset Inventory の概要・アセットタイプ・クォータ | asset-support/asset-inventory-core | [references/asset-support/asset-inventory-core/README.md](references/asset-support/asset-inventory-core/README.md) |
| アセットのフィード・エクスポート（Pub/Sub / Cloud Storage / BigQuery） | asset-support/asset-feeds-export | [references/asset-support/asset-feeds-export/README.md](references/asset-support/asset-feeds-export/README.md) |
| アセット・IAM ポリシーの検索・SQL 分析 | asset-support/asset-analysis | [references/asset-support/asset-analysis/README.md](references/asset-support/asset-analysis/README.md) |
| サポートケース（Customer Care）の作成・管理 | asset-support/support-cases | [references/asset-support/support-cases/README.md](references/asset-support/support-cases/README.md) |
| サポートプランを比較・選びたい | asset-support/support-plans | [references/asset-support/support-plans/README.md](references/asset-support/support-plans/README.md) |
| 認証方式の全体像・MFA / 再認証 | auth-mcp/overview | [references/auth-mcp/overview/README.md](references/auth-mcp/overview/README.md) |
| ADC の仕組み・設定・トラブルシューティング | auth-mcp/adc | [references/auth-mcp/adc/README.md](references/auth-mcp/adc/README.md) |
| アクセストークン・ID トークン・impersonation・REST 認証 | auth-mcp/credentials-and-tokens | [references/auth-mcp/credentials-and-tokens/README.md](references/auth-mcp/credentials-and-tokens/README.md) |
| API キーの作成・制限・ベストプラクティス | auth-mcp/api-keys | [references/auth-mcp/api-keys/README.md](references/auth-mcp/api-keys/README.md) |
| Google Cloud MCP servers の概要 | auth-mcp/mcp-servers | [references/auth-mcp/mcp-servers/README.md](references/auth-mcp/mcp-servers/README.md) |
| 典型的な使い方を知りたい（ロール付与・WIF・deny・org policy・予算・クォータなど 16 件） | samples | [samples/README.md](samples/README.md) |
| コマンドをコピペしたい（auth / iam / projects-orgs / org-policy / billing / quotas-services / asset-inventory / diagnostics） | scripts | [scripts/README.md](scripts/README.md) |

## 他スキルとの使い分け

- `gcp-cli` — gcloud 全般のインストール・設定・出力フォーマット・`gcloud auth` の使い方。基盤の 20 グループのコマンドは本スキル
- `gcp-client-libraries` — 言語別の ADC コード。ADC の仕組み・設定は本スキル
- `gcp-security` — KMS / Secret Manager / VPC Service Controls / IAP / SCC。IAM・Organization Policy は本スキル
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `google-gemini-api` — Gemini API キー。Google Cloud の API キー全般は本スキル
- `anthropic-claude-code-deploy` — Claude Code の Vertex 設定のみ。GCP 側の IAM・認証は本スキル
- `gws` — Google Workspace CLI。Workspace API は対象外
- Firebase は別計画（`firebase-*`）。本スキルでは扱わない

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-14、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/rest/` `references/rest-schemas/` `references/iam/` は機械生成（gcloud 593.0.0 / Discovery / IAM reference、取得 2026-11-14）で、別 PR で後から投入される。未投入の間は公式ドキュメントを確認する
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
- ガイドは主要ページの要約で、公式の全ページではない
- 変更ログ（release notes）と言語別サンプルは未収録（言語別コードは `gcp-client-libraries`）
- 権限の一括対応表（deny-permissions-support）は収録せず公式 URL を参照する
