---
name: proxmox-ve
description: >
  Proxmox VE (PVE) 9.2。KVM/QEMU VM (virtiofs)、LXC (OCI イメージ)、クラスター、HA (CRS 負荷分散)、
  SDN、Ceph、ZFS、pmxcfs、ACME 証明書、proxmox-boot-tool、Secure Boot 証明書更新 (enroll-efi-keys)、NIC 名固定。
  qm, pct, pvecm, pvesm, pveceph, pvesh, pveum, vzdump, pveam, pvesr, ha-manager CLI、REST API、
  qm.conf, pct.conf, datacenter.cfg。
user-invocable: false
---

対象: Proxmox VE 9.2（pve-docs version 9.2.13、2026-10-16 取得）。出典: https://pve.proxmox.com/pve-docs/

## ディレクトリ構成

```text
skills/proxmox-ve/
  SKILL.md
  references/
    core/
      README.md
      installation.md
      package-repositories.md
      firmware-updates.md
      cluster.md
      storage.md
      zfs.md
      lvm-btrfs.md
      vm-qemu.md
      container-lxc.md
      networking-sdn.md
      ceph.md
      ha.md
      backup-restore.md
      firewall.md
      user-access.md
      notifications.md
      node-management.md
      certificates.md
      host-bootloader.md
      storage-replication.md
      pmxcfs.md
      web-gui.md
    cli/
      README.md
      qm.md
      pct.md
      pvesm.md
      pvecm.md
      pveceph.md
      pvenode.md
      pveum.md
      pvesh.md
      vzdump.md
      pveam.md
      pvesr.md
      ha-manager.md
      misc-cli.md
    config/
      README.md
      qm-conf.md
      pct-conf.md
      datacenter-cfg.md
      cpu-models-conf.md
    api/
      README.md
      rest-overview.md
      endpoints-qemu.md
      endpoints-lxc.md
      endpoints-cluster.md
      endpoints-access-storage.md
    services/
      README.md
      daemons.md
  samples/
    README.md
    vm-lifecycle.md
    container-lifecycle.md
    cluster-setup.md
    backup-restore.md
    api-automation.md
  scripts/
    README.md
    install.md
    vm-commands.md
    container-commands.md
    cluster-commands.md
    storage-commands.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの README.md を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール・初期設定・ZFS/LVM ルート構成を知りたい | core | [references/core/README.md](references/core/README.md) |
| クラスター作成・ノード参加・Corosync 設定を知りたい | core | [references/core/README.md](references/core/README.md) |
| ストレージバックエンド (NFS/ZFS/RBD/iSCSI) を設定したい | core | [references/core/README.md](references/core/README.md) |
| KVM/QEMU 仮想マシンの作成・管理・マイグレーションを知りたい | core | [references/core/README.md](references/core/README.md) |
| LXC コンテナの作成・設定・スナップショットを知りたい | core | [references/core/README.md](references/core/README.md) |
| ネットワーク構成・SDN ゾーン・VNet を設定したい | core | [references/core/README.md](references/core/README.md) |
| Ceph クラスター (OSD/MON/MGR/プール) を構築したい | core | [references/core/README.md](references/core/README.md) |
| HA リソース・フェンシング・ウォッチドッグ・CRS 負荷分散・disarm を設定したい | core | [references/core/README.md](references/core/README.md) |
| パッケージリポジトリ (enterprise / no-subscription / test / Ceph)・アップデートを設定したい | core | [references/core/README.md](references/core/README.md) |
| ファームウェア・CPU マイクロコードを更新したい | core | [references/core/README.md](references/core/README.md) |
| ZFS プール管理 (RAIDZ / dRAID / ARC 制限 / 暗号化 / special device) を知りたい | core | [references/core/README.md](references/core/README.md) |
| ホストの LVM・BTRFS を管理したい | core | [references/core/README.md](references/core/README.md) |
| 時刻同期・外部メトリクスサーバー (Graphite / InfluxDB)・ディスクヘルス・一括操作・KSM を設定したい | core | [references/core/README.md](references/core/README.md) |
| 証明書・ACME (Let's Encrypt) を設定したい | core | [references/core/README.md](references/core/README.md) |
| ブートローダー・カーネル pin・Secure Boot を設定したい | core | [references/core/README.md](references/core/README.md) |
| ストレージレプリケーションの概念・ジョブ構成を知りたい | core | [references/core/README.md](references/core/README.md) |
| pmxcfs (/etc/pve レイアウト・復旧) を知りたい | core | [references/core/README.md](references/core/README.md) |
| Web GUI (タグ・同意バナー・My Settings) を使いたい | core | [references/core/README.md](references/core/README.md) |
| バックアップ・リストア・PBS 連携・保持設定を知りたい | core | [references/core/README.md](references/core/README.md) |
| ファイアウォールルール・セキュリティグループを設定したい | core | [references/core/README.md](references/core/README.md) |
| ユーザー・グループ・ロール・API トークン・2FA を管理したい | core | [references/core/README.md](references/core/README.md) |
| 通知ターゲット (SMTP/Gotify/webhook) を設定したい | core | [references/core/README.md](references/core/README.md) |
| qm コマンドのオプション・サブコマンドを調べたい | cli | [references/cli/README.md](references/cli/README.md) |
| pct コマンドの使い方を知りたい | cli | [references/cli/README.md](references/cli/README.md) |
| pvesm / pvecm / pveceph / pveum コマンドを調べたい | cli | [references/cli/README.md](references/cli/README.md) |
| pvesh で REST API を直接呼び出したい | cli | [references/cli/README.md](references/cli/README.md) |
| vzdump でバックアップ・スケジュールを組みたい | cli | [references/cli/README.md](references/cli/README.md) |
| pveam でテンプレートをダウンロード・管理したい | cli | [references/cli/README.md](references/cli/README.md) |
| pvesr でストレージレプリケーションを設定したい | cli | [references/cli/README.md](references/cli/README.md) |
| ha-manager のリソース監視・フェイルオーバーを知りたい | cli | [references/cli/README.md](references/cli/README.md) |
| VM 設定ファイル (qm.conf) の書式を知りたい | config | [references/config/README.md](references/config/README.md) |
| コンテナ設定ファイル (pct.conf) の書式を知りたい | config | [references/config/README.md](references/config/README.md) |
| データセンター設定 (datacenter.cfg) のパラメーターを知りたい | config | [references/config/README.md](references/config/README.md) |
| カスタム CPU モデル定義 (cpu-models.conf) を知りたい | config | [references/config/README.md](references/config/README.md) |
| REST API の認証・エンドポイント体系・pvesh の使い方を知りたい | api | [references/api/README.md](references/api/README.md) |
| QEMU/LXC の REST API エンドポイントを調べたい | api | [references/api/README.md](references/api/README.md) |
| クラスター・アクセス・ストレージ系 API を呼び出したい | api | [references/api/README.md](references/api/README.md) |
| バックグラウンドデーモン (pvedaemon/pveproxy/pvestatd/pmxcfs 等) の役割・ポートを調べたい | services | [references/services/README.md](references/services/README.md) |
| pveproxy → pvedaemon の通信フロー・内部ポートを知りたい | services | [references/services/README.md](references/services/README.md) |
| 使用ポート一覧・systemctl 操作を知りたい | services | [references/services/README.md](references/services/README.md) |
| 典型的な使い方・ワークフロー例を見たい | samples | [samples/README.md](samples/README.md) |
| インストール・VM・コンテナ・クラスター・ストレージの実行コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
