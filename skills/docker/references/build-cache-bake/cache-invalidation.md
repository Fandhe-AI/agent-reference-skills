---
source: https://docs.docker.com/build/cache/invalidation/
---

# Build cache invalidation

When building an image, the builder steps through the Dockerfile instructions in order and checks, for each one, whether it can reuse the instruction from the build cache.

## Signature / Usage

Force re-execution of a `RUN` instruction for one stage with `--no-cache-filter`:

```console
$ docker build --no-cache-filter install .
```

```dockerfile
FROM alpine:3.23 AS install
RUN apk add curl
```

## Notes

General rules:

- The builder begins by checking if the base image is already cached. Each subsequent instruction is compared against the cached layers. If no cached layer matches exactly, the cache is invalidated.
- For `ADD` and `COPY`, and for `RUN` instructions with bind mounts (`RUN --mount=type=bind`), the builder calculates a cache checksum from file metadata. The cache is invalidated if file metadata changed for any file involved.
- The modification time (`mtime`) of a file is not taken into account in the checksum. If only `mtime` changed, the cache is not invalidated.
- Aside from `ADD` and `COPY`, cache checking doesn't look at files in the container. For `RUN apt-get -y update`, only the command string is used to find a match.
- Once the cache is invalidated, all subsequent instructions generate new images and the cache isn't used. Order instructions from less frequently changed to more frequently changed.

`WORKDIR` and `SOURCE_DATE_EPOCH`:

- `WORKDIR` respects the `SOURCE_DATE_EPOCH` build argument when determining cache validity. Changing it between builds invalidates the cache for `WORKDIR` and all subsequent instructions.
- A dynamic value such as a Git commit timestamp breaks the cache on every commit. For reproducible builds without frequent invalidation use a fixed timestamp:

```console
$ docker build --build-arg SOURCE_DATE_EPOCH=0 .
```

`RUN` instructions:

- The cache for `RUN` isn't invalidated automatically between builds; rebuilding a week later still yields the same packages.
- To force re-execution: change a layer before it, clear the build cache ahead of the build with `docker builder prune`, or use `--no-cache` / `--no-cache-filter`.

Build secrets:

- Secret contents are not part of the build cache; changing a secret value doesn't invalidate the cache. Pass a build argument whose value you also change to force invalidation (build arguments do invalidate).
- Secret properties such as IDs and mount paths do participate in the cache checksum.

```dockerfile
FROM alpine
ARG CACHEBUST
RUN --mount=type=secret,id=TOKEN,env=TOKEN \
    some-command ...
```

```console
$ TOKEN="tkn_pat123456" docker build --secret id=TOKEN --build-arg CACHEBUST=1 .
```

## Related

- [Docker build cache](./cache.md)
- [Optimize cache usage in builds](./cache-optimize.md)
