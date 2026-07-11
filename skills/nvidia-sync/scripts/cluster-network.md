# cluster-network

ConnectX-7 クラスタネットワークの検証・netplan 設定の確認/削除、および複数ノード間でのユーザー情報統一に使うコマンド集。すべてクラスタの各ノード（DGX Spark 等）上で実行する。

## Netplan 設定ファイルの確認

```bash
sudo ls /etc/netplan/99-nvidia-sync-cluster.yaml
sudo cat /etc/netplan/99-nvidia-sync-cluster.yaml
```

各クラスタノード上で実行する。NVIDIA Sync が生成した ConnectX-7 用 netplan 設定ファイルの存在確認と内容表示。

## ネットワークランタイム状態の検査

```bash
ip -br link
ip -br addr
```

各クラスタノード上で実行する。アクティブなネットワークインターフェースと、割り当てられている IP アドレスを確認する。

## ノード間の疎通確認

```bash
ping -c 3 <peer-cluster-ip>
```

各クラスタノード上で実行する。`<peer-cluster-ip>` は疎通確認対象ノードの実際のクラスタ IP アドレスに置き換える。

## Netplan 設定の無効化・削除

> **警告**: `/etc/netplan/99-nvidia-sync-cluster.yaml` を移動すると ConnectX-7 クラスタネットワーク設定が無効化される。設定を戻したい場合は移動先のファイルを元のパスに戻す必要がある。

```bash
sudo mkdir -p /root/netplan-disabled
sudo mv /etc/netplan/99-nvidia-sync-cluster.yaml /root/netplan-disabled/
sudo netplan generate
sudo netplan try
ip -br addr
```

設定を削除する対象のノード上で実行する。ファイルを退避後、`netplan generate` で設定を再生成し、`netplan try` で適用（確認プロンプトが表示される）、最後に `ip -br addr` で結果を確認する。

## 複数ノード間でのユーザー情報統一（Ubuntu 24.04）

UID/GID が既に使用されているか確認する。

```bash
getent passwd <uid>
getent group <gid>
```

各ノード上で実行する。`<uid>` / `<gid>` は確認したい ID に置き換える。

指定した GID でグループを作成する。

```bash
sudo groupadd --gid <gid> <group-name>
```

各ノード上で実行する。

指定した UID・プライマリ GID でユーザーを作成する。

```bash
sudo adduser --uid <uid> --gid <gid> <username>
```

各ノード上で実行する。

管理者権限が必要な場合、sudo グループに追加する。

```bash
sudo usermod -aG sudo <username>
```

各ノード上で実行する。
