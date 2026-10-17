---
source: https://docs.docker.com/reference/cli/docker/buildx/inspect/
---

# docker buildx inspect

Shows information about the current or specified builder.

## Signature / Usage

```console
$ docker buildx inspect [NAME]
$ docker buildx inspect elated_tesla
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--bootstrap` | | Ensure builder has booted before inspecting |
| `--timeout` | `20s` | Override the default timeout for loading builder status |

## Notes

- `--bootstrap`: if the driver is `docker-container`, starts the BuildKit container and waits until it's operational. Bootstrapping is done automatically during a build, so it is not necessary. The same BuildKit container is used during the lifetime of the associated builder node (as displayed in `buildx ls`).
- An asterisk (`*`) next to node build platform(s) means they were manually set during `buildx create`; otherwise they were detected automatically.
- `docker --debug buildx inspect <name>` gives more information about the builder.
- Output fields (example): Name, Driver, Last Activity, then per node Name, Endpoint, Driver Options, Status, Flags, BuildKit, Platforms, Labels, and `GC Policy rule#N` entries (All, Filters, Keep Duration, Keep Bytes).

### Example output

```console
$ docker buildx inspect elated_tesla
Name:          elated_tesla
Driver:        docker-container
Last Activity: 2022-11-30 12:42:47 +0100 CET

Nodes:
Name:           elated_tesla0
Endpoint:       unix:///var/run/docker.sock
Status:         running
BuildKit:       v0.10.6
Platforms:      linux/arm64*, linux/arm/v7, linux/arm/v6
```

## Related

- [docker buildx ls](./buildx-ls.md)
- [docker buildx create](./buildx-create.md)
