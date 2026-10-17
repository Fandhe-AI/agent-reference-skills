---
source: https://docs.docker.com/compose/install/linux/
---

# Install Compose

Docker Compose の Linux 向けインストール手順（plugin / standalone）。出典は `https://docs.docker.com/compose/install/{linux,standalone}/`（取得日 2026-10-16 JST、原文の Compose バージョンは v5.6.0）。

> **警告**: システム全体へのインストールは root 権限でパッケージやバイナリを配置する。使い捨ての検証環境で実行してから適用すること。Docker Desktop のインストールは収録しない。

## リポジトリ経由での plugin インストール

Docker の apt / dnf リポジトリを先に設定しておく（`install-engine.md` を参照）。`docker-compose-plugin` を apt（Ubuntu / Debian）または yum（RPM 系）でインストールする。root 権限が必要なため、手順は公式 https://docs.docker.com/compose/install/linux/ を参照する。Docker Engine と Docker CLI が導入済みである前提。更新も同じ手順で行う。

## インストール確認

```sh
docker compose version
```

## plugin の手動インストール (現在のユーザーのみ)

> **警告**: 原文によると手動インストールは自動更新されない。保守性のためにはリポジトリ経由を使うこと。

```sh
DOCKER_CONFIG="${DOCKER_CONFIG:-${HOME}/.docker}"
mkdir -p "${DOCKER_CONFIG}/cli-plugins"
curl -SL https://github.com/docker/compose/releases/download/v5.6.0/docker-compose-linux-x86_64 -o "${DOCKER_CONFIG}/cli-plugins/docker-compose"
```

```sh
chmod +x "${DOCKER_CONFIG}/cli-plugins/docker-compose"
```

アクティブユーザーの `$HOME` 配下へのインストール。別バージョンは `v5.6.0` を差し替え、別アーキテクチャは `x86_64` を差し替える（原文）。全ユーザー向けにする場合のインストール先は `/usr/local/lib/docker/cli-plugins` で、配置と実行権限の付与に root 権限が必要なため公式 https://docs.docker.com/compose/install/linux/ を参照する。

## standalone のインストール (Linux, レガシー)

> **警告**: 原文はこの方法を非推奨とし、後方互換のためだけにサポートされると明記している。Docker Desktop または Compose plugin を使えない場合にのみ使う。コマンドは `docker compose` ではなく `docker-compose` になる。

インストール先は `/usr/local/bin/docker-compose` で、実行権限の付与を含め root 権限が必要。手順は公式 https://docs.docker.com/compose/install/standalone/ を参照する。インストール後に `docker-compose` が失敗する場合は PATH を確認する（原文は `/usr/bin/docker-compose` へのシンボリックリンク作成を例示している）。

```sh
docker-compose version
```

## Notes

Adapted: commands that need `sudo` (package install, system-wide plugin/standalone placement, symlink) are described in prose with links to the official pages; the per-user manual install keeps the original commands with `DOCKER_CONFIG` quoted as `"${DOCKER_CONFIG}"`.
