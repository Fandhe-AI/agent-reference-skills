# deb パッケージでのインストール

Source: https://lefthook.dev/installation/deb

## インストール手順

Debian / Ubuntu 系ディストリビューションで APT パッケージを使用して Lefthook をインストールします。

### 1. リポジトリのセットアップ

```bash
# Run as one subshell: set -e stops at the first failure (a failed download is never executed as root),
# and the EXIT trap removes the temp file when the subshell ends, success or failure
(
  set -eu   # POSIX sh compatible (no pipes here); -e stops at the first failure, -u rejects unset variables
  setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.deb.XXXXXX")"   # exclusive temp file: never overwrites an existing file
  trap 'rm -f -- "${setup}"' EXIT
  curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' -o "${setup}"   # download first; do not pipe curl into sudo bash
  cat "${setup}"                                                        # review before running with root privileges (cat needs no extra package)
  sudo -E bash "${setup}"
)
```

### 2. パッケージのインストール

```bash
sudo apt install lefthook
```

## 補足情報

パッケージリポジトリは Cloudsmith でホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#formats-deb) を参照してください。
