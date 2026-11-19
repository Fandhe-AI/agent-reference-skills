---
name: gcp-run
description: >
  Google Cloud (GCP) の Cloud Run (services・jobs・worker pools)・Cloud Run functions (旧 Cloud Functions)・App Engine・Cloud Tasks・Cloud Scheduler・Cloud Workstations の gcloud・REST・IAM。
  container contract・revisions・traffic・IAM invoker・Eventarc trigger・Direct VPC egress・GPU・secrets、gcloud run・functions・app・tasks・scheduler。
  Cloudflare Workers・Vercel Functions とは別、gcloud 全般は gcp-cli、IAM 基盤は gcp-foundation。
user-invocable: false
---

# gcp-run

Google Cloud (GCP) のサーバーレス実行基盤・ジョブ基盤・開発環境スキル。Cloud Run（services / jobs / worker pools）、Cloud Run functions（旧 Cloud Functions。1st gen を含む）、App Engine（standard / flexible と Cloud Run への移行）、Cloud Tasks、Cloud Scheduler、Cloud Workstations を扱う。コンテナーのランタイム契約・リビジョンとトラフィック分割・スケーリング・GPU・シークレット・Ingress・認証（IAM invoker / ID トークン）・Direct VPC egress・Eventarc / Pub/Sub トリガー・ログとモニタリング・トラブルシューティングに加え、gcloud 6 グループ・IAM ロール・REST（Discovery）を収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。

## ディレクトリ構成

```text
skills/gcp-run/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14
      README.md
      <group>/
        README.md
        <group>-<sub>.md          # GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS
                                  # 大きいものは <group>-<sub>-<N>.md に分割（例: tasks/tasks-queues-1.md・workstations/workstations-configs-1.md）
    iam/                          # 機械生成: IAM roles-permissions reference、取得 2026-11-14
      README.md
      <service>[-<N>].md          # 大きいサービスは分割（例: run-1.md・run-2.md）。サブディレクトリなし
    rest/                         # 機械生成: Discovery 由来のメソッド表、取得 2026-11-14
      README.md
      <api>/
        README.md
        <api>[-<N>].md            # 大きい API は分割（例: rest/run/run-1.md・run-2.md）
    rest-schemas/                 # 機械生成: Discovery 由来のメッセージスキーマ、取得 2026-11-14
      README.md
      <api>/
        README.md
        <api>[-<N>].md            # 大きい API は分割
    cloud-run-overview/           # 公式ガイド由来（手書き）: Cloud Run の概念・リソースモデル・container contract・同時実行・オートスケール・ロケーション・クォータ・課金設定
      README.md
      <page>.md                   # 例: what-is-cloud-run.md / resource-model.md / container-contract.md / billing-settings.md
    cloud-run-deploy/             # クイックスタート・コンテナーデプロイ・イメージのビルド
      README.md
      <page>.md                   # 例: deploy-container.md / deploying.md / containers.md
    cloud-run-services/           # ソースからのデプロイ・サービスとリビジョンの管理・ロールアウト / ロールバック / トラフィック分割
      README.md
      <page>.md                   # 例: deploying-source-code.md / managing-revisions.md / rollouts-rollbacks-traffic-migration.md
    cloud-run-configuration/      # コンテナー・CPU・メモリ・環境変数・実行環境
      README.md
      <page>.md                   # 例: containers.md / cpu.md / memory-limits.md / execution-environments.md
    cloud-run-scaling/            # 同時実行・最小 / 最大インスタンス・手動スケーリング・リクエストタイムアウト・GPU
      README.md
      <page>.md                   # 例: concurrency.md / min-instances.md / max-instances.md / gpu.md
    cloud-run-security/           # セキュリティ設計・Ingress・サービス ID・シークレット
      README.md
      <page>.md                   # 例: security.md / ingress.md / service-identity.md / secrets.md
    cloud-run-auth/               # 認証: 公開・サービス間・エンドユーザー・開発者・IAM アクセス管理
      README.md
      <page>.md                   # 例: public.md / service-to-service.md / managing-access.md
    cloud-run-networking/         # Direct VPC egress・Serverless VPC Access コネクタ・静的送信 IP・プライベートネットワーキング
      README.md
      <page>.md                   # 例: vpc-direct-vpc.md / vpc-connectors.md / static-outbound-ip.md / private-networking.md
    cloud-run-http-serving/       # HTTPS・gRPC・WebSockets・カスタムドメイン・ヘルスチェック
      README.md
      <page>.md                   # 例: https-request.md / grpc.md / mapping-custom-domains.md / healthchecks.md
    cloud-run-triggers/           # Pub/Sub・Eventarc・Cloud Storage・Cloud Scheduler・Cloud Tasks からの起動
      README.md
      <page>.md                   # 例: pubsub-triggers.md / trigger-with-events.md / using-scheduler.md / using-tasks.md
    cloud-run-jobs/               # ジョブの作成・実行・管理・並列度・リトライ・タスクタイムアウト
      README.md
      <page>.md                   # 例: create-jobs.md / execute-jobs.md / parallelism.md / max-retries.md
    cloud-run-worker-pools/       # Worker pools のデプロイ・管理・手動スケーリング
      README.md
      <page>.md                   # 例: deploy-worker-pools.md / managing-workerpools.md / manual-scaling.md
    cloud-run-functions/          # Cloud Run functions: 概要・1st gen との比較・関数の記述・デプロイ・トリガー
      README.md
      <page>.md                   # 例: functions-with-run.md / write-functions.md / deploy-functions.md / function-triggers.md
    cloud-run-functions-runtimes/ # ランタイム・サポートスケジュール・Node.js / Python・ローカル開発
      README.md
      <page>.md                   # 例: runtime-support.md / nodejs.md / python.md / local-dev-functions.md
    cloud-functions-1st-gen/      # Cloud Run functions (1st gen、旧 Cloud Functions 1st gen)・Cloud Functions v2 API 互換・アップグレード
      README.md
      <page>.md                   # 例: concepts-overview.md / deploy-1st-gen.md / upgrade-gen1-functions.md / quotas.md
    cloud-run-operations/         # ログ・モニタリング・ローカルテスト・トラブルシューティング
      README.md
      <page>.md                   # 例: logging.md / monitoring.md / testing-local.md / troubleshooting.md
    app-engine/                   # App Engine: 概要・環境比較・app.yaml・ランタイムライフサイクル・クォータ
      README.md
      <page>.md                   # 例: an-overview-of-app-engine.md / standard-app-yaml.md / flexible-app-yaml.md / standard-quotas.md
    app-engine-migration/         # App Engine から Cloud Run への移行（比較・standard・flexible）
      README.md
      <page>.md                   # 例: compare-gae-with-run.md / migrate-app-engine-standard-to-run.md
    scheduler/                    # Cloud Scheduler: ジョブ作成・cron 形式・リトライ・HTTP ターゲット認証・クォータ
      README.md
      <page>.md                   # 例: creating.md / cron-job-schedules.md / http-target-auth.md / jobs-on-schedule.md
    tasks/                        # Cloud Tasks（Google Tasks API ではない）: キュー作成・設定・HTTP ターゲットタスク・クォータ
      README.md
      <page>.md                   # 例: dual-overview.md / creating-queues.md / creating-http-target-tasks.md / quotas.md
    workstations/                 # Cloud Workstations: クラスター・構成・ベースイメージ・アクセス制御・クォータ
      README.md
      <page>.md                   # 例: overview.md / architecture.md / create-configuration.md / customize-container-images.md
  samples/
    README.md
    deploy-service-from-source.md
    deploy-image-from-artifact-registry.md
    service-to-service-id-token.md
    scheduler-oidc-private-service.md
    tasks-http-target-oidc.md
    pubsub-push-and-eventarc-trigger.md
    job-overrides-and-retries.md
    secrets-env-and-volume.md
    gradual-rollout-with-tags.md
    direct-vpc-egress-and-connector.md
    gpu-service.md
    function-http-and-event.md
    upgrade-functions-gen1.md
    migrate-app-engine-standard.md
    worker-pool-deploy-and-scale.md
    workstations-cluster-config-start.md
  scripts/
    README.md
    services.md
    jobs.md
    worker-pools.md
    functions.md
    tasks.md
    scheduler.md
    app-engine.md
    workstations.md
```

`references/gcloud/` が担当する gcloud グループ（6）:

- `run`（compose / deploy / domain-mappings / instances（alpha / beta のみ）/ jobs / multi-region-services / regions / revisions / services / worker-pools）
- `functions`（`local` は alpha のみ）
- `app`（`gen-config` / `repair` / `migrate-config` は beta のみ、`migrate-to-run` は alpha / beta）
- `tasks`（`acknowledge` / `cancel-lease` / `create-pull-task` / `lease` / `renew-lease` は alpha のみ、`batch-create` は alpha / beta）
- `scheduler`
- `workstations`（`suspend` は alpha / beta のみ）

`references/iam/` のサービス（10 ファイル）: `run`（`run-1.md`・`run-2.md`）/ `cloudfunctions` / `appengine` / `appengineflex` / `cloudscheduler` / `cloudtasks` / `workstations` / `runapps`（Serverless Integrations）/ `appdevelopmentexperience`。

`references/rest/` `references/rest-schemas/` の API（6）: `run`（Cloud Run Admin API v1 / v2）/ `cloudfunctions` / `appengine` / `cloudscheduler` / `cloudtasks` / `workstations`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/<group>/README.md` からページ（GA は全文）を引く。GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
2. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`。Cloud Tasks は `cloudtasks`
3. IAM ロール・権限 → `references/iam/README.md` の索引から `<service>.md` を引く（Cloud Run は `run-1.md`・`run-2.md` に分割。ロール ID・権限名のサービス接頭辞で引く。例: `roles/run.invoker` → `run-1.md`）
4. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
5. 作業例 → `samples/README.md`、コマンド集 → `scripts/README.md`

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（run / functions / app / tasks / scheduler / workstations の 6 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| `gcloud run`（deploy / services / jobs / worker-pools / revisions / domain-mappings / multi-region-services）のフラグを調べたい | gcloud/run | [references/gcloud/run/README.md](references/gcloud/run/README.md) |
| `gcloud functions`（deploy / call / logs / runtimes / event-types / upgrade / invoker policy）のフラグを調べたい | gcloud/functions | [references/gcloud/functions/README.md](references/gcloud/functions/README.md) |
| `gcloud app`（deploy / versions / services / instances / firewall-rules / domain-mappings / migrate-to-run）のフラグを調べたい | gcloud/app | [references/gcloud/app/README.md](references/gcloud/app/README.md) |
| `gcloud tasks`（queues / create-http-task / create-app-engine-task / run / buffer / cmek-config）のフラグを調べたい | gcloud/tasks | [references/gcloud/tasks/README.md](references/gcloud/tasks/README.md) |
| `gcloud scheduler`（jobs create / update / run / pause / resume / locations）のフラグを調べたい | gcloud/scheduler | [references/gcloud/scheduler/README.md](references/gcloud/scheduler/README.md) |
| `gcloud workstations`（clusters / configs / create / start / stop / ssh / start-tcp-tunnel / suspend）のフラグを調べたい | gcloud/workstations | [references/gcloud/workstations/README.md](references/gcloud/workstations/README.md) |
| ロール ID の権限一覧・事前定義ロールを調べたい（`roles/run.invoker` / `roles/run.admin` / `cloudfunctions.*` / `cloudtasks.*` / `cloudscheduler.*` / `workstations.*` / `appengine.*` / `runapps.*`） | iam | [references/iam/README.md](references/iam/README.md) |
| REST のメソッド・パスを調べたい（Cloud Run Admin API v1 / v2・Cloud Functions API・App Engine Admin API・Cloud Scheduler API・Cloud Tasks API・Cloud Workstations API） | rest | [references/rest/README.md](references/rest/README.md) |
| Cloud Run Admin API のメソッド（services / jobs / workerPools / executions / revisions） | rest/run | [references/rest/run/README.md](references/rest/run/README.md) |
| Cloud Functions API・Cloud Tasks API・Cloud Scheduler API・Cloud Workstations API・App Engine Admin API のメソッド | rest/cloudfunctions、rest/cloudtasks、rest/cloudscheduler、rest/workstations、rest/appengine | [references/rest/cloudfunctions/README.md](references/rest/cloudfunctions/README.md)、[references/rest/cloudtasks/README.md](references/rest/cloudtasks/README.md)、[references/rest/cloudscheduler/README.md](references/rest/cloudscheduler/README.md)、[references/rest/workstations/README.md](references/rest/workstations/README.md)、[references/rest/appengine/README.md](references/rest/appengine/README.md) |
| REST のリクエスト・レスポンスのメッセージ型を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md) |
| Cloud Run Admin API のメッセージ型（v1 の Service / Job、v2 の GoogleCloudRunV2WorkerPool / GoogleCloudRunV2RevisionTemplate / GoogleCloudRunV2Container ほか） | rest-schemas/run | [references/rest-schemas/run/README.md](references/rest-schemas/run/README.md) |
| 他 API のメッセージ型（Cloud Functions / Cloud Tasks / Cloud Scheduler / Cloud Workstations / App Engine） | rest-schemas/cloudfunctions、rest-schemas/cloudtasks、rest-schemas/cloudscheduler、rest-schemas/workstations、rest-schemas/appengine | [references/rest-schemas/cloudfunctions/README.md](references/rest-schemas/cloudfunctions/README.md)、[references/rest-schemas/cloudtasks/README.md](references/rest-schemas/cloudtasks/README.md)、[references/rest-schemas/cloudscheduler/README.md](references/rest-schemas/cloudscheduler/README.md)、[references/rest-schemas/workstations/README.md](references/rest-schemas/workstations/README.md)、[references/rest-schemas/appengine/README.md](references/rest-schemas/appengine/README.md) |
| Cloud Run の概念（services / jobs / worker pools / instances）・リソースモデル・向き不向きを知りたい | cloud-run-overview | [references/cloud-run-overview/README.md](references/cloud-run-overview/README.md) |
| container contract（ポート・環境変数・ライフサイクル・シグナル）・ロケーション・クォータ・課金設定（リクエストベース / インスタンスベース） | cloud-run-overview | [references/cloud-run-overview/README.md](references/cloud-run-overview/README.md) |
| コンテナーイメージをデプロイしたい・クイックスタート・イメージのビルド（Cloud Build / buildpacks / Artifact Registry） | cloud-run-deploy | [references/cloud-run-deploy/README.md](references/cloud-run-deploy/README.md) |
| ソースコードからデプロイしたい（`--source`）・サービスとリビジョンを管理したい | cloud-run-services | [references/cloud-run-services/README.md](references/cloud-run-services/README.md) |
| ロールアウト・ロールバック・トラフィック分割・リビジョンタグ | cloud-run-services | [references/cloud-run-services/README.md](references/cloud-run-services/README.md) |
| CPU・メモリ・環境変数・コンテナー（サイドカー）・実行環境（第 1 世代 / 第 2 世代）を設定したい | cloud-run-configuration | [references/cloud-run-configuration/README.md](references/cloud-run-configuration/README.md) |
| 同時実行・最小 / 最大インスタンス・手動スケーリング・リクエストタイムアウトを調整したい | cloud-run-scaling | [references/cloud-run-scaling/README.md](references/cloud-run-scaling/README.md) |
| GPU（NVIDIA L4 / RTX PRO 6000）を使いたい | cloud-run-scaling | [references/cloud-run-scaling/README.md](references/cloud-run-scaling/README.md) |
| セキュリティ設計・Ingress 設定・サービス ID（サービスアカウント）・Secret Manager のシークレット | cloud-run-security | [references/cloud-run-security/README.md](references/cloud-run-security/README.md) |
| 公開アクセス・サービス間認証（ID トークン）・エンドユーザー認証・開発者のテスト呼び出し・IAM invoker | cloud-run-auth | [references/cloud-run-auth/README.md](references/cloud-run-auth/README.md) |
| Direct VPC egress・Serverless VPC Access コネクタ・静的送信 IP（Cloud NAT）・Shared VPC・プライベートネットワーキング | cloud-run-networking | [references/cloud-run-networking/README.md](references/cloud-run-networking/README.md) |
| HTTPS・gRPC・WebSockets・カスタムドメイン・ヘルスチェック（startup / liveness / readiness） | cloud-run-http-serving | [references/cloud-run-http-serving/README.md](references/cloud-run-http-serving/README.md) |
| Pub/Sub・Eventarc・Cloud Storage イベント・Cloud Scheduler・Cloud Tasks から Cloud Run を起動したい | cloud-run-triggers | [references/cloud-run-triggers/README.md](references/cloud-run-triggers/README.md) |
| Cloud Run jobs の作成・実行（オーバーライド・キャンセル）・並列度・リトライ・タスクタイムアウト | cloud-run-jobs | [references/cloud-run-jobs/README.md](references/cloud-run-jobs/README.md) |
| Worker pools（HTTP エンドポイントを持たない常駐処理）のデプロイ・管理・手動スケーリング | cloud-run-worker-pools | [references/cloud-run-worker-pools/README.md](references/cloud-run-worker-pools/README.md) |
| Cloud Run functions の概念・改称（旧 Cloud Functions）・関数の記述（Functions Framework）・デプロイ・トリガー | cloud-run-functions | [references/cloud-run-functions/README.md](references/cloud-run-functions/README.md) |
| 関数のランタイム・サポートスケジュール・Node.js / Python ランタイム・ローカル実行 | cloud-run-functions-runtimes | [references/cloud-run-functions-runtimes/README.md](references/cloud-run-functions-runtimes/README.md) |
| Cloud Functions 1st gen の扱い・`--no-gen2` デプロイ・`gcloud functions upgrade`・1st gen のクォータ | cloud-functions-1st-gen | [references/cloud-functions-1st-gen/README.md](references/cloud-functions-1st-gen/README.md) |
| Cloud Run のログ・モニタリング・ローカルテスト・デプロイ / 実行時エラーのトラブルシューティング | cloud-run-operations | [references/cloud-run-operations/README.md](references/cloud-run-operations/README.md) |
| App Engine の概要・standard / flexible の違い・`app.yaml`・ランタイムのサポート状況・クォータ | app-engine | [references/app-engine/README.md](references/app-engine/README.md) |
| App Engine から Cloud Run へ移行したい（比較表・`gcloud beta app migrate-to-run`） | app-engine-migration | [references/app-engine-migration/README.md](references/app-engine-migration/README.md) |
| Cloud Scheduler のジョブ作成・cron 形式とタイムゾーン・リトライ・HTTP ターゲット認証（OIDC / OAuth）・トラブルシューティング | scheduler | [references/scheduler/README.md](references/scheduler/README.md) |
| Cloud Run jobs を Cloud Scheduler で定期実行したい | scheduler | [references/scheduler/README.md](references/scheduler/README.md) |
| Cloud Tasks のキュー作成・レート / リトライ設定・HTTP ターゲットタスク（OIDC トークン）・クォータ | tasks | [references/tasks/README.md](references/tasks/README.md) |
| Cloud Workstations のクラスター・構成・ベースイメージ・カスタムコンテナーイメージ・アクセス制御・クォータ | workstations | [references/workstations/README.md](references/workstations/README.md) |
| 典型的な使い方を知りたい（Cloud Run のデプロイ・認証・トリガー・ジョブ・GPU・VPC、functions、移行、worker pools、Workstations の 16 件） | samples | [samples/README.md](samples/README.md) |
| コマンドをコピペしたい（services / jobs / worker-pools / functions / tasks / scheduler / app-engine / workstations） | scripts | [scripts/README.md](scripts/README.md) |

## 他スキルとの使い分け

- `gcp-cli` — gcloud 全般のインストール・設定・出力フォーマット・Cloud Shell。`gcloud run` / `functions` / `app` / `tasks` / `scheduler` / `workstations` のコマンドは本スキル
- `gcp-foundation` — IAM の基盤（allow / deny policy・サービスアカウント・Workload Identity Federation）・ADC・Service Usage・クォータ・課金。本スキルは各プロダクトの IAM ロール（`roles/run.invoker` など）と invoker 設計のみ
- `gcp-storage` — Cloud Storage 本体・Cloud Storage FUSE ボリュームマウント・NFS ボリューム。本スキルはイベントトリガー（Eventarc 経由）の起動側のみ
- `gcp-client-libraries` — 言語別クライアントライブラリのコード（Node.js / Python / Rust）。本スキルは Functions Framework と gcloud / REST の手順のみ
- `gcp-networking` / `gcp-load-balancing` — VPC・Serverless VPC Access の本体、Load Balancing（serverless NEG を含む）の本体
- `gcp-messaging-workflows` / `gcp-security` / `gcp-observability` / `gcp-devops` — Pub/Sub・Eventarc・Workflows、Secret Manager・IAP・Binary Authorization、Logging・Monitoring、Cloud Build・Artifact Registry の本体。本スキルは Cloud Run 側の接続・設定ページのみ
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `docker` — Dockerfile・Docker Engine 一般。本スキルは Cloud Run 向けのコンテナー契約とビルド手順のみ
- `cloudflare-workers` — Cloudflare Workers（V8 isolate）。Cloud Run / Cloud Run functions とは別基盤
- `vercel` — Vercel のデプロイ基盤と Vercel Functions。Cloud Run functions とは別
- `hono` / `fastify` — Cloud Run 上で動かす Web フレームワークの API は各スキル。本スキルはデプロイ・実行基盤のみ
- Firebase（Cloud Functions for Firebase・Firebase Hosting を含む）は別計画（`firebase-*`）。本スキルでは扱わない
- `references/tasks/` は Cloud Tasks（`cloudtasks.googleapis.com`）。Google Workspace の Google Tasks API（To-Do リスト）は対象外

## 収録しなかった主なガイド群

公式ドキュメントのガイドは主要ページに絞って収録した。次は未収録。必要なときは URL を確認する（いずれも https://docs.cloud.google.com/ 配下）。

- 他言語・フレームワークのクイックスタート（Go / Java / .NET / PHP / Ruby / FastAPI / Next.js ほか）— `run/docs/quickstarts`
- 継続的デプロイ — `run/docs/quickstarts/deploy-continuously`
- ボリュームマウント（Cloud Storage / NFS / in-memory）— `run/docs/configuring/services/cloud-storage-volume-mounts`
- ベースイメージ・自動更新・ビルド設定 — `run/docs/configuring/services/runtime-base-images`
- HTTP/2・セッションアフィニティ・Webhook — `run/docs/configuring/http2`、`run/docs/configuring/session-affinity`
- jobs / worker pools の GPU・Worker pool の Kafka autoscaler — `run/docs/configuring/jobs/gpu`、`run/docs/configuring/workerpools/kafka-autoscaler`
- 高度なセキュリティ（IAP・CMEK・VPC Service Controls・Binary Authorization・Cloud Armor・custom audiences）— `run/docs/securing/identity-aware-proxy-cloud-run`、`run/docs/securing/using-cmek`、`run/docs/securing/using-vpc-service-controls`
- Direct VPC への移行・Shared VPC host / service project・Cloud Service Mesh — `run/docs/configuring/migrate-direct-vpc`、`run/docs/configuring/shared-vpc-host-project`
- マルチリージョン・CDN — `run/docs/multiple-regions`、`run/docs/set-up-cdn`
- ジョブの言語別クイックスタート・リトライとチェックポイント — `run/docs/jobs-retries`
- Cloud Run functions の retries・best practices・依存関係・ビルド — `run/docs/tips/function-retries`、`run/docs/tips/functions-best-practices`、`run/docs/runtimes/nodejs-dependencies`
- AI エージェント・MCP サーバー・A2A のホスティング — `run/docs/ai-agents`、`run/docs/host-mcp-servers`、`run/docs/deploy-a2a-agents`
- 他プラットフォームからの移行（AWS Lambda / Heroku / Cloud Foundry / Kubernetes）— `run/docs/migrate/from-aws-lambda`、`run/docs/migrate/from-kubernetes`
- 開発のヒント・既知の問題・チュートリアル・コードサンプル・リリースノート — `run/docs/tips/general`、`run/docs/known-issues`、`run/docs/tutorials/codelabs`、`run/docs/samples`、`run/docs/release-notes`
- Cloud Functions 1st gen のチュートリアル・セキュリティ / IAM・Terraform・リリースノート — `functions/1stgendocs/tutorials/http-1st-gen`、`functions/docs/securing/managing-access-iam`、`functions/docs/release-notes`
- App Engine のレガシーランタイムとバンドルサービス（約 1,800 ページ）・第 2 世代バンドルサービス・言語別設定・トラフィック分割・移行センター・非推奨 — `appengine/docs/legacy/standard/python/an-overview-of-app-engine`、`appengine/docs/standard/python3/services/access`、`appengine/docs/standard/splitting-traffic`、`appengine/migration-center`、`appengine/docs/standard/deprecations`
- App Engine flexible のクォータ（standard 版とほぼ同文で、Compute Engine のクォータを消費する旨のみ異なる）— `appengine/docs/flexible/quotas`
- Cloud Scheduler の Console / Terraform 版クイックスタート・チュートリアル・VPC Service Controls・ログ — `scheduler/docs/schedule-run-cron-job`、`scheduler/docs/tut-gcf-pub-sub`、`scheduler/docs/secure-with-vpcsc`、`scheduler/docs/viewing-logs`
- Cloud Tasks の App Engine タスク・`queue.yaml`・Task Queues からの移行・認証詳細・CMEK・Pub/Sub / Cloud Scheduler との比較 — `tasks/docs/creating-appengine-tasks`、`tasks/docs/queue-yaml`、`tasks/docs/authentication`、`tasks/docs/comp-pub-sub`、`tasks/docs/comp-tasks-sched`、`tasks/docs/common-pitfalls`
- Cloud Workstations のローカル IDE・SSH 接続・プリセット IDE・マシンタイプ・GPU・セキュリティのベストプラクティス・CMEK・Shared VPC・Terraform — `workstations/docs/ssh-support`、`workstations/docs/preconfigured-ides`、`workstations/docs/available-machine-types`、`workstations/docs/available-gpus`、`workstations/docs/set-up-security-best-practices`、`workstations/docs/encrypt-workstation-resources-using-cmek`、`workstations/docs/terraform-support-for-cloud-workstations`
- Serverless Integrations（`runapps.`）・App Development Experience（`appdevelopmentexperience.`）・App Engine flexible（`appengineflex.`）はガイドが無く、IAM ロールのみ。`references/iam/` の `runapps.md` / `appdevelopmentexperience.md` / `appengineflex.md` を引く

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-15（ガイド）、2026-11-14（機械生成分）、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/` は機械生成（gcloud 593.0.0 の help / IAM reference / Discovery、取得 2026-11-14）。上記 21 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ。`gcloud run instances` は alpha / beta のみ、`gcloud tasks` の pull-task 系コマンドは alpha のみ
- 料金ページは Markdown 取得ができないため未収録。公式料金ページを確認する — Cloud Run / Cloud Run functions: https://cloud.google.com/run/pricing 、App Engine: https://cloud.google.com/appengine/pricing 、Cloud Scheduler: https://cloud.google.com/scheduler/pricing 、Cloud Tasks: https://cloud.google.com/tasks/pricing 、Cloud Workstations: https://cloud.google.com/workstations/pricing
- Cloud Run functions は旧 Cloud Functions（2nd gen）の改称で、Cloud Run functions (1st gen) が旧 Cloud Functions (1st gen)。1st gen は `cloud-functions-1st-gen/` に分離して収録
- App Engine はレガシー扱いで、概要・環境比較・`app.yaml`・ランタイムサポート・standard のクォータ・Cloud Run への移行に絞って収録
- リリースノート（Cloud Run / Cloud Functions / App Engine / Cloud Tasks / Cloud Scheduler / Cloud Workstations）は未収録
- Cloud Run の Preview 機能（カスタムドメインのドメインマッピング、`gcloud beta app migrate-to-run` など）は各ページの記載に従い、GA と区別して扱う
- gcloud は頻繁に更新される。新しいバージョンのフラグは `gcloud help` と公式 reference で確認する
