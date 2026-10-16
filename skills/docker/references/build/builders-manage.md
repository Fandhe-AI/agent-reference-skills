---
source: https://docs.docker.com/build/builders/manage/
---

# Manage builders

Create, list, inspect, and remove builders with `docker buildx` commands (or in Docker Desktop).

## Signature / Usage

```console
$ docker buildx create --name=<builder-name>
$ docker buildx ls
$ docker buildx inspect --bootstrap my_builder
$ docker buildx du --builder my_builder
$ docker buildx rm <builder-name>
```

## Notes

### Create

- You cannot manually create new `docker`-driver builders; create builders with other drivers such as `docker-container`.
- If `--driver` is omitted, Buildx uses the `docker-container` driver.

### Inspect

- `docker buildx inspect <name>` works only if the builder is active; add `--bootstrap` to start it. Output includes Name, Driver, Last Activity, and per-node Name / Endpoint / Status / Buildkit / Platforms.
- `docker buildx du` shows disk usage for all builders by default; use `--builder` for one builder (columns: ID, RECLAIMABLE, SIZE, LAST ACCESSED; totals Reclaimable / Total).

### Remove

- Removing the selected builder selects the default `docker` builder automatically. The default builder cannot be removed. The builder's local build cache is also removed.
- Removing a remote builder only removes your connection: it does not affect the remote build cache or stop the remote BuildKit daemon.

### Other notes

- If the Docker Desktop Builds view is turned on, builders can also be inspected in Docker Desktop settings.

## Related

- [Builders](./builders.md)
- [Build drivers](./drivers.md)
