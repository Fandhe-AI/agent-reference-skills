---
source: https://docs.docker.com/compose/how-tos/file-watch/
---

# Use Compose Watch

Sync source changes into a running service and rebuild when dependencies change, using `develop.watch`.

```yaml
services:
  web:
    build: .
    command: npm start
    develop:
      watch:
        - action: sync
          path: ./web
          target: /src/web
          initial_sync: true
          ignore:
            - node_modules/
        - action: rebuild
          path: package.json
```

```console
$ docker compose up --watch
```

`sync+restart` for a config file:

```yaml
services:
  web:
    build: .
    command: npm start
    develop:
      watch:
        - action: sync
          path: ./web
          target: /app/web
          ignore:
            - node_modules/
        - action: sync+restart
          path: ./proxy/nginx.conf
          target: /etc/nginx/conf.d/default.conf

  backend:
    build:
      context: backend
      target: builder
```

## Notes

- Works only for services with `build`, not for services that use a pre-built `image`.
- Paths are relative to the project directory; directories are watched recursively; glob patterns are not supported; `.dockerignore` rules apply. `ignore` patterns are relative to the rule's `path`.
- The image needs `stat`, `mkdir`, `rmdir`, and the container `USER` must be able to write the target (use `COPY --chown`).
- `docker compose watch` runs watch without mixing app logs; `docker compose watch --prune=false` keeps dangling images from rebuilds.
