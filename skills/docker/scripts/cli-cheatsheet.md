---
source: https://docs.docker.com/reference/cli/docker/container/run/
---

# CLI Cheatsheet

Everyday `docker` CLI commands (running containers, inspecting, image operations, networks, volumes). Source: the Examples in the CLI references (`container/{run,ls,logs,exec,start,stop,restart,kill,rm,cp}` / `image/{ls,pull,tag,push,save,load,rm}` / `login` / `search` / `network/create` / `volume/{create,ls,rm}`) (retrieved 2026-10-16 JST, equivalent to docker/cli v29.8.2).

> **Warning**: The commands in this file create or delete containers, images, and volumes. Run them in a disposable verification environment, and do not use them on production hosts or on volumes holding important data. For bulk deletion, see `cleanup-prune.md`.

## Start a container

```sh
docker run --name test -d nginx:alpine
```

```sh
docker run -t -i --rm ubuntu bash
```

```sh
docker run -p 127.0.0.1:8080:80/tcp nginx:alpine
```

```sh
docker run -P nginx:alpine
```

`-d` runs in the background, `--rm` removes the container automatically on exit, `-p` publishes a port, and `-P` publishes EXPOSEd ports randomly.

Adapted: the official example maps `127.0.0.1:80:8080/tcp`, but nginx:alpine listens on container port 80, so host 8080 → container 80 is used here.

## Specify environment variables, volumes, and networks

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

For details of `--restart` policies (such as `always`), see the Restart policies section of the original.

## List and filter containers

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

`-a` includes stopped containers.

## Logs, running commands in a container, and copying files

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

Replace `CONTAINER` with the container name or ID.

## Container lifecycle

```sh
docker start my_container
docker stop my_container
docker restart my_container
```

> **Warning**: `docker kill` immediately sends a signal to the container's main process. Prefer `docker stop` for applications that need to save data.

```sh
docker kill my_container
docker kill --signal=SIGHUP my_container
```

## Remove containers

> **Warning**: Removing a container is irreversible. `--force` sends SIGKILL to the main process of a running container and removes it, and `-v` / `--volumes` also removes the associated anonymous volumes.

```sh
docker rm --force redis
docker rm --volumes redis
docker rm $(docker ps --filter status=exited -q)
```

Named volumes are not removed by `-v` (example from the original: after `docker create -v awesome:/foo -v /bar --name hello redis`, running `docker rm -v hello` keeps `/foo` and removes only `/bar`).

## Pull, list, and tag images

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

## Log in to a registry and push

> **Warning**: `docker push` publishes an image to an external registry. Try it against a test registry, and do not leave credentials on the command line or in shell history.

```sh
docker login
docker login registry.example.com
docker login -u moby
```

```sh
docker image push registry-host:5000/myadmin/rhel-httpd:latest
docker image push --all-tags registry-host:5000/myname/myimage
```

## Search images

```sh
docker search busybox
docker search --filter=stars=3 --no-trunc busybox
docker search --filter is-official=true --filter stars=3 busybox
docker search --format "{{.Name}}: {{.StarCount}}" nginx
```

## Export and import images

```sh
docker save busybox > busybox.tar
docker save --output busybox.tar busybox
docker save myimage:latest | gzip > myimage_latest.tar.gz
```

```sh
docker load < busybox.tar.gz
docker load --input fedora.tar
```

## Remove images

> **Warning**: Removing an image is irreversible. When an ID with multiple tags is given, `-f` untags and removes all matching images.

```sh
docker rmi test1:latest
docker rmi -f fd484f19954f
docker image rm --platform linux/amd64 --platform linux/ppc64le --force myimage
docker rmi $(docker images -f "dangling=true" -q)
```

Specifying an ID with multiple tags without `-f` causes a conflict error. `--platform` (API 1.50+) removes only the given platform and requires `--force` (without it, a warning is shown and the removal is canceled). When run with `--force`, the content is removed from all images that reference that variant.

Adapted: `--force` is added to the equivalence example because removing a platform variant is canceled without it.

## Create a network

```sh
docker network create -d bridge my-bridge-network
```

```sh
docker network create --driver=bridge --subnet=192.168.0.0/16 br0
```

## Create, list, and remove volumes

```sh
docker volume create hello
docker volume create rosemary
docker volume ls
docker volume ls -f dangling=true
docker volume ls --filter label=is-timelord=yes
docker volume ls --format "{{.Name}}: {{.Driver}}"
```

> **Warning**: Removing a volume is irreversible, and the data in it cannot be recovered.

```sh
docker volume rm hello
```
