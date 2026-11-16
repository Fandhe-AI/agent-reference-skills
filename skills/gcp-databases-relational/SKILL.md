---
name: gcp-databases-relational
description: >
  Google Cloud (GCP) の Cloud SQL (MySQL / PostgreSQL / SQL Server)・AlloyDB・Spanner・Database Migration Service の gcloud・REST。Auth Proxy・language connectors・IAM database authentication・private IP・PSC・backups・PITR・HA・read replicas・Spanner transactions・DML・change streams・emulator・gcloud sql・alloydb・spanner・database-migration。Supabase / Cloudflare D1 とは別、gcloud 全般は gcp-cli、IAM 基盤は gcp-foundation。
user-invocable: false
---

# gcp-databases-relational

Google Cloud (GCP) のリレーショナルデータベース系スキル。Cloud SQL（MySQL / PostgreSQL / SQL Server）、AlloyDB for PostgreSQL、Spanner、Database Migration Service、Database Center / Query insights を扱う。インスタンス・クラスターの作成と設定、接続（Cloud SQL Auth Proxy・language connectors・IAM database authentication・private IP / Private Service Connect）、バックアップと PITR、HA・リードレプリカ・クロスリージョン、メンテナンス、Spanner のスキーマ設計・トランザクション・DML・インデックス・change streams・emulator・クライアント、DMS による移行を収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。Cloud SQL の 3 エンジン共通ページは PostgreSQL 版から 1 度だけ収録し、`cloud-sql-mysql` / `cloud-sql-sqlserver` にはエンジン固有ページのみを置く。

## ディレクトリ構成

```text
skills/gcp-databases-relational/
  SKILL.md
  references/
    cloud-sql-instances/          # インスタンス作成・設定・ユーザー・組み込み認証・Managed Connection Pooling
      README.md
      <page>.md                   # 例: create-instance.md / instance-settings.md / users.md / managed-connection-pooling.md
    cloud-sql-connect/            # 接続オプション・Cloud SQL Auth Proxy
      README.md
      <page>.md                   # 例: connection-options.md / sql-proxy.md / connect-auth-proxy.md
    cloud-sql-connectors-iam/     # Language Connectors・IAM database authentication・IAM ロール・CMEK・Secret Manager
      README.md
      <page>.md                   # 例: language-connectors.md / iam-logins.md / connectors-iam-python.md / iam-roles.md / cmek.md
    cloud-sql-networking/         # private IP・Private Service Connect・承認済みネットワーク・SSL/TLS・VPC 外 / 複数 VPC からの接続
      README.md
      <page>.md                   # 例: private-ip.md / about-private-service-connect.md / authorize-ssl.md
    cloud-sql-ha-replication/     # 高可用性・リードレプリカ・クロスリージョン・レプリケーションラグ・read pool・DR
      README.md
      <page>.md                   # 例: high-availability.md / create-replica.md / replication-lag.md
    cloud-sql-backup-recovery/    # バックアップ・バックアップオプション・PITR・復元
      README.md
      <page>.md                   # 例: backups.md / pitr.md / restoring.md
    cloud-sql-operations/         # メンテナンス・import / export・ロギング・モニタリング・System insights・Cloud SQL Studio・トラブルシューティング
      README.md
      <page>.md                   # 例: maintenance.md / import-export-sql.md / logging.md / troubleshooting.md
    cloud-sql-mysql/              # Cloud SQL for MySQL 固有: 機能・ユーザー・IAM 認証・レプリケーション・マイナーバージョンアップグレード
      README.md
      <page>.md                   # 例: features.md / users.md / replication.md / upgrade-minor-db-version.md
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

1. gcloud コマンド・フラグの全文、IAM ロールの権限、REST のメソッド・メッセージ型（機械生成の `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/`）は後続 PR で投入する。未投入の間は `gcloud <group> --help` と公式 reference を確認する
2. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
3. Cloud SQL はエンジン共通ページが `cloud-sql-*`（PostgreSQL 版を 1 度だけ収録）にあり、MySQL / SQL Server 固有の差分だけが `cloud-sql-mysql` / `cloud-sql-sqlserver`（後続 PR で投入） にある。まず共通カテゴリを引き、エンジン固有の挙動は固有カテゴリで補う

`samples/` と `scripts/` は本スキルに無い。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Cloud SQL インスタンスの作成・設定変更・ユーザー・パスワードポリシー・Managed Connection Pooling | cloud-sql-instances | [references/cloud-sql-instances/README.md](references/cloud-sql-instances/README.md) |
| Cloud SQL への接続方法の選択（private / public IP・コネクター・IAM 認証）・Cloud SQL Auth Proxy の起動 | cloud-sql-connect | [references/cloud-sql-connect/README.md](references/cloud-sql-connect/README.md) |
| Language Connectors（Java / Python / Go / Node.js）・IAM database authentication・IAM ロール・CMEK・Secret Manager | cloud-sql-connectors-iam | [references/cloud-sql-connectors-iam/README.md](references/cloud-sql-connectors-iam/README.md) |
| Cloud SQL Python Connector の自動 IAM database authentication（`enable_iam_auth=True`・SQLAlchemy + pg8000・`pip install`）。Node.js（`authType: 'IAM'`）は iam-logins.md | cloud-sql-connectors-iam | [references/cloud-sql-connectors-iam/connectors-iam-python.md](references/cloud-sql-connectors-iam/connectors-iam-python.md)、[references/cloud-sql-connectors-iam/iam-logins.md](references/cloud-sql-connectors-iam/iam-logins.md) |
| private IP・Private Service Connect・承認済みネットワーク・SSL/TLS 証明書・VPC 外 / 複数 VPC からの接続 | cloud-sql-networking | [references/cloud-sql-networking/README.md](references/cloud-sql-networking/README.md) |
| Cloud SQL の SSL/TLS 強制（`--ssl-mode`・`ENCRYPTED_ONLY`・`TRUSTED_CLIENT_CERTIFICATE_REQUIRED`、作成時 / `patch` のフラグ） | cloud-sql-instances、cloud-sql-networking | [references/cloud-sql-instances/create-instance.md](references/cloud-sql-instances/create-instance.md)、[references/cloud-sql-instances/instance-settings.md](references/cloud-sql-instances/instance-settings.md)、[references/cloud-sql-networking/authorize-ssl.md](references/cloud-sql-networking/authorize-ssl.md) |
| 高可用性（HA）・フェイルオーバー・リードレプリカ・cascading / クロスリージョンレプリカ・レプリケーションラグ・read pool・DR | cloud-sql-ha-replication | [references/cloud-sql-ha-replication/README.md](references/cloud-sql-ha-replication/README.md) |
| Cloud SQL のバックアップ（標準 / 拡張）・PITR・復元（別インスタンス / 別プロジェクト / 削除済み） | cloud-sql-backup-recovery | [references/cloud-sql-backup-recovery/README.md](references/cloud-sql-backup-recovery/README.md) |
| Cloud SQL の PITR を有効化（`--enable-point-in-time-recovery`・`--retained-transaction-log-days`、作成時のフラグ） | cloud-sql-instances、cloud-sql-backup-recovery | [references/cloud-sql-instances/create-instance.md](references/cloud-sql-instances/create-instance.md)、[references/cloud-sql-backup-recovery/pitr.md](references/cloud-sql-backup-recovery/pitr.md) |
| メンテナンスウィンドウ・SQL ダンプの import / export・ログ・モニタリング・System insights・Cloud SQL Studio・トラブルシューティング | cloud-sql-operations | [references/cloud-sql-operations/README.md](references/cloud-sql-operations/README.md) |
| Cloud SQL for MySQL 固有の機能・ユーザー・IAM 認証・レプリケーション（binary log）・マイナーバージョン更新 | cloud-sql-mysql | [references/cloud-sql-mysql/README.md](references/cloud-sql-mysql/README.md) |
| AlloyDB の概要・アーキテクチャ・マシンタイプ・バージョン・クォータ・クラスター / primary / read pool の作成と設定 | alloydb-overview | [references/alloydb-overview/README.md](references/alloydb-overview/README.md) |
| AlloyDB への接続（private services access / PSC）・Auth Proxy・Language Connectors・IAM 認証 | alloydb-connect-security | [references/alloydb-connect-security/README.md](references/alloydb-connect-security/README.md) |
| AlloyDB の IAM database authentication の設定（`alloydb.iam_authentication` フラグ・`roles/alloydb.databaseUser`・`gcloud alloydb users create --type=IAM_BASED` / `IAM_GROUP`・`GRANT`） | alloydb-connect-security | [references/alloydb-connect-security/manage-iam-auth.md](references/alloydb-connect-security/manage-iam-auth.md) |
| AlloyDB のバックアップ・PITR 復元・クロスリージョンレプリケーション・フェイルオーバー・メンテナンス・database flags・columnar engine | alloydb-operations | [references/alloydb-operations/README.md](references/alloydb-operations/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `iam` / `rest` / `rest-schemas` / `cloud-sql-overview` / `cloud-sql-sqlserver` / `spanner-overview` / `spanner-schema` / `spanner-transactions` / `spanner-dml-queries` / `spanner-indexes-change-streams` / `spanner-clients` / `spanner-operations` / `database-migration` / `database-center-insights`

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
