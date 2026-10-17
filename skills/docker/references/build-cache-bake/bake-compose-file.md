---
source: https://docs.docker.com/build/bake/compose-file/
---

# Building with Bake from a Compose file

Bake parses a Compose file and translates each service to a target.

## Signature / Usage

```yaml
# compose.yaml
services:
  webapp-dev:
    build: &build-dev
      dockerfile: Dockerfile.webapp
      tags:
        - docker.io/username/webapp:latest
      cache_from:
        - docker.io/username/webapp:cache
      cache_to:
        - docker.io/username/webapp:cache

  webapp-release:
    build:
      <<: *build-dev
      x-bake:
        platforms:
          - linux/amd64
          - linux/arm64

  db:
    image: docker.io/username/db
    build:
      dockerfile: Dockerfile.db
```

```console
$ docker buildx bake --print
```

## Options / Props

Valid `x-bake` fields:

| Field |
| --- |
| `cache-from`, `cache-to`, `contexts`, `no-cache`, `no-cache-filter`, `output`, `platforms`, `pull`, `secret`, `ssh`, `tags` |

## Notes

- Limitations versus HCL: variables and global scope attributes are not supported; the `inherits` service field is not supported (use YAML anchors such as `&build-dev` instead).
- `.env` file: default environment variables are loaded from `.env` in the current working directory and applied to Compose definitions passed with `-f`. System environment variables take precedence over `.env`.

```yaml
services:
  webapp:
    image: docker.io/username/webapp:${TAG:-v1.0.0}
    build:
      dockerfile: Dockerfile
```

- Extension field `x-bake` supplies fields unavailable in the Compose specification:

```yaml
services:
  addon:
    image: ct-addon:bar
    build:
      context: .
      dockerfile: ./Dockerfile
      x-bake:
        tags:
          - ct-addon:foo
        platforms:
          - linux/amd64
          - linux/arm64
        cache-to:
          - type=local,dest=path/to/cache
        pull: true
```

## Related

- [Bake](./bake.md)
- [Bake file reference](./bake-file-reference.md)
