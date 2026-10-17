---
source: https://docs.docker.com/compose/how-tos/dependent-images/
---

# Build dependent images

Share base layers across Compose services with a multi-stage Dockerfile, or build one service on another service's image with `additional_contexts`.

Shared multi-stage Dockerfile:

```dockerfile
FROM alpine as base
RUN /bin/sh -c apk add --update --no-cache openssl

FROM base as service_a
# build service a
...

FROM base as service_b
# build service b
...
```

```yaml
services:
  a:
     build:
       target: service_a
  b:
     build:
       target: service_b
```

Use another service's image as a base (explicit build ordering):

```yaml
services:
  a:
     image: service_a
     build: 
       dockerfile: a.Dockerfile
  b:
     image: service_b
     build:
       dockerfile: b.Dockerfile
       additional_contexts:
         # `FROM service_a` will be resolved as a dependency on service "a" which has to be built first
         service_a: "service:a"
```

Build all services through Bake:

```console
$ COMPOSE_BAKE=true docker compose build
```

## Notes

- Compose does not parse Dockerfiles, so it cannot infer that `b` depends on `a`; Compose v2 builds in parallel with BuildKit, unlike Compose v1, so the dependency must be declared with `additional_contexts`.
- To make Bake the default builder, set `"plugins": {"compose": {"build": "bake"}}` in `$HOME/.docker/config.json`.
