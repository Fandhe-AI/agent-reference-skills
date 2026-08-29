# RPM パッケージでのインストール

Source: https://lefthook.dev/installation/rpm

## インストール手順

CentOS / Fedora 等の RPM ベースのディストリビューションに Lefthook をインストールします。

### 1. リポジトリのセットアップ

```
setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.rpm.XXXXXX")"   # exclusive temp file: never overwrites an existing file
trap 'rm -f -- "${setup}"' EXIT                                      # clean up even if a step fails
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.rpm.sh' -o "${setup}"   # download first; do not pipe curl into sudo bash
cat "${setup}"                                                        # review before running with root privileges (cat needs no extra package)
sudo -E bash "${setup}"
```

### 2. パッケージのインストール

```
sudo yum install lefthook
```

## 補足情報

RPM パッケージは Cloudsmith のオープンソースリポジトリサービスでホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#repository-setup-yum) を参照してください。
