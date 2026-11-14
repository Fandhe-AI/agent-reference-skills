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

### Extend Compose builds with HCL

You can keep development settings in Compose and layer release build settings in `docker-bake.hcl`. This is useful when release builds need different stages or platforms from local development builds. Compose can also build release images; separating the settings is a workflow choice.

For example, this Compose file builds an application and a utility service that seeds development data:

```yaml {title=compose.yaml}
services:
  app:
    image: docker.io/username/app:latest
    build:
      context: ./app
      target: dev
  seed:
    build:
      context: ./seed
```

Create `docker-bake.hcl` alongside `compose.yaml`:

```hcl {title=docker-bake.hcl}
group "default" {
  targets = ["app"]
}

target "_release" {
  platforms = ["linux/amd64", "linux/arm64"]
  attest = ["type=provenance,mode=max", "type=sbom"]
  annotations = ["org.opencontainers.image.authors=username"]
}

target "app" {
  inherits = ["_release"]
  target = "release"
}
```

Bake automatically loads and merges both files. The HCL file replaces the `default` group's target list, so `docker buildx bake` builds only `app`. The `seed` target remains available with `docker buildx bake seed`. See default file lookup in Overriding configurations for file precedence.

The `app` target keeps its context and image tag from Compose, overrides the Dockerfile stage from `dev` to `release`, and inherits the shared platforms, attestations, and annotations. The application's Dockerfile must define both stages. Other release targets can inherit the same settings; see "Common reusable targets" in Inheritance in Bake.

Inspect the merged configuration or select a target to inspect:

```console
$ docker buildx bake --print
$ docker buildx bake --print app
```

Check the `group.default.targets` list to see what runs by default. Omitting `seed` from that group doesn't delete its definition from the merged configuration. Selecting `app` limits the printed targets to that selection and its dependencies.

- Source: https://docs.docker.com/build/bake/compose-file/ (docker/docs @ 553482c, retrieved 2026-11-14 JST)

## Related

- [Bake](./bake.md)
- [Bake file reference](./bake-file-reference.md)
- [Inheritance in Bake](./bake-inheritance.md)
- [Overriding configurations](./bake-overrides.md)
