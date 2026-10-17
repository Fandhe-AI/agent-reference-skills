---
source: https://docs.docker.com/get-started/docker-concepts/running-containers/overriding-container-defaults/
---

# Overriding container defaults

Override ports, environment variables, network, resource limits, and CMD / ENTRYPOINT with `docker run` flags.

```console
$ docker run -d -e POSTGRES_PASSWORD=secret -p 5433:5432 postgres
$ docker run -e foo=bar postgres env
$ docker run --env-file .env postgres env
$ docker network create mynetwork
$ docker run -d -e POSTGRES_PASSWORD=secret -p 5434:5432 --network mynetwork postgres
$ docker run -d -e POSTGRES_PASSWORD=secret --memory="512m" --cpus=".5" postgres
$ docker run -e POSTGRES_PASSWORD=secret postgres docker-entrypoint.sh -h localhost -p 5432
```

Override `ENTRYPOINT` / `CMD` in Compose:

```yaml
services:
  postgres:
    image: postgres:18
    entrypoint: ["docker-entrypoint.sh", "postgres"]
    command: ["-h", "localhost", "-p", "5432"]
    environment:
      POSTGRES_PASSWORD: secret 
```

## Notes

- Containers without `--network` join the default bridge network, where containers reach each other only by IP; on a custom network they resolve each other by name or alias.
- `docker stats` shows real-time resource usage to check the `--memory` / `--cpus` limits.
- The Postgres image uses trust authentication for local connections inside the container; a password is required from another host or container.
