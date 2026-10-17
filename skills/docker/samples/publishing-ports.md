---
source: https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/
---

# Publishing and exposing ports

Publish a container port to the host with `docker run -p` or Compose `ports`.

```console
$ docker run -d -p 8080:80 nginx
$ docker run -d -p 127.0.0.1:8080:80 nginx
$ docker run -p 80 nginx
$ docker run -P nginx
```

The same mapping in Compose:

```yaml
services:
  app:
    image: docker/welcome-to-docker
    ports:
      - 8080:80
```

## Notes

- Syntax is `[HOST_IP:]HOST_PORT:CONTAINER_PORT`. Without a host IP, ports are published on all interfaces (`0.0.0.0` / `::`); use `127.0.0.1` to keep a port local.
- Omitting `HOST_PORT` (`-p 80`) picks an ephemeral host port; `docker ps` shows which one.
- `-P` / `--publish-all` publishes every port declared with `EXPOSE` to ephemeral host ports. `EXPOSE` alone does not publish.
