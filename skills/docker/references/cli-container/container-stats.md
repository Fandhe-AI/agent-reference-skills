---
source: https://docs.docker.com/reference/cli/docker/container/stats/
---

# docker container stats

Display a live stream of container(s) resource usage statistics. Alias: `docker stats`.

## Signature / Usage

```console
$ docker container stats [OPTIONS] [CONTAINER...]
$ docker stats nginx --no-stream --format "{{ json . }}"
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | Show all containers (default shows just running) |
| `--format` |  | Format output using a custom template: `table` (default, with column headers); `table TEMPLATE`; `json`; `TEMPLATE` (Go template). See https://docs.docker.com/go/formatting/ |
| `--no-stream` |  | Disable streaming stats and only pull the first result |
| `--no-trunc` |  | Do not truncate output |

## Notes

- Returns a live data stream for running containers. Pass container names or IDs to limit it. Stopped containers can be specified but return no data. For more detail use the `/containers/(id)/stats` API endpoint.
- On Linux the CLI reports memory usage by subtracting cache usage from total memory usage; the API provides the total and the cache amount separately. Cache usage is `total_inactive_file` from `memory.stat` on cgroup v1 hosts (on Docker 19.03 and older: the `cache` field), and `inactive_file` on cgroup v2 hosts.
- The `PIDS` column counts processes and kernel threads created by the container. A large number with few processes (per `ps` or `top`) may indicate something is creating many threads.

Default columns:

| Column name | Description |
| --- | --- |
| `CONTAINER ID` and `Name` | the ID and name of the container |
| `CPU %` and `MEM %` | the percentage of the host's CPU and memory the container is using |
| `MEM USAGE / LIMIT` | the total memory the container is using, and the total it is allowed to use |
| `NET I/O` | data the container has received and sent over its network interface |
| `BLOCK I/O` | data the container has written to and read from block devices on the host |
| `PIDs` | the number of processes or threads the container has created |

Valid `--format` placeholders:

| Placeholder | Description |
| --- | --- |
| `.Container` | Container name or ID (user input) |
| `.Name` | Container name |
| `.ID` | Container ID |
| `.CPUPerc` | CPU percentage |
| `.MemUsage` | Memory usage |
| `.NetIO` | Network IO |
| `.BlockIO` | Block IO |
| `.MemPerc` | Memory percentage (Not available on Windows) |
| `.PIDs` | Number of PIDs (Not available on Windows) |

- Default format on Linux: `"table {{.ID}}\t{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.MemPerc}}\t{{.NetIO}}\t{{.BlockIO}}\t{{.PIDs}}"`. On Windows: `"table {{.ID}}\t{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"`.
- With `--format`, output is exactly as the template declares, or includes column headers when using the `table` directive:

```console
$ docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container top](./container-top.md)
- [docker container ls](./container-ls.md)
