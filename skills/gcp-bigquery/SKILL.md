---
name: gcp-bigquery
description: >
  Google Cloud (GCP) の BigQuery (dataset・table・partitioning・clustering・view)・GoogleSQL (構文・関数・DDL)・bq CLI・load / Storage Write・Read API / export・BigQuery ML。INFORMATION_SCHEMA・search index / vector search・continuous queries・Lakehouse (BigLake)・Analytics Hub・Data Transfer Service・row・column-level security・data masking・Dataform・Gemini in BigQuery・GQL。Dataplex は gcp-knowledge-catalog。
user-invocable: false
---

# gcp-bigquery

Google Cloud (GCP) のデータウェアハウス BigQuery のスキル。データセット・テーブル・スキーマ・ビュー・マテリアライズドビュー、パーティション分割とクラスタリング、クエリの実行・キャッシュ・パラメータ化クエリ、スクリプト・セッション・トランザクション・ルーティン（UDF / ストアドプロシージャ）、バッチ読み込み、Storage Write API / Storage Read API / CDC、Data Transfer Service とスケジュールされたクエリ、エクスポートと continuous queries、外部テーブルと連携クエリ、Google Cloud Lakehouse（旧 BigLake）・Iceberg・BigQuery Omni、クエリ性能と検索インデックス、BigQuery sharing（旧 Analytics Hub）、IAM・行 / 列レベルのセキュリティ・データマスキング、CMEK・VPC Service Controls・監査ログ・モニタリング、エディション・スロット・予約、移行と SQL 変換、BigQuery ML、生成 AI とベクトル検索、Gemini in BigQuery・data agents・notebooks、Dataform を扱う。

参照本文は英語（公式ドキュメントの原語）。構成は 3 種類。

- 手書きの公式ガイド 22 カテゴリ（概念・手順）
- 公式の Markdown twin を機械的に変換した SQL・CLI リファレンス 8 グループ（GoogleSQL 構文・関数・BigQuery ML 構文・GQL・INFORMATION_SCHEMA・legacy SQL・`bq`・Dataform CLI）
- gcloud・REST・IAM の機械生成ページ

メインの BigQuery CLI は `bq`（`references/bq-cli/`）で、gcloud の `bq` グループ（`references/gcloud/bq/`）は別物。gcloud の `bq` グループは小さく、`bq datasets` / `bq jobs` / `bq migration` / `bq query` / `bq tables` は alpha のみ、GA を持つのは `bq migration-workflows`（alpha・beta・GA）だけ。

名称変更の注意（references で確認したもの）。

- BigLake は Google Cloud Lakehouse に改称。`lakehouse-iceberg-omni/biglake-intro.md` は「BigLake is now called Lakehouse; the API, gcloud group and IAM names stay `biglake`」と記す。API・gcloud グループ・IAM の名前は `biglake` のまま。`about-lakehouse-catalogs.md` によれば BigLake metastore（classic）は legacy で、Lakehouse runtime catalog が推奨
- Storage Write API の名称: 従来の `tabledata.insertAll` は「Storage Write API (REST)」、従来の Storage Write API は「Storage Write API (gRPC)」（`storage-write-read-api-cdc/README.md`・`write-api-intro.md`。書き込み経路の選択は `write-api-intro.md` の比較表）
- Analytics Hub は BigQuery sharing（旧 Analytics Hub）。`sharing-analytics-hub/` のページ名には `analytics-hub-*` が残る
- Conversational Analytics API の前身 Data QnA API は非推奨（"The Data QnA API is deprecated"、日付の記載なし。`gemini-data-agents-notebooks/conversational-analytics-api-overview.md`）
- Data Catalog は deprecated date "February 3, 2025"・shutdown date "June 1, 2026"。ただし Policy Tag Manager（taxonomies / policy tags。列レベルのアクセス制御と動的データマスキングに使う）は非推奨ではなく、`datacatalog.googleapis.com` で引き続き提供される（`iam/datacatalog.md`（後続 PR で投入）・`rest/datacatalog/datacatalog.md` の Notes に出典の文言あり）。このため機械生成の `gcloud data-catalog`・`rest/datacatalog`・`iam/datacatalog.md`（後続 PR で投入） は本スキルに置く。Data Catalog / Knowledge Catalog のガイドは `gcp-knowledge-catalog`

## ディレクトリ構成

```text
skills/gcp-bigquery/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0 の help（3 グループ）
      README.md
      biglake/                    # Lakehouse（旧 BigLake。グループ名は biglake のまま）
        README.md
        biglake-<sub>.md          # 8 ファイル（data-product-sharing / delta-sharing / hive catalogs・databases・tables /
                                  # iceberg catalogs・namespaces・tables）
      bq/                         # bq グループ（alpha 中心）
        README.md
        bq-<sub>.md               # 6 ファイル（datasets / jobs / migration / migration-workflows / query / tables）
      data-catalog/               # Data Catalog（Policy Tag Manager のため本スキル）
        README.md
        data-catalog-<sub>.md     # 24 ファイル（taxonomies・policy-tags・tag-templates・entries・entry-groups・tags・search・crawlers 等）
    googlesql-syntax/             # 機械変換: GoogleSQL 構文・データ型・演算子・DDL / DML / DCL・手続き型言語・システム変数ほか、分割投入中（14 / 24 ページ。収録済みは README 掲載分のみ）
      README.md
      <page>[-<N>].md
    googlesql-functions/          # 機械変換: GoogleSQL 関数（集計・文字列・日付時刻・JSON・地理・ウィンドウ等）
      README.md                   # 関数名 → ページ#アンカー の索引表
      <page>[-<N>].md             # 例: string_functions-1.md・aggregate-dp-functions.md・window-function-calls.md
    bigqueryml-sql/               # 機械変換: BigQuery ML の SQL 構文（CREATE MODEL・ML.* / AI.* 関数）
      README.md
      <page>.md
    bq-cli/                       # 機械変換: bq コマンドラインツールのリファレンス（3 分割）
      README.md
      bq-cli-reference-1.md ... bq-cli-reference-3.md
    dataform-cli/                 # 機械変換: Dataform CLI・Dataform core リファレンス
      README.md
      dataform-cli-reference.md
      dataform-core-reference.md
    overview-datasets/            # 概要・リソース階層・ストレージ・データセット・time travel・削除テーブルの復元・snapshot / clone・既定の構成・INFORMATION_SCHEMA 概要
      README.md
      <page>.md
    tables-schemas-views/         # テーブル・スキーマ・ネスト / 繰り返し・ビュー・マテリアライズドビュー
      README.md
      <page>.md
    partitioning-clustering/      # パーティション分割テーブル（作成・クエリ・管理）・クラスタ化テーブル
      README.md
      <page>.md
    queries-results/              # クエリの概要・実行・キャッシュ・パラメータ化クエリ
      README.md
      <page>.md
    scripting-sessions-transactions-routines/  # スクリプト・セッション・トランザクション・プロシージャ・UDF
      README.md
      <page>.md
    batch-loading/                # 読み込みの概要・バッチ読み込み・Parquet
      README.md
      <page>.md
    storage-write-read-api-cdc/   # Storage Write API（gRPC / REST）・CDC・Storage Read API
      README.md
      <page>.md
    data-transfer-scheduled-queries/  # Data Transfer Service・スケジュールされたクエリ
      README.md
      <page>.md
    export-continuous-queries/    # エクスポート・Pub/Sub へのエクスポート・continuous queries
      README.md
      <page>.md
    external-tables-federated-queries/  # 外部テーブル・連携クエリ・Connections API
      README.md
      <page>.md
    lakehouse-iceberg-omni/       # Lakehouse（旧 BigLake）・Iceberg managed tables・カタログ・BigQuery Omni
      README.md
      <page>.md
    query-performance-search-indexes/  # クエリ性能・クエリプラン・BI Engine・検索インデックス
      README.md
      <page>.md
    sharing-analytics-hub/        # BigQuery sharing（旧 Analytics Hub）の exchange・listing・購読
      README.md
      <page>.md
    access-control-iam/           # IAM・データセットのアクセス制御・承認済みビュー / データセット・IAM Conditions
      README.md
      <page>.md
    row-column-security-masking/  # 行レベル・列レベルのセキュリティ・policy tag・データマスキング
      README.md
      <page>.md
    encryption-vpc-sc-audit-monitoring/  # 暗号化・CMEK・VPC Service Controls・監査ログ・モニタリング
      README.md
      <page>.md
    workload-cost-management/     # エディション・スロット・予約・費用のベストプラクティス・カスタム quota
      README.md
      <page>.md
    migration-sql-translation/    # 移行の概要・SQL 変換（バッチ・インタラクティブ）
      README.md
      <page>.md
    bigquery-ml/                  # BigQuery ML の概要・CREATE MODEL・リモートモデル・推論・ハイパーパラメータ調整
      README.md
      <page>.md
    generative-ai-vector-search/  # 生成 AI・テキスト生成・ベクトル検索・ベクトルインデックス
      README.md
      <page>.md
    gemini-data-agents-notebooks/ # Gemini in BigQuery・data canvas・data agents・Conversational Analytics API・DataFrames
      README.md
      <page>.md
    dataform/                     # Dataform の概要・SQLX・テーブル作成・依存関係
      README.md
      <page>.md
```

`references/gcloud/` のグループ（3）: `biglake` / `bq` / `data-catalog`。GA コマンドのページは gcloud help の verbatim、alpha / beta は NAME と SYNOPSIS のみ（各ページ冒頭に明記）。`bq` グループは `migration-workflows` を除いて alpha のみ、`data-catalog` の `crawlers` と `crawler-runs` は alpha のみ、`biglake` の `data-product-sharing` と `delta-sharing` は alpha と GA（beta なし）、`hive` と `iceberg` は alpha・beta・GA（gcloud 593.0.0 の生成ページで確認）。

機械生成のみで、ガイドを持たないサービス（ページに書かれている範囲のみ）。

- IAM ページのみ: `bigquerycontinuousquery` / `bigqueryomni` / `bigqueryspark` / `geminidataanalytics` / `dataprep`
- `bigquerymigration`: IAM ページのほか、gcloud の `bq migration` / `bq migration-workflows`。REST ページは無い
- `dataprep`（Dataprep by Trifacta）: `iam/dataprep.md`（後続 PR で投入） のみでガイドは収録していない

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表で手書きガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）。README の説明列にページ内の見出しが並ぶ
2. SQL の構文・文（SELECT / FROM / JOIN / DDL / DML / DCL / EXPORT DATA / LOAD DATA / 手続き型言語）→ `references/googlesql-syntax/README.md` から引く。長いページ（`query-syntax-1`〜`3`・`data-definition-language-1`〜`4`）は `-<N>` に分割されているので README の説明列で見出しを確認する
3. SQL の関数 → `references/googlesql-functions/README.md` の索引表（関数名 → ページ#アンカー）から引く。または `references/googlesql-functions/` 配下を ``## `NAME` `` で grep する（例: ``## `JSON_VALUE` ``）。同名の関数（`EXTRACT` 等）は型ごとに別ページにあるので、README で複数行を確認する。BigQuery ML の関数（`ML.*`（後続 PR で投入） / `AI.*`（後続 PR で投入））は `references/bigqueryml-sql/README.md`、GQL は `references/graph-gql/README.md`（後続 PR で投入）
4. INFORMATION_SCHEMA のビュー → `references/information-schema/README.md`（後続 PR で投入）（概要・権限・リージョン修飾子は `overview-datasets/information-schema-intro.md`）
5. `bq` のサブコマンド → `references/bq-cli/README.md`。コマンドは `bq-cli-reference-2.md`、共通・グローバルフラグは `bq-cli-reference-1.md`。サブコマンド名で grep する。gcloud の `bq` グループとは別
6. gcloud コマンド → `references/gcloud/README.md` からグループ（`biglake` / `bq` / `data-catalog`）を選び、グループの README.md → コマンドページへ。GA は help の verbatim、alpha / beta は NAME と SYNOPSIS のみなので、フラグの詳細が要るときは `gcloud alpha|beta <command> --help` を使う。BigQuery 本体の操作は gcloud ではなく `bq` と SQL が中心
7. IAM ロール・権限 → `references/iam/README.md`（後続 PR で投入） の索引から引く。ロール ID（例: `roles/bigquery.dataViewer`・`roles/bigquery.jobUser`・`roles/analyticshub.admin`）で `references/iam/`（後続 PR で投入） 配下を grep して該当ファイルを特定する。BigQuery のロールの解説は `access-control-iam/access-control.md`
8. 他製品側の設定（Cloud Storage のバケット、Pub/Sub のトピック、Cloud KMS の鍵、Cloud SQL のインスタンス等）は他スキル（下記「他スキルとの使い分け」）

未投入カテゴリ（`rest` / `rest-schemas` / `iam` / `graph-gql` / `information-schema` / `legacy-sql`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

分割投入中のカテゴリ（`googlesql-syntax`: 14 / 24 ページ）は、その README に載っているページだけが収録済み。載っていないコマンド・メソッド・ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| BigQuery の概要・ストレージとコンピュートの分離・リソース階層・データセットの作成（ロケーション・有効期限・照合順序） | overview-datasets | [references/overview-datasets/README.md](references/overview-datasets/README.md) |
| time travel・過去時点のデータ参照（`FOR SYSTEM_TIME AS OF`）・削除したテーブルの復元・table snapshot・table clone・プロジェクト / 組織の既定の構成（`ALTER PROJECT` / `ALTER ORGANIZATION SET OPTIONS`）・INFORMATION_SCHEMA の概要 | overview-datasets | [references/overview-datasets/README.md](references/overview-datasets/README.md) |
| テーブルの種類・スキーマの指定（型・モード・既定値）・STRUCT / ARRAY（ネスト / 繰り返し）・論理ビュー・マテリアライズドビュー | tables-schemas-views | [references/tables-schemas-views/README.md](references/tables-schemas-views/README.md) |
| 時間単位列・取り込み時間・整数範囲のパーティション分割テーブルの作成・パーティションのプルーニングとクエリ・パーティションの有効期限・パーティションフィルタ必須・パーティションのコピーと削除 | partitioning-clustering | [references/partitioning-clustering/README.md](references/partitioning-clustering/README.md) |
| クラスタ化テーブル・自動再クラスタ化・クラスタ化テーブルへのクエリ | partitioning-clustering | [references/partitioning-clustering/README.md](references/partitioning-clustering/README.md) |
| インタラクティブ / バッチのクエリ・dry run・クエリの実行（コンソール / `bq` / API）・キャッシュ結果 | queries-results | [references/queries-results/README.md](references/queries-results/README.md) |
| パラメータ化クエリ（名前付き / 位置指定、配列・構造体・タイムスタンプ・範囲のパラメータ） | queries-results | [references/queries-results/README.md](references/queries-results/README.md) |
| 複数ステートメントのクエリ（スクリプト・変数・一時テーブル）・セッション・マルチステートメント トランザクション | scripting-sessions-transactions-routines | [references/scripting-sessions-transactions-routines/README.md](references/scripting-sessions-transactions-routines/README.md) |
| ストアド プロシージャ・SQL / JavaScript の UDF | scripting-sessions-transactions-routines | [references/scripting-sessions-transactions-routines/README.md](references/scripting-sessions-transactions-routines/README.md) |
| データ読み込み方法の選び方（バッチ・ストリーミング・Storage Write API・DTS）・`bq load` / `LOAD DATA`・Cloud Storage からの Parquet 読み込み | batch-loading | [references/batch-loading/README.md](references/batch-loading/README.md) |
| Storage Write API（gRPC）のストリーム・exactly-once・Storage Write API（REST、旧 `tabledata.insertAll`） | storage-write-read-api-cdc | [references/storage-write-read-api-cdc/README.md](references/storage-write-read-api-cdc/README.md) |
| CDC（`_CHANGE_TYPE`・`max_staleness`・主キー）・Storage Read API のセッション・ストリーム | storage-write-read-api-cdc | [references/storage-write-read-api-cdc/README.md](references/storage-write-read-api-cdc/README.md) |
| Data Transfer Service の概要・有効化と権限・Cloud Storage 転送 | data-transfer-scheduled-queries | [references/data-transfer-scheduled-queries/README.md](references/data-transfer-scheduled-queries/README.md) |
| スケジュールされたクエリの作成・更新・バックフィル・ランタイムパラメータ | data-transfer-scheduled-queries | [references/data-transfer-scheduled-queries/README.md](references/data-transfer-scheduled-queries/README.md) |
| テーブルデータのエクスポート（`EXPORT DATA`・`bq extract`・形式・圧縮）・Pub/Sub へのエクスポート | export-continuous-queries | [references/export-continuous-queries/README.md](references/export-continuous-queries/README.md) |
| continuous queries（対応ステートメント・予約・サービスアカウント・制限） | export-continuous-queries | [references/export-continuous-queries/README.md](references/export-continuous-queries/README.md) |
| 外部テーブル（Cloud Storage・Drive・Bigtable）・BigLake テーブル・オブジェクトテーブルとの違い | external-tables-federated-queries | [references/external-tables-federated-queries/README.md](references/external-tables-federated-queries/README.md) |
| 連携クエリ（`EXTERNAL_QUERY`）・Cloud SQL 連携・Connections API（接続の種類とサービスアカウント） | external-tables-federated-queries | [references/external-tables-federated-queries/README.md](references/external-tables-federated-queries/README.md) |
| Google Cloud Lakehouse（旧 BigLake）の概要・主要概念・Lakehouse runtime catalog・Iceberg REST catalog | lakehouse-iceberg-omni | [references/lakehouse-iceberg-omni/README.md](references/lakehouse-iceberg-omni/README.md) |
| Iceberg managed tables・BigLake テーブル（アクセス委任・メタデータキャッシュ）・BigQuery Omni（AWS / Azure 上のクエリ） | lakehouse-iceberg-omni | [references/lakehouse-iceberg-omni/README.md](references/lakehouse-iceberg-omni/README.md) |
| クエリ性能のベストプラクティス・クエリプランとタイムライン・BI Engine | query-performance-search-indexes | [references/query-performance-search-indexes/README.md](references/query-performance-search-indexes/README.md) |
| 検索（`SEARCH` 関数）・検索インデックスの作成と管理 | query-performance-search-indexes | [references/query-performance-search-indexes/README.md](references/query-performance-search-indexes/README.md) |
| BigQuery sharing（旧 Analytics Hub）の概要・exchange・listing の管理・listing の購読 | sharing-analytics-hub | [references/sharing-analytics-hub/README.md](references/sharing-analytics-hub/README.md) |
| BigQuery の IAM ロールと権限・データセットのアクセス制御（`GRANT` / `REVOKE`）・IAM Conditions | access-control-iam | [references/access-control-iam/README.md](references/access-control-iam/README.md) |
| 承認済みビュー・承認済みデータセットでの共有 | access-control-iam | [references/access-control-iam/README.md](references/access-control-iam/README.md) |
| 行レベルセキュリティ（`CREATE ROW ACCESS POLICY`）・列レベルセキュリティ（policy tag・taxonomy）・データマスキング（data policy） | row-column-security-masking | [references/row-column-security-masking/README.md](references/row-column-security-masking/README.md) |
| 保存時の暗号化・CMEK（既定鍵・ローテーション・Autokey）・VPC Service Controls と BigQuery | encryption-vpc-sc-audit-monitoring | [references/encryption-vpc-sc-audit-monitoring/README.md](references/encryption-vpc-sc-audit-monitoring/README.md) |
| BigQuery の監査ログ・Cloud Monitoring の指標とダッシュボード | encryption-vpc-sc-audit-monitoring | [references/encryption-vpc-sc-audit-monitoring/README.md](references/encryption-vpc-sc-audit-monitoring/README.md) |
| エディション（Standard / Enterprise / Enterprise Plus）・スロット・予約（commitment・reservation・assignment・autoscaling） | workload-cost-management | [references/workload-cost-management/README.md](references/workload-cost-management/README.md) |
| 費用のベストプラクティス（dry run・`maximum_bytes_billed`・ストレージ費用）・カスタム quota | workload-cost-management | [references/workload-cost-management/README.md](references/workload-cost-management/README.md) |
| 他のデータウェアハウスからの移行の概要・SQL 変換（バッチ・インタラクティブ） | migration-sql-translation | [references/migration-sql-translation/README.md](references/migration-sql-translation/README.md) |
| BigQuery ML の概要・`CREATE MODEL`・評価・予測・ハイパーパラメータ調整・Vertex AI のモデルとの連携 | bigquery-ml | [references/bigquery-ml/README.md](references/bigquery-ml/README.md) |
| 生成 AI 関数・リモートモデルでのテキスト生成（`AI.GENERATE_TEXT` / `ML.GENERATE_TEXT`）・ベクトル検索（`VECTOR_SEARCH`）・ベクトルインデックス | generative-ai-vector-search | [references/generative-ai-vector-search/README.md](references/generative-ai-vector-search/README.md) |
| Gemini in BigQuery の設定・data canvas・data agents・Conversational Analytics API・notebooks・BigQuery DataFrames | gemini-data-agents-notebooks | [references/gemini-data-agents-notebooks/README.md](references/gemini-data-agents-notebooks/README.md) |
| Dataform のリポジトリ・ワークスペース・SQLX・テーブル作成（table / view / incremental）・`ref()` による依存関係 | dataform | [references/dataform/README.md](references/dataform/README.md) |
| SQL 構文（クエリ文・サブクエリ・演算子・データ型・字句構造）・DDL / DML / DCL・手続き型言語・EXPORT / LOAD 文 | googlesql-syntax | [references/googlesql-syntax/README.md](references/googlesql-syntax/README.md) |
| SQL 関数（集計・ウィンドウ・文字列・日付時刻・JSON・配列・地理・ハッシュ・AEAD 暗号・時系列等）を名前から引きたい | googlesql-functions | [references/googlesql-functions/README.md](references/googlesql-functions/README.md) |
| BigQuery ML の SQL 構文（`ML.*` / `AI.*` 関数） | bigqueryml-sql | [references/bigqueryml-sql/README.md](references/bigqueryml-sql/README.md) |
| `bq` コマンド（`bq query` / `bq load` / `bq extract` / `bq mk` 等）とグローバルフラグ | bq-cli | [references/bq-cli/README.md](references/bq-cli/README.md) |
| Dataform CLI のコマンドとオプション | dataform-cli | [references/dataform-cli/README.md](references/dataform-cli/README.md) |
| gcloud コマンド（`biglake` / `bq` / `data-catalog`）を調べたい | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| Lakehouse（BigLake）のコマンド（`biglake iceberg` / `hive` / `delta-sharing` / `data-product-sharing`） | gcloud/biglake | [references/gcloud/biglake/README.md](references/gcloud/biglake/README.md) |
| gcloud `bq` グループ（datasets・jobs・migration・migration-workflows・query・tables） | gcloud/bq | [references/gcloud/bq/README.md](references/gcloud/bq/README.md) |
| Policy Tag Manager（taxonomies・policy tags）・tag templates・entries のコマンド | gcloud/data-catalog | [references/gcloud/data-catalog/README.md](references/gcloud/data-catalog/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `rest` / `rest-schemas` / `iam` / `graph-gql` / `information-schema` / `legacy-sql`

## 他スキルとの使い分け

- `gcp-knowledge-catalog` — Knowledge Catalog（旧 Dataplex Universal Catalog）の entries・aspects・検索・glossary・data products・データ品質・データプロファイリング・データリネージ、Data Catalog の廃止と移行。`gcloud dataplex` / `datalineage` もそちら。本スキルは BigQuery 本体と、Policy Tag Manager（taxonomies / policy tags）の機械生成ページ（`gcloud data-catalog`・`rest/datacatalog`・`iam/datacatalog.md`（後続 PR で投入））
- `gcp-storage` — 読み込み・エクスポート・外部テーブルの対象になる Cloud Storage のバケットとオブジェクト、Storage Transfer Service。本スキルは BigQuery 側の読み込み・エクスポート・外部テーブルの手順
- `gcp-databases-relational` — 連携クエリ（`EXTERNAL_QUERY`）の接続先になる Cloud SQL・AlloyDB・Spanner。本スキルは BigQuery 側の連携クエリと Connections API
- `gcp-databases-nosql` — Bigtable・Firestore などの NoSQL（外部テーブル・エクスポートの対象）。本スキルは BigQuery 側
- `gcp-messaging-workflows` — Pub/Sub の BigQuery subscription・topic・subscription。continuous queries のエクスポート先の Pub/Sub トピックの設定もそちら。本スキルは BigQuery からの Pub/Sub へのエクスポートと、データセット側
- `gcp-security` — Cloud KMS の鍵（CMEK の鍵・Autokey）・VPC Service Controls の perimeter・Secret Manager。Sensitive Data Protection は `gcp-security` の記述では `gcp-ai-apis`（予定）。本スキルは BigQuery 側の CMEK の設定と VPC Service Controls の制約
- `gcp-security-compliance` — Security Command Center・Assured Workloads・Access Transparency 等。SCC の検出結果の BigQuery へのエクスポートはそちら
- `gcp-observability` — Cloud Logging のログシンク（BigQuery への出力）・Cloud Monitoring・Observability Analytics の linked dataset。本スキルは BigQuery 自身の監査ログとモニタリング指標
- `gcp-foundation` — IAM の基礎・サービスアカウント・リソース階層・Cloud Billing のデータの BigQuery エクスポート。本スキルは BigQuery 固有のロールとアクセス制御
- `gcp-iac` — Terraform で BigQuery のリソースを管理する場合の Infrastructure Manager・Terraform on Google Cloud。リソースの引数は本スキルの SQL・REST・ガイドで確認する
- `gcp-devops` — Cloud Build・Artifact Registry・Cloud Deploy・Developer Connect による CI/CD。BigQuery 固有の Dataform（本スキル）とは別
- `gcp-integration` — Application Integration・Integration Connectors（連携ワークフロー側）
- `gcp-run` — Cloud Run・Cloud Run functions・Cloud Scheduler から BigQuery を呼び出すアプリ側
- `gcp-cli` — gcloud のインストール・設定・認証。BigQuery の CLI は gcloud ではなく `bq`（本スキルの `bq-cli`）
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン。Storage Read / Write API のライブラリ利用は本スキルのガイド
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-data-pipelines`（予定）— Dataflow・Managed Service for Apache Spark（旧 Dataproc）・Managed Service for Apache Airflow（旧 Cloud Composer）・Datastream。BigQuery から使う Spark（Spark プロシージャ）のガイドは本スキルに収録していない
- `gcp-agent-platform`（予定）— Agent Platform（旧 Vertex AI）。BigQuery ML のリモートモデルの接続先エンドポイント・Model Registry
- `gcp-ai-apis`（予定）— AI 系 API（Sensitive Data Protection 等）
- `google-gemini-api` — Gemini Developer API・Google GenAI SDK。BigQuery の `AI.GENERATE` / `ML.GENERATE_TEXT` は BigQuery 経由でモデルを呼ぶ別の機能で、本スキル
- `drizzle` / `mssql` — 別の SQL ダイアレクトと ORM / クライアント。本スキルは GoogleSQL
- `supabase` — Postgres ベースの BaaS。本スキルの BigQuery とは別
- `cloudflare-storage` — Cloudflare の D1 / R2 / KV / Hyperdrive。BigQuery とは別

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 手順の詳細ページ（個別に 2,570 行を超えるもの）: `bigquery/docs/tables`・`managing-tables`・`managing-table-schemas`・`control-access-to-resources-iam`・`tags`・`column-data-masking`・`user-defined-functions-python`・`migration-assessment`・形式別の読み込み（CSV・JSON・ORC・Avro。Parquet のみ収録）。同じトピックの概要ページ（`tables-intro`・`schemas`・`column-data-masking-intro` 等）で代替する
- DTS の転送元別ページ（Google Ads・Campaign Manager・YouTube・Amazon S3・Azure Blob・Teradata・Redshift 等、約 64 件）と、移行元別ページ（Teradata・Redshift・Snowflake・Oracle・Hive 等、約 27 件）。Cloud Storage 転送の概要と移行の概要のみ収録
- BigQuery Graph のガイド（`graph-*`）。GQL のリファレンスは `graph-gql`
- Spark（`use-spark`・`spark-procedures`・`connect-to-spark`）・Managed Service for Apache Airflow 連携（`orchestrate-dags`）・Dataproc Metastore からの移行。`gcp-data-pipelines`（予定）の範囲
- BigQuery の pipelines・data preparations（BigQuery Studio の機能。Dataprep by Trifacta とは別物）
- Looker・Looker Studio・Connected Sheets
- データプロファイル・データ品質スキャン（機能は Knowledge Catalog の `dataplex` API。`gcp-knowledge-catalog` の範囲）
- Data Catalog の概要・廃止告知・移行のガイド（`gcp-knowledge-catalog`）
- 認証の定型ページ・クライアントライブラリのリファレンス・事前定義ロールの一覧ページ（ロールは `references/iam/`（後続 PR で投入））
- REST リファレンスの公式ページ（`references/rest/`（後続 PR で投入） の機械生成ページで代替）・コードサンプル集・release notes・SLA・料金・quotas
- GoogleSQL リファレンスの次の 3 ページ: `functions-all`（関数の総覧）・`window-functions`・`graph-conditional-expressions`（索引・案内だけで固有の内容が無いページ）。関数の索引は `references/googlesql-functions/README.md`、ウィンドウ関数の呼び出しは `window-function-calls.md` と `navigation_functions.md`・`numbering_functions.md` を引く
- Dataprep by Trifacta のガイド（`iam/dataprep.md`（後続 PR で投入） のみ収録）
- 料金の表（取得していない。費用の考え方は `workload-cost-management` と `overview-datasets/storage-overview.md` の本文）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-19（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分。gcloud 593.0.0 の help、Discovery document、roles-permissions ページ。各ページ Notes に記載。例: `rest/bigquery/bigquery.md` は Discovery document `bigquery` v2 の revision 20261009）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） `references/iam/`（後続 PR で投入） は機械生成。`googlesql-syntax` `googlesql-functions` `bigqueryml-sql` `graph-gql` `information-schema` `legacy-sql` `bq-cli` `dataform-cli` の 8 グループは公式の Markdown twin から機械的に変換した。他の 22 カテゴリは公式ガイド由来の手書き
- 機械変換した SQL・CLI リファレンスの変換規則（各ページの Notes より）: 見出しは公式ページより 1 段下げる、インデントされたコードブロックは fenced にする、各コードブロックの本文は rendered page から取る（twin は結果表の罫線のダッシュを短縮するため）、本文はそれ以外は原文のまま。罫線のダッシュは rendered page に一致するブロックがある箇所のみ復元できており、一致するブロックが無い箇所は twin の短縮のまま。一部のページには `:` で始まる定義リスト記法が残っている
- 公式ガイドの例の一部は誤りや危険を直している（直した例はコードブロック直前に `Adapted (not in the official docs)` の行を置き、ページの Notes にも残す）。gcloud の help の例を直した箇所は gcloud ページの Notes に `Corrected from the official docs:` で記載
- 変更・縮退・名称変更（references で確認したもの）:
  - Data Catalog: deprecated date "February 3, 2025"、shutdown date "June 1, 2026"。Policy Tag Manager は非推奨ではなく `datacatalog.googleapis.com` で継続（`iam/datacatalog.md`（後続 PR で投入）・`rest/datacatalog/datacatalog.md`）
  - Data QnA API: 非推奨（日付の記載なし。`gemini-data-agents-notebooks/conversational-analytics-api-overview.md`）
  - BigLake → Google Cloud Lakehouse、Storage Write API の改称（上の「名称変更の注意」）
- Preview など GA でない機能がガイドには含まれる。各ページの記述に従い、仕様は変わりうる
- 新しいメソッド・関数・機能は公式 reference で確認する
