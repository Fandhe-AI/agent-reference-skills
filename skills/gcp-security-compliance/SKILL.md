---
name: gcp-security-compliance
description: >
  Google Cloud (GCP) の Security Command Center (SCC)・Security posture・Model Armor・Assured Workloads・Access Approval/Transparency・Key Access Justifications (KAJ)・Standard/Premium/Enterprise・findings・Event/Container/VM Threat Detection・Security Health Analytics・Web Security Scanner・AI Protection・CIEM・DSPM・Risk Manager・Audit/Compliance Manager・Sovereign Controls by Partners。KMS/IAP は gcp-security
user-invocable: false
---

# gcp-security-compliance

Google Cloud (GCP) のセキュリティ態勢・脅威検出・コンプライアンス系スキル。Security Command Center（SCC。Standard / Premium / Enterprise（非推奨）のサービスティア・アクティベーション・アクセス制御・データ所在地・検出結果のクラス / 重大度 / 状態 / ミュート / セキュリティマーク・API / 通知 / エクスポート・Event Threat Detection / VM Threat Detection / Cloud Run Threat Detection / Agent Platform Threat Detection・Security Health Analytics・脆弱性評価・Web Security Scanner・攻撃の発生可能性（attack exposure）と有害な組み合わせ（toxic combinations））、Security posture と IaC 検証、AI Protection・CIEM・DSPM（非推奨）・Risk Manager、Compliance Manager（フレームワーク・Cloud Controls・CEL）、Model Armor（テンプレート・フィルタ・統合・ロギング）、Assured Workloads（フレームワーク・コントロールパッケージ・Cloud Controls・EU Data Boundary・IL4）、Access Approval・Access Transparency・Key Access Justifications（KAJ）、Audit Manager、Sovereign Controls by Partners を扱う。加えて gcloud 8 グループ・REST（Discovery）7 API・IAM ロールを収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。SCC の機械生成ページと手書きガイドは SCC のティア表記（Standard-legacy / Standard / Premium / Enterprise（Deprecated））を原文どおりに残す。

**鍵・シークレット・証明書・アクセス境界（Cloud KMS・Cloud HSM・Cloud EKM・CMEK・Autokey・Secret Manager・Parameter Manager・Certificate Manager・Certificate Authority Service・IAP・VPC Service Controls・Access Context Manager・Cloud Armor・Binary Authorization・Artifact Analysis・Identity Platform・Web Risk）は `gcp-security`**。Key Access Justifications のガイドは本スキル、`gcloud kms` と KAJ ポリシーの REST（`cloudkms`）は `gcp-security`。

## ディレクトリ構成

```text
skills/gcp-security-compliance/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14
      README.md
      access-approval/
        README.md                 # gcloud access-approval（requests・service-account・settings）
        access-approval-<group>.md
      assured/
        README.md                 # gcloud assured（operations・workloads create / delete / describe / enable-resource-monitoring / list / update / violations）
        assured-<group>.md
      audit-manager/
        README.md                 # gcloud audit-manager（audit-reports・audit-schedules・audit-scopes・enrollments・operations）
        audit-manager-<group>.md
      compliance-manager/
        README.md                 # gcloud compliance-manager（cloud-controls・cloud-control-deployments・frameworks・framework-deployments・operations）
        compliance-manager-<group>.md
      model-armor/
        README.md                 # gcloud model-armor（floorsettings・templates）
        model-armor-<group>.md
      scc/
        README.md                 # gcloud scc（findings・muteconfigs・notifications・sources・postures・posture-deployments・iac-validation-reports・manage services / custom-modules 等）
        scc-<group>.md
      web-security-scanner/
        README.md                 # gcloud web-security-scanner（scan-configs・scan-runs。alpha のみ）
        web-security-scanner-<group>.md
      workspace-key-access/
        README.md                 # gcloud workspace-key-access（configs・endpoints・operations。beta のみ）
        workspace-key-access-<group>.md
    iam/                          # 機械生成: IAM roles-permissions reference、取得 2026-11-14
      README.md
      <service>.md                # accessapproval / assuredworkloads / auditmanager / axt（Access Transparency）/ ciem / cloudcontrolspartner / cloudsecuritycompliance-1・2 / cloudsecurityscanner（Web Security Scanner）/ dspm / modelarmor / riskmanager / securitycenter-1〜4 / securitycentermanagement / securityposture ほか
    rest/                         # 機械生成: Discovery 由来のメソッド表、取得 2026-11-14
      README.md
      <api>/
        README.md                 # accessapproval / assuredworkloads / auditmanager / cloudcontrolspartner / securitycenter / securityposture / websecurityscanner
        <api>.md
    rest-schemas/                 # 機械生成: Discovery 由来のメッセージスキーマ、取得 2026-11-14
      README.md
      <api>/
        README.md                 # rest/ と同じ 7 API
        <api>.md
    scc-overview-tiers/           # 公式ガイド由来（手書き）: SCC の概要・サービスティア・アクティベーション・アクセス制御・データ所在地・廃止告知
      README.md
      <page>.md                   # 例: service-tiers.md / deprecations.md
    scc-findings/                 # 検出結果のクラス・重大度・状態・ライフサイクル・確認と管理・ミュート・クエリ・セキュリティマーク・issues
      README.md
      <page>.md
    scc-api-notifications-export/ # API による検出結果の一覧・通知（Pub/Sub）・エクスポート
      README.md
      <page>.md
    scc-threat-detection/         # 脅威の概要・Event Threat Detection・VM Threat Detection・Cloud Run / Agent Platform Threat Detection・相関する脅威・機密性の高い操作・調査
      README.md
      <page>.md
    scc-vulnerabilities-sha/      # Security Health Analytics・カスタムモジュール・ソフトウェア脆弱性の評価
      README.md
      <page>.md
    scc-web-security-scanner/     # Web Security Scanner の概要・使い方・カスタムスキャン・検出結果の修正
      README.md
      <page>.md
    scc-security-posture-iac/     # Security posture・secure-by-default テンプレート・IaC 検証
      README.md
      <page>.md
    scc-attack-exposure/          # 攻撃の発生可能性・高価値リソースセット・有害な組み合わせ・リスクレポート
      README.md
      <page>.md
    ai-protection-ciem-dspm-risk-manager/  # AI Protection・CIEM・DSPM（非推奨）・Risk Manager
      README.md
      <page>.md                   # 例: dspm-data-security.md
    compliance-manager/           # Compliance Manager: 有効化・フレームワークの適用と監視・監査・CEL 式
      README.md
      <page>.md
    model-armor/                  # Model Armor の概要・統合・フィルタのバージョン・ロギング・ベストプラクティス
      README.md
      <page>.md
    model-armor-templates/        # Model Armor のテンプレート管理・リトライ戦略
      README.md
      <page>.md
    assured-workloads/            # Assured Workloads の概要・主要概念・責任共有・フレームワーク・鍵・移行・EU Data Boundary
      README.md
      <page>.md
    assured-workloads-cloud-controls/  # フレームワーク / Cloud Controls の管理と監視・ルール・エンドポイント / TLS 暗号スイートの制限・IL4
      README.md
      <page>.md
    access-approval-transparency-kaj/  # Access Approval・Access Transparency・Key Access Justifications・管理アクセスの総覧
      README.md
      <page>.md
    audit-manager/                # Audit Manager: 有効化・リソースの登録・監査の実行と確認・フレームワーク・ロケーション
      README.md
      <page>.md
    sovereign-controls-by-partners/  # Sovereign Controls by Partners: フォルダ・鍵管理・責任共有・対応プロダクト・データ境界
      README.md
      <page>.md
```

`references/gcloud/` が担当する gcloud グループ（8）: `access-approval` / `assured` / `audit-manager` / `compliance-manager` / `model-armor` / `scc` / `web-security-scanner` / `workspace-key-access`。`web-security-scanner` は README 上 alpha コマンドのみ、`workspace-key-access` は README 上 beta コマンドのみ（configs / endpoints / operations の 3 グループ。本文は README の記載のみで、用途の説明は公式 reference で確認する）。`scc` は 221 コマンドで、`scc manage services` / `scc manage custom-modules`（検出サービスの有効化とカスタムモジュール）と `scc postures` 系（Security posture）を含む。GA コマンドのページは gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ（各ページ冒頭に明記）。

`references/rest/` `references/rest-schemas/` の API（7）: `accessapproval` / `assuredworkloads` / `auditmanager` / `cloudcontrolspartner`（Sovereign Controls by Partners 向けの Cloud Controls Partner API）/ `securitycenter` / `securityposture` / `websecurityscanner`（Discovery のみで gcloud は alpha）。Compliance Manager と Model Armor の API は同梱の Discovery document（`google-api-python-client`）に含まれないため REST ページを持たない（gcloud と IAM を引く）。

`references/iam/` のサービス: `accessapproval` / `assuredworkloads` / `auditmanager` / `axt`（Access Transparency）/ `ciem` / `cloudcontrolspartner` / `cloudnotifications` / `cloudsecuritycompliance`（Compliance Manager、2 分割）/ `cloudsecurityscanner`（Web Security Scanner）/ `compliancescanning` / `dspm` / `mandiant` / `modelarmor` / `riscconfigurationservice` / `riskmanager`（Cyber Insurance Hub）/ `securedlandingzone` / `securitycenter`（4 分割）/ `securitycentermanagement` / `securityposture` / `servicesecurityinsights`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/README.md` からグループの README（例: `references/gcloud/scc/README.md`）→ グループページ・コマンドページを引く。`gcloud kms`（KAJ ポリシー含む）は `gcp-security`、`gcloud compute`（Shielded VM・Confidential Computing 等）は `gcp-compute`、`gcloud container binauthz` は `gcp-gke`
2. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`。`<api>` は `accessapproval` / `assuredworkloads` / `auditmanager` / `cloudcontrolspartner` / `securitycenter` / `securityposture` / `websecurityscanner`
3. IAM ロール・権限 → `references/iam/README.md` の索引から `<service>.md` を引く。`securitycenter` は `securitycenter-1.md`〜`securitycenter-4.md`、`cloudsecuritycompliance` は `-1` / `-2` に分割されているため、ロール ID（例: `roles/securitycenter.adminEditor`）で `references/iam/` 配下を grep して該当ファイルを特定する
4. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
5. 鍵・シークレット・証明書・IAP・VPC Service Controls・Cloud Armor は `gcp-security`。IAM の基盤・Organization Policy・Privileged Access Manager は `gcp-foundation`
6. 廃止・縮退を確認するときは `scc-overview-tiers/deprecations.md`（SCC の廃止表）、`scc-overview-tiers/service-tiers.md`（Enterprise ティア）、`ai-protection-ciem-dspm-risk-manager/dspm-data-security.md`（DSPM）を引く

`samples/` と `scripts/` は本スキルに無い。コマンドは `references/gcloud/` を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（8 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| `gcloud scc`（findings・muteconfigs・notifications・bqexports・sources・postures・posture-deployments・iac-validation-reports・manage services / custom-modules）のフラグを調べたい | gcloud/scc | [references/gcloud/scc/README.md](references/gcloud/scc/README.md) |
| `gcloud assured`（workloads の create / update / violations・operations）のフラグを調べたい | gcloud/assured | [references/gcloud/assured/README.md](references/gcloud/assured/README.md) |
| `gcloud access-approval`（requests・settings・service-account）のフラグを調べたい | gcloud/access-approval | [references/gcloud/access-approval/README.md](references/gcloud/access-approval/README.md) |
| `gcloud audit-manager`（audit-reports・audit-schedules・audit-scopes・enrollments）のフラグを調べたい | gcloud/audit-manager | [references/gcloud/audit-manager/README.md](references/gcloud/audit-manager/README.md) |
| `gcloud compliance-manager`（cloud-controls・frameworks・framework-deployments）のフラグを調べたい | gcloud/compliance-manager | [references/gcloud/compliance-manager/README.md](references/gcloud/compliance-manager/README.md) |
| `gcloud model-armor`（templates・floorsettings）のフラグを調べたい | gcloud/model-armor | [references/gcloud/model-armor/README.md](references/gcloud/model-armor/README.md) |
| `gcloud web-security-scanner`（alpha: scan-configs・scan-runs）を調べたい | gcloud/web-security-scanner | [references/gcloud/web-security-scanner/README.md](references/gcloud/web-security-scanner/README.md) |
| `gcloud workspace-key-access`（beta: configs・endpoints・operations）を調べたい | gcloud/workspace-key-access | [references/gcloud/workspace-key-access/README.md](references/gcloud/workspace-key-access/README.md) |
| ロール ID の権限一覧・事前定義ロールを調べたい（`roles/securitycenter.*` / `roles/modelarmor.*` / `roles/accessapproval.*` / `roles/cloudsecuritycompliance.*` / `roles/auditmanager.*` / `roles/cloudsecurityscanner.*` 等） | iam | [references/iam/README.md](references/iam/README.md) |
| REST のメソッド・パスを調べたい | rest | [references/rest/README.md](references/rest/README.md) |
| 各 API のメソッド | rest/accessapproval、rest/assuredworkloads、rest/auditmanager、rest/cloudcontrolspartner、rest/securitycenter、rest/securityposture、rest/websecurityscanner | [references/rest/accessapproval/README.md](references/rest/accessapproval/README.md)、[references/rest/assuredworkloads/README.md](references/rest/assuredworkloads/README.md)、[references/rest/auditmanager/README.md](references/rest/auditmanager/README.md)、[references/rest/cloudcontrolspartner/README.md](references/rest/cloudcontrolspartner/README.md)、[references/rest/securitycenter/README.md](references/rest/securitycenter/README.md)、[references/rest/securityposture/README.md](references/rest/securityposture/README.md)、[references/rest/websecurityscanner/README.md](references/rest/websecurityscanner/README.md) |
| REST のリクエスト・レスポンスのメッセージ型を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md) |
| 各 API のメッセージ型 | rest-schemas/accessapproval、rest-schemas/assuredworkloads、rest-schemas/auditmanager、rest-schemas/cloudcontrolspartner、rest-schemas/securitycenter、rest-schemas/securityposture、rest-schemas/websecurityscanner | [references/rest-schemas/accessapproval/README.md](references/rest-schemas/accessapproval/README.md)、[references/rest-schemas/assuredworkloads/README.md](references/rest-schemas/assuredworkloads/README.md)、[references/rest-schemas/auditmanager/README.md](references/rest-schemas/auditmanager/README.md)、[references/rest-schemas/cloudcontrolspartner/README.md](references/rest-schemas/cloudcontrolspartner/README.md)、[references/rest-schemas/securitycenter/README.md](references/rest-schemas/securitycenter/README.md)、[references/rest-schemas/securityposture/README.md](references/rest-schemas/securityposture/README.md)、[references/rest-schemas/websecurityscanner/README.md](references/rest-schemas/websecurityscanner/README.md) |
| SCC の概要・サービスティア（Standard / Premium / Enterprise）・アクティベーション・アクセス制御・データ所在地・廃止告知を知りたい | scc-overview-tiers | [references/scc-overview-tiers/README.md](references/scc-overview-tiers/README.md) |
| 検出結果のクラス・重大度・状態・ライフサイクル・ミュート・クエリ・セキュリティマークを調べたい | scc-findings | [references/scc-findings/README.md](references/scc-findings/README.md) |
| API で検出結果を一覧したい・Pub/Sub 通知・BigQuery 等へのエクスポートを設定したい | scc-api-notifications-export | [references/scc-api-notifications-export/README.md](references/scc-api-notifications-export/README.md) |
| Event Threat Detection・VM Threat Detection・Cloud Run / Agent Platform Threat Detection・相関する脅威・脅威を調査したい | scc-threat-detection | [references/scc-threat-detection/README.md](references/scc-threat-detection/README.md) |
| Security Health Analytics・カスタムモジュール・ソフトウェア脆弱性の評価を調べたい | scc-vulnerabilities-sha | [references/scc-vulnerabilities-sha/README.md](references/scc-vulnerabilities-sha/README.md) |
| Web Security Scanner の概要・使い方・カスタムスキャン・検出結果の修正を知りたい | scc-web-security-scanner | [references/scc-web-security-scanner/README.md](references/scc-web-security-scanner/README.md) |
| Security posture・secure-by-default テンプレート・IaC 検証（対応アセットとポリシー）を知りたい | scc-security-posture-iac | [references/scc-security-posture-iac/README.md](references/scc-security-posture-iac/README.md) |
| 攻撃の発生可能性（attack exposure）・高価値リソースセット・有害な組み合わせ・リスクレポートを知りたい | scc-attack-exposure | [references/scc-attack-exposure/README.md](references/scc-attack-exposure/README.md) |
| AI Protection・CIEM・DSPM（非推奨）・Risk Manager（Cyber Insurance Hub）を知りたい | ai-protection-ciem-dspm-risk-manager | [references/ai-protection-ciem-dspm-risk-manager/README.md](references/ai-protection-ciem-dspm-risk-manager/README.md) |
| Compliance Manager の有効化・フレームワークの適用と監視・監査・CEL 式を知りたい | compliance-manager | [references/compliance-manager/README.md](references/compliance-manager/README.md) |
| Model Armor の概要・統合（Vertex AI 等）・フィルタのバージョン・ロギング・ベストプラクティスを知りたい | model-armor | [references/model-armor/README.md](references/model-armor/README.md) |
| Model Armor のテンプレート管理・リトライ戦略を知りたい | model-armor-templates | [references/model-armor-templates/README.md](references/model-armor-templates/README.md) |
| Assured Workloads の概要・主要概念・責任共有・フレームワーク・コントロールパッケージ・鍵管理・移行・EU Data Boundary を知りたい | assured-workloads | [references/assured-workloads/README.md](references/assured-workloads/README.md) |
| フレームワークと Cloud Controls の管理・ルールの記述・エンドポイント / TLS 暗号スイートの制限・IL4 を知りたい | assured-workloads-cloud-controls | [references/assured-workloads-cloud-controls/README.md](references/assured-workloads-cloud-controls/README.md) |
| Access Approval・Access Transparency・Key Access Justifications（KAJ）の概要・構成・既定ポリシー・ログを知りたい | access-approval-transparency-kaj | [references/access-approval-transparency-kaj/README.md](references/access-approval-transparency-kaj/README.md) |
| Audit Manager の有効化・リソースの登録・監査の実行・フレームワークの作成を知りたい | audit-manager | [references/audit-manager/README.md](references/audit-manager/README.md) |
| Sovereign Controls by Partners のフォルダ・鍵管理・対応プロダクト・データ境界（ドイツ T-Systems / フランス S3NS）を知りたい | sovereign-controls-by-partners | [references/sovereign-controls-by-partners/README.md](references/sovereign-controls-by-partners/README.md) |

## 他スキルとの使い分け

- `gcp-security` — Cloud KMS（Cloud HSM・Cloud EKM・鍵のインポート・Autokey・CMEK）・Secret Manager・Parameter Manager・Certificate Manager・Certificate Authority Service・Public CA・IAP（TCP 転送を含む）・Chrome Enterprise Premium / BeyondCorp・Access Context Manager・VPC Service Controls・Cloud Armor のガイド・Binary Authorization・Artifact Analysis・Software Supply Chain Security・Assured OSS・Identity Platform・Web Risk。本スキルは SCC とその検出サービス・Security posture・Model Armor・Assured Workloads・Access Approval / Access Transparency / Key Access Justifications（ガイド）・Audit Manager・Compliance Manager・Sovereign Controls by Partners。KAJ の `gcloud kms` と `cloudkms` REST は `gcp-security`
- `gcp-compute` — `gcloud compute security-policies` / `org-security-policies`（Cloud Armor）・`gcloud compute ssl-certificates`・IAP トンネル（`start-iap-tunnel`・`ssh --tunnel-through-iap`）・Compute REST と `roles/compute.*`・Shielded VM / Confidential Computing。SCC の VM Threat Detection の概念は本スキル
- `gcp-gke` — `gcloud container binauthz`・GKE のセキュリティ・クラスターでの Binary Authorization の強制。SCC の Container Threat Detection の概要は `gcp-gke` が担当し、本スキルの `scc-threat-detection` は Event / VM / Cloud Run / Agent Platform Threat Detection
- `gcp-networking` — Cloud NGFW・ファイアウォールポリシー・Secure Web Proxy・Cloud IDS・`gcloud network-security`
- `gcp-load-balancing` — ロードバランサー・backend services・クラシック SSL 証明書
- `gcp-foundation` — IAM・サービスアカウント・Workload / Workforce Identity Federation・Privileged Access Manager のガイド・Organization Policy・Cloud Asset Inventory・Identity Platform REST API（`identitytoolkit`）。SCC のロール付与の一般論と Organization Policy は本スキルではなく `gcp-foundation`
- `gcp-run` — Cloud Run / App Engine（IAP の背後に置く構成を含む）。SCC の Cloud Run Threat Detection の概念は本スキル
- `gcp-storage` / `gcp-databases-relational` / `gcp-databases-nosql` — サービス側から見た CMEK。Assured Workloads の鍵管理（`assured-workloads/key-management.md`）は本スキル
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット。本スキルの 8 グループのコマンドは本スキル
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリの共通パターン。SCC・Model Armor 等の REST は本スキル
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-observability`— Cloud Logging・Cloud Audit Logs・Cloud Monitoring。Access Transparency のログの読み方と Model Armor のロギング設定は本スキル
- `gcp-devops`（予定）— Artifact Registry・Cloud Build・Cloud Deploy・`gcloud artifacts`
- `gcp-iac`（予定）— Terraform。IaC 検証（SCC の `validate-iac`）は本スキル
- `gcp-ai-apis`（予定）— Sensitive Data Protection（DLP）・reCAPTCHA
- `gcp-messaging-workflows`（予定）— Pub/Sub。SCC の通知とエクスポート設定は本スキル
- `gcp-bigquery`（予定）— BigQuery。SCC のエクスポート先の設定は本スキル
- 非 GCP との距離: Model Armor は Google Cloud のサービスとしてプロンプト・応答をスクリーニングする。`openai-agents` の guardrails や `anthropic-prompt-eval` の Claude 向けガードレールのガイダンスとは別

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 料金（取得していない）。SCC は https://cloud.google.com/security-command-center/pricing、他のプロダクトは各プロダクトの pricing ページ（最終 URL は公式で確認）
- SCC の検出結果ごとの個別ページ（`security-command-center/docs/findings/` 配下 215 件。検出器のカタログ）
- SCC Enterprise 専用機能（ケース・プレイブック・SecOps・SIEM / SOAR 設定・AWS / Azure 接続など 36 ページ）。ティアの説明と告知だけ `scc-overview-tiers/service-tiers.md` と `deprecations.md` にある
- SCC 版 Assured OSS（`aoss-*`）。Assured OSS 本体は `gcp-security`。SCC 版は対応パッケージの一覧が大半のため未収録
- 単独で非常に長いため未収録のページ: SHA の検出結果ごとの修正手順（`how-to-remediate-security-health-analytics-findings`）・Assured Workloads の Cloud Control / フレームワーク / 対応プロダクトの一覧（`cloud-control-reference`・`framework-reference`・`supported-products`）・Compliance Manager のフレームワーク / Cloud Controls の一覧（`compliance-manager-frameworks`・`compliance-manager-cloud-controls`）・Container Threat Detection の使い方とテスト・Model Armor のプロンプトと応答のサニタイズ（`sanitize-prompts-responses`、言語別コード）・フロア設定（`configure-floor-settings`）・Assured Workloads フォルダの作成（`create-folder`）
- Model Armor の画像のスクリーニング（`model-armor/screen-images`。Markdown 版が取得できなかった）
- Sovereign Controls by Partners のパートナー向けガイド（`sovereign-partners/guides/**` 16 件。公式ページが取得できなかった）と旧 T-Systems Sovereign Cloud
- Assured Workloads のコントロールパッケージの大半（FedRAMP・CJIS・ITAR・各国のデータ境界等。IL4 と EU Data Boundary のみ収録）。Access Approval・Key Access Justifications・Access Transparency・Audit Manager・Risk Manager・Sovereign Controls のデータ境界（イタリア・サウジアラビア等）の一部ページ
- Secure Access Connect・Google Cloud のセキュリティのホワイトペーパー・コンプライアンス提供物の紹介
- Secured Landing Zone（公式ガイドが sitemap に無く、IAM ロールのみ `references/iam/securedlandingzone.md`）
- `gcloud kms`・鍵・シークレット・証明書・IAP・VPC Service Controls・Cloud Armor のガイド（`gcp-security`）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-18（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分: gcloud 593.0.0 の help・IAM roles-permissions reference・Discovery document）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/` は機械生成（Discovery は `google-api-python-client` 同梱の `main` 時点、commit SHA は未記録）。他の 17 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ。`web-security-scanner` は alpha のみ、`workspace-key-access` は beta のみ
- 公式の例の一部は安全性・正しさのため修正済み。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行があり、`## Notes` に理由がある
- 取得後に公式ページが移動したものがある（SCC 旧パスの Model Armor ページは `model-armor/` へ、Sovereign Controls の旧パスは `data-boundaries/` へ解決）。各ページは現行 URL を `source:` に記録している
- 非推奨・停止（日付は `scc-overview-tiers/deprecations.md` の原文どおり）:
  - SCC Enterprise サービスティア: 非推奨 May 21, 2026、停止 On or after May 21, 2027。該当組織は Premium へ自動で移行する（`scc-overview-tiers/service-tiers.md`・`deprecations.md`）
  - Data Security Posture Management（DSPM）: 非推奨 September 14, 2026、停止 On or after February 1, 2027。新規組織は利用不可（`ai-protection-ciem-dspm-risk-manager/dspm-data-security.md`・`scc-overview-tiers/deprecations.md`）
  - Artifact guard with CI/CD integration: 非推奨 September 30, 2026、停止 On or after October 30, 2026（`scc-overview-tiers/deprecations.md`。ページは未収録）
  - 過去の停止（Rapid Vulnerability Detection・SHA の手動の状態変更・SHA のセキュリティマークによる allowlist・Asset API と `gcloud scc assets`（`update-marks` を除く））は `scc-overview-tiers/deprecations.md` の表に残る
- Preview の機能（外部公開の検出結果・AWS の VM Threat Detection 等）は各ページが Preview と明記している。前提のティアと版を確認してから当てはめる
- SCC のティア・検出器・フレームワークは頻繁に更新され、検出器は事前の告知なく停止されうる（`deprecations.md`）。新しいフラグ・機能は `gcloud help` と公式 reference で確認する
