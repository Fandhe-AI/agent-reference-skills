---
name: gcp-storage
description: >
  Google Cloud (GCP) の Cloud Storage・gcloud storage・signed URLs・Cloud Storage FUSE・Storage Transfer Service・Filestore・NetApp Volumes・Managed Lustre・Backup and DR。
  GCS・buckets/objects・Anywhere Cache・Storage Insights・storage batch operations・Transfer Appliance・Parallelstore・soft delete・Object Versioning・retention・bucket lock・lifecycle・IAM/UBLA。
  Cloudflare R2・Supabase Storage とは別、gcloud 全般は gcp-cli。
user-invocable: false
---

# gcp-storage

Google Cloud (GCP) のストレージ・データ移行・バックアップスキル。Cloud Storage（GCS）のバケット・オブジェクト・ストレージクラス・ロケーション・アップロード / ダウンロード・アクセス制御（IAM / UBLA / ACL / 署名付き URL / 公開アクセス防止）・データ保護（Object Versioning / ライフサイクル / Bucket Lock / Object Retention Lock / ホールド / ソフト削除 / 暗号化）・Cloud Storage FUSE・Anywhere Cache・Storage Insights / Storage Intelligence・storage batch operations を扱う。あわせて Storage Transfer Service・Transfer Appliance・Filestore・NetApp Volumes・Managed Lustre・Parallelstore・Backup and DR のガイド・gcloud・REST・IAM ロールを収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。

## ディレクトリ構成

```text
skills/gcp-storage/
  SKILL.md
  references/
    cloud-storage-basics/            # 公式ガイド由来（手書き）: 製品概要・クイックスタート・バケット / オブジェクト・ストレージクラス・ロケーション・クォータ・gsutil 移行・XML API・HMAC キー
      README.md
      <page>.md                      # 例: introduction.md / buckets.md / storage-classes.md / locations.md / quotas.md / gsutil-transition-to-gcloud.md / hmackeys.md
    cloud-storage-buckets-objects/   # 公式ガイド由来: バケット作成・メタデータ・階層型名前空間 (HNS)・マネージドフォルダ・削除
      README.md
      <page>.md                      # 例: creating-buckets.md / bucket-metadata.md / hns-overview.md / managed-folders.md / deleting-objects.md
    cloud-storage-uploads-downloads/ # 公式ガイド由来: アップロード・ダウンロード手順
      README.md
      uploading-objects.md
      downloading-objects.md
    cloud-storage-features/          # 公式ガイド由来: 整合性・メタデータ・前提条件・再開可能アップロード・Autoclass・Requester Pays・Pub/Sub 通知・CORS
      README.md
      <page>.md                      # 例: consistency.md / request-preconditions.md / resumable-uploads.md / autoclass.md / pubsub-notifications.md
    cloud-storage-access-control/    # 公式ガイド由来: IAM・UBLA・ACL・署名付き URL・公開アクセス防止
      README.md
      <page>.md                      # 例: iam.md / uniform-bucket-level-access.md / signed-urls.md / signing-urls-with-helpers.md / public-access-prevention.md
    cloud-storage-data-protection/   # 公式ガイド由来: バージョニング・ライフサイクル・Bucket Lock・Object Lock・ホールド・ソフト削除・暗号化
      README.md
      <page>.md                      # 例: object-versioning.md / lifecycle.md / bucket-lock.md / soft-delete.md / customer-managed-keys.md
    cloud-storage-fuse-performance/  # 公式ガイド由来: Cloud Storage FUSE・Anywhere Cache・ベストプラクティス
      README.md
      <page>.md                      # 例: overview.md / install.md / mount-bucket.md / file-caching.md / anywhere-cache.md
    storage-insights-batch-operations/ # 公式ガイド由来: インベントリレポート・データセット・Storage Intelligence・batch operations
      README.md
      <page>.md                      # 例: inventory-reports.md / datasets.md / configure-datasets.md / batch-operations-overview.md
    filestore/                       # 公式ガイド由来: Filestore のティア・インスタンス作成・マウント・バックアップ・スナップショット
      README.md
      <page>.md                      # 例: service-tiers.md / creating-instances.md / mounting-fileshares.md / snapshots.md / iam.md
    lustre-parallelstore/            # 公式ガイド由来: Managed Lustre・Parallelstore の概要・作成・Compute Engine 接続
      README.md
      <page>.md                      # 例: managed-lustre-create-instance.md / managed-lustre-quotas.md / parallelstore-create-instance.md
    netapp-volumes/                  # 公式ガイド由来: NetApp Volumes のサービスレベル・プール・ボリューム・NFS・スナップショット・バックアップ
      README.md
      <page>.md                      # 例: service-levels.md / create-storage-pool.md / connect-nfs-clients.md / networking.md / iam.md
    backup-dr/                       # 公式ガイド由来: Backup and DR の保管庫・プラン・クイックスタート・IAM・非推奨
      README.md
      <page>.md                      # 例: backup-vault.md / backup-plan.md / quickstart-compute-engine-backup-vault.md / deprecations.md
    cloud-storage-release-notes/     # 公式ガイド由来: Cloud Storage リリースノート（2025-2026）
      README.md
      release-notes-2025-2026.md
```

機械生成のカテゴリ（後続 PR で `references/gcloud/` 等に投入）:

- `references/gcloud/` — gcloud グループ 6 件（`storage` / `transfer` / `filestore` / `lustre` / `netapp` / `backup-dr`）。Parallelstore は gcloud 593.0.0 にコマンドグループが無く REST のみ
- `references/iam/` — 12 サービスのロール・権限（Cloud Storage / Storage Transfer Service / Storage Insights / Transfer Appliance / Filestore / Managed Lustre / Parallelstore / NetApp Volumes / NetApp Cloud Volumes Service / Dell EMC Cloud OneFS / Backup and DR）
- `references/rest/` `references/rest-schemas/` — 7 API（`storage` / `storagetransfer` / `storagebatchoperations` / `file` / `netapp` / `parallelstore` / `backupdr`）

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順（バケット / オブジェクト、アクセス制御、データ保護、FUSE、Insights、転送、ファイルストレージ、バックアップ）→ 下記マッピング表でカテゴリを選び、その README.md から個別ページを引く
2. gcloud コマンド・フラグの全文、REST のメソッド・メッセージ型、IAM ロールと権限の一覧（機械生成の `references/gcloud/` `references/rest/` `references/rest-schemas/` `references/iam/`）は後続 PR で投入する。未投入の間は `gcloud help` と公式 reference を確認する
3. 製品別の既定値・制限は各カテゴリのページ（`quotas.md` / `limits.md` / `service-tiers.md` / `service-levels.md` など）を先に引く
4. 作業例 → `samples/README.md`（後続 PR で投入）、コマンド集 → `scripts/README.md`（後続 PR で投入）

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Cloud Storage の概念（バケット・オブジェクト・ストレージクラス・ロケーション・クォータ）、gcloud クイックスタート、gsutil からの移行、XML API・HMAC キー | cloud-storage-basics | [references/cloud-storage-basics/README.md](references/cloud-storage-basics/README.md) |
| バケットの作成・メタデータ、階層型名前空間 (HNS)、マネージドフォルダ、オブジェクト削除 | cloud-storage-buckets-objects | [references/cloud-storage-buckets-objects/README.md](references/cloud-storage-buckets-objects/README.md) |
| オブジェクトのアップロード・ダウンロード（gcloud / クライアントライブラリ / JSON・XML API） | cloud-storage-uploads-downloads | [references/cloud-storage-uploads-downloads/README.md](references/cloud-storage-uploads-downloads/README.md) |
| 整合性・メタデータ・リクエスト前提条件・再開可能アップロード、Autoclass・Requester Pays・Pub/Sub 通知・CORS | cloud-storage-features | [references/cloud-storage-features/README.md](references/cloud-storage-features/README.md) |
| IAM・uniform bucket-level access (UBLA)・ACL・署名付き URL（signed URLs）・公開アクセス防止 | cloud-storage-access-control | [references/cloud-storage-access-control/README.md](references/cloud-storage-access-control/README.md) |
| Object Versioning・ライフサイクル・Bucket Lock・Object Retention Lock・ホールド・ソフト削除・暗号化（既定の鍵 / CMEK / CSEK） | cloud-storage-data-protection | [references/cloud-storage-data-protection/README.md](references/cloud-storage-data-protection/README.md) |
| Cloud Storage FUSE（gcsfuse）のインストール・マウント・ファイルキャッシュ、Anywhere Cache、FUSE のベストプラクティス | cloud-storage-fuse-performance | [references/cloud-storage-fuse-performance/README.md](references/cloud-storage-fuse-performance/README.md) |
| Storage Insights（インベントリレポート・データセット）、Storage Intelligence、storage batch operations | storage-insights-batch-operations | [references/storage-insights-batch-operations/README.md](references/storage-insights-batch-operations/README.md) |
| Filestore（マネージド NFS）のティア・インスタンス作成・マウント・バックアップ・スナップショット・制限・リージョン・IAM | filestore | [references/filestore/README.md](references/filestore/README.md) |
| Managed Lustre・Parallelstore の概要・インスタンス作成・Compute Engine からの接続・クォータ | lustre-parallelstore | [references/lustre-parallelstore/README.md](references/lustre-parallelstore/README.md) |
| NetApp Volumes のサービスレベル・ストレージプール・ボリューム作成・マウント・スナップショット・バックアップ・ネットワーク・IAM | netapp-volumes | [references/netapp-volumes/README.md](references/netapp-volumes/README.md) |
| Backup and DR の保管庫・バックアッププラン・Compute Engine クイックスタート・IAM・Terraform・非推奨 | backup-dr | [references/backup-dr/README.md](references/backup-dr/README.md) |
| Cloud Storage の新機能・変更・非推奨の経緯（2025-2026）を知りたい | cloud-storage-release-notes | [references/cloud-storage-release-notes/README.md](references/cloud-storage-release-notes/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `storage-transfer` / `transfer-appliance` / `samples` / `scripts`

## 他スキルとの使い分け

- `gcp-cli` — gcloud 全般のインストール・設定・出力フォーマット・`gcloud auth` の使い方。`gcloud storage` / `transfer` / `filestore` / `lustre` / `netapp` / `backup-dr` のコマンドは本スキル
- `gcp-foundation` — ADC・IAM の仕組み・サービスアカウント・Organization Policy・課金。Cloud Storage の IAM ロールと権限、UBLA、公開アクセス防止の設定は本スキル
- `gcp-run` — Cloud Run のバケット / Filestore ボリュームマウント。分割 PR で順次追加中のため、公開までは公式ドキュメントを確認する。ストレージ側の製品・IAM は本スキル
- `gcp-client-libraries` — 言語別クライアントライブラリのコード（予定）。本スキルは製品・API・CLI
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `cloudflare-storage` — Cloudflare R2 / KV / D1。S3 互換でも Cloud Storage とは別基盤
- `supabase` — Supabase Storage。Cloud Storage とは別
- Cloud Storage for Firebase は対象外（Firebase は別計画）

## 収録しなかった主なガイド

公式 URL は `https://docs.cloud.google.com/<path>`。必要なときは公式ページを確認する。

- 複数言語のタブで大きい how-to（概念ページは収録済み）— `storage/docs/encryption/using-customer-managed-keys` / `storage/docs/access-control/using-iam-permissions` / `storage/docs/using-bucket-lock` / `storage/docs/using-cors` / `storage/docs/managing-lifecycles` / `storage/docs/using-uniform-bucket-level-access` / `storage/docs/using-object-versioning`
- オブジェクト操作 — `storage/docs/listing-objects` / `storage/docs/copying-renaming-moving-objects`
- 静的サイト・エンドポイント — `storage/docs/hosting-static-website` / `storage/docs/request-endpoints`
- Cloud Storage FUSE の詳細 — `storage/docs/cloud-storage-fuse/cli-options` / `config-file` / `performance` / `caching` / `metrics`
- Storage Insights / batch operations の how-to — `storage/docs/insights/using-inventory-reports` / `storage/docs/batch-operations/create-manage-batch-operation-jobs`
- 運用・監視 — `storage/docs/monitoring` / `storage/docs/audit-logging` / `storage/docs/troubleshooting`
- Storage Transfer Service のソース別作成手順・エージェント運用 — `storage-transfer/docs/create-transfers/agentless/s3` / `storage-transfer/docs/managing-on-prem-agents`
- Filestore の GKE 向け CSI driver — `filestore/docs/csi-driver`
- Backup and DR のワークロード別手順（Compute Engine 等）— `backup-disaster-recovery/docs/cloud-console/compute/compute-instance-backup`
- 料金 — `https://cloud.google.com/storage/pricing` / `https://cloud.google.com/filestore/pricing` / `https://cloud.google.com/netapp/volumes/pricing` / `https://cloud.google.com/backup-disaster-recovery/pricing`（概念ページ内の料金モデルの記述は各ページを参照）

## 鮮度・ライセンス・既知の制約

- 取得日: ガイド（手書き）は 2026-11-15、機械生成のカテゴリは 2026-11-14（gcloud 593.0.0）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/` は機械生成で、後続 PR で投入する。上記 15 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
- ガイドは主要ページの要約で、公式の全ページではない。コードサンプルは Node.js / Python のみ収録（他言語は公式ページ）
- Dell EMC Cloud OneFS・NetApp Cloud Volumes Service は IAM ロールのみ（ガイドなし）。Parallelstore は REST のみ（gcloud グループなし）、招待制の製品
- 料金ページ・変更ログ（Filestore / NetApp Volumes / Backup and DR などのリリースノート）は未収録
