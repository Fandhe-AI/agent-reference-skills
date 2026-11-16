---
name: gcp-databases-nosql
description: >
  Google Cloud (GCP) の Firestore (Native / Datastore モード・旧 Datastore・MongoDB 互換)・Bigtable・Memorystore (Valkey / Redis / Redis Cluster / Memcached) の gcloud・REST。security rules・複合 index・transactions・PITR・row key・app profile・replication・GoogleSQL・change streams・IAM 認証・gcloud firestore・bigtable・memorystore・redis・memcache。Spanner・Cloud SQL は gcp-databases-relational、Upstash・Firebase SDK とは別。
user-invocable: false
---

# gcp-databases-nosql

Google Cloud (GCP) の NoSQL・インメモリデータストア系スキル。Firestore（Native mode・Datastore mode・MongoDB 互換の Enterprise edition）、Bigtable、Memorystore（for Valkey・for Redis Cluster・for Redis・for Memcached）を扱う。Firestore のデータモデル・データベース管理・トランザクション・インデックス・クエリ・security rules・IAM・バックアップ / PITR・TTL、Datastore mode の GQL・index.yaml・multitenancy、MongoDB 互換の接続と動作差、Bigtable のスキーマ設計・row key・app profile・replication・GoogleSQL・backups・change streams、Memorystore の PSC ネットワーク・IAM 認証・TLS・CMEK・HA・永続化・バックアップ・メンテナンスを収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。Memorystore は for Valkey（`gcloud memorystore`）・for Redis Cluster（`gcloud redis clusters`）・for Redis（`gcloud redis instances`）・for Memcached（`gcloud memcache`）が別製品・別 API のため、カテゴリも製品ごとに分けている。

## ディレクトリ構成

```text
skills/gcp-databases-nosql/
  SKILL.md
  references/
    firestore-databases-data/     # データベース作成・管理・認証（ADC）・emulator・REST API・orderBy / limit
      README.md
      <page>.md                   # 例: manage-databases.md / authentication.md / emulator.md / use-rest-api.md
    firestore-datastore-mode/     # Firestore in Datastore mode（旧 Datastore）: 概要・GQL・トランザクション・インデックス・制限・エラー・multitenancy
      README.md
      <page>.md                   # 例: overview.md / indexes.md / limits.md / multitenancy.md
    bigtable-overview/            # Bigtable の概要・インスタンス / クラスター / ノード・エディション・SSD / HDD・tiered storage・in-memory tier・クォータ・性能・スケーリング・移行
      README.md
      <page>.md                   # 例: overview.md / instances-clusters-nodes.md / editions-overview.md / performance.md
    bigtable-schema-instances/    # スキーマ設計・row key・時系列・テーブルとビュー・ガベージコレクション・インスタンス作成
      README.md
      <page>.md                   # 例: schema-design.md / schema-design-time-series.md / tables-and-views.md / creating-instance.md
    bigtable-read-write/          # 書き込み・読み取りの種類・制限・コード例（Node.js / Python / cbt）
      README.md
      <page>.md                   # writes.md / reads.md / writing-data.md
    bigtable-replication-sql/     # app profile・replication・ルーティング・autoscaling・GoogleSQL for Bigtable
      README.md
      <page>.md                   # 例: app-profiles.md / replication-overview.md / routing.md / googlesql-overview.md
    bigtable-security-operations/ # IAM・認証と CMEK・バックアップ・モニタリング・change streams
      README.md
      <page>.md                   # 例: access-control.md / authentication-and-cmek.md / backups.md / change-streams-overview.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド・フラグの全文、IAM ロールの権限、REST のメソッド・メッセージ型（機械生成の `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/`）は後続 PR で投入する。未投入の間は `gcloud <group> --help`（`firestore` / `datastore` / `bigtable` / `memorystore` / `redis` / `memcache`）と公式 reference を確認する
2. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
3. Firestore は Native mode（Standard edition）・Enterprise edition（MongoDB 互換を含む）・Datastore mode でページが分かれる。Native mode / Enterprise の共通事項は `firestore-*`、Datastore mode 固有は `firestore-datastore-mode`、MongoDB 互換固有は `firestore-mongodb`（後続 PR で投入）。まず共通カテゴリを引き、モード固有の挙動は固有カテゴリで補う
4. Memorystore は製品ごとにカテゴリが別（`memorystore-valkey-*` / `memorystore-redis-cluster`（後続 PR で投入） / `memorystore-redis`（後続 PR で投入） / `memorystore-memcached`（後続 PR で投入））。製品名（Valkey / Redis Cluster / Redis / Memcached）と gcloud グループを照合してから引く。Memorystore for Valkey には Discovery document が無く、REST のメソッド表は無い

`samples/` と `scripts/` は本スキルに無い。コマンドは `gcloud <group> --help` と公式 reference を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Firestore データベースの作成・一覧・更新・削除・clone・認証（ADC・impersonation）・emulator・REST API の使い方 | firestore-databases-data | [references/firestore-databases-data/README.md](references/firestore-databases-data/README.md) |
| サーバークライアントライブラリで Firestore にデータを書く・読む（クイックスタート）・`orderBy()` / `limit()` | firestore-databases-data | [references/firestore-databases-data/README.md](references/firestore-databases-data/README.md) |
| Datastore mode の概要・GQL クエリ・エンティティ・kind・トランザクション・インデックス（`index.yaml`・exploding index）・制限・エラーコード・namespace による multitenancy | firestore-datastore-mode | [references/firestore-datastore-mode/README.md](references/firestore-datastore-mode/README.md) |
| Bigtable の概要・インスタンス / クラスター / ノード・エディション（Enterprise / Enterprise Plus）・SSD と HDD・tiered storage・in-memory tier | bigtable-overview | [references/bigtable-overview/README.md](references/bigtable-overview/README.md) |
| Bigtable のロケーション・クォータ・性能とキャパシティ計画・スケーリング・HBase / Cassandra / DynamoDB からの移行 | bigtable-overview | [references/bigtable-overview/README.md](references/bigtable-overview/README.md) |
| Bigtable のスキーマ設計（column family・row key・時系列）・データ型の強制・テーブルとビュー（logical / materialized / authorized）・ガベージコレクション | bigtable-schema-instances | [references/bigtable-schema-instances/README.md](references/bigtable-schema-instances/README.md) |
| Bigtable インスタンスの作成（gcloud・`cbt`・Node.js・Python）・`cbt` でのクイックスタート | bigtable-schema-instances | [references/bigtable-schema-instances/README.md](references/bigtable-schema-instances/README.md) |
| Bigtable の書き込み・読み取り（request の種類・制限・reverse scan）・コード例 | bigtable-read-write | [references/bigtable-read-write/README.md](references/bigtable-read-write/README.md) |
| Bigtable の app profile・replication・ルーティング（single-cluster / multi-cluster / row-affinity）・autoscaling | bigtable-replication-sql | [references/bigtable-replication-sql/README.md](references/bigtable-replication-sql/README.md) |
| GoogleSQL for Bigtable（SQL でのクエリ・temporal filter・UNPACK・Data Boost） | bigtable-replication-sql | [references/bigtable-replication-sql/README.md](references/bigtable-replication-sql/README.md) |
| Bigtable の IAM（ロール・instance / table / backup / authorized view への付与）・認証・CMEK | bigtable-security-operations | [references/bigtable-security-operations/README.md](references/bigtable-security-operations/README.md) |
| Bigtable のバックアップ（standard / hot）・モニタリング・change streams（CDC） | bigtable-security-operations | [references/bigtable-security-operations/README.md](references/bigtable-security-operations/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `firestore-overview` / `firestore-writes-transactions` / `firestore-indexes-queries` / `firestore-security` / `firestore-operations` / `firestore-mongodb` / `memorystore-valkey-overview` / `memorystore-valkey-security` / `memorystore-valkey-ha-persistence` / `memorystore-valkey-operations` / `memorystore-redis-cluster` / `memorystore-redis` / `memorystore-memcached`

## 他スキルとの使い分け

- `gcp-databases-relational` — Cloud SQL・AlloyDB・Spanner・Database Migration Service。Bigtable の GoogleSQL（`bigtable-replication-sql`）はこれらとは別で、Bigtable 上の SQL クエリのみ本スキル
- `gcp-foundation` — IAM の基盤（allow / deny policy・サービスアカウント・Workload Identity Federation）・ADC・組織ポリシー・Service Usage・クォータ・課金。本スキルは各プロダクトの IAM ロール（`roles/datastore.user`・`roles/bigtable.user`・`roles/memorystore.admin` など）とデータベース認証のみ
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット。`gcloud firestore` / `datastore` / `bigtable` / `memorystore` / `redis` / `memcache` のコマンドは本スキル
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通のパターン（ADC・リトライ・emulator 設定の一般論）。本スキルは Firestore / Bigtable / Valkey / Redis Cluster のクライアントコード例と、Firestore emulator の起動手順のみ
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `supabase` — ホスト型 Postgres と BaaS（Supabase）。Firestore とは別プロダクト
- `cloudflare-storage` — Cloudflare Workers KV / D1 / R2。本スキルの Firestore / Bigtable / Memorystore とは別基盤
- `upstash` — ホスト型 Redis（Upstash Redis）・Vector・QStash。Memorystore for Redis / Valkey / Redis Cluster とは別プロダクト
- Firebase client SDK（Web / iOS / Android から Firestore を使う SDK）と Firebase コンソールのセットアップは対象外（別計画の `firebase-*`）。本スキルは Google Cloud 側の Firestore（サーバークライアントライブラリ・gcloud・IAM・Security Rules の概念）のみ
- BigQuery は `gcp-bigquery`（予定）が担当。本スキルでは扱わない

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- Firebase — client SDK・Firebase コンソール・Firebase Authentication・Firebase Emulator Suite（別計画 `firebase-*`）
- Firestore のモバイル / Web クライアント SDK のオフライン・リアルタイムリスナー — Firebase client SDK の領域
- Firestore の言語別クライアントライブラリのリファレンス — 共通パターンは `gcp-client-libraries`
- Bigtable のクライアントライブラリごとの API リファレンス・HBase client・Dataflow / Beam / Spark 等の連携コネクター — 連携先の領域
- Memorystore for Redis / Valkey / Memcached の言語別クライアントのライブラリリファレンス
- Redis Enterprise Cloud — Google Cloud 上のパートナー提供サービス（IAM ロールのみ機械生成分に含む）
- BigQuery — `gcp-bigquery`（予定）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-16（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- 現時点の `references/` は公式ガイド由来の手書き 20 カテゴリのみ。gcloud（593.0.0 の help）・IAM roles-permissions reference・REST（`google-api-python-client` 同梱の Discovery document）は機械生成分として後続 PR で投入する
- Firestore は Native mode / Datastore mode / MongoDB 互換でページの前提が異なる。機能・制限・クォータ・インデックスの扱いをモードをまたいで当てはめない（`firestore-datastore-mode` / `firestore-mongodb` の固有ページを優先する）
- Memorystore の 4 製品は別 API・別 gcloud グループ。Valkey は `gcloud memorystore`、Redis Cluster は `gcloud redis clusters`、Redis は `gcloud redis instances`、Memcached は `gcloud memcache`。Memorystore for Valkey には Discovery document が無く、REST のメソッド表・メッセージスキーマは無い
- 料金ページ・リリースノートは未収録。公式ページを確認する
- gcloud は頻繁に更新される。新しいバージョンのフラグは `gcloud help` と公式 reference で確認する
