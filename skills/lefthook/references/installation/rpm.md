# RPM パッケージでのインストール

Source: https://lefthook.dev/installation/rpm

## インストール手順

CentOS / Fedora 等の RPM ベースのディストリビューションに Lefthook をインストールします。

### 1. リポジトリのセットアップ

```
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.rpm.sh' -o lefthook-setup.rpm.sh   # download first; do not pipe curl into sudo bash
less lefthook-setup.rpm.sh                                  # review before running with root privileges
sudo -E bash lefthook-setup.rpm.sh
```

### 2. パッケージのインストール

```
sudo yum install lefthook
```

## 補足情報

RPM パッケージは Cloudsmith のオープンソースリポジトリサービスでホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#repository-setup-yum) を参照してください。
