---
source: https://docs.docker.com/engine/install/
---

# Install Engine

Linux への Docker Engine インストール手順の案内（apt / dnf リポジトリ、docker グループ、systemd 有効化）。出典は `https://docs.docker.com/engine/install/{ubuntu,debian,fedora,rhel,centos,raspberry-pi-os,binaries,linux-postinstall}/`（取得日 2026-10-16 JST）。Docker Desktop のインストールは収録しない。

Adapted: steps that need `sudo` (package install, repository setup, systemd, uninstall) are described in prose with links to the official pages instead of copy-paste commands.

> **警告**: インストール手順は root 権限でパッケージ・リポジトリ・systemd 設定を変更する。本番ホストへ流用せず、使い捨ての検証環境（VM 等）で実行してから適用すること。

## 前提条件

root 権限（または管理者が許可した sudo 権限）が必要。各ディストリビューションの要件は次の公式ページに従う。

| 対象 | 公式ページ |
| --- | --- |
| Ubuntu | https://docs.docker.com/engine/install/ubuntu/ |
| Debian | https://docs.docker.com/engine/install/debian/ |
| Fedora | https://docs.docker.com/engine/install/fedora/ |
| RHEL | https://docs.docker.com/engine/install/rhel/ |
| CentOS | https://docs.docker.com/engine/install/centos/ |
| Raspberry Pi OS (32-bit) | https://docs.docker.com/engine/install/raspberry-pi-os/ |
| 静的バイナリ | https://docs.docker.com/engine/install/binaries/ |
| インストール後の設定 | https://docs.docker.com/engine/install/linux-postinstall/ |

## 競合パッケージの削除とリポジトリ設定

Ubuntu / Debian / Raspberry Pi OS は apt、Fedora / RHEL / CentOS は dnf で Docker の公式リポジトリを設定し、`docker-ce` `docker-ce-cli` `containerd.io` `docker-buildx-plugin` `docker-compose-plugin` をインストールする。手順（GPG キーの登録、リポジトリ定義、競合パッケージの削除）は上表の各公式ページの Install 節を参照する。

> **警告**: 競合パッケージの削除は既存の Docker 関連パッケージを取り除く。`/var/lib/docker/` のデータは自動削除されない。

Fedora で GPG キーの確認を求められたら、フィンガープリントが `060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35` と一致することを確認して承認する（原文）。インストールのみでは起動せず、`docker` グループは作成されるがユーザーは追加されない。

## 利用可能なバージョンの一覧

特定バージョンを指定してインストールする場合、事前に一覧を確認する。

```sh
apt list --all-versions docker-ce
```

```sh
dnf list docker-ce --showduplicates | sort -r
```

Raspberry Pi OS では `apt-cache madison docker-ce | awk '{ print $3 }'` を使う（原文）。選んだ値を `docker-ce=<VERSION_STRING>` 等の形式でインストール手順に渡す。

## 動作確認

```sh
systemctl status docker
```

```sh
docker version
```

```sh
docker run hello-world
```

`docker` グループに未所属のユーザーは、root 権限で `docker run hello-world` を実行する必要がある。Docker が動いていない場合の起動は、Ubuntu / Debian 系は `systemctl start docker`、dnf 系は `systemctl enable --now docker`（いずれも root 権限）。Fedora で `journalctl -u docker` に `failed to find iptables` が出る場合の対処は Fedora の公式ページを参照する。

## convenience script によるインストール

> **警告**: 原文は「開発・テスト環境向けで本番環境には非推奨」と明記している。スクリプトは root 権限で実行され、依存パッケージを確認なしに大量にインストールすることがあり、既存インストールのアップグレード用ではない。インターネットから取得したスクリプトは実行前に必ず内容を確認し、使い捨ての検証環境でのみ実行すること。

まずスクリプトをダウンロードし、内容を確認する（実行はしない）。

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
```

```sh
less get-docker.sh
```

内容を確認したうえで、root 権限で `--dry-run` を付けて実行ステップを事前確認し、問題なければ本実行する（原文の手順）。Debian 系では docker サービスが自動起動し、RPM 系（CentOS / Fedora / RHEL）では手動起動する。事前リリース版（test チャネル、beta / RC を含む）は `https://test.docker.com` の同様のスクリプトで、評価用の使い捨て環境でのみ使う。

## 静的バイナリのインストール

> **警告**: 原文は「主にテスト用途で、本番環境には非推奨（自動セキュリティ更新が無い静的リンクバイナリ）」と明記している。使い捨ての検証環境でのみ実行すること。

`.tgz` は `https://download.docker.com/linux/static/stable/` から取得する。展開は次のコマンド。

```sh
tar xzvf /path/to/<FILE>.tar.gz
```

展開後のバイナリの配置（`/usr/bin/` など）と `dockerd` の起動は root 権限が必要なため、https://docs.docker.com/engine/install/binaries/ を参照する。起動オプションは `/etc/docker/daemon.json` でも指定できる。

## docker グループへのユーザー追加

> **警告**: `docker` グループは root 相当の権限をユーザーに与える（原文の警告）。権限を与えてよい環境でのみ実行すること。root 権限なしで動かす場合は rootless mode を使う。

グループの作成とユーザー追加は root 権限が必要なため、https://docs.docker.com/engine/install/linux-postinstall/ の Manage Docker as a non-root user 節を参照する。反映にはログアウト / ログインが必要（仮想マシンでは再起動が必要な場合がある）。反映後は次で確認する。

```sh
docker run hello-world
```

## 起動時の自動起動設定 (systemd)

`docker.service` と `containerd.service` の有効化・無効化は root 権限の `systemctl enable` / `systemctl disable` で行う。詳細は linux-postinstall の Configure Docker to start on boot 節を参照する。Debian / Ubuntu では既定で起動時に自動起動する。

## Docker Engine のアンインストール

> **警告**: 不可逆。イメージ・コンテナ・ボリュームは `/var/lib/docker` と `/var/lib/containerd` に残り、これらを削除するとすべて失われる。使い捨て環境以外では実行しないこと。

パッケージの削除（Ubuntu / Debian は `apt purge`、Fedora / RHEL / CentOS は `dnf remove`）とデータの削除手順は、各公式ページの Uninstall Docker Engine 節を参照する。Raspberry Pi OS では `apt-get purge` を使う（原文）。編集済みの設定ファイルは手動で削除する。
