---
name: gcp-databases-relational
description: >
  Google Cloud (GCP) の Cloud SQL (MySQL / PostgreSQL / SQL Server)・AlloyDB・Spanner・Database Migration Service の gcloud・REST。Auth Proxy・language connectors・IAM database authentication・private IP・PSC・backups・PITR・HA・read replicas・Spanner transactions・DML・change streams・emulator・gcloud sql・alloydb・spanner・database-migration。Supabase / Cloudflare D1 とは別、gcloud 全般は gcp-cli、IAM 基盤は gcp-foundation。
user-invocable: false
---

# gcp-databases-relational

Google Cloud (GCP) のリレーショナルデータベース系スキル。Cloud SQL（MySQL / PostgreSQL / SQL Server）、AlloyDB for PostgreSQL、Spanner、Database Migration Service、Database Center / Query insights を扱う。インスタンス・クラスターの作成と設定、接続（Cloud SQL Auth Proxy・language connectors・IAM database authentication・private IP / Private Service Connect）、バックアップと PITR、HA・リードレプリカ・クロスリージョン、メンテナンス、Spanner のスキーマ設計・トランザクション・DML・インデックス・change streams・emulator・クライアント、DMS による移行に加え、gcloud 4 グループ・IAM ロール・REST（Discovery）を収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。Cloud SQL の 3 エンジン共通ページは PostgreSQL 版から 1 度だけ収録し、`cloud-sql-mysql` / `cloud-sql-sqlserver` にはエンジン固有ページのみを置く。

## ディレクトリ構成

```text
skills/gcp-databases-relational/
  SKILL.md
  references/
    cloud-sql-connect/            # 接続オプション・Cloud SQL Auth Proxy
      README.md
      <page>.md                   # 例: connection-options.md / sql-proxy.md / connect-auth-proxy.md
    cloud-sql-backup-recovery/    # バックアップ・バックアップオプション・PITR・復元
      README.md
      <page>.md                   # 例: backups.md / pitr.md / restoring.md
    alloydb-overview/             # AlloyDB の概要・マシンタイプ・バージョン・クォータ・クラスター / インスタンス作成・設定
      README.md
      <page>.md                   # 例: overview.md / choose-machine-type.md / cluster-create.md / instance-read-pool-create.md
    alloydb-connect-security/     # AlloyDB の接続・private IP / PSC・Auth Proxy・Language Connectors・IAM 認証
      README.md
      <page>.md                   # 例: connection-overview.md / auth-proxy-connect.md / connect-iam.md / manage-iam-auth.md
    alloydb-operations/           # AlloyDB のバックアップ・PITR・クロスリージョンレプリケーション・フェイルオーバー・メンテナンス・フラグ・columnar engine
      README.md
      <page>.md                   # 例: overview.md / restore-pitr.md / maintenance.md / columnar-engine.md
```

`references/gcloud/` が担当する gcloud グループ（4）:

- `sql`（308 コマンド。GA サブグループ: backups / databases / export / flags / import / instances / operations / ssl / ssl-certs / tiers / users。GA コマンド: connect / generate-login-token / reschedule-maintenance。beta / alpha のみ: blue-green-deployments / workload-captures）
- `alloydb`（140 コマンド。GA サブグループ: backups / clusters / instances / operations / users。beta / alpha のみ: connect / endpoints）
- `spanner`（266 コマンド。GA サブグループ: backup-schedules / backups / databases / instance-configs / instance-partitions / instances / operations / rows / samples。GA コマンド: cli。alpha のみ: migrate / ssd-caches）
- `database-migration`（87 コマンド。サブグループ: connection-profiles / conversion-workspaces / migration-jobs / objects / operations / private-connections）

`references/iam/` のサービス（6 ファイル）: `cloudsql`（Cloud SQL）/ `alloydb` / `spanner` / `datamigration`（Database Migration Service）/ `databaseinsights`（Database Center / Database Insights）/ `databasesconsole`（Studio Query）。

`references/rest/` `references/rest-schemas/` の API（4）: `sqladmin`（Cloud SQL Admin API）/ `alloydb`（AlloyDB API）/ `spanner`（Cloud Spanner API）/ `datamigration`（Database Migration API）。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud`（後続 PR で投入） を選び、`references/gcloud/<group>/README.md` からページ（GA は全文）を引く。GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
2. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`。Cloud SQL は `sqladmin`、Spanner は `spanner`、AlloyDB は `alloydb`、DMS は `datamigration`
3. IAM ロール・権限 → `references/iam/README.md`（後続 PR で投入） の索引から `<service>.md` を引く。ロール ID・権限名のサービス接頭辞で選ぶ（例: `roles/cloudsql.client` → `cloudsql.md`、`roles/spanner.databaseUser` → `spanner.md`）
4. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
5. Cloud SQL はエンジン共通ページが `cloud-sql-*`（PostgreSQL 版を 1 度だけ収録）にあり、MySQL / SQL Server 固有の差分だけが `cloud-sql-mysql`（後続 PR で投入） / `cloud-sql-sqlserver`（後続 PR で投入） にある。まず共通カテゴリを引き、エンジン固有の挙動は固有カテゴリで補う

`samples/` と `scripts/` は本スキルに無い。コマンドは `references/gcloud/` を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Cloud SQL への接続方法の選択（private / public IP・コネクター・IAM 認証）・Cloud SQL Auth Proxy の起動 | cloud-sql-connect | [references/cloud-sql-connect/README.md](references/cloud-sql-connect/README.md) |
| Cloud SQL のバックアップ（標準 / 拡張）・PITR・復元（別インスタンス / 別プロジェクト / 削除済み） | cloud-sql-backup-recovery | [references/cloud-sql-backup-recovery/README.md](references/cloud-sql-backup-recovery/README.md) |
| AlloyDB の概要・アーキテクチャ・マシンタイプ・バージョン・クォータ・クラスター / primary / read pool の作成と設定 | alloydb-overview | [references/alloydb-overview/README.md](references/alloydb-overview/README.md) |
| AlloyDB への接続（private services access / PSC）・Auth Proxy・Language Connectors・IAM 認証 | alloydb-connect-security | [references/alloydb-connect-security/README.md](references/alloydb-connect-security/README.md) |
| AlloyDB の IAM database authentication の設定（`alloydb.iam_authentication` フラグ・`roles/alloydb.databaseUser`・`gcloud alloydb users create --type=IAM_BASED` / `IAM_GROUP`・`GRANT`） | alloydb-connect-security | [references/alloydb-connect-security/manage-iam-auth.md](references/alloydb-connect-security/manage-iam-auth.md) |
| AlloyDB のバックアップ・PITR 復元・クロスリージョンレプリケーション・フェイルオーバー・メンテナンス・database flags・columnar engine | alloydb-operations | [references/alloydb-operations/README.md](references/alloydb-operations/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `iam` / `rest` / `rest-schemas` / `cloud-sql-overview` / `cloud-sql-instances` / `cloud-sql-connectors-iam` / `cloud-sql-networking` / `cloud-sql-ha-replication` / `cloud-sql-operations` / `cloud-sql-mysql` / `cloud-sql-sqlserver` / `spanner-overview` / `spanner-schema` / `spanner-transactions` / `spanner-dml-queries` / `spanner-indexes-change-streams` / `spanner-clients` / `spanner-operations` / `database-migration` / `database-center-insights` / `gcloud/sql` / `gcloud/alloydb` / `gcloud/spanner` / `gcloud/database-migration` / `rest/sqladmin` / `rest/alloydb` / `rest/spanner` / `rest/datamigration` / `rest-schemas/sqladmin` / `rest-schemas/alloydb` / `rest-schemas/spanner` / `rest-schemas/datamigration` / `cloud-sql-backup-recovery`

## 他スキルとの使い分け

- `gcp-foundation` — IAM の基盤（allow / deny policy・サービスアカウント・Workload Identity Federation）・ADC・Service Usage・クォータ・課金。本スキルは各プロダクトの IAM ロール（`roles/cloudsql.client` など）とデータベース認証のみ
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット。`gcloud sql` / `alloydb` / `spanner` / `database-migration` のコマンドは本スキル
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通のパターン（ADC・リトライ・emulator 設定の一般論）。本スキルは Spanner のチュートリアルと Cloud SQL / AlloyDB のコネクター・Auth Proxy 接続の手順のみ
- `gcp-run` — Cloud Run 側の設定・デプロイ。Cloud Run から Cloud SQL へ接続する手順はデータベース側（Auth Proxy・コネクター・private IP / PSC・IAM 認証）を本スキルが扱う
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `supabase` — ホスト型 Postgres（Supabase）。Cloud SQL / AlloyDB for PostgreSQL とは別プロダクト
- `cloudflare-storage` — Cloudflare D1 / Hyperdrive。本スキルの Cloud SQL / AlloyDB / Spanner とは別基盤
- `mssql` — Node.js 向け SQL Server クライアント（node-mssql）。本スキルは Cloud SQL for SQL Server のサービス側のみ
- `drizzle` — TypeScript ORM。Cloud SQL / AlloyDB への接続手段としての Drizzle は `drizzle` 側
- Bigtable / Firestore / Memorystore は `gcp-databases-nosql`（予定）、BigQuery は `gcp-bigquery`（予定）が担当。本スキルでは扱わない

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- AlloyDB Omni — ローカル / 他クラウドで動かす別ディストリビューションで、マネージドの AlloyDB for PostgreSQL とは別
- AlloyDB AI — 生成 AI・ベクトル検索・自然言語クエリの拡張で、AI 機能の領域
- Spanner Graph / full-text search / vector search — 特定ワークロード向けの拡張機能
- Spanner の GoogleSQL / PostgreSQL の DDL・DML 言語リファレンスページ — 言語仕様のページは分量が過大。DML の使い方とベストプラクティスは `spanner-dml-queries` を参照
- Cloud SQL の database flags リファレンスページ — エンジン・バージョンごとのフラグ表は分量が過大。設定の扱い方は `cloud-sql-instances` と `gcloud sql flags` を参照
- Firebase — 別計画（`firebase-*`）
- Bigtable / Firestore / Memorystore — `gcp-databases-nosql`（予定）
- BigQuery — `gcp-bigquery`（予定）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-16（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin）、2026-11-14（機械生成分）、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/` は機械生成（gcloud 593.0.0 の help / IAM reference / Discovery、取得 2026-11-14）。他の 22 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
- Cloud SQL の 3 エンジンで共通のページは PostgreSQL 版から 1 度だけ収録している。MySQL / SQL Server に固有の差分は `cloud-sql-mysql` / `cloud-sql-sqlserver`。共通ページ内の PostgreSQL 固有の記述（`psql`・`pg_*`・PostgreSQL のロールなど）をそのまま他エンジンへ当てはめない
- Database Migration Service は PostgreSQL → Cloud SQL の移行を中心に収録（他ソース・Oracle 変換などの詳細は gcloud / REST の機械生成分を参照）
- 料金ページ・リリースノートは未収録。公式ページを確認する
- gcloud は頻繁に更新される。新しいバージョンのフラグは `gcloud help` と公式 reference で確認する
