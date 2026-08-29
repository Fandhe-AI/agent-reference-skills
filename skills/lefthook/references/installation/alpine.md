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
# Run as one subshell: set -e stops at the first failure (a failed download is never executed as root),
# and the EXIT trap removes the temp file when the subshell ends, success or failure
(
  set -eu   # POSIX sh compatible (no pipes here); -e stops at the first failure, -u rejects unset variables
  setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.alpine.XXXXXX")"   # exclusive temp file: never overwrites an existing file
  trap 'rm -f -- "${setup}"' EXIT
  curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.alpine.sh' -o "${setup}"   # download first; do not pipe curl into sudo bash
  cat "${setup}"                                                        # review before running with root privileges (cat needs no extra package)
  sudo -E bash "${setup}"
)
```

### 3. パッケージのインストール

```bash
sudo apk add lefthook
```

## 補足情報

パッケージリポジトリは Cloudsmith でホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#formats-alpine) を参照してください。
