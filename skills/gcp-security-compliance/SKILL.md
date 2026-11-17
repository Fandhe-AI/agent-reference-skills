---
name: gcp-security-compliance
description: >
  Google Cloud (GCP) の Security Command Center (SCC)・Security posture・Model Armor・Assured Workloads・Access Approval/Transparency・Key Access Justifications (KAJ)・Standard/Premium/Enterprise・findings・Event/Container/VM Threat Detection・Security Health Analytics・Web Security Scanner・AI Protection・CIEM・DSPM・Risk Manager・Audit/Compliance Manager・Sovereign Controls by Partners。KMS/IAP は gcp-security
user-invocable: false
---

# gcp-security-compliance

Google Cloud (GCP) のセキュリティ態勢・脅威検出・コンプライアンス系スキル。Security Command Center（SCC。Standard / Premium / Enterprise（非推奨）のサービスティア・アクティベーション・アクセス制御・データ所在地・検出結果のクラス / 重大度 / 状態 / ミュート / セキュリティマーク・API / 通知 / エクスポート・Event Threat Detection / VM Threat Detection / Cloud Run Threat Detection / Agent Platform Threat Detection・Security Health Analytics・脆弱性評価・Web Security Scanner・攻撃の発生可能性（attack exposure）と有害な組み合わせ（toxic combinations））、Security posture と IaC 検証、AI Protection・CIEM・DSPM（非推奨）・Risk Manager、Compliance Manager（フレームワーク・Cloud Controls・CEL）、Model Armor（テンプレート・フィルタ・統合・ロギング）、Assured Workloads（フレームワーク・コントロールパッケージ・Cloud Controls・EU Data Boundary・IL4）、Access Approval・Access Transparency・Key Access Justifications（KAJ）、Audit Manager、Sovereign Controls by Partners を扱う。加えて gcloud 8 グループ・REST（Discovery）7 API・IAM ロールを収録する。分割投入中のため、未投入のカテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas` / `scc-overview-tiers` / `scc-findings` / `scc-api-notifications-export` / `scc-threat-detection` / `scc-vulnerabilities-sha` / `scc-web-security-scanner` / `scc-security-posture-iac` / `scc-attack-exposure` / `compliance-manager` / `model-armor` / `model-armor-templates` / `assured-workloads-cloud-controls` / `audit-manager` / `sovereign-controls-by-partners`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。SCC の機械生成ページと手書きガイドは SCC のティア表記（Standard-legacy / Standard / Premium / Enterprise（Deprecated））を原文どおりに残す。

**鍵・シークレット・証明書・アクセス境界（Cloud KMS・Cloud HSM・Cloud EKM・CMEK・Autokey・Secret Manager・Parameter Manager・Certificate Manager・Certificate Authority Service・IAP・VPC Service Controls・Access Context Manager・Cloud Armor・Binary Authorization・Artifact Analysis・Identity Platform・Web Risk）は `gcp-security`**。Key Access Justifications のガイドは本スキル、`gcloud kms` と KAJ ポリシーの REST（`cloudkms`）は `gcp-security`。

## ディレクトリ構成

```text
skills/gcp-security-compliance/
  SKILL.md
  references/
    ai-protection-ciem-dspm-risk-manager/  # AI Protection・CIEM・DSPM（非推奨）・Risk Manager
      README.md
      <page>.md                   # 例: dspm-data-security.md
    assured-workloads/            # Assured Workloads の概要・主要概念・責任共有・フレームワーク・鍵・移行・EU Data Boundary
      README.md
      <page>.md
    access-approval-transparency-kaj/  # Access Approval・Access Transparency・Key Access Justifications・管理アクセスの総覧
      README.md
      <page>.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
2. 鍵・シークレット・証明書・IAP・VPC Service Controls・Cloud Armor は `gcp-security`。IAM の基盤・Organization Policy・Privileged Access Manager は `gcp-foundation`
3. 廃止・縮退を確認するときは `scc-overview-tiers/deprecations.md`（後続 PR で投入）（SCC の廃止表）、`scc-overview-tiers/service-tiers.md`（後続 PR で投入）（Enterprise ティア）、`ai-protection-ciem-dspm-risk-manager/dspm-data-security.md`（DSPM）を引く

未投入カテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas` / `scc-overview-tiers` / `scc-findings` / `scc-api-notifications-export` / `scc-threat-detection` / `scc-vulnerabilities-sha` / `scc-web-security-scanner` / `scc-security-posture-iac` / `scc-attack-exposure` / `compliance-manager` / `model-armor` / `model-armor-templates` / `assured-workloads-cloud-controls` / `audit-manager` / `sovereign-controls-by-partners`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| AI Protection・CIEM・DSPM（非推奨）・Risk Manager（Cyber Insurance Hub）を知りたい | ai-protection-ciem-dspm-risk-manager | [references/ai-protection-ciem-dspm-risk-manager/README.md](references/ai-protection-ciem-dspm-risk-manager/README.md) |
| Assured Workloads の概要・主要概念・責任共有・フレームワーク・コントロールパッケージ・鍵管理・移行・EU Data Boundary を知りたい | assured-workloads | [references/assured-workloads/README.md](references/assured-workloads/README.md) |
| Access Approval・Access Transparency・Key Access Justifications（KAJ）の概要・構成・既定ポリシー・ログを知りたい | access-approval-transparency-kaj | [references/access-approval-transparency-kaj/README.md](references/access-approval-transparency-kaj/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `iam` / `rest` / `rest-schemas` / `scc-overview-tiers` / `scc-findings` / `scc-api-notifications-export` / `scc-threat-detection` / `scc-vulnerabilities-sha` / `scc-web-security-scanner` / `scc-security-posture-iac` / `scc-attack-exposure` / `compliance-manager` / `model-armor` / `model-armor-templates` / `assured-workloads-cloud-controls` / `audit-manager` / `sovereign-controls-by-partners`

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
- `gcp-observability`（予定）— Cloud Logging・Cloud Audit Logs・Cloud Monitoring。Access Transparency のログの読み方と Model Armor のロギング設定は本スキル
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
- `references/gcloud/`（後続 PR で投入） `references/iam/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（Discovery は `google-api-python-client` 同梱の `main` 時点、commit SHA は未記録）。他の 17 カテゴリは公式ガイド由来の手書き
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
