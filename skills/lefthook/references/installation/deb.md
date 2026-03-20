# deb パッケージでのインストール

Source: https://lefthook.dev/installation/deb

## インストール手順

Debian / Ubuntu 系ディストリビューションで APT パッケージを使用して Lefthook をインストールします。

### 1. リポジトリのセットアップ

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' | sudo -E bash
```

### 2. パッケージのインストール

```bash
sudo apt install lefthook
```

## 補足情報

パッケージリポジトリは Cloudsmith でホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#formats-deb) を参照してください。
