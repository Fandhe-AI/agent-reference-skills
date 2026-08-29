# RPM パッケージでのインストール

Source: https://lefthook.dev/installation/rpm

## インストール手順

CentOS / Fedora 等の RPM ベースのディストリビューションに Lefthook をインストールします。

### 1. リポジトリのセットアップ

```
# Run as one subshell: set -e stops at the first failure (a failed download is never executed as root),
# and the EXIT trap removes the temp file when the subshell ends, success or failure
(
  set -eu   # POSIX sh compatible (no pipes here); -e stops at the first failure, -u rejects unset variables
  setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.rpm.XXXXXX")"   # exclusive temp file: never overwrites an existing file
  trap 'rm -f -- "${setup}"' EXIT
  curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.rpm.sh' -o "${setup}"   # download first; do not pipe curl into sudo bash
  cat "${setup}"                                                        # review before running with root privileges (cat needs no extra package)
  sudo -E bash "${setup}"
)
```

### 2. パッケージのインストール

```
sudo yum install lefthook
```

## 補足情報

RPM パッケージは Cloudsmith のオープンソースリポジトリサービスでホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#repository-setup-yum) を参照してください。
