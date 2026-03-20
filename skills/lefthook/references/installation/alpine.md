# Alpine Linux でのインストール

Source: https://lefthook.dev/installation/alpine

## インストール手順

Alpine Linux で APK パッケージを使用して Lefthook をインストールします。

### 1. 前提パッケージのインストール

```bash
sudo apk add --no-cache bash curl
```

### 2. リポジトリのセットアップ

```bash
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.alpine.sh' | sudo -E bash
```

### 3. パッケージのインストール

```bash
sudo apk add lefthook
```

## 補足情報

パッケージリポジトリは Cloudsmith でホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#formats-alpine) を参照してください。
