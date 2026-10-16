---
name: nvidia-sync
description: >
  NVIDIA Sync デスクトップアプリのリファレンス。DGX Spark, DGX Station,
  汎用 SSH Linux ホストのリモート接続管理。mDNS 自動検出, 手動 IP,
  SSH config インポート, Tailscale, 自動ネットワーク切替。
  Cluster Assistant, ConnectX-7 クラスタトポロジ, netplan 検証。
  Resource Monitor (CPU / GPU / memory utilization), release notes。
  VS Code, Cursor, NVIDIA AI Workbench 起動, カスタムアプリ, ポートフォワード, SSH トンネル。
user-invocable: false
---

# nvidia-sync

Target: NVIDIA Sync 0.117.3-9 (docs.nvidia.com/sync/latest, last updated 2026-09-02, fetched 2026-10-17)

## ディレクトリ構成

```text
skills/nvidia-sync/
  SKILL.md
  references/
    getting-started/
      README.md
      overview.md
      terminology.md
      limitations.md
      release-notes.md
    connections/
      README.md
      direct-connections.md
      tailscale-connections.md
    cluster/
      README.md
      cluster-assistant.md
      connectx7-verification.md
    applications/
      README.md
      applications.md
      custom-applications.md
    monitoring/
      README.md
      resource-monitor.md
  scripts/
    README.md
    cluster-network.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（または `scripts/README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| NVIDIA Sync とは何か・対応デバイス・インストール手順を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Device / Connection / Cluster 等の用語を確認したい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| bastion/jump server 等の未対応構成を確認したい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| mDNS 自動検出・手動 IP・SSH config インポートでデバイスを追加したい | connections | [references/connections/README.md](references/connections/README.md) |
| Tailscale 連携・認証キー発行・自動ネットワーク切替を設定したい | connections | [references/connections/README.md](references/connections/README.md) |
| リリースノート (バージョン別の新機能・修正) や現行バージョンを確認したい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| ConnectX-7 クラスタの構成ウィザード・トポロジ上限 (direct 2-3 台、switch 2-4 台)・184 Gbit/s リンク速度テスト・デバイス間 SSH エイリアス・クラスタ削除を知りたい | cluster | [references/cluster/README.md](references/cluster/README.md) |
| netplan 設定 (`99-nvidia-sync-cluster.yaml`) の確認・検証・削除をしたい | cluster | [references/cluster/README.md](references/cluster/README.md) |
| VS Code / Cursor / AI Workbench / SSH ターミナルを起動したい | applications | [references/applications/README.md](references/applications/README.md) |
| カスタムアプリ登録・ポートフォワード・SSH トンネルを設定したい | applications | [references/applications/README.md](references/applications/README.md) |
| Resource Monitor で単一デバイス・クラスタの CPU / メモリ / GPU 使用率を確認したい | monitoring | [references/monitoring/README.md](references/monitoring/README.md) |
| クラスタネットワークの検証コマンド・運用コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
