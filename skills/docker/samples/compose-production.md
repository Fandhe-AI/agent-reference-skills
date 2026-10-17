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
$ docker compose -f compose.yaml -f compose.production.yaml build web
$ docker compose -f compose.yaml -f compose.production.yaml up --no-deps -d web
```

## Notes

- Typical production changes: remove code bind mounts, use different host ports and environment variables, add `restart: always`, add services such as a log aggregator.
- `--no-deps` stops Compose from recreating the services `web` depends on.
- For a remote single server, set `DOCKER_HOST`, `DOCKER_TLS_VERIFY`, and `DOCKER_CERT_PATH`; normal `docker compose` commands then work unchanged.
- Adapted: the official redeploy commands omit the -f flags; they are added because Compose does not remember previously specified files, so omitting them would recreate web from compose.yaml (and compose.override.yaml) without the production overrides.
