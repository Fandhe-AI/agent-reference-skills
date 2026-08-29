# deb パッケージでのインストール

Source: https://lefthook.dev/installation/deb

## インストール手順

Debian / Ubuntu 系ディストリビューションで APT パッケージを使用して Lefthook をインストールします。

### 1. リポジトリのセットアップ

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' -o lefthook-setup.deb.sh   # download first; do not pipe curl into sudo bash
less lefthook-setup.deb.sh                                  # review before running with root privileges
sudo -E bash lefthook-setup.deb.sh
```

### 2. パッケージのインストール

```bash
sudo apt install lefthook
```

## 補足情報

パッケージリポジトリは Cloudsmith でホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#formats-deb) を参照してください。
