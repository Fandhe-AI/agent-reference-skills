---
name: gcp-gke
description: >
  Google Cloud (GCP) の GKE (Autopilot / Standard・node pools・Workload Identity Federation for GKE・Gateway API)・Backup for GKE・fleet / GKE Enterprise・Config Sync・Cloud Service Mesh・GKE Multi-Cloud / attached clusters・Google Distributed Cloud software (VMware / bare metal)。旧 Anthos。gcloud container・anthos、REST、IAM、Knative serving。Cloud Run は gcp-run、Docker は docker スキルとは別。
user-invocable: false
---

# gcp-gke

Google Cloud (GCP) の Kubernetes 系スキル。Google Kubernetes Engine（Autopilot / Standard）のクラスター・node pools・ノードイメージ・ComputeClass・Spot VM・オートスケーリング（cluster autoscaler / HPA / VPA / node auto-provisioning）・アップグレードとメンテナンス（release channels）・ネットワーク（VPC-native・Dataplane V2・network policy・kube-dns・Service / Ingress / Gateway API）・ストレージ（CSI ドライバー・Hyperdisk・Filestore・Cloud Storage FUSE CSI driver）・セキュリティ（IAM・RBAC・Workload Identity Federation for GKE・GKE Sandbox・Binary Authorization の GKE 側設定）・GPU / TPU・オブザーバビリティ・Knative serving を扱う。加えて Backup for GKE、fleet / GKE Enterprise（fleet 管理・Connect gateway・Multi Cluster Ingress / Gateway / Services）、Config Sync / Policy Controller / Config Controller、Cloud Service Mesh、GKE Multi-Cloud（GKE on AWS / Azure・GKE attached clusters）、Google Distributed Cloud software only（VMware / bare metal）と、gcloud 2 グループ・REST（Discovery）・IAM ロールを収録する。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。製品名の旧称は Anthos clusters on VMware / bare metal → Google Distributed Cloud、Anthos Service Mesh と Traffic Director → Cloud Service Mesh、`gcloud container hub` → `gcloud container fleet`。

## ディレクトリ構成

```text
skills/gcp-gke/
  SKILL.md
  references/
    gcloud/                       # 機械生成: gcloud 593.0.0、取得 2026-11-14
      README.md
      container/
        README.md                 # gcloud container 1388 コマンド（clusters / node-pools / fleet / hub / backup-restore / binauthz / aws / azure / attached / vmware / bare-metal 等）
        <group>.md                # 例: container-ai.md / container-aws-clusters.md / container-attached-clusters.md
        container-<group>-<cmd>.md  # GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS（例: container-clusters-describe.md / container-fleet-create.md）
      anthos/
        README.md                 # gcloud anthos 27 コマンド（apply / auth / config / create-login-config / export）
        anthos-<group>.md
    iam/                          # 機械生成: IAM roles-permissions reference、取得 2026-11-14
      README.md
      <service>.md                # container は container-1.md〜container-5.md の 5 分割（他に gkebackup / gkehub / gkemulticloud / gkeonprem / anthos* 等、計 26 ファイル）
    rest/                         # 機械生成: Discovery 由来のメソッド表、取得 2026-11-14
      README.md
      <api>/
        README.md
        <api>.md                  # container / gkebackup / gkehub / gkeonprem
    rest-schemas/                 # 機械生成: Discovery 由来のメッセージスキーマ、取得 2026-11-14
      README.md
      <api>/
        README.md
        <api>.md                  # container は container-1〜3、gkehub は gkehub-1・2、gkeonprem は gkeonprem-1・2、gkebackup は 1 ファイル
    gke-overview/                 # 公式ガイド由来（手書き）: GKE の概要・アーキテクチャ・Autopilot・モード選択・責任共有・クォータ・大規模クラスター・バージョニング
      README.md
      <page>.md                   # 例: kubernetes-engine-overview.md / cluster-architecture.md / choose-cluster-mode.md / versioning.md
    gke-clusters/                 # クラスターの構成選択・作成（Autopilot / regional / zonal）・管理・kubectl アクセス・削除
      README.md
      <page>.md                   # 例: configuration-overview.md / creating-an-autopilot-cluster.md / cluster-access-for-kubectl.md
    gke-nodes/                    # node pools・ノードイメージ・ComputeClass・Spot VM・Arm・Windows Server・node auto-repair
      README.md
      <page>.md                   # 例: node-pools.md / node-images.md / about-compute-classes.md / spot-vms.md
    gke-autoscaling/              # cluster autoscaler・HPA・VPA・node auto-provisioning・capacity buffer・カスタム / 外部メトリクス
      README.md
      <page>.md                   # 例: cluster-autoscaler.md / horizontalpodautoscaler.md / node-auto-provisioning.md
    gke-upgrades-maintenance/     # クラスターのアップグレード・release channels・メンテナンスウィンドウと exclusion・ノードアップグレード戦略
      README.md
      <page>.md                   # 例: upgrades.md / release-channels.md / maintenance-windows-and-exclusions.md
    gke-networking-core/          # VPC-native（alias IP）・ネットワーク分離・Dataplane V2・network policy・kube-dns
      README.md
      <page>.md                   # 例: alias-ips.md / network-isolation.md / dataplane-v2.md / network-policy.md
    gke-networking-services/      # Service・LoadBalancer Service・Ingress・サービスディスカバリー・ロードバランシングの選び方
      README.md
      <page>.md                   # 例: service-networking.md / about-load-balancing.md / ingress.md
    gke-gateway/                  # GKE Gateway API の概念・セキュリティ（TLS）・Policy 設定・トラフィック分散・session affinity・autoscaling
      README.md
      <page>.md                   # 例: gateway-api.md / gateway-security.md / configure-gateway-resources.md
    gke-storage/                  # PV / PVC / StorageClass・Persistent Disk CSI・Hyperdisk・Local SSD・Filestore・Cloud Storage FUSE CSI driver・snapshot
      README.md
      <page>.md                   # 例: storage-overview.md / gce-pd-csi-driver.md / cloud-storage-fuse-csi-driver.md
    gke-security-identity/        # IAM とロール・Kubernetes RBAC・Google Groups for RBAC・Workload Identity Federation for GKE
      README.md
      <page>.md                   # 例: access-control.md / iam.md / role-based-access-control.md / workload-identity.md
    gke-security-hardening/       # セキュリティ概要・ハードニング・GKE Sandbox・Binary Authorization 設定・Container Threat Detection 概要・設定スキャン
      README.md
      <page>.md                   # 例: security-overview.md / hardening-your-cluster.md / sandbox-pods.md / configure-policy-gke.md
    gke-workloads-accelerators/   # Autopilot のリソース要求・workload separation・stateless アプリ・GPU / TPU・flex-start・Knative serving
      README.md
      <page>.md                   # 例: autopilot-resource-requests.md / gpus.md / tpus.md / knative-install-on-gcp.md
    gke-observability-troubleshooting/  # ログ・メトリクス・managed OpenTelemetry・監査ポリシー・コンソール・クラスター通知・トラブルシューティング
      README.md
      <page>.md                   # 例: observability.md / about-logs.md / configure-metrics.md / troubleshooting.md
    backup-for-gke/               # Backup for GKE: backup plan・backup・restore plan・restore・スケジュール・ロール・クォータ
      README.md
      <page>.md                   # 例: backup-for-gke.md / backup-plan.md / restore-plan.md / roles.md
    fleet-management/             # fleet の概念・計画・作成・登録・fleet 機能・Fleet Workload Identity Federation・Connect gateway・GKE Identity Service
      README.md
      <page>.md                   # 例: fleet-concepts.md / register-gke.md / connect-gateway.md / gke-identity-service.md
    fleet-multi-cluster/          # Multi Cluster Ingress・multi-cluster Gateway・Multi-cluster Services（MCS）・LB API の選び方
      README.md
      <page>.md                   # 例: choose-mc-lb-api.md / multi-cluster-ingress.md / multi-cluster-gateways.md / multi-cluster-services.md
    config-sync-policy/           # Config Sync・Policy Controller（非推奨）・Config Controller
      README.md
      <page>.md                   # 例: config-sync-overview.md / installing-config-sync.md / policy-controller-deprecation.md
    service-mesh/                 # Cloud Service Mesh: 概要・サポート対象・managed control plane・セキュリティ・service routing API・クォータ・非推奨
      README.md
      <page>.md                   # 例: overview.md / provision-control-plane.md / service-routing-overview.md / deprecations.md
    gke-multicloud/               # GKE on AWS / Azure（非推奨）・GKE attached clusters（EKS / AKS / 汎用 CNCF 準拠クラスター）
      README.md
      <page>.md                   # 例: aws-deprecation-announcement.md / attached-concepts-overview.md / attach-cluster-eks.md
    gdc-software/                 # Google Distributed Cloud software only（VMware / bare metal）の概要・インストール計画・アップグレード・制限
      README.md
      <page>.md                   # 例: vmware-overview.md / vmware-advanced-clusters.md / bare-metal-about-bare-metal.md
```

`references/gcloud/` が担当する gcloud グループ（2）:

- `container`（1388 コマンド。`clusters` / `node-pools` / `operations` / `images` / `subnets` に加え、`fleet`（旧 `hub`）・`backup-restore`・`binauthz`・`aws`・`azure`・`attached`・`vmware`・`bare-metal`・`ai` 等。`container hub` と `container fleet` の両ページが存在する）
- `anthos`（27 コマンド。サブグループ: apply / auth / config / create-login-config / export）

`references/iam/` のサービス（26 ファイル）: `container`（GKE。5 分割）/ `containersecurity` / `containerthreatdetection` / `gkebackup` / `gkehub` / `gkemulticloud` / `gkeonprem`（Google Distributed Cloud）/ `gkedataplanemanagement` / `anthos*`（`anthos` / `anthosaudit` / `anthosconfigmanagement` / `anthosidentityservice` / `anthospolicycontroller` / `anthosservicemesh` / `anthossupport`）/ `meshcontrolplane` / `multiclusteringress` / `multiclustermetering` / `multiclusterservicediscovery` / `krmapihosting` / `kubernetesmetadata` / `kuberun`（Knative serving）。

`references/rest/` `references/rest-schemas/` の API（4）: `container`（Kubernetes Engine API）/ `gkebackup`（Backup for GKE API）/ `gkehub`（GKE Hub API）/ `gkeonprem`（GKE On-Prem API）。GKE Multi-Cloud（`gkemulticloud`）は `rest/` `rest-schemas/` にディレクトリが無く、収録は `references/gcloud/container/`（`container aws` / `container azure` / `container attached`）と `references/iam/gkemulticloud.md` のみ。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/container/README.md`（`gcloud container`）または `references/gcloud/anthos/README.md`（`gcloud anthos`）からグループページ・コマンドページを引く。GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ。fleet 系は `container fleet`（旧 `container hub`）で引く
2. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`。GKE クラスター・node pool は `container`、Backup for GKE は `gkebackup`、fleet・membership・Feature は `gkehub`、Google Distributed Cloud（VMware / bare metal）クラスターは `gkeonprem`。GKE Multi-Cloud の REST は無い
3. IAM ロール・権限 → `references/iam/README.md` の索引から `<service>.md` を引く。ロール ID・権限名のサービス接頭辞で選ぶ（例: `roles/container.admin` → `container-1.md`、`roles/gkebackup.admin` → `gkebackup.md`、`roles/gkehub.admin` → `gkehub.md`）。GKE の権限一覧は `container-3.md`〜`container-5.md`
4. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）
5. 製品名の旧称で引くときは、Anthos 系は fleet 系（`fleet-management`）・Cloud Service Mesh（`service-mesh`）・Config Sync（`config-sync-policy`）・Google Distributed Cloud（`gdc-software`）へ振り分ける。Knative serving は `gke-workloads-accelerators` の `knative-*` ページ
6. 非推奨・サポート終了を確認するときは、Policy Controller は `config-sync-policy/policy-controller-deprecation.md`、GKE on AWS / Azure は `gke-multicloud/*-deprecation-announcement.md`、GKE Identity Service は `fleet-management/identity-service-deprecation.md`、Cloud Service Mesh は `service-mesh/deprecations.md` を引く

`samples/` と `scripts/` は本スキルに無い。コマンドは `references/gcloud/` を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud のコマンド・フラグを調べたい（container / anthos の 2 グループ） | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| `gcloud container`（clusters・node-pools・fleet / hub・backup-restore・binauthz・aws・azure・attached・vmware・bare-metal）のフラグを調べたい | gcloud/container | [references/gcloud/container/README.md](references/gcloud/container/README.md) |
| `gcloud anthos`（apply・auth・config・create-login-config・export）のフラグを調べたい | gcloud/anthos | [references/gcloud/anthos/README.md](references/gcloud/anthos/README.md) |
| ロール ID の権限一覧・事前定義ロールを調べたい（`roles/container.*` / `roles/gkebackup.*` / `roles/gkehub.*` / `roles/gkemulticloud.*` / `roles/gkeonprem.*` / `roles/anthosservicemesh.*` 等） | iam | [references/iam/README.md](references/iam/README.md) |
| REST のメソッド・パスを調べたい（Kubernetes Engine API・Backup for GKE API・GKE Hub API・GKE On-Prem API） | rest | [references/rest/README.md](references/rest/README.md) |
| 各 API のメソッド | rest/container、rest/gkebackup、rest/gkehub、rest/gkeonprem | [references/rest/container/README.md](references/rest/container/README.md)、[references/rest/gkebackup/README.md](references/rest/gkebackup/README.md)、[references/rest/gkehub/README.md](references/rest/gkehub/README.md)、[references/rest/gkeonprem/README.md](references/rest/gkeonprem/README.md) |
| REST のリクエスト・レスポンスのメッセージ型を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md) |
| GKE の概要・クラスターアーキテクチャ・Autopilot と Standard の選び方・責任共有 | gke-overview | [references/gke-overview/README.md](references/gke-overview/README.md) |
| GKE のクォータと制限・大規模クラスターの計画・スケーラビリティ・バージョニングとサポート | gke-overview | [references/gke-overview/README.md](references/gke-overview/README.md) |
| クラスター構成の選択・Autopilot / regional / zonal クラスターの作成・クラスター管理・削除 | gke-clusters | [references/gke-clusters/README.md](references/gke-clusters/README.md) |
| kubectl と `gke-gcloud-auth-plugin` のセットアップ・`get-credentials`・クラスターエンドポイント | gke-clusters | [references/gke-clusters/README.md](references/gke-clusters/README.md) |
| node pools の作成・更新・削除・ノードイメージ（`cos_containerd` / Ubuntu / Windows）・node auto-repair | gke-nodes | [references/gke-nodes/README.md](references/gke-nodes/README.md) |
| ComputeClass・組み込み ComputeClass・Spot VM・Arm ノード・Windows Server コンテナー | gke-nodes | [references/gke-nodes/README.md](references/gke-nodes/README.md) |
| cluster autoscaler・Horizontal / Vertical Pod Autoscaler・node auto-provisioning・capacity buffer・カスタム / 外部メトリクス | gke-autoscaling | [references/gke-autoscaling/README.md](references/gke-autoscaling/README.md) |
| クラスター・ノードのアップグレード・release channels（Rapid / Regular / Stable / Extended）・メンテナンスウィンドウと exclusion・surge / blue-green アップグレード | gke-upgrades-maintenance | [references/gke-upgrades-maintenance/README.md](references/gke-upgrades-maintenance/README.md) |
| VPC-native クラスター（alias IP）・ネットワーク分離（private nodes・authorized networks）・Dataplane V2・network policy・kube-dns | gke-networking-core | [references/gke-networking-core/README.md](references/gke-networking-core/README.md) |
| Service（ClusterIP / NodePort / LoadBalancer）・Ingress・コンテナネイティブロードバランシング・サービスディスカバリー | gke-networking-services | [references/gke-networking-services/README.md](references/gke-networking-services/README.md) |
| GKE Gateway API（GatewayClass・Gateway・HTTPRoute）の概念・TLS 終端 / パススルー・GCPGatewayPolicy / HealthCheckPolicy / GCPBackendPolicy・トラフィック分散・session affinity | gke-gateway | [references/gke-gateway/README.md](references/gke-gateway/README.md) |
| PersistentVolume・StorageClass・Persistent Disk CSI・Hyperdisk・Local SSD・Filestore・Cloud Storage FUSE CSI driver・volume snapshot・attach limit | gke-storage | [references/gke-storage/README.md](references/gke-storage/README.md) |
| GKE の IAM ロール・Kubernetes RBAC・Google Groups for RBAC・Workload Identity Federation for GKE（Pod から Google Cloud API へ認証） | gke-security-identity | [references/gke-security-identity/README.md](references/gke-security-identity/README.md) |
| GKE のセキュリティ概要・クラスターのハードニング・GKE Sandbox・Binary Authorization の GKE 設定・Container Threat Detection 概要・セキュリティ姿勢スキャン | gke-security-hardening | [references/gke-security-hardening/README.md](references/gke-security-hardening/README.md) |
| Autopilot の Pod リソース要求・workload separation（taint / toleration）・stateless アプリのデプロイ | gke-workloads-accelerators | [references/gke-workloads-accelerators/README.md](references/gke-workloads-accelerators/README.md) |
| GPU（共有・time-sharing・MIG）・TPU・flex-start provisioning（Dynamic Workload Scheduler） | gke-workloads-accelerators | [references/gke-workloads-accelerators/README.md](references/gke-workloads-accelerators/README.md) |
| Knative serving（アーキテクチャ・Service / Revision・GKE Enterprise fleet でのインストール） | gke-workloads-accelerators | [references/gke-workloads-accelerators/README.md](references/gke-workloads-accelerators/README.md) |
| GKE のログ・メトリクス（`--logging` / `--monitoring`）・managed OpenTelemetry・監査ポリシー・クラスター通知・トラブルシューティング | gke-observability-troubleshooting | [references/gke-observability-troubleshooting/README.md](references/gke-observability-troubleshooting/README.md) |
| Backup for GKE の有効化・backup plan・バックアップ・restore plan・復元・ロール・クォータ | backup-for-gke | [references/backup-for-gke/README.md](references/backup-for-gke/README.md) |
| fleet の概念・計画・作成・クラスター登録・fleet 機能・team scope・Fleet Workload Identity Federation | fleet-management | [references/fleet-management/README.md](references/fleet-management/README.md) |
| Connect gateway・Connect Agent・GKE Identity Service（サードパーティ IdP 認証）とその非推奨 | fleet-management | [references/fleet-management/README.md](references/fleet-management/README.md) |
| Multi Cluster Ingress・multi-cluster Gateway・Multi-cluster Services（MCS）・マルチクラスター LB API の選び方 | fleet-multi-cluster | [references/fleet-multi-cluster/README.md](references/fleet-multi-cluster/README.md) |
| Config Sync（Git / OCI / Helm の RootSync・RepoSync）・Config Controller | config-sync-policy | [references/config-sync-policy/README.md](references/config-sync-policy/README.md) |
| Policy Controller（Gatekeeper ベース）の概要・非推奨と移行（ValidatingAdmissionPolicy / Pod Security Admission / Gatekeeper） | config-sync-policy | [references/config-sync-policy/README.md](references/config-sync-policy/README.md) |
| Cloud Service Mesh の概要・サポート対象・managed control plane（ISTIOD / TRAFFIC_DIRECTOR）・mTLS・service routing API・非推奨 | service-mesh | [references/service-mesh/README.md](references/service-mesh/README.md) |
| GKE on AWS / Azure の非推奨とアーキテクチャ・GKE attached clusters（EKS / AKS / 汎用）のアタッチ・更新・デタッチ・ロギング / モニタリング | gke-multicloud | [references/gke-multicloud/README.md](references/gke-multicloud/README.md) |
| Google Distributed Cloud software only（VMware / bare metal）の概要・advanced clusters・インストール計画・アップグレード・スケーラビリティ・接続・制限 | gdc-software | [references/gdc-software/README.md](references/gdc-software/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `rest-schemas/gkebackup` / `rest-schemas/gkehub` / `rest-schemas/gkeonprem`

## 他スキルとの使い分け

- `gcp-run` — Cloud Run・Cloud Run functions など、マネージドなサーバーレス実行基盤。Cloud Run は Knative 互換だがマネージド版は `gcp-run` が担当し、GKE クラスター上に自前で入れる Knative serving のみ本スキル（`gke-workloads-accelerators` の `knative-*`）
- `gcp-foundation` — IAM の基盤（allow / deny policy・サービスアカウント・Workload Identity Federation）・ADC・組織ポリシー・課金・クォータ。外部ワークロード向けの Workload Identity Federation は `gcp-foundation`、GKE の Pod 向けの Workload Identity Federation for GKE は本スキル（`gke-security-identity`）。本スキルは GKE / fleet / Backup for GKE 各製品の IAM ロールのみ
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット。`gcloud container` / `gcloud anthos` のコマンドは本スキル
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン（ADC・リトライ・LRO）。GKE 向け API のクライアントコード例は本スキルに無い
- `gcp-storage` — Cloud Storage 本体・Filestore・Storage Transfer Service など。GKE から Cloud Storage バケットをマウントする Cloud Storage FUSE CSI driver と Filestore CSI driver の利用手順は本スキル（`gke-storage`）
- `gcp-databases-relational` / `gcp-databases-nosql` — Cloud SQL・AlloyDB・Spanner・Firestore・Bigtable・Memorystore などのデータベース本体。GKE から接続する際のデータベース側設定はそちら
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `docker` — コンテナーイメージ・Dockerfile・Docker Engine / Compose / Buildx。GKE へデプロイするイメージの作り方はそちら
- `cloudflare-sandbox-containers` — Cloudflare Containers / Sandbox SDK。Google Cloud の GKE・Cloud Run とは別プラットフォーム
- `hono` / `fastify` — HTTP ルーターのフレームワーク。本スキルの Gateway API（`Gateway` / `HTTPRoute`）は Kubernetes のロードバランシング設定で、ルーターのライブラリとは別
- `gcp-compute`（予定）— Compute Engine VM・ディスク・インスタンステンプレート。GKE ノードの node pool 設定は本スキル
- `gcp-networking`（予定）— VPC・Cloud Load Balancing・Cloud DNS・Cloud NAT・Traffic Director のサービスルーティング（GKE 以外のターゲット）。GKE の VPC-native・Gateway・Ingress・Service・Cloud Service Mesh は本スキル
- `gcp-security`（予定）— Security Command Center・Binary Authorization のポリシー本体・Cloud KMS。GKE 側の有効化と設定のみ本スキル（`gke-security-hardening`）
- `gcp-observability`（予定）— Cloud Logging・Cloud Monitoring 本体。GKE が送出するログ・メトリクスの設定は本スキル（`gke-observability-troubleshooting`）
- `gcp-devops`（予定）— Artifact Registry・Cloud Build・Cloud Deploy
- `gcp-iac`（予定）— Terraform・Config Connector

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- GKE の `deploying-gateways` how-to（約 3,437 行で分量過大）— Gateway API の概念・セキュリティ・Policy 設定は `gke-gateway` に収録
- Traffic Director・service routing — `service-mesh/service-routing-overview.md` の概要のみ収録。`trafficdirector` は `gcp-networking`（予定）の担当。Cloud Run のルーティング関連ページも対象外
- Google Distributed Cloud の hosted / edge / air-gapped（`distributed-cloud/` 配下のドキュメント）— 収録は software only（VMware / bare metal）のみ
- Google Distributed Cloud の既知の問題・メトリクス一覧・設定ファイルのリファレンス
- OSS ワークロードのデプロイチュートリアル（Ray・Slurm・推論サーバーなど）・Terraform / Config Connector（`gcp-iac`（予定））
- Security Command Center の Container Threat Detection の how-to — 概要のみ `gke-security-hardening` に収録
- リリースノート・セキュリティ速報・料金・SLA
- バージョン別・レガシーのドキュメント（`service-mesh/v1.x`・`service-mesh/legacy`・版付きの `anthos/`・アーカイブ）— Cloud Service Mesh は supported-platforms の 1.29〜1.31 が対象
- GKE Multi-Cloud（`gkemulticloud`）の REST のメソッド表・メッセージスキーマ — `rest/gkemulticloud/` は無い。収録は `references/gcloud/container/`（`container aws` / `container azure` / `container attached`）と `references/iam/gkemulticloud.md`

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-16（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin）、2026-11-14（機械生成分）、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/iam/` `references/rest/` `references/rest-schemas/` は機械生成（gcloud 593.0.0 の help / IAM reference / Discovery）。他の 20 カテゴリは公式ガイド由来の手書き
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ。gcloud 593.0.0 でのパース検査のため、help の例の一部は訂正・補完してある（各ページの Notes を参照）
- 非推奨・サポート終了（日付は references の記載どおり）:
  - Policy Controller — 2026-11-12 に非推奨、サポート終了は 2027-12-31。GKE 1.39 以降は非対応（`config-sync-policy/policy-controller-deprecation.md`）
  - GKE on AWS / GKE on Azure — サポート終了は 2027-03-17（`gke-multicloud/aws-deprecation-announcement.md` / `azure-deprecation-announcement.md`）。GKE attached clusters は非推奨ではない
  - Identity Service for GKE（Google Cloud 上の GKE クラスター）— 2026-07-01 に非推奨、1.37 以降は非対応（`fleet-management/identity-service-deprecation.md`）。Connect gateway と Google Distributed Cloud の GKE Identity Service は非推奨ではない
  - `gcloud container hub` は `gcloud container fleet` の旧称
  - Anthos の名称は GKE Enterprise / fleet / Google Distributed Cloud などへ移行済み（Anthos Service Mesh と Traffic Director は 2024-05-23 に Cloud Service Mesh へ統合）
- Knative serving は GKE Enterprise の fleet 前提のインストール手順（`knative-install-on-gcp.md`）。既存の非 fleet インストールを上書きするため、公式の警告に従う
- GKE のバージョン依存の機能は版・リージョン・モードで可用性が異なる。各ページの前提を確認してから当てはめる
- GKE は頻繁に更新される。新しいバージョンのフラグ・機能は `gcloud help` と公式 reference で確認する
