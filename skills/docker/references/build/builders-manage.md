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

- `docker buildx inspect <name>` shows the builder's state; add `--bootstrap` to ensure the builder has booted (starts the BuildKit container for `docker-container`) before inspecting. Output includes Name, Driver, Last Activity, and per-node Name / Endpoint / Status / Buildkit / Platforms.
- `docker buildx du` shows disk usage for the currently selected builder; use `--builder` to target another builder (columns: ID, RECLAIMABLE, SIZE, LAST ACCESSED; totals Reclaimable / Total).

### Remove

- Removing the selected builder selects the default `docker` builder automatically. The default builder cannot be removed. The builder's local build cache is also removed.
- Removing a remote builder only removes your connection: it does not affect the remote build cache or stop the remote BuildKit daemon.

### Other notes

- The Manage builders page says `du` covers all builders; the `docker buildx du` CLI reference says it targets the currently selected builder.
- The Manage builders page says a builder can only be inspected while active; the `docker buildx inspect` CLI reference describes `--bootstrap` as optional ("Ensure builder has booted before inspecting") and bootstrapping as not necessary.
- If the Docker Desktop Builds view is turned on, builders can also be inspected in Docker Desktop settings.

## Related

- [Builders](./builders.md)
- [Build drivers](./drivers.md)
