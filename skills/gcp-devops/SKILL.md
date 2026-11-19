---
name: gcp-devops
description: >
  Google Cloud (GCP) の Cloud Build (cloudbuild.yaml・trigger)・Artifact Registry (Docker・remote / virtual・GCR 移行)・Cloud Deploy (pipeline・rollout・Skaffold)。Secure Source Manager・Developer Connect・App Hub・Application Design Center・App Lifecycle Manager (SaaS Runtime)・App Optimize・Developer Device Platform (DDP・Device Run)・Workload Manager。Artifact Analysis は gcp-security、Cloud Run は gcp-run。
user-invocable: false
---

# gcp-devops

Google Cloud (GCP) の CI/CD・成果物管理・ソース管理・アプリケーション管理系スキル。Cloud Build（`cloudbuild.yaml` のスキーマ・steps・substitutions・secrets・成果物・トリガー（Pub/Sub / webhook / 手動 / 承認 / スケジュール）・2nd gen リポジトリ接続（GitHub / GitLab / Bitbucket Cloud）・サービス アカウント・ビルドの来歴（provenance）・CMEK・private pool・言語別ビルドと Cloud Run / GKE へのデプロイ）、Artifact Registry（standard / remote / virtual リポジトリ・Docker / npm / Python / 汎用形式・認証・アクセス制御・CMEK・VPC Service Controls・cleanup policy・Container Registry からの移行）、Cloud Deploy（delivery pipeline / target / release / rollout・`clouddeploy.yaml`・Skaffold・GKE / Cloud Run / custom target・canary・automation・deploy hooks・検証・deploy policy）、Secure Source Manager と Cloud Source Repositories（廃止告知と移行）、Developer Connect（リポジトリ接続・insights）、App Hub（application・service・workload の登録）、Application Design Center（space・application template・catalog）、App Lifecycle Manager（旧 SaaS Runtime。SaaS オファリング・テナント・rollout・feature flags）、App Optimize・Developer Device Platform（Device Run）、Workload Manager（評価・カスタム ルール・SAP）を扱う。加えて gcloud 12 グループ・REST（Discovery）9 API・IAM 15 ファイルを収録する。分割投入中のため、未投入のカテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。

**Container Registry は停止済み**（`artifact-registry-docker-gcr-transition/transition-from-gcr.md`）。公式の記述は「Container Registry is deprecated. Effective March 18, 2025, Container Registry is shut down and writing images to Container Registry is unavailable.」で、Artifact Registry 上でホストされる `gcr.io` の URL（Google 提供のイメージを含む）は停止の影響を受けない（`gcr-repositories.md`）。生成ページの `iam/containerregistry.md` の Notes にも同じ告知がある。移行は Artifact Registry へ。

**Cloud Source Repositories は新規顧客が利用できない**（End of Sale）。`secure-source-manager/enable-disable-cloud-source-repositories.md` に「effective June 17, 2024」と記載され、停止日は未告知（`migration-guides.md` は「A shutdown date will be communicated at least one year before」の趣旨）。移行先は Secure Source Manager（`csr-ssm-migration-guide.md`・`csr-ssm-permission-mapping.md`）。gcloud の `source` グループと `iam/source.md` の Notes にも同日付の告知を出している。

**Skaffold は gcloud CLI から外れる予定**。`cloud-deploy-skaffold-targets/select-tool-version.md` ほか（`using-skaffold.md`・`getting-started-skaffold.md`・`managing-manifests.md`、計 4 ページ）に、「Skaffold will be removed from gcloud CLI releases after January 15, 2027」「the Skaffold GitHub repository will be archived on January 29, 2027」の Caution を載せている（取得 2026-11-19 時点）。`gcloud components install skaffold` に依存する手順は、導入方法を公式の Skaffold 導入ページ（<https://skaffold.dev/docs/install/>）で確認する。

## ディレクトリ構成

```text
skills/gcp-devops/
  SKILL.md
  references/
    artifact-registry-repositories/        # Artifact Registry の概要・リポジトリの概念・対応形式・作成・ロケーション・virtual の概要
      README.md
      <page>.md
    artifact-registry-remote-virtual/      # remote リポジトリ（上流・認証）・virtual リポジトリ（上流ポリシー）
      README.md
      <page>.md
    artifact-registry-docker-gcr-transition/  # Docker イメージの保存・認証・push / pull・名前・管理・コピー・Container Registry からの移行
      README.md
      <page>.md
    artifact-registry-npm-python-generic/  # npm・Python・汎用形式のパッケージ保存・認証・管理
      README.md
      <page>.md
    artifact-registry-access-cleanup/      # アクセス制御・CMEK・VPC Service Controls・成果物の保護・cleanup policy
      README.md
      <page>.md
    cloud-build-config-schema/             # Cloud Build の概要・ビルド構成ファイルのスキーマ・Cloud Builders
      README.md
      <page>.md
    cloud-build-config-steps/              # 基本構成・substitutions・secrets・ステップ間のデータ・実行順・成果物・CLI / API からの送信
      README.md
      <page>.md
    cloud-build-triggers/                  # トリガーの概要・作成・Pub/Sub / webhook / 手動 / 承認 / スケジュール
      README.md
      <page>.md
    cloud-build-repositories/              # リポジトリ接続（1st / 2nd gen）・GitHub / GitLab / Bitbucket Cloud の接続とビルド
      README.md
      <page>.md
    cloud-build-security-private-pools/    # サービス アカウント・来歴・CMEK・private pool・VPC Service Controls
      README.md
      <page>.md
    cloud-build-languages-deploy/          # Node.js / Python / コンテナのビルド・依存関係・Cloud Run / GKE へのデプロイ・ログ・高速化
      README.md
      <page>.md
    cloud-deploy-concepts-pipelines/       # Cloud Deploy の概要・用語・アーキテクチャ・構成ファイル・pipeline と target の作成・昇格
      README.md
      <page>.md
    cloud-deploy-skaffold-targets/         # Skaffold・マニフェスト・ツールの版・GKE / Cloud Run / GKE Enterprise / custom target・並列デプロイ
      README.md
      <page>.md
    cloud-deploy-strategies-rollouts/      # デプロイ戦略・canary・rollout の管理・ロールバック・デプロイ パラメータ
      README.md
      <page>.md
    cloud-deploy-automation-verification/  # automation・hooks・検証・分析・deploy policy・CI 統合・サービス アカウント・実行環境
      README.md
      <page>.md
    secure-source-manager/                 # Secure Source Manager と Cloud Source Repositories の廃止告知・移行
      README.md
      <page>.md
    developer-connect/                     # Developer Connect の概要・接続・アカウント コネクタ・insights
      README.md
      <page>.md
    app-hub/                               # App Hub の概要・概念・設定・リソースの登録・application の管理
      README.md
      <page>.md
    application-design-center/             # Application Design Center の概要・space・template・デプロイ・catalog・Terraform のインポート
      README.md
      <page>.md
    app-lifecycle-manager/                 # App Lifecycle Manager（旧 SaaS Runtime）の概要・SaaS オファリング・テナント・rollout・feature flags
      README.md
      <page>.md
    app-optimize-device-platform/          # App Optimize のレポート・Developer Device Platform（Device Run）
      README.md
      <page>.md
    workload-manager/                      # Workload Manager の評価・ルール・カスタム ルール・デプロイ・SAP の監視
      README.md
      <page>.md
```
- alpha のみのグループは `workload-manager` と `software-delivery-trust`、beta のみのグループは `app-optimize`。`design-center` は GA と alpha、`app-lifecycle-manager` は GA・alpha・beta のコマンドを持つ（gcloud 593.0.0 の生成ページで確認）
- `source` グループは Cloud Source Repositories（新規顧客は利用不可）。Secure Source Manager は `source-manager` グループ
- `deploy` グループの `releases create` の `--skaffold-file` 等は Skaffold に依存する。Skaffold の gcloud 同梱終了は上記の告知と `cloud-deploy-skaffold-targets/` を参照する
- `gcloud container images`（Container Registry 向けの旧コマンド）は `container` グループで `gcp-gke` の担当
- `gcloud artifacts docker images scan` 等のスキャン関連コマンドのページは本スキルにあるが、Artifact Analysis のガイドは `gcp-security`

- `saasservicemgmt` は App Lifecycle Manager（旧 SaaS Runtime）の REST API
- `devicerun` は Developer Device Platform（Device Run）の REST API。ガイドは `app-optimize-device-platform/` に App Optimize と同居
- Cloud Source Repositories・Design Center・App Optimize・Software Delivery Trust・Progressive Rollout・Remote Build Execution の REST ページは無い（Discovery document を取得できた API のみ）

- 権限の数が多いサービスは `-1` `-2` に分割されている（Artifact Registry・App Hub）。`-2` は権限の続き
- `progressiverollout` と `remotebuildexecution` は機械生成ページ（gcloud / REST / IAM のうち IAM のみ）だけで、製品のガイドは収録していない
- `software-delivery-trust` は gcloud（alpha）の機械生成ページだけで、ガイド・REST・IAM は無い

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
2. Artifact Registry は 5 カテゴリ、Cloud Build は 6、Cloud Deploy は 4、残りは 1 プロダクト 1 カテゴリ（Secure Source Manager と Cloud Source Repositories、App Optimize と Developer Device Platform はそれぞれ 1 カテゴリに同居）。形式（Docker / npm / Python / 汎用）、Cloud Build の構成・トリガー・接続・セキュリティ・言語別、Cloud Deploy の概念・Skaffold・戦略・automation のどれかで選ぶ
3. 非推奨・終了を確認するときは `artifact-registry-docker-gcr-transition/transition-from-gcr.md`（Container Registry）、`secure-source-manager/enable-disable-cloud-source-repositories.md` と `migration-guides.md`（Cloud Source Repositories）、`cloud-deploy-skaffold-targets/select-tool-version.md`（Skaffold）を引く

未投入カテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Artifact Registry の概要・リポジトリのモード（standard / remote / virtual）・対応形式・リポジトリの作成・ロケーション | artifact-registry-repositories | [references/artifact-registry-repositories/README.md](references/artifact-registry-repositories/README.md) |
| remote リポジトリ（Docker Hub 等の上流キャッシュ）の作成・上流の認証・virtual リポジトリの作成と上流ポリシーの優先度 | artifact-registry-remote-virtual | [references/artifact-registry-remote-virtual/README.md](references/artifact-registry-remote-virtual/README.md) |
| Docker イメージの push / pull・認証（credential helper）・イメージ名・管理（タグ・削除）・コピー・Docker Hub キャッシュの pull・Container Registry からの移行・`gcr.io` リポジトリ | artifact-registry-docker-gcr-transition | [references/artifact-registry-docker-gcr-transition/README.md](references/artifact-registry-docker-gcr-transition/README.md) |
| npm・Python（pip / twine）・汎用形式のパッケージの保存・認証・管理 | artifact-registry-npm-python-generic | [references/artifact-registry-npm-python-generic/README.md](references/artifact-registry-npm-python-generic/README.md) |
| Artifact Registry の IAM ロール・リポジトリ単位のアクセス制御・CMEK・VPC Service Controls・成果物の保護・cleanup policy | artifact-registry-access-cleanup | [references/artifact-registry-access-cleanup/README.md](references/artifact-registry-access-cleanup/README.md) |
| Cloud Build の概要・`cloudbuild.yaml` のスキーマ（steps・substitutions・availableSecrets・artifacts・images・options・timeout）・Cloud Builders | cloud-build-config-schema | [references/cloud-build-config-schema/README.md](references/cloud-build-config-schema/README.md) |
| 基本構成の作成・substitutions・Secret Manager のシークレットの使用・ステップ間のデータ受け渡し・`waitFor`・Artifact Registry への成果物の保存・CLI / API からのビルド送信 | cloud-build-config-steps | [references/cloud-build-config-steps/README.md](references/cloud-build-config-steps/README.md) |
| トリガーの作成と管理・Pub/Sub イベント・webhook イベント・手動ビルド・承認によるゲート・スケジュール実行 | cloud-build-triggers | [references/cloud-build-triggers/README.md](references/cloud-build-triggers/README.md) |
| リポジトリ接続（1st gen / 2nd gen）・GitHub / GitLab / Bitbucket Cloud の接続とビルド・ビルドからの GitHub アクセス | cloud-build-repositories | [references/cloud-build-repositories/README.md](references/cloud-build-repositories/README.md) |
| Cloud Build のサービス アカウント（既定・ユーザー指定）・ビルドの来歴（SLSA provenance）・CMEK・private pool（作成・実行・構成ファイル・プライベート ネットワーク・VPC Service Controls） | cloud-build-security-private-pools | [references/cloud-build-security-private-pools/README.md](references/cloud-build-security-private-pools/README.md) |
| Node.js / Python / コンテナ イメージのビルド・依存関係の管理・Cloud Run / GKE へのデプロイ（Cloud Build 側の手順）・ビルド結果の表示・ビルドログの保存・ビルドの高速化 | cloud-build-languages-deploy | [references/cloud-build-languages-deploy/README.md](references/cloud-build-languages-deploy/README.md) |
| Cloud Deploy の概要・用語（delivery pipeline・target・release・rollout・phase・job）・アーキテクチャ・`clouddeploy.yaml` のスキーマ・pipeline と target の作成・release の昇格 | cloud-deploy-concepts-pipelines | [references/cloud-deploy-concepts-pipelines/README.md](references/cloud-deploy-concepts-pipelines/README.md) |
| Skaffold の使い方・マニフェストの管理・ツールの版の選択・GKE / Cloud Run / GKE Enterprise / custom target・並列デプロイ | cloud-deploy-skaffold-targets | [references/cloud-deploy-skaffold-targets/README.md](references/cloud-deploy-skaffold-targets/README.md) |
| デプロイ戦略（standard / canary）・canary の構成（Cloud Run・GKE のサービス ネットワーキング・Gateway API）・rollout の管理・ロールバック・デプロイ パラメータ | cloud-deploy-strategies-rollouts | [references/cloud-deploy-strategies-rollouts/README.md](references/cloud-deploy-strategies-rollouts/README.md) |
| automation と automation rules・deploy hooks・デプロイ後の検証・分析・deploy policy・CI との統合・サービス アカウント・実行環境 | cloud-deploy-automation-verification | [references/cloud-deploy-automation-verification/README.md](references/cloud-deploy-automation-verification/README.md) |
| Secure Source Manager のインスタンス・リポジトリ・Git・IAM・ブランチ保護・トリガー ファイル、Cloud Source Repositories の廃止告知と Secure Source Manager への移行 | secure-source-manager | [references/secure-source-manager/README.md](references/secure-source-manager/README.md) |
| Developer Connect の概要・Git リポジトリの接続（GitHub / GitLab / Secure Source Manager / HTTP）・アカウント コネクタ・insights | developer-connect | [references/developer-connect/README.md](references/developer-connect/README.md) |
| App Hub の概要・概念（application・service・workload・host project）・設定・リソースの登録・application の管理・対応リソース | app-hub | [references/app-hub/README.md](references/app-hub/README.md) |
| Application Design Center の概要・設定・space・application template の設計・デプロイ・catalog・Terraform のインポート・セキュリティ ポリシー | application-design-center | [references/application-design-center/README.md](references/application-design-center/README.md) |
| App Lifecycle Manager（旧 SaaS Runtime）の SaaS オファリング・テナント・rollout 戦略・変数・サービス アカウント・リージョン化・feature flags | app-lifecycle-manager | [references/app-lifecycle-manager/README.md](references/app-lifecycle-manager/README.md) |
| App Optimize のレポート（概要・作成・読み取り）、Developer Device Platform（Device Run・Android instrumentation・iOS・共有ストレージ） | app-optimize-device-platform | [references/app-optimize-device-platform/README.md](references/app-optimize-device-platform/README.md) |
| Workload Manager の評価（evaluation）・ルールの検出結果・カスタム ルール（Rego）・デプロイ（SAP）・サービス アカウント・VPC Service Controls・SAP の監視 | workload-manager | [references/workload-manager/README.md](references/workload-manager/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `iam` / `rest` / `rest-schemas`

## 他スキルとの使い分け

- `gcp-run` — Cloud Run / Cloud Run functions のソースからのデプロイ・継続的デプロイの Cloud Run 側の設定、Cloud Deploy の Cloud Run ターゲットの実行時（ランタイム）側。本スキルは Cloud Build の Cloud Run へのデプロイ手順（`cloud-build-languages-deploy`）と Cloud Deploy 側の target 構成（`cloud-deploy-skaffold-targets`）
- `gcp-gke` — GKE クラスター・GKE 上の Binary Authorization の適用・Cloud Deploy の GKE ターゲットのクラスター側・Config Sync / Fleet。`gcloud container images`（Container Registry 向けの旧コマンド）もこちら。本スキルは Cloud Deploy 側の GKE target と Cloud Build の GKE へのデプロイ手順
- `gcp-security` — Artifact Analysis・Binary Authorization・Assured OSS・ソフトウェア サプライチェーンの概要、CMEK に使う Cloud KMS の鍵、Cloud Build が使う Secret Manager のシークレット、VPC Service Controls。本スキルは Cloud Build・Artifact Registry 側の CMEK・VPC Service Controls の設定ページ（`cloud-build-security-private-pools`・`artifact-registry-access-cleanup`）と `gcloud artifacts` のスキャン関連コマンドのページ
- `gcp-security-compliance` — Security Command Center
- `gcp-observability` — ビルド・rollout のログとモニタリング（Cloud Logging・Cloud Monitoring）・Cloud Audit Logs。本スキルは Cloud Build のビルドログの保存と表示（`cloud-build-languages-deploy`）
- `gcp-messaging-workflows` — Cloud Build の Pub/Sub トリガー・通知で使う Pub/Sub の topic・subscription、Eventarc。本スキルは Pub/Sub イベントによるトリガーの設定（`cloud-build-triggers`）
- `gcp-integration` — Application Integration・Integration Connectors。Application Integration 自体の CI/CD は本スキルに収録していない
- `gcp-networking` — VPC・private pool のピアリングと Private Service Connect のネットワーク側。本スキルは private pool の作成・プライベート ネットワーク接続のガイド（`cloud-build-security-private-pools`）
- `gcp-compute` — ビルド・デプロイ先の Compute Engine VM（`gcloud compute`・`gcloud batch`）
- `gcp-storage` — ビルドログ・成果物の置き場となる Cloud Storage のバケット
- `gcp-foundation` — IAM・サービス アカウント・Workload Identity Federation・Organization Policy。GitHub Actions から Google Cloud へ認証する Workload Identity Federation もこちら。本スキルは各プロダクトのロールの機械生成ページ
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-iac`（予定）— Infrastructure Manager・Terraform・Config Connector。Application Design Center は Terraform を生成するが、Terraform 自体はこちら。本スキルは Application Design Center の Terraform のインポート（`application-design-center`）
- `gcp-bigquery`（予定）— BigQuery
- `gcp-agent-platform`（予定）— Agent Platform
- `gcp-api-management`（予定）— Apigee・API Gateway
- `github-docs` — GitHub Actions 自体。GitHub Actions から Google Cloud への認証は `gcp-foundation` の Workload Identity Federation
- `docker` — Dockerfile・Docker Engine。本スキルは Artifact Registry への push / pull と Cloud Build のコンテナ ビルド
- `cloudflare-wrangler` — Workers Builds・Wrangler によるデプロイは Cloudflare のもので、Cloud Build ではない
- `vercel` — Vercel のデプロイ

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 料金（取得していない）。公式の料金ページ（`artifact-registry/pricing`・`build/pricing`・`deploy/pricing`・`app-hub/pricing`・`developer-connect/pricing`・`developer-device-platform/pricing`・`source-repositories/pricing`、いずれも docs.cloud.google.com 配下のパス）と各 `billing-questions` で確認する
- Artifact Registry: Maven / Java・Go・Helm・Apt / Yum・Ruby・Conda・KFP の形式別ガイド（リポジトリ作成と remote の認証の形式別の節で代替）・形式別の remote 認証の個別ページ・リポジトリのラベルと削除・gcloud の既定値・App Engine / Compute Engine / Cloud Run functions / GKE との連携・GKE private cluster・Pub/Sub 通知・監査ログ・トラブルシューティング（形式別を含む）・Trusted Partner Cloud との差異（取得できなかったページ）。Artifact Analysis は `gcp-security`
- Container Registry: 旧パスの移行サブページ（すべて `transition-from-gcr` へリダイレクト）
- Cloud Build: 通知（notifier 別 9 件）・GitHub Enterprise / GitLab Enterprise / Bitbucket Data Center の接続とビルド・private pool からの private GKE cluster / 静的外部 IP / JFrog Artifactory へのアクセス・Packer・Compute Engine / App Engine / Firebase / Cloud Run functions へのデプロイ・Java / Go のビルド・規制対応・トラブルシューティング。取得できなかったページ（Workflows へのデプロイ・experimental features・ビルドの summary と insights）
- Cloud Deploy: チュートリアル（`deploy-app-*`）・Cloud Monitoring による分析・Pub/Sub 通知・CMEK・ラベル / アノテーション・タグ・pipeline の削除
- Secure Source Manager: pull request・issue・webhook・Private Service Connect・Cloud Build への接続・脆弱性スキャン・CMEK・Terraform の CI/CD（`gcp-iac`（予定）の範囲）・インスタンスの削除・トラブルシューティング。Cloud Source Repositories のリポジトリ作成・ミラーリング・コード検索等（廃止済みのため）
- Developer Connect: Bitbucket Cloud / Data Center・GitHub Enterprise・GitLab Enterprise の接続（GitLab で代表。Bitbucket Cloud は Cloud Build 側の接続ページ）・VPC Service Controls・タグによるリポジトリ アクセス制御・Gemini Code Assist 連携（取得できなかったページ）
- App Hub: application template・モニタリング・最適化・メタデータ スキーマ・VPC Service Controls・リージョン エンドポイント・トラブルシューティング
- Application Design Center: リソース別の構成（`configure-*`）・クイックスタート・Google 提供 template・composite template・GKE 構成例・モニタリング・チュートリアル
- App Lifecycle Manager: blueprint の作成とアップロード・テナントの関連付け・feature flags の詳細（manifests・sets・targeting・experimentation・Go / Java SDK）・リソースの削除・用語集
- App Optimize・Developer Device Platform: レポートの削除・一覧・メタデータ取得・MCP・最適化データ・Device Streaming（`devicestreaming` は担当外）・デバイス カタログ・Android executable テスト・Firebase Test Lab からの移行・用語集。Cloud Hub の Optimize は `gcp-foundation`
- Workload Manager: SAP 以外のワークロード別の agent 設定とデプロイ・監視（Oracle・SQL Server・MySQL・Redis・OpenShift）・ベスト プラクティスのルール一覧・クライアント ライブラリ
- 各プロダクトの監査ログ ページ（メソッドと権限タイプの対応表）、MCP のツール定義、Java / C# / PHP / C++ / Ruby の SDK 固有の手順、Console の操作手順（各ページの Notes に省略した形式を記載）
- `software-delivery-trust`・`progressiverollout`・`remotebuildexecution` のガイド（機械生成ページのみ。製品の説明は書かない）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-19（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分）、gcloud 593.0.0。Container Registry と Cloud Source Repositories の告知を加えた `iam/containerregistry.md`・`iam/source.md` の Notes は 2026-11-19 の取得に基づく
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/`（後続 PR で投入） `references/iam/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM roles-permissions reference / `google-api-python-client` 同梱の Discovery document）。他の 22 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME と SYNOPSIS のみ。`workload-manager` と `software-delivery-trust` は alpha のみ、`app-optimize` は beta のみ
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に理由を残す。gcloud help の例の誤りを直したものは、生成ページの Notes に `Corrected from the official docs:` と記す
- 非推奨・終了（references で確認したもの）:
  - Container Registry は 2025-03-18（March 18, 2025）に停止。Artifact Registry 上の `gcr.io` の URL は影響を受けない（`artifact-registry-docker-gcr-transition/transition-from-gcr.md`・`gcr-repositories.md`・`iam/containerregistry.md`）
  - Cloud Source Repositories は 2024-06-17（June 17, 2024）以降、新規顧客が利用できない。End of Sale で停止日は未告知（`secure-source-manager/enable-disable-cloud-source-repositories.md`・`migration-guides.md`）。移行先は Secure Source Manager
  - Skaffold は 2027-01-15（January 15, 2027）以降の gcloud CLI リリースから削除され、GitHub リポジトリは 2027-01-29（January 29, 2027）にアーカイブされる（`cloud-deploy-skaffold-targets/select-tool-version.md` ほか）。機械生成の `gcloud deploy releases create` ページ（`--skaffold-file` 等）には、この告知の WARN を入れていない
- App Lifecycle Manager は旧 SaaS Runtime。旧パス `saas-runtime/` は `app-lifecycle-manager/` へ移っており、本スキルは現行パスを収録している。REST・IAM のサービス名は `saasservicemgmt`
- `appoptimize` と `devicerun` の IAM ロールは、IAM roles-permissions reference（2026-11-14 取得）に該当サービスが無いため `references/iam/`（後続 PR で投入） に無い
- 新しいフラグ・機能は `gcloud help` と公式 reference で確認する
