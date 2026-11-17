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
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14
      README.md
      compute/
        README.md                 # gcloud compute（Compute Engine 全般に加え、ネットワーク・LB・Cloud Armor 系、compute tpus、compute os-config を含む）
        compute-<group>.md        # 例: compute-addresses.md / compute-ssl-certificates.md
        compute-<group>-<cmd>.md  # GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS（例: compute-instances-create-with-container.md）
      batch/
        README.md                 # gcloud batch
      bms/
        README.md                 # gcloud bms（Bare Metal Solution）
        bms-<group>.md            # 例: bms-instances.md / bms-volumes.md / bms-networks.md
      cluster-director/
        README.md                 # gcloud cluster-director
      oracle-database/
        README.md                 # gcloud oracle-database
        oracle-database-<group>.md  # 例: oracle-database-db-systems.md / oracle-database-odb-networks-1.md
    iam/                          # 機械生成: IAM roles-permissions reference、取得 2026-11-14
      README.md
      <service>.md                # compute は compute-1.md〜compute-15.md の 15 分割。他に osconfig / batch / tpu / baremetalsolution / hypercomputecluster / oracledatabase-1・2 / confidentialcomputing / autoscaling / oci
    compute-overview/             # 公式ガイド由来（手書き）: 概要・インスタンスの概念・停止 / 一時停止 / リセットの違い・リージョンとゾーン・割り当て・ライフサイクル・プロビジョニングモデル・作成と起動・廃止一覧
      README.md
      <page>.md                   # 例: deprecations.md / create-start-instance.md
    compute-machine-types/        # マシンリソースの体系・コンピューティング最適化・メモリ最適化・Arm VM
      README.md
      <page>.md
    compute-machine-families/     # 汎用マシンファミリー（C4 / N4 / C3 / N2 / E2 / N1 / Tau 等、カスタムマシンタイプ）・アクセラレータ最適化マシン（A4 / A3 / A2 / G4 / G2 等）
      README.md
      <page>.md
    compute-instances/            # インスタンス作成の方法と構成オプション・インスタンステンプレートの作成
      README.md
      <page>.md                   # 例: instance-creation-overview.md / create-instance-templates.md
    compute-instance-lifecycle/   # インスタンスの停止と再起動・削除
      README.md
      <page>.md
    compute-metadata-scripts/     # メタデータサーバー・定義済みメタデータキー・起動 / シャットダウンスクリプト・ゲスト環境・ゲストエージェント
      README.md
      <page>.md
    compute-access-ssh/           # アクセス方法の概要・標準 SSH・OS Login・IAP TCP 転送による SSH・シリアルポート出力・シリアルコンソール
      README.md
      <page>.md
    compute-security/             # アクセス制御・IAM・サービスアカウント・組織ポリシー・Shielded VM・整合性モニタリング・CSEK の廃止告知
      README.md
      <page>.md                   # 例: csek-deprecation-in-compute-engine.md
    compute-disks/                # ストレージの選択肢・Persistent Disk・Hyperdisk・ローカル SSD・ディスク暗号化
      README.md
      <page>.md
    compute-snapshots-images/     # データ保護・スナップショット・インスタントスナップショット・スケジュール・リージョン PD・イメージ・イメージファミリー・マシンイメージ・OS イメージのライフサイクル
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
    vm-manager/                   # VM Manager（OS Config）: 概要・セットアップ・OS パッチ管理・OS ポリシー・OS インベントリ
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
    confidential-computing/       # Confidential Computing: Confidential VM（対応構成・作成・構成証明・組織ポリシー）・Confidential Space
      README.md
      <page>.md
    oracle-database/              # Oracle Database@Google Cloud: 概要・環境準備・リージョン・IAM・ODB Network・Exadata Infrastructure・Autonomous AI Database・クォータ
      README.md
      <page>.md
```

`references/gcloud/` が担当する gcloud グループ（5）:

- `compute`（Compute Engine。`instances` / `disks` / `instance-templates` / `instance-groups` / `images` / `snapshots` / `reservations` / `machine-types` 等に加え、`compute tpus`（legacy Cloud TPU API の CLI）と `compute os-config`（VM Manager）が同じグループ内にある。ネットワーク・LB・Cloud Armor 系の `networks` / `firewall-rules` / `routers` / `interconnects` / `forwarding-rules` / `url-maps` / `security-policies` 等もここに含まれる）
- `batch`（Batch）
- `bms`（Bare Metal Solution）
- `cluster-director`（Cluster Director）
- `oracle-database`（Oracle Database@Google Cloud）

`references/iam/` のサービス: `compute`（15 分割）/ `osconfig` / `batch` / `tpu` / `baremetalsolution` / `hypercomputecluster` / `oracledatabase`（2 分割）/ `confidentialcomputing` / `autoscaling` / `oci`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/compute/README.md`（`gcloud compute`）、`references/gcloud/batch/README.md`、`references/gcloud/bms/README.md`、`references/gcloud/cluster-director/README.md`、`references/gcloud/oracle-database/README.md` からグループページ・コマンドページを引く。`gcloud compute tpus`（legacy Cloud TPU API）と `gcloud compute os-config`（VM Manager）は独立したグループではなく `compute` グループ配下のため、`references/gcloud/compute/` の `compute-tpus-*` / `compute-os-config-*` を引く。GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
2. IAM ロール・権限 → `references/iam/README.md` の索引から `<service>.md` を引く。`compute` は `compute-1.md`〜`compute-15.md` に分割されているため、ロール ID（例: `roles/compute.instanceAdmin.v1`）で `references/iam/` 配下を grep して該当ファイルを特定する。ロール ID のサービス接頭辞（`roles/osconfig.*` → `osconfig.md`、`roles/batch.*` → `batch.md`、`roles/tpu.*` → `tpu.md` 等）で他サービスを選ぶ
3. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
4. VPC・ファイアウォール・Cloud NAT・VPN・ロードバランサー・Cloud Armor は、コマンド・メソッド・ロールのみ機械生成ページ（手順 1〜3）にある。概念・設計の説明は本スキルに無い
5. 非推奨・サポート終了を確認するときは、まず `compute-overview/deprecations.md`（一覧表）、CSEK は加えて `compute-security/csek-deprecation-in-compute-engine.md`、legacy Cloud TPU API は `cloud-tpu/tpus-in-compute-engine.md`、preemptible VM との関係は `compute-capacity/spot.md` を引く

`samples/` と `scripts/` は本スキルに無い。コマンドは `references/gcloud/` を引く。

未投入カテゴリ（`rest` / `rest-schemas`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（compute / batch / bms / cluster-director / oracle-database の 5 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| `gcloud compute`（instances・disks・instance-templates・instance-groups・images・snapshots・reservations、および compute tpus・compute os-config、ネットワーク / LB / Cloud Armor 系）のフラグを調べたい | gcloud/compute | [references/gcloud/compute/README.md](references/gcloud/compute/README.md) |
| `gcloud batch` のジョブ・タスクのコマンドを調べたい | gcloud/batch | [references/gcloud/batch/README.md](references/gcloud/batch/README.md) |
| `gcloud bms`（Bare Metal Solution のインスタンス・ボリューム・ネットワーク）のフラグを調べたい | gcloud/bms | [references/gcloud/bms/README.md](references/gcloud/bms/README.md) |
| `gcloud cluster-director` のコマンドを調べたい | gcloud/cluster-director | [references/gcloud/cluster-director/README.md](references/gcloud/cluster-director/README.md) |
| `gcloud oracle-database`（Exadata・VM クラスタ・Autonomous Database・ODB Network）のフラグを調べたい | gcloud/oracle-database | [references/gcloud/oracle-database/README.md](references/gcloud/oracle-database/README.md) |
| ロール ID の権限一覧・事前定義ロールを調べたい（`roles/compute.*` / `roles/osconfig.*` / `roles/batch.*` / `roles/tpu.*` / `roles/baremetalsolution.*` / `roles/oracledatabase.*` 等） | iam | [references/iam/README.md](references/iam/README.md) |
| Compute Engine の概要・インスタンスの概念・リージョンとゾーン・割り当て・インスタンスのライフサイクル・プロビジョニングモデル・VM の作成と起動・廃止一覧 | compute-overview | [references/compute-overview/README.md](references/compute-overview/README.md) |
| 停止 / 一時停止 / リセットの違い・グローバル / リージョン / ゾーンリソース | compute-overview | [references/compute-overview/README.md](references/compute-overview/README.md) |
| マシンファミリー・シリーズ・タイプの体系・コンピューティング最適化・メモリ最適化・Arm VM | compute-machine-types | [references/compute-machine-types/README.md](references/compute-machine-types/README.md) |
| 汎用マシン（C4 / N4 / C3 / N2 / E2 / N1 / Tau）・カスタムマシンタイプ・アクセラレータ最適化マシン（A4 / A3 / A2 / G4 / G2）を選びたい | compute-machine-families | [references/compute-machine-families/README.md](references/compute-machine-families/README.md) |
| インスタンス作成の方法と構成オプション・インスタンステンプレートを作りたい | compute-instances | [references/compute-instances/README.md](references/compute-instances/README.md) |
| VM の停止・再起動・削除（課金への影響を含む） | compute-instance-lifecycle | [references/compute-instance-lifecycle/README.md](references/compute-instance-lifecycle/README.md) |
| メタデータサーバー・定義済みメタデータキー・起動スクリプト・シャットダウンスクリプト・ゲスト環境・ゲストエージェント | compute-metadata-scripts | [references/compute-metadata-scripts/README.md](references/compute-metadata-scripts/README.md) |
| VM への SSH 接続・OS Login の設定・IAP TCP 転送・シリアルポート出力・シリアルコンソール | compute-access-ssh | [references/compute-access-ssh/README.md](references/compute-access-ssh/README.md) |
| Compute Engine の IAM・サービスアカウントの VM への付与・組織ポリシーの制約・Shielded VM・整合性モニタリング・CSEK の廃止 | compute-security | [references/compute-security/README.md](references/compute-security/README.md) |
| Persistent Disk・Hyperdisk（性能）・ローカル SSD・ディスク暗号化（Google 管理鍵 / CMEK / CSEK） | compute-disks | [references/compute-disks/README.md](references/compute-disks/README.md) |
| スナップショット・インスタントスナップショット・スナップショットスケジュール・リージョン PD・イメージ・イメージファミリー・マシンイメージ・OS イメージのライフサイクル | compute-snapshots-images | [references/compute-snapshots-images/README.md](references/compute-snapshots-images/README.md) |
| インスタンスグループ・インスタンステンプレート・ゾーン / リージョン MIG・自動修復・MIG の更新（proactive / opportunistic）・ステートフル MIG | compute-instance-groups | [references/compute-instance-groups/README.md](references/compute-instance-groups/README.md) |
| オートスケーラー・CPU 使用率 / LB 処理能力 / 複数シグナルによるスケーリング・予測自動スケーリング・スケールインの制御 | compute-autoscaling | [references/compute-autoscaling/README.md](references/compute-autoscaling/README.md) |
| Spot VM・Flex-start VM・予約・将来の予約・確約利用割引（CUD） | compute-capacity | [references/compute-capacity/README.md](references/compute-capacity/README.md) |
| ライブマイグレーション・ホストメンテナンスのポリシー・sole-tenant ノード・VM テナンシー | compute-host-tenancy | [references/compute-host-tenancy/README.md](references/compute-host-tenancy/README.md) |
| GPU の種類・マシンシリーズ別の GPU・GPU ドライバのインストール・GPU VM のホストメンテナンス | compute-gpus | [references/compute-gpus/README.md](references/compute-gpus/README.md) |
| VM Manager（OS Config）のセットアップ・OS パッチ管理・OS ポリシー・OS インベントリ | vm-manager | [references/vm-manager/README.md](references/vm-manager/README.md) |
| Batch のジョブ作成・実行・VM の OS 環境・ネットワーク・認証・タスクの再試行・タイムアウト・クォータ | batch | [references/batch/README.md](references/batch/README.md) |
| Cloud TPU の概要・システムアーキテクチャ・Compute Engine での TPU VM / MIG の作成・TPU のリージョンとゾーン・TPU7x / v6e・legacy Cloud TPU API との対応 | cloud-tpu | [references/cloud-tpu/README.md](references/cloud-tpu/README.md) |
| Bare Metal Solution の概要・計画・セットアップ（VLAN アタッチメント・ルーティング）・IAM・セキュリティ・メンテナンス・SSH 鍵 | bare-metal-solution | [references/bare-metal-solution/README.md](references/bare-metal-solution/README.md) |
| Cluster Director（Slurm クラスタ）の作成・マシンタイプ・消費オプション・接続・クォータ・OS イメージ | cluster-director | [references/cluster-director/README.md](references/cluster-director/README.md) |
| Confidential VM（対応構成・作成・構成証明・組織ポリシーによる強制）・Confidential Space のワークロード | confidential-computing | [references/confidential-computing/README.md](references/confidential-computing/README.md) |
| Oracle Database@Google Cloud の概要・環境準備・ODB Network・Exadata Infrastructure・Autonomous AI Database・IAM・クォータ | oracle-database | [references/oracle-database/README.md](references/oracle-database/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `rest` / `rest-schemas`

## 他スキルとの使い分け

- `gcp-gke` — GKE。GKE のノードは Compute Engine VM で動くが、node pools の設定と GKE 上の GPU / TPU ワークロードは `gcp-gke` が担当。本スキルは VM 単体・MIG・ディスク・GPU・TPU の Compute Engine 側
- `gcp-run` — Cloud Run・Cloud Run functions・App Engine・Cloud Tasks・Cloud Scheduler・Cloud Workstations
- `gcp-foundation` — IAM の基盤（allow / deny policy・サービスアカウント・Workload Identity Federation）・リソース階層・ADC・課金・クォータ。OS Login API と組織レベルの OS Login 管理は `gcp-foundation`、VM 側の SSH / OS Login の設定は本スキル（`compute-access-ssh`）。本スキルは各製品の IAM ロール（`references/iam/`）と、Compute Engine の IAM 概要・VM に付与するサービスアカウントのガイド（`compute-security`）
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
- `references/gcloud/` `references/iam/` `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） は機械生成（gcloud 593.0.0 の help / IAM reference / Discovery）。他の 22 カテゴリは公式ガイド由来の手書き
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
