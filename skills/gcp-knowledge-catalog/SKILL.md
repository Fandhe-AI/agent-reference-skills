---
name: gcp-knowledge-catalog
description: >
  Google Cloud (GCP) の Knowledge Catalog (旧 Dataplex Universal Catalog / Dataplex)。entries / aspects、検索、business glossary、data products、データ品質 / profiling、lineage、Data Lineage API。entry types、メタデータ import / export、セマンティック検索、data domains、context enrichment / insights、Data Catalog からの移行、gcloud dataplex / datalineage、dataplex.googleapis.com。policy tag・BigQuery 本体は gcp-bigquery。
user-invocable: false
---

# gcp-knowledge-catalog

Google Cloud (GCP) のデータカタログ・データガバナンス系スキル。Knowledge Catalog（旧 Dataplex Universal Catalog）の概要・メタデータモデル（entry・entry group・entry type・aspect・aspect type・完全修飾名）、メタデータの import（metadata job）とコネクタ、検索（セマンティック検索・検索構文・Cloud Storage の discovery）、context sets・enrichment task・data insights・data relationships、business glossary・data products・data domains・governance workflow、データ品質（Auto data quality・ルールの再利用・システムのルールテンプレート）とデータ プロファイリング、データ リネージ（Data Lineage API・OpenLineage・リネージのビュー・取り込みの制御）、CMEK・VPC Service Controls・監査ログ・モニタリング・メタデータの変更フィード、廃止された Data Catalog の概要・廃止告知と Knowledge Catalog への導線を扱う。gcloud 2 グループ（`dataplex` / `datalineage`）・REST 2 API・IAM 4 ファイルの機械生成ページを併せて収録する。分割投入中のため、未投入のカテゴリ（`gcloud` / `rest` / `rest-schemas` / `iam` / `overview-setup-iam` / `search-discovery` / `security-monitoring-data-catalog`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

参照本文は英語（公式ドキュメントの原語）。

**名称**: Knowledge Catalog は旧 Dataplex Universal Catalog で、API・gcloud グループ・IAM の名前は `dataplex` のまま（API は `dataplex.googleapis.com`、gcloud は `gcloud dataplex`、ロールは `roles/dataplex.*`。`overview-setup-iam/introduction.md`（後続 PR で投入） の Notes）。リネージは別 API の Data Lineage API（`gcloud datalineage`、ロールは `roles/datalineage.*`）。

**Data Catalog は廃止されている**。`security-monitoring-data-catalog/deprecations.md`（後続 PR で投入） の表は Data Catalog を Deprecated date "February 3, 2025"、Shutdown date "June 1, 2026" と記載する。ただし Policy Tag Manager（taxonomy・policy tag）は廃止されず（"isn't deprecated"、`datacatalog.googleapis.com` で提供が続く。BigQuery の列レベルのアクセス制御と動的データマスキングが使う）、**Data Catalog / Policy Tag Manager の `gcloud data-catalog`・REST（`datacatalog`）・IAM ロールは `gcp-bigquery` にあり、本スキルには無い**。本スキルは Data Catalog の概要・廃止告知・Knowledge Catalog への移行の導線だけを扱う。

## ディレクトリ構成

```text
skills/gcp-knowledge-catalog/
  SKILL.md
  references/
    entries-aspects-metadata-import/     # aspect・メタデータ追加・メタデータ import / export・コネクタ・managed connectivity
      README.md
      <page>.md
    context-enrichment-insights/         # context sets・enrichment task・data insights・data relationships
      README.md
      <page>.md
    glossaries-data-products-domains/    # business glossary・data products・data domains・governance workflow
      README.md
      <page>.md
    data-quality-profiling/              # Auto data quality・ルールの再利用・ルールテンプレート・legacy の品質 task・プロファイリング
      README.md
      <page>.md
    data-lineage/                        # リネージの概要・クイックスタート・ビュー・OpenLineage・取り込みの制御
      README.md
      <page>.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 収録外のガイド（enrichment の個別手順・カスタムコネクタ・料金等）は下記「対象外」

未投入カテゴリ（`gcloud` / `rest` / `rest-schemas` / `iam` / `overview-setup-iam` / `search-discovery` / `security-monitoring-data-catalog`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| aspect の概念（placement level・scoping rules）・BigQuery テーブル entry へのカスタム aspect の追加 | entries-aspects-metadata-import | [references/entries-aspects-metadata-import/README.md](references/entries-aspects-metadata-import/README.md) |
| メタデータの import（metadata job・sync mode・import ファイル・job の確認）・export（export job・job scope・Cloud Storage への出力・BigQuery での分析） | entries-aspects-metadata-import | [references/entries-aspects-metadata-import/README.md](references/entries-aspects-metadata-import/README.md) |
| 構築済みコネクタ・managed connectivity（カスタムコネクタ・Workflows の概念）・コネクタ job の管理 | entries-aspects-metadata-import | [references/entries-aspects-metadata-import/README.md](references/entries-aspects-metadata-import/README.md) |
| context sets・context の enrichment task（概要・作成） | context-enrichment-insights | [references/context-enrichment-insights/README.md](references/context-enrichment-insights/README.md) |
| 構造化データの data insights（概要・利用）・data relationships | context-enrichment-insights | [references/context-enrichment-insights/README.md](references/context-enrichment-insights/README.md) |
| business glossary（クイックスタート）・glossary と entry link の import / export の概要 | glossaries-data-products-domains | [references/glossaries-data-products-domains/README.md](references/glossaries-data-products-domains/README.md) |
| data products の概要・利用、data domains の概要・作成（IAM ポリシーの設定を含む） | glossaries-data-products-domains | [references/glossaries-data-products-domains/README.md](references/glossaries-data-products-domains/README.md) |
| governance workflow の概要・リクエストの管理 | glossaries-data-products-domains | [references/glossaries-data-products-domains/README.md](references/glossaries-data-products-domains/README.md) |
| Auto data quality（ルール・スキャン・結果・品質スコア）の概要 | data-quality-profiling | [references/data-quality-profiling/README.md](references/data-quality-profiling/README.md) |
| データ品質ルール（テンプレート）の再利用・システムのルールテンプレート一覧・legacy の data quality tasks | data-quality-profiling | [references/data-quality-profiling/README.md](references/data-quality-profiling/README.md) |
| データ プロファイリングの概要 | data-quality-profiling | [references/data-quality-profiling/README.md](references/data-quality-profiling/README.md) |
| データ リネージの概要（Data Lineage API・process / run / event・対応システム）・追跡のクイックスタート | data-lineage | [references/data-lineage/README.md](references/data-lineage/README.md) |
| リネージの利用・外部システムのリネージの手動記録・グラフのビュー・OpenLineage 連携・取り込みの制御・トラブルシューティング | data-lineage | [references/data-lineage/README.md](references/data-lineage/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `rest` / `rest-schemas` / `iam` / `overview-setup-iam` / `search-discovery` / `security-monitoring-data-catalog`

## 他スキルとの使い分け

- `gcp-bigquery` — BigQuery 本体・GoogleSQL・BigLake / Lakehouse。Policy Tag Manager（policy tag による列レベルのアクセス制御・動的データマスキング）と、`gcloud data-catalog`・REST（`datacatalog`）・IAM（`datacatalog`）の機械生成ページもこちら。本スキルの品質スキャン・プロファイリングは BigQuery テーブルを対象にするが、テーブルそのものの扱いは `gcp-bigquery`
- `gcp-storage` — Cloud Storage のバケット・オブジェクト。本スキルは Cloud Storage を catalog の entry にする discovery（`search-discovery`）のみ
- `gcp-databases-relational` / `gcp-databases-nosql` — Cloud SQL・Spanner・Bigtable 等のデータベース本体。本スキルはそれらを検索・カタログの対象の entry として扱う側
- `gcp-security` — Cloud KMS（CMEK の鍵）・VPC Service Controls（Access Context Manager）。本スキルは Knowledge Catalog 側の CMEK・perimeter の設定（`security-monitoring-data-catalog`）。Sensitive Data Protection は `gcp-ai-apis`（予定）
- `gcp-security-compliance` — Security Command Center・Assured Workloads 等のコンプライアンス
- `gcp-observability` — Cloud Logging・Cloud Monitoring・監査ログ全般。本スキルは Knowledge Catalog の監査ログのメソッド・metrics・DCU コストの確認
- `gcp-foundation` — IAM の基礎・リソース階層・プロジェクト・サービス有効化。本スキルは Knowledge Catalog / Data Lineage 固有のロール・権限
- `gcp-iac` — Terraform・Infrastructure Manager による構成管理
- `gcp-cli` — gcloud のインストール・設定・認証
- `gcp-client-libraries` — クライアントライブラリ共通パターン（Knowledge Catalog 専用のライブラリガイドは本スキルに無い）
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-data-pipelines`（予定）— Dataflow・Managed Service for Apache Spark・Cloud Composer（リネージの取得元になる処理基盤）
- `gcp-agent-platform`（予定）— Agent Platform（旧 Vertex AI）。本スキルは Knowledge Catalog 側の context・メタデータ

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 個別手順の長いガイド: entry のメタデータの手動 enrichment（`enrich-entries-metadata`）・カスタムソースの取り込み（`ingest-custom-sources`）・カスタムコネクタの開発・Workflows による import（`import-using-workflows-custom-source`）
- Auto data quality の手順（`use-auto-data-quality`）・データ プロファイリングの手順（`use-data-profiling`）・データ品質の確認（`check-data-quality`）。概要は `data-quality-profiling` で受けている
- glossary の管理（`manage-glossaries`）・data products の管理・作成（`manage-data-products`・`create-data-products`）・data domains のリソース管理（`data-domains-resources`）・Google Sheets を使う import / export
- リネージの取り込み設定（`configure-lineage-ingestion`）・streaming API による検索（`search-lineage-streaming-api`）・各システム（BigQuery・Managed Service for Apache Spark・Airflow 等）のリネージ連携の個別ページ
- メタデータの通知（`receive-metadata-notifications`）・Terraform の手順（`terraform`、構成管理は `gcp-iac`）・クライアントライブラリ（`libraries`）・Looker のメタデータ
- 検索結果の説明（`search-explainability`、取得時に twin が 404 だったため）
- 旧 Dataplex の lakes・zones・assets・tasks（Dataplex Explore 等）のガイド。コマンド・メソッドの機械生成ページ（`references/gcloud/dataplex/`・`references/rest/dataplex/`）のみ収録
- 廃止済み Data Catalog の手順ページ（`tag-bigquery-dataset` 等の 17 ページ）と、Data Catalog・Policy Tag Manager の機械生成ページ（`gcp-bigquery` の担当）
- samples・quotas・SLA・release notes
- 料金（取得していない）。https://docs.cloud.google.com/dataplex/pricing と https://docs.cloud.google.com/data-catalog/pricing-examples は未収録

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-19（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（機械生成分。gcloud 593.0.0 の help、Discovery document、roles-permissions ページ。各ページ Notes に記載）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） `references/iam/`（後続 PR で投入） は機械生成。他の 8 カテゴリは公式ガイド由来の手書き
- 公式の例の一部は安全性・正しさのため修正している（フェンス直前に `Adapted (not in the official docs)` の行を置き、ページの Notes にも記載。例: `glossaries-data-products-domains/data-domains-create.md` の `getIamPolicy` / `setIamPolicy`、`data-quality-profiling/reuse-data-quality-rules.md` の heredoc）。gcloud help の例の誤りは生成ページの Notes に `Corrected from the official docs:` として残す
- 変更・終了（references で確認したもの）:
  - Data Catalog: Deprecated date "February 3, 2025"、Shutdown date "June 1, 2026"（`security-monitoring-data-catalog/deprecations.md`（後続 PR で投入））。Policy Tag Manager は廃止されない
  - Data Catalog とのリネージ連携は非推奨で、Knowledge Catalog とのリネージ連携は GA（`security-monitoring-data-catalog/lineage-data-catalog.md`（後続 PR で投入）。日付の記載は無い）
  - Attribute Store: Deprecated date "February 18, 2025"、Shutdown date "February 18, 2026"、"Discontinued."（`security-monitoring-data-catalog/deprecations.md`（後続 PR で投入））
  - data quality tasks は legacy で、公式は Auto data quality を推奨（`data-quality-profiling/data-quality-tasks-overview.md`。日付の記載は無い）
- 新しいメソッド・機能は公式 reference で確認する
