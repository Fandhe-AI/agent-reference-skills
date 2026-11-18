---
name: gcp-integration
description: >
  Google Cloud (GCP) の Application Integration (triggers API / Pub/Sub・tasks REST / Connectors / JavaScript / For Each Parallel) と Integration Connectors (custom connectors・event subscriptions・PSC endpoint attachment)。Data Mapping・Data Transformer Jsonnet・authentication profiles。run-as 認可の変更・CMEK・VPC Service Controls・REST v1 / v2・Data Connectors IAM。Google Cloud Workflows は gcp-messaging-workflows。
user-invocable: false
---

# gcp-integration

Google Cloud (GCP) のアプリケーション統合系スキル。Application Integration（統合・version・trigger（API・Pub/Sub）・task（Call REST Endpoint・Connectors・JavaScript・For Each Parallel）・edge と edge condition・variables・error handling・テストと公開・Data Mapping task・Data Transformer（Jsonnet）task・authentication profiles・アクセス制御・execution logs・Cloud Logging・CMEK・VPC Service Controls・run-as 認可の変更）と、Integration Connectors（connection・connector・entity / action・private / public / Google Cloud VPC 内のネットワーク接続・PSC endpoint attachment・custom connectors・event subscriptions・IAM・レート制限・VPC Service Controls）を扱う。加えて Data Connectors（`dataconnectors`）の IAM ロール、REST（Discovery）2 API・IAM 4 ファイルを収録する。分割投入中のため、未投入のカテゴリ（`rest/integrations` / `rest-schemas`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメントの原語）。**gcloud のグループはこれらのプロダクトに無い**ため `references/gcloud/`（後続 PR で投入） は無く、手順の正は REST とコンソール（`gcloud auth print-access-token` は REST 呼び出しの bearer token を得るためだけに使う）。

**Application Integration の認可が変わる**（`application-integration-data-auth-ops/prepare-for-authorization-changes.md`）。公式の記述は、実行ごとに明示的な ID（実行したユーザー、または管理者が制御する run-as サービスアカウント）が必要になり、2026-10-15 以降に作成した統合は既に新しい動作、2026-10-15 より前の統合も 2027-01-15（UTC）から新しい動作になる、というもの。スケジュール・イベントのトリガーで run-as サービスアカウントの無い新規統合は公開もテストもできない。

**JavaScript タスクは Rhino から V8 へ移行**（`application-integration-concepts/configure-javascript-task.md`）。公式の記述は「Effective January 24, 2025, Application Integration will no longer support Rhino as the JavaScript execution engine」で、新規タスクは V8 のみ、既存の公開済みタスクは手動で V8 へ移行するまで Rhino を使う。

**Data Connectors（`dataconnectors`）は docs も Discovery document も無い**。収録は `references/iam/dataconnectors.md` の IAM ロールのみで、Integration Connectors との関係は未確認、本スキルへの割り当ては暫定。`roles/dataconnectors.serviceAgent` 以外の 5 ロールの Launch stage は Beta。

## ディレクトリ構成

```text
skills/gcp-integration/
  SKILL.md
  references/
    rest/                         # 機械生成: Discovery 由来のメソッド表
      README.md
      connectors/                 # Connectors API（connectors）
        README.md
        connectors.md
    iam/                          # 機械生成: IAM roles-permissions reference
      README.md
      integrations-1.md           # Cloud Integrations（ロールと権限の前半）
      integrations-2.md           # Cloud Integrations（権限の後半）
      connectors.md               # Integration Connectors
      dataconnectors.md           # Data Connectors（Beta のロール）
    application-integration-concepts/   # 概要・trigger・task・variables・edge・error handling・テストと公開
      README.md
      <page>.md
    application-integration-data-auth-ops/  # Data Mapping・Data Transformer・認証・アクセス制御・ログ・CMEK・VPC SC・認可の変更
      README.md
      <page>.md
    integration-connectors/       # 概要・ネットワーク接続・custom connectors・event subscriptions・権限・VPC SC
      README.md
      <page>.md
```

`references/rest/` `references/rest-schemas/`（後続 PR で投入） の API（2）: `integrations`（Application Integration API）/ `connectors`（Connectors API）。各メソッドの `Versions` 行で v1 / v2 のどちらが定義するかを確認する（`integrations` は v1 と v2、`connectors` は v1 と v2）。

- `connectors` v2 は connection のランタイム側の API（entity・action の実行。例: `connectors.projects.locations.connections.actions.execute`）。管理系メソッドとの対応は各メソッドの `Versions` 行で確認する
- `integrations` のメソッドは `integrations-1.md` と `integrations-2.md` に分割され、スキーマは 3 分割（`integrations-1.md` ... `integrations-3.md`）

`references/iam/` のファイル（4）: `integrations-1` / `integrations-2`（Cloud Integrations を 2 分割。ロールは `integrations-1` に、`integrations-2` は続きの権限）/ `connectors` / `dataconnectors`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）。統合の中身（trigger・task・変数・変換）は `application-integration-concepts` と `application-integration-data-auth-ops`、接続・ネットワーク・custom connector は `integration-connectors`
2. gcloud コマンド → このスキルには無い。公式ドキュメントの手順はコンソールと REST。REST を `curl` で呼ぶときの bearer token は `gcloud auth print-access-token` で得る
3. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`（後続 PR で投入）。`<api>` は `integrations` / `connectors` の 2 つ。メソッドは `Versions` 行で v1 / v2 を確認する
4. IAM ロール・権限 → `references/iam/README.md` の索引から引く。ロール ID（例: `roles/integrations.integrationInvoker`・`roles/connectors.admin`・`roles/connectors.invoker`・`roles/dataconnectors.admin`）で `references/iam/` 配下を grep して該当ファイルを特定する。Cloud Integrations のロールは `integrations-1.md` と `integrations-2.md` に分かれるため、両方を grep する
5. run-as 認可の変更は `application-integration-data-auth-ops/prepare-for-authorization-changes.md`（日付・手順の順序・Service Account User）、Integration Connectors の connection 作成に必要な権限（`iam.serviceAccounts.actAs`）は `integration-connectors/connectors-access-permissions.md`
6. レート制限（HTTP 429）・ノードの autoscaling・connection の作成の前提は `integration-connectors/overview.md` と `integration-connectors/connectors-access-permissions.md`（元のページを統合している）
7. Workflows との選択、Pub/Sub topic、Cloud Scheduler 等は他スキル（下記「他スキルとの使い分け」）

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| ロール ID の権限一覧・事前定義ロールを調べたい（`roles/integrations.*` / `roles/connectors.*` / `roles/dataconnectors.*`） | iam | [references/iam/README.md](references/iam/README.md) |
| Data Connectors のロール（`roles/dataconnectors.*`、Beta）を調べたい | iam | [references/iam/README.md](references/iam/README.md) |
| REST のメソッド・パスを調べたい | rest | [references/rest/README.md](references/rest/README.md) |
| Connectors API（connectors）のメソッド（v1 / v2。v2 は entity・action の実行） | rest/connectors | [references/rest/connectors/README.md](references/rest/connectors/README.md) |
| Application Integration の概要・統合と version・セットアップ（API の有効化・リージョン）・trigger の種類と実行モード（同期 / 非同期）・task の一覧 | application-integration-concepts | [references/application-integration-concepts/README.md](references/application-integration-concepts/README.md) |
| API trigger・Pub/Sub trigger の設定・Call REST Endpoint / Connectors / JavaScript / For Each Parallel の各 task | application-integration-concepts | [references/application-integration-concepts/README.md](references/application-integration-concepts/README.md) |
| variables（config・system・integration・task）・edge と edge condition・error handling（エラーの種類・戦略・コード）・テストと公開 | application-integration-concepts | [references/application-integration-concepts/README.md](references/application-integration-concepts/README.md) |
| Data Mapping task・関数の一覧・Data Transformer（Diagram / Jsonnet）task と関数ライブラリ | application-integration-data-auth-ops | [references/application-integration-data-auth-ops/README.md](references/application-integration-data-auth-ops/README.md) |
| authentication profiles（OAuth 2.0・JWT・サービスアカウント・API キー等）・API の認証・アクセス制御（user-managed / default サービスアカウント） | application-integration-data-auth-ops | [references/application-integration-data-auth-ops/README.md](references/application-integration-data-auth-ops/README.md) |
| execution logs・Cloud Logging・CMEK・VPC Service Controls・run-as 認可の変更 | application-integration-data-auth-ops | [references/application-integration-data-auth-ops/README.md](references/application-integration-data-auth-ops/README.md) |
| Integration Connectors の概要・用語（connection・connector・entity・action）・レート制限・connection の作成の前提と権限 | integration-connectors | [references/integration-connectors/README.md](references/integration-connectors/README.md) |
| private / public / Google Cloud VPC 内のサービスへのネットワーク接続・PSC endpoint attachment・managed zone・静的 egress IP | integration-connectors | [references/integration-connectors/README.md](references/integration-connectors/README.md) |
| custom connectors（OpenAPI ベース）の概要と作成・event subscriptions・VPC Service Controls | integration-connectors | [references/integration-connectors/README.md](references/integration-connectors/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `rest/integrations` / `rest-schemas`

## 他スキルとの使い分け

- `gcp-messaging-workflows` — Google Cloud Workflows。Workflows と Application Integration の選択は両スキルの境界（本スキルは Application Integration 側）。Pub/Sub trigger が使う Pub/Sub の topic・subscription、Eventarc も同スキル。「コネクタ」は名前が衝突し、Workflows のコネクタと Kafka Connect のコネクタは `gcp-messaging-workflows`、Integration Connectors は本スキル
- `gcp-run` — Cloud Run / Cloud Run functions（Call REST Endpoint の宛先になる側）、Cloud Scheduler
- `gcp-networking` — Private Service Connect・VPC・Cloud DNS。本スキルは Integration Connectors の endpoint attachment・managed zone・ネットワーク接続のガイド
- `gcp-security` — CMEK の Cloud KMS 鍵、authentication profiles と custom connectors が参照する Secret Manager、VPC Service Controls の境界。本スキルは統合・connector 側の CMEK / VPC SC 設定のガイド
- `gcp-observability` — Cloud Logging / Cloud Monitoring。本スキルは execution logs と統合のログ設定のガイド
- `gcp-foundation` — IAM・サービスアカウント・Organization Policy。run-as サービスアカウントの Service Account User の考え方は同スキル、本スキルは製品別ロールの機械生成ページ
- `gcp-databases-relational` — Cloud SQL / AlloyDB（コネクタの接続先になる側）
- `gcp-storage` — Cloud Storage 等（コネクタ・task の接続先になる側）
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-api-management`（予定）— Apigee・API Gateway。Apigee 連携のページは本スキルに無い
- `gcp-bigquery`（予定）— コネクタ・task の接続先になる BigQuery
- `gcp-agent-platform`（予定）— Gemini・AI エージェント関連の機能。Application Integration の AI 機能は本スキルに無い
- `gcp-iac`（予定）— Terraform のサンプル
- `gcp-devops`（予定）— CI/CD
- `inngest` / `bullmq` — Node.js のジョブキュー・durable function。Google Cloud のマネージドな統合サービスではない。Application Integration の JavaScript task は Node.js ではなく、`event` オブジェクトを使う task 専用のスクリプト

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 料金（取得していない）。公式の料金ページで確認する: https://docs.cloud.google.com/application-integration/docs/pricing 、https://docs.cloud.google.com/integration-connectors/docs/pricing 。クォータと制限は https://docs.cloud.google.com/application-integration/docs/quotas
- コネクタ別のガイド（約 180 種）とコネクタ一覧の索引・SaaS 別の trigger（Kafka・Salesforce・SAP・ServiceNow 等 15 件）・Google Cloud サービス別の task（Cloud KMS・Dataflow・Document AI・Firestore・Vertex AI・Workflows Executions 等 21 件）
- trigger の残り（Cloud Scheduler・Schedule・Webhook・Eventarc・Error catcher・Private）、task の残り（Cloud Function・Apps Script・Call Integration・For Each Loop・While Loop・Approval・Timer・Send Email 等）、テスト ケース・テンプレート、統合のバージョン・アップロード・ダウンロード・クローン、replay と cancel、OpenAPI 仕様の表示、リージョンの管理・自動スケーリング・モニタリング・アラート、ログの秘匿化、IAM Conditions、カスタム制約、CI/CD
- Application Integration の Gemini / AI エージェント機能、Apigee 連携のチュートリアル、Salesforce・BigQuery・MySQL 等のチュートリアル、関数別リファレンス（約 80 件。集約ページ `data-mapping-functions-reference.md` と `data-transformer-functions-reference.md` のみ）、FAQ・既知の問題・エラー コード
- Integration Connectors: Google Cloud マネージド サービス・serverless・オンプレミス / 他クラウドへの接続の個別ページ、Terraform のサンプル、connection の表示・編集・削除・一時停止、custom connector のバージョン管理と編集、Marketplace コネクタ、CMEK、暗号化方式、エンティティ・操作・アクション・ストアド プロシージャ・カスタム クエリの例
- 各プロダクトの監査ログ ページ（メソッドと権限タイプの対応表）と事前定義ロールの一覧ページ（ロールは `references/iam/` に機械生成）
- Data Connectors のガイド（docs の実体が確認できない）
- Console の操作手順の細部（各ページの Notes に省略した形式を記載）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-18（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分。各ページ Notes に記載）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/rest/` `references/rest-schemas/`（後続 PR で投入） `references/iam/` は機械生成（Discovery document / IAM roles-permissions reference）。他の 3 カテゴリは公式ガイド由来の手書き
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に理由を残す（例: `application-integration-concepts/configure-javascript-task.md`）
- 公式ドキュメント内の食い違いは `Source inconsistency:` の Notes にそのまま残している（例: `application-integration-concepts/configure-pubsub-trigger.md`、`configure-javascript-task.md`、`integration-connectors/network-connectivity-private.md`）
- 変更・終了（references で確認したもの）:
  - Application Integration の run-as 認可の変更: 2026-10-15 以降に作成した統合に適用済み、2026-10-15 より前の統合は 2027-01-15（UTC）から（`application-integration-data-auth-ops/prepare-for-authorization-changes.md`）
  - JavaScript task の Rhino は 2025-01-24 にサポート終了、V8 へ移行（`application-integration-concepts/configure-javascript-task.md`）
- Data Connectors は docs・Discovery が無く、IAM ページのみ。Integration Connectors との関係は未確認で、本スキルへの割り当ては暫定
- 新しいメソッド・機能は公式 reference で確認する
