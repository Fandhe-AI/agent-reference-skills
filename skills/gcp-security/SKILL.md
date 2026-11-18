---
name: gcp-security
description: >
  Google Cloud (GCP) の Cloud KMS・Secret Manager・Parameter Manager・Certificate Manager・CA Service (CAS)・IAP・VPC Service Controls・Access Context Manager・Cloud Armor・Cloud HSM・Cloud EKM・Autokey・CMEK・Public CA・Chrome Enterprise Premium (旧 BeyondCorp)・Binary Authorization・Artifact Analysis (旧 Container Analysis)・On-Demand Scanning・Assured OSS・Identity Platform・Web Risk。SCC 等は gcp-security-compliance。
user-invocable: false
---

# gcp-security

Google Cloud (GCP) のセキュリティ基盤スキル（鍵・秘密情報・証明書・アクセス境界・エッジ防御・ソフトウェアサプライチェーン）。Cloud KMS（鍵・key ring・保護レベル・Cloud HSM（Single-tenant / Bare Metal）・Cloud EKM・鍵のインポート・Autokey・CMEK）、Secret Manager（global / regional secrets・ローテーション）、Parameter Manager、Certificate Manager（Google マネージド証明書・trust config・Public CA・2nd gen）、Certificate Authority Service（CA プール・ルート CA・証明書リクエスト）、Public CA（`gcloud publicca`）を扱う。アクセス制御は Identity-Aware Proxy（IAP。有効化・署名付きヘッダー・TCP 転送・オンプレミス・外部 ID）、Chrome Enterprise Premium（旧 BeyondCorp Enterprise。証明書ベースのアクセス・Endpoint Verification）、Access Context Manager（アクセスレベル・アクセスポリシー）、VPC Service Controls（サービス境界・上り / 下りルール・ドライラン）、Cloud Armor（セキュリティポリシー・WAF・レート制限・Adaptive Protection・bot 管理・DDoS 対策）。サプライチェーンは Binary Authorization、Artifact Analysis（旧 Container Analysis。Container Scanning・On-Demand Scanning・SBOM・VEX）、Assured Open Source Software、Software Supply Chain Security。加えて Identity Platform（CIAM）と Web Risk のガイドと、gcloud 11 グループ・REST（Discovery）13 API・IAM ロール 15 サービスを収録する。分割投入中のため、未投入のカテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas` / `kms-concepts` / `kms-key-operations` / `kms-hsm-ekm-import` / `kms-cmek-autokey` / `secret-manager` / `parameter-manager` / `iap-tcp-external-identities` / `vpc-service-controls-concepts` / `vpc-service-controls-perimeters` / `software-supply-chain` / `identity-platform` / `web-risk`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。`pam`（Privileged Access Manager）と `fault-testing`（Fault Injection Testing）の gcloud は本スキルの機械生成ページのみで、ガイドは持たない（PAM のガイドは `gcp-foundation`）。

**Security Command Center（SCC）・Security posture・Web Security Scanner・Model Armor・Assured Workloads・Access Approval / Access Transparency・Key Access Justifications・Audit Manager・Compliance Manager・Sovereign Controls by Partners は姉妹スキル `gcp-security-compliance`**（`gcloud scc` / `assured` / `access-approval` / `audit-manager` / `compliance-manager` / `model-armor` / `web-security-scanner` / `workspace-key-access` もそちら）。

## ディレクトリ構成

```text
skills/gcp-security/
  SKILL.md
  references/
    certificate-manager/          # Certificate Manager: コアコンポーネント・ドメイン認可・デプロイ・trust config・Public CA・2nd gen
      README.md
      <page>.md                   # 例: v2-overview.md
    certificate-authority-service/  # CA Service: 概念・CA プール・ルート CA・gcloud による証明書リクエスト
      README.md
      <page>.md
    iap-overview-setup/           # IAP の概要・Compute Engine / Cloud Run / GKE / App Engine での有効化・アクセス管理・OAuth 構成
      README.md
      <page>.md
    iap-app-authentication/       # 署名付きヘッダーの検証・プログラムによる認証・セッション・クエリパラメータとヘッダー
      README.md
      <page>.md
    chrome-enterprise-premium/    # Chrome Enterprise Premium・証明書ベースのアクセス（CBA）・Endpoint Verification
      README.md
      <page>.md
    access-context-manager/       # アクセスレベル・アクセスポリシー・スコープ付きポリシー・アクセスバインディング
      README.md
      <page>.md
    cloud-armor-security-policies/  # Cloud Armor の概要・セキュリティポリシー・ルール言語・階層型ポリシー・ネットワークエッジポリシー
      README.md
      <page>.md
    cloud-armor-waf-ddos-bots/    # WAF・レート制限・Adaptive Protection・bot 管理・高度なネットワーク DDoS・Armor Enterprise・脅威インテリジェンス
      README.md
      <page>.md
    binary-authorization/         # Binary Authorization: 概念・構成証明・ポリシー YAML・継続的検証（CV）・legacy CV の廃止
      README.md
      <page>.md                   # 例: deprecation-cv-project-singleton-policy.md
    artifact-analysis/            # Artifact Analysis: コンテナスキャン・On-Demand Scanning・メタデータ・SBOM・脆弱性・VEX
      README.md
      <page>.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
2. Cloud KMS は 4 カテゴリ、IAP は 3 カテゴリ、VPC Service Controls と Cloud Armor は 2 カテゴリに分かれる。概念か操作かで選ぶ
3. 非推奨を確認するときは、下記「鮮度・ライセンス・既知の制約」に挙げたページを引く
4. SCC・Assured Workloads・Access Approval 等は `gcp-security-compliance`

未投入カテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas` / `kms-concepts` / `kms-key-operations` / `kms-hsm-ekm-import` / `kms-cmek-autokey` / `secret-manager` / `parameter-manager` / `iap-tcp-external-identities` / `vpc-service-controls-concepts` / `vpc-service-controls-perimeters` / `software-supply-chain` / `identity-platform` / `web-risk`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Certificate Manager の証明書・証明書マップ・DNS 認証・trust config（mTLS）・Public CA・2nd gen | certificate-manager | [references/certificate-manager/README.md](references/certificate-manager/README.md) |
| Certificate Authority Service の CA プール・ルート CA・発行ポリシー・証明書のリクエスト | certificate-authority-service | [references/certificate-authority-service/README.md](references/certificate-authority-service/README.md) |
| IAP の概要・Compute Engine / Cloud Run / GKE / App Engine での有効化・アクセス管理・カスタム OAuth・Google 管理の OAuth クライアント | iap-overview-setup | [references/iap-overview-setup/README.md](references/iap-overview-setup/README.md) |
| IAP の署名付きヘッダー（`x-goog-iap-jwt-assertion`）検証・プログラムによる認証・セッション | iap-app-authentication | [references/iap-app-authentication/README.md](references/iap-app-authentication/README.md) |
| Chrome Enterprise Premium（旧 BeyondCorp Enterprise）・証明書ベースのアクセス（CBA）・Endpoint Verification・デバイスのアクセスレベル | chrome-enterprise-premium | [references/chrome-enterprise-premium/README.md](references/chrome-enterprise-premium/README.md) |
| Access Context Manager のアクセスレベル（基本 / カスタム）・アクセスポリシー・スコープ付きポリシー・アクセスバインディング | access-context-manager | [references/access-context-manager/README.md](references/access-context-manager/README.md) |
| Cloud Armor のセキュリティポリシー・ルール言語（CEL）・階層型ポリシー・ネットワークエッジポリシー・ベストプラクティス | cloud-armor-security-policies | [references/cloud-armor-security-policies/README.md](references/cloud-armor-security-policies/README.md) |
| Cloud Armor の WAF ルール・レート制限・Adaptive Protection・bot 管理・高度なネットワーク DDoS 対策・Armor Enterprise・脅威インテリジェンス | cloud-armor-waf-ddos-bots | [references/cloud-armor-waf-ddos-bots/README.md](references/cloud-armor-waf-ddos-bots/README.md) |
| Binary Authorization のポリシー YAML・構成証明（attestation）・継続的検証（CV）・legacy CV の廃止 | binary-authorization | [references/binary-authorization/README.md](references/binary-authorization/README.md) |
| Artifact Analysis のコンテナスキャン・On-Demand Scanning・SBOM・脆弱性の調査・note / occurrence・VEX | artifact-analysis | [references/artifact-analysis/README.md](references/artifact-analysis/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `iam` / `rest` / `rest-schemas` / `kms-concepts` / `kms-key-operations` / `kms-hsm-ekm-import` / `kms-cmek-autokey` / `secret-manager` / `parameter-manager` / `iap-tcp-external-identities` / `vpc-service-controls-concepts` / `vpc-service-controls-perimeters` / `software-supply-chain` / `identity-platform` / `web-risk`

## 他スキルとの使い分け

- `gcp-security-compliance` — Security Command Center（SCC）とその各サービス・Security posture・Web Security Scanner・Model Armor・Assured Workloads（Cloud Controls を含む）・Access Approval / Access Transparency・Key Access Justifications・Audit Manager・Compliance Manager・Sovereign Controls by Partners と、`gcloud scc` / `assured` / `access-approval` / `audit-manager` / `compliance-manager` / `model-armor` / `web-security-scanner` / `workspace-key-access`。本スキルは鍵・秘密情報・証明書・アクセス境界・エッジ防御・サプライチェーン
- `gcp-compute` — `gcloud compute security-policies` / `org-security-policies`（Cloud Armor のポリシーのリソース）・`gcloud compute ssl-certificates`・`start-iap-tunnel`・`ssh --tunnel-through-iap`・Compute REST・`roles/compute.*`、Shielded VM / Confidential Computing。本スキルは Cloud Armor・IAP・Certificate Manager の概念とガイド
- `gcp-gke` — `gcloud container binauthz`・GKE のセキュリティ・クラスターでの Binary Authorization の強制。本スキルは Binary Authorization の概念・ポリシー・構成証明
- `gcp-networking` — Cloud NGFW / firewall policies・Secure Web Proxy・Cloud IDS・`gcloud network-security`。本スキルは Cloud Armor（エッジ防御）と VPC Service Controls（API 境界）
- `gcp-load-balancing` — ロードバランサー・backend services・クラシックの SSL 証明書・SSL policies。Certificate Manager の証明書を LB に付ける手順は LB 側の `lb-tls` と距離線で分け、Certificate Manager のリソースの扱いは本スキル
- `gcp-foundation` — IAM・サービスアカウント・Workload / Workforce Identity Federation・Privileged Access Manager のガイド・Organization Policy・Cloud Asset Inventory・Identity Platform の REST API（`identitytoolkit`）。本スキルは `gcloud pam` と PAM の IAM ロールの機械生成ページと Identity Platform のガイド
- `gcp-run` — Cloud Run・App Engine。IAP 配下で動かす場合の有効化手順は本スキルの `iap-overview-setup`
- `gcp-storage` / `gcp-databases-relational` / `gcp-databases-nosql` — 各サービス側の CMEK 設定。鍵そのものと Autokey は本スキルの `kms-*`
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリの共通パターン
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-observability`（予定）— Cloud Logging・Cloud Audit Logs・Cloud Monitoring
- `gcp-devops`（予定）— Artifact Registry・Cloud Build・Cloud Deploy・`gcloud artifacts`（Artifact Analysis の `gcloud artifacts docker images scan` 等もこちら）
- `gcp-iac`（予定）— Terraform
- `gcp-ai-apis`（予定）— Sensitive Data Protection（DLP）・reCAPTCHA
- `gcp-messaging-workflows`（予定）— Pub/Sub
- `gcp-bigquery`（予定）— BigQuery
- `cloudflare-workers` — Cloudflare Workers の secrets は別物。Secret Manager は Google Cloud のシークレット管理
- `vercel` — Vercel の環境変数は別物。Secret Manager は Google Cloud のシークレット管理
- `supabase` / `better-auth` — Supabase Auth・Better Auth は別物。Identity Platform は Google Cloud の CIAM
- `docker` — イメージのビルド。本スキルはビルド後のスキャン・署名・デプロイ時検証（Artifact Analysis・Binary Authorization）

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 料金（取得していない）。各プロダクトの公式の料金ページで確認する
- 単独で 2,570 行を超える大型ページ: `kms/docs/kms-regulatory-compliance`（コントロールパッケージ別の KMS 対応。Assured Workloads と重なる）・`vpc-service-controls/docs/supported-products`（対応プロダクトと制限の一覧）・`kms/docs/create-key`（言語別の鍵作成手順）・`secret-manager/parameter-manager/docs/cmek`
- 予算で外した主なページ: Cloud HSM のクイックスタート（`kms/docs/hsm`）・事前構成 WAF ルールの一覧（`armor/docs/waf-rules`）・非対称鍵による署名の作成と検証（`kms/docs/create-validate-signatures`）・RSA 鍵による暗号化と復号（`kms/docs/encrypt-decrypt-rsa`）・パラメータからのシークレット参照（`parameter-manager/docs/reference-secrets-in-parameter`）
- 収録しなかったガイド群: KMS の鍵バージョン管理・非対称鍵の操作・ラベル・監査ログ・組織ポリシー、Secret Manager の regional secrets の個別手順（global 版と同じ手順のため概要と比較のみ）、Parameter Manager のバージョン・CMEK・リージョンパラメータ、Binary Authorization のポリシー作成・attestor・GKE / Cloud Run / Distributed Cloud の個別手順、VPC Service Controls の個別サービスの制限、Certificate Manager の個別デプロイ手順と発行構成・2nd gen の個別手順、CA Service の従属 CA・証明書テンプレート・CRL、Identity Platform の各ログイン方法・SAML・MFA と Web / iOS / Android の手順、Cloud Armor の WAF ルール一覧・ログ・CDN 連携、Access Context Manager・IAP・Chrome Enterprise Premium の個別手順
- EKM パートナー向けの資料（`kms/docs/ekm-partner/**`。取得不可）・Binary Authorization の `platform-policies/**`（取得不可）
- Firebase Authentication（Identity Platform との比較は `identity-platform` に 1 ページあるが、Firebase 側は対象外）
- Security Command Center・Assured Workloads 等（`gcp-security-compliance`）、Cloud NGFW・Secure Web Proxy・Cloud IDS（`gcp-networking`）、Cloud Logging・監査ログ（`gcp-observability`（予定））、Sensitive Data Protection・reCAPTCHA（`gcp-ai-apis`（予定））
- Java / Go / C# / PHP / C++ / Ruby の SDK

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-18（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分）、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/`（後続 PR で投入） `references/iam/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM roles-permissions reference / `google-api-python-client` 同梱の Discovery document（`main` 時点、commit SHA は未記録））。他の 22 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME と SYNOPSIS のみ。`fault-testing` は README 上 alpha コマンドのみ
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に理由を残す
- 取得後に公式ページの URL が移動したものがある。証明書ベースのアクセス（CBA）のページは内容が Chrome Enterprise Premium だが、現行の公式 URL は `access-context-manager/docs/` 配下（`chrome-enterprise-premium/` カテゴリに収録）。ページの `source:` と Notes は現行 URL を指す
- 非推奨・廃止（references で確認したもの）:
  - Web Risk Submission API は機能凍結・新規受付終了、遅くとも December 31, 2027 に廃止（`web-risk/submission-api.md`）
  - Binary Authorization の legacy continuous validation（CV）は April 15, 2024 から新規プロジェクトで有効化不可、May 1, 2025 に既存プロジェクトの Pod 監視を停止（`binary-authorization/deprecation-cv-project-singleton-policy.md`）。後継はチェックベースのプラットフォームポリシーによる CV（Preview。`binary-authorization/overview-cv.md`）
  - Cloud Armor の named IP address lists は非推奨で Google Threat Intelligence feeds を推奨（`cloud-armor-waf-ddos-bots/threat-intelligence.md`）。`evaluatePreconfiguredExpr()` は非推奨で `evaluatePreconfiguredWaf()` を推奨（`cloud-armor-security-policies/rules-language-reference.md`）。gcloud の `--action=redirect-to-recaptcha` も非推奨（`cloud-armor-waf-ddos-bots/bot-management.md`）
  - Compute Engine の CSEK は非推奨（`kms-concepts/key-management-service.md`）
  - CMEK 対応サービス一覧の Vertex AI Workbench managed / user-managed notebooks は Deprecated 表記（`kms-cmek-autokey/compatible-services.md`）
  - Certificate Manager の第 1 世代 API は非推奨ではない（`certificate-manager/v2-overview.md`）
- Assured Open Source Software には 2 系統ある。本スキルの `software-supply-chain` は `assured-open-source-software/` 配下のガイドで、Security Command Center Premium 版（`security-command-center/docs/aoss-*`）は `gcp-security-compliance` 側
- Public CA は Certificate Manager 経由のガイド（`certificate-manager/public-ca.md`）と `gcloud publicca` の機械生成ページで扱う
- 旧名: BeyondCorp Enterprise は Chrome Enterprise Premium に改称（gcloud グループと IAM サービスは `beyondcorp` のまま）、Container Analysis は Artifact Analysis に改称（API と IAM サービスは `containeranalysis` のまま）
- 新しいフラグ・機能は `gcloud help` と公式 reference で確認する
