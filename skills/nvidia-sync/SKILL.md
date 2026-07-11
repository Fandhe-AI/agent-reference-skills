---
name: nvidia-sync
description: >
  NVIDIA Sync デスクトップアプリのリファレンス。DGX Spark, DGX Station,
  汎用 SSH Linux ホストへのリモート接続管理。mDNS 自動検出, 手動 IP 登録,
  SSH config インポート, Tailscale 連携, 自動ネットワーク切替。
  Cluster Assistant, ConnectX-7 クラスタトポロジ, netplan 設定検証。
  VS Code, Cursor, VS Code Insiders, NVIDIA AI Workbench 起動,
  カスタムアプリ登録, ポートフォワード, SSH トンネル。
user-invocable: false
---

# nvidia-sync

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
| ConnectX-7 クラスタの構成ウィザード・トポロジ・ケーブル要件を知りたい | cluster | [references/cluster/README.md](references/cluster/README.md) |
| netplan 設定 (`99-nvidia-sync-cluster.yaml`) の確認・検証・削除をしたい | cluster | [references/cluster/README.md](references/cluster/README.md) |
| VS Code / Cursor / AI Workbench / SSH ターミナルを起動したい | applications | [references/applications/README.md](references/applications/README.md) |
| カスタムアプリ登録・ポートフォワード・SSH トンネルを設定したい | applications | [references/applications/README.md](references/applications/README.md) |
| クラスタネットワークの検証コマンド・運用コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
