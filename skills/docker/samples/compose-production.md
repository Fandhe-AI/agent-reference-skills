---
source: https://docs.docker.com/compose/how-tos/production/
---

# Use Compose in production

Apply a production override file, redeploy a single service, and target a remote Docker host.

```console
$ docker compose -f compose.yaml -f compose.production.yaml up -d
```

Redeploy only `web` after a code change:

```console
$ docker compose build web
$ docker compose up --no-deps -d web
```

## Notes

- Typical production changes: remove code bind mounts, use different host ports and environment variables, add `restart: always`, add services such as a log aggregator.
- `--no-deps` stops Compose from recreating the services `web` depends on.
- For a remote single server, set `DOCKER_HOST`, `DOCKER_TLS_VERIFY`, and `DOCKER_CERT_PATH`; normal `docker compose` commands then work unchanged.
