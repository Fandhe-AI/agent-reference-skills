---
source: https://docs.docker.com/reference/cli/docker/container/run/
---

# CLI Cheatsheet

`docker` CLI の日常操作コマンド集（コンテナ実行・確認・イメージ操作・ネットワーク・ボリューム）。出典は各 CLI リファレンス（`container/{run,ls,logs,exec,start,stop,restart,kill,rm,cp}` / `image/{ls,pull,tag,push,save,load,rm}` / `login` / `search` / `network/create` / `volume/{create,ls,rm}`）の Examples（取得日 2026-10-16 JST、docker/cli v29.8.2 相当）。

> **警告**: 本ファイルのコマンドはコンテナ・イメージ・ボリュームの作成や削除を行う。使い捨ての検証環境で実行し、本番ホストや重要なデータのあるボリュームには使わないこと。一括削除は `cleanup-prune.md` を参照。

## コンテナの起動

```sh
docker run --name test -d nginx:alpine
```

```sh
docker run -t -i --rm ubuntu bash
```

```sh
docker run -p 127.0.0.1:80:8080/tcp nginx:alpine
```

```sh
docker run -P nginx:alpine
```

`-d` はバックグラウンド実行、`--rm` は終了時にコンテナを自動削除、`-p` はポート公開、`-P` は EXPOSE されたポートをランダムに公開する。

## 環境変数・ボリューム・ネットワークの指定

```sh
docker run -e MYVAR1 --env MYVAR2=foo --env-file ./env.list ubuntu bash
```

```sh
docker run --read-only --mount type=volume,target=/icanwrite busybox touch /icanwrite/here
```

```sh
docker run -t -i --mount type=bind,src=/data,dst=/data busybox sh
```

```sh
docker run -itd --network=my-net busybox
```

```sh
docker run --restart=on-failure:10 redis
```

`--restart` のポリシーの詳細（`always` 等）は原文の Restart policies 節を参照。

## コンテナの一覧とフィルタ

```sh
docker ps
docker ps -a
docker ps --size
docker ps --filter "name=nostalgic"
docker ps --filter status=running
docker ps --filter "label=color=blue"
docker ps --filter ancestor=ubuntu
docker ps -a --filter 'exited=0'
```

`-a` は停止中を含む。

## ログ・コンテナ内での実行・ファイルコピー

```sh
docker logs -f --until=2s test
```

```sh
docker exec -it mycontainer sh
docker exec -d mycontainer touch /tmp/execWorks
docker exec -e VAR_A=1 -e VAR_B=2 mycontainer env
docker exec -it -w /root mycontainer pwd
```

```sh
docker cp ./some_file CONTAINER:/work
docker cp CONTAINER:/var/logs/ /tmp/app_logs
```

`CONTAINER` はコンテナ名または ID に置き換える。

## コンテナのライフサイクル

```sh
docker start my_container
docker stop my_container
docker restart my_container
```

> **警告**: `docker kill` はコンテナのメインプロセスへ即座にシグナルを送る。データ保存が必要なアプリでは `docker stop` を優先すること。

```sh
docker kill my_container
docker kill --signal=SIGHUP my_container
```

## コンテナの削除

> **警告**: コンテナの削除は不可逆。`--force` は実行中のコンテナのメインプロセスへ SIGKILL を送って削除し、`-v` / `--volumes` は関連する匿名ボリュームも削除する。

```sh
docker rm --force redis
docker rm --volumes redis
docker rm $(docker ps --filter status=exited -q)
```

名前付きボリュームは `-v` では削除されない（原文の例: `docker create -v awesome:/foo -v /bar --name hello redis` の後に `docker rm -v hello` を実行すると `/foo` は残り `/bar` のみ削除される）。

## イメージの取得・一覧・タグ付け

```sh
docker image pull debian
docker image pull debian:bookworm
docker pull ubuntu:24.04
docker image pull --all-tags ubuntu
```

```sh
docker images
docker images --filter "dangling=true"
docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
```

```sh
docker tag httpd fedora/httpd:version1.0
docker image tag rhel-httpd:latest registry-host:5000/myadmin/rhel-httpd:latest
```

## レジストリへのログインと push

> **警告**: `docker push` は外部レジストリへイメージを公開する。検証用レジストリで試し、認証情報はコマンドラインや履歴に残さないこと。

```sh
docker login
docker login registry.example.com
docker login -u moby
```

```sh
docker image push registry-host:5000/myadmin/rhel-httpd:latest
docker image push --all-tags registry-host:5000/myname/myimage
```

## イメージの検索

```sh
docker search busybox
docker search --filter=stars=3 --no-trunc busybox
docker search --filter is-official=true --filter stars=3 busybox
docker search --format "{{.Name}}: {{.StarCount}}" nginx
```

## イメージのエクスポートとインポート

```sh
docker save busybox > busybox.tar
docker save --output busybox.tar busybox
docker save myimage:latest | gzip > myimage_latest.tar.gz
```

```sh
docker load < busybox.tar.gz
docker load --input fedora.tar
```

## イメージの削除

> **警告**: イメージの削除は不可逆。`-f` はタグが複数ある ID を指定した場合に一致するすべてのイメージを untag して削除する。

```sh
docker rmi test1:latest
docker rmi -f fd484f19954f
docker image rm --platform linux/amd64 --platform linux/ppc64le myimage
docker rmi $(docker images -f "dangling=true" -q)
```

タグが複数ある ID を `-f` なしで指定すると競合エラーになる。`--platform`（API 1.50+）は特定プラットフォームのみを削除し、`--force` が必要（省略すると警告されて削除は中止される）。

## ネットワークの作成

```sh
docker network create -d bridge my-bridge-network
```

```sh
docker network create --driver=bridge --subnet=192.168.0.0/16 br0
```

## ボリュームの作成・一覧・削除

```sh
docker volume create hello
docker volume create rosemary
docker volume ls
docker volume ls -f dangling=true
docker volume ls --filter label=is-timelord=yes
docker volume ls --format "{{.Name}}: {{.Driver}}"
```

> **警告**: ボリュームの削除は不可逆で、中のデータは復元できない。

```sh
docker volume rm hello
```
