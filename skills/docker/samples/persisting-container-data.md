---
source: https://docs.docker.com/get-started/docker-concepts/running-containers/persisting-container-data/
---

# Persisting container data

Keep Postgres data across container deletion by mounting a named volume.

```console
$ docker run --name=db -e POSTGRES_PASSWORD=secret -d -v postgres_data:/var/lib/postgresql postgres:18
$ docker exec -ti db psql -U postgres
$ docker stop db
$ docker rm db
$ docker run --name=new-db -d -v postgres_data:/var/lib/postgresql postgres:18
$ docker exec -ti new-db psql -U postgres -c "SELECT * FROM tasks"
```

Manage volumes:

```console
$ docker volume create log-data
$ docker volume ls
$ docker rm -f new-db
$ docker volume rm postgres_data
$ docker volume prune
```

## Notes

- A volume that does not exist is created automatically by `-v`.
- `POSTGRES_PASSWORD` is only used when bootstrapping a new database, so the second `docker run` omits it.
- A volume can only be removed when no container uses it. `docker volume prune` removes only unused anonymous volumes by default; add `--all` (API 1.42+) to also remove unused named volumes such as `postgres_data`.
- Adapted: the Get started page says prune removes "all unused volumes"; the CLI reference (docker volume prune) states only anonymous volumes are removed unless `--all` is given.
