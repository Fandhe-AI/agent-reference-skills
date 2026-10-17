---
source: https://docs.docker.com/reference/cli/docker/system/prune/
---

# Cleanup Prune

未使用のコンテナ・イメージ・ボリューム・ネットワーク・ビルドキャッシュの確認と削除コマンド集。出典は `docker system df` / `system prune` / `container prune` / `image prune` / `volume prune` / `network prune` / `buildx prune` の CLI リファレンス Examples（取得日 2026-10-16 JST、docker/cli v29.8.2 / buildx v0.38.0 相当）。

> **警告**: 本ファイルの prune 系コマンドはいずれも不可逆の削除を行う。削除前に `docker system df` で対象を確認し、使い捨ての検証環境で挙動を確かめてから実行すること。`-f` / `--force` は確認プロンプトを省略するため、スクリプトや CI 以外では付けない。

## ディスク使用量の確認

```sh
docker system df
```

```sh
docker system df -v
```

`-v` で詳細（イメージ別の `SHARED SIZE` / `UNIQUE SIZE` 等）を表示する。ネットワークはディスクを消費しないため表示されない。

## 未使用データの一括削除

> **警告**: 停止中のコンテナ、未使用ネットワーク、dangling イメージ、未使用のビルドキャッシュを削除する。ビルドキャッシュは常に対象（`RUN --mount=type=cache` のキャッシュマウントを含む）。

```sh
docker system prune
```

原文の確認プロンプトは `WARNING! This will remove: all stopped containers / all networks not used by at least one container / all dangling images / unused build cache`。ボリュームは既定で削除されない。

## 未使用イメージとボリュームを含む一括削除

> **警告**: `-a` は少なくとも 1 つのコンテナに紐づかないすべてのイメージとビルドキャッシュ全体を削除し、`--volumes` は少なくとも 1 つのコンテナに使われていない匿名ボリュームを削除する。ボリューム内のデータは復元できない。

```sh
docker system prune -a --volumes
```

## フィルタ付き一括削除

> **警告**: フィルタに一致する対象が不可逆で削除される。

```sh
docker system prune --filter "label=foo" --filter "until=24h"
```

異なるキーのフィルタは AND、同一キーは OR で結合される。`until` は Unix タイムスタンプ・日付形式・Go の duration（例: `10m`、`1h30m`）で、デーモンのマシン時刻基準。

## 停止中コンテナの削除

> **警告**: すべての停止中コンテナを削除する。

```sh
docker container prune
```

```sh
docker container prune --force --filter "until=5m"
```

```sh
docker container prune --force --filter "until=2017-01-04T13:10:00"
```

2 つ目は 5 分より前に作成されたコンテナ、3 つ目は指定日時より前に作成されたコンテナのみ削除する（原文の例）。

## 未使用イメージの削除

> **警告**: 既定では dangling イメージを削除する。`-a` はコンテナから参照されないすべてのイメージを削除する。確認プロンプトは一覧を表示せず、否定フィルタ（`label!=`）は `docker image ls` で対象を予測できない。

```sh
docker image prune -a
```

```sh
docker image prune -a --force --filter "until=240h"
```

```sh
docker image prune --filter="label=deprecated"
```

```sh
docker image prune --filter="label=maintainer=john"
```

```sh
docker image prune --filter="label!=maintainer"
```

```sh
docker image prune --filter="label!=maintainer=john"
```

`until=240h` は 10 日より前に作成されたイメージが対象。肯定フィルタの対象は同じ構文の `docker image ls` で事前確認できる。

## 未使用ボリュームの削除

> **警告**: ボリューム内のデータは復元できない。既定では匿名ボリュームのみ削除し、`-a`（API 1.42+）は未使用の名前付きボリュームも削除する。

```sh
docker volume prune
```

```sh
docker volume prune --all
```

`--filter` は `label=<key>` / `label!=<key>` 形式（原文）。

## 未使用ネットワークの削除

> **警告**: コンテナから参照されないユーザー定義ネットワークを削除する。`bridge` / `host` / `none` の既定ネットワークは削除されない。

```sh
docker network prune
```

```sh
docker network prune --force --filter until=5m
```

## ビルドキャッシュの削除 (buildx)

> **警告**: 選択中の builder のビルドキャッシュを削除する。キャッシュを失うと次回ビルドが遅くなる。

```sh
docker buildx prune --filter "until=24h"
docker buildx prune --filter "description~=golang"
docker buildx prune --filter "parents=dpetmoi6n0yqanxjqrbnofz9n;kgoj0q6g57i35gdyrv546alz7"
docker buildx prune --filter "type=source.local"
docker buildx prune --filter "type!=exec.cachemount"
```

複数の `--filter` は AND で結合される。`--max-used-space` / `--min-free-space` / `--reserved-space` は容量基準で最近最も使われていないレコードから削除する（値は `128mb` / `2gb` 等、大文字小文字非区別）。`--all` で内部 helper イメージと `#syntax=` / `BUILDKIT_SYNTAX` のフロントエンドイメージも対象になる。
