---
name: gcp-compute
description: >
  Google Cloud (GCP) の Compute Engine (VM・gcloud compute)・マシンファミリー・マシンタイプ・MIG・インスタンステンプレート・オートスケーラー・Persistent Disk・Hyperdisk・スナップショット・イメージ・Spot VM・予約 / CUD・GPU・Cloud TPU。Batch・VM Manager (OS Config)・sole-tenant・Shielded VM / Confidential VM / Confidential Space・OS Login / シリアルコンソール・Bare Metal Solution・Cluster Director・Oracle Database@Google Cloud。GKE は gcp-gke、Cloud Run は gcp-run とは別。
user-invocable: false
---

# gcp-compute

Google Cloud (GCP) のコンピュート系スキル。Compute Engine の VM インスタンス（作成・停止 / 削除・メタデータと起動スクリプト・SSH / OS Login / シリアルコンソール・サービスアカウントと Shielded VM）、マシンファミリー / マシンタイプ（汎用・コンピューティング最適化・メモリ最適化・アクセラレータ最適化・Arm）、ディスク（Persistent Disk・Hyperdisk・ローカル SSD）・スナップショット・イメージ・マシンイメージ、インスタンステンプレート・MIG（マネージドインスタンスグループ）・オートスケーラー、容量（Spot VM・Flex-start VM・予約・確約利用割引 CUD）、ホストメンテナンス・sole-tenant ノード、GPU、Cloud TPU（Compute Engine 経由）を扱う。加えて VM Manager（OS Config）、Batch、Bare Metal Solution、Cluster Director、Confidential Computing（Confidential VM / Confidential Space）、Oracle Database@Google Cloud と、gcloud 5 グループ・REST（Discovery）・IAM ロールを収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。旧称・移行の対応は preemptible VM → Spot VM、Cloud TPU API（`Node` / `QueuedResource`）→ Compute Engine の TPU（Cloud TPU API は legacy 扱い）。

機械生成の `gcloud compute` / `compute` REST / `roles/compute.*` のページは、Compute Engine API と `compute` gcloud グループに属する次のリソースも含む。VPC ネットワーク、ファイアウォール規則 / ポリシー、ルート、Cloud Router、VPN、Interconnect、Cloud NAT、ロードバランシングのリソース（バックエンドサービス、転送ルール、URL マップ、ヘルスチェック、SSL 証明書）、Cloud Armor セキュリティポリシー。これらのコマンド・メソッド・ロールは本スキルで引けるが、概念・手順のガイドは本スキルに無い（`gcp-networking` / `gcp-security`（予定）の担当）。

## ディレクトリ構成

```text
skills/gcp-compute/
  SKILL.md
  references/
    compute-instances/            # インスタンス作成の方法と構成オプション・インスタンステンプレートの作成
      README.md
      <page>.md                   # 例: instance-creation-overview.md / create-instance-templates.md
    compute-instance-lifecycle/   # インスタンスの停止と再起動・削除
      README.md
      <page>.md
    compute-access-ssh/           # アクセス方法の概要・標準 SSH・OS Login・IAP TCP 転送による SSH・シリアルポート出力・シリアルコンソール
      README.md
      <page>.md
    compute-disks/                # ストレージの選択肢・Persistent Disk・Hyperdisk・ローカル SSD・ディスク暗号化
      README.md
      <page>.md
    compute-instance-groups/      # インスタンスグループ・インスタンステンプレート・ゾーン / リージョン MIG・自動修復・更新・ステートフル MIG
      README.md
      <page>.md
    compute-autoscaling/          # オートスケーラー・CPU / LB 処理能力 / 複数シグナル・予測自動スケーリング・判断の読み方
      README.md
      <page>.md
    compute-capacity/             # Spot VM・Flex-start VM・予約・将来の予約・確約利用割引（CUD）
      README.md
      <page>.md                   # 例: spot.md
    compute-host-tenancy/         # ライブマイグレーション・ホストメンテナンス・ホストオプション・sole-tenant ノード・VM テナンシー
      README.md
      <page>.md
    compute-gpus/                 # GPU の概要・種類と機能・マシンシリーズ別 GPU・ドライバのインストール・GPU VM のホストメンテナンス
      README.md
      <page>.md
    batch/                        # Batch: 概要・ジョブの作成と実行・サンプルジョブ・VM の OS 環境・ネットワーク・認証・再試行・タイムアウト・クォータ
      README.md
      <page>.md
    cloud-tpu/                    # Cloud TPU: 概要・アーキテクチャ・Compute Engine の TPU・TPU マシンタイプ・TPU VM / MIG の作成・リージョン・TPU7x / v6e・計画
      README.md
      <page>.md                   # 例: tpus-in-compute-engine.md
    bare-metal-solution/          # Bare Metal Solution: 概要・計画・セットアップ・IAM・セキュリティ・メンテナンス・SSH 鍵
      README.md
      <page>.md
    cluster-director/             # Cluster Director: 概要・クラスタ作成・マシンタイプ・消費オプション・Slurm・接続・クォータ・ネットワーク・ストレージ・OS イメージ（Cluster Toolkit / AI Hypercomputer の概要各 1 件を含む）
      README.md
      <page>.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
2. 非推奨・サポート終了を確認するときは、まず `compute-overview/deprecations.md`（後続 PR で投入）（一覧表）、CSEK は加えて `compute-security/csek-deprecation-in-compute-engine.md`（後続 PR で投入）、legacy Cloud TPU API は `cloud-tpu/tpus-in-compute-engine.md`、preemptible VM との関係は `compute-capacity/spot.md` を引く

未投入カテゴリ（`gcloud` / `iam` / `rest` / `rest-schemas` / `compute-overview` / `compute-machine-types` / `compute-machine-families` / `compute-metadata-scripts` / `compute-security` / `compute-snapshots-images` / `vm-manager` / `confidential-computing` / `oracle-database`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| インスタンス作成の方法と構成オプション・インスタンステンプレートを作りたい | compute-instances | [references/compute-instances/README.md](references/compute-instances/README.md) |
| VM の停止・再起動・削除（課金への影響を含む） | compute-instance-lifecycle | [references/compute-instance-lifecycle/README.md](references/compute-instance-lifecycle/README.md) |
| VM への SSH 接続・OS Login の設定・IAP TCP 転送・シリアルポート出力・シリアルコンソール | compute-access-ssh | [references/compute-access-ssh/README.md](references/compute-access-ssh/README.md) |
| Persistent Disk・Hyperdisk（性能）・ローカル SSD・ディスク暗号化（Google 管理鍵 / CMEK / CSEK） | compute-disks | [references/compute-disks/README.md](references/compute-disks/README.md) |
| インスタンスグループ・インスタンステンプレート・ゾーン / リージョン MIG・自動修復・MIG の更新（proactive / opportunistic）・ステートフル MIG | compute-instance-groups | [references/compute-instance-groups/README.md](references/compute-instance-groups/README.md) |
| オートスケーラー・CPU 使用率 / LB 処理能力 / 複数シグナルによるスケーリング・予測自動スケーリング・スケールインの制御 | compute-autoscaling | [references/compute-autoscaling/README.md](references/compute-autoscaling/README.md) |
| Spot VM・Flex-start VM・予約・将来の予約・確約利用割引（CUD） | compute-capacity | [references/compute-capacity/README.md](references/compute-capacity/README.md) |
| ライブマイグレーション・ホストメンテナンスのポリシー・sole-tenant ノード・VM テナンシー | compute-host-tenancy | [references/compute-host-tenancy/README.md](references/compute-host-tenancy/README.md) |
| GPU の種類・マシンシリーズ別の GPU・GPU ドライバのインストール・GPU VM のホストメンテナンス | compute-gpus | [references/compute-gpus/README.md](references/compute-gpus/README.md) |
| Batch のジョブ作成・実行・VM の OS 環境・ネットワーク・認証・タスクの再試行・タイムアウト・クォータ | batch | [references/batch/README.md](references/batch/README.md) |
| Cloud TPU の概要・システムアーキテクチャ・Compute Engine での TPU VM / MIG の作成・TPU のリージョンとゾーン・TPU7x / v6e・legacy Cloud TPU API との対応 | cloud-tpu | [references/cloud-tpu/README.md](references/cloud-tpu/README.md) |
| Bare Metal Solution の概要・計画・セットアップ（VLAN アタッチメント・ルーティング）・IAM・セキュリティ・メンテナンス・SSH 鍵 | bare-metal-solution | [references/bare-metal-solution/README.md](references/bare-metal-solution/README.md) |
| Cluster Director（Slurm クラスタ）の作成・マシンタイプ・消費オプション・接続・クォータ・OS イメージ | cluster-director | [references/cluster-director/README.md](references/cluster-director/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `iam` / `rest` / `rest-schemas` / `compute-overview` / `compute-machine-types` / `compute-machine-families` / `compute-metadata-scripts` / `compute-security` / `compute-snapshots-images` / `vm-manager` / `confidential-computing` / `oracle-database`

## 他スキルとの使い分け

- `gcp-gke` — GKE。GKE のノードは Compute Engine VM で動くが、node pools の設定と GKE 上の GPU / TPU ワークロードは `gcp-gke` が担当。本スキルは VM 単体・MIG・ディスク・GPU・TPU の Compute Engine 側
- `gcp-run` — Cloud Run・Cloud Run functions・App Engine・Cloud Tasks・Cloud Scheduler・Cloud Workstations
- `gcp-foundation` — IAM の基盤（allow / deny policy・サービスアカウント・Workload Identity Federation）・リソース階層・ADC・課金・クォータ。OS Login API と組織レベルの OS Login 管理は `gcp-foundation`、VM 側の SSH / OS Login の設定は本スキル（`compute-access-ssh`）。本スキルは各製品の IAM ロール（`references/iam/`（後続 PR で投入））と、Compute Engine の IAM 概要・VM に付与するサービスアカウントのガイド（`compute-security`）
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット。`gcloud compute` / `batch` / `bms` / `cluster-director` / `oracle-database` のコマンドは本スキル
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン（ADC・リトライ・LRO）。Compute Engine 向けのクライアントコード例は本スキルに無い
- `gcp-storage` — Cloud Storage のバケット・Storage Transfer Service・Filestore・Managed Lustre・NetApp Volumes 本体。VM に接続するディスク（Persistent Disk・Hyperdisk・ローカル SSD）は本スキル
- `gcp-databases-relational` — Cloud SQL・AlloyDB・Spanner など。Oracle Database@Google Cloud は本スキル（`oracle-database`）
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `nvidia-cuda` — GPU 上の CUDA プログラミング（CUDA C++ / PTX / CUTLASS）。Compute Engine VM への GPU ドライバのインストールと GPU マシンシリーズの選択は本スキル（`compute-gpus`）
- `docker` — コンテナーイメージ・Dockerfile・Docker Engine。Compute Engine のコンテナー起動エージェントは非推奨（下記）で、イメージの作り方はそちら
- `anthropic-models-sdks` / `openai-api-core` / `openai-agents` — LLM の batch API（Message Batches 等）は Google Cloud の Batch（ジョブスケジューラー）とは無関係
- `apple-intelligence` — Apple のオンデバイス AI。Confidential Computing（Confidential VM / Confidential Space）とは無関係
- `gcp-networking`（予定）— VPC・ファイアウォール・Cloud Load Balancing・Cloud DNS・Cloud NAT・VPN / Interconnect の概念と手順。これらのコマンド・メソッド・ロールは本スキルの機械生成ページ（`compute` グループ）にある
- `gcp-security`（予定）— Cloud KMS（CMEK の鍵管理）・IAP 本体・Cloud Armor・Security Command Center。VM 側の Shielded VM / Confidential VM と、IAP TCP 転送による SSH の接続手順は本スキル
- `gcp-observability`（予定）— Cloud Logging・Cloud Monitoring・Ops Agent
- `gcp-iac`（予定）— Terraform
- `gcp-hybrid-migration`（予定）— VMware Engine・Migrate to Virtual Machines

## 料金

料金は転記していない。次のページで確認する（2026-11-17 に取得できることを確認した URL）。

- Compute Engine（VM・GPU）: https://cloud.google.com/products/compute/pricing
- ディスクとイメージ: https://cloud.google.com/compute/disks-image-pricing
- VM Manager: https://cloud.google.com/compute/vm-manager/pricing
- Batch: https://cloud.google.com/batch/pricing
- Cloud TPU: https://cloud.google.com/tpu/pricing
- Bare Metal Solution: https://cloud.google.com/bare-metal/pricing
- Cluster Director: https://cloud.google.com/cluster-director/pricing
- Confidential Computing: https://cloud.google.com/confidential-computing/pricing

Oracle Database@Google Cloud の料金は、公式ドキュメント内に Oracle 側のリンク（https://www.oracle.com/cloud/google/oracle-database-at-google-cloud/pricing/）があるが、未確認。

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- 単独で分量過大のページ — 監査ログ（`compute/docs/logging/audit-logging`）・OS イメージ別の詳細（`compute/docs/images/os-details`）・クライアントライブラリの使い方（`compute/docs/api/using-libraries`）・ゾーン / リージョン間の VM 移動（`instances/moving-instance-across-zones`）・Batch のストレージボリュームを使うジョブ（`batch/docs/create-run-job-storage`）・カスタムマシンタイプの作成（`instances/creating-instance-with-custom-machine-type`）・Bare Metal Solution の運用手順（`bare-metal/docs/bms-maintenance`）・確約に紐づく予約
- Compute Engine の個別手順 — VM の一括作成・公開イメージやテンプレートからの VM 作成・一時停止 / 再開・リセット・マシンタイプの変更・削除保護・起動 / 停止のスケジュール・予約の作成と消費・スナップショットの作成と復元・ディスクの作成 / サイズ変更 / 複製・ストレージプール・カスタムイメージのインポート / エクスポート・ストレージ最適化 / ネットワーク最適化マシン・CPU プラットフォーム・静的外部 IP・gVNIC・NIC の更新（VM 側ネットワーク）・ゾーン DNS・トラブルシューティング・VM 拡張・HPC・仮想ワークステーション
- Windows / SQL Server VM のガイド・OSS / ISV 固有のチュートリアル（`compute/docs/tutorials/**`）・SAP / Oracle on Compute Engine の構成
- AI Hypercomputer・Cluster Toolkit・Deep Learning VM — AI Hypercomputer と Cluster Toolkit は概要各 1 件のみ `cluster-director` に収録。マシン別の VM / MIG 作成手順（A3 / A4 等）・推論 / 学習のレシピ・NCCL・Cluster Toolkit のモジュールと CLI は対象外
- legacy Cloud TPU API の作成手順・キュー型リソース（`queued-resources`）・マルチスライス・ML ツール（JAX / PyTorch / TensorFlow のチュートリアル）・ML Diagnostics
- VM Manager のパッチデプロイの作成と管理・OS ポリシーの例・legacy guest policies・Shielded VM のセキュアブート変更 / vTPM の個別手順・Batch のジョブの種類別ガイド（GPU / TPU / コンテナ / MPI）と監視・Confidential Computing の個別設定とトラブルシューティング・Oracle Database@Google Cloud の VM クラスタ / バックアップ / GoldenGate / 監視
- VPC・ファイアウォール・Cloud NAT・VPN / Interconnect・ロードバランシング・Cloud Armor の概念と手順（`gcp-networking` / `gcp-security`（予定）。コマンド・メソッド・ロールのみ本スキルに機械生成で収録）
- VMware Engine・Migrate to Virtual Machines（`gcp-hybrid-migration`（予定））
- リリースノート・料金（上記 URL の導線のみ）・SLA

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-17（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin）、2026-11-14（機械生成分）、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/`（後続 PR で投入） `references/iam/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM reference / Discovery）。他の 22 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ。公式の例の一部は訂正・補完してあり、該当箇所は `Adapted (not in the official docs)` の行と各ページの Notes に記している
- 非推奨・サポート終了（日付は references の記載どおり。一覧は `compute-overview/deprecations.md`）:
  - CSEK（顧客指定の暗号鍵）— 日付が 2 ページで異なる。一覧表（`compute-overview/deprecations.md`）は 2026-06-15 に非推奨、2027-06-16 にシャットダウン。告知ページ（`compute-security/csek-deprecation-in-compute-engine.md`）は 2026-07-20 以降は CSEK で暗号化できず、2027-07-20 に削除。新規リソースでは CSEK を使わない。移行先は CMEK
  - NVIDIA T4 / P4 — 2026-08-01 に非推奨、2027-08-01 にシャットダウン（一覧表）。NVIDIA P100 は 2025-09-15 に非推奨、2026-09-15 にシャットダウン（取得日時点で終了済み）
  - preemptible VM — Spot VM が後継（`compute-capacity/spot.md`）
  - legacy Cloud TPU API（`gcloud compute tpus`・`Node` / `QueuedResource`）— 開発は活発ではなく、バグ修正とセキュリティ更新のみ。TPU7x（Ironwood）以降は Compute Engine または GKE 経由のみ。シャットダウン日は原文に無い（`cloud-tpu/tpus-in-compute-engine.md`）。新規は Compute Engine の TPU を使う
  - コンテナー起動エージェント（`gcloud compute instances create-with-container` / `instance-templates create-with-container`）— 2025-07-21 に非推奨、2026-07-31 にシャットダウン（一覧表。取得日時点で終了済み）。手順ページは収録していない
  - OS Login の POSIX グループ — 2024-09-26 に非推奨、2025-09-26 にシャットダウン。グローバルシリアルコンソールゲートウェイは 2025-04-30 に停止（一覧表）
- Bare Metal Solution は終了告知なし（収録ページに終了の記述を確認していない）。通常の製品として収録
- OS Login・IAP TCP 転送・CMEK（ディスク暗号化の比較）・MIG のオートスケーラーの LB 処理能力シグナルは、他スキルの領域に接するページを VM 側の手順として収録している
- `general-purpose-machines` と `accelerator-optimized-machines` は分量が大きい（`compute-machine-families` の 2 ページ）。必要な節を grep で絞って読む
- Compute Engine は機能・マシンシリーズ・リージョンごとに可用性が異なる。各ページの前提を確認してから当てはめる
- Compute Engine は頻繁に更新される。新しいフラグ・マシンシリーズは `gcloud help` と公式 reference で確認する
