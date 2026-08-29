# deb パッケージでのインストール

Source: https://lefthook.dev/installation/deb

## インストール手順

Debian / Ubuntu 系ディストリビューションで APT パッケージを使用して Lefthook をインストールします。

### 1. リポジトリのセットアップ

```bash
setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.deb.XXXXXX")"   # exclusive temp file: never overwrites an existing file
trap 'rm -f -- "${setup}"' EXIT                                      # clean up even if a step fails
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' -o "${setup}"   # download first; do not pipe curl into sudo bash
less "${setup}"                                                       # review before running with root privileges
sudo -E bash "${setup}"
```

### 2. パッケージのインストール

```bash
sudo apt install lefthook
```

## 補足情報

パッケージリポジトリは Cloudsmith でホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#formats-deb) を参照してください。
