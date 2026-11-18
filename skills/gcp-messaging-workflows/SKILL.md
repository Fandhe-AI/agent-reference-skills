---
name: gcp-messaging-workflows
description: >
  Google Cloud (GCP) の Pub/Sub (push / pull・exactly-once・ordering・dead-letter)・Eventarc (Standard / Advanced)・Workflows (YAML・connectors・callbacks)・Managed Service for Apache Kafka (Connect・Schema Registry)。import topic・SMT・CloudEvents・mTLS / SASL、gcloud pubsub・eventarc・workflows・managed-kafka。Pub/Sub Lite 廃止・移行。Cloud Tasks は gcp-run、Application Integration は gcp-integration。
user-invocable: false
---

# gcp-messaging-workflows

Google Cloud (GCP) のメッセージング・イベント駆動・オーケストレーション系スキル。Pub/Sub（topic・subscription・pull / StreamingPull / push・publish のバッチ / フロー制御 / ordering key・dead-letter topic・retry policy・exactly-once 配信・subscription filter・seek / snapshot・BigQuery / Cloud Storage / Bigtable subscription・import topic・Single Message Transforms（SMT）・スキーマ・CMEK・IAM）、Eventarc（Standard の trigger・Cloud Audit Logs / Pub/Sub / サードパーティの channel・GKE / 内部 HTTP 宛・CloudEvents・イベント種別、Advanced の message bus・enrollment・pipeline・CEL）、Workflows（YAML 構文・steps・条件・反復・subworkflows・エラー処理・retry・並列ステップ・標準ライブラリ・コネクタ・HTTP・callbacks・Eventarc / Scheduler からの実行）、Google Cloud Managed Service for Apache Kafka（cluster・topic・consumer group・認証（SASL / mTLS）・Kafka ACL・Kafka Connect・Schema Registry）を扱う。加えて gcloud 4 グループ・REST（Discovery）6 API・IAM 5 ファイルを収録する。分割投入中のため、未投入のカテゴリ（`gcloud/pubsub` / `gcloud/workflows` / `iam` / `rest` / `rest-schemas`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。

**Pub/Sub Lite は非推奨**（`pubsub-concepts/pubsub-lite-deprecation.md`）。公式の記述は「Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.」で、2024-09-24 以降は新規顧客が利用できず、2025-04-15〜2025-07-15 の 90 日間に使っていないプロジェクトは 2025-07-15 から利用できない。新規作業では使わず、移行先は Pub/Sub（`pubsub-concepts/migrate-pubsub-lite-to-pubsub.md`）か Managed Service for Apache Kafka（`pubsub-concepts/migrate-pubsub-lite-to-managed-service-for-apache-kafka.md`）。Lite のガイド本文は収録しない。gcloud の `pubsub lite-*`・REST の `pubsublite`・IAM の `pubsublite` は機械生成ページとして残り、各ページの Notes に非推奨を明記している。

## ディレクトリ構成

```text
skills/gcp-messaging-workflows/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14
      README.md
      eventarc/                   # triggers・channels・message-buses・pipelines・enrollments・google-api-sources 等
        README.md
        eventarc-<group>.md
      managed-kafka/              # clusters・topics・consumer-groups・acls・connect-clusters・connectors・schema-registries
        README.md
        managed-kafka-<group>.md
    pubsub-concepts/              # Pub/Sub の概要・基本概念・信頼性・プロパティ・Kafka との選択・Pub/Sub Lite の廃止告知と移行
      README.md
      <page>.md
    pubsub-publish/               # topic の作成・publish の流れ・メッセージ形式・publish のサンプル
      README.md
      <page>.md
    pubsub-publish-ordering-batching/  # バッチ・publisher のフロー制御・ordering key・ベストプラクティス・圧縮・topic のモニタリング
      README.md
      <page>.md
    pubsub-subscribe/             # subscription の作成・pull・push・push の認証（OIDC）・subscriber のフロー制御
      README.md
      <page>.md
    pubsub-dead-letter-retry/     # dead-letter topic・retry policy・メッセージ保持・subscription のモニタリング
      README.md
      <page>.md
    pubsub-exactly-once-filter-replay/  # exactly-once 配信・subscription filter・seek / snapshot・リース管理
      README.md
      <page>.md
    pubsub-export-subscriptions/  # BigQuery / Cloud Storage / Bigtable subscription
      README.md
      <page>.md
    pubsub-import-topics-smts/    # import topic（Cloud Storage・Amazon MSK）・SMT・JavaScript UDF
      README.md
      <page>.md
    pubsub-schemas/               # スキーマ（Avro / Protocol Buffer）の作成・topic への関連付け・検証
      README.md
      <page>.md
    pubsub-security-ops/          # CMEK・認証・メッセージ保存ポリシー・モニタリング・トラブルシューティング
      README.md
      <page>.md
    pubsub-access-control/        # Pub/Sub の IAM・topic / subscription のポリシー・プロジェクト間の権限
      README.md
      <page>.md
    eventarc-concepts/            # Eventarc の概要・Standard / Advanced・CloudEvents・プロバイダと宛先・イベント種別・ロケーション
      README.md
      <page>.md
    eventarc-standard-triggers/   # trigger の管理・Pub/Sub / Cloud Audit Logs の trigger・フィルタ・パスパターン・受信コード・ロール
      README.md
      <page>.md
    eventarc-destinations-channels/  # GKE / 内部 HTTP 宛・サードパーティ channel・イベントの再試行
      README.md
      <page>.md
    eventarc-advanced/            # message bus・Google ソースからの publish・enrollment / pipeline・CEL
      README.md
      <page>.md
    workflows-concepts-executions/  # Workflows の概要・ベストプラクティス・作成と更新（deploy）・実行
      README.md
      <page>.md
    workflows-syntax/             # steps・条件・反復・サブワークフロー・call・式
      README.md
      <page>.md
    workflows-errors-retry-parallel/  # try / except・raise・retry・並列ステップ
      README.md
      <page>.md
    workflows-connectors-callbacks-triggers/  # 標準ライブラリ・コネクタ・HTTP・認証・callbacks・Eventarc / Scheduler からの実行
      README.md
      <page>.md
    kafka-clusters-topics/        # Managed Service for Apache Kafka の概要・cluster・サイズ計画・ネットワーク・topic・consumer group
      README.md
      <page>.md
    kafka-auth-monitoring/        # 認証（SASL / OAUTHBEARER・mTLS）・Kafka ACL・暗号化（CMEK）・モニタリング
      README.md
      <page>.md
    kafka-connect-schema-registry/  # Kafka Connect・Connect cluster・Pub/Sub sink コネクタ・Schema Registry
      README.md
      <page>.md
```

`references/gcloud/` が担当する gcloud グループ（4）: `pubsub` / `eventarc` / `workflows` / `managed-kafka`。GA コマンドのページは gcloud help の verbatim、alpha / beta は NAME と SYNOPSIS のみ（各ページ冒頭に明記）。

- `pubsub` グループには Pub/Sub Lite のコマンド（`lite-topics` / `lite-subscriptions` / `lite-reservations` / `lite-operations`、非推奨）と `message-transforms`（SMT）を含む
- `eventarc` グループの Advanced 用コマンド（`message-buses` / `pipelines` / `enrollments` / `google-api-sources`）は `eventarc` グループ内にある
- `workflows` グループの `executions` と `workflows run` は実行の操作
- `managed-kafka` の Schema Registry コマンド（`schema-registries`）は beta / alpha のみで GA は無い
- `gcloud workflows deploy` の `--kms-key` / `--clear-kms-key` は gcloud 593.0.0 の help に載らないが、パーサーは受け付ける（`workflows-concepts-executions/creating-updating-workflow.md` の Notes に確認方法と公式ガイドの記述を記載）

- `workflowexecutions`（Workflow Executions API）は `workflows`（ワークフロー定義の管理）とは別の REST API。独立した IAM サービスは無く、ロールは `roles/workflows.*`（`references/iam/workflows.md`）
- Eventarc Advanced のメッセージ publish は `eventarcpublishing.googleapis.com`（Eventarc Publishing API）を使うが、Discovery document が無いため REST ページは無い（エンドポイントは `eventarc-concepts/overview.md` に記載）
## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/README.md` からグループの README（例: `references/gcloud/pubsub/README.md`（後続 PR で投入））→ グループページ・コマンドページを引く。GA は help の verbatim、alpha / beta は NAME と SYNOPSIS のみなので、フラグの詳細が要るときは `gcloud alpha|beta <command> --help` を使う。Cloud Tasks（`gcloud tasks`）・Cloud Scheduler（`gcloud scheduler`）は `gcp-run`
2. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
3. Pub/Sub は 11 カテゴリ（`pubsub-*`）、Eventarc は 4、Workflows は 4、Managed Kafka は 3 に分かれる。概念か操作か、publish 側か subscribe 側か、配信保証・export・取り込み・スキーマ・セキュリティのどれかで選ぶ
4. 非推奨・終了を確認するときは `pubsub-concepts/pubsub-lite-deprecation.md`（Pub/Sub Lite）と `eventarc-concepts/event-types.md`（Cloud IoT イベント）を引く
5. Workflows の定期実行・Eventarc 経由の実行は `workflows-connectors-callbacks-triggers/`（`schedule-workflow.md`・`trigger-workflow-eventarc.md`）。Cloud Scheduler 自体の設定は `gcp-run`

`samples/` と `scripts/` は本スキルに無い。コマンドは `references/gcloud/` と各ガイドのコードブロックを引く。

未投入カテゴリ（`gcloud/pubsub` / `gcloud/workflows` / `iam` / `rest` / `rest-schemas`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（4 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| `gcloud eventarc`（triggers・channels・message-buses・pipelines・enrollments・google-api-sources）のフラグを調べたい | gcloud/eventarc | [references/gcloud/eventarc/README.md](references/gcloud/eventarc/README.md) |
| `gcloud managed-kafka`（clusters・topics・consumer-groups・acls・connect-clusters・connectors・schema-registries）のフラグを調べたい | gcloud/managed-kafka | [references/gcloud/managed-kafka/README.md](references/gcloud/managed-kafka/README.md) |
| Pub/Sub の概要・topic / subscription / message の基本概念・信頼性・プロパティ一覧・Pub/Sub と Kafka の選び方・gcloud クイックスタート・Pub/Sub Lite の廃止告知と移行 | pubsub-concepts | [references/pubsub-concepts/README.md](references/pubsub-concepts/README.md) |
| topic の作成・publish の流れ・メッセージ形式と属性・publish のサンプル | pubsub-publish | [references/pubsub-publish/README.md](references/pubsub-publish/README.md) |
| バッチ publish・publisher のフロー制御・ordering key・publish のベストプラクティス・メッセージ圧縮・topic のモニタリング | pubsub-publish-ordering-batching | [references/pubsub-publish-ordering-batching/README.md](references/pubsub-publish-ordering-batching/README.md) |
| subscription の作成（pull / push / export）・pull（StreamingPull）・push のエンドポイントと backoff・push の OIDC 認証・subscriber のフロー制御 | pubsub-subscribe | [references/pubsub-subscribe/README.md](references/pubsub-subscribe/README.md) |
| dead-letter topic・retry policy（指数バックオフ）・subscription のメッセージ保持・subscription のモニタリング | pubsub-dead-letter-retry | [references/pubsub-dead-letter-retry/README.md](references/pubsub-dead-letter-retry/README.md) |
| exactly-once 配信・subscription filter・seek / snapshot とメッセージの再生・リース管理（ack 期限の延長） | pubsub-exactly-once-filter-replay | [references/pubsub-exactly-once-filter-replay/README.md](references/pubsub-exactly-once-filter-replay/README.md) |
| BigQuery subscription・Cloud Storage subscription・Bigtable subscription の概要と作成 | pubsub-export-subscriptions | [references/pubsub-export-subscriptions/README.md](references/pubsub-export-subscriptions/README.md) |
| import topic（Cloud Storage・Amazon MSK からの取り込み）・Single Message Transforms（SMT）・JavaScript UDF | pubsub-import-topics-smts | [references/pubsub-import-topics-smts/README.md](references/pubsub-import-topics-smts/README.md) |
| スキーマ（Avro / Protocol Buffer）の作成・topic への関連付け・メッセージの検証 | pubsub-schemas | [references/pubsub-schemas/README.md](references/pubsub-schemas/README.md) |
| CMEK（Cloud KMS Autokey を含む）・認証・メッセージ保存ポリシー（リージョン制限）・モニタリングの指標とアラート・トラブルシューティング | pubsub-security-ops | [references/pubsub-security-ops/README.md](references/pubsub-security-ops/README.md) |
| Pub/Sub の IAM ロール・操作ごとの権限・topic / subscription のポリシーの取得と設定・プロジェクト間の publish / subscribe に必要な権限 | pubsub-access-control | [references/pubsub-access-control/README.md](references/pubsub-access-control/README.md) |
| Eventarc の概要・イベント駆動アーキテクチャ・Standard と Advanced の違い・CloudEvents 形式・イベントプロバイダと宛先・イベント種別の一覧（trigger の `type` に入れる値）・ロケーション | eventarc-concepts | [references/eventarc-concepts/README.md](references/eventarc-concepts/README.md) |
| trigger の一覧・更新・削除・Pub/Sub / Cloud Audit Logs の trigger 作成（Cloud Run 宛）・`serviceName` / `methodName` の調べ方・パスパターン・Cloud Run 側のイベント受信・trigger に必要なロール | eventarc-standard-triggers | [references/eventarc-standard-triggers/README.md](references/eventarc-standard-triggers/README.md) |
| GKE 宛・VPC 内部 HTTP エンドポイント宛の trigger・サードパーティ プロバイダの channel と trigger・イベントの再試行（retry / dead-letter） | eventarc-destinations-channels | [references/eventarc-destinations-channels/README.md](references/eventarc-destinations-channels/README.md) |
| Eventarc Advanced の message bus・Google ソースからの publish・enrollment と pipeline（宛先・リトライ・変換）・CEL によるフィルタ | eventarc-advanced | [references/eventarc-advanced/README.md](references/eventarc-advanced/README.md) |
| Workflows の概要・ベストプラクティス・ワークフローの作成と更新（YAML / JSON・`gcloud workflows deploy`・サービスアカウント・CMEK）・実行（コンソール・gcloud・REST・引数） | workflows-concepts-executions | [references/workflows-concepts-executions/README.md](references/workflows-concepts-executions/README.md) |
| Workflows の steps・条件（`switch`）・反復（`for`）・サブワークフロー・`call`・式（`${}`） | workflows-syntax | [references/workflows-syntax/README.md](references/workflows-syntax/README.md) |
| Workflows のエラー捕捉（`try` / `except`）・`raise`・retry（policy・predicate・backoff）・並列ステップ（`parallel`・branches・共有変数） | workflows-errors-retry-parallel | [references/workflows-errors-retry-parallel/README.md](references/workflows-errors-retry-parallel/README.md) |
| Workflows の標準ライブラリ・コネクタ・HTTP リクエスト・認証（OAuth 2.0 / OIDC）・callback エンドポイント・Eventarc からのトリガー・Scheduler からの定期実行 | workflows-connectors-callbacks-triggers | [references/workflows-connectors-callbacks-triggers/README.md](references/workflows-connectors-callbacks-triggers/README.md) |
| Managed Service for Apache Kafka の概要と制限・cluster の作成・サイズ計画・ネットワーク接続・topic の作成・consumer group | kafka-clusters-topics | [references/kafka-clusters-topics/README.md](references/kafka-clusters-topics/README.md) |
| Kafka クライアント認証（SASL / OAUTHBEARER・mTLS）・Kafka ACL・暗号化（CMEK）・cluster とクライアントのモニタリング | kafka-auth-monitoring | [references/kafka-auth-monitoring/README.md](references/kafka-auth-monitoring/README.md) |
| Kafka Connect の概要・Connect cluster の作成・Pub/Sub sink コネクタ・Schema Registry の概要 | kafka-connect-schema-registry | [references/kafka-connect-schema-registry/README.md](references/kafka-connect-schema-registry/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud/pubsub` / `gcloud/workflows` / `iam` / `rest` / `rest-schemas`

## 他スキルとの使い分け

- `gcp-run` — Cloud Run / Cloud Run functions を push・Eventarc・Workflows の宛先にするときの Cloud Run 側の設定、Cloud Tasks（`gcloud tasks`）・Cloud Scheduler（`gcloud scheduler`）。Workflows 側のスケジュール実行の手順は本スキルの `workflows-connectors-callbacks-triggers/schedule-workflow.md`
- `gcp-gke` — Eventarc の宛先となる GKE のクラスター側の設定。本スキルは GKE 宛 trigger（`eventarc-destinations-channels`）
- `gcp-observability` — Cloud Logging の sink・Cloud Monitoring の notification channel が Pub/Sub topic へ書く設定、Eventarc の Cloud Audit Logs trigger の元になる Cloud Audit Logs。本スキルは宛先 topic の作成・publisher ロールの付与（`pubsub-publish`・`pubsub-access-control`）
- `gcp-security` — Cloud KMS の鍵（CMEK）・VPC Service Controls の境界・Workflows から使う Secret Manager。本スキルは Pub/Sub / Kafka 側の CMEK 設定（`pubsub-security-ops`・`kafka-auth-monitoring`）
- `gcp-security-compliance` — Security Command Center の通知（Pub/Sub 宛）の設定。本スキルは通知先 topic と subscription
- `gcp-storage` — Pub/Sub の export 先・import 元となる Cloud Storage と Cloud Storage の通知。本スキルは Cloud Storage subscription・import topic
- `gcp-databases-nosql` — Pub/Sub の export 先となる Bigtable。本スキルは Bigtable subscription
- `gcp-foundation` — IAM・サービスアカウント・Workload Identity Federation・Organization Policy。本スキルは各プロダクトのロールの機械生成ページ
- `gcp-networking` — VPC・Private Service Connect / network attachment（Managed Kafka と Eventarc の内部 HTTP エンドポイント宛で使う）・Cloud DNS。本スキルは Kafka のネットワーク接続と内部 HTTP 宛 trigger のガイド
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターンと Pub/Sub エミュレーター。本スキルは各ガイド内のコード
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-integration`（予定）— Application Integration・Integration Connectors・Data Connectors。Workflows と Application Integration の選択はこちら。「コネクタ」は名前が衝突し、Workflows のコネクタ（`workflows-connectors-callbacks-triggers`）と Kafka Connect のコネクタ（`kafka-connect-schema-registry`）は本スキル、Integration Connectors は `gcp-integration`
- `gcp-bigquery`（予定）— Pub/Sub の export 先となる BigQuery のデータセット側
- `gcp-data-pipelines`（予定）— Dataflow・Composer・Orchestration Pipelines。`gcloud orchestration-pipelines` は本スキルに無い
- `gcp-devops`（予定）— Cloud Build の trigger・Artifact Registry
- `gcp-iac`（予定）— Terraform
- `gcp-api-management`（予定）— Apigee・API Gateway
- `gcp-agent-platform`（予定）— Agent Platform
- `cloudflare-stateful` — Cloudflare Queues / Workflows / Durable Objects。本スキルは Google Cloud の Pub/Sub / Workflows
- `upstash` — QStash / Redis
- `inngest` / `bullmq` — Node.js のジョブキュー・durable function。Google Cloud のマネージドなメッセージングではない

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 料金（取得していない）。公式の料金ページで確認する: https://cloud.google.com/pubsub/pricing 、https://cloud.google.com/eventarc/pricing 、https://cloud.google.com/workflows/pricing 、https://cloud.google.com/managed-service-for-apache-kafka/pricing
- Pub/Sub Lite のガイド本文（廃止告知と移行 2 件のみ）
- Pub/Sub: push subscription の作成詳細（VPC Service Controls の制約を含む）・Kinesis / Azure Event Hubs / Confluent Cloud の import topic・SMT の作成・更新・削除と AI 推論 SMT・スキーマのリビジョン操作・topic / subscription の一覧・更新・削除・OpenTelemetry トレース・カスタム制約・トラブルシューティングの個別ページ・Kafka からの移行
- Eventarc: CMEK（Standard / Advanced）・VPC Service Controls・Terraform・Cloud Storage trigger・プロバイダ別 trigger の個別ページ・イベントの変換・モニタリング・トラブルシューティング。Private preview の Eventarc Publishing API（カスタムイベント）
- Workflows: 関数別の標準ライブラリ・API 別のコネクタ参照（Overview とメソッド別）・構文のチートシート・変数 / リスト / マップ / 文字列・Kubernetes API コネクタ・IAP 保護エンドポイント・Secret Manager・CMEK・VPC Service Controls・Cloud Build・Terraform・デバッグ・AWS Step Functions からの移行・チュートリアル
- Managed Service for Apache Kafka: cluster / topic / consumer group の更新・削除・一覧・broker とディスクのサイズ・パーティション割り当て・災害復旧・MirrorMaker でのデータ移行・ACL の個別操作・クイックスタート・BigQuery / Cloud Storage / Postgres / MirrorMaker コネクタ・Connect のトラブルシューティング・Schema Registry の subject / version 操作・Terraform・MCP・確約利用割引
- MCP（Pub/Sub と Managed Kafka のリモート MCP サーバー）、Trusted Partner Cloud との差異（取得できなかったページ）
- Dataflow 連携・Cloud Run / functions / App Engine 側の接続ページ（`gcp-run`、`gcp-data-pipelines`（予定））、Cloud Tasks / Composer / Dataform との比較やチュートリアル
- Application Integration・Integration Connectors・Data Connectors（`gcp-integration`（予定））
- 監査ログのメソッドと権限タイプの対応表（各プロダクトの audit-logging ページ）、Java / C# / PHP / C++ / Ruby の SDK 固有の手順、Console の操作手順（各ページの Notes に省略した形式を記載）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-18（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分）、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/iam/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM roles-permissions reference / `google-api-python-client` 同梱の Discovery document）。他の 22 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME と SYNOPSIS のみ。`managed-kafka schema-registries` は beta / alpha のみ
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に理由を残す。公式の誤りを直したものは Notes に `Corrected from the official docs` と記す（例: `workflows-concepts-executions/creating-updating-workflow.md` の `executionHistoryLevel` の値）
- 削除は元に戻せない操作を含む（例: ワークフローの削除は実行も削除し、実行中のものを取り消す）。該当ページの Notes に注意を記載しているため、使い捨てのプロジェクトで先に試す
- 非推奨・終了（references で確認したもの）:
  - Pub/Sub Lite は非推奨で、2027-01-31 に停止する。2024-09-24 以降は新規顧客が利用不可。2025-04-15〜2025-07-15 の 90 日間に使っていないプロジェクトは 2025-07-15 から利用不可（`pubsub-concepts/pubsub-lite-deprecation.md`）。移行先は Pub/Sub と Managed Service for Apache Kafka
  - Cloud IoT Core は 2023-08-16 に終了し、Cloud IoT イベントはその時点で非推奨（`eventarc-concepts/event-types.md`）
- `gcloud workflows deploy` の `--kms-key` は 593.0.0 の help に載らない（パーサーは受け付ける）。公式ガイドの記述どおり収録している
- 新しいフラグ・機能は `gcloud help` と公式 reference で確認する
