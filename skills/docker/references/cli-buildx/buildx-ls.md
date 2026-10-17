---
source: https://docs.docker.com/reference/cli/docker/buildx/ls/
---

# docker buildx ls

Lists all builder instances and the nodes for each instance.

## Signature / Usage

```console
$ docker buildx ls
NAME/NODE           DRIVER/ENDPOINT                   STATUS    BUILDKIT   PLATFORMS
elated_tesla*       docker-container
 \_ elated_tesla0    \_ unix:///var/run/docker.sock   running   v0.10.3    linux/amd64
 \_ elated_tesla1    \_ ssh://ubuntu@1.2.3.4          running   v0.10.3    linux/arm64*, linux/arm/v7, linux/arm/v6
default             docker
 \_ default          \_ default                       running   v0.8.2     linux/amd64
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--format` | `table` | Format the output |
| `--no-trunc` | | Don't truncate output |
| `--timeout` | `20s` | Override the default timeout for loading builder status |

## Notes

- Each builder has one or more nodes. The current builder's name is marked with `*` in `NAME/NODE`; the explicit node to build against for the target platform is marked with `*` in the `PLATFORMS` column.
- `--format` pretty-prints with a Go template. With the `table` directive column headers are included.

| Placeholder | Description |
| --- | --- |
| `.Name` | Builder or node name |
| `.DriverEndpoint` | Driver (for builder) or Endpoint (for node) |
| `.LastActivity` | Builder last activity |
| `.Status` | Builder or node status |
| `.Buildkit` | BuildKit version of the node |
| `.Platforms` | Available node's platforms |
| `.Error` | Error |
| `.Builder` | Builder object |

```console
$ docker buildx ls --format "{{.Name}}: {{.DriverEndpoint}}"
$ docker buildx ls --format "{{.Builder.Name}}: {{range .Builder.Nodes}}\n  {{.Name}}: {{.Endpoint}}{{end}}"
```

## Related

- [docker buildx inspect](./buildx-inspect.md)
- [docker buildx use](./buildx-use.md)
