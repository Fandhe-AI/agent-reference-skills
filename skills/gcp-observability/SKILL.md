---
name: gcp-observability
description: >
  Google Cloud (GCP) の Cloud Logging・Cloud Monitoring・Cloud Trace・Cloud Profiler・Error Reporting・Ops Agent・Service Health・Audit Logs・SLO・uptime check・Managed Service for Prometheus・Observability Analytics。Google Cloud Observability (旧 Stackdriver)。Log Router・alerting policy・PromQL・OpenTelemetry・log-based metrics。Cloud Debugger 停止済み、MQL は非推奨、レガシーエージェントはサポート終了。pino・自前 Prometheus とは別。
user-invocable: false
---

# gcp-observability

Google Cloud (GCP) のオブザーバビリティ系スキル（Google Cloud Observability。旧 Stackdriver 系で、公式 URL の `stackdriver/docs/` パスと `roles/stackdriver.*` に名称が残る）。Cloud Logging（Log Router・sink・log bucket / log view・Logging query language・Logs Explorer・log-based metrics・log-based alerting policies）、Cloud Audit Logs（Admin Activity / Data Access / System Event / Policy Denied・`auditConfigs`）、Observability Analytics（SQL・linked dataset・observability bucket・observability scope）、Cloud Monitoring（metrics scope・metric model・alerting policies・notification channels・alerts・snoozes・dashboards・Metrics Explorer・uptime check・synthetic monitors・SLO）、PromQL（MQL は非推奨）、Google Cloud Managed Service for Prometheus（managed collection・PodMonitoring・managed rules・Alertmanager）、Ops Agent（インストール・設定・agent policies・トラブルシューティング）、OpenTelemetry（Google-Built OpenTelemetry Collector・Telemetry (OTLP) API・Node.js / Python の計装）、Cloud Trace・Cloud Profiler・Error Reporting、Personalized Service Health、Application Monitoring / App Topology を扱う。加えて gcloud 7 グループ・REST（Discovery）6 API・IAM 10 ファイルを収録する。分割投入中のため、未投入のカテゴリ（`gcloud/logging` / `gcloud/monitoring` / `gcloud/observability` / `gcloud/service-health` / `gcloud/trace` / `iam` / `rest` / `rest-schemas`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。Service Health の Discovery document は無いため REST ページは無い（`gcloud service-health` と IAM の機械生成ページ、およびガイドのみ）。

**Cloud Debugger は 2023-05-31 に停止済み**（`observability-overview/deprecations.md`。IAM の `clouddebugger` ロールは `references/iam/`（後続 PR で投入） に残る）。**MQL は 2024-10-22 から推奨されないクエリ言語**（停止ではなく既存の MQL のチャート・ダッシュボード・アラートは動作し、2025-07-22 から Console での新規作成は不可、Monitoring API では可。`monitoring-promql-mql/mql-end-of-support.md`）。**レガシー Monitoring / Logging エージェントは 2026-09-28 にサポート終了**（既存のインストールは停止せず動作し続けるが非推奨、2027-09-28 に Cloud Customer Care の移行支援が終了。`ops-agent-install-configure/legacy-agents.md`）。新規作業では PromQL と Ops Agent を使う。Trace の span を sink で export する機能は 2027-02-18 に停止予定（`cloud-trace/trace-export-overview.md`）。

## ディレクトリ構成

```text
skills/gcp-observability/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14
      README.md
      app-topology/               # domains・locations・resources-graph
        README.md
        app-topology-<group>.md
      error-reporting/            # beta のみ（gcloud beta error-reporting events）
        README.md
        error-reporting-events.md
    observability-overview/       # Google Cloud Observability の概要・scopes・非推奨一覧・Application Monitoring・App Topology
      README.md
      <page>.md                   # 例: deprecations.md
    logging-concepts/             # Cloud Logging の概要・LogEntry・構造化ログ・保存・リージョン・IAM・トレース相関
      README.md
      <page>.md
    logging-routing-sinks/        # Log Router・sink の作成と認可・aggregated sink・集中ログ保管
      README.md
      <page>.md
    logging-buckets-views/        # log bucket の作成・保持期間・削除と復元・Observability Analytics へのアップグレード・log view
      README.md
      <page>.md
    logging-query-explorer/       # Logging query language・関数・Logs Explorer・サンプルクエリ
      README.md
      <page>.md
    logging-metrics-alerts/       # log-based metrics・ラベル・bucket スコープ・log-based alerting policies
      README.md
      <page>.md
    audit-logs/                   # Cloud Audit Logs の概要・構造・Data Access の有効化・ベストプラクティス
      README.md
      <page>.md
    observability-storage-analytics/  # observability bucket・CMEK・Observability Analytics の SQL・analytics views
      README.md
      <page>.md
    monitoring-concepts-metrics/  # Cloud Monitoring の概要・metric model・kind と type・metrics scope・IAM・user-defined metrics
      README.md
      <page>.md
    monitoring-alerting-policies/ # alerting policies の概念・Console / API での作成・ドキュメントと変数
      README.md
      <page>.md
    monitoring-notifications-incidents/  # notification channels・ペイロード・alerts の表示・調査・管理
      README.md
      <page>.md
    monitoring-dashboards-charts/ # ダッシュボード・Metrics Explorer・Dashboards API・レイアウトとウィジェット・変数
      README.md
      <page>.md
    monitoring-promql-mql/        # PromQL・PromQL アラート・Prometheus からの移行・Grafana・MQL（非推奨）
      README.md
      <page>.md
    monitoring-uptime-synthetic/  # uptime check・synthetic monitors
      README.md
      <page>.md
    monitoring-slo/               # SLI / SLO・エラーバジェット・burn rate アラート・SLO API
      README.md
      <page>.md
    managed-prometheus/           # Managed Service for Prometheus: managed collection・PodMonitoring・managed rules・Alertmanager
      README.md
      <page>.md
    ops-agent-install-configure/  # Ops Agent の概要・インストール・設定（receivers・processors）・レガシーエージェントのサポート終了
      README.md
      <page>.md
    ops-agent-policies-troubleshooting/  # agent policies・認可・トラブルシューティング・ログローテーション・サードパーティ連携
      README.md
      <page>.md
    opentelemetry-telemetry-api/  # 計装方式の選択・Google-Built OpenTelemetry Collector・Telemetry (OTLP) API・Node.js / Python / gRPC
      README.md
      <page>.md
    cloud-trace/                  # Cloud Trace: trace / span・コンテキスト伝搬・サンプリング・フィルタ・ログ連携・trace export の廃止
      README.md
      <page>.md
    profiler-error-reporting/     # Cloud Profiler（Go / Node.js / Python）と Error Reporting（グルーピング・収集・Node.js / Python）
      README.md
      <page>.md
    service-health/               # Personalized Service Health: イベント・影響・組織ビュー・アラート・ログ・インシデントレポート
      README.md
      <page>.md
```

`references/gcloud/` が担当する gcloud グループ（7）: `app-topology` / `error-reporting` / `logging` / `monitoring` / `observability` / `service-health` / `trace`。GA コマンドのページは gcloud help の verbatim、alpha / beta は NAME と SYNOPSIS のみ（各ページ冒頭に明記）。

- `trace` は gcloud 593.0.0 では alpha 専用（`gcloud alpha trace sinks` の 5 コマンド）。Trace の GA の gcloud コマンドは無い
- `error-reporting` は beta 専用（`gcloud beta error-reporting events` の `delete` / `report` の 2 コマンド）
- `service-health` は `events` / `organization-events` / `organization-impacts` に GA がある。`artifacts` / `impacts` は alpha / beta のみ
- `monitoring` の `channels` / `channel-descriptors` / `metrics-scopes` は alpha / beta のみ（GA なし）
## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/README.md` からグループの README（例: `references/gcloud/logging/README.md`（後続 PR で投入））→ グループページ・コマンドページを引く。`trace`（alpha のみ）・`error-reporting`（beta のみ）は GA コマンドが無い。GKE の `--logging` / `--monitoring` は `gcp-gke`、`gcloud compute instances ops-agents policies` は `gcp-compute`
2. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
3. Logging は 6 カテゴリ（`logging-concepts` / `logging-routing-sinks` / `logging-buckets-views` / `logging-query-explorer` / `logging-metrics-alerts` / `audit-logs`）、Monitoring は 7 カテゴリに分かれる。概念か操作か、保管か検索か通知かで選ぶ
4. 非推奨・サポート終了を確認するときは `observability-overview/deprecations.md`、`monitoring-promql-mql/mql-end-of-support.md`、`ops-agent-install-configure/legacy-agents.md`、`cloud-trace/trace-export-overview.md` を引く
5. Security Command Center・Access Transparency は `gcp-security-compliance`、IAM・Organization Policy は `gcp-foundation`

`samples/` と `scripts/` は本スキルに無い。コマンドは `references/gcloud/` と各ガイドのコードブロックを引く。

未投入カテゴリ（`gcloud/logging` / `gcloud/monitoring` / `gcloud/observability` / `gcloud/service-health` / `gcloud/trace` / `iam` / `rest` / `rest-schemas`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（7 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| `gcloud app-topology`（domains・locations・resources-graph）を調べたい | gcloud/app-topology | [references/gcloud/app-topology/README.md](references/gcloud/app-topology/README.md) |
| `gcloud beta error-reporting events`（beta 専用）を調べたい | gcloud/error-reporting | [references/gcloud/error-reporting/README.md](references/gcloud/error-reporting/README.md) |
| Google Cloud Observability の全体像・observability scope / log scope / metrics scope / trace scope・非推奨と停止の一覧（MQL・レガシーエージェント・Cloud Debugger）・Application Monitoring・App Topology | observability-overview | [references/observability-overview/README.md](references/observability-overview/README.md) |
| Cloud Logging の概要・LogEntry のデータモデル・構造化ログ（`jsonPayload`・特殊フィールド）・エージェントかクライアントライブラリかの選択・リージョン・IAM・トレース相関 | logging-concepts | [references/logging-concepts/README.md](references/logging-concepts/README.md) |
| Log Router・sink の作成 / 認可 / 無効化・フィルタ（除外）・aggregated sink（intercepting / non-intercepting）・組織の集中ログ保管 | logging-routing-sinks | [references/logging-routing-sinks/README.md](references/logging-routing-sinks/README.md) |
| log bucket の作成・保持期間・ロック・削除（7 日の保留）と復元・Observability Analytics へのアップグレード・linked BigQuery dataset・log view とアクセス付与 | logging-buckets-views | [references/logging-buckets-views/README.md](references/logging-buckets-views/README.md) |
| Logging query language の構文・関数（`regexp_extract`・`SEARCH` 等）・Logs Explorer のクエリ作成・サンプルクエリ（Compute・Kubernetes・IAM / セキュリティ） | logging-query-explorer | [references/logging-query-explorer/README.md](references/logging-query-explorer/README.md) |
| log-based metrics（counter / distribution）・ラベルの抽出・bucket スコープ・log-based alerting policies（LogMatch）・トラブルシューティング | logging-metrics-alerts | [references/logging-metrics-alerts/README.md](references/logging-metrics-alerts/README.md) |
| Cloud Audit Logs の種類・ログ名・Data Access 監査ログの有効化（`auditConfigs`）・ベストプラクティス・監査ログの SQL 分析 | audit-logs | [references/audit-logs/README.md](references/audit-logs/README.md) |
| observability bucket（`_Trace`）の作成・observability bucket の CMEK・Observability Analytics の SQL クエリ・analytics views | observability-storage-analytics | [references/observability-storage-analytics/README.md](references/observability-storage-analytics/README.md) |
| Cloud Monitoring の概要・metric model（monitored resource・metric type・ラベル）・kind と value type・保持期間・命名規則・集計・metrics scope・IAM・user-defined metrics | monitoring-concepts-metrics | [references/monitoring-concepts-metrics/README.md](references/monitoring-concepts-metrics/README.md) |
| alerting policy の概念・条件（metric-threshold / absence 等）・`AlertPolicy` の API・gcloud での作成・通知のドキュメントと変数 | monitoring-alerting-policies | [references/monitoring-alerting-policies/README.md](references/monitoring-alerting-policies/README.md) |
| notification channels（Email・SMS・Slack・PagerDuty・webhook・Pub/Sub）・通知ペイロードのスキーマ・alerts の表示 / 調査 / 確認応答 / snooze / クローズ | monitoring-notifications-incidents | [references/monitoring-notifications-incidents/README.md](references/monitoring-notifications-incidents/README.md) |
| カスタムダッシュボード・Metrics Explorer・Dashboards API（作成・更新・削除）・レイアウトとウィジェットの JSON・ダッシュボード変数 | monitoring-dashboards-charts | [references/monitoring-dashboards-charts/README.md](references/monitoring-dashboards-charts/README.md) |
| Cloud Monitoring の PromQL・PromQL アラート・Prometheus のアラートルール移行・Grafana ダッシュボードのインポート・MQL（非推奨）の扱い | monitoring-promql-mql | [references/monitoring-promql-mql/README.md](references/monitoring-promql-mql/README.md) |
| uptime check の作成・ICMP ping・失敗原因・synthetic monitor（Mocha / Puppeteer の Cloud Run functions）のデプロイとトラブルシューティング | monitoring-uptime-synthetic | [references/monitoring-uptime-synthetic/README.md](references/monitoring-uptime-synthetic/README.md) |
| SLI / SLO・エラーバジェット・service の定義・SLO の作成・burn rate アラート・SLO API の JSON・`select_slo_*` セレクタ | monitoring-slo | [references/monitoring-slo/README.md](references/monitoring-slo/README.md) |
| Managed Service for Prometheus の managed collection・PodMonitoring / ClusterPodMonitoring・OperatorConfig・managed rules・Alertmanager・rule-evaluator | managed-prometheus | [references/managed-prometheus/README.md](references/managed-prometheus/README.md) |
| Ops Agent の概要・インストール・アップグレード・設定（logging receivers / processors・metrics）・レガシーエージェントからの移行とサポート終了 | ops-agent-install-configure | [references/ops-agent-install-configure/README.md](references/ops-agent-install-configure/README.md) |
| Ops Agent の agent policies（Beta / GA）・認可（サービスアカウント）・インストール失敗のトラブルシューティング・ログローテーション・サードパーティ連携 | ops-agent-policies-troubleshooting | [references/ops-agent-policies-troubleshooting/README.md](references/ops-agent-policies-troubleshooting/README.md) |
| 計装方式の選択・Google-Built OpenTelemetry Collector・Telemetry (OTLP) API・OTLP exporter への移行・Node.js / Python の OpenTelemetry 計装・gRPC のオブザーバビリティ | opentelemetry-telemetry-api | [references/opentelemetry-telemetry-api/README.md](references/opentelemetry-telemetry-api/README.md) |
| Cloud Trace の trace / span・`traceparent` / `X-Cloud-Trace-Context`・サンプリング・Trace Explorer・フィルタ・ログとの連携・プロジェクト横断・trace sink の廃止と Observability Analytics への移行 | cloud-trace | [references/cloud-trace/README.md](references/cloud-trace/README.md) |
| Cloud Profiler（Go / Node.js / Python のプロファイリング）・Error Reporting（エラーのグルーピング・ログ形式・収集・Node.js / Python のセットアップ・管理） | profiler-error-reporting | [references/profiler-error-reporting/README.md](references/profiler-error-reporting/README.md) |
| Personalized Service Health のイベント・影響を受けるリソース・組織ビュー・Cloud Logging でのアラート・ログ・アクセス管理・インシデントレポート | service-health | [references/service-health/README.md](references/service-health/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud/logging` / `gcloud/monitoring` / `gcloud/observability` / `gcloud/service-health` / `gcloud/trace` / `iam` / `rest` / `rest-schemas`

## 他スキルとの使い分け

- `gcp-foundation` — IAM・サービスアカウント・Organization Policy・Cloud Asset Inventory・リソース階層・認証（ADC）。本スキルは Logging / Monitoring / Trace 等のロールと権限の機械生成ページ
- `gcp-compute` — Compute Engine（Ops Agent を動かす VM）・`gcloud compute instances ...`・VM Manager（OS Config）と `ops-agents policies` コマンド。本スキルは Ops Agent の設定・agent policies のガイド
- `gcp-gke` — GKE の logging / monitoring 設定（`gcloud container clusters ... --logging / --monitoring`）・クラスター側の Managed Service for Prometheus の有効化。本スキルは Managed Service for Prometheus のリソース（PodMonitoring・managed rules 等）と PromQL
- `gcp-run` — Cloud Run / Cloud Run functions / App Engine 自体のログ・トレース設定。synthetic monitor のスクリプトは Cloud Run functions として動くが、関数のデプロイ手順は本スキルの `monitoring-uptime-synthetic`
- `gcp-networking` — VPC Flow Logs・ファイアウォールルールのログ・Cloud NAT のログの設定。本スキルは Cloud Logging 側の sink・クエリ・保管
- `gcp-load-balancing` — ロードバランサーのログ設定。本スキルは Cloud Logging 側の sink・クエリ・保管
- `gcp-security` — Cloud KMS（log bucket の CMEK 鍵）・VPC Service Controls。本スキルは log bucket / observability bucket の CMEK 設定のガイド
- `gcp-security-compliance` — Security Command Center・Access Transparency・Access Approval。本スキルは Cloud Audit Logs（管理アクティビティ・データアクセスの監査ログ）
- `gcp-storage` — sink の宛先となる Cloud Storage バケット。本スキルは sink の作成と書き込み ID の認可
- `gcp-databases-relational` / `gcp-databases-nosql` — 各データベースのプロダクト側の設定
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン（認証・リトライ・ページネーション）。本スキルは Logging / Profiler / Error Reporting の個別ライブラリの使い方
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-bigquery`（予定）— sink の宛先と linked dataset の BigQuery
- `gcp-messaging-workflows`（予定）— sink / notification channel の宛先となる Pub/Sub
- `gcp-devops`（予定）— Cloud Build・Artifact Registry
- `gcp-iac`（予定）— Terraform
- `gcp-agent-platform`（予定）— Gemini Cloud Assist
- `pino` — pino ロガー本体。Cloud Logging は stdout の JSON を、特殊フィールド（`severity` 等）が合うときに構造化ログとして取り込む（`logging-concepts/structured-logging.md`、`opentelemetry-telemetry-api/instrument-nodejs.md`）
- 自前 Prometheus サーバー — Managed Service for Prometheus は Google Cloud のマネージドサービスで、PromQL の意味は上流 Prometheus に従う。自前サーバーの運用は対象外
- `openai-agents` / `vercel-ai-sdk` — それぞれ Agents SDK のトレースと AI SDK のテレメトリ。本スキルは Google Cloud の OpenTelemetry（Cloud Trace・Telemetry (OTLP) API）
- `playwright` — ブラウザ E2E テスト。本スキルの synthetic monitor は Mocha / Puppeteer のスクリプトを Cloud Run functions で実行する
- `docker` — コンテナランタイム自体。本スキルはコンテナのログの Cloud Logging への取り込み側

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 料金（取得していない）。各プロダクトの公式の料金ページで確認する
- Cloud Debugger（停止済み。停止通知のみ `observability-overview/deprecations.md`）、MQL の個別手順（非推奨。概要と非推奨通知のみ）
- Java / C# / PHP / C++ / Ruby の SDK（Go は Cloud Profiler の `profiling-go.md` のみ収録）、Terraform、Console の操作手順（各ページの Notes に省略した形式を記載）
- Pub/Sub・BigQuery 側の設定（予定スキル）、Security Command Center・Access Transparency（`gcp-security-compliance`）
- Personalized Service Health の REST（Discovery document なし）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-18（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分）、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/iam/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM roles-permissions reference / `google-api-python-client` 同梱の Discovery document（`main` 時点、commit SHA は未記録））。他の 22 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME と SYNOPSIS のみ。`trace` は alpha のみ、`error-reporting` は beta のみ
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に理由を残す
- 削除・保持期間の短縮・sink / 除外フィルタは、ログを削除する・保存しなくなる操作。該当ページの Notes に注意を記載しているため、使い捨てのプロジェクトで先に試す
- 非推奨・停止（references で確認したもの）:
  - Cloud Debugger は 2022-05-16 に非推奨、2023-05-31 に停止（`observability-overview/deprecations.md`）
  - MQL は 2024-10-22 から非推奨で停止はしていない（`monitoring-promql-mql/mql-end-of-support.md`）
  - レガシー Monitoring / Logging エージェントは 2026-09-28 にサポート終了、既存のインストールは動作し続ける（`ops-agent-install-configure/legacy-agents.md`。`observability-overview/deprecations.md` の表は日付を 2 つ記載）
  - Trace の sink による span の export は 2026-02-18 に非推奨、2027-02-18 に停止（`cloud-trace/trace-export-overview.md`）
- 旧名: Stackdriver の名称は公式 URL の `stackdriver/docs/`、`roles/stackdriver.*`、IAM の "Stackdriver Trace" の記述に残り、現在の製品群は Google Cloud Observability。ガイドは log bucket の分析機能を Observability Analytics と表記し、gcloud 593.0.0 help の `--enable-analytics` 等の説明は Log Analytics と表記する（両者の関係を明記した公式の記述は未確認）
- 新しいフラグ・機能は `gcloud help` と公式 reference で確認する
