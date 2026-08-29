# RPM パッケージでのインストール

Source: https://lefthook.dev/installation/rpm

## インストール手順

CentOS / Fedora 等の RPM ベースのディストリビューションに Lefthook をインストールします。

### 1. リポジトリのセットアップ

```
# Step 1 - download to an exclusive temp file and print it for review. Nothing is executed here;
# if any step fails the temp file is removed and the chain stops.
setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.rpm.XXXXXX")" \
  && curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.rpm.sh' -o "${setup}" \
  && cat "${setup}" \
  || { rm -f -- "${setup:-}"; echo "download failed; nothing was executed" >&2; }

# Step 2 - only after you have read the script above and decided to proceed, run it as root yourself:
sudo -E bash "${setup}"; rm -f -- "${setup}"
```

### 2. パッケージのインストール

```
sudo yum install lefthook
```

## 補足情報

RPM パッケージは Cloudsmith のオープンソースリポジトリサービスでホストされています。詳細な設定手順については [Cloudsmith のリポジトリ設定ページ](https://cloudsmith.io/~evilmartians/repos/lefthook/setup/#repository-setup-yum) を参照してください。
