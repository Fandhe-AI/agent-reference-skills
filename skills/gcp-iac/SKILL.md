---
name: gcp-iac
description: >
  Google Cloud (GCP) の Infrastructure Manager (Terraform デプロイ・preview・deployment groups) と Terraform on Google Cloud (google / google-beta provider, GCS state backend, import / bulk export, best practices, ポリシー検証 gcloud beta terraform vet)。Config Connector (KRM)・fleet packages (configdelivery)・Deployment Manager 終了 (DM Convert)・Runtime Configurator。Config Controller は gcp-gke。
user-invocable: false
---

# gcp-iac

Google Cloud (GCP) の Infrastructure as Code 系スキル。Infrastructure Manager（deployment・revision・preview・deployment groups・サービスアカウント・Terraform バージョン・state ファイル・Cloud Build による Git 自動化・Organization Policy カスタム制約）、Terraform on Google Cloud（`google` / `google-beta` provider・認証・Cloud Storage への state 保存・import と bulk export・ベストプラクティス・CI/CD・ポリシー検証 `gcloud beta terraform vet`）、Config Connector（KRM で Google Cloud リソースを管理する Kubernetes アドオン・インストール・reconciliation・export / bulk-export）、fleet packages（`configdelivery`）、Deployment Manager の終了と DM Convert による Terraform / KRM への移行、Runtime Configurator を扱う。gcloud 3 グループ（`infra-manager` / `deployment-manager` / `runtime-config`）・REST 3 API・IAM 4 ファイルの機械生成ページを併せて収録する。

参照本文は英語（公式ドキュメントの原語）。Terraform CLI・HCL 言語そのものは HashiCorp のドキュメントが正で、本スキルは Google Cloud 側の使い方（provider・認証・state・運用）のみを扱う。

**Deployment Manager は終了している**（`deployment-manager-runtime-configurator/deprecations.md`）。公式の記述は 2026-04-01 にサポート終了（docs の索引では 2026-03-31 終了と書かれており、両方を原文のまま残している）、2026-06-30 以降は新規ユーザーがブロックされ、2027-06-30 以降はサービスが停止（turn-down）される、というもの。移行先は Infrastructure Manager で、変換ツールは DM Convert（Preview）。新規には使わない。

**Runtime Configurator は Beta** で、非推奨の告知は確認できていない。**Infrastructure Manager の Terraform 1.2.3 は非推奨**で、日付は `infrastructure-manager-deployments/terraform-version-deprecation.md` に従う。**ポリシー検証（`gcloud beta terraform vet`）と fleet packages は Preview**。

## ディレクトリ構成

```text
skills/gcp-iac/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0 の help（3 グループ）
      README.md
      infra-manager/              # Infrastructure Manager
        README.md
        infra-manager.md ... infra-manager-resources.md   # 9 ファイル（deployments / previews / revisions /
                                                          # resources / resource-changes / resource-drifts /
                                                          # terraform-versions / automigrationconfig）
      deployment-manager/         # Deployment Manager（終了）
        README.md
        deployment-manager-deployments.md ... deployment-manager-types.md   # 6 ファイル
      runtime-config/             # Runtime Configurator（Beta）
        README.md
        runtime-config-configs.md
    rest/                         # 機械生成: Discovery 由来のメソッド表
      README.md
      config/                     # Infrastructure Manager API
        README.md
        config.md
      deploymentmanager/          # Cloud Deployment Manager V2 API
        README.md
        deploymentmanager.md
      runtimeconfig/              # Cloud Runtime Configuration API
        README.md
        runtimeconfig.md
    rest-schemas/                 # 機械生成: Discovery 由来のメッセージスキーマ
      README.md
      config/
        README.md
        config.md
      deploymentmanager/
        README.md
        deploymentmanager.md
      runtimeconfig/
        README.md
        runtimeconfig.md
    iam/                          # 機械生成: IAM roles-permissions reference
      README.md
      config.md                   # Infrastructure Manager
      configdelivery.md           # Config Delivery（fleet packages）
      deploymentmanager.md
      runtimeconfig.md
    infrastructure-manager-deployments/      # 概要・権限・サービスアカウント・Terraform バージョン・deployment の作成/更新/削除・state
      README.md
      <page>.md
    infrastructure-manager-previews-groups/  # preview・import・deployment groups・カスタム制約・annotations
      README.md
      <page>.md
    terraform-basics-state-import/           # IaC ツール比較・provider・認証・基本コマンド・state・import / export
      README.md
      <page>.md
    terraform-best-practices-cicd/           # スタイル・root / reusable modules・テスト・運用・GitOps CI/CD
      README.md
      <page>.md
    terraform-policy-validation/             # gcloud beta terraform vet・policy library・制約テンプレート
      README.md
      <page>.md
    config-connector-install-resources/      # Config Connector の概要・インストール・リソース管理
      README.md
      <page>.md
    config-connector-operations/             # reconciliation・競合・export・IAM・トラブルシューティング
      README.md
      <page>.md
    config-delivery-fleet-packages/          # fleet packages（FleetPackage API・ロールアウト）
      README.md
      <page>.md
    deployment-manager-runtime-configurator/ # Deployment Manager 終了・DM Convert・Runtime Configurator
      README.md
      <page>.md
```

`references/gcloud/` のグループ（3）: `infra-manager` / `deployment-manager` / `runtime-config`。`references/rest/` `references/rest-schemas/` の API（3）: `config`（Infrastructure Manager API v1）/ `deploymentmanager`（v2・v2beta・alpha）/ `runtimeconfig`（v1・v1beta1）。各メソッドの `Versions` 行でどのバージョンが定義するかを確認する。`references/iam/` のファイル（4）: `config` / `configdelivery` / `deploymentmanager` / `runtimeconfig`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）。製品の選択に迷うときは `terraform-basics-state-import/iac-overview.md`
2. gcloud コマンド → `references/gcloud/README.md` からグループを選び、グループの README.md → コマンドページへ。Infrastructure Manager は `infra-manager`、Runtime Configurator は `runtime-config`、Deployment Manager は `deployment-manager`
3. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`。`<api>` は `config` / `deploymentmanager` / `runtimeconfig` の 3 つ
4. IAM ロール・権限 → `references/iam/README.md` の索引から引く。ロール ID（例: `roles/config.admin`・`roles/deploymentmanager.editor`・`roles/runtimeconfig.admin`）で `references/iam/` 配下を grep して該当ファイルを特定する。Infrastructure Manager の事前定義ロールの解説は `infrastructure-manager-deployments/access-control.md`
5. Terraform の state・import・bulk export は `terraform-basics-state-import`（Terraform 側）と `config-connector-operations`（Config Connector の `config-connector bulk-export`）で別物。Infrastructure Manager の deployment への取り込みは `infrastructure-manager-previews-groups/import-resources.md`
6. Deployment Manager からの移行は `deployment-manager-runtime-configurator/deprecations.md`（日付・比較）→ `dm-convert.md` → `convert.md`
7. 他製品のリソース設定（Terraform の各リソース引数）や HashiCorp 側の仕様は他スキル・公式（下記「他スキルとの使い分け」「対象外」）

`samples/` と `scripts/` は本スキルに無い。コードは各ガイドのコードブロックを引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Infrastructure Manager の概要・API の有効化・事前定義ロール・サービスアカウント（別プロジェクトを含む） | infrastructure-manager-deployments | [references/infrastructure-manager-deployments/README.md](references/infrastructure-manager-deployments/README.md) |
| Terraform の対応バージョン・バージョン非推奨と自動移行・制約・provider | infrastructure-manager-deployments | [references/infrastructure-manager-deployments/README.md](references/infrastructure-manager-deployments/README.md) |
| deployment の作成（Cloud Storage・Git・ローカル）・更新（revision）・削除・一覧・リソースの確認 | infrastructure-manager-deployments | [references/infrastructure-manager-deployments/README.md](references/infrastructure-manager-deployments/README.md) |
| Cloud Build trigger による preview / deploy の Git 自動化・state ファイルのロックとダウンロード・エラーの切り分け | infrastructure-manager-deployments | [references/infrastructure-manager-deployments/README.md](references/infrastructure-manager-deployments/README.md) |
| preview（terraform plan）の作成・結果のエクスポート・drift と resource changes の確認・preview の削除 | infrastructure-manager-previews-groups | [references/infrastructure-manager-previews-groups/README.md](references/infrastructure-manager-previews-groups/README.md) |
| deployment 削除前の DELETE モード preview・既存リソースの import | infrastructure-manager-previews-groups | [references/infrastructure-manager-previews-groups/README.md](references/infrastructure-manager-previews-groups/README.md) |
| deployment groups（作成・provision・update・deprovision）・Organization Policy カスタム制約・annotations と labels | infrastructure-manager-previews-groups | [references/infrastructure-manager-previews-groups/README.md](references/infrastructure-manager-previews-groups/README.md) |
| IaC ツール（Terraform・Infrastructure Manager・Config Connector 等）の選び方・`google` / `google-beta` provider・ブループリント | terraform-basics-state-import | [references/terraform-basics-state-import/README.md](references/terraform-basics-state-import/README.md) |
| Terraform のインストール・認証（ADC・impersonation・Workload Identity Federation）・基本コマンド・VM 作成のクイックスタート | terraform-basics-state-import | [references/terraform-basics-state-import/README.md](references/terraform-basics-state-import/README.md) |
| Cloud Storage バケットへの state 保存・既存リソースの import（command・block）・bulk export による HCL 生成 | terraform-basics-state-import | [references/terraform-basics-state-import/README.md](references/terraform-basics-state-import/README.md) |
| Terraform のスタイル・root module / reusable module の設計・依存関係・設定間の連携 | terraform-best-practices-cicd | [references/terraform-best-practices-cicd/README.md](references/terraform-best-practices-cicd/README.md) |
| Terraform のセキュリティ・テスト・バージョン管理・運用、Secure Source Manager と Cloud Build による GitOps CI/CD | terraform-best-practices-cicd | [references/terraform-best-practices-cicd/README.md](references/terraform-best-practices-cicd/README.md) |
| `gcloud beta terraform vet` によるポリシー検証・クイックスタート・終了コード・CI/CD への組み込み | terraform-policy-validation | [references/terraform-policy-validation/README.md](references/terraform-policy-validation/README.md) |
| policy library・Terraform 制約（resource change）・CAI 制約のテンプレート、terraform-validator からの移行、検証のトラブルシューティング | terraform-policy-validation | [references/terraform-policy-validation/README.md](references/terraform-policy-validation/README.md) |
| Config Connector の概要・インストール方式（GKE アドオン・手動）・namespaced / cluster モード | config-connector-install-resources | [references/config-connector-install-resources/README.md](references/config-connector-install-resources/README.md) |
| Config Connector のリソース作成・project / folder / organization の指定・リソース参照・`resourceID`・既存リソースの取得（acquire）・annotations・対応リソースの種類 | config-connector-install-resources | [references/config-connector-install-resources/README.md](references/config-connector-install-resources/README.md) |
| Config Connector の reconciliation・競合の防止・外部管理フィールド・トラブルシューティング・ベストプラクティス | config-connector-operations | [references/config-connector-operations/README.md](references/config-connector-operations/README.md) |
| `config-connector export` / `bulk-export`・IAM 権限・RBAC とマルチテナント分離・Secret の受け渡し | config-connector-operations | [references/config-connector-operations/README.md](references/config-connector-operations/README.md) |
| fleet packages（`FleetPackage` API・variants・ロールアウト戦略）の概念・作成・更新・クイックスタート | config-delivery-fleet-packages | [references/config-delivery-fleet-packages/README.md](references/config-delivery-fleet-packages/README.md) |
| Deployment Manager の基礎・終了日程・Infrastructure Manager との比較 | deployment-manager-runtime-configurator | [references/deployment-manager-runtime-configurator/README.md](references/deployment-manager-runtime-configurator/README.md) |
| DM Convert による Terraform / KRM への変換・apply・import・abandon の手順とベストプラクティス | deployment-manager-runtime-configurator | [references/deployment-manager-runtime-configurator/README.md](references/deployment-manager-runtime-configurator/README.md) |
| Runtime Configurator（Config・variable・waiter・watcher）の作成・読み書き・アクセス制御 | deployment-manager-runtime-configurator | [references/deployment-manager-runtime-configurator/README.md](references/deployment-manager-runtime-configurator/README.md) |
| gcloud コマンド（`infra-manager` / `deployment-manager` / `runtime-config`）を調べたい | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| Infrastructure Manager のコマンド（deployments・previews・revisions・resources・resource-changes・resource-drifts・terraform-versions） | gcloud/infra-manager | [references/gcloud/infra-manager/README.md](references/gcloud/infra-manager/README.md) |
| Deployment Manager のコマンド（deployments・manifests・operations・resources・types・type-providers） | gcloud/deployment-manager | [references/gcloud/deployment-manager/README.md](references/gcloud/deployment-manager/README.md) |
| Runtime Configurator のコマンド（`runtime-config configs` 配下） | gcloud/runtime-config | [references/gcloud/runtime-config/README.md](references/gcloud/runtime-config/README.md) |
| REST のメソッド・パスを調べたい | rest | [references/rest/README.md](references/rest/README.md) |
| 各 API のメソッド | rest/`<api>`（`config` / `deploymentmanager` / `runtimeconfig`） | [references/rest/config/README.md](references/rest/config/README.md)、[references/rest/deploymentmanager/README.md](references/rest/deploymentmanager/README.md)、[references/rest/runtimeconfig/README.md](references/rest/runtimeconfig/README.md) |
| REST のリクエスト・レスポンスのメッセージ型を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md) |
| 各 API のメッセージ型 | rest-schemas/`<api>`（rest/ と同じ 3 API） | [references/rest-schemas/config/README.md](references/rest-schemas/config/README.md)、[references/rest-schemas/deploymentmanager/README.md](references/rest-schemas/deploymentmanager/README.md)、[references/rest-schemas/runtimeconfig/README.md](references/rest-schemas/runtimeconfig/README.md) |
| ロール ID の権限一覧・事前定義ロールを調べたい（`roles/config.*` / `roles/configdelivery.*` / `roles/deploymentmanager.*` / `roles/runtimeconfig.*`） | iam | [references/iam/README.md](references/iam/README.md) |

## 他スキルとの使い分け

- `gcp-foundation` — IAM・サービスアカウント・Workload Identity Federation（Terraform 実行 ID の考え方）・Organization Policy カスタム制約の一般論・リソース階層・Cloud Asset Inventory。`gcloud resource-config` グループ（bulk-export・terraform generate-import）も同スキル。本スキルは Terraform 側の認証手順と Infrastructure Manager 固有の制約・ロール
- `gcp-cli` — gcloud のインストール・設定・認証。`gcloud terraform vet` グループのコマンドページも同スキル。本スキルは `gcloud beta terraform vet` を使うポリシー検証のガイド
- `gcp-gke` — GKE・Fleet・Config Sync・Policy Controller・Config Controller・`gcloud container fleet packages` グループ。Config Controller は Config Connector をマネージドで提供する別製品のため、本スキルは Config Connector 本体（アドオン・手動インストール）と fleet packages のガイド
- `gcp-devops` — Cloud Build の private pool・trigger、Secure Source Manager、Application Design Center（Terraform を生成する側）。本スキルは Infrastructure Manager や Terraform と組み合わせる CI/CD のガイド
- `gcp-security-compliance` — Security Command Center の IaC 検証（`validate-iac`）。本スキルは `gcloud beta terraform vet` と policy library
- `gcp-security` — Secret Manager・Cloud KMS・VPC Service Controls。state や変数に入れる機密情報の保管先
- `gcp-storage` — state の置き場になる Cloud Storage バケット（バージョニング・アクセス制御）
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `github-docs` — GitHub Actions のワークフロー。本スキルは Google Cloud 側（Infrastructure Manager・Cloud Build）の自動化のみ
- 各プロダクトのスキル — Terraform で作るリソースの設定項目（引数・制約・サイズ）は各製品のスキルが担当。Terraform CLI・HCL 言語・Terraform Cloud は HashiCorp の公式ドキュメントが正

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- Config Connector のリソース別リファレンス（268 ページ。`config-connector-install-resources/resources-reference-overview.md` のリソース種別の概観のみ）
- Config Controller（`gcp-gke` の担当）
- HashiCorp の Terraform CLI・HCL 言語・Terraform Cloud、Terraform registry のリソースドキュメント
- Pulumi・Crossplane など他の IaC ツール
- 他プロダクトの Terraform ページ（77 ページ。リソースの設定は各製品のスキルが担当）
- `docs/terraform/tpc-differences`（取得時に 404）
- 料金（取得していない）
- Console の操作手順の細部（各ページの Notes に省略した形式を記載）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-19（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分。gcloud 593.0.0 の help、Discovery document、roles-permissions ページ。各ページ Notes に記載）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/rest/` `references/rest-schemas/` `references/iam/` は機械生成。他の 9 カテゴリは公式ガイド由来の手書き
- 変更・終了（references で確認したもの）:
  - Deployment Manager: 2026-04-01 にサポート終了（docs の索引は 2026-03-31）、2026-06-30 以降は新規ユーザーをブロック、2027-06-30 以降はサービス停止（`deployment-manager-runtime-configurator/deprecations.md`）
  - Infrastructure Manager の Terraform 1.2.3 は非推奨（日付は `infrastructure-manager-deployments/terraform-version-deprecation.md`）
- Preview の機能: ポリシー検証（`gcloud beta terraform vet`）、fleet packages、DM Convert、`bulk-export`（`terraform-basics-state-import/export.md`）。仕様は変わりうる
- Runtime Configurator は Beta で、非推奨の告知は確認できていない
- 新しいメソッド・機能は公式 reference で確認する
